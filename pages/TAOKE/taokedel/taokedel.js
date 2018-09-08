import { teamDetail, collectGoods, addOrder, DgshareCoupon, DggetGoodsInfo} from '../../../services/API';
import { js_date_time, remainTime } from '../../../utils/utils';

const WxParse = require('../../../utils/wxParse/wxParse.js')
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    http: app.http,
    host: app.host,
    goodsInfo: {},
    goods_id:'',
    fxalert: false,
    coupon_id: "",
    hash:"",





  },
  onLoad(e) {
    app.wxAPI.showLoading("加载中...");
    DggetGoodsInfo({ goods_id: e.id, coupon_id: e.coupon_id}).then(({ status, result, msg }) => {
      app.wxAPI.hideLoading();
   
      if (status == 1) {
        this.setData({
          goodsInfo: result.info,
          recomment: result.recomment.data,
          goods_id: e.id,
          coupon_id: e.coupon_id
        })
     


      } else {
        app.wxAPI.alert(msg);
      }
    })
      .catch(() => {
        app.wxAPI.hideLoading();
        app.wxAPI.alert('加载失败！')
          .then(() => {
            wx.navigateBack()
          })
      })

  },
 
 


  gbplalert: function () {
    this.setData({
      fxalert: false,
    })
  },

  fenxiang() {
    let token = app.token;
    if (!token) {
      // 没登录处理....
      app.wxAPI.alert('未登陆!')
        .then(() => {
          wx.reLaunch({
    url: `/pages/USER/user/user?from=pages/TAOKE/taokedel/taokedel&id=${this.data.goods_id}&coupon_id=${this.data.coupon_id}`
          })
        })
      return
    }
    const selectedSpec = this.data.selectedSpec;
    let params = {
      goods_id: this.data.goods_id,
      coupon_id: this.data.coupon_id,
    };
    DgshareCoupon(params)
      .then(({ status, result, msg }) => {
        if (status == 1) {
          console.log(result)
          this.setData({
            hash: msg.result,
            fxalert: true,
          })
       
        } else {
          app.wxAPI.alert(msg);
        }
      })
  },
  onShareAppMessage(res) {
    console.log(this.data.goods_id);
    console.log(this.data.hash);
    console.log(this.data.coupon_id);
    var that=this;
    return {
      title: this.data.goodsInfo.goods_name,
      path: '/pages/TAOKE/taokequan/taokequan?id=' + that.data.goods_id + '&hash=' + that.data.hash + '&coupon_id=' + that.data.coupon_id,

      success: function (res) {
        app.wxAPI.alert("分享成功！");
        that.setData({
          fxalert: false,
        })
        // 转发成功
      },
      fail: function (res) {
        app.wxAPI.alert(res);
        that.setData({
          fxalert: false,
        })
        // 转发失败

      }
    }
  }
})