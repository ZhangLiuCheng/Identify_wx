
var host = 'https://identify.xbbvip.com/v1/'
var hostFill = 'https://fill.xbbvip.com/v3/'


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