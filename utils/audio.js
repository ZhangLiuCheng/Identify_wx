
let menuAudioContext;
let kindAudioContext;
let successAudioContext;
let failureAudioContext;


// 播放菜单声音
const playMenuAudio = function () {
  console.log('11111')
  if (menuAudioContext == undefined) {
    console.log('22222')

    menuAudioContext = wx.createInnerAudioContext();
    menuAudioContext.src = '/audios/menu.mp3';
  }
  menuAudioContext.play();
}

const freeMenuAudio = function () {
  if (menuAudioContext != undefined) {
    menuAudioContext.destroy();
    menuAudioContext = undefined;
  }
}

// 播放分类声音
const playKindAudio = function () {
  console.log('11111 kind')
  if (kindAudioContext == undefined) {
    console.log('22222  kind')

    kindAudioContext = wx.createInnerAudioContext();
    kindAudioContext.src = '/audios/kind.mp3';
  }
  kindAudioContext.play();
}

const freeKindAudio = function () {
  if (kindAudioContext != undefined) {
    kindAudioContext.destroy();
    kindAudioContext = undefined;
  }
}

// 播放成功声音
const playSuccessAudio = function () {
  console.log('11111 success')
  if (successAudioContext == undefined) {
    console.log('22222  success')

    successAudioContext = wx.createInnerAudioContext();
    successAudioContext.src = '/audios/success.mp3';
  }
  successAudioContext.play();
}

const freeSuccessAudio = function () {
  if (successAudioContext != undefined) {
    successAudioContext.destroy();
    successAudioContext = undefined;
  }
}

// 播放失败声音
const playFailureAudio = function () {
  console.log('11111 failure')
  if (failureAudioContext == undefined) {
    console.log('22222  failure')

    failureAudioContext = wx.createInnerAudioContext();
    failureAudioContext.src = '/audios/failure.mp3';
  }
  failureAudioContext.play();
}

const freeFailureAudio = function () {
  if (failureAudioContext != undefined) {
    failureAudioContext.destroy();
    failureAudioContext = undefined;
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
  freeFailureAudio: freeFailureAudio
}

