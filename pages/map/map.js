// pages/map/map.js
Page({
  // data: {
  //   hasLocation: false,
  // },
  // onLoad:function(){
  //   this.chooseLocation()
  // },
  // chooseLocation: function () {
  //   var that = this
  //   wx.chooseLocation({
  //     success: function (res) {
  //       console.log(res)
  //       that.setData({
  //         hasLocation: true,
  //         location: formatLocation(res.longitude, res.latitude),
  //         locationAddress: res.address
  //       })
  //     }
  //   })
  // }
  data: {
    markers: [{
      iconPath: "../../img/marker_red.png",
      id: 0,
      latitude: 40.002607,
      longitude: 116.487847,
      callout: {
        content: '气泡名称',
        color: '#FF0000',
        fontSize: 15,
        borderRadius: 10,
        display: 'ALWAYS',
      },
      width: 35,
      height: 45
    }],
    }
})