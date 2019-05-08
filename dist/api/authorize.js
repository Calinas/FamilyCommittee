"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function addAuth(e){return new Promise(function(t,a){_wepy2.default.request({url:"/class/auth/add",data:Object.assign({},(0,_commonData2.default)(),{class_id:e.class_id,role_id:e.role_id,join_member_id:e.join_member_id}),method:"post"}).then(function(e){t(e)})})}function getAuth(e){return new Promise(function(t,a){_wepy2.default.request({url:"/member/auth",data:Object.assign({},(0,_commonData2.default)(),{class_id:e.class_id})}).then(function(e){t(e)})})}function authList(e){return new Promise(function(t,a){_wepy2.default.request({url:"/class/auth/index",data:Object.assign({},(0,_commonData2.default)(),{class_id:e.class_id})}).then(function(e){t(e)})})}function searchMember(e){return new Promise(function(t,a){_wepy2.default.request({url:"/class/searchMember",data:Object.assign({},(0,_commonData2.default)(),{class_id:e.class_id,keywords:e.keywords})}).then(function(e){t(e)})})}function deleteAuth(e){return new Promise(function(t,a){_wepy2.default.request({url:"/class/auth/delete",data:Object.assign({},(0,_commonData2.default)(),{class_id:e.class_id,class_auth_id:e.class_auth_id}),method:"post"}).then(function(e){t(e)})})}function changeCode(e){return new Promise(function(t){_wepy2.default.request({url:"/class/updateJoinKey",data:Object.assign({},(0,_commonData2.default)(),{class_id:e.class_id,join_key:e.join_key}),method:"post"}).then(function(e){t(e)})})}function removeMember(e){return new Promise(function(t){_wepy2.default.request({url:"/class/removeMember",data:Object.assign({},(0,_commonData2.default)(),{class_id:e.class_id,remove_member_id:e.remove_member_id}),method:"post"}).then(function(e){t(e)})})}Object.defineProperty(exports,"__esModule",{value:!0}),exports.addAuth=addAuth,exports.getAuth=getAuth,exports.authList=authList,exports.searchMember=searchMember,exports.deleteAuth=deleteAuth,exports.changeCode=changeCode,exports.removeMember=removeMember;var _wepy=require("./../npm/wepy/lib/wepy.js"),_wepy2=_interopRequireDefault(_wepy),_commonData=require("./commonData.js"),_commonData2=_interopRequireDefault(_commonData);