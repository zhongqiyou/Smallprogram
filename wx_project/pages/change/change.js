Page({

  data: {
      maptext:"" , 
      type:"" , 
      explain:"" , 
      contact:"" ,
      typetext:"" , 
      id:""
  },

  onLoad: function (options) {
     this.setData({
       id: options.id
     })
     wx.request({
       url: 'http://localhost/wx/select_detail.php',
      data: {
        id: options.id
      },
      header: {
        'content-type': 'application/json' 
      },
       success: this.mapReqChangeSucc.bind(this)
    })
  },

  mapReqChangeSucc(res) {
    console.log(res.data);
    this.setData({
      maptext: res.data[0].mapText,
      type: res.data[0].type,
      explain: res.data[0].explain,
      contact: res.data[0].contact
    });
    if(this.data.type == "stop"){
        this.setData({
         typetext:"停车点"
        })
     }else{
      this.setData({
        typetext: "出租点"
      })
    }
  }  , 
  inputType(e){
    console.log(e.detail.value)
    this.setData({
      typetext: e.detail.value
    })
  } , 
  inputExplain(e){
    console.log(e.detail.value)
    this.setData({
      explain: e.detail.value
    })
  } , 
  inputContact(e){
    console.log(e.detail.value)
    this.setData({
      contact: e.detail.value
    })
    console.log(this.data)
  } , 
  mapChange(){
    wx.chooseLocation({
      success: this.mapChangeSucc.bind(this)
    })
  } , 
  mapChangeSucc(res){
  this.setData({
    maptext: res.address
  })
} , 
  updateMapChange(){
    console.log(this.data.id)
    if (this.data.typetext == "出租点"){
        this.setData({
            type:"out"
        })
      this.requreUpdate('http://localhost/wx/update.php')
    } else if (this.data.typetext == "停车点"){
      this.setData({
        type: "stop"
      })
      this.requreUpdate('http://localhost/wx/update.php')
    }else{
      this.alertText("停车点/出租点", 'loading')
    }
  } ,
  deleteMapChange() {
    console.log("删除")
    this.requreDelete("http://localhost/wx/delete.php");
  } ,

alertText(text , icon){
  wx.showToast({
    title: text,
    icon: icon,
    duration: 5000
  })
} ,

requreUpdate(url){
  wx.request({
    url: url,
    data: {
      mapText: this.data.maptext,
      type: this.data.type,
      explain: this.data.explain,
      contact: this.data.contact,
      id: this.data.id
    },
    header: {
      'content-type': 'application/json'
    },
    success(res) {
      console.log(res.data);
      if(res.data == "修改成功"){
        wx.showModal({
          title: '提示',
          content: '恭喜你，修改成功',
          success(res) {
            if (res.confirm) {
              wx.navigateTo({
                url: '/pages/search/search'
              })
            } else if (res.cancel) {
              wx.navigateTo({
                url: '/pages/search/search'
              })
            }
          }
        })
      }else{
        wx.showModal({
          title: '提示',
          content: '修改失败',
          success(res) {
            if (res.confirm) {
              console.log("确定")
            } else if (res.cancel) {
              console.log("返回")
            }
          }
        })
      }
    }
  })
} , 

  requreDelete(url) {
    wx.request({
      url: url,
      data: {
        id: this.data.id
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        console.log(res.data);
          
        if (res.data == "删除成功") {
          wx.showModal({
            title: '提示',
            content: '恭喜你，删除成功',
            success(res) {
              if (res.confirm) {
                wx.navigateTo({
                  url: '/pages/search/search'
                })
              } else if (res.cancel) {
                wx.navigateTo({
                  url: '/pages/search/search'
                })
              }
            }
          })
        } else {
          wx.showModal({
            title: '提示',
            content: '删除失败',
            success(res) {
              if (res.confirm) {
                console.log('确定')
              } else if (res.cancel) {
                console.log("返回")
              }
            }
          })
        }
      }
    })
  } 

})