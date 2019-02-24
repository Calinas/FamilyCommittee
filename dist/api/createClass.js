'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.schoolList = schoolList;
exports.addClass = addClass;
exports.joinClass = joinClass;
exports.getClassList = getClassList;
exports.searchClass = searchClass;

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
      data: (0, _commonData2.default)()
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNyZWF0ZUNsYXNzLmpzIl0sIm5hbWVzIjpbInNjaG9vbExpc3QiLCJhZGRDbGFzcyIsImpvaW5DbGFzcyIsImdldENsYXNzTGlzdCIsInNlYXJjaENsYXNzIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJ3ZXB5IiwicmVxdWVzdCIsInVybCIsImRhdGEiLCJPYmplY3QiLCJhc3NpZ24iLCJrZXl3b3JkcyIsInBuIiwicHMiLCJ0aGVuIiwicmVzIiwic2Nob29sX2lkIiwiZ3JhZGVfdHlwZSIsInllYXJfY2xhc3MiLCJjbGFzcyIsIml0ZW0iLCJtZXRob2QiLCJjbGFzc19pZCIsImpvaW5fa2V5IiwicGFyYW1zIiwiZ3JhZGUiLCJ5ZWFyIl0sIm1hcHBpbmdzIjoiOzs7OztRQUlnQkEsVSxHQUFBQSxVO1FBZ0JBQyxRLEdBQUFBLFE7UUFtQkFDLFMsR0FBQUEsUztRQWdCQUMsWSxHQUFBQSxZO1FBWUFDLFcsR0FBQUEsVzs7QUFuRWhCOzs7O0FBQ0E7Ozs7OztBQUVBO0FBQ08sU0FBU0osVUFBVCxHQUFzQjtBQUMzQixTQUFPLElBQUlLLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDdENDLG1CQUFLQyxPQUFMLENBQWE7QUFDWEMsV0FBSyxlQURNO0FBRVhDLFlBQU1DLE9BQU9DLE1BQVAsQ0FBYyxFQUFkLEVBQWtCLDJCQUFsQixFQUFrQztBQUN0Q0Msa0JBQVUsRUFENEI7QUFFdENDLFlBQUksQ0FGa0M7QUFHdENDLFlBQUk7QUFIa0MsT0FBbEM7QUFGSyxLQUFiLEVBT0dDLElBUEgsQ0FPUSxlQUFPO0FBQ2JYLGNBQVFZLEdBQVI7QUFDRCxLQVREO0FBVUQsR0FYTSxDQUFQO0FBWUQ7O0FBRUQ7QUFDTyxTQUFTakIsUUFBVCxDQUFrQlUsSUFBbEIsRUFBd0I7QUFDN0IsU0FBTyxJQUFJTixPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBQ3RDQyxtQkFBS0MsT0FBTCxDQUFhO0FBQ1hDLFdBQUssaUJBRE07QUFFWEMsWUFBTUMsT0FBT0MsTUFBUCxDQUFjLEVBQWQsRUFBa0IsMkJBQWxCLEVBQWtDO0FBQ3RDTSxtQkFBV1IsS0FBS1EsU0FEc0I7QUFFdENDLG9CQUFZVCxLQUFLUyxVQUZxQjtBQUd0Q0Msb0JBQVlWLEtBQUtVLFVBSHFCO0FBSXRDQyxlQUFPWCxLQUFLVyxLQUowQjtBQUt0Q0MsY0FBTVosS0FBS1k7QUFMMkIsT0FBbEMsQ0FGSztBQVNYQyxjQUFRO0FBVEcsS0FBYixFQVVHUCxJQVZILENBVVEsZUFBTztBQUNiWCxjQUFRWSxHQUFSO0FBQ0QsS0FaRDtBQWFELEdBZE0sQ0FBUDtBQWVEOztBQUVEO0FBQ08sU0FBU2hCLFNBQVQsQ0FBbUJTLElBQW5CLEVBQXlCO0FBQzlCLFNBQU8sSUFBSU4sT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUN0Q0MsbUJBQUtDLE9BQUwsQ0FBYTtBQUNYQyxXQUFLLG9CQURNO0FBRVhDLFlBQU1DLE9BQU9DLE1BQVAsQ0FBYyxFQUFkLEVBQWtCLDJCQUFsQixFQUFrQztBQUN0Q1ksa0JBQVVkLEtBQUtjLFFBRHVCO0FBRXRDQyxrQkFBVWYsS0FBS2U7QUFGdUIsT0FBbEMsQ0FGSztBQU1YRixjQUFRO0FBTkcsS0FBYixFQU9HUCxJQVBILENBT1EsZUFBTztBQUNiWCxjQUFRWSxHQUFSO0FBQ0QsS0FURDtBQVVELEdBWE0sQ0FBUDtBQVlEOztBQUVEO0FBQ08sU0FBU2YsWUFBVCxDQUFzQlEsSUFBdEIsRUFBNEI7QUFDakMsU0FBTyxJQUFJTixPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBQ3RDQyxtQkFBS0MsT0FBTCxDQUFhO0FBQ1hDLFdBQUsscUJBRE07QUFFWEMsWUFBTTtBQUZLLEtBQWIsRUFHR00sSUFISCxDQUdRLGVBQU87QUFDYlgsY0FBUVksR0FBUjtBQUNELEtBTEQ7QUFNRCxHQVBNLENBQVA7QUFRRDs7QUFFRDtBQUNPLFNBQVNkLFdBQVQsQ0FBcUJ1QixNQUFyQixFQUE2QjtBQUNsQyxTQUFPLElBQUl0QixPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBQ3RDQyxtQkFBS0MsT0FBTCxDQUFhO0FBQ1hDLFdBQUssZUFETTtBQUVYQyxZQUFNQyxPQUFPQyxNQUFQLENBQWMsRUFBZCxFQUFrQiwyQkFBbEIsRUFBa0M7QUFDdENNLG1CQUFXUSxPQUFPUixTQURvQjtBQUV0Q0Msb0JBQVlPLE9BQU9DLEtBRm1CO0FBR3RDUCxvQkFBWU0sT0FBT0UsSUFIbUI7QUFJdENQLGVBQU9LLE9BQU9MO0FBSndCLE9BQWxDO0FBRkssS0FBYixFQVFHTCxJQVJILENBUVEsZUFBTztBQUNiWCxjQUFRWSxHQUFSO0FBQ0QsS0FWRDtBQVdELEdBWk0sQ0FBUDtBQWFEIiwiZmlsZSI6ImNyZWF0ZUNsYXNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbmltcG9ydCBjb21tb25QYXJhbXMgZnJvbSAnLi9jb21tb25EYXRhJ1xuXG4vLyDojrflj5blrabmoKHliJfooahcbmV4cG9ydCBmdW5jdGlvbiBzY2hvb2xMaXN0KCkge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIHdlcHkucmVxdWVzdCh7XG4gICAgICB1cmw6ICcvc2Nob29sL2luZGV4JyxcbiAgICAgIGRhdGE6IE9iamVjdC5hc3NpZ24oe30sIGNvbW1vblBhcmFtcygpLCB7XG4gICAgICAgIGtleXdvcmRzOiAnJyxcbiAgICAgICAgcG46IDEsXG4gICAgICAgIHBzOiAxMFxuICAgICAgfSlcbiAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICByZXNvbHZlKHJlcylcbiAgICB9KVxuICB9KVxufVxuXG4vLyDliJvlu7rnj63nuqdcbmV4cG9ydCBmdW5jdGlvbiBhZGRDbGFzcyhkYXRhKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgd2VweS5yZXF1ZXN0KHtcbiAgICAgIHVybDogJy9jbGFzcy9hZGRDbGFzcycsXG4gICAgICBkYXRhOiBPYmplY3QuYXNzaWduKHt9LCBjb21tb25QYXJhbXMoKSwge1xuICAgICAgICBzY2hvb2xfaWQ6IGRhdGEuc2Nob29sX2lkLFxuICAgICAgICBncmFkZV90eXBlOiBkYXRhLmdyYWRlX3R5cGUsXG4gICAgICAgIHllYXJfY2xhc3M6IGRhdGEueWVhcl9jbGFzcyxcbiAgICAgICAgY2xhc3M6IGRhdGEuY2xhc3MsXG4gICAgICAgIGl0ZW06IGRhdGEuaXRlbVxuICAgICAgfSksXG4gICAgICBtZXRob2Q6ICdwb3N0J1xuICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgIHJlc29sdmUocmVzKVxuICAgIH0pXG4gIH0pXG59XG5cbi8vIOWKoOWFpeePree6p1xuZXhwb3J0IGZ1bmN0aW9uIGpvaW5DbGFzcyhkYXRhKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgd2VweS5yZXF1ZXN0KHtcbiAgICAgIHVybDogJy9tZW1iZXIvY2xhc3Mvam9pbicsXG4gICAgICBkYXRhOiBPYmplY3QuYXNzaWduKHt9LCBjb21tb25QYXJhbXMoKSwge1xuICAgICAgICBjbGFzc19pZDogZGF0YS5jbGFzc19pZCxcbiAgICAgICAgam9pbl9rZXk6IGRhdGEuam9pbl9rZXlcbiAgICAgIH0pLFxuICAgICAgbWV0aG9kOiAncG9zdCdcbiAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICByZXNvbHZlKHJlcylcbiAgICB9KVxuICB9KVxufVxuXG4vLyDojrflj5bnj63nuqfliJfooahcbmV4cG9ydCBmdW5jdGlvbiBnZXRDbGFzc0xpc3QoZGF0YSkge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIHdlcHkucmVxdWVzdCh7XG4gICAgICB1cmw6ICcvbWVtYmVyL2NsYXNzL2luZGV4JyxcbiAgICAgIGRhdGE6IGNvbW1vblBhcmFtcygpXG4gICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgcmVzb2x2ZShyZXMpXG4gICAgfSlcbiAgfSlcbn1cblxuLy8g54+t57qn5p+l6K+iXG5leHBvcnQgZnVuY3Rpb24gc2VhcmNoQ2xhc3MocGFyYW1zKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgd2VweS5yZXF1ZXN0KHtcbiAgICAgIHVybDogJy9jbGFzcy9zZWFyY2gnLFxuICAgICAgZGF0YTogT2JqZWN0LmFzc2lnbih7fSwgY29tbW9uUGFyYW1zKCksIHtcbiAgICAgICAgc2Nob29sX2lkOiBwYXJhbXMuc2Nob29sX2lkLFxuICAgICAgICBncmFkZV90eXBlOiBwYXJhbXMuZ3JhZGUsXG4gICAgICAgIHllYXJfY2xhc3M6IHBhcmFtcy55ZWFyLFxuICAgICAgICBjbGFzczogcGFyYW1zLmNsYXNzXG4gICAgICB9KVxuICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgIHJlc29sdmUocmVzKVxuICAgIH0pXG4gIH0pXG59XG4iXX0=