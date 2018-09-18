import request, { get, post } from '../utils/request'
import config from '../utils/config'
// 登录（获取token）
export function thirdLogin(params) {
  return post(config.host + 'c=User&a=thirdLogin', params)
}
// 首页数据
export function homePage() {
  return get(config.host + 'c=Index&a=home')
}
//分类页面
export function getCategory() {
  return get(config.host + 'c=Index&a=getCategory')
}
//分类加载更多
export function getGoodsList(params) {
  return get(config.host + 'c=Index&a=getGoodsList', params)
}
//获取订单详情
export function getOrderDetail(params) {
  return get(config.host + 'c=Order&a=order_detail', params)
}
//获取首页秒杀数据1  和预售4
export function promotelist(params) {  
  return post(config.host + 'c=activity&a=promote_list', params)
}

//获取预售列表
export function presellList(params) {
  return post(config.host + 'c=activity&a=presell_list', params)
}

//获取预售详情接口
export function presellInfo(params) {
  return post(config.host + 'c=activity&a=presell_info', params)
}

//秒杀首页2
export function flashsale(params) {
  return get(config.host + 'c=Promotion&a=flash_sale', params)
}
//获取秒杀时间点
export function killTime(params) {
  return post(config.host + 'c=activity&a=flash_sale_time', params)
}
//获取秒杀数据
export function killData(params) {
  return post(config.host + 'c=activity&a=flash_sale_list', params)
}
//获取秒杀价格
export function killActivity(params) {
  return get(config.host + 'c=Goods&a=goods_activity', params)
}

//积分轮播
export function integralBanner(params) {
  return get(config.host + 'c=Index&a=integralBanner', params)
}
//积分商城
export function integralMall(params) {
  return get(config.host + 'c=Goods&a=integralMall', params)
}
//积分立即兑换
export function integral(params) {
  return post(config.host + 'c=Cart&a=integral', params)
}
//积分立即兑换提交
export function integral2(params) {
  return post(config.host + 'c=Cart&a=integral2', params)
}
// 我的积分记录
export function accountlog(params) {
  return post(config.host + 'c=Account&a=log', params)
}


//拼团首页
export function teamList(params) {
  return get(config.host + 'c=Team&a=AjaxTeamList', params)
}

//拼团详情
export function teamDetail(params) {
  return get(config.host + 'c=Team&a=info', params)
}
//获取拼团队伍信息
export function teamInfo(params) {
  return get(config.host + 'c=Team&a=ajaxTeamFound', params)
}
//拼团下单
export function addOrder(params) {
  return post(config.host + 'c=Team&a=addOrder', params)
}
//拼团订单结算页
export function teamOrder(params) {
  return post(config.host + 'c=Team&a=order', params)
}
//拼团获取订单详情
export function getOrderInfo(params) {
  return post(config.host + 'c=Team&a=getOrderInfo', params)
}
//获取更多拼团订单
export function getMoreTeam(params) {
  return get(config.host + 'c=order&a=team_list', params)
}


//获取分享页
export function getTeamFound(params) {
  return get(config.host + 'c=Team&a=found', params)
}

//获取商品详情
export function goodsInfo(params) {
  return post(config.host + 'c=Goods&a=goodsInfo', params)
}
//收藏商品
export function collectGoods(params) {
  return post(config.host + 'c=Goods&a=collectGoodsOrNo', params)
}
//获取商品详情内容
export function goodsdetail(params) {
  return get(config.host + 'c=Goods&a=goodsContent', params)
}
//获取商品评价
export function getGoodsComment(params) {
  return post(config.host + 'c=Goods&a=getGoodsComment', params)
}

