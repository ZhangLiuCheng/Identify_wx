// pages/infoView/infoView.js

Component({

  properties: {

    modalTop: {
      type:Int8Array,
      value:0
    },

    modalBottom: {
      type: Int8Array,
      value: 0
    },

    modalMsgLoading: {
      type: String,
      value: '数据加载中'
    },

    modalMsgEmpty: {
      type: String,
      value: '暂无数据'
    }
  },

  data: {
    modalHidden: true,
    loadingHidden: true,
    emptyHidden: true,
    errorHidden: true,
    // modalMessageLoading: '宝宝正在努力加载中...',
    // modalMessageEmpty: '暂无数据',
    // modalMessageError: '请检查网络连接或点击重试'
  },

  methods: {
    hideInfoView: function () {
      this.setData({
        modalHidden: true
      })
    },

    showLoadingView: function() {
      this.setData({
        modalHidden: false,
        loadingHidden: false,
        emptyHidden: true,
        errorHidden: true
      })
    },

    showEmptyView: function(info) {
      this.setData({
        modalMsgEmpty: info,
        modalHidden: false,
        loadingHidden: true,
        emptyHidden: false,
        errorHidden: true
      })
    },

    showErrorView: function () {
      this.setData({
        modalHidden: false,
        loadingHidden: true,
        emptyHidden: true,
        errorHidden: false
      })
    },
    
    retry: function () {
      this.triggerEvent("retry")
    }
  }
})
