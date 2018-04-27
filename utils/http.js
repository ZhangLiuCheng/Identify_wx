
var constants = require('constants.js')

// 上传图片到服务器
var identifyFile = function (filePath, identifyType, uploadCallback) {
  wx.uploadFile({
    url: constants.identifyFile,
    filePath: filePath,
    name: 'file',
    formData: {
      fileType: identifyType,
    },
    header: {
      "content-type": "multipart/form-data"
    },
    success: function (res) {
      let result = JSON.parse(res.data)
      if (res.statusCode == 200 && result.code == 0) {
        if (Array.isArray(result.data.result)) {
          let arr = result.data.result;

          // 动物识别，特殊处理
          if (arr.length == 1) {
            uploadCallback(false, filePath, arr[0])
            return;
          }
          arrangeResult(arr)
          uploadCallback(true, filePath, arr)
        } else {
          uploadCallback(false, filePath, result.data.result)
        }
      } else {
        uploadCallback(false, filePath, result.message)
      }
    },
    fail: function (res) {
      uploadCallback(false, filePath, '连接超时，请检查网络或重试')
    }
  })
}

var arrangeResult = function (arr) {
  let i = 0;
  for (i = 0; i < arr.length; i ++) {
    if (arr[i].probability != undefined) {
      arr[i].score = arr[i].probability;
    }
    if (arr[i].keyword != undefined) {
      arr[i].name = arr[i].keyword;
    }
  }
}

var queryMore = function (listener) {
  var that = this
  var app = getApp()
  wx.request({
    method: "GET",
    url: constants.queryMore,
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      getApp().print(res)
      if (res.statusCode == 200 && res.data.code == 0) {
        listener(true, res.data.data)
      } else {
        listener(false, res.data.message == undefined ? "服务器异常" : res.data.message)
      }
    },
    fail: function (res) {
      listener(false, '网络或服务器异常')
    }
  })
}

var imageByName = function (name, listener) {
  let that = this
  let app = getApp()
  let urlString = app.globalData.decodePicUrl.replace('%s', name);
  wx.request({
    method: "GET",
    url: urlString,
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      if (res.statusCode == 200) {
        listener(true, res.data.data[0])
      } else {
        listener(false, res.data.message == undefined ? "服务器异常" : res.data.message)
      }
    },
    fail: function (res) {
      listener(false, '网络或服务器异常')
    }
  })
}

module.exports = {
  identifyFile: identifyFile,
  queryMore: queryMore,
  imageByName: imageByName
}
