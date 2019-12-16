const app = getApp()

Page({
  data:{
    longitude:"" , 
    latitude:"" ,
    markers: [],
    controls: [{
      iconPath: '/static/dw.png',
      position: {
        left: app.dataWH.width/2 - 12.5,
        top: app.dataWH.height / 2 - 45,
        width: 25,
        height: 25
      }
    } , 
      {
        id:1 ,
        iconPath: '/static/mj.png',
        position: {
          left: 20,
          top: app.dataWH.height - 90,
          width: 30,
          height: 30
        },
        clickable: true
      }]
  } ,

  onReady(){
    this.mapCtx = wx.createMapContext('myMap');
  } ,
  controltap(){
    this.mapCtx.moveToLocation();
  } ,

  onShow(){
    this.positionLocation();
    this.positionMapIcon();
  } ,

  positionLocation(){
    wx.getLocation({
      type: 'gcj02',
      success:this.obtainPosition.bind(this)
    })
  } , 
  positionMapIcon(){
    wx.request({
      url: 'http://localhost/wx/select.php', 
      header: {
        'content-type': 'application/json' 
      },
      success:this.mapIconSucc.bind(this)
    })
  } ,
  mapIconSucc(res){
      console.log(res);
      var jsonArr = res.data.map((value, index) => {
        return value;
      });
    var markers = jsonArr.map((value , index)=>{
                return {
                  iconPath: "/static/"+value.type+".png",
                  id: value.id,
                  latitude: value.latitude,
                  longitude: value.longitude,
                  width: 40,
                  height: 40
                }
      });
      this.setData({
        markers:markers
      });
  } ,
  marIdChange(e){
    console.log(e);
    wx.navigateTo({
      url: "/pages/detail/detail?id="+e.markerId
    })
  } ,
  

  obtainPosition(res){
    this.setData({
      longitude: res.longitude,
      latitude: res.latitude
    })
  },
  onShareAppMessage: function (res) {
    return {
      title: '自由风平台',
      path: '/pages/index/index'
    }
  }
})
