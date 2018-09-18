// pages/HOME/bobing/bobing.js
import { lotteryautumn, lotteryaddUser, lotteryList, userList, autumnRankings, Autumnindex, Autumnshare } from '../../../services/API'
var bbjson = require('../../../utils/bbjson.js');

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    alertcj:false,
    bbalert:false,
    bbGb: false,
    bbgif:true,
    bbgifwarp: false,
    bbstar: true,
    zhongjiang_id:"",
    bbimg:[1,2,3,4,5,6],
    bbjosn:{},
    article_ph:[],
    siblings:[],
    rank:0,
    article:[
      {
        title:123123,
        article_id:213123
      },
      {
        title: 123123,
        article_id: 213123
      },
      {
        title: 123123,
        article_id: 213123
      },
    ]
  
  },

  // zhuli
  Autumnshare(params) {
    Autumnshare(params).then(({ status, result, msg }) => {

      if (status == 1) {
        this.setData({

        })
      } else {
        app.wxAPI.alert(msg);
      }
    })
  },
  // zhuli
  Autumnindex(params) {
    Autumnindex(params).then(({ status, result, msg }) => {

      if (status == 1) {
        this.setData({

        })
      } else {
        app.wxAPI.alert(msg);
      }
    })
  },


  bbalert: function () {
    this.setData({
      bbalert: true
    })
    this.lotteryurse();

  },

  formSubmit: function (e) {
    console.log(123)
    if (e.detail.value.userName.length == 0 || e.detail.value.tel.length == 0 || e.detail.value.address.length == 0) {
      app.wxAPI.alert("信息请填写完整！");
    } else {
      console.log(this.data.zhongjiang_id);
      this.lotteryaddUser({ username: e.detail.value.userName, mobile: e.detail.value.tel, address: e.detail.value.address, lottery_id: this.data.zhongjiang_id })
      this.setData({
        alertcj: false
      })
    }
  },

  cJguanbi: function () {
    this.setData({
      bbalert: false,
      // alertcj: false,

    })

  },
  alertgb: function () {
    this.setData({
      // bbalert: false,
      alertcj: false,

    })

  },


  //传入6骰子点数
  lotteryautumn(params) {
    lotteryautumn(params).then(({ status, result, msg }) => {
      if (status == '-101') {
        app.wxAPI.alert(msg)
      }
      if (status == 1) {
        this.setData({
          bbjosn: result,
          zhongjiang_id: result.lottery_id
        })
        if (result.is_delivery=="1"){
          this.setData({
            alertcj: true,
            bbGb: true,
          })
        }else{
          this.lotteryaddUser({ lottery_id: result.lottery_id})
        }

      } else {
        app.wxAPI.alert(msg)
          .then(() => {
            this.setData({
              bbGb:false ,
            })

          })
      }
    })
  },



  //  领取奖品  
  lotteryaddUser(params) {
    lotteryaddUser(params).then(({ status, result, msg }) => {

      if (status == 1) {
        this.setData({
          bbGb: true,
        })
      } else {
        app.wxAPI.alert(msg)
          .then(() => {
            this.setData({
              bbGb: false,
            })

          })
      }
    })
  },

  // 奖品列表
  lotteryList(params) {
    lotteryList(params).then(({ status, result, msg }) => {

      if (status == 1) {
        this.setData({

        })
      } else {
        app.wxAPI.alert(msg);
      }
    })
  },

  // 获奖名单
  userList(params) {
    userList(params).then(({ status, result, msg }) => {

      if (status == 1) {
        this.setData({
          article:result
        })
      } else {
        app.wxAPI.alert(msg) 
      }
    })
  },

  // autumnRankings
  // 获奖名单paihang
  autumnRankings(params) {
    autumnRankings(params).then(({ status, result, msg }) => {

      if (status == 1) {
        this.setData({
          article_ph: result.list,
          siblings: result.siblings,
          rank: result.rank,
        })
        if (result.rank<=5){
          this.setData({
            siblings: [],
          })     
        }
      } else {
        app.wxAPI.alert(msg)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.lotteryList();
    this.userList();
    this.autumnRankings();

    this.Autumnindex();
    
  },

  // 开始
  star: function () {

    // 开奖前动画
    this.setData({
      bbimg: [],
      bbgifwarp:true,
      bbstar:false,
    })
    var nametime = setInterval(() => {
      this.setData({
        bbgif: !this.data.bbgif
      });// 你倒计时显示的地方元素
    }, 200);

    // 开奖
    setTimeout(() => {
      var string=""
      for (var i = 0; i <= 5; i++) {
        var res = Math.round(5 * (Math.random()))+1;
        string = string + res
      }
      console.log(string)
      // var res = Math.round(bbjson.bbobj.length * (Math.random()));
      // var string = bbjson.bbobj[res].number
      // var obj2 = string.split("");

      this.setData({
        bbimg: string,
        // bbimg: obj2,
        // bbjosn: bbjson.bbobj[res],
        bbgifwarp: false,
      })
      this.lotteryautumn({ data: string});
      clearInterval(nametime);
      setTimeout(() => {
        this.setData({
          bbalert: true,
          bbstar:true,
        })
      }, 500);
    }, 1000);

  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {

    if (res.from === 'button') {


    }
    return {
      success: function (res) {
        this.Autumnshare();
        app.wxAPI.alert("分享成功！");
        
      },
      fail: function (res) {
        app.wxAPI.alert(res);

      }
    }
  }
})