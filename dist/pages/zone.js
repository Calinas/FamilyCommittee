"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var replyCommentData = {
    idx: '',
    memberId: '',
    memberName: '',
    type: ''
};
var wepy_1 = require('./../npm/wepy/lib/wepy.js');
var wepy_redux_1 = require('./../npm/wepy-redux/lib/index.js');
var actions_1 = require('./../store/actions/index.js');
var selectModal_1 = require('./../components/selectModal.js');
var commentModal_1 = require('./../components/commentModal.js');
var sureModal_1 = require('./../components/sureModal.js');
var shareModal_1 = require('./../components/shareModal.js');
var common_1 = require('./../utils/common.js');
var zone_1 = require('./../api/zone.js');
var finance_1 = require('./../api/finance.js');
var authorize_1 = require('./../api/authorize.js');
var user_1 = require('./../api/user.js');
var store = wepy_redux_1.getStore();
var Zone = /** @class */ (function (_super) {
    __extends(Zone, _super);
    function Zone() {
        var _this_1 = _super !== null && _super.apply(this, arguments) || this;
        _this_1.config = {
            navigationBarTitleText: '最近班级',
            enablePullDownRefresh: true
        };
        _this_1.$repeat = {};
        _this_1.$props = { "CurrentModal": { "sureBtnText": "确认", "cancelBtnText": "取消", "placeholderText": "请输入评论内容", "xmlns:v-bind": "", "v-bind:flag.sync": "commentFlag", "v-bind:commentInput.sync": "commentInput", "xmlns:v-on": "" }, "SelectModal": { "v-bind:flag.sync": "selectFlag", "v-bind:list.sync": "payMemberList" }, "shareModal": { "v-bind:flag.sync": "showShareFlag", "v-bind:title.sync": "shareTitle", "v-bind:imgSrc.sync": "shareImg" }, "SureModal": { "v-bind:flag.sync": "showSureFlag", "v-bind:title.sync": "removeCircleTitle" } };
        _this_1.$events = { "CurrentModal": { "v-on:cancel": "commentCancel", "v-on:sure": "commentSure", "v-on:input": "bindCommentInput" }, "SelectModal": { "v-on:cancel": "toggleFlag", "v-on:sure": "selectSure" }, "shareModal": { "v-on:cancel": "toggleFlag", "v-on:sure": "toggleFlag" }, "SureModal": { "v-on:cancel": "toggleFlag", "v-on:sure": "toggleFlag" } };
        _this_1.components = {
            CurrentModal: commentModal_1.default,
            SelectModal: selectModal_1.default,
            shareModal: shareModal_1.default,
            SureModal: sureModal_1.default
        };
        _this_1.data = {
            menuList: [
                {
                    text: '通知',
                    type: 'notice',
                    src: '/images/icon/4.jpg'
                },
                {
                    text: '活动',
                    type: 'activity',
                    src: '/images/icon/5.jpg'
                },
                {
                    text: '家长圈',
                    type: 'zone',
                    src: '/images/icon/2.jpg'
                },
                {
                    text: '收款',
                    type: 'money',
                    src: '/images/icon/money.jpg'
                },
                {
                    text: '记账',
                    type: 'account',
                    src: '/images/icon/photos.jpg'
                }
            ],
            showSureFlag: false,
            commentFlag: false,
            selectFlag: false,
            activeType: 'all',
            setFlag: false,
            publishFlag: false,
            type: {
                circles: '家长圈',
                collection: '收款',
                notify: '通知',
                activity: '活动',
                account: '记账',
                system: '圈子'
            },
            gradeType: {
                primary: '小学',
                middle: '初中',
                high: '高中',
                university: '大学'
            },
            shareImgSrc: {
                circles: '../images/share/circles.jpg',
                collection: '../images/share/collection.jpg',
                notify: '../images/share/notify.jpg',
                activity: '../images/share/activity.jpg',
                account: '../images/share/account.jpg'
            },
            pn: 1,
            ps: 10,
            list: [],
            payMemberList: [],
            classInfo: null,
            memberInfo: null,
            schoolInfo: null,
            loading: false,
            loadFinished: false,
            commentInput: '',
            currentReplyId: -1,
            currentReplyRootId: -1,
            currentReplyToCommentId: -1,
            currerntJoinAcitivytId: -1,
            currerntSubActivityId: [],
            currentCollectionId: -1,
            auth: {
                president: false,
                finance: false,
                activity: false,
                notify: false,
                photos: false,
                circles: false
            },
            commentPn: 2,
            commentPs: 6,
            commentOffset: 6,
            commentLoadFinished: false,
            memberList: [],
            studentIds: [],
            firstInit: true,
            paymentLocked: false,
            loadMoreCommentArray: [],
            shareTitle: '',
            showShareFlag: false,
            shareImg: '',
            removeCircleTitle: '您确认要删除吗？',
            currentRemoveMomentId: -1,
            currentRemoveMomentIdx: -1,
            currentToCommentId: -1
        };
        _this_1.watch = {
            currentJoinActivityId: function (newVal, oldVal) {
                if (newVal > 0) {
                    this.currerntSubActivityId = [];
                    this.$apply();
                }
            }
        };
        _this_1.methods = {
            addLike: function (momentId, idx, isLiked) {
                var _this_1 = this;
                if (!this.classInfo && !this.classInfo.id) {
                    common_1.showMsg('请先加入班级');
                    return;
                }
                zone_1.addLike({
                    class_id: this.classInfo.id,
                    moment_id: momentId
                }).then(function (res) {
                    if (res.data.success) {
                        if (isLiked) {
                            common_1.showMsg('取消点赞成功');
                            _this_1.list[idx].like_list.count--;
                        }
                        else {
                            common_1.showMsg('点赞成功');
                            _this_1.list[idx].like_list.count++;
                        }
                        _this_1.list[idx].is_like = !isLiked;
                        var newObj = {
                            moment_id: momentId,
                            member_id: _this_1.memberInfo.member_id,
                            member: _this_1.memberInfo
                        };
                        _this_1.list[idx].like_list.list = common_1.filterArrayByValue(_this_1.memberInfo.member_id, _this_1.list[idx].like_list.list, isLiked, newObj);
                        _this_1.$apply();
                    }
                });
            },
            toggleFlag: function (flag, booleanValue) {
                this[flag] = booleanValue;
                if (flag === 'showSureFlag' && booleanValue) {
                    this[flag] = false;
                    this.removeCircleFn(this.currentRemoveMomentId, this.currentRemoveMomentIdx);
                }
                this.$apply();
            },
            shareCircle: function (type) {
                var shareActionType = this.getShareActionType(type);
                var shareType = this.getShareType(type);
                this.shareTitle = this.memberInfo.nickname + "\u5206\u4EAB\u4E86\u4E00\u4E2A" + shareType + "\uFF0C\u70B9\u51FB" + shareActionType;
                this.shareImg = this.shareImgSrc[type];
                this.showShareFlag = true;
                this.$apply();
            },
            removeCircle: function (id, idx) {
                this.showSureFlag = true;
                this.currentRemoveMomentId = id;
                this.currentRemoveMomentIdx = idx;
                this.$apply();
            },
            pay: function (momentId, collectionId) {
                var _this_1 = this;
                if (this.paymentLocked) {
                    return;
                }
                this.paymentLocked = true;
                user_1.checkStudent({
                    class_id: this.classInfo.id,
                    moment_id: momentId,
                    is_pay: 0
                }).then(function (res) {
                    _this_1.payMemberList = res.data.list;
                    if (!_this_1.payMemberList.length) {
                        _this_1.paymentLocked = false;
                        _this_1.$apply();
                        common_1.showMsg('请勿重复缴费');
                        return;
                    }
                    if (_this_1.payMemberList.length > 1) {
                        _this_1.selectFlag = true;
                        _this_1.currentCollectionId = collectionId;
                        _this_1.$apply();
                    }
                    else {
                        _this_1.studentIds = [];
                        _this_1.studentIds.push(_this_1.payMemberList[0].id);
                        _this_1.addToOrder(collectionId);
                    }
                });
            },
            submitJoinActivity: function () {
                var _this_1 = this;
                if (this.currerntJoinAcitivytId <= 0) {
                    common_1.showMsg('请先选择活动项目');
                    return;
                }
                zone_1.joinActivity({
                    class_id: this.classInfo.id,
                    activity_item_id: this.currerntSubActivityId,
                    activity_id: this.currerntJoinAcitivytId
                }).then(function (res) {
                    if (res.data.success) {
                        common_1.showMsg('提交成功');
                        _this_1.currerntSubActivityId = [];
                        _this_1.$apply();
                    }
                });
            },
            joinActivity: function (id, subId, listIndex, activityIndex) {
                if (!this.classInfo) {
                    common_1.showMsg('请先选择班级');
                    return;
                }
                this.currerntJoinAcitivytId = id;
                var index = this.currerntSubActivityId.indexOf(subId);
                if (index > -1) {
                    this.currerntSubActivityId.splice(index, 1);
                    this.list[listIndex].info.item[activityIndex].checked = false;
                }
                else {
                    this.currerntSubActivityId.push(subId);
                    this.list[listIndex].info.item[activityIndex].checked = true;
                }
                this.$apply();
            },
            loadMoreComment: function (momentId, idx) {
                var _this_1 = this;
                var retObj = this.findLoadmoreCommentInfo(this.loadMoreCommentArray, momentId);
                zone_1.getCommentList({
                    moment_id: momentId,
                    ps: this.commentPs,
                    pn: retObj.commentPn ? retObj.commentPn : this.commentPn,
                    offset: this.commentOffset
                }).then(function (res) {
                    if (res.data.success) {
                        var resultList = res.data.list;
                        var list = _this_1.list[idx].comment_list.list;
                        list = list.concat(resultList);
                        _this_1.list[idx].comment_list.list = list;
                        if (resultList.length < _this_1.commentPs) {
                            _this_1.list[idx].commentLoadFinished = true;
                        }
                        if (!retObj.commentPn) {
                            var obj = {
                                commentPn: _this_1.commentPn + 1,
                                moment_id: momentId
                            };
                            _this_1.loadMoreCommentArray.push(obj);
                        }
                        else {
                            _this_1.loadMoreCommentArray[retObj.index].commentPn = retObj.commentPn + 1;
                        }
                        _this_1.$apply();
                    }
                });
            },
            addComment: function (type, listIndex, id, rootId, toCommentId, name, memberId) {
                console.log(arguments);
                replyCommentData.idx = listIndex;
                replyCommentData.type = type;
                replyCommentData.memberId = memberId;
                replyCommentData.memberName = name;
                if (!this.classInfo) {
                    common_1.showMsg('请先选择班级');
                    return;
                }
                if (memberId === this.memberInfo.member_id) {
                    common_1.showMsg('请不要回复自己');
                    return;
                }
                this.commentFlag = true;
                this.currentReplyId = id;
                this.currentReplyRootId = type === 'add' ? 0 : rootId;
                this.currentToCommentId = toCommentId;
                if (name !== undefined) {
                    this.commentInput = "@" + name + ":";
                }
                else {
                    this.commentInput = '';
                }
                this.$apply();
            },
            bindCommentInput: function (value) {
                this.commentInput = value;
                this.$apply();
            },
            commentSure: function () {
                var _this_1 = this;
                this.commentFlag = false;
                zone_1.addComment({
                    class_id: this.classInfo.id,
                    moment_id: this.currentReplyId,
                    content: this.currentReplyId > 0 ? this.commentInput.replace(/^@.+:/, '') : this.commentInput,
                    root_id: this.currentReplyRootId,
                    to_comment_id: this.currentToCommentId
                }).then(function (res) {
                    if (res.data.success) {
                        // this.resetData()
                        // this.getZoneList()
                        var idx = replyCommentData.idx, memberId = replyCommentData.memberId, memberName = replyCommentData.memberName, type = replyCommentData.type;
                        _this_1.insertComment({
                            idx: idx,
                            memberId: memberId,
                            memberName: memberName,
                            type: type,
                            content: _this_1.currentReplyId > 0 ? _this_1.commentInput.replace(/^@.+:/, '') : _this_1.commentInput,
                            toCommentId: _this_1.currentToCommentId
                        });
                        _this_1.commentInput = '';
                        _this_1.$apply();
                    }
                });
            },
            jumpPublish: function (value) {
                if (!this.classInfo) {
                    common_1.showMsg('请选绑定班级', 3000);
                    return;
                }
                if (value === 'account' && !this.auth.finance) {
                    common_1.showMsg('您没有财务权限', 3000);
                    return;
                }
                var url = value === 'account' ? 'recordCashflow' : "publish?type=" + value;
                wx.navigateTo({
                    url: url
                });
            },
            commentCancel: function () {
                this.commentFlag = false;
                this.commentInput = '';
                this.$apply();
            },
            jumpPage: function (pageName, type) {
                this.publishFlag = false;
                this.setFlag = false;
                wx.navigateTo({
                    url: pageName + "?type=" + type
                });
            },
            toggleMenu: function (type) {
                if (!this.classInfo) {
                    common_1.showMsg('请选绑定班级', 3000);
                    return;
                }
                this[type] = !this[type];
                this.$apply();
            },
            closeToggle: function () {
                this.setFlag = false;
                this.publishFlag = false;
                this.$apply();
            },
            preview: function (img, imgList) {
                common_1.previewImage(img, imgList);
            },
            selectSure: function (value) {
                if (!value.length) {
                    common_1.showMsg('请选择');
                    return;
                }
                var val = value;
                this.studentIds = val.slice();
                this.selectFlag = false;
                this.$apply();
                this.addToOrder(this.currentCollectionId);
            }
        };
        return _this_1;
    }
    Zone.prototype.resetData = function () {
        this.loading = false;
        this.loadFinished = false;
        this.loadMoreCommentArray = [];
        this.commentLoadFinished = false;
        this.currentRemoveMomentId = -1;
        this.currentRemoveMomentIdx = -1;
        this.currentToCommentId = -1;
        this.commentPn = 2;
        this.commentPs = 6;
        this.studentIds = [];
        this.paymentLocked = false;
        this.pn = 1;
        this.list = [];
        // replyCommentData = emptyObj(replyCommentData)
        this.$apply();
    };
    Zone.prototype.onPullDownRefresh = function () {
        this.resetData();
        this.getZoneList();
    };
    Zone.prototype.onReachBottom = function () {
        if (this.loading || this.loadFinished)
            return;
        this.getZoneList();
    };
    Zone.prototype.onShow = function () {
        this.currerntJoinAcitivytId = -1;
        this.currerntSubActivityId = [];
        if (this.classHasChanged) {
            this.memberInfo = wx.getStorageSync('memberInfo');
            this.classInfo = wx.getStorageSync('classInfo');
            this.resetData();
            this.getAuthList();
            this.getZoneList();
            this.$parent.globalData.userData = this.memberInfo;
            actions_1.setClassChanged(false);
        }
        this.$apply();
        // 如果是从publish等页面返回，则需要刷新数据
        if (this.fromPublish) {
            this.resetData();
            this.getZoneList();
            actions_1.setFromPublish(false);
        }
    };
    Zone.prototype.onLoad = function () {
        if (!this.checkDataExist('memberInfo')) {
            wx.reLaunch({
                url: 'login'
            });
        }
        else {
            this.classInfo = wx.getStorageSync('classInfo');
            this.classInfo && this.getAuthList();
            this.memberInfo = wx.getStorageSync('memberInfo');
            this.$parent.globalData.userData = this.memberInfo;
            this.$apply();
            this.getZoneList();
        }
    };
    Zone.prototype.removeCircleFn = function (id, idx) {
        var _this_1 = this;
        zone_1.deleteCircle({
            moment_id: id,
            class_id: this.classInfo.id
        }).then(function (res) {
            if (res.data.success) {
                common_1.showMsg('成功删除');
                _this_1.list.splice(idx, 1);
                _this_1.$apply();
            }
        });
    };
    Zone.prototype.getAuthList = function () {
        var _this_1 = this;
        authorize_1.getAuth({
            class_id: this.classInfo.id
        }).then(function (res) {
            _this_1.checkAuth(res.data.data);
        });
    };
    Zone.prototype.formatAllAuth = function (obj) {
        Object.keys(obj).forEach(function (key) {
            obj[key] = true;
        });
        this.$apply();
    };
    Zone.prototype.formatSingleAuth = function (name, booleanValue) {
        this.auth[name] = booleanValue;
        this.$apply();
    };
    Zone.prototype.checkAuth = function (list) {
        for (var i = 0, len = list.length; i < len; i++) {
            var _a = list[i], code = _a.code, isAuth = _a.is_auth;
            if (code === 'president' && isAuth) {
                actions_1.setPresident(true);
                this.formatAllAuth(this.auth);
                break;
            }
            else {
                actions_1.setPresident(false);
                isAuth && this.formatSingleAuth(code, true);
                !isAuth && this.formatSingleAuth(code, false);
            }
        }
    };
    Zone.prototype.checkDataExist = function (key) {
        if (wx.getStorageSync(key)) {
            return true;
        }
        return false;
    };
    Zone.prototype.getZoneList = function (type) {
        var _this_1 = this;
        this.loading = true;
        this.$apply();
        var id = this.classInfo.id;
        zone_1.getCircleList({
            class_id: id,
            see_type: id ? '' : 'all',
            type: this.activeType,
            pn: this.pn,
            ps: this.ps,
            comment_count: 3
        }).then(function (res) {
            var list = res.data.list;
            _this_1.loading = false;
            _this_1.pn++;
            if (list.length < _this_1.ps) {
                _this_1.loadFinished = true;
            }
            _this_1.list = _this_1.list.concat(list);
            _this_1.$apply();
        });
    };
    Zone.prototype.paymentParams = function (id) {
        var _this_1 = this;
        finance_1.getPaymentParams({
            order_id: id
        }).then(function (res) {
            var _this = _this_1;
            var data = res.data.payment_params;
            wx.requestPayment({
                timeStamp: String(data.timeStamp),
                nonceStr: data.nonceStr,
                package: data.package,
                paySign: data.paySign,
                signType: 'MD5',
                success: function () {
                    _this.paymentLocked = false;
                    _this.$apply();
                },
                fail: function () {
                    _this.paymentLocked = false;
                    _this.$apply();
                }
            });
        });
    };
    Zone.prototype.addToOrder = function (id) {
        var _this_1 = this;
        finance_1.addOrder({
            class_id: this.classInfo.id,
            student_ids: this.studentIds,
            collection_item_id: id
        }).then(function (res) {
            _this_1.paymentParams(res.data.data.id);
        });
    };
    Zone.prototype.findLoadmoreCommentInfo = function (arr, currentId) {
        var retObj = {};
        for (var i = 0, len = arr.length; i < len; i++) {
            if (arr[i].moment_id === currentId) {
                retObj = Object.assign({}, arr[i], {
                    index: i
                });
            }
        }
        return retObj;
    };
    Zone.prototype.getShareActionType = function (type) {
        var action = '浏览';
        switch (type) {
            case 'activity':
                action = '参加';
                return action;
            case 'collection':
                action = '缴费';
                return action;
            default:
                return action;
        }
    };
    Zone.prototype.getShareType = function (type) {
        var category = '';
        if (type === 'circles') {
            category = '家长圈图文';
        }
        else {
            category = "\u5BB6\u59D4\u4F1A" + this.type[type];
        }
        return category;
    };
    Zone.prototype.insertComment = function (params) {
        var idx = params.idx, memberId = params.memberId, memberName = params.memberName, content = params.content, toCommentId = params.toCommentId;
        var data = {
            member: this.memberInfo,
            to_member: {
                id: memberId,
                class_nickname: memberName
            },
            root_id: null,
            content: content,
            to_comment_id: toCommentId
        };
        this.list[idx].comment_list.list.push(data);
        this.list[idx].comment_list.count++;
        this.$apply();
    };
    Zone.prototype.onShareAppMessage = function (res) {
        return {
            title: this.shareTitle,
            imageUrl: this.shareImg
        };
    };
    Zone = __decorate([
        wepy_redux_1.connect({
            fromPublish: function (state) {
                return state.zone.from_publish;
            },
            classHasChanged: function (state) {
                return state.zone.classChanged;
            }
        })
    ], Zone);
    return Zone;
}(wepy_1.default.page));

Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Zone , 'pages/zone'));

