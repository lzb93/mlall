import { teamList } from '../../../services/API';
import { auth } from '../../../services/auth'; 

const app = getApp();
Page({
  data: {
    userInfo: '',
    from: '',
    id: '',
    banbenhao:"",
    userNav: [
 
      {
        type: 'WAITPAY',
        src: '../../../images/icon_user_pay.png',
        name: '待付款'
      },
      {
        type: 'WAITSEND',
        src: '../../../images/icon_user_pend.png',
        name: '待发货'
      },
      {
        type: 'WAITRECEIVE',  
        src: '../../../images/icon_user_goods.png',
        name: '待收货'
      },
      {
        type: 'WAITCCOMMENT',
        src: '../../../images/icon_user_finish.png',
        name: '待评论'
      },
      // {
      //   type: 'RETURN',
      //   src: '../../../images/icon_user_tui.png',
      //   name: '退款列表'
      // }
    ],
    items: [
  
      {
        distribut:1,
        name: '分销中心',
        src: '../../../images/icon_user_yongjin.png',
        url: '/pages/FENXIAO/fenxiao/fenxiao',
        indes:"4",
      },
      {
        distribut: 0,
        name: '成为分销商',
        src: '../../../images/icon_user_yongjin.png',
        url: '/pages/HOME/jiaru/jiaru',
        indes:"4",
      },
      {
        name: '淘客中心',
        src: '../../../images/icon_user_yongjin.png',
        url: '/pages/TAOKE/taokehome/taokehome',
        indes:"4",
      },
      // {
      //   name: '我的秒杀',
      //   src: '../../../images/icon_user_miaosha.png',
      //   url: '/pages/USER/refundOrder/refundOrder'
      // },
      {
        name: '我的拼团',
        src: '../../../images/icon_user_tuan.png',
        url: '/pages/TEAM/order/order',
        indes: "2",
      },
      // {
      //   name: '我的预约',
      //   src: '../../../images/icon_user_yuyue.png',
      //   url: '/pages/USER/collect/collect'
      // },
      {
        name: '我的优惠券',
        src: '../../../images/icon_user_yhq.png',
        url: '/pages/USER/notused/notused',
        indes: "1",
      },
      {
        name: '我的积分',
        src: '../../../images/icon_user_jifen.png',
        url: '/pages/INTEGRAL/record/record',
        indes: "4",
        // url: '/pages/INTEGRAL/integral/integral'
      },
      // {
      //   name: '退款列表',
      //   src: '../../../images/icon_user_tui.png',
      //   url: '/pages/USER/refundOrder/refundOrder'
      // },
      {
        name: '售后/换货',
        src: '../../../images/icon_user_help.png',
        url: '/pages/USER/refund/refund',
        indes: "1",
      },
      {
        name: '商品收藏',
        src: '../../../images/icon_user_soucang.png',
        url: '/pages/USER/collect/collect',
        indes: "1",
      },
      {
        name: '3D图展',
        src: '../../../images/icon_user_kefu.png',
        url: '/pages/USER/webview/webview',
        indes: "3",
      }
      // {
      //   name: '博饼小游戏',
      //   src: '../../../images/icon_user_kefu.png',
      //   url: '/pages/HOME/bobing/bobing'
      // }
      // {
      //   name: '联系客服',
      //   src: '../../../images/icon_user_kefu.png',
      //   url: '/pages/USER/notused/notused'
      // }
    ],
    banben:[
      {
        name: '特惠版',
        type:"tehui",
        ind:"1",
      },
      {
        name: '基础版',
        type: "jichu",
        ind: "2",
      },
      {
        name: '高级版',
        type: "gaoji",
        ind: "3",
      },
      {
        name: '全能版',
        type: "quannneg",
        ind: "4",
      },
    ]
  },

  // 版本
  banben(e){

    // var hash = wx.getStorageSync("hash");    //取

    // wx.clearStorage({          // 删
    //   key: 'hash',
    //   success: function (res) {
    //     console.log("清楚缓存");
    //   }
    // })
    const ind = e.currentTarget.dataset.index;
    wx.setStorageSync('ind', ind);    //存
    this.setData({
      banbenhao: ind,
    });
  },

  onLoad(options) {

    var ind = wx.getStorageSync("ind");    //取

    this.setData({ 
      banbenhao:ind,
      userInfo: app.userInfo,
      from: options.from || '',
      id: options.id || '',
      itemId: options.item_id || '',
      teamId: options.team_id || ''
    });
  
    let token = app.token;
    if (!token) {
      auth(() => {
        this.setData({ userInfo: app.userInfo })
      })
    }
  },
  onShow() {

    if (app.userInfo.is_distribut == 1) {
      let items = this.data.items;
      items[0].distribut=0;
      items[1].distribut=1;
      this.setData({ items: items })

    }
  },
  openUserNav(e) {
    let token = app.token;
    if (!token) {
      app.wxAPI.alert('未登录!')
      return
    }
    const type = e.currentTarget.dataset.type;
    if (type == 'TEAM') {
      wx.navigateTo({
        url: `/pages/TEAM/order/order`
      })
    } else {
      wx.navigateTo({
        url: `/pages/USER/order/order?type=${type}`
      })
    }
  },
  tabList(e) {
    // let token = app.token;
    // if (!token) {
    //   app.wxAPI.alert('未登录!')
    //   return
    // }
    const index = e.currentTarget.dataset.index;
    const items = this.data.items;
    wx.navigateTo({
      url: items[index].url
    })
  },

  // 授权
  bindGetUserInfo(e) {
    app.auth(() => {
      this.setData({ userInfo: app.userInfo })
    }, this.data.from, (this.data.id || 0), (this.data.itemId || 0), this.data.teamId)
  }
})