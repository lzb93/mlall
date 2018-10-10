import { dhuogetList } from '../../../services/API'
import { remainTime } from '../../../utils/utils';
import { auth } from '../../../services/auth';
import * as wxAPI from '../../../services/wxAPI';

const WxParse = require('../../../utils/wxParse/wxParse.js')
const app = getApp();
const template = require('../../TEMPLATE/tabBar/tabBar.js');
Page({
  data: {
    http: app.http,
    host: app.host,
    page:1,
    scrolltop:"",
    p:0,
    video:'',
  },


  // 斗货  
  dhuogetList(params) {
    dhuogetList(params).then(({ status, result, msg }) => {
      console.log(this.data.scrolltop)
      if (status == 1) {
        if (result.data.length==0){
          app.wxAPI.alert("没有更多视频了~~");
          return

        }
        this.setData({
          video: result.data[this.data.p],
          videos: result.data,
          scrolltop:"0"
        })
        console.log(this.data.scrolltop)


        // WxParse.wxParse('article', 'html', result.data[this.data.p].content, this, 0);
      } else {
        app.wxAPI.alert(msg);
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.dhuogetList();
    template.tabbar("tabBar", 0, this);
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

  //专题点击
  clickSpecial() {
    template.tabbar("tabBar", 2, this);
    let special = this.data.special;

    if (special.list.length == 0) {
      app.wxAPI.alert('专题暂未开启！')
        .then(() => {
          template.tabbar("tabBar", 0, this);
        })
      return;
    }
    special.showSpecial = true;
    this.setData({ special });
  },
  navigatorTo(e) {
    let url = e.currentTarget.dataset.url;
    const id = e.currentTarget.dataset.id;
    if (!url) {
      url = `/pages/SPECIAL/special/special?id=${id}`
    }
    wx.navigateTo({
      url: url
    })
    this.closePopup();
    template.tabbar("tabBar", 0, this);
  },
  closePopup() {
    let special = this.data.special;
    special.showSpecial = false;
    this.setData({ special });
    template.tabbar("tabBar", 0, this);
  },
 


  

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  onReachBottom: function () {

    if (this.data.p>=this.data.videos.length){

      this.setData({
        page: this.data.page + 1,
      })
      this.dhuogetList({ page: this.data.page });
    }else{

      this.dhuogetList();
      this.setData({
        p: this.data.p + 1,
      })
   
    }
   
  },
})