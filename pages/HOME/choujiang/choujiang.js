import { lotteryurse, lotterylist, lotteryadd } from '../../../services/API'
import { dalay } from '../../../utils/utils'
const app = getApp()
Page({
  data: {
    http: app.http,
    host: app.host,
    awardsList: {},
    animationData: {},
    btnDisabled: '',
    cjalert: false,
    alertcj: false,
    lotteryurse: [],
    zhongjiang_id: "",
    zhongjiang_delivery: 0,
    page: 1,
    isAgain: true,
    isNomore: false,
    reward: [],
    rewardlist: 0,

  },
  gotoList: function () {
    wx.redirectTo({
      url: '../list/list'
    })
  },
  zjlist: function () {
    this.setData({
      cjalert: true
    })
    this.lotteryurse();

  },
  cJguanbi: function () {
    this.setData({
      cjalert: false,
      alertcj: false,
    })

  },

  // 领奖 
  lotteryadd(params) {
    lotteryadd(params).then(({ status, result, msg }) => {

      if (status == 1) {
        app.wxAPI.alert(msg);
      } else {
        app.wxAPI.alert(msg);
      }
    })
  },

  lotteryurse(params) {
    lotteryurse().then(({ status, result, msg }) => {
      if (status == 1) {
        this.setData({
          lotteryurse: result
        })
      } else {
        app.wxAPI.alert(msg);
      }
    })
  },

  formSubmit: function (e) {
    console.log(123)
    if (e.detail.value.userName.length == 0 || e.detail.value.tel.length == 0 || e.detail.value.address.length == 0) {
      app.wxAPI.alert("信息请填写完整！");
    } else {
      console.log(this.data.zhongjiang_id);
      this.lotteryadd({ username: e.detail.value.userName, mobile: e.detail.value.tel, address: e.detail.value.address, lottery_id: this.data.zhongjiang_id })
      this.setData({
        alertcj: true
      })
    }
  },

  onLoad() {
    this.lotteryurse();


  },

  getLottery: function () {
    var that = this
    var awardIndex = Math.random() * that.data.rewardlist >>> 0;

    // 获取奖品配置
    var awardsConfig = app.awardsConfig,
      runNum = 8
    if (awardIndex < 2) awardsConfig.chance = false


    // 初始化 rotate
    /*  var animationInit = wx.createAnimation({
        duration: 10
      })
      this.animationInit = animationInit;
      animationInit.rotate(0).step()
      this.setData({
        animationData: animationInit.export(),
        btnDisabled: 'disabled'
      })*/

    // 旋转抽奖
    app.runDegs = app.runDegs || 0

    app.runDegs = app.runDegs + (360 - app.runDegs % 360) + (360 * runNum - awardIndex * (360 / that.data.rewardlist))

    var animationRun = wx.createAnimation({
      duration: 4000,
      timingFunction: 'ease'
    })
    that.animationRun = animationRun
    animationRun.rotate(app.runDegs).step()
    that.setData({
      animationData: animationRun.export(),
      btnDisabled: 'disabled'
    })

    // 记录奖品
    var winAwards = wx.getStorageSync('winAwards') || { data: [] }
    winAwards.data.push(awardsConfig.awards[awardIndex].name + '1个')
    wx.setStorageSync('winAwards', winAwards)

    // 中奖提示
    setTimeout(function () {
      wx.showModal({
        title: '恭喜',
        content: '获得' + (awardsConfig.awards[awardIndex].name),
        showCancel: false
      })

      that.setData({
        zhongjiang_id: awardsConfig.awards[awardIndex].id,
        zhongjiang_delivery: awardsConfig.awards[awardIndex].is_delivery,
      })
      if (awardsConfig.chance) {
        that.setData({
          btnDisabled: '',
          zhongjiang_id: awardsConfig.awards[awardIndex].id,
          zhongjiang_delivery: awardsConfig.awards[awardIndex].is_delivery,
        })
      }
      if (awardsConfig.awards[awardIndex].is_delivery == 1) {
        that.setData({
          alertcj: true,
        })
      } else {
        console.log(123123)
        that.lotteryadd({ lottery_id: that.data.zhongjiang_id })
      }
    }, 4000);


    /*wx.request({
      url: '../../data/getLottery.json',
      data: {},
      header: {
          'Content-Type': 'application/json'
      },
      success: function(data) {
        console.log(data)
      },
      fail: function(error) {
        console.log(error)
        wx.showModal({
          title: '抱歉',
          content: '网络异常，请重试',
          showCancel: false
        })
      }
    })*/
  },
  onReady: function (e) {
    let token = app.token;
    if (!token) {
      app.wxAPI.alert('未登录!')
        .then(() => {
          wx.redirectTo({
            url: '/pages/USER/user/user?from=pages/HOME/choujiang/choujiang'
          })
        })
      return
    }

    lotterylist().then(({ status, result, msg }) => {
      if (status == 1) {
        let that = this;
        that.setData({
          rewardlist: result.length
        });

        // getAwardsConfig
        app.awardsConfig = {
          chance: true,
          awards: result
          //  [
          //   { 'index': 0, 'name': '1元红包' },
          //   { 'index': 1, 'name': '5元话费' },
          //   { 'index': 2, 'name': '6元红包' },
          //   { 'index': 3, 'name': '8元红包' },
          //   { 'index': 4, 'name': '10元话费' },
          //   { 'index': 5, 'name': '10元红包' }
          // ]
        }

        // wx.setStorageSync('awardsConfig', JSON.stringify(awardsConfig))


        // 绘制转盘
        var awardsConfig = app.awardsConfig.awards,
          len = awardsConfig.length,
          rotateDeg = 360 / len / 2 + 90,
          html = [],
          turnNum = 1 / len  // 文字旋转 turn 值
        that.setData({
          btnDisabled: app.awardsConfig.chance ? '' : 'disabled'
        })
        var ctx = wx.createContext()
        for (var i = 0; i < len; i++) {
          // 保存当前状态
          ctx.save();
          // 开始一条新路径
          ctx.beginPath();
          // 位移到圆心，下面需要围绕圆心旋转
          ctx.translate(150, 150);
          // 从(0, 0)坐标开始定义一条新的子路径
          ctx.moveTo(0, 0);
          // 旋转弧度,需将角度转换为弧度,使用 degrees * Math.PI/180 公式进行计算。
          ctx.rotate((360 / len * i - rotateDeg) * Math.PI / 180);
          // 绘制圆弧
          ctx.arc(0, 0, 150, 0, 2 * Math.PI / len, false);

          // 颜色间隔
          // if (i % 2 == 0) {
          //   ctx.setFillStyle('rgba(0,184,32,.1)');
          // } else {
          //   ctx.setFillStyle('rgba(255,203,63,.1)');
          // }

          // 填充扇形
          ctx.fill();
          // 绘制边框
          ctx.setLineWidth(0.5);
          ctx.setStrokeStyle('rgba(228,55,14,.1)');
          ctx.stroke();

          // 恢复前一个状态
          ctx.restore();

          // 奖项列表
          html.push({ turn: i * turnNum + 'turn', lineTurn: i * turnNum + turnNum / 2 + 'turn', award: awardsConfig[i].name });
        }
        that.setData({
          awardsList: html
        });

        // 对 canvas 支持度太差，换种方式实现
        /*wx.drawCanvas({
          canvasId: 'lotteryCanvas',
          actions: ctx.getActions()
        })*/


      } else {
        app.wxAPI.alert(msg);
      }
    })



  }

})
