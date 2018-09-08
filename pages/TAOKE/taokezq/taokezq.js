// pages/TAOKE/taokezq/taokezq.js
import { homePage, DggetCategory, DggetGoodsList, DggetGoodsInfo} from '../../../services/API'
import { dalay } from '../../../utils/utils'

const app = getApp()
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    http: app.http,
    host: app.host,
    banners: '',
    activeType:0,
    navs:[],
    list:[],

  },
  // 分类
  DggetCategory(params) {
    DggetCategory(params).then(({ status, result, msg }) => {

      if (status == 1) {
        this.setData({
          navs: result.category,
          activeType: result.category[0].id,
          list: result.list.data

        })
      } else {
        app.wxAPI.alert(msg);
      }
    })
  },
  // 分类 -子
  DggetGoodsList(params) {
    DggetGoodsList(params).then(({ status, result, msg }) => {

      if (status == 1) {
        this.setData({
          list: result.data
        })
      } else {
        app.wxAPI.alert(msg);
      }
    })
  },

  // 商品详情
  DggetGoodsInfo(params) {
    DggetGoodsInfo(params).then(({ status, result, msg }) => {

      if (status == 1) {
        this.setData({
        })
      } else {
        app.wxAPI.alert(msg);
      }
    })
  },


  tabNavBar(e) {
    let type = ''
    type = e.currentTarget.dataset.type;

    this.setData({ activeType: type })
    this.DggetGoodsList({ category_id: type })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.DggetCategory();
    homePage().then(({ status, result, msg }) => {
      app.wxAPI.hideLoading();
      if (status == 1) {
        this.setData({
          banners: result.banner,

        })
      } else {
        app.wxAPI.alert(msg);
      }
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
  onShareAppMessage: function () {
  
  }
})