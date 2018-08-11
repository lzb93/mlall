import { accountlog } from '../../../services/API';

const app = getApp();
Page({
  data: {
    userInfo: app.userInfo,
    host: app.host,
    http: app.http,
    p: 1,
    isAgain: true,
    isNomore: false,
    items: []

  },
  onLoad() {
    this.setData({
      userInfo: app.userInfo
    })
    accountlog()
      .then(({ status, result, msg }) => {
        if (status == 1) {
          this.setData({
            items: result

          })
          this.finish(result);
        }
      })
  },
  onShow() {

  },

  finish(arr) {
    if (arr.length < 10) {
      this.setData({
        isAgain: false,
        isNomore: true
      })
    }
  },
  navigatorTo(e) {
    const id = e.currentTarget.dataset.id;
    if (~id) {
      wx.navigateTo({
        url: `/pages/KILL/detail/detail?id=${id}`
      })
    }
  }
})