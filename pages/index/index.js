// pages/cinema/cinema.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ip: 'http://172.20.10.14:8889',
    IP: "http://172.20.10.14:8848",
    list: [],
    imgs: [],
    /**
    * 页面配置
    */
    winWidth: 0,
    winHeight: 0,
    // tab切换
    currentTab: 0,
  },
  //点击跳转的地址
  changeName:function(e){
    
wx.navigateTo({
  url: '../details/details',
})
   
    console.log(e.target)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    wx.request({
      url: this.data.ip + '/min', //仅为示例，并非真实的接口地址
      method: "POST",
      success: (res) => {
        let riqi = ["一", "二", "三", "四", "五", "六", "日",]
        let data = res.data
        //动态计算电影是否上映
        for (let music of data) {
          //电影上映时间和当前时间相差的时间
          let ctime =Date.parse(music.movie_date.slice(0,10))-Date.parse(new Date())
          // music.isActive=ctime<=0
          if (ctime <= 0) {
            music.isActive = true;
          } else {
            music.isActive = false;
          
          //电影上映时间在当前时间往后七天内的电影
          if (ctime <= 86400000 * 7) {
            let xq = new Date().getDay() + Math.ceil(ctime / 86400000);
            //本周
            if (xq <= 7) {
              music.replayTime = music.movie_date.slice(0, 10) + "" + "本周" + riqi[xq - 1] + "上映"
            } else {
              //下周
              music.replayTime = music.movie_date.slice(0, 10) + "" + "下周" + riqi[xq - 8] + "上映"
            }
          }else{
            //时间
            music.replayTime = music.movie_date.slice(0, 10)+""+"上映"
          }
          // console.log(music.replayTime)
          }
          //判断待映里的数据
          if (ctime <= 0) {
            music.aaa = false
          } else {
            music.aaa = false

          }
        }

        //转换图片的反斜杠
        let movie_img = data.map((item) => {
          return item.movie_cover_img[0].replace(/\\/g, "/")
        })
        this.setData({
          list: data,
          imgs: movie_img
        })
        console.log(res.data)


      }
    })

//写导航部分
    var that = this;
    /**
     * 获取系统信息
     */
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    });
  },
  /**
   * 滑动切换tab
   */
  bindChange: function (e) {

    var that = this;
    that.setData({ currentTab: e.detail.current });

  },
  /**
   * 点击tab切换
   */
  swichNav: function (e) {

    var that = this;

    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  }
})




