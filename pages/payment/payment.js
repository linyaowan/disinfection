// pages/payment/payment.js
var app = getApp()
Page({
  onLoad: function (options) {
    var payStatus = decodeURIComponent(options.payStatus)
    this.setData({
      // payStatus: payStatus
      payStatus:1
    })
  },
  data: {},
  requestPayment: function () {
    var that = this
    var mac = this.data.mac
    that.setData({
      loading: true,
    })
    // 此处需要先调用wx.login方法获取code，然后在服务端调用微信接口使用code换取下单用户的openId
    // 具体文档参考https://mp.weixin.qq.com/debug/wxadoc/dev/api/api-login.html?t=20161230#wxloginobject
    wx.request({
      url: app.globalData.base +'/pay/signature',
      data: {
        openId: app.globalData.openId
      },
      method: 'GET',
      success: function (res) {
        
        var payargs = res.data.data;
        var orderNo = payargs.orderNo;
        wx.requestPayment({
          timeStamp: payargs.timeStamp,
          nonceStr: payargs.nonceStr,
          package: payargs.package,
          signType: payargs.signType,
          paySign: payargs.paySign,
          success(res) {
            wx.request({
              url: app.globalData.base +'/order/saveOrUpdate',
              data: {
                openId: app.globalData.openId,
                orderNo: orderNo,
                mac: mac,
                status: '0',
                amountPayable: 1,
                paymentAmount: 1
              },
              method: 'POST',
              success: function (data) {
                wx.redirectTo({
                  url: '/pages/payment/payment?payStatus=1'
                })
              }
            })

          },
          fail(res) {
            wx.request({
              url: app.globalData.base +'/order/saveOrUpdate',
              data: {
                openId: app.globalData.openId,
                orderNo: orderNo,
                mac: mac,
                status: '1',
                amountPayable: 1,
                paymentAmount: 1
              },
              method: 'POST',
              success: function (data) {
                wx.redirectTo({
                  url: '/pages/payment/payment?payStatus=0'
                })
              }
            })
          }
        })

        self.setData({
          loading: false
        })
      },
      fail: function (res) {

      },
    })
  },
  orderCancel:function(){
    wx.switchTab({
      url: '/pages/index/index'
    })
  },
  startDisinfect:function(){
    var that=this;
    that.setData({
      loading: true,
    })
    //测试 消毒推送后的查询
    wx.redirectTo({
      url: '/pages/disinfectStatus/disinfectStatus'
    })
   
  }
})