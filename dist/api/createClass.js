'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.schoolList = schoolList;
exports.addClass = addClass;
exports.joinClass = joinClass;
exports.getClassList = getClassList;
exports.searchClass = searchClass;
exports.getCityInfo = getCityInfo;

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _commonData = require('./commonData.js');

var _commonData2 = _interopRequireDefault(_commonData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 获取学校列表
function schoolList(params) {
  return new Promise(function (resolve, reject) {
    _wepy2.default.request({
      url: '/school/index',
      data: Object.assign({}, (0, _commonData2.default)(), {
        keywords: params.keywords,
        pn: 1,
        ps: 100,
        city_name: params.city_name
      })
    }).then(function (res) {
      resolve(res);
    });
  });
}

// 创建班级
function addClass(data) {
  return new Promise(function (resolve, reject) {
    _wepy2.default.request({
      url: '/class/addClass',
      data: Object.assign({}, (0, _commonData2.default)(), {
        school_id: data.school_id,
        grade_type: data.grade_type,
        year_class: data.year_class,
        class: data.class,
        item: data.item
      }),
      method: 'post'
    }).then(function (res) {
      resolve(res);
    });
  });
}

// 加入班级
function joinClass(data) {
  return new Promise(function (resolve, reject) {
    _wepy2.default.request({
      url: '/member/class/join',
      data: Object.assign({}, (0, _commonData2.default)(), {
        class_id: data.class_id,
        join_key: data.join_key
      }),
      method: 'post'
    }).then(function (res) {
      resolve(res);
    });
  });
}

// 获取班级列表
function getClassList(data) {
  return new Promise(function (resolve, reject) {
    _wepy2.default.request({
      url: '/member/class/index',
      data: Object.assign({}, (0, _commonData2.default)(), {
        ps: 100
      })
    }).then(function (res) {
      resolve(res);
    });
  });
}

// 班级查询
function searchClass(params) {
  return new Promise(function (resolve, reject) {
    _wepy2.default.request({
      url: '/class/search',
      data: Object.assign({}, (0, _commonData2.default)(), {
        school_id: params.school_id,
        grade_type: params.grade,
        year_class: params.year,
        class: params.class
      })
    }).then(function (res) {
      resolve(res);
    });
  });
}

// 根据经纬度查询城市名称
function getCityInfo(params) {
  return new Promise(function (resolve) {
    _wepy2.default.request({
      url: '/system/regeocode',
      data: Object.assign({}, (0, _commonData2.default)(), {
        lat: params.lat,
        lng: params.lng
      })
    }).then(function (res) {
      resolve(res);
    });
  });
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNyZWF0ZUNsYXNzLmpzIl0sIm5hbWVzIjpbInNjaG9vbExpc3QiLCJhZGRDbGFzcyIsImpvaW5DbGFzcyIsImdldENsYXNzTGlzdCIsInNlYXJjaENsYXNzIiwiZ2V0Q2l0eUluZm8iLCJwYXJhbXMiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsIndlcHkiLCJyZXF1ZXN0IiwidXJsIiwiZGF0YSIsIk9iamVjdCIsImFzc2lnbiIsImtleXdvcmRzIiwicG4iLCJwcyIsImNpdHlfbmFtZSIsInRoZW4iLCJyZXMiLCJzY2hvb2xfaWQiLCJncmFkZV90eXBlIiwieWVhcl9jbGFzcyIsImNsYXNzIiwiaXRlbSIsIm1ldGhvZCIsImNsYXNzX2lkIiwiam9pbl9rZXkiLCJncmFkZSIsInllYXIiLCJsYXQiLCJsbmciXSwibWFwcGluZ3MiOiI7Ozs7O1FBSWdCQSxVLEdBQUFBLFU7UUFpQkFDLFEsR0FBQUEsUTtRQW1CQUMsUyxHQUFBQSxTO1FBZ0JBQyxZLEdBQUFBLFk7UUFjQUMsVyxHQUFBQSxXO1FBaUJBQyxXLEdBQUFBLFc7O0FBdkZoQjs7OztBQUNBOzs7Ozs7QUFFQTtBQUNPLFNBQVNMLFVBQVQsQ0FBb0JNLE1BQXBCLEVBQTRCO0FBQ2pDLFNBQU8sSUFBSUMsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUN0Q0MsbUJBQUtDLE9BQUwsQ0FBYTtBQUNYQyxXQUFLLGVBRE07QUFFWEMsWUFBTUMsT0FBT0MsTUFBUCxDQUFjLEVBQWQsRUFBa0IsMkJBQWxCLEVBQWtDO0FBQ3RDQyxrQkFBVVYsT0FBT1UsUUFEcUI7QUFFdENDLFlBQUksQ0FGa0M7QUFHdENDLFlBQUksR0FIa0M7QUFJdENDLG1CQUFXYixPQUFPYTtBQUpvQixPQUFsQztBQUZLLEtBQWIsRUFRR0MsSUFSSCxDQVFRLGVBQU87QUFDYlosY0FBUWEsR0FBUjtBQUNELEtBVkQ7QUFXRCxHQVpNLENBQVA7QUFhRDs7QUFFRDtBQUNPLFNBQVNwQixRQUFULENBQWtCWSxJQUFsQixFQUF3QjtBQUM3QixTQUFPLElBQUlOLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDdENDLG1CQUFLQyxPQUFMLENBQWE7QUFDWEMsV0FBSyxpQkFETTtBQUVYQyxZQUFNQyxPQUFPQyxNQUFQLENBQWMsRUFBZCxFQUFrQiwyQkFBbEIsRUFBa0M7QUFDdENPLG1CQUFXVCxLQUFLUyxTQURzQjtBQUV0Q0Msb0JBQVlWLEtBQUtVLFVBRnFCO0FBR3RDQyxvQkFBWVgsS0FBS1csVUFIcUI7QUFJdENDLGVBQU9aLEtBQUtZLEtBSjBCO0FBS3RDQyxjQUFNYixLQUFLYTtBQUwyQixPQUFsQyxDQUZLO0FBU1hDLGNBQVE7QUFURyxLQUFiLEVBVUdQLElBVkgsQ0FVUSxlQUFPO0FBQ2JaLGNBQVFhLEdBQVI7QUFDRCxLQVpEO0FBYUQsR0FkTSxDQUFQO0FBZUQ7O0FBRUQ7QUFDTyxTQUFTbkIsU0FBVCxDQUFtQlcsSUFBbkIsRUFBeUI7QUFDOUIsU0FBTyxJQUFJTixPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBQ3RDQyxtQkFBS0MsT0FBTCxDQUFhO0FBQ1hDLFdBQUssb0JBRE07QUFFWEMsWUFBTUMsT0FBT0MsTUFBUCxDQUFjLEVBQWQsRUFBa0IsMkJBQWxCLEVBQWtDO0FBQ3RDYSxrQkFBVWYsS0FBS2UsUUFEdUI7QUFFdENDLGtCQUFVaEIsS0FBS2dCO0FBRnVCLE9BQWxDLENBRks7QUFNWEYsY0FBUTtBQU5HLEtBQWIsRUFPR1AsSUFQSCxDQU9RLGVBQU87QUFDYlosY0FBUWEsR0FBUjtBQUNELEtBVEQ7QUFVRCxHQVhNLENBQVA7QUFZRDs7QUFFRDtBQUNPLFNBQVNsQixZQUFULENBQXNCVSxJQUF0QixFQUE0QjtBQUNqQyxTQUFPLElBQUlOLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDdENDLG1CQUFLQyxPQUFMLENBQWE7QUFDWEMsV0FBSyxxQkFETTtBQUVYQyxZQUFNQyxPQUFPQyxNQUFQLENBQWMsRUFBZCxFQUFrQiwyQkFBbEIsRUFBa0M7QUFDdENHLFlBQUk7QUFEa0MsT0FBbEM7QUFGSyxLQUFiLEVBS0dFLElBTEgsQ0FLUSxlQUFPO0FBQ2JaLGNBQVFhLEdBQVI7QUFDRCxLQVBEO0FBUUQsR0FUTSxDQUFQO0FBVUQ7O0FBRUQ7QUFDTyxTQUFTakIsV0FBVCxDQUFxQkUsTUFBckIsRUFBNkI7QUFDbEMsU0FBTyxJQUFJQyxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBQ3RDQyxtQkFBS0MsT0FBTCxDQUFhO0FBQ1hDLFdBQUssZUFETTtBQUVYQyxZQUFNQyxPQUFPQyxNQUFQLENBQWMsRUFBZCxFQUFrQiwyQkFBbEIsRUFBa0M7QUFDdENPLG1CQUFXaEIsT0FBT2dCLFNBRG9CO0FBRXRDQyxvQkFBWWpCLE9BQU93QixLQUZtQjtBQUd0Q04sb0JBQVlsQixPQUFPeUIsSUFIbUI7QUFJdENOLGVBQU9uQixPQUFPbUI7QUFKd0IsT0FBbEM7QUFGSyxLQUFiLEVBUUdMLElBUkgsQ0FRUSxlQUFPO0FBQ2JaLGNBQVFhLEdBQVI7QUFDRCxLQVZEO0FBV0QsR0FaTSxDQUFQO0FBYUQ7O0FBRUQ7QUFDTyxTQUFTaEIsV0FBVCxDQUFxQkMsTUFBckIsRUFBNkI7QUFDbEMsU0FBTyxJQUFJQyxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFhO0FBQzlCRSxtQkFBS0MsT0FBTCxDQUFhO0FBQ1hDLFdBQUssbUJBRE07QUFFWEMsWUFBTUMsT0FBT0MsTUFBUCxDQUFjLEVBQWQsRUFBa0IsMkJBQWxCLEVBQWtDO0FBQ3RDaUIsYUFBSzFCLE9BQU8wQixHQUQwQjtBQUV0Q0MsYUFBSzNCLE9BQU8yQjtBQUYwQixPQUFsQztBQUZLLEtBQWIsRUFNR2IsSUFOSCxDQU1RLGVBQU87QUFDYlosY0FBUWEsR0FBUjtBQUNELEtBUkQ7QUFTRCxHQVZNLENBQVA7QUFXRCIsImZpbGUiOiJjcmVhdGVDbGFzcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5pbXBvcnQgY29tbW9uUGFyYW1zIGZyb20gJy4vY29tbW9uRGF0YSdcblxuLy8g6I635Y+W5a2m5qCh5YiX6KGoXG5leHBvcnQgZnVuY3Rpb24gc2Nob29sTGlzdChwYXJhbXMpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICB3ZXB5LnJlcXVlc3Qoe1xuICAgICAgdXJsOiAnL3NjaG9vbC9pbmRleCcsXG4gICAgICBkYXRhOiBPYmplY3QuYXNzaWduKHt9LCBjb21tb25QYXJhbXMoKSwge1xuICAgICAgICBrZXl3b3JkczogcGFyYW1zLmtleXdvcmRzLFxuICAgICAgICBwbjogMSxcbiAgICAgICAgcHM6IDEwMCxcbiAgICAgICAgY2l0eV9uYW1lOiBwYXJhbXMuY2l0eV9uYW1lXG4gICAgICB9KVxuICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgIHJlc29sdmUocmVzKVxuICAgIH0pXG4gIH0pXG59XG5cbi8vIOWIm+W7uuePree6p1xuZXhwb3J0IGZ1bmN0aW9uIGFkZENsYXNzKGRhdGEpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICB3ZXB5LnJlcXVlc3Qoe1xuICAgICAgdXJsOiAnL2NsYXNzL2FkZENsYXNzJyxcbiAgICAgIGRhdGE6IE9iamVjdC5hc3NpZ24oe30sIGNvbW1vblBhcmFtcygpLCB7XG4gICAgICAgIHNjaG9vbF9pZDogZGF0YS5zY2hvb2xfaWQsXG4gICAgICAgIGdyYWRlX3R5cGU6IGRhdGEuZ3JhZGVfdHlwZSxcbiAgICAgICAgeWVhcl9jbGFzczogZGF0YS55ZWFyX2NsYXNzLFxuICAgICAgICBjbGFzczogZGF0YS5jbGFzcyxcbiAgICAgICAgaXRlbTogZGF0YS5pdGVtXG4gICAgICB9KSxcbiAgICAgIG1ldGhvZDogJ3Bvc3QnXG4gICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgcmVzb2x2ZShyZXMpXG4gICAgfSlcbiAgfSlcbn1cblxuLy8g5Yqg5YWl54+t57qnXG5leHBvcnQgZnVuY3Rpb24gam9pbkNsYXNzKGRhdGEpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICB3ZXB5LnJlcXVlc3Qoe1xuICAgICAgdXJsOiAnL21lbWJlci9jbGFzcy9qb2luJyxcbiAgICAgIGRhdGE6IE9iamVjdC5hc3NpZ24oe30sIGNvbW1vblBhcmFtcygpLCB7XG4gICAgICAgIGNsYXNzX2lkOiBkYXRhLmNsYXNzX2lkLFxuICAgICAgICBqb2luX2tleTogZGF0YS5qb2luX2tleVxuICAgICAgfSksXG4gICAgICBtZXRob2Q6ICdwb3N0J1xuICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgIHJlc29sdmUocmVzKVxuICAgIH0pXG4gIH0pXG59XG5cbi8vIOiOt+WPluePree6p+WIl+ihqFxuZXhwb3J0IGZ1bmN0aW9uIGdldENsYXNzTGlzdChkYXRhKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgd2VweS5yZXF1ZXN0KHtcbiAgICAgIHVybDogJy9tZW1iZXIvY2xhc3MvaW5kZXgnLFxuICAgICAgZGF0YTogT2JqZWN0LmFzc2lnbih7fSwgY29tbW9uUGFyYW1zKCksIHtcbiAgICAgICAgcHM6IDEwMFxuICAgICAgfSlcbiAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICByZXNvbHZlKHJlcylcbiAgICB9KVxuICB9KVxufVxuXG4vLyDnj63nuqfmn6Xor6JcbmV4cG9ydCBmdW5jdGlvbiBzZWFyY2hDbGFzcyhwYXJhbXMpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICB3ZXB5LnJlcXVlc3Qoe1xuICAgICAgdXJsOiAnL2NsYXNzL3NlYXJjaCcsXG4gICAgICBkYXRhOiBPYmplY3QuYXNzaWduKHt9LCBjb21tb25QYXJhbXMoKSwge1xuICAgICAgICBzY2hvb2xfaWQ6IHBhcmFtcy5zY2hvb2xfaWQsXG4gICAgICAgIGdyYWRlX3R5cGU6IHBhcmFtcy5ncmFkZSxcbiAgICAgICAgeWVhcl9jbGFzczogcGFyYW1zLnllYXIsXG4gICAgICAgIGNsYXNzOiBwYXJhbXMuY2xhc3NcbiAgICAgIH0pXG4gICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgcmVzb2x2ZShyZXMpXG4gICAgfSlcbiAgfSlcbn1cblxuLy8g5qC55o2u57uP57qs5bqm5p+l6K+i5Z+O5biC5ZCN56ewXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q2l0eUluZm8ocGFyYW1zKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgIHdlcHkucmVxdWVzdCh7XG4gICAgICB1cmw6ICcvc3lzdGVtL3JlZ2VvY29kZScsXG4gICAgICBkYXRhOiBPYmplY3QuYXNzaWduKHt9LCBjb21tb25QYXJhbXMoKSwge1xuICAgICAgICBsYXQ6IHBhcmFtcy5sYXQsXG4gICAgICAgIGxuZzogcGFyYW1zLmxuZ1xuICAgICAgfSlcbiAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICByZXNvbHZlKHJlcylcbiAgICB9KVxuICB9KVxufVxuIl19