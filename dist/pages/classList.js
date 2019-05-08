"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,s){if(!(e instanceof s))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,s){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!s||"object"!=typeof s&&"function"!=typeof s?e:s}function _inherits(e,s){if("function"!=typeof s&&null!==s)throw new TypeError("Super expression must either be null or a function, not "+typeof s);e.prototype=Object.create(s&&s.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),s&&(Object.setPrototypeOf?Object.setPrototypeOf(e,s):e.__proto__=s)}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function e(e,s){for(var t=0;t<s.length;t++){var n=s[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(s,t,n){return t&&e(s.prototype,t),n&&e(s,n),s}}(),_dec,_class,_wepy=require("./../npm/wepy/lib/wepy.js"),_wepy2=_interopRequireDefault(_wepy),_wepyRedux=require("./../npm/wepy-redux/lib/index.js"),_actions=require("./../store/actions/index.js"),_user=require("./../api/user.js"),ClassList=(_dec=(0,_wepyRedux.connect)({classHasChanged:function(e){return e.zone.classChanged},list:function(e){return e.zone.classList}}))(_class=function(e){function s(){var e,t,n,a;_classCallCheck(this,s);for(var i=arguments.length,o=Array(i),r=0;r<i;r++)o[r]=arguments[r];return t=n=_possibleConstructorReturn(this,(e=s.__proto__||Object.getPrototypeOf(s)).call.apply(e,[this].concat(o))),n.config={navigationBarTitleText:"我的班级",enablePullDownRefresh:!0},n.data={memberInfo:{},classInfo:null,list:[],key:"",name:"",classId:-1},n.methods={setClass:function(e){var s=this;wx.setStorage({key:"classInfo",data:this.list[e].class,success:function(t){s.classInfo=s.list[e].class,s.getMemberInfo(),(0,_actions.setClassChanged)(!0),setTimeout(function(){wx.switchTab({url:"zone"})},1e3),s.$apply()}})}},a=t,_possibleConstructorReturn(n,a)}return _inherits(s,e),_createClass(s,[{key:"getMemberInfo",value:function(){(0,_user.memberInfo)({class_id:this.classInfo.id}).then(function(e){var s=e.data.data,t=s.class_nickname,n=s.member_extend,a=wx.getStorageSync("memberInfo"),i=Object.assign({},{class_nickname:t,card_info:n},a);wx.setStorageSync("memberInfo",i)})}},{key:"onShareAppMessage",value:function(e){return{title:this.memberInfo.nickname+"邀请您加入家委会班级,验证码是"+this.classInfo.join_key,path:"pages/classList?classId="+this.classInfo.id+"&name="+this.classInfo.name+"&key="+this.classInfo.join_key}}},{key:"onPullDownRefresh",value:function(){this.resetData(),this.getClassList()}},{key:"resetData",value:function(){this.List=[],this.$apply()}},{key:"onShow",value:function(){this.classHasChanged&&(this.classInfo=wx.getStorageSync("classInfo"),(0,_actions.setClassChanged)(!1))}},{key:"onLoad",value:function(e){this.memberInfo=wx.getStorageSync("memberInfo"),this.classInfo=wx.getStorageSync("classInfo"),this.$parent.globalData.userData=this.memberInfo,this.name=e.name,this.classId=e.classId,this.key=e.key,this.key&&!this.memberInfo.member_id?wx.redirectTo({url:"login?key="+this.key+"classId="+this.classId+"&name="+this.name}):this.key&&this.memberInfo.member_id&&wx.navigateTo({url:"joinClass?classId="+this.classId+"&name="+this.name+"&key="+this.key}),this.memberInfo&&-1===this.memberInfo.member_id||((0,_actions.getClass)(),this.$apply())}}]),s}(_wepy2.default.page))||_class;Page(require("./../npm/wepy/lib/wepy.js").default.$createPage(ClassList,"pages/classList"));