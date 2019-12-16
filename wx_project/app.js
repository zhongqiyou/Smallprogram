
App({
    dataWH:{} ,
    onLaunch(){
      const res = wx.getSystemInfoSync();
      this.dataWH.width = res.windowWidth;
      this.dataWH.height = res.windowHeight;
    }
 
})