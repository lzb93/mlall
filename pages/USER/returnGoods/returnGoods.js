import {  } from '../../../services/API';

const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    http: app.http,
    host: app.host,
    order: ''
  },
  onLoad() {
    console.log(app.cancelOrder )
    this.setData({ order: app.cancelOrder })
  },
  fun(e) {
    const type = e.currentTarget.dataset.type;
    wx.navigateTo({
      url: `/pages/USER/afterSale/afterSale?type=${type}`
    })
  }
})