// pages/order/order.js
var app = getApp()
Page({
  data:{
    num: 1,
    price: 0.01
  },
  onLoad: function (options) {
    this.setData({
      "mac": options.mac
    })

  },
  requestPayment: function () {
    var self = this
    var mac=this.data.mac
    self.setData({
      loading: true,
    })
    // 此处需要先调用wx.login方法获取code，然后在服务端调用微信接口使用code换取下单用户的openId
    // 具体文档参考https://mp.weixin.qq.com/debug/wxadoc/dev/api/api-login.html?t=20161230#wxloginobject
    wx.request({
      url: app.globalData.base + '/api/payInterface',
      data: {
        openId: app.globalData.openId
      },
      method: 'GET',
      success: function (res) {
        var payargs = res.data.data;
        var orderNo = payargs.orderNo;
        //测试 orderNo数据
        app.globalData.orderNo = orderNo;
        wx.requestPayment({
          timeStamp: payargs.timeStamp,
          nonceStr: payargs.nonceStr,
          package: payargs.package,
          signType: payargs.signType,
          paySign: payargs.paySign,
          success(res) {
            wx.request({
              url: app.globalData.base+'/api/saveOrder',
              data: {
                openId: app.globalData.openId,
                orderNo: orderNo,
                mac: mac,
                status: '0',
                amountPayable:1,
                paymentAmount:1
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
              url: app.globalData.base+'/api/saveOrder',
              data: {
                openId: app.globalData.openId,
                orderNo: orderNo,
                mac:mac,
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
  changeprice: function (num) {
    if (num) {
      let price = num * 0.01;
      this.setData({
        price: price
      })
    } else {
      this.setData({
        price: 0
      })
    }
  },
  changenum:function(e){
    let num = e.detail.value.replace(/\D/g, '')
    this.setData({
      num
    })
    this.changeprice(num);
  },
  reducenum:function(){
    var num = this.data.num;
    // 如果大于1时，才可以减  
    if (num > 1) {
      num--;
    }
    // 只有大于一件的时候，才能normal状态，否则disable状态  
    var minusStatus = num <= 1 ? 'disabled' : 'normal';
    // 将数值与状态写回  
    this.setData({
      num: num,
      minusStatus: minusStatus
    });  
    this.changeprice(num);
  },
  addnum: function () {
    var num = this.data.num;
    // 如果大于1时，才可以减  
      num++;
    // 将数值与状态写回  
    this.setData({
      num: num
    });
    this.changeprice(num);
  }
})