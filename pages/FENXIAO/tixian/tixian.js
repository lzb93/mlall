// pages/HOME/tixian/tixian.js
import { distributwithdrawallist} from '../../../services/API'
import { dalay } from '../../../utils/utils'

const app = getApp()
Page({
  http: app.http,
  host: app.host,
  /**
   * 页面的初始数据
   */
  data: {
  
  },
  // 提现明细
  distributwithdrawallist(params) {
    distributwithdrawallist(params).then(({ status, result, msg }) => {

      if (status == 1) {
        this.setData({


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
    this.distributwithdrawallist()
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