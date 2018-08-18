
var host = 'https://identify.bestcircler.com/v1/'
var hostFill = 'https://fill.bestcircler.com/v3/'


module.exports = {
  identifyFile: host + 'identifyFile',
  queryMore: host + 'queryMore',

  /**
  * 当前审核状态.
  * appName=identify
  * version
  */
  versionStatus: hostFill + "versionStatus",
}