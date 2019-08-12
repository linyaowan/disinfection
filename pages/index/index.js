//index.js
Page({
  onLoad: function () {
    var url = this.route
    console.log(url)
    var options = this.options  
    console.log(options)
  },
  data: {
    result: ''
  },
  scanCode: function () {
    var that = this
    wx.scanCode({
      success: function (res) {
        that.setData({
          result: res.result
        })
      },
      fail: function (res) {
      }
    })
  }
})