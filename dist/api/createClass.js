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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNyZWF0ZUNsYXNzLmpzIl0sIm5hbWVzIjpbInNjaG9vbExpc3QiLCJhZGRDbGFzcyIsImpvaW5DbGFzcyIsImdldENsYXNzTGlzdCIsInNlYXJjaENsYXNzIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJ3ZXB5IiwicmVxdWVzdCIsInVybCIsImRhdGEiLCJPYmplY3QiLCJhc3NpZ24iLCJrZXl3b3JkcyIsInBuIiwicHMiLCJ0aGVuIiwicmVzIiwic2Nob29sX2lkIiwiZ3JhZGVfdHlwZSIsInllYXJfY2xhc3MiLCJjbGFzcyIsIml0ZW0iLCJtZXRob2QiLCJjbGFzc19pZCIsImpvaW5fa2V5IiwicGFyYW1zIiwiZ3JhZGUiLCJ5ZWFyIl0sIm1hcHBpbmdzIjoiOzs7OztRQUlnQkEsVSxHQUFBQSxVO1FBZ0JBQyxRLEdBQUFBLFE7UUFtQkFDLFMsR0FBQUEsUztRQWdCQUMsWSxHQUFBQSxZO1FBY0FDLFcsR0FBQUEsVzs7QUFyRWhCOzs7O0FBQ0E7Ozs7OztBQUVBO0FBQ08sU0FBU0osVUFBVCxHQUFzQjtBQUMzQixTQUFPLElBQUlLLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDdENDLG1CQUFLQyxPQUFMLENBQWE7QUFDWEMsV0FBSyxlQURNO0FBRVhDLFlBQU1DLE9BQU9DLE1BQVAsQ0FBYyxFQUFkLEVBQWtCLDJCQUFsQixFQUFrQztBQUN0Q0Msa0JBQVUsRUFENEI7QUFFdENDLFlBQUksQ0FGa0M7QUFHdENDLFlBQUk7QUFIa0MsT0FBbEM7QUFGSyxLQUFiLEVBT0dDLElBUEgsQ0FPUSxlQUFPO0FBQ2JYLGNBQVFZLEdBQVI7QUFDRCxLQVREO0FBVUQsR0FYTSxDQUFQO0FBWUQ7O0FBRUQ7QUFDTyxTQUFTakIsUUFBVCxDQUFrQlUsSUFBbEIsRUFBd0I7QUFDN0IsU0FBTyxJQUFJTixPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBQ3RDQyxtQkFBS0MsT0FBTCxDQUFhO0FBQ1hDLFdBQUssaUJBRE07QUFFWEMsWUFBTUMsT0FBT0MsTUFBUCxDQUFjLEVBQWQsRUFBa0IsMkJBQWxCLEVBQWtDO0FBQ3RDTSxtQkFBV1IsS0FBS1EsU0FEc0I7QUFFdENDLG9CQUFZVCxLQUFLUyxVQUZxQjtBQUd0Q0Msb0JBQVlWLEtBQUtVLFVBSHFCO0FBSXRDQyxlQUFPWCxLQUFLVyxLQUowQjtBQUt0Q0MsY0FBTVosS0FBS1k7QUFMMkIsT0FBbEMsQ0FGSztBQVNYQyxjQUFRO0FBVEcsS0FBYixFQVVHUCxJQVZILENBVVEsZUFBTztBQUNiWCxjQUFRWSxHQUFSO0FBQ0QsS0FaRDtBQWFELEdBZE0sQ0FBUDtBQWVEOztBQUVEO0FBQ08sU0FBU2hCLFNBQVQsQ0FBbUJTLElBQW5CLEVBQXlCO0FBQzlCLFNBQU8sSUFBSU4sT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUN0Q0MsbUJBQUtDLE9BQUwsQ0FBYTtBQUNYQyxXQUFLLG9CQURNO0FBRVhDLFlBQU1DLE9BQU9DLE1BQVAsQ0FBYyxFQUFkLEVBQWtCLDJCQUFsQixFQUFrQztBQUN0Q1ksa0JBQVVkLEtBQUtjLFFBRHVCO0FBRXRDQyxrQkFBVWYsS0FBS2U7QUFGdUIsT0FBbEMsQ0FGSztBQU1YRixjQUFRO0FBTkcsS0FBYixFQU9HUCxJQVBILENBT1EsZUFBTztBQUNiWCxjQUFRWSxHQUFSO0FBQ0QsS0FURDtBQVVELEdBWE0sQ0FBUDtBQVlEOztBQUVEO0FBQ08sU0FBU2YsWUFBVCxDQUFzQlEsSUFBdEIsRUFBNEI7QUFDakMsU0FBTyxJQUFJTixPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBQ3RDQyxtQkFBS0MsT0FBTCxDQUFhO0FBQ1hDLFdBQUsscUJBRE07QUFFWEMsWUFBTUMsT0FBT0MsTUFBUCxDQUFjLEVBQWQsRUFBa0IsMkJBQWxCLEVBQWtDO0FBQ3RDRyxZQUFJO0FBRGtDLE9BQWxDO0FBRkssS0FBYixFQUtHQyxJQUxILENBS1EsZUFBTztBQUNiWCxjQUFRWSxHQUFSO0FBQ0QsS0FQRDtBQVFELEdBVE0sQ0FBUDtBQVVEOztBQUVEO0FBQ08sU0FBU2QsV0FBVCxDQUFxQnVCLE1BQXJCLEVBQTZCO0FBQ2xDLFNBQU8sSUFBSXRCLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDdENDLG1CQUFLQyxPQUFMLENBQWE7QUFDWEMsV0FBSyxlQURNO0FBRVhDLFlBQU1DLE9BQU9DLE1BQVAsQ0FBYyxFQUFkLEVBQWtCLDJCQUFsQixFQUFrQztBQUN0Q00sbUJBQVdRLE9BQU9SLFNBRG9CO0FBRXRDQyxvQkFBWU8sT0FBT0MsS0FGbUI7QUFHdENQLG9CQUFZTSxPQUFPRSxJQUhtQjtBQUl0Q1AsZUFBT0ssT0FBT0w7QUFKd0IsT0FBbEM7QUFGSyxLQUFiLEVBUUdMLElBUkgsQ0FRUSxlQUFPO0FBQ2JYLGNBQVFZLEdBQVI7QUFDRCxLQVZEO0FBV0QsR0FaTSxDQUFQO0FBYUQiLCJmaWxlIjoiY3JlYXRlQ2xhc3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuaW1wb3J0IGNvbW1vblBhcmFtcyBmcm9tICcuL2NvbW1vbkRhdGEnXG5cbi8vIOiOt+WPluWtpuagoeWIl+ihqFxuZXhwb3J0IGZ1bmN0aW9uIHNjaG9vbExpc3QoKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgd2VweS5yZXF1ZXN0KHtcbiAgICAgIHVybDogJy9zY2hvb2wvaW5kZXgnLFxuICAgICAgZGF0YTogT2JqZWN0LmFzc2lnbih7fSwgY29tbW9uUGFyYW1zKCksIHtcbiAgICAgICAga2V5d29yZHM6ICcnLFxuICAgICAgICBwbjogMSxcbiAgICAgICAgcHM6IDEwXG4gICAgICB9KVxuICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgIHJlc29sdmUocmVzKVxuICAgIH0pXG4gIH0pXG59XG5cbi8vIOWIm+W7uuePree6p1xuZXhwb3J0IGZ1bmN0aW9uIGFkZENsYXNzKGRhdGEpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICB3ZXB5LnJlcXVlc3Qoe1xuICAgICAgdXJsOiAnL2NsYXNzL2FkZENsYXNzJyxcbiAgICAgIGRhdGE6IE9iamVjdC5hc3NpZ24oe30sIGNvbW1vblBhcmFtcygpLCB7XG4gICAgICAgIHNjaG9vbF9pZDogZGF0YS5zY2hvb2xfaWQsXG4gICAgICAgIGdyYWRlX3R5cGU6IGRhdGEuZ3JhZGVfdHlwZSxcbiAgICAgICAgeWVhcl9jbGFzczogZGF0YS55ZWFyX2NsYXNzLFxuICAgICAgICBjbGFzczogZGF0YS5jbGFzcyxcbiAgICAgICAgaXRlbTogZGF0YS5pdGVtXG4gICAgICB9KSxcbiAgICAgIG1ldGhvZDogJ3Bvc3QnXG4gICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgcmVzb2x2ZShyZXMpXG4gICAgfSlcbiAgfSlcbn1cblxuLy8g5Yqg5YWl54+t57qnXG5leHBvcnQgZnVuY3Rpb24gam9pbkNsYXNzKGRhdGEpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICB3ZXB5LnJlcXVlc3Qoe1xuICAgICAgdXJsOiAnL21lbWJlci9jbGFzcy9qb2luJyxcbiAgICAgIGRhdGE6IE9iamVjdC5hc3NpZ24oe30sIGNvbW1vblBhcmFtcygpLCB7XG4gICAgICAgIGNsYXNzX2lkOiBkYXRhLmNsYXNzX2lkLFxuICAgICAgICBqb2luX2tleTogZGF0YS5qb2luX2tleVxuICAgICAgfSksXG4gICAgICBtZXRob2Q6ICdwb3N0J1xuICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgIHJlc29sdmUocmVzKVxuICAgIH0pXG4gIH0pXG59XG5cbi8vIOiOt+WPluePree6p+WIl+ihqFxuZXhwb3J0IGZ1bmN0aW9uIGdldENsYXNzTGlzdChkYXRhKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgd2VweS5yZXF1ZXN0KHtcbiAgICAgIHVybDogJy9tZW1iZXIvY2xhc3MvaW5kZXgnLFxuICAgICAgZGF0YTogT2JqZWN0LmFzc2lnbih7fSwgY29tbW9uUGFyYW1zKCksIHtcbiAgICAgICAgcHM6IDEwMFxuICAgICAgfSlcbiAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICByZXNvbHZlKHJlcylcbiAgICB9KVxuICB9KVxufVxuXG4vLyDnj63nuqfmn6Xor6JcbmV4cG9ydCBmdW5jdGlvbiBzZWFyY2hDbGFzcyhwYXJhbXMpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICB3ZXB5LnJlcXVlc3Qoe1xuICAgICAgdXJsOiAnL2NsYXNzL3NlYXJjaCcsXG4gICAgICBkYXRhOiBPYmplY3QuYXNzaWduKHt9LCBjb21tb25QYXJhbXMoKSwge1xuICAgICAgICBzY2hvb2xfaWQ6IHBhcmFtcy5zY2hvb2xfaWQsXG4gICAgICAgIGdyYWRlX3R5cGU6IHBhcmFtcy5ncmFkZSxcbiAgICAgICAgeWVhcl9jbGFzczogcGFyYW1zLnllYXIsXG4gICAgICAgIGNsYXNzOiBwYXJhbXMuY2xhc3NcbiAgICAgIH0pXG4gICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgcmVzb2x2ZShyZXMpXG4gICAgfSlcbiAgfSlcbn1cbiJdfQ==