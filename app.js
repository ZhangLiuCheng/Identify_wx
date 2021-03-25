
const http = require('utils/http.js')

//app.js
App({

  globalData: {
    decodePicUrl: 'https://m.baidu.com/sf/vsearch/image/search/wisejsonala?tn=wisejsonala&ie=utf8&cur=result&fromsf=1&word=%s&pn=1&rn=1&gsm=5a',
    userToken: null
  },

  onLaunch: function () {
    // this.userLogin();

    let that = this;
    http.queryMore(function(success, res) {
      if (success) {
        that.globalData.decodePicUrl = res
      }
    })
  },

  print: function (res) {
    console.log(res)
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