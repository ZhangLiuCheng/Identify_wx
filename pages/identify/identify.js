// pages/identify/identify.js

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

  onReady: function () {
    let that = this;
    http.identifyFile(this.data.imgPath, this.data.imgType, function(success, filePath, res) {
      if (success == false ) {
        let info = res.name == undefined ? this.data.errorMsg : res.name;
        that.setData({
          identify: 1,
          errorMsg: info
        })
        return;
      }
      let arr = that.sortArray(res)
      arr = that.formatScore(arr)
      let item = arr[0]

      http.imageByName(item.name, function (success, res) {
        item.imgUrl = res.thumbnail_url
        that.setData({
          identify: 2,
          item: item
        })
        
        getApp().globalData.resultArray = arr;
      })

    })
  },
  onUnload: function () {

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
  },

  // 根据分数排序
  sortArray: function (array) {
    array.sort(function (obj1, obj2) {
      if (obj1.score < obj2.score) {
        return 1;
      } else if (obj1.score > obj2.score) {
        return -1;
      } else {
        return 0;
      }
    })
    return array;
  },

  // 格式化分数
  formatScore: function (array) {
    let i = 0;
    for (i = 0; i < array.length; i ++) {
      let item = array[i]
      item.scoreTitle = (item.score * 100).toFixed(2) + '%'
    }
    return array;
  }
})