// pages/HOME/jiaru/jiaru.js
import { distributapply } from '../../../services/API'
import { dalay } from '../../../utils/utils'

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    writeDiary: false,
    writeChecked: true,
  },
  writeChecked: function (e) {
    this.setData({
      writeChecked: !this.data.writeChecked,
    });
  },
  //协议
  openWindows: function (e) {
    this.setData({
      writeDiary: true,
    });


  },

  // 取消
  noneWindows: function (e) {
    this.setData({
      writeDiary: false,
    });
  },
  // 申请分销商 接口
  distributapply(params) {
    distributapply(params).then(({ status, result, msg }) => {
      if (status == 1) {
        app.wxAPI.alert(msg);
        this.setData({

        })
      } else {
        app.wxAPI.alert(msg);
      }
    })
      .catch(() => {
        app.wxAPI.alert("加载失败！请联系管理员")
          .then(() => {
            wx.switchTab({
              url: `/pages/HOME/home/home`
            })
          })
      })
  },

  formSubmit: function (e) {
    var phone = e.detail.value.mobile;
    if (!(/^1[34578]\d{9}$/.test(phone))) {
      app.wxAPI.alert('请输入正确的手机号码！');    
    } else if (e.detail.value.holder == "") {
      app.wxAPI.alert('名字不能为空！');
    } else if (this.data.writeChecked==false){
      app.wxAPI.alert('请确认协议！');
      
    }else{
      // distributapply({ username: e.detail.value.holder, mobile: e.detail.value.mobile })
      distributapply({ username: e.detail.value.holder, mobile: e.detail.value.mobile }).then(({ status, result, msg }) => {
        if (status == 1) {
          app.wxAPI.alert(msg);
          this.setData({

          })
        } else {
          app.wxAPI.alert(msg);
        }
      })
    }
    
  


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let token = app.token;
    if (!token) {
      app.wxAPI.alert('未登录!')
        .then(() => {
          wx.reLaunch({
            url: '/pages/USER/user/user?from=pages/HOME/jiaru/jiaru'
          })
        })
      return
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})