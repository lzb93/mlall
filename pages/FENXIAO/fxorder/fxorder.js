// pages/HOME/fenxiao/fenxiao.js
import { distributorderlist, distributrebateList } from '../../../services/API'
import { dalay } from '../../../utils/utils'

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    http: app.http,
    host: app.host,
    distribut: {},
    orders: {},
    activeType: 0,
    txalert: false,
    navs: [
      {
        title: '全部订单',
        type: '0',
      },
      {
        title: '有效订单',
        type: '1',
      },
      {
        title: '失效订单',
        type: '2',
      }
    ],
  },
  tabList(e) {
    let token = app.token;
    if (!token) {
      app.wxAPI.alert('未登录!')
      return
    }
    const index = e.currentTarget.dataset.index;
    const items = this.data.items;
    wx.navigateTo({
      url: items[index].url
    })
  },
  tabNavBar(e) {
    let type = ''
    type = e.currentTarget.dataset.type;
    this.setData({ activeType: type });
    this.distributIndex({ orderType: type })
  },

 


  // 分销中心首页  orderType： 1有效订单 & 2无效订单
  distributorderlist(params) {
    distributorderlist(params).then(({ status, result, msg }) => {

      if (status == 1) {
        this.setData({
          distribut: result.second,
          // orders: result.orders.data
        })
      } else {
        app.wxAPI.alert(msg);
      }
    })
  },

  distributrebateList(params) {
    distributrebateList(params).then(({ status, result, msg }) => {

      if (status == 1) {
        this.setData({
          distribut: result.second,
          // orders: result.orders.data
        })
      } else {
        app.wxAPI.alert(msg);
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let token = app.token;
    if (!token) {
      app.wxAPI.alert('未登录!')
        .then(() => {
          wx.reLaunch({
            url: '/pages/USER/user/user?from=pages/HOME/fenxiao/fenxiao'
          })
        })
      return
    }
    // this.distributorderlist();
    this.distributrebateList();

  },

})