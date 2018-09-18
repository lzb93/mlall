import { couponList, homePage, promotelist, teamList, flashsale } from '../../../services/API'
import { dalay } from '../../../utils/utils'

const app = getApp()
Page({
  data: {
    http: app.http,
    host: app.host,
    isAgain: false,
    isNomore: true,
    first: '',
    third: '',
    banners: '',
    coupons: [],  //优惠券
    promotelist: [],  //秒杀
    teamList:[],  // 团购
    article: [{ 
      article_id:15,
      title:"秒杀专区的公告！"
      },
      {
        article_id: 15,
        title: "拼团专区的公告！"
      }],
    navTabs: [
      {
        src: '../../../images/icon_home_kill.png',
        name: '秒杀专区',
        url: '/pages/KILL/kill/kill'
      },
      {
        src: '../../../images/icon_home_tuangou.png',
        name: '拼团专区',
        url: '/pages/TEAM/team/team'
      },
      {
        src: '../../../images/icon_home_zhekou.png',
        name: '预售专区',
        url: '/pages/ADVANCE/advance/advance'
      },
      {
        url: '/pages/INTEGRAL/integral/integral',
        // src: '../../../images/icon_home_team.png',
        src: '../../../images/icon_home_zhekoumiaosha.png',
        name: '积分商城'
      },
      {
        url: '/pages/TAOKE/taokezq/taokezq',
        src: '../../../images/icon_home_cuxiao.png',
        name: '淘客专区'
      },
      // {
      //   url: 'appid',
      //   src: '../../../images/icon_home_team.png',
      //   name: '易茂林'
      // },
      {
        url: '/pages/HOME/game/game',
        src: '../../../images/icon_home_jifen.png',
        name: '游戏抽奖'
      },
      {
        src: '../../../images/icon_home_yuding.png',
        url: '/pages/MODULESNAV/hotel/hotel',
        name: '酒店预定'
      },
      // {
      //   url: '/pages/MODULES/qiandao/qiandao',
      //   src: '../../../images/icon_home_kanjia.png',
      //   name: '砍价专区'
      // },
         {
        url: '/pages/MODULES/qiandao/qiandao',
        src: '../../../images/icon_home_kanjia.png',
        name: '签到领奖'
      },
      // {
      //   url: '/pages/TAOKE/taokequan/taokequan',
      //   src: '../../../images/icon_home_team.png',
      //   name: '淘客quan'
      // },

      {
        url: '/pages/DOUHUO/douhuo/douhuo',
        src: '../../../images/icon_home_kanjia.png',
        name: '抖货'
      },

  
    ]
  },
 //优惠券
  couponList(params) {
    couponList(params).then(({ status, result, msg }) => {
      if (status == 1) {
        const coupons = (result || []).map(item => {
          return {
            name: item.name,
            money: parseInt(item.money),
            condition: item.condition,
          }
        });
        const arr = this.data.coupons.concat(coupons);
        this.setData({
          coupons: arr
        })
        console.log(arr)

      } else {
        app.wxAPI.alert(msg)
      }
    })
  },
  // 秒杀
  flashsale(params){
    flashsale(params).then(({ status, result, msg }) => {

      if (status == 1) {
        this.setData({
          promotelist: result
        })
      } else {
        app.wxAPI.alert(msg);
      }
    })
  },

  // 团购
  teamList(params){
    teamList(params).then(({ status, result, msg }) => {

      if (status == 1) {
        this.setData({
          teamList: result[0]
        })
      } else {
        app.wxAPI.alert(msg);
      }
    })
  },

 
  


  onLoad() {
    this.couponList({ type: 1, p: 1 });
    console.log(app.token)

    

    // 秒杀
    this.flashsale();

    //tuangou
    this.teamList();

    //  //预售
    // this.promotelist({ prom_type: 4 });
  },
  onShow() {
    app.wxAPI.showLoading('加载中...');
    homePage().then(({ status, result, msg }) => {
      app.wxAPI.hideLoading();
      if (status == 1) {
        this.setData({
          banners: result.banner,
          first: result.first,
          third: result.third,
          article: result.article,
        })
      } else {
        app.wxAPI.alert(msg);
      }
    })
  },
  onblur(e) {
    this.setData({
      keyword: e.detail.value
    })
  },
  oninput(e) {
    let keyword = e.detail.value
    if (keyword != '') {
      this.setData({
        isEmpt: true,
        keyword
      })
    } else {
      this.setData({
        isEmpt: false
      })
    }
    return keyword.trim()
  },
  empt() {
    setTimeout(() => {
      this.setData({
        keyword: '',
        isEmpt: false
      })
    }, 50)
  },
  search() {
    const keyword = this.data.keyword;
    if (keyword) {
      wx.navigateTo({
        url: `/pages/HOME/searchResult/searchResult?keyword=${keyword}`
      })
    }
  },
  tabList(e) {
    const index = e.currentTarget.dataset.index;
    const list = this.data.navTabs;
    if (list[index].url=="appid"){
      wx.navigateToMiniProgram({
        appId: 'wxb0dd17fbf140965f',
        path: 'pages/HOME/home/home',
        extraData: {
          foo: 'bar'
        },
        envVersion: 'develop',
        success(res) {
          // 打开成功
        }
      })
      return;
    }
    if(!list[index].url) {
      app.wxAPI.alert('该功能未开启！');
      return;
    } else {
      wx.navigateTo({
        url: list[index].url
      })
    }
  },

  // onReachBottom() {
  //   // if (!dalay(1000)) return;
  //   // if (!this.data.isAgain) return;
  //   this.setData({ isAgain: false });
  //   this.getGoodsList();

  // },



  // //结束处理
  // finish(arr) {
  //   if (arr.length < 10) {
  //     this.setData({
  //       isAgain: false,
  //       isNomore: true
  //     })
  //   }
  // },
  
  // 秒杀跳转
  urlDetail(e){
    const id = e.currentTarget.dataset.id;
    const itemId = e.currentTarget.dataset.itemId;
    wx.navigateTo({
      url: `/pages/KILL/detail/detail?id=${id}&itemId=${itemId}`
    })
  },


  onShareAppMessage(res) {
    return {
      title: '美拉商城',
      path: '/pages/HOME/home/home'
    }
  }
})