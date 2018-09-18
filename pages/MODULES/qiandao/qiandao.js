import { integralMall, integralBanner, signin, signincount, signInLottery, lotteryadd } from '../../../services/API';

const app = getApp();
Page({
  data: {
    userInfo: app.userInfo,
    host: app.host,
    http: app.http,
    p: 1,
    isAgain: true,
    isNomore: false,
    items: [],
    banners: [],
    widthx:"",   //103倍数
    sign:[
      {
        name:"+1"
      },
      {
        name: "+1"
      },
      {
        name: "+1"
      },
      {
        name: "+1"
      },
      {
        name: "+1"
      },
      {
        name: "+1"
      },
      {
        name: "+1"
      },
    ],
    sign_count:""
  },


  // 领奖
  lotteryadd(params) {
    lotteryadd(params)
      .then(({ status, result, msg }) => {
        if (status == 1) {
          app.wxAPI.toast(msg, status)

        }
      })
  },
  // 签到jiangpin
  signInLottery(params) {
    signInLottery(params)
      .then(({ status, result, msg }) => {
        if (status == 1) {
          this.setData({
            sign: result.lottery
          });

        } else {
          app.wxAPI.alert(msg)
        }
      })
  },
  // 签到
  signin(params) {
    signin(params)
      .then(({ status, result, msg }) => {
        if (status == 1) {
          app.wxAPI.toast(msg, status);
          this.lotteryadd({ lottery_id: result.lottery_id});
          this.signincount();
        } else {
          app.wxAPI.alert(msg)
        }
      })
  },
  // 签到次数
  signincount(params) {
    signincount(params)
      .then(({ status, result, msg }) => {
        if (status == 1) {
          this.setData({
            sign_count: result.sign_count,
            widthx: parseInt(103) * parseInt(result.sign_count-1)
          });
        }
      })
  },

  onLoad() {
    this.signincount();
    this.signInLottery();
    this.setData({
      userInfo: app.userInfo
    })
    integralBanner()
      .then(({ status, result, msg }) => {
        if (status == 1) {
          this.setData({
            banners: result
          })
        }
      })
  },
  onShow() {
    let token = app.token;
    if (!token) {
      app.wxAPI.alert('未登录!')
        .then(() => {
          wx.reLaunch({
            url: '/pages/USER/user/user?from=pages/MODULES/qiandao/qiandao'
          })
        })
      return
    }
    this.integralMall({ p: this.data.p });
  },
  integralMall(params) {
    integralMall(params)
      .then(({ status, result, msg }) => {
        if (status == 1) {
          const list = result.goods_list;
          this.setData({
            items: this.data.items.concat(list),
            p: ++this.data.p,
            isAgain: true
          })

          this.finish(list);
        }
      })
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