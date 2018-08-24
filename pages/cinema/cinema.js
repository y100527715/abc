// pages/cinema/cinema.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  ip:'http://172.20.10.14:8889',
  IP:"http://172.20.10.14:8848",
  list:[],
  imgs:[]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    
    wx.request({
      url: this.data.ip +'/min', //仅为示例，并非真实的接口地址
      method: "POST",
      success:  (res)=> {
        let data=res.data
        //动态计算电影是否上映
        for(let music of data){
          //上映时间
           let activeTime= new Date(music.time);
           //当前时间
           let nowTime=new Date();
           //时间差
          let ctime = activeTime.getTime() - nowTime.getTime();
          //如果时间已经过去了，可以购买，否则预售
          // music.isActive=ctime<=0
          if(ctime<=0){
            music.isActive=true;
          }else{
            music.isActive = false;
            
          }
          console.log(nowTime)
        }
       
        //转换图片的反斜杠
         let movie_img=data.map((item)=>{
          return item.movie_cover_img[0].replace(/\\/g, "/")        
        })
        this.setData({
          list: data,
          imgs: movie_img 
        })
        console.log(res.data)
    
     
      }
    })
  },

})
