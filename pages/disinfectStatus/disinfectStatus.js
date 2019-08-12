// pages/disinfectStatus/disinfectStatus.js
var app = getApp()
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    loadingHidden:false,
    isSuccess:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.disinfectStatus()
  },
  disinfectStatus:function(){
    var that=this;
    var timerTem = setInterval(function () {
      wx.request({
        url: app.globalData.base +'/push/getDisinfectStatus/' + app.globalData.orderNo,
        data: {
        },
        method: 'GET',
        success: function (res) {
          that.setData({
            loadingHidden: true,
          })
          var status=res.data.data.status;
          if(status==0){
            that.setData({
              isSuccess:1,
              msg: '准备开始消毒'
            })
          } else if (status == 6){
            that.setData({
              isSuccess: 1,
              msg: '消毒中'
            })
          } else if (status == 7){
            clearInterval(timerTem);
            that.setData({
              isSuccess: 1,
              msg: '消毒完成'
            })
          }else{
            that.setData({
              isSuccess: 0,
            })
            switch (status) {
              case 1:
                that.setData({
                  msg: '设备还未准备好'
                })
                break;
              case 2:
                that.setData({
                  msg: '设备正在处理其他订单'
                })
                break;
              case 3:
                that.setData({
                  msg: '设备故障（紫外线灯故障）'
                })
                break;
              case 4:
                that.setData({
                  msg: '设备故障（风扇故障）'
                })
                break;
              case 5:
                that.setData({
                  msg: '设备升级中'
                })
                break;
              case 8:
                that.setData({
                  msg: '消毒失败'
                })
              case 999:
                that.setData({
                  msg: '设备空闲'
                })
              case -1:
                that.setData({
                  msg: '无该订单记录'
                })
              default:
                that.setData({
                  msg: '未知错误'
                })
            }
          }

        }
      })
    }, 1000)
    // 保存定时器name
  }
})