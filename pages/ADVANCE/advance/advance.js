// pages/ADVANCE/advance/advance.js
import { presellList } from '../../../services/API'
import { dalay } from '../../../utils/utils'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    http: app.http,
    host: app.host,
    presellList:[],
    page: 1,
    isAgain: true,
    isNomore: false,
  },

  // 秒杀
  presellList(params) {
    presellList(params).then(({ status, result, msg }) => {

      if (status == 1) {
        this.setData({
          presellList: result,
          page: ++this.data.page,
          isAgain: true
        })
        this.finish(result);
      } else {
        app.wxAPI.alert(msg);
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.presellList();
  },
  onReachBottom() {
    if (!dalay(1000)) return;
    if (!this.data.isAgain) return;
    this.setData({ isAgain: false });
    this.presellList({ page: this.data.page });
  },
  //结束处理
  finish(arr) {
    if (arr.length < 5) {
      this.setData({
        isAgain: false,
        isNomore: true
      })
    }
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