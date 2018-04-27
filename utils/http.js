
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
          arrangeResult(arr)
          sortArray(arr)
          formatScore(arr)

          // 动物识别，特殊处理
          if (identifyType == 3 && arr.length == 1) {
            uploadCallback(false, filePath, arr[0])
            return;
          }

          // 菜品和车型，特殊处理
          if ((identifyType == 1 || identifyType == 2) && arr[0].name.indexOf('非') == 0) {
            uploadCallback(false, filePath, arr[0])
            return;
          }
          
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

// 根据分数排序
var sortArray = function (array) {
  array.sort(function (obj1, obj2) {
    if (obj1.score < obj2.score) {
      return 1;
    } else if (obj1.score > obj2.score) {
      return -1;
    } else {
      return 0;
    }
  })
}

// 格式化分数
var formatScore = function (array) {
  let i = 0;
  for (i = 0; i < array.length; i++) {
    let item = array[i]
    item.scoreTitle = (item.score * 100).toFixed(2) + '%'
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
