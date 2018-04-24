
const http = require('utils/http.js')
const util = require('utils/util.js')

//app.js
App({

  globalData: {
    userToken: null
  },

  onLaunch: function () {
    // this.userLogin();
  },

  userLogin: function () {
    var that = this
    // 登录
    wx.login({
      success: res => {
        var code = res.code;
        http.requestLogin(code, function (success, res) {
          if (success) {
            that.userLoginSuccess(res)
          } else {
            that.userLoginFailed()
          }
        })
      }
    })
  },

  userLoginSuccess: function (res) {
    var app = getApp()
    var data = res.data.data
    app.globalData.userToken = data.token
    util.showToast('登录成功')
  },

  userLoginFailed: function () {
    util.showToast("登录失败,重试中...")
    var that = this
    setTimeout(function () {
      that.userLogin()
    }.bind(this), 1000)
  },
})