// pages/more/more.js

let http = require('../../utils/http.js')


Page({

  data: {
    title: '',
    list: [
    ]
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
          console.log(res)
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

  }
})