// pages/more/more.js

let http = require('../../utils/http.js')
let util = require('../../utils/util.js')
let audio = require('../../utils/audio.js')

Page({

  data: {
    title: '',
    list: []
  },

  onLoad: function (options) {
    let that = this;
    let resultList = getApp().globalData.resultArray

    this.setData({
      list: resultList,
      title : options.title
    })
    wx.setNavigationBarTitle({
      title: options.title + '识别',
    })
    

    let i = 0;
    for (i = 0; i < resultList.length; i++) {
      let item = resultList[i]
      if (item.imgUrl == undefined) {
        http.imageByName(item.name, function (success, res) {
          item.imgUrl = res.thumbnail_url
          that.setData({
            list: resultList
          })
        })
      }
    }
  },

  onReady: function () {

  },

  onShareAppMessage: function () {
    return util.shareData();
  },

  isThis: function () {
    audio.playMenuAudio();
    util.showToast('感谢您的反馈')
    setTimeout(function () {
      wx.navigateBack({
        delta: 1
      })
    }, 1000);
  }
})