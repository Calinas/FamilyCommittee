"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),_wepy=require("./../npm/wepy/lib/wepy.js"),_wepy2=_interopRequireDefault(_wepy),_finance=require("./../api/finance.js"),_common=require("./../utils/common.js"),_user=require("./../api/user.js"),Withdraw=function(e){function t(){var e,n,a,r;_classCallCheck(this,t);for(var i=arguments.length,o=Array(i),s=0;s<i;s++)o[s]=arguments[s];return n=a=_possibleConstructorReturn(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(o))),a.config={navigationBarTitleText:"申请提现"},a.data={classInfo:{},memberInfo:{},bankName:"",bankReservedName:"",bankCard:"",bankMobile:"",card:{},money:0,id:0},a.methods={pickerChange:function(e){this[e.currentTarget.id]=e.detail.value,this.$apply()},saveBankInfo:function(){var e=this;(0,_finance.saveBankInfo)({bankName:this.bankName?this.bankName:this.card.bank_name,bankReservedName:this.bankReservedName?this.bankReservedName:this.card.bank_reserved_name,bankCard:this.bankCard?this.bankCard:this.card.bank_card,bankMobile:this.bankMobile?this.bankMobile:this.card.bank_mobile}).then(function(t){t.data.success&&(e.getMemberInfo(),(0,_common.showMsg)("操作成功"))})},submit:function(){var e=this;(0,_finance.withdrawCash)({class_id:this.classInfo.id,collection_id:this.id,amount:this.money}).then(function(t){t.data.success&&((0,_common.showMsg)("24小时之内提现将会到账，5月1日之后即将开通微信提现即时到账，敬请期待。"),e.$apply())})}},r=n,_possibleConstructorReturn(a,r)}return _inherits(t,e),_createClass(t,[{key:"onLoad",value:function(e){this.classInfo=wx.getStorageSync("classInfo"),this.memberInfo=wx.getStorageSync("memberInfo"),this.id=e.id,this.money=e.money,this.card=this.memberInfo.card_info,this.$apply()}},{key:"getMemberInfo",value:function(){(0,_user.memberInfo)({class_id:this.classInfo.id}).then(function(e){var t=e.data.data,n=t.member_extend,a=wx.getStorageSync("memberInfo"),r=Object.assign({},{card_info:n},a);wx.setStorageSync("memberInfo",r)})}}]),t}(_wepy2.default.page);Page(require("./../npm/wepy/lib/wepy.js").default.$createPage(Withdraw,"pages/withdraw"));