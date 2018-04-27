// pages/identify/identify.js

let audio = require('../../utils/audio.js')
let http = require('../../utils/http.js')

Page({

  data: {
    imgType : 0,
    imgPath: '',
    title : '',
    identify : 0,
    item : {},
    errorMsg: '识别失败，请切换到通用物体识别试试'
  },

  onLoad: function (options) {
    this.data.imgType = options.imgType
    this.setData({
      imgPath: options.path
    })
    this.data.title = options.title
    wx.setNavigationBarTitle({
      title: options.title + '识别',
    })
    
  },

  onUnload: function () {
    audio.freeFailureAudio();
    audio.freeSuccessAudio();
  },

  onReady: function () {
    let that = this;
    http.identifyFile(this.data.imgPath, this.data.imgType, function(success, filePath, res) {
      if (success == false ) {
        let info = res.name == undefined ? this.data.errorMsg : res.name;
        that.setData({
          identify: 1,
          errorMsg: info
        })
        audio.playFailureAudio();
        return;
      }

      let result = res;
      let item = result[0]

      http.imageByName(item.name, function (success, res) {
        audio.playSuccessAudio();

        item.imgUrl = res.thumbnail_url
        that.setData({
          identify: 2,
          item: item
        })
        getApp().globalData.resultArray = result;
      })
    })
  },


  onShareAppMessage: function () {

  },

  close: function () {
    wx.navigateBack({})
    audio.playMenuAudio();
  },

  more: function () {
    wx.navigateTo({
      url: '../more/more?title=' + this.data.title,
    })
    audio.playMenuAudio();
  }
})