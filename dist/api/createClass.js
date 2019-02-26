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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNyZWF0ZUNsYXNzLmpzIl0sIm5hbWVzIjpbInNjaG9vbExpc3QiLCJhZGRDbGFzcyIsImpvaW5DbGFzcyIsImdldENsYXNzTGlzdCIsInNlYXJjaENsYXNzIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJ3ZXB5IiwicmVxdWVzdCIsInVybCIsImRhdGEiLCJPYmplY3QiLCJhc3NpZ24iLCJrZXl3b3JkcyIsInBuIiwicHMiLCJ0aGVuIiwicmVzIiwic2Nob29sX2lkIiwiZ3JhZGVfdHlwZSIsInllYXJfY2xhc3MiLCJjbGFzcyIsIml0ZW0iLCJtZXRob2QiLCJjbGFzc19pZCIsImpvaW5fa2V5IiwicGFyYW1zIiwiZ3JhZGUiLCJ5ZWFyIl0sIm1hcHBpbmdzIjoiOzs7OztRQUlnQkEsVSxHQUFBQSxVO1FBZ0JBQyxRLEdBQUFBLFE7UUFtQkFDLFMsR0FBQUEsUztRQWdCQUMsWSxHQUFBQSxZO1FBY0FDLFcsR0FBQUEsVzs7QUFyRWhCOzs7O0FBQ0E7Ozs7OztBQUVBO0FBQ08sU0FBU0osVUFBVCxHQUFzQjtBQUMzQixTQUFPLElBQUlLLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDdENDLG1CQUFLQyxPQUFMLENBQWE7QUFDWEMsV0FBSyxlQURNO0FBRVhDLFlBQU1DLE9BQU9DLE1BQVAsQ0FBYyxFQUFkLEVBQWtCLDJCQUFsQixFQUFrQztBQUN0Q0Msa0JBQVUsRUFENEI7QUFFdENDLFlBQUksQ0FGa0M7QUFHdENDLFlBQUk7QUFIa0MsT0FBbEM7QUFGSyxLQUFiLEVBT0dDLElBUEgsQ0FPUSxlQUFPO0FBQ2JYLGNBQVFZLEdBQVI7QUFDRCxLQVREO0FBVUQsR0FYTSxDQUFQO0FBWUQ7O0FBRUQ7QUFDTyxTQUFTakIsUUFBVCxDQUFrQlUsSUFBbEIsRUFBd0I7QUFDN0IsU0FBTyxJQUFJTixPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBQ3RDQyxtQkFBS0MsT0FBTCxDQUFhO0FBQ1hDLFdBQUssaUJBRE07QUFFWEMsWUFBTUMsT0FBT0MsTUFBUCxDQUFjLEVBQWQsRUFBa0IsMkJBQWxCLEVBQWtDO0FBQ3RDTSxtQkFBV1IsS0FBS1EsU0FEc0I7QUFFdENDLG9CQUFZVCxLQUFLUyxVQUZxQjtBQUd0Q0Msb0JBQVlWLEtBQUtVLFVBSHFCO0FBSXRDQyxlQUFPWCxLQUFLVyxLQUowQjtBQUt0Q0MsY0FBTVosS0FBS1k7QUFMMkIsT0FBbEMsQ0FGSztBQVNYQyxjQUFRO0FBVEcsS0FBYixFQVVHUCxJQVZILENBVVEsZUFBTztBQUNiWCxjQUFRWSxHQUFSO0FBQ0QsS0FaRDtBQWFELEdBZE0sQ0FBUDtBQWVEOztBQUVEO0FBQ08sU0FBU2hCLFNBQVQsQ0FBbUJTLElBQW5CLEVBQXlCO0FBQzlCLFNBQU8sSUFBSU4sT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUN0Q0MsbUJBQUtDLE9BQUwsQ0FBYTtBQUNYQyxXQUFLLG9CQURNO0FBRVhDLFlBQU1DLE9BQU9DLE1BQVAsQ0FBYyxFQUFkLEVBQWtCLDJCQUFsQixFQUFrQztBQUN0Q1ksa0JBQVVkLEtBQUtjLFFBRHVCO0FBRXRDQyxrQkFBVWYsS0FBS2U7QUFGdUIsT0FBbEMsQ0FGSztBQU1YRixjQUFRO0FBTkcsS0FBYixFQU9HUCxJQVBILENBT1EsZUFBTztBQUNiWCxjQUFRWSxHQUFSO0FBQ0QsS0FURDtBQVVELEdBWE0sQ0FBUDtBQVlEOztBQUVEO0FBQ08sU0FBU2YsWUFBVCxDQUFzQlEsSUFBdEIsRUFBNEI7QUFDakMsU0FBTyxJQUFJTixPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBQ3RDQyxtQkFBS0MsT0FBTCxDQUFhO0FBQ1hDLFdBQUsscUJBRE07QUFFWEMsWUFBTUMsT0FBT0MsTUFBUCxDQUFjLEVBQWQsRUFBa0IsMkJBQWxCLEVBQWtDO0FBQ3RDRyxZQUFJO0FBRGtDLE9BQWxDO0FBRkssS0FBYixFQUtHQyxJQUxILENBS1EsZUFBTztBQUNiWCxjQUFRWSxHQUFSO0FBQ0QsS0FQRDtBQVFELEdBVE0sQ0FBUDtBQVVEOztBQUVEO0FBQ08sU0FBU2QsV0FBVCxDQUFxQnVCLE1BQXJCLEVBQTZCO0FBQ2xDLFNBQU8sSUFBSXRCLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDdENDLG1CQUFLQyxPQUFMLENBQWE7QUFDWEMsV0FBSyxlQURNO0FBRVhDLFlBQU1DLE9BQU9DLE1BQVAsQ0FBYyxFQUFkLEVBQWtCLDJCQUFsQixFQUFrQztBQUN0Q00sbUJBQVdRLE9BQU9SLFNBRG9CO0FBRXRDQyxvQkFBWU8sT0FBT0MsS0FGbUI7QUFHdENQLG9CQUFZTSxPQUFPRSxJQUhtQjtBQUl0Q1AsZUFBT0ssT0FBT0w7QUFKd0IsT0FBbEM7QUFGSyxLQUFiLEVBUUdMLElBUkgsQ0FRUSxlQUFPO0FBQ2JYLGNBQVFZLEdBQVI7QUFDRCxLQVZEO0FBV0QsR0FaTSxDQUFQO0FBYUQiLCJmaWxlIjoiY3JlYXRlQ2xhc3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG5pbXBvcnQgY29tbW9uUGFyYW1zIGZyb20gJy4vY29tbW9uRGF0YSdcclxuXHJcbi8vIOiOt+WPluWtpuagoeWIl+ihqFxyXG5leHBvcnQgZnVuY3Rpb24gc2Nob29sTGlzdCgpIHtcclxuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgd2VweS5yZXF1ZXN0KHtcclxuICAgICAgdXJsOiAnL3NjaG9vbC9pbmRleCcsXHJcbiAgICAgIGRhdGE6IE9iamVjdC5hc3NpZ24oe30sIGNvbW1vblBhcmFtcygpLCB7XHJcbiAgICAgICAga2V5d29yZHM6ICcnLFxyXG4gICAgICAgIHBuOiAxLFxyXG4gICAgICAgIHBzOiAxMFxyXG4gICAgICB9KVxyXG4gICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICByZXNvbHZlKHJlcylcclxuICAgIH0pXHJcbiAgfSlcclxufVxyXG5cclxuLy8g5Yib5bu654+t57qnXHJcbmV4cG9ydCBmdW5jdGlvbiBhZGRDbGFzcyhkYXRhKSB7XHJcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgIHdlcHkucmVxdWVzdCh7XHJcbiAgICAgIHVybDogJy9jbGFzcy9hZGRDbGFzcycsXHJcbiAgICAgIGRhdGE6IE9iamVjdC5hc3NpZ24oe30sIGNvbW1vblBhcmFtcygpLCB7XHJcbiAgICAgICAgc2Nob29sX2lkOiBkYXRhLnNjaG9vbF9pZCxcclxuICAgICAgICBncmFkZV90eXBlOiBkYXRhLmdyYWRlX3R5cGUsXHJcbiAgICAgICAgeWVhcl9jbGFzczogZGF0YS55ZWFyX2NsYXNzLFxyXG4gICAgICAgIGNsYXNzOiBkYXRhLmNsYXNzLFxyXG4gICAgICAgIGl0ZW06IGRhdGEuaXRlbVxyXG4gICAgICB9KSxcclxuICAgICAgbWV0aG9kOiAncG9zdCdcclxuICAgIH0pLnRoZW4ocmVzID0+IHtcclxuICAgICAgcmVzb2x2ZShyZXMpXHJcbiAgICB9KVxyXG4gIH0pXHJcbn1cclxuXHJcbi8vIOWKoOWFpeePree6p1xyXG5leHBvcnQgZnVuY3Rpb24gam9pbkNsYXNzKGRhdGEpIHtcclxuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgd2VweS5yZXF1ZXN0KHtcclxuICAgICAgdXJsOiAnL21lbWJlci9jbGFzcy9qb2luJyxcclxuICAgICAgZGF0YTogT2JqZWN0LmFzc2lnbih7fSwgY29tbW9uUGFyYW1zKCksIHtcclxuICAgICAgICBjbGFzc19pZDogZGF0YS5jbGFzc19pZCxcclxuICAgICAgICBqb2luX2tleTogZGF0YS5qb2luX2tleVxyXG4gICAgICB9KSxcclxuICAgICAgbWV0aG9kOiAncG9zdCdcclxuICAgIH0pLnRoZW4ocmVzID0+IHtcclxuICAgICAgcmVzb2x2ZShyZXMpXHJcbiAgICB9KVxyXG4gIH0pXHJcbn1cclxuXHJcbi8vIOiOt+WPluePree6p+WIl+ihqFxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q2xhc3NMaXN0KGRhdGEpIHtcclxuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgd2VweS5yZXF1ZXN0KHtcclxuICAgICAgdXJsOiAnL21lbWJlci9jbGFzcy9pbmRleCcsXHJcbiAgICAgIGRhdGE6IE9iamVjdC5hc3NpZ24oe30sIGNvbW1vblBhcmFtcygpLCB7XHJcbiAgICAgICAgcHM6IDEwMFxyXG4gICAgICB9KVxyXG4gICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICByZXNvbHZlKHJlcylcclxuICAgIH0pXHJcbiAgfSlcclxufVxyXG5cclxuLy8g54+t57qn5p+l6K+iXHJcbmV4cG9ydCBmdW5jdGlvbiBzZWFyY2hDbGFzcyhwYXJhbXMpIHtcclxuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgd2VweS5yZXF1ZXN0KHtcclxuICAgICAgdXJsOiAnL2NsYXNzL3NlYXJjaCcsXHJcbiAgICAgIGRhdGE6IE9iamVjdC5hc3NpZ24oe30sIGNvbW1vblBhcmFtcygpLCB7XHJcbiAgICAgICAgc2Nob29sX2lkOiBwYXJhbXMuc2Nob29sX2lkLFxyXG4gICAgICAgIGdyYWRlX3R5cGU6IHBhcmFtcy5ncmFkZSxcclxuICAgICAgICB5ZWFyX2NsYXNzOiBwYXJhbXMueWVhcixcclxuICAgICAgICBjbGFzczogcGFyYW1zLmNsYXNzXHJcbiAgICAgIH0pXHJcbiAgICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgIHJlc29sdmUocmVzKVxyXG4gICAgfSlcclxuICB9KVxyXG59XHJcbiJdfQ==