//加入购物车
export function addCart(params) {
  return post(config.host + 'c=Cart&a=addCart', params)
}
//购物车列表
export function cartList(params) {
  return post(config.host + 'c=Cart&a=cartList', params)
}
//删除购物车产品
export function delCart(params) {
  return post(config.host + 'c=Cart&a=delCart', params)
}
//获取订单表格
export function orderEdit(params) {
  return post(config.host + 'c=Cart&a=cart2', params)
}
//提交订单
export function saveOrder(params) {
  return post(config.host + 'c=Cart&a=cart3', params)
}
// 获取微信支付需要的信息
export function getPaymentOrder(params) {
  return get(config.host + 'c=Cart&a=cart4', params)
}
//支付
export function doPay(params) {
  return post(config.host + 'c=Wxpay&a=dopay', params)
}
//确定收货
export function orderConfirm(params) {
  return post(config.host + 'c=User&a=orderConfirm', params)
}
//取消订单
export function cancelOrder(params) {
  return get(config.host + 'c=User&a=cancelOrder', params)
}
//取消订单(已支付)
export function refundOrder(params) {
  return post(config.host + 'c=Order&a=refund_order', params)
}
//申请售后
export function returnGoods(params) {
  return post(config.host + 'c=Order&a=return_goods', params)
}
//订单退款
export function returnGodds(params) {
  return get(config.host + 'c=order&a=return_goods_info', params)
}
//售后列表
export function refundGoodsList(params) {
  return post(config.host + 'c=user&a=return_goods', params)
}
// //退款列表
// export function refundOrderList(params) {
//   return post(config.host + 'c=order&a=return_goods_list', params)
// }
//查看物流
export function getExpress(params) {
  return get(config.host + 'c=user&a=express', params)
}
//获取物流
export function getQueryExpress(params) {
  return get(config.host + 'c=user&a=queryExpress', params)
}
//评价
export function getGoodsaddcomment(params) {
  return post(config.host + 'c=User&a=add_comment', params)
}


//获取收货地址列表
export function getAddressList() {
  return get(config.host + 'c=User&a=getAddressList')
}
//编辑或添加收货地址
export function addAddress(params) {
  return post(config.host + 'c=User&a=addAddress', params)
}
//设置默认收货地址
export function setDefaultAddress(params) {
  return post(config.host + 'c=User&a=setDefaultAddress', params)
}
//删除收货地址
export function delAddress(params) {
  return post(config.host + 'c=User&a=del_address', params)
}

//获取订单列表
export function getOrderList(params) {
  return get(config.host + 'c=User&a=getOrderList', params)
}
//获取收藏商品列表
export function getGoodsCollect(params) {
  return get(config.host + 'c=User&a=getGoodsCollect', params)
}
//获取我的优惠卷
export function getCouponList(params) {
  return get(config.host + 'c=User&a=getCouponList', params)
}
//领劵中心
export function couponList(params) {
  return get(config.host + 'c=Activity&a=coupon_list', params)
}
//领取优惠券
export function getCoupon(params) {
  return post(config.host + 'c=Activity&a=get_coupon', params)
}

//省市区获取
export function getRegion(params) {
  return get(config.host + 'c=index&a=get_region', params)
}

//商品搜索
export function search(params) {
  return get(config.host + 'c=Goods&a=search', params)
}

// 分销
// /api/distribut / hash  分享时候请求hash 接口  ，参数goods_id 商品ID，用户打开连接的时候保存这个hash值，在添加购物车的时候传入这个hash
export function distributHash(params) {
  return get(config.host + 'c=distribut&a=hash', params)
}


// /api/distribut / index 分销中心首页     返回应答  'income' 收入明细  withdrewal 可提现金额，orders 分销订单详情，订单详情，返回的是分页信息
export function distributIndex(params) {
  return get(config.host + 'c=distribut&a=index', params)
}


// /api/distribut / withdrawal  申请提现             请求参数* account_bank 银行卡号
//   * account_name 开户名
//     * bank_name 银行名称
//       * money  提现金额
export function distributWd(params) {
  return get(config.host + 'c=distribut&a=withdrawal', params)
}


// 微淘

