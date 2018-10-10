import { getTabBar } from '../../../services/API.js'

//初始化数据
function tabbarinit() {
  return [
    {
      "current": 0,
      "pagePath": "/pages/DOUHUO/douhuo/douhuo",
      "iconPath": "/images/dhuo/home.png",
      "selectedIconPath": "/images/dhuo/home.png",
      "text": "首页"
    },
    {
      "current": 0,
      "pagePath": "/pages/DOUHUO/guanzhu/guanzhu",
      "iconPath": "/images/dhuo/guanzhu.png",
      "selectedIconPath": "/images/dhuo/guanzhu.png",
      "text": "关注"
    },
    {
      "current": 0,
      "iconPath": "/images/dhuo/pinlun.png",
      "selectedIconPath": "/images/dhuo/pinlun.png",
      "text": "专题"
    },
    {
      "current": 0,
      "pagePath": "/pages/DOUHUO/xiaoxi/xiaoxi",
      "iconPath": "/images/dhuo/xiaoxi.png",
      "selectedIconPath": "/images/dhuo/xiaoxi.png",
      "text": "消息"
    },
    {
      "current": 0,
      "pagePath": "/pages/DOUHUO/douhuouser/douhuouser",
      "iconPath": "/images/dhuo/urse.png",
      "selectedIconPath": "/images/dhuo/urse.png",
      "text": "我的"
    }
  ]
}

//tabbar 主入口
function tabbarmain(bindName = "tabdata", id, target) {
  var that = target;
  var bindData = {};
  var otabbar = tabbarinit();
  otabbar[id]['iconPath'] = otabbar[id]['selectedIconPath']//换当前的icon
  otabbar[id]['current'] = 1;
  bindData[bindName] = otabbar;
  that.setData({ bindData });
}

module.exports = {
  tabbar: tabbarmain
}