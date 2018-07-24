
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
    title: '还在担心孩子问你这是什么？万物识别，带你探索未知！',
    // title: '识别天下东西，尽在掌握！',
    // title: '还在担心孩子问你这是什么？ 基于智能的快速精准识别植物动物菜品车型等大众物品!只需拍摄图片，即可快速识别。你还再害怕不知道的尴尬吗！万物识别，带你探索未知！',
    path: '/pages/index/index',
    imageUrl: '/images/icon.png'
  }
}

module.exports = {
  showToast: showToast,
  shareData: shareData
}
