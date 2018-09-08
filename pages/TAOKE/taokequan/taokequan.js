// pages/TAOKE/taokezq/taokezq.js
import { DggetCoupon, getCoupon, DggetGoodsInfo } from '../../../services/API'
import { dalay, js_date_timeday } from '../../../utils/utils'

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    http: app.http,
    host: app.host,
    banners: '',
    goods_id:'',
    hash:'',
    coupon_id: '',
    activeType: 0,
    navs: [],
    list: [],
    coupon:{},
    start_time: "",
    end_time: "",
    recomment:[],
    recommentlist: [],
  },
  // 领券
  getCouponbtn(){
    this.getCoupon({ coupon_id: this.data.coupon_id})
  },
  getCoupon(params) {
    getCoupon(params).then(({ status, result, msg }) => {

      if (status == 1) {
        app.wxAPI.alert(msg);
        wx.navigateTo({
          url: `/pages/KILL/detail/detail?id=${this.data.goods_id}&hash=${this.data.hash}`
        })
      } else {
        app.wxAPI.alert(msg);
        wx.navigateTo({
          url: `/pages/KILL/detail/detail?id=${this.data.goods_id}&hash=${this.data.hash}`
        })
      }
    })
  },
  // 领券界面
  DggetCoupon(params) {
    DggetCoupon(params).then(({ status, result, msg }) => {

      if (status == 1) {
        this.setData({
          coupon: result.coupon,
          recommentlist: result.goods,
          start_time: js_date_timeday(result.coupon.use_start_time),
          end_time: js_date_timeday(result.coupon.use_end_time),
        })
      } else {
        app.wxAPI.alert(msg);
      }
    })
  },
 

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options.id);
    // console.log(options.hash);
    // console.log(options.coupon_id);
    this.DggetCoupon({ goods_id: 189, hash: "5b7bede284c1c", coupon_id: 44});
    this.setData({
      goods_id: 189,
      hash: "5b7bede284c1c",
      coupon_id: 44

    });

    DggetGoodsInfo({ goods_id: 189, coupon_id: 44 }).then(({ status, result, msg }) => {
      app.wxAPI.hideLoading();
      if (status == 1) {
        this.setData({
          goodsInfo: result.info,
          recomment: result.recomment.data,

        })
      } else {
        app.wxAPI.alert(msg);
      }
    })
      .catch(() => {
        app.wxAPI.hideLoading();
        app.wxAPI.alert('加载失败！')
        wx.switchTab({
          url: `/pages/HOME/home/home`
        })
      })
 
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

  }


})