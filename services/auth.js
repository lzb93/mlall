import * as wxAPI from './wxAPI'
import { thirdLogin } from './API'

// 获取用户信息（一系列流程）

export function auth(cb, page, id, itemId, teamId) {
 
  let userInfo = '';
  wxAPI.getSetting()
  .then((res) => {
    if(~res.indexOf('scope.userInfo')) {
      wxAPI.getUserInfo()
      .then((res) => {
        userInfo = res.userInfo;
        wxAPI.showLoading('登陆中...', true)
        return wxAPI.login()
      })
      .then((res) => {
        // console.log(res);
        var hash = wx.getStorageSync("hash");
        return thirdLogin({
          code: res.code,
          from: 'miniapp', 
          nickname: userInfo.nickName, 
          head_pic: userInfo.avatarUrl,
          hash:hash
        })
      })
      .then(({ status, result, msg }) => {
        wx.clearStorage({
          key: 'hash',
          success: function (res) {
            console.log("清hash");
          }
        })
        wxAPI.hideLoading();
        console.log(status)
        console.log(result)
        getApp().userInfo = result;
        getApp().userInfo.nickname = userInfo.nickName;
        getApp().token = result.token;
        cb && cb(result);
        if(teamId) {
          wx.navigateTo({
            url: '/' + page + '?id=' + id + '&team_id=' + teamId
          })
          return;
        }
        if(itemId) {
          wx.navigateTo({
            url: '/' + page + '?id=' + id + '&item_id=' + itemId
          })
        } else if(id && !itemId) {
          wx.navigateTo({
            url: '/' + page + '?id=' + id
          })
        } else if(page) {
          wx.reLaunch({
            url: '/' + page
          })
        }
      })
      .catch((e) => {
        wxAPI.hideLoading();
      })
      return;
    } else {
      wxAPI.hideLoading();
      return;
    }
  })
}
