// pages/identify/identify.js

let audio = require('../../utils/audio.js')
let http = require('../../utils/http.js')
let util = require('../../utils/util.js')

Page({

  data: {
    imgType : 0,
    imgPath: '',
    title : '',
    identify : 0,
    item : {},
    errorInfo: '识别失败，请切换到通用物体识别试试',
    moreInfo: '更多结果'
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
    this.unload = true;
    audio.freeFailureAudio();
    audio.freeSuccessAudio();
    audio.freeUploadAudio();
  },

  onReady: function () {
    audio.playUploadAudio();
    let that = this;
    http.identifyFile(this.data.imgPath, this.data.imgType, function(success, filePath, res) {
      if (true == that.unload) {
        return;
      }
      if (success == false ) {
        let info = res.name == undefined ? that.data.errorMsg : res.name;
        that.setData({
          identify: 1,
          errorInfo: info
        })
        audio.freeUploadAudio();
        audio.playFailureAudio();
        return;
      }

      let result = res;
      let item = result[0]

      http.imageByName(item.name, function (success, res) {
        if (true == that.unload) {
          return;
        }
        audio.freeUploadAudio();
        audio.playSuccessAudio();

        item.imgUrl = res.thumbnail_url
        that.setData({
          identify: 2,
          item: item
        })
        getApp().globalData.resultArray = result;
        if (result.length <= 1 ) {
          that.setData({
            moreInfo: '暂无更多结果'
          })
        }
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
    let list = getApp().globalData.resultArray;
    if (list == undefined || list.length <= 1) {
      util.showToast('暂无更多结果')
      return;
    }
    wx.navigateTo({
      url: '../more/more?title=' + this.data.title,
    })
    audio.playMenuAudio();
  },
})