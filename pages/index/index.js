//index.js

const app = getApp()

Page({
  data: {
    bgImgs: [
      '/images/bg_1.jpg',
      '/images/bg_2.jpg'
    ],
    bgIndex: 0,

    kindTitles: [
      '植物', '动物', '菜品', '车型', 'logo商标', '通用物体'
    ],
    kindImgs: [
      '/images/icon_zhiwu1.png',
      '/images/icon_dongwu1.png',
      '/images/icon_caipin.png',
      '/images/icon_car.png',
      '/images/icon_logo.png',
      '/images/icon_qita.png'
    ],
    kindIndex: 0
  },

  onLoad: function () {
    let that = this
    this.interval = setInterval(function () {
      // let random = parseInt(Math.random() * 5)
      let bi = (that.data.bgIndex + 1) % 2
      that.setData({
        bgIndex: bi
      })
    }, 5000)
  },

  onUnload: function () {
    clearInterval(this.interval)
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
      let ki = (this.data.kindIndex + 1) % this.data.kindTitles.length
      this.changeKind(ki)
    }
  },
  // 切换识别种类
  kind: function () {
    let that = this;
    wx.showActionSheet({
      itemList: that.data.kindTitles,
      success: function (res) {
        that.changeKind(res.tapIndex)
      }
    })
  },

  changeKind : function (newIndex) {
    this.setData({
      kindIndex: newIndex
    })
    wx.setNavigationBarTitle({
      title: this.data.kindTitles[newIndex] + '识别',
    })
  },

  // 拍照
  camera: function () {
    this.chooseImage('camera')
  },

  // 相册选取
  album: function () {
    this.chooseImage('album')
  },

  chooseImage: function (sourceType) {
    var that = this
    wx.chooseImage({
      count: 1,
      sourceType: [sourceType],
      sizeType: ['compressed' /*, 'original'*/],
      success: function (res) {
        // wx.showLoading({
        //   title: '图片上传中',
        //   mask: true
        // })
        // that.requestUploadFile(res.tempFilePaths[0], function(success, msg) {
        //   wx.hideLoading()
        // })
      }
    })
  },

  // 上传图片到服务器
  requestUploadFile: function (filePath, uploadCallback) {
    wx.uploadFile({
      url: constants.uploadFile,
      filePath: filePath,
      name: 'file',
      header: {
        "content-type": "multipart/form-data"
      },
      success: function (res) {
        getApp().print(res)
        if (res.statusCode == 200) {
          var result = JSON.parse(res.data)
          if (result.code == 0) {
            uploadCallback(true, filePath, result.data[0])
          } else {
            uploadCallback(true, filePath, result.message)
          }
        } else {
          uploadCallback(false, filePath, "上传图片不能超过4M")
        }
      },
      fail: function (res) {
        getApp().print(res)
        uploadCallback(false, filePath, '上传超时')
      }
    })
  },
})