// 获取分类(导航栏)
// index.php ? m = api & c=tao & a=getCat
export function taogetCat(params) {
  return get(config.host + 'c=tao&a=getCat', params)
}


// 获取列表
// index.php ? m = api & c=tao & a=getList
export function taogetList(params) {
  return get(config.host + 'c=tao&a=getList', params)
}


// 获取单篇文章
// index.php ? m = api & c=tao & a=getOne & article_id=get / post
export function taogetOne(params) {
  return get(config.host + 'c=tao&a=getOne', params)
}

// 获取评论
// index.php ? m = api & c=tao & a=getComment & article_id=
// get / post
export function taogetComment(params) {
  return get(config.host + 'c=tao&a=getComment', params)
}

// 发表评论post
// index.php ? m = api & c=tao & a=addComment & article_id=
// 必填参数content
export function taoaddComment(params) {
  return get(config.host + 'c=tao&a=addComment', params)
}


// 回复评论post
// index.php ? m = api & c=tao & a=addAnswer & comment_id=
// 必填参数content
export function taoaddAnswer(params) {
  return get(config.host + 'c=tao&a=addAnswer', params)
}

// 回复赞
// article_id=

export function taoaddZan(params) {
  return get(config.host + 'c=tao&a=zan', params)
}



// 淘客专区  
// 个人中心
export function DistributPersonIndex(params) {
  return get(config.host + 'c=DistributPerson&a=index', params)
}

// http://whole.meilashidai.net/index.php?m=api&c=DistributGoods&a=getCategory  获取分销分类信息，及全部分销商品
export function DggetCategory(params) {
  return get(config.host + 'c=DistributGoods&a=getCategory', params)
}

// http://whole.meilashidai.net/index.php?m=api&c=DistributGoods&a=getGoodsList&category_id={分类ID}  获取分销分类信息，及全部分销商品
export function DggetGoodsList(params) {
  return get(config.host + 'c=DistributGoods&a=getGoodsList', params)
}


// http://whole.meilashidai.net/index.php?m=api&c=DistributGoods&a=getGoodsInfo&goods_id={商品ID}  获取单个分销商品，及推荐分销商品
export function DggetGoodsInfo(params) {
  return get(config.host + 'c=DistributGoods&a=getGoodsInfo', params)
}


// shareCoupon  点击分享（返回hash
export function DgshareCoupon(params) {
  return get(config.host + 'c=DistributGoods&a=shareCoupon', params)
}

// getCoupon      领取优惠券界面
export function DggetCoupon(params) {
  return get(config.host + 'c=DistributGoods&a=getCoupon', params)
}

// /api/DistributPerson / withdrawal  申请提现             请求参数* account_bank 银行卡号
//   * account_name 开户名
//     * bank_name 银行名称
//       * money  提现金额
export function DistributPersonwd(params) {
  return get(config.host + 'c=DistributPerson&a=withdrawal', params)
}


// 博饼   
// http://whole.meilashidai.net/index.php?m=api&c=lottery&a=autumn  传入6骰子点数  data=[]

export function lotteryautumn(params) {
  return post(config.host + 'c=lottery&a=autumn', params)
}
// http://whole.meilashidai.net/index.php?m=api&c=lottery&a=addUser&lottery_id=奖品ID  领取奖品
export function lotteryaddUser(params) {
  return get(config.host + 'c=lottery&a=addUser', params)
}

//  whole.meilashidai.net/index.php?m=api&c=lottery&a=lotteryList   奖品列表
export function lotteryList(params) {
  return get(config.host + 'c=lottery&a=lotteryList', params)
}

//  whole.meilashidai.net/index.php?m=api&c=lottery&a=userList   获奖名单
export function userList(params) {
  return get(config.host + 'c=lottery&a=userList', params)
}

// autumnRankings    榜单
export function autumnRankings(params) {
  return get(config.host + 'c=lottery&a=autumnRankings', params)
}


