Page({
   data:{
     mapText:"点击选择 ，要勾选哦~" , 
     swi:true
   } ,
   staticData:{
     latitude:"" , 
     longitude:"" , 
     type:"out" , 
     explain:"" ,
     contact:""
   } ,

  ampChange(){
    wx.chooseLocation({
      success:this.mapDetails.bind(this)
    })
  } ,
  mapDetails(res){
      this.setData({
        mapText: res.address
      })
    this.staticData.latitude = res.latitude;
    this.staticData.longitude = res.longitude;
  } ,
  typeChange(a){
    this.staticData.type = a.detail.value;
  } ,
  inputExplain(a){
    this.staticData.explain = a.detail.value;

  } ,

  inputContact(a){
         this.staticData.contact = a.detail.value;
         console.log(this.staticData);
  } ,
  judge(text){
    wx.showToast({
      title: text,
      icon: "loading",
      duration: 2000
    })
  } ,
  btnSubmit(){
    if (this.data.mapText == "点击选择 ，要勾选哦~" || this.data.mapText == ""){
      this.judge("请选择地址");
      return;
     }
     if(this.staticData.explain == ""){
        this.judge("请填写说明信息"); 
        return;
     }
     if(this.staticData.contact == ""){
         this.judge("请填写联系方式");
         return;
     }

    wx.request({
      url: 'http://localhost/wx/insert.php', 
      method:"GET" ,
      data: {
       mapText:this.data.mapText , 
        latitude: this.staticData.latitude , 
        longitude: this.staticData.longitude , 
        type: this.staticData.type , 
        explain: this.staticData.explain ,
        contact: this.staticData.contact
      },
      header: {
        'content-type': 'application/json' 
      },
      success:this.successBtn.bind(this)
    })
  } ,

   successBtn(res){
     if (res.data == "插入成功") {
       this.setData({
         swi: false
       })
     }
     if (res.data == "所选地址已存在店铺"){
       this.judge("所选地址已存在店铺"); 
    }
   } ,

  resBtn(){
    wx.navigateBack()
  },












  onShareAppMessage: function (res) {
    return {
      title: '发布信息',
      path: '/pages/logs/logs'
    }}
})
