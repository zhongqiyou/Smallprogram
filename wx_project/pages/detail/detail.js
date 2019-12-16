
Page({ 
  data:{
    mapText:"" , 
    type:"" ,
    explain:"" ,
    contact:"" , 
    hiddenmodalput:true , 
    pass:"" , 
    confirmpass:"" , 
    id:""
  } ,

  onLoad: function (options) {
     this.setData({
       id: options.id
     })
    console.log(this.data.id);
    this.mapReqChange(options.id);
  }  ,
  mapReqChange(id) {
    wx.request({
      url: 'http://localhost/wx/select_detail.php',
      data: {
        id: id 
      },
      header: {
        'content-type': 'application/json'
      },
      success: this.mapReqChangeSucc.bind(this)
    })
  } , 
  mapReqChangeSucc(res){
    console.log(res.data);
    this.setData({
      mapText:res.data[0].mapText , 
      type:res.data[0].type , 
      explain:res.data[0].explain ,
      contact:res.data[0].contact
    });
  } ,

  tubeBtn(){
    this.setData({
      hiddenmodalput: false
    });
    this.setData({
      pass: Math.ceil(Math.random() * 1000000)
    })
    console.log(this.data.pass);
  } ,
  cancel: function () {
    this.setData({
      hiddenmodalput: true
    })
  },
  confirm: function () {
    if (this.data.pass == this.data.confirmpass){
      wx.navigateTo({
        url: "/pages/change/change?id="+this.data.id
        });
    }else{
      wx.showToast({
        title: '密码错误！',
        icon: 'loading',
        duration: 2000
      })
    }
  }  ,
  confirmPass(e){
     this.setData({
       confirmpass: e.detail.value
     })
  }

 

  

})