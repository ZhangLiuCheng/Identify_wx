// pages/identify/identify.js
Page({

  data: {
    imgPath: '',
    title : ''
  },

  onLoad: function (options) {
    this.setData({
      imgPath: options.path
    })
    this.data.title = options.title
    wx.setNavigationBarTitle({
      title: options.title + '识别',
    })
  },

  onReady: function () {

  },
  onUnload: function () {

  },

  onPullDownRefresh: function () {

  },

  onReachBottom: function () {

  },

  onShareAppMessage: function () {

  },

  close: function () {
    wx.navigateBack({})
  },

  more: function () {
    wx.navigateTo({
      url: '../more/more?title=' + this.data.title,
    })
  }
})