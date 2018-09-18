import { teamList } from '../../../services/API';
import { auth } from '../../../services/auth'; 

const app = getApp();
Page({
  data: {
    userInfo: '',
    from: '',
    id: '',
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
      // {
      //   name: '淘客中心',
      //   src: '../../../images/icon_user_yongjin.png',
      //   url: '/pages/TAOKE/taokehome/taokehome'
      // },
      {
        distribut:1,
        name: '分销中心',
        src: '../../../images/icon_user_yongjin.png',
        url: '/pages/FENXIAO/fenxiao/fenxiao'
      },
      {
        distribut: 0,
        name: '成为分销商',
        src: '../../../images/icon_user_yongjin.png',
        url: '/pages/HOME/jiaru/jiaru'
      },
      // {
      //   name: '我的秒杀',
      //   src: '../../../images/icon_user_miaosha.png',
      //   url: '/pages/USER/refundOrder/refundOrder'
      // },
      {
        name: '我的拼团',
        src: '../../../images/icon_user_tuan.png',
        url: '/pages/TEAM/order/order'
      },
      // {
      //   name: '我的预约',
      //   src: '../../../images/icon_user_yuyue.png',
      //   url: '/pages/USER/collect/collect'
      // },
      {
        name: '我的优惠券',
        src: '../../../images/icon_user_yhq.png',
        url: '/pages/USER/notused/notused'
      },
      {
        name: '我的积分',
        src: '../../../images/icon_user_jifen.png',
        url: '/pages/INTEGRAL/record/record'
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
        url: '/pages/USER/refund/refund'
      },
      {
        name: '商品收藏',
        src: '../../../images/icon_user_soucang.png',
        url: '/pages/USER/collect/collect'
      },
         {
        name: 'WEBVIEW',
        src: '../../../images/icon_user_kefu.png',
           url: '/pages/USER/webview/webview'
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
    ]
  },
  onLoad(options) {

    this.setData({ 
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