// 围住红包模块接口 
// 获取游戏配置信息  index.php?m=api&c=enclose&a=index

export function encloseindex(params) {
  return get(config.host + 'c=enclose&a=index', params)
}


// 达到分数条件，领取奖品
// index.php ? m = api & c=enclose & a=getPrize
// 必填参数step(int)步数
export function enclosegetPrize(params) {
  return get(config.host + 'c=enclose&a=getPrize', params)
}

// 分享游戏，成功游戏次数 + 1
// index.php ? m = api & c=enclose & a=share
export function encloseshare(params) {
  return get(config.host + 'c=enclose&a=share', params)
}

// 活动列表

//lottery/user_list 抽奖用户列表
export function lotteryurse(params) {
  return post(config.host + 'c=lottery&a=userList', params)
}

//lottery/lottery_list 奖品列表
export function lotterylist(params) {
  return get(config.host + 'c=lottery&a=lotteryList', params)
}

///lottery/addUser 抽奖结果提交  lottery_id 奖品ID，username 联系人，mobile 联系电话
export function lotteryadd(params) {
  return get(config.host + 'c=lottery&a=addUser', params)
}

// 游戏助力
// c=Autumn&a=index

export function Autumnindex(params) {
  return get(config.host + 'c=Autumn&a=index', params)
}

// c = Autumn & a=share
export function Autumnshare(params) {
  return get(config.host + 'c=Autumn&a=share', params)
}




// 酒店预定- m=api&c=reserve&a=getlist
export function reservegetlist(params) {
  return get(config.host + 'c=reserve&a=getlist', params)
}
// 详情   c=reserve&a=getInfo&reserve_id=5
export function reservegetInfo(params) {
  return get(config.host + 'c=reserve&a=getInfo', params)
}

// 下单   c=reserve&a=getInfo&reserve_id=5
export function reserveAddOrder(params) {
  return get(config.host + 'c=reserve&a=addOrder', params)
}

// 签到

// http://whole.meilashidai.net/index.php?m=api&c=lottery&a=signin  签到
export function signin(params) {
  return get(config.host + 'c=lottery&a=signin', params)
}

// http://whole.meilashidai.net/index.php?m=api&c=lottery&a=signincount  签到次数
export function signincount(params) {
  return get(config.host + 'c=lottery&a=signincount', params)
}

// http://whole.meilashidai.net/index.php?m=api&c=lottery&a=signincount  签到礼品
export function signInLottery(params) {
  return get(config.host + 'c=lottery&a=signInLottery', params)
}


// 三级分销
// Uri:/api/distribut/apply   申请分销商   参数：username, mobile
export function distributapply(params) {
  return post(config.host + 'c=distribut&a=apply', params)
}

// 我的下级
// 如果我是一级分销，就返回所属二级以及三级的信息
// 如果我是二级分销，返回所属三级信息
// 如果我是三级分销，返回null
// Uri: /api/distribut / superior

export function distributsuperior(params) {
  return get(config.host + 'c=distribut&a=superior', params)
}

// Uri: /api/distribut / orderlist   订单

export function distributorderlist(params) {
  return get(config.host + 'c=distribut&a=orderlist', params)
}

// 分成记录接口
// 查询会员的所属的分成情况
// 返回数据 订单ID，订单号，商品名称，佣金数，订单状态

// Uri: /api/distribut / rebateList

export function distributrebateList(params) {
  return get(config.host + 'c=distribut&a=rebateList', params)
}



// Uri: /api/distribut / applywithdrawal

// 参数：  account_bank string  银行卡号   account_name string  开户名   bank_name string  银行名称   money decimal  提现金额

export function distributapplywithdrawal(params) {
  return post(config.host + 'c=distribut&a=applywithdrawal', params)
}

// 提现记录

// Uri: /api/distribut / withdrawallist

export function distributwithdrawallist(params) {
  return get(config.host + 'c=distribut&a=withdrawallist', params)
}
