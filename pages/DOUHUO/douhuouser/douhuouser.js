// pages/HOME/fenxiao/fenxiao.js
import { distributHash,} from '../../../services/API'
import { dalay } from '../../../utils/utils'

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: app.userInfo,
    http: app.http,
    host: app.host,
  

  },


  // 申请提现 
  distributWd(params) {
    distributWd(params).then(({ status, result, msg }) => {

      if (status == 1) {
        app.wxAPI.alert(msg);
      } else {
        app.wxAPI.alert(msg);
      }
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userInfo: app.userInfo,
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


  },

})