//index.js

let audio = require('../../utils/audio.js')
const app = getApp()

Page({
  data: {
    bgImgs: [
      '/images/bg_zw.jpg',
      '/images/bg_dw.jpg',
      '/images/bg_cp.jpg',
      '/images/bg_car.png',
      '/images/bg_tongyong.jpg'
    ],
    bgIndex: 0,

    kindTypes: [4, 3, 1, 2, 5],
    kindTitles: [
      '植物', '动物', '菜品', '车型', '通用物体'
    ],
    kindImgs: [
      '/images/icon_zhiwu2.png',
      '/images/icon_dongwu.png',
      '/images/icon_caipin.png',
      '/images/icon_car.png',
      '/images/icon_qita.png'
    ],
    kindIndex: 0
  },

  onLoad: function () {
   
  },

  onUnload: function () {
    clearInterval(this.interval)
    audio.freeAllAudio()
  },

  onShareAppMessage: function () {

  },

  touchStart: function (res) {
    this.startPoint = res.touches[0]
  },

  // 拦截scrollview滑动事件
  touchMove: function (res) {
    this.endPoint = res.touches[0]
  },

  touchEnd: function (res) {
    if (this.startPoint == undefined || this.startPoint.clientX == undefined ||
      this.endPoint == undefined || this.endPoint.clientX == undefined) {
      return;
    }
    let distance = this.endPoint.clientX - this.startPoint.clientX
    if (Math.abs(distance) > wx.getSystemInfoSync().windowWidth / 5) {
      if (distance < 0) {
        this.data.kindIndex ++;
      } else {
        this.data.kindIndex --;
      }
      let ki = this.data.kindIndex;
      if (this.data.kindIndex < 0) {
        ki = this.data.kindTitles.length - 1;
      }
      if (this.data.kindIndex >= this.data.kindTitles.length) {
        ki = 0;
      }
      this.changeKind(ki)
    }
    this.startPoint = undefined;
    this.endPoint = undefined;
  },

  // 切换识别种类
  kind: function () {
    audio.playMenuAudio();
    let that = this;
    wx.showActionSheet({
      itemList: that.data.kindTitles,
      success: function (res) {
        that.changeKind(res.tapIndex)
      }
    })
  },

  changeKind : function (newIndex) {
    let bi = newIndex % this.data.bgImgs.length
    this.setData({
      bgIndex: bi
    })

    this.setData({
      kindIndex: newIndex
    })
    wx.setNavigationBarTitle({
      title: this.data.kindTitles[newIndex] + '识别',
    })
    audio.playKindAudio();
  },

  // 拍照
  camera: function () {
    this.chooseImage('camera')
    audio.playMenuAudio();
    audio.test()
  },

  // 相册选取
  album: function () {
    this.chooseImage('album')
    audio.playMenuAudio();
  },

  chooseImage: function (sourceType) {
    var that = this
    wx.chooseImage({
      count: 1,
      sourceType: [sourceType],
      sizeType: ['compressed' /*, 'original'*/],
      success: function (res) {
        wx.navigateTo({
          url: '../identify/identify?path=' + res.tempFilePaths[0] + '&title=' + that.data.kindTitles[that.data.kindIndex] + '&imgType=' + that.data.kindTypes[that.data.kindIndex],
        })
      }
    })
  },
})
