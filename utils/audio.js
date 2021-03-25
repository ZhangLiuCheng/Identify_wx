
var menuAudioContext;
var kindAudioContext;
var successAudioContext;
var failureAudioContext;
var uploadAudioContext;


// 播放菜单声音
const playMenuAudio = function () {
  if (wx.createInnerAudioContext() == undefined) return;
  // if (menuAudioContext == undefined) {
    menuAudioContext = wx.createInnerAudioContext();
    menuAudioContext.src = '/audios/menu.mp3';
  // }
  menuAudioContext.play();
}

const freeMenuAudio = function () {
  if (menuAudioContext != undefined) {
    menuAudioContext.stop();
    menuAudioContext.destroy();
    menuAudioContext = undefined;
  }
}

// 播放分类声音
const playKindAudio = function () {
  if (wx.createInnerAudioContext() == undefined) return;
  // if (kindAudioContext == undefined) {
    kindAudioContext = wx.createInnerAudioContext();
    kindAudioContext.src = '/audios/kind.mp3';
  // }
  kindAudioContext.play();
}

const freeKindAudio = function () {
  if (kindAudioContext != undefined) {
    kindAudioContext.stop();
    kindAudioContext.destroy();
    kindAudioContext = undefined;
  }
}

// 播放成功声音
const playSuccessAudio = function () {
  if (wx.createInnerAudioContext() == undefined) return;
  // if (successAudioContext == undefined) {
    successAudioContext = wx.createInnerAudioContext();
    successAudioContext.src = '/audios/success.mp3';
  // }
  successAudioContext.play();
}

const freeSuccessAudio = function () {
  if (successAudioContext != undefined) {
    successAudioContext.stop();
    successAudioContext.destroy();
    successAudioContext = undefined;
  }
}

// 播放失败声音
const playFailureAudio = function () {
  if (wx.createInnerAudioContext() == undefined) return;
  // if (failureAudioContext == undefined) {
    failureAudioContext = wx.createInnerAudioContext();
    failureAudioContext.src = '/audios/failure.mp3';
  // }
  failureAudioContext.play();
}

const freeFailureAudio = function () {
  if (failureAudioContext != undefined) {
    failureAudioContext.stop();
    failureAudioContext.destroy();
    failureAudioContext = undefined;
  }
}

// 播放上传声音
const playUploadAudio = function () {
  if (wx.createInnerAudioContext() == undefined) return;
  // if (uploadAudioContext == undefined) {
    uploadAudioContext = wx.createInnerAudioContext();
    uploadAudioContext.src = '/audios/upload.mp3';
    uploadAudioContext.loop = true;
  // }
  uploadAudioContext.play();
}

const freeUploadAudio = function () {
  if (uploadAudioContext != undefined) {
    uploadAudioContext.stop();
    uploadAudioContext.destroy();
    uploadAudioContext = undefined;
  }
}

// 释放所以资源
const freeAllAudio = function () {
  freeMenuAudio()
  freeKindAudio()
  freeFailureAudio()
  freeSuccessAudio()
}

module.exports = {
  freeAllAudio: freeAllAudio,

  playMenuAudio: playMenuAudio,
  freeMenuAudio: freeMenuAudio,
  playKindAudio: playKindAudio,
  freeKindAudio: freeKindAudio,
  playSuccessAudio: playSuccessAudio,
  freeSuccessAudio: freeSuccessAudio,
  playFailureAudio: playFailureAudio,
  freeFailureAudio: freeFailureAudio,
  playUploadAudio: playUploadAudio,
  freeUploadAudio: freeUploadAudio
}

