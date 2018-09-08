import { taogetOne } from '../../../services/API';
import { js_date_time } from '../../../utils/utils';

const WxParse = require('../../../utils/wxParse/wxParse.js')
const app = getApp();
Page({
  data: {

  },
  onLoad(options) {
    this.setData({
      id: options.id
    })
    taogetOne({ article_id: options.id})
      .then(({status, result, msg}) => {
        this.setData({
          title: result.title
        })
        WxParse.wxParse('article', 'html', result.content, this, 5);
      })
  }
})