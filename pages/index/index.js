//index.js

let audio = require('../../utils/audio.js')
let util = require('../../utils/util.js')
let http = require('../../utils/http.js')

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
    kindIndex: 0,

    hideClickInfo: true,
    hideScrollIngo: true
  },

  onLoad: function () {
    let hideInfo = wx.getStorageSync('hideClickInfo') != '';
    let scrollInfo = wx.getStorageSync('hideScrollInfo') != '';
    this.setData({
      hideClickInfo: hideInfo,
      hideScrollIngo: scrollInfo
    })
    if (hideInfo == false) {
      wx.showModal({
        title: '如何切换类别',
        content: '1.屏幕可以向左滑动。  2.点击上面的按钮。',
        showCancel: false,
        success: function (res) {
          wx.setStorage({
            key: "hideClickInfo",
            data: "true"
          })
        }
      })
    }
  },

  onUnload: function () {
    clearInterval(this.interval)
    audio.freeAllAudio()
  },

  onReady: function () {
    let toFill = wx.getStorageSync('toFill') != '';
    let that = this;
    http.versionStatus('3.0.5', function (success, res) {
      if (toFill != true && res == 2) {
        that.clickFill();
        wx.setStorage({
          key: "toFill",
          data: "true"
        })
      }
    })
  },

  onShareAppMessage: function () {
    return util.shareData();
  },

  clickFill: function () {

    // wx.navigateToMiniProgram({
    //   appId: 'wx999e9b27c5006ee4',
    //   path: 'pages/index/index?type=1',
    //   envVersion: 'release',
    //   success(res) {
    //     // 打开成功
    //   },
    // })

    wx.navigateToMiniProgram({
      appId: 'wx1d8abcecdf5c0f0a',
      path: 'pages/index/index',
      envVersion: 'release',
      success(res) {
        // 打开成功
      },
    })
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
    if (Math.abs(distance) > wx.getSystemInfoSync().windowWidth / 6) {
      this.hideScrollInfo();
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
    this.hideClickInfo();
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
          url: '../identify/identify?path=' + res.tempFilePaths[0] + '&title=' 
          + that.data.kindTitles[that.data.kindIndex] + '&imgType=' + that.data.kindTypes[that.data.kindIndex],
        })
      }
    })
  },

  // 隐藏点击提示
  hideClickInfo: function () {
    if (this.data.hideClickInfo) {
        return;
    }
    wx.setStorage({
      key: "hideClickInfo",
      data: "true"
    })
    this.setData({
      hideClickInfo: true,
    })
  },

  // 隐藏滑动提示
  hideScrollInfo: function () {
    if (this.data.hideScrollIngo) {
      return;
    }
    wx.setStorage({
      key: "hideScrollInfo",
      data: "true"
    })
    this.setData({
      hideScrollIngo: true,
    })
  }
})
