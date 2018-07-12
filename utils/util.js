
var showToast = function (msg) {
  wx.showToast({
    title: msg,
    icon: 'none',
    duration: 1500
  })
}

Array.prototype.indexOf = function (val) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == val) return i;
  }
  return -1;
};

Array.prototype.remove  =  function (val)  {
  var  index  =  this.indexOf(val);
  if  (index  >  -1)  {
    this.splice(index,  1);
  }
};

var shareData = function () {
  return {
    title: '识别天下东西，尽在掌握！',
    path: '/pages/index/index',
    imageUrl: '/images/icon.png'
  }
}

module.exports = {
  showToast: showToast,
  shareData: shareData
}
