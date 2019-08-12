var app = getApp()
Page({
  data: {
  },
  onLoad:function(){
    var that = this

    if (app.globalData.hasLogin === false) {
      wx.login({
        success: _getUserInfo
      })
    } else {
      _getUserInfo()
    }

    function _getUserInfo() {
      // wx.getUserInfo({
      //   success: function (res) {
      //     that.setData({
      //       userInfo: res.userInfo
      //     })
      //   }
      // })
    }
  }
})