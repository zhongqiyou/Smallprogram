
Page({

  data: {
  mapres:""  , 
  keyword:""
  },

 
  onLoad() {
    this.mapJson()
  } , 

  mapJson(){
    wx.request({
      url: 'http://localhost/wx/select.php',
      data: {},
      header: {
        'content-type': 'application/json'
      },
      success:this.mapJsonSucc.bind(this)
    })
  } , 

  mapJsonSucc(res){
    console.log(res.data);
   this.setData({
     mapres: res.data
   })
  } , 
  inputSearch(e){
     this.setData({
       keyword:e.detail.value
     })
  } , 
  searchKeyWord(){
    this.searchKeyWordReq()
  } ,

  searchKeyWordReq(){
    wx.request({
      url: 'http://localhost/wx/select_like.php',
      data: {
        keyword: this.data.keyword
      },
      header: {
        'content-type': 'application/json'
      },
      success: this.searchKeyWordSucc.bind(this)
    })
  } , 
  searchKeyWordSucc(res){
    this.setData({
      mapres: res.data
    })
  } , 
  mapTextUpdate(e){
    wx.navigateTo({
      url: "/pages/detail/detail?id=" + e.currentTarget.dataset.id ,
    })
  }
})