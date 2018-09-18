// pages/HOME/fenxiao/fenxiao.js
import { distributHash, distributIndex, distributWd} from '../../../services/API'
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
    distribut:{},
    orders:{},
    activeType:0,
    txalert:false,  
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
    items: [
      {
        name: '分销佣金',
        src: '../../../images/fx_yj.png',
        url: '/pages/FENXIAO/tixianjm/tixianjm'
      },
      {
        name: '分销订单',
        src: '../../../images/fx_dd.png',
        url: '/pages/FENXIAO/fxorder/fxorder'
      },
      {
        name: '提现明细',
        src: '../../../images/fx_tx.png',
        url: '/pages/FENXIAO/tixian/tixian'
      },
      {
        name: '我的合伙人',
        src: '../../../images/fx_hhr.png',
        url: '/pages/FENXIAO/tuandui/tuandui'
      },
      {
        name: '我的二维码',
        src: '../../../images/fx_ewm.png',
        url: '/pages/FENXIAO/erweima/erweima'
      },
      ]
  
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
    this.distributIndex({ orderType:type})
  },

  // 分享时候请求hash 接口
  distributHash(params) {
    distributHash(params).then(({ status, result, msg }) => {

      if (status == 1) {
        this.setData({

        })
      } else {
        app.wxAPI.alert(msg);
      }
    })
  },



  // 分销中心首页  orderType： 1有效订单 & 2无效订单
  distributIndex(params) {
    distributIndex(params).then(({ status, result, msg }) => {

      if (status == 1) {
        this.setData({
          distribut: result,
          // orders: result.orders.data
        })
      } else {
        app.wxAPI.alert(msg);
      }
    })
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

  tixianalert: function () {
    this.setData({
      txalert: true
    })
  },
  gbtixian: function () {
    this.setData({
      txalert: false
    })
  },

  formSubmit: function (e) {


    if (e.detail.value.userName.length == 0 || e.detail.value.yhknum.length == 0 ||  e.detail.value.yhkname.length == 0) {
      app.wxAPI.alert("银行卡信息请填写完整！");
    } else {
      this.distributWd({ account_name: e.detail.value.userName, account_bank: e.detail.value.yhknum, bank_name: e.detail.value.yhkname, money: e.detail.value.money })
      this.setData({
        txalert: true
      })
    }

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
    this.distributIndex();
  
  },

})