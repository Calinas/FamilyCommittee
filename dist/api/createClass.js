'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.schoolList = schoolList;
exports.addClass = addClass;
exports.joinClass = joinClass;
exports.getClassList = getClassList;

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _commonData = require('./commonData.js');

var _commonData2 = _interopRequireDefault(_commonData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 获取学校列表
function schoolList() {
  return new Promise(function (resolve, reject) {
    _wepy2.default.request({
      url: '/school/index',
      data: Object.assign({}, (0, _commonData2.default)(), {
        keywords: '',
        pn: 1,
        ps: 10
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
      data: (0, _commonData2.default)()
    }).then(function (res) {
      resolve(res);
    });
  });
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNyZWF0ZUNsYXNzLmpzIl0sIm5hbWVzIjpbInNjaG9vbExpc3QiLCJhZGRDbGFzcyIsImpvaW5DbGFzcyIsImdldENsYXNzTGlzdCIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0Iiwid2VweSIsInJlcXVlc3QiLCJ1cmwiLCJkYXRhIiwiT2JqZWN0IiwiYXNzaWduIiwia2V5d29yZHMiLCJwbiIsInBzIiwidGhlbiIsInJlcyIsInNjaG9vbF9pZCIsImdyYWRlX3R5cGUiLCJ5ZWFyX2NsYXNzIiwiY2xhc3MiLCJpdGVtIiwibWV0aG9kIiwiam9pbl9rZXkiXSwibWFwcGluZ3MiOiI7Ozs7O1FBSWdCQSxVLEdBQUFBLFU7UUFnQkFDLFEsR0FBQUEsUTtRQW1CQUMsUyxHQUFBQSxTO1FBZUFDLFksR0FBQUEsWTs7QUF0RGhCOzs7O0FBQ0E7Ozs7OztBQUVBO0FBQ08sU0FBU0gsVUFBVCxHQUFzQjtBQUMzQixTQUFPLElBQUlJLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDdENDLG1CQUFLQyxPQUFMLENBQWE7QUFDWEMsV0FBSyxlQURNO0FBRVhDLFlBQU1DLE9BQU9DLE1BQVAsQ0FBYyxFQUFkLEVBQWtCLDJCQUFsQixFQUFrQztBQUN0Q0Msa0JBQVUsRUFENEI7QUFFdENDLFlBQUksQ0FGa0M7QUFHdENDLFlBQUk7QUFIa0MsT0FBbEM7QUFGSyxLQUFiLEVBT0dDLElBUEgsQ0FPUSxlQUFPO0FBQ2JYLGNBQVFZLEdBQVI7QUFDRCxLQVREO0FBVUQsR0FYTSxDQUFQO0FBWUQ7O0FBRUQ7QUFDTyxTQUFTaEIsUUFBVCxDQUFrQlMsSUFBbEIsRUFBd0I7QUFDN0IsU0FBTyxJQUFJTixPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBQ3RDQyxtQkFBS0MsT0FBTCxDQUFhO0FBQ1hDLFdBQUssaUJBRE07QUFFWEMsWUFBTUMsT0FBT0MsTUFBUCxDQUFjLEVBQWQsRUFBa0IsMkJBQWxCLEVBQWtDO0FBQ3RDTSxtQkFBV1IsS0FBS1EsU0FEc0I7QUFFdENDLG9CQUFZVCxLQUFLUyxVQUZxQjtBQUd0Q0Msb0JBQVlWLEtBQUtVLFVBSHFCO0FBSXRDQyxlQUFPWCxLQUFLVyxLQUowQjtBQUt0Q0MsY0FBTVosS0FBS1k7QUFMMkIsT0FBbEMsQ0FGSztBQVNYQyxjQUFRO0FBVEcsS0FBYixFQVVHUCxJQVZILENBVVEsZUFBTztBQUNiWCxjQUFRWSxHQUFSO0FBQ0QsS0FaRDtBQWFELEdBZE0sQ0FBUDtBQWVEOztBQUVEO0FBQ08sU0FBU2YsU0FBVCxDQUFtQlEsSUFBbkIsRUFBeUI7QUFDOUIsU0FBTyxJQUFJTixPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBQ3RDQyxtQkFBS0MsT0FBTCxDQUFhO0FBQ1hDLFdBQUssb0JBRE07QUFFWEMsWUFBTUMsT0FBT0MsTUFBUCxDQUFjLEVBQWQsRUFBa0IsMkJBQWxCLEVBQWtDO0FBQ3RDWSxrQkFBVWQsS0FBS2M7QUFEdUIsT0FBbEMsQ0FGSztBQUtYRCxjQUFRO0FBTEcsS0FBYixFQU1HUCxJQU5ILENBTVEsZUFBTztBQUNiWCxjQUFRWSxHQUFSO0FBQ0QsS0FSRDtBQVNELEdBVk0sQ0FBUDtBQVdEOztBQUVEO0FBQ08sU0FBU2QsWUFBVCxDQUFzQk8sSUFBdEIsRUFBNEI7QUFDakMsU0FBTyxJQUFJTixPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBQ3RDQyxtQkFBS0MsT0FBTCxDQUFhO0FBQ1hDLFdBQUsscUJBRE07QUFFWEMsWUFBTTtBQUZLLEtBQWIsRUFHR00sSUFISCxDQUdRLGVBQU87QUFDYlgsY0FBUVksR0FBUjtBQUNELEtBTEQ7QUFNRCxHQVBNLENBQVA7QUFRRCIsImZpbGUiOiJjcmVhdGVDbGFzcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcbmltcG9ydCBjb21tb25QYXJhbXMgZnJvbSAnLi9jb21tb25EYXRhJ1xyXG5cclxuLy8g6I635Y+W5a2m5qCh5YiX6KGoXHJcbmV4cG9ydCBmdW5jdGlvbiBzY2hvb2xMaXN0KCkge1xyXG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICB3ZXB5LnJlcXVlc3Qoe1xyXG4gICAgICB1cmw6ICcvc2Nob29sL2luZGV4JyxcclxuICAgICAgZGF0YTogT2JqZWN0LmFzc2lnbih7fSwgY29tbW9uUGFyYW1zKCksIHtcclxuICAgICAgICBrZXl3b3JkczogJycsXHJcbiAgICAgICAgcG46IDEsXHJcbiAgICAgICAgcHM6IDEwXHJcbiAgICAgIH0pXHJcbiAgICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgIHJlc29sdmUocmVzKVxyXG4gICAgfSlcclxuICB9KVxyXG59XHJcblxyXG4vLyDliJvlu7rnj63nuqdcclxuZXhwb3J0IGZ1bmN0aW9uIGFkZENsYXNzKGRhdGEpIHtcclxuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgd2VweS5yZXF1ZXN0KHtcclxuICAgICAgdXJsOiAnL2NsYXNzL2FkZENsYXNzJyxcclxuICAgICAgZGF0YTogT2JqZWN0LmFzc2lnbih7fSwgY29tbW9uUGFyYW1zKCksIHtcclxuICAgICAgICBzY2hvb2xfaWQ6IGRhdGEuc2Nob29sX2lkLFxyXG4gICAgICAgIGdyYWRlX3R5cGU6IGRhdGEuZ3JhZGVfdHlwZSxcclxuICAgICAgICB5ZWFyX2NsYXNzOiBkYXRhLnllYXJfY2xhc3MsXHJcbiAgICAgICAgY2xhc3M6IGRhdGEuY2xhc3MsXHJcbiAgICAgICAgaXRlbTogZGF0YS5pdGVtXHJcbiAgICAgIH0pLFxyXG4gICAgICBtZXRob2Q6ICdwb3N0J1xyXG4gICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICByZXNvbHZlKHJlcylcclxuICAgIH0pXHJcbiAgfSlcclxufVxyXG5cclxuLy8g5Yqg5YWl54+t57qnXHJcbmV4cG9ydCBmdW5jdGlvbiBqb2luQ2xhc3MoZGF0YSkge1xyXG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICB3ZXB5LnJlcXVlc3Qoe1xyXG4gICAgICB1cmw6ICcvbWVtYmVyL2NsYXNzL2pvaW4nLFxyXG4gICAgICBkYXRhOiBPYmplY3QuYXNzaWduKHt9LCBjb21tb25QYXJhbXMoKSwge1xyXG4gICAgICAgIGpvaW5fa2V5OiBkYXRhLmpvaW5fa2V5XHJcbiAgICAgIH0pLFxyXG4gICAgICBtZXRob2Q6ICdwb3N0J1xyXG4gICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICByZXNvbHZlKHJlcylcclxuICAgIH0pXHJcbiAgfSlcclxufVxyXG5cclxuLy8g6I635Y+W54+t57qn5YiX6KGoXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRDbGFzc0xpc3QoZGF0YSkge1xyXG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICB3ZXB5LnJlcXVlc3Qoe1xyXG4gICAgICB1cmw6ICcvbWVtYmVyL2NsYXNzL2luZGV4JyxcclxuICAgICAgZGF0YTogY29tbW9uUGFyYW1zKClcclxuICAgIH0pLnRoZW4ocmVzID0+IHtcclxuICAgICAgcmVzb2x2ZShyZXMpXHJcbiAgICB9KVxyXG4gIH0pXHJcbn1cclxuIl19