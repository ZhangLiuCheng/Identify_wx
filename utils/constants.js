// var host = 'http://192.168.1.104:8080/quanzi/'
var host = 'https://www.bestcircler.com/api/'

// var host = 'https://26acf035.ngrok.io/quanzi/'

module.exports = {
  /**
   * method:get
   * params:code
   */
  loginUrl: host + 'user/loginWXApplet',

  /**
   * 修改用户信息.
   * method:post
   * params:token,nickName,headUrl
   */
  updateUser: host + 'user/update',

  /**
   * 获取用户信息.
   */
  userInfo: host + 'user/search',

  /**
   * 信息列表
   */
  newsListUrl: host + 'news/queryList',

  /**
   * 发布信息
   */
  newsAdd: host + 'news/add',

  /**
   * 上传图片
   */
  uploadFile: host + 'cFile/uploadImage',

  /**
   * 热门关键词
   * token
   */
  searchHotKeyword: host + 'hotSearch/query',

  /**
   * 搜索列表
   * keyword
   */
  searchList: host + 'news/search',

  /**
   * 列表详情
   * id
   */
  newsDetail: host + 'news/detail',

  /**
   * 我的发布
   */
  myNews: host + 'news/myNews',

  /**
   * 收藏
   * method:get
   * params:token, newsId, type=1添加收藏，type=2取消收藏
   */
  newsCollection: host + 'news/setCollection',

  /**
   * 举报
   * method:post
   * params:token, newsId, message, account
   */
  newsReport: host + '/news/report',

  /**
   * 收藏
   * method:get
   * params:token, pageIndex，pageSize
   */
  myCollection: host + 'news/myCollection',

  /**
   * 建议反馈
   * method:post
   * params:token, message, account
   */
  feedback: host + 'aboutUs/addProposal'
}