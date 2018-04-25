// pages/more/more.js
Page({

  data: {

    list: [
      { "score": '10%', "name": "美人梅" },
      { "score": '9%', "name": "梅花" },
      { "score": '9%', "name": "桃花" },
      { "score": '6%', "name": "红梅" },
      { "score": '5%', "name": "榆叶梅" }
    ]
  },

  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: options.title + '识别',
    })
  },

  onReady: function () {

  },

  onShareAppMessage: function () {

  }
})