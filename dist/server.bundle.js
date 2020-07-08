/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/api/LoginController.js":
/*!************************************!*\
  !*** ./src/api/LoginController.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _config_MailConfig__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config/MailConfig */ \"./src/config/MailConfig.js\");\n/* harmony import */ var bcrypt__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! bcrypt */ \"bcrypt\");\n/* harmony import */ var bcrypt__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(bcrypt__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! moment */ \"moment\");\n/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../config */ \"./src/config/index.js\");\n/* harmony import */ var _common_Utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../common/Utils */ \"./src/common/Utils.js\");\n/* harmony import */ var _model_User__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../model/User */ \"./src/model/User.js\");\n\n\n\n\n\n\n\n\nclass LoginController {\n  constructor() {}\n  /**\r\n   * 忘记密码邮件发送\r\n   * @param {*} ctx \r\n   */\n\n\n  async forget(ctx) {\n    const {\n      body\n    } = ctx.request;\n    console.log(body);\n\n    try {\n      // body.username -> database -> email\n      let result = await Object(_config_MailConfig__WEBPACK_IMPORTED_MODULE_0__[\"default\"])({\n        code: '1234',\n        expire: moment__WEBPACK_IMPORTED_MODULE_2___default()().add(30, 'minutes').format('YYYY-MM-DD HH:mm:ss'),\n        email: body.username,\n        user: 'zjt'\n      });\n      ctx.body = {\n        code: 200,\n        data: result,\n        msg: '邮件发送成功'\n      };\n    } catch (e) {\n      console.log(e);\n    }\n  }\n  /**\r\n   * 登录接口\r\n   * @param {*} ctx \r\n   */\n\n\n  async login(ctx) {\n    // 接收用户的数据\n    // 返回token\n    const {\n      body\n    } = ctx.request;\n    let sid = body.sid;\n    let code = body.code; // 验证图片验证码的时效性、正确性\n\n    let result = await Object(_common_Utils__WEBPACK_IMPORTED_MODULE_5__[\"checkCode\"])(sid, code);\n\n    if (result) {\n      // 验证用户账号密码是否正确\n      let checkUserPasswd = false;\n      let user = await _model_User__WEBPACK_IMPORTED_MODULE_6__[\"default\"].findOne({\n        username: body.username\n      });\n\n      if (await bcrypt__WEBPACK_IMPORTED_MODULE_1___default.a.compare(body.password, user.password)) {\n        checkUserPasswd = true;\n      } // mongoDB查库\n\n\n      if (checkUserPasswd) {\n        // 验证通过，返回Token数据\n        let token = jsonwebtoken__WEBPACK_IMPORTED_MODULE_3___default.a.sign({\n          _id: 'zjt'\n        }, _config__WEBPACK_IMPORTED_MODULE_4__[\"default\"].JWT_SECRET, {\n          expiresIn: '1d'\n        });\n        ctx.body = {\n          code: 200,\n          token: token\n        };\n      } else {\n        // 用户名 密码验证失败，返回提示\n        ctx.body = {\n          code: 404,\n          msg: '用户名或者密码错误'\n        };\n      }\n    } else {\n      // 图片验证码校验失败\n      ctx.body = {\n        code: 401,\n        msg: '图片验证码不正确,请检查！'\n      };\n    }\n  }\n  /**\r\n   * 注册接口\r\n   * @param {*} ctx \r\n   */\n\n\n  async reg(ctx) {\n    // 接收客户端的数据\n    const {\n      body\n    } = ctx.request; // 校验验证码的内容（时效性、有效性）\n\n    let sid = body.sid;\n    let code = body.code;\n    let msg = {}; // 验证图片验证码的时效性、正确性\n\n    let result = await Object(_common_Utils__WEBPACK_IMPORTED_MODULE_5__[\"checkCode\"])(sid, code);\n    let check = true;\n\n    if (result) {\n      // 查库，看username是否被注册\n      let user1 = await _model_User__WEBPACK_IMPORTED_MODULE_6__[\"default\"].findOne({\n        username: body.username\n      });\n      console.log(user1);\n\n      if (user1 !== null && typeof user1.username !== 'undefined') {\n        msg.username = ['此邮箱已经注册，可以通过邮箱找回密码'];\n        check = false;\n      }\n\n      let user2 = await _model_User__WEBPACK_IMPORTED_MODULE_6__[\"default\"].findOne({\n        nickname: body.nickname\n      }); // 查库，看name是否被注册\n\n      if (user2 !== null && typeof user2.nickname !== 'undefined') {\n        msg.nickname = ['此昵称已经被注册，请修改'];\n        check = false;\n      } // 写入数据到数据库\n\n\n      if (check) {\n        body.password = await bcrypt__WEBPACK_IMPORTED_MODULE_1___default.a.hash(body.password, 5);\n        let user = new _model_User__WEBPACK_IMPORTED_MODULE_6__[\"default\"]({\n          username: body.username,\n          nickname: body.nickname,\n          password: body.password,\n          created: moment__WEBPACK_IMPORTED_MODULE_2___default()().format('YYYY-MM-DD HH:mm:ss')\n        });\n        let result = await user.save();\n        ctx.body = {\n          code: 200,\n          data: result,\n          msg: '注册成功'\n        };\n        return;\n      }\n    } else {\n      // veevalidate 显示的错误\n      msg.code = ['验证码已经失效，请重新获取！'];\n    }\n\n    ctx.body = {\n      code: 500,\n      msg: msg\n    };\n  }\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (new LoginController());//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvYXBpL0xvZ2luQ29udHJvbGxlci5qcz85NTA3Il0sIm5hbWVzIjpbIkxvZ2luQ29udHJvbGxlciIsImNvbnN0cnVjdG9yIiwiZm9yZ2V0IiwiY3R4IiwiYm9keSIsInJlcXVlc3QiLCJjb25zb2xlIiwibG9nIiwicmVzdWx0Iiwic2VuZCIsImNvZGUiLCJleHBpcmUiLCJtb21lbnQiLCJhZGQiLCJmb3JtYXQiLCJlbWFpbCIsInVzZXJuYW1lIiwidXNlciIsImRhdGEiLCJtc2ciLCJlIiwibG9naW4iLCJzaWQiLCJjaGVja0NvZGUiLCJjaGVja1VzZXJQYXNzd2QiLCJVc2VyIiwiZmluZE9uZSIsImJjcnlwdCIsImNvbXBhcmUiLCJwYXNzd29yZCIsInRva2VuIiwianNvbndlYnRva2VuIiwic2lnbiIsIl9pZCIsImNvbmZpZyIsIkpXVF9TRUNSRVQiLCJleHBpcmVzSW4iLCJyZWciLCJjaGVjayIsInVzZXIxIiwidXNlcjIiLCJuaWNrbmFtZSIsImhhc2giLCJjcmVhdGVkIiwic2F2ZSJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLE1BQU1BLGVBQU4sQ0FBc0I7QUFDbEJDLGFBQVcsR0FBRyxDQUFHO0FBRWpCOzs7Ozs7QUFJQSxRQUFNQyxNQUFOLENBQWFDLEdBQWIsRUFBa0I7QUFDZCxVQUFNO0FBQUVDO0FBQUYsUUFBV0QsR0FBRyxDQUFDRSxPQUFyQjtBQUNBQyxXQUFPLENBQUNDLEdBQVIsQ0FBWUgsSUFBWjs7QUFDQSxRQUFJO0FBQ0E7QUFDQSxVQUFJSSxNQUFNLEdBQUcsTUFBTUMsa0VBQUksQ0FBQztBQUNwQkMsWUFBSSxFQUFFLE1BRGM7QUFFcEJDLGNBQU0sRUFBRUMsNkNBQU0sR0FDVEMsR0FERyxDQUNDLEVBREQsRUFDSyxTQURMLEVBRUhDLE1BRkcsQ0FF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TSxVQUFJLEVBQUUsR0FEQztBQUVQUyxTQUFHLEVBQUVBO0FBRkUsS0FBWDtBQUlIOztBQWpJaUI7O0FBb0lQLG1FQUFJbkIsZUFBSixFQUFmIiwiZmlsZSI6Ii4vc3JjL2FwaS9Mb2dpbkNvbnRyb2xsZXIuanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgc2VuZCBmcm9tICcuLi9jb25maWcvTWFpbENvbmZpZydcclxuaW1wb3J0IGJjcnlwdCBmcm9tICdiY3J5cHQnXHJcbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50J1xyXG5pbXBvcnQganNvbndlYnRva2VuIGZyb20gJ2pzb253ZWJ0b2tlbidcclxuaW1wb3J0IGNvbmZpZyBmcm9tICcuLi9jb25maWcnXHJcbmltcG9ydCB7IGNoZWNrQ29kZSB9IGZyb20gJy4uL2NvbW1vbi9VdGlscydcclxuaW1wb3J0IFVzZXIgZnJvbSAnLi4vbW9kZWwvVXNlcidcclxuXHJcbmNsYXNzIExvZ2luQ29udHJvbGxlciB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHsgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5b+Y6K6w5a+G56CB6YKu5Lu25Y+R6YCBXHJcbiAgICAgKiBAcGFyYW0geyp9IGN0eCBcclxuICAgICAqL1xyXG4gICAgYXN5bmMgZm9yZ2V0KGN0eCkge1xyXG4gICAgICAgIGNvbnN0IHsgYm9keSB9ID0gY3R4LnJlcXVlc3RcclxuICAgICAgICBjb25zb2xlLmxvZyhib2R5KVxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIC8vIGJvZHkudXNlcm5hbWUgLT4gZGF0YWJhc2UgLT4gZW1haWxcclxuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IGF3YWl0IHNlbmQoe1xyXG4gICAgICAgICAgICAgICAgY29kZTogJzEyMzQnLFxyXG4gICAgICAgICAgICAgICAgZXhwaXJlOiBtb21lbnQoKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGQoMzAsICdtaW51dGVzJylcclxuICAgICAgICAgICAgICAgICAgICAuZm9ybWF0KCdZWVlZLU1NLUREIEhIOm1tOnNzJyksXHJcbiAgICAgICAgICAgICAgICBlbWFpbDogYm9keS51c2VybmFtZSxcclxuICAgICAgICAgICAgICAgIHVzZXI6ICd6anQnLFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBjdHguYm9keSA9IHtcclxuICAgICAgICAgICAgICAgIGNvZGU6IDIwMCxcclxuICAgICAgICAgICAgICAgIGRhdGE6IHJlc3VsdCxcclxuICAgICAgICAgICAgICAgIG1zZzogJ+mCruS7tuWPkemAgeaIkOWKnycsXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGUpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog55m75b2V5o6l5Y+jXHJcbiAgICAgKiBAcGFyYW0geyp9IGN0eCBcclxuICAgICAqL1xyXG4gICAgYXN5bmMgbG9naW4oY3R4KSB7XHJcbiAgICAgICAgLy8g5o6l5pS255So5oi355qE5pWw5o2uXHJcbiAgICAgICAgLy8g6L+U5ZuedG9rZW5cclxuICAgICAgICBjb25zdCB7IGJvZHkgfSA9IGN0eC5yZXF1ZXN0XHJcbiAgICAgICAgbGV0IHNpZCA9IGJvZHkuc2lkXHJcbiAgICAgICAgbGV0IGNvZGUgPSBib2R5LmNvZGVcclxuICAgICAgICAvLyDpqozor4Hlm77niYfpqozor4HnoIHnmoTml7bmlYjmgKfjgIHmraPnoa7mgKdcclxuICAgICAgICBsZXQgcmVzdWx0ID0gYXdhaXQgY2hlY2tDb2RlKHNpZCwgY29kZSlcclxuICAgICAgICBpZiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgIC8vIOmqjOivgeeUqOaIt+i0puWPt+WvhueggeaYr+WQpuato+ehrlxyXG4gICAgICAgICAgICBsZXQgY2hlY2tVc2VyUGFzc3dkID0gZmFsc2VcclxuICAgICAgICAgICAgbGV0IHVzZXIgPSBhd2FpdCBVc2VyLmZpbmRPbmUoeyB1c2VybmFtZTogYm9keS51c2VybmFtZSB9KVxyXG4gICAgICAgICAgICBpZiAoYXdhaXQgYmNyeXB0LmNvbXBhcmUoYm9keS5wYXNzd29yZCwgdXNlci5wYXNzd29yZCkpIHtcclxuICAgICAgICAgICAgICAgIGNoZWNrVXNlclBhc3N3ZCA9IHRydWVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBtb25nb0RC5p+l5bqTXHJcbiAgICAgICAgICAgIGlmIChjaGVja1VzZXJQYXNzd2QpIHtcclxuICAgICAgICAgICAgICAgIC8vIOmqjOivgemAmui/h++8jOi/lOWbnlRva2Vu5pWw5o2uXHJcbiAgICAgICAgICAgICAgICBsZXQgdG9rZW4gPSBqc29ud2VidG9rZW4uc2lnbih7IF9pZDogJ3pqdCcgfSwgY29uZmlnLkpXVF9TRUNSRVQsIHtcclxuICAgICAgICAgICAgICAgICAgICBleHBpcmVzSW46ICcxZCdcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICBjdHguYm9keSA9IHtcclxuICAgICAgICAgICAgICAgICAgICBjb2RlOiAyMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgdG9rZW46IHRva2VuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyDnlKjmiLflkI0g5a+G56CB6aqM6K+B5aSx6LSl77yM6L+U5Zue5o+Q56S6XHJcbiAgICAgICAgICAgICAgICBjdHguYm9keSA9IHtcclxuICAgICAgICAgICAgICAgICAgICBjb2RlOiA0MDQsXHJcbiAgICAgICAgICAgICAgICAgICAgbXNnOiAn55So5oi35ZCN5oiW6ICF5a+G56CB6ZSZ6K+vJ1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8g5Zu+54mH6aqM6K+B56CB5qCh6aqM5aSx6LSlXHJcbiAgICAgICAgICAgIGN0eC5ib2R5ID0ge1xyXG4gICAgICAgICAgICAgICAgY29kZTogNDAxLFxyXG4gICAgICAgICAgICAgICAgbXNnOiAn5Zu+54mH6aqM6K+B56CB5LiN5q2j56GuLOivt+ajgOafpe+8gSdcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDms6jlhozmjqXlj6NcclxuICAgICAqIEBwYXJhbSB7Kn0gY3R4IFxyXG4gICAgICovXHJcbiAgICBhc3luYyByZWcoY3R4KSB7XHJcbiAgICAgICAgLy8g5o6l5pS25a6i5oi356uv55qE5pWw5o2uXHJcbiAgICAgICAgY29uc3QgeyBib2R5IH0gPSBjdHgucmVxdWVzdFxyXG4gICAgICAgIC8vIOagoemqjOmqjOivgeeggeeahOWGheWuue+8iOaXtuaViOaAp+OAgeacieaViOaAp++8iVxyXG4gICAgICAgIGxldCBzaWQgPSBib2R5LnNpZFxyXG4gICAgICAgIGxldCBjb2RlID0gYm9keS5jb2RlXHJcbiAgICAgICAgbGV0IG1zZyA9IHt9XHJcbiAgICAgICAgLy8g6aqM6K+B5Zu+54mH6aqM6K+B56CB55qE5pe25pWI5oCn44CB5q2j56Gu5oCnXHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IGF3YWl0IGNoZWNrQ29kZShzaWQsIGNvZGUpXHJcbiAgICAgICAgbGV0IGNoZWNrID0gdHJ1ZVxyXG4gICAgICAgIGlmIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgLy8g5p+l5bqT77yM55yLdXNlcm5hbWXmmK/lkKbooqvms6jlhoxcclxuICAgICAgICAgICAgbGV0IHVzZXIxID0gYXdhaXQgVXNlci5maW5kT25lKHsgdXNlcm5hbWU6IGJvZHkudXNlcm5hbWUgfSlcclxuICAgICAgICAgICAgY29uc29sZS5sb2codXNlcjEpXHJcbiAgICAgICAgICAgIGlmICh1c2VyMSAhPT0gbnVsbCAmJiB0eXBlb2YgdXNlcjEudXNlcm5hbWUgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgICAgICBtc2cudXNlcm5hbWUgPSBbJ+atpOmCrueuseW3sue7j+azqOWGjO+8jOWPr+S7pemAmui/h+mCrueuseaJvuWbnuWvhueggSddXHJcbiAgICAgICAgICAgICAgICBjaGVjayA9IGZhbHNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IHVzZXIyID0gYXdhaXQgVXNlci5maW5kT25lKHsgbmlja25hbWU6IGJvZHkubmlja25hbWUgfSlcclxuICAgICAgICAgICAgLy8g5p+l5bqT77yM55yLbmFtZeaYr+WQpuiiq+azqOWGjFxyXG4gICAgICAgICAgICBpZiAodXNlcjIgIT09IG51bGwgJiYgdHlwZW9mIHVzZXIyLm5pY2tuYW1lICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICAgICAgbXNnLm5pY2tuYW1lID0gWyfmraTmmLXnp7Dlt7Lnu4/ooqvms6jlhozvvIzor7fkv67mlLknXVxyXG4gICAgICAgICAgICAgICAgY2hlY2sgPSBmYWxzZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIOWGmeWFpeaVsOaNruWIsOaVsOaNruW6k1xyXG4gICAgICAgICAgICBpZiAoY2hlY2spIHtcclxuICAgICAgICAgICAgICAgIGJvZHkucGFzc3dvcmQgPSBhd2FpdCBiY3J5cHQuaGFzaChib2R5LnBhc3N3b3JkLCA1KVxyXG4gICAgICAgICAgICAgICAgbGV0IHVzZXIgPSBuZXcgVXNlcih7XHJcbiAgICAgICAgICAgICAgICAgICAgdXNlcm5hbWU6IGJvZHkudXNlcm5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgbmlja25hbWU6IGJvZHkubmlja25hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgcGFzc3dvcmQ6IGJvZHkucGFzc3dvcmQsXHJcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlZDogbW9tZW50KCkuZm9ybWF0KCdZWVlZLU1NLUREIEhIOm1tOnNzJylcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICBsZXQgcmVzdWx0ID0gYXdhaXQgdXNlci5zYXZlKClcclxuICAgICAgICAgICAgICAgIGN0eC5ib2R5ID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvZGU6IDIwMCxcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiByZXN1bHQsXHJcbiAgICAgICAgICAgICAgICAgICAgbXNnOiAn5rOo5YaM5oiQ5YqfJ1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyB2ZWV2YWxpZGF0ZSDmmL7npLrnmoTplJnor69cclxuICAgICAgICAgICAgbXNnLmNvZGUgPSBbJ+mqjOivgeeggeW3sue7j+WkseaViO+8jOivt+mHjeaWsOiOt+WPlu+8gSddXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGN0eC5ib2R5ID0ge1xyXG4gICAgICAgICAgICBjb2RlOiA1MDAsXHJcbiAgICAgICAgICAgIG1zZzogbXNnXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBuZXcgTG9naW5Db250cm9sbGVyKClcclxuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/api/LoginController.js\n");

/***/ }),

/***/ "./src/api/PublicController.js":
/*!*************************************!*\
  !*** ./src/api/PublicController.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var svg_captcha__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svg-captcha */ \"svg-captcha\");\n/* harmony import */ var svg_captcha__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(svg_captcha__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _config_RedisConfig__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/config/RedisConfig */ \"./src/config/RedisConfig.js\");\n\n\n\nclass PublicController {\n  constructor() {}\n\n  async getCaptcha(ctx) {\n    const body = ctx.request.query;\n    const newCaptcha = svg_captcha__WEBPACK_IMPORTED_MODULE_0___default.a.create({\n      size: 4,\n      ignoreChars: '0oli1O',\n      color: true,\n      noise: Math.floor(Math.random() * 5),\n      width: 150,\n      height: 38\n    }); // 保存图片验证码\n    // 设置超时时间10分钟\n\n    Object(_config_RedisConfig__WEBPACK_IMPORTED_MODULE_1__[\"setValue\"])(body.sid, newCaptcha.text, 10 * 60);\n    Object(_config_RedisConfig__WEBPACK_IMPORTED_MODULE_1__[\"getValue\"])(body.sid).then(res => {\n      console.log(body.sid);\n    });\n    ctx.body = {\n      code: 200,\n      data: newCaptcha.data\n    };\n  }\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (new PublicController());//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvYXBpL1B1YmxpY0NvbnRyb2xsZXIuanM/NjhhZSJdLCJuYW1lcyI6WyJQdWJsaWNDb250cm9sbGVyIiwiY29uc3RydWN0b3IiLCJnZXRDYXB0Y2hhIiwiY3R4IiwiYm9keSIsInJlcXVlc3QiLCJxdWVyeSIsIm5ld0NhcHRjaGEiLCJzdmdDYXB0Y2hhIiwiY3JlYXRlIiwic2l6ZSIsImlnbm9yZUNoYXJzIiwiY29sb3IiLCJub2lzZSIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsIndpZHRoIiwiaGVpZ2h0Iiwic2V0VmFsdWUiLCJzaWQiLCJ0ZXh0IiwiZ2V0VmFsdWUiLCJ0aGVuIiwicmVzIiwiY29uc29sZSIsImxvZyIsImNvZGUiLCJkYXRhIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7O0FBRUEsTUFBTUEsZ0JBQU4sQ0FBdUI7QUFDckJDLGFBQVcsR0FBRyxDQUFHOztBQUNqQixRQUFNQyxVQUFOLENBQWtCQyxHQUFsQixFQUF1QjtBQUNyQixVQUFNQyxJQUFJLEdBQUdELEdBQUcsQ0FBQ0UsT0FBSixDQUFZQyxLQUF6QjtBQUNBLFVBQU1DLFVBQVUsR0FBR0Msa0RBQVUsQ0FBQ0MsTUFBWCxDQUFrQjtBQUNuQ0MsVUFBSSxFQUFFLENBRDZCO0FBRW5DQyxpQkFBVyxFQUFFLFFBRnNCO0FBR25DQyxXQUFLLEVBQUUsSUFINEI7QUFJbkNDLFdBQUssRUFBRUMsSUFBSSxDQUFDQyxLQUFMLENBQVdELElBQUksQ0FBQ0UsTUFBTCxLQUFnQixDQUEzQixDQUo0QjtBQUtuQ0MsV0FBSyxFQUFFLEdBTDRCO0FBTW5DQyxZQUFNLEVBQUU7QUFOMkIsS0FBbEIsQ0FBbkIsQ0FGcUIsQ0FVckI7QUFDQTs7QUFDQUMsd0VBQVEsQ0FBQ2YsSUFBSSxDQUFDZ0IsR0FBTixFQUFXYixVQUFVLENBQUNjLElBQXRCLEVBQTRCLEtBQUssRUFBakMsQ0FBUjtBQUNBQyx3RUFBUSxDQUFDbEIsSUFBSSxDQUFDZ0IsR0FBTixDQUFSLENBQW1CRyxJQUFuQixDQUF5QkMsR0FBRCxJQUFTO0FBQy9CQyxhQUFPLENBQUNDLEdBQVIsQ0FBWXRCLElBQUksQ0FBQ2dCLEdBQWpCO0FBQ0QsS0FGRDtBQUdBakIsT0FBRyxDQUFDQyxJQUFKLEdBQVc7QUFDVHVCLFVBQUksRUFBRSxHQURHO0FBRVRDLFVBQUksRUFBRXJCLFVBQVUsQ0FBQ3FCO0FBRlIsS0FBWDtBQUlEOztBQXRCb0I7O0FBeUJSLG1FQUFJNUIsZ0JBQUosRUFBZiIsImZpbGUiOiIuL3NyYy9hcGkvUHVibGljQ29udHJvbGxlci5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBzdmdDYXB0Y2hhIGZyb20gJ3N2Zy1jYXB0Y2hhJ1xyXG5pbXBvcnQgeyBnZXRWYWx1ZSwgc2V0VmFsdWUgfSBmcm9tICdAL2NvbmZpZy9SZWRpc0NvbmZpZydcclxuXHJcbmNsYXNzIFB1YmxpY0NvbnRyb2xsZXIge1xyXG4gIGNvbnN0cnVjdG9yKCkgeyB9XHJcbiAgYXN5bmMgZ2V0Q2FwdGNoYSAoY3R4KSB7XHJcbiAgICBjb25zdCBib2R5ID0gY3R4LnJlcXVlc3QucXVlcnlcclxuICAgIGNvbnN0IG5ld0NhcHRjaGEgPSBzdmdDYXB0Y2hhLmNyZWF0ZSh7XHJcbiAgICAgIHNpemU6IDQsXHJcbiAgICAgIGlnbm9yZUNoYXJzOiAnMG9saTFPJyxcclxuICAgICAgY29sb3I6IHRydWUsXHJcbiAgICAgIG5vaXNlOiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA1KSxcclxuICAgICAgd2lkdGg6IDE1MCxcclxuICAgICAgaGVpZ2h0OiAzOFxyXG4gICAgfSlcclxuICAgIC8vIOS/neWtmOWbvueJh+mqjOivgeeggVxyXG4gICAgLy8g6K6+572u6LaF5pe25pe26Ze0MTDliIbpkp9cclxuICAgIHNldFZhbHVlKGJvZHkuc2lkLCBuZXdDYXB0Y2hhLnRleHQsIDEwICogNjApXHJcbiAgICBnZXRWYWx1ZShib2R5LnNpZCkudGhlbigocmVzKSA9PiB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGJvZHkuc2lkKVxyXG4gICAgfSlcclxuICAgIGN0eC5ib2R5ID0ge1xyXG4gICAgICBjb2RlOiAyMDAsXHJcbiAgICAgIGRhdGE6IG5ld0NhcHRjaGEuZGF0YSxcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IG5ldyBQdWJsaWNDb250cm9sbGVyKClcclxuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/api/PublicController.js\n");

/***/ }),

/***/ "./src/common/ErrorHandle.js":
/*!***********************************!*\
  !*** ./src/common/ErrorHandle.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ((ctx, next) => {\n  return next().catch(err => {\n    if (401 === err.status) {\n      ctx.status = 401;\n      ctx.body = {\n        code: 401,\n        msg: '用户无权限！！！'\n      };\n    } else {\n      console.log(err);\n      ctx.status = err.status || 500;\n      ctx.body = Object.assign({\n        code: 500,\n        msg: err.message\n      },  true ? {\n        stack: err.stack\n      } : undefined);\n    }\n  });\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY29tbW9uL0Vycm9ySGFuZGxlLmpzPzQxZWIiXSwibmFtZXMiOlsiY3R4IiwibmV4dCIsImNhdGNoIiwiZXJyIiwic3RhdHVzIiwiYm9keSIsImNvZGUiLCJtc2ciLCJjb25zb2xlIiwibG9nIiwiT2JqZWN0IiwiYXNzaWduIiwibWVzc2FnZSIsInByb2Nlc3MiLCJzdGFjayJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBZSxnRUFBQ0EsR0FBRCxFQUFNQyxJQUFOLEtBQWU7QUFDNUIsU0FBT0EsSUFBSSxHQUFHQyxLQUFQLENBQWNDLEdBQUQsSUFBUztBQUMzQixRQUFJLFFBQVFBLEdBQUcsQ0FBQ0MsTUFBaEIsRUFBd0I7QUFDdEJKLFNBQUcsQ0FBQ0ksTUFBSixHQUFhLEdBQWI7QUFDQUosU0FBRyxDQUFDSyxJQUFKLEdBQVc7QUFDVEMsWUFBSSxFQUFFLEdBREc7QUFFVEMsV0FBRyxFQUFFO0FBRkksT0FBWDtBQUlELEtBTkQsTUFNTztBQUNMQyxhQUFPLENBQUNDLEdBQVIsQ0FBWU4sR0FBWjtBQUNBSCxTQUFHLENBQUNJLE1BQUosR0FBYUQsR0FBRyxDQUFDQyxNQUFKLElBQWMsR0FBM0I7QUFDQUosU0FBRyxDQUFDSyxJQUFKLEdBQVdLLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjO0FBQ3ZCTCxZQUFJLEVBQUUsR0FEaUI7QUFFdkJDLFdBQUcsRUFBRUosR0FBRyxDQUFDUztBQUZjLE9BQWQsRUFHUkMsS0FBQSxHQUF5QztBQUFFQyxhQUFLLEVBQUVYLEdBQUcsQ0FBQ1c7QUFBYixPQUF6QyxHQUFnRSxTQUh4RCxDQUFYO0FBSUQ7QUFDRixHQWZNLENBQVA7QUFnQkQsQ0FqQkQiLCJmaWxlIjoiLi9zcmMvY29tbW9uL0Vycm9ySGFuZGxlLmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgKGN0eCwgbmV4dCkgPT4ge1xyXG4gIHJldHVybiBuZXh0KCkuY2F0Y2goKGVycikgPT4ge1xyXG4gICAgaWYgKDQwMSA9PT0gZXJyLnN0YXR1cykge1xyXG4gICAgICBjdHguc3RhdHVzID0gNDAxXHJcbiAgICAgIGN0eC5ib2R5ID0ge1xyXG4gICAgICAgIGNvZGU6IDQwMSxcclxuICAgICAgICBtc2c6ICfnlKjmiLfml6DmnYPpmZDvvIHvvIHvvIEnXHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGVycilcclxuICAgICAgY3R4LnN0YXR1cyA9IGVyci5zdGF0dXMgfHwgNTAwXHJcbiAgICAgIGN0eC5ib2R5ID0gT2JqZWN0LmFzc2lnbih7XHJcbiAgICAgICAgY29kZTogNTAwLFxyXG4gICAgICAgIG1zZzogZXJyLm1lc3NhZ2VcclxuICAgICAgfSwgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCcgPyB7IHN0YWNrOiBlcnIuc3RhY2sgfSA6IHt9KVxyXG4gICAgfVxyXG4gIH0pXHJcbn0iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/common/ErrorHandle.js\n");

/***/ }),

/***/ "./src/common/Utils.js":
/*!*****************************!*\
  !*** ./src/common/Utils.js ***!
  \*****************************/
/*! exports provided: checkCode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"checkCode\", function() { return checkCode; });\n/* harmony import */ var _config_RedisConfig__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/config/RedisConfig */ \"./src/config/RedisConfig.js\");\n\n\nconst checkCode = async (key, value) => {\n  const redisData = await Object(_config_RedisConfig__WEBPACK_IMPORTED_MODULE_0__[\"getValue\"])(key);\n\n  if (redisData !== null) {\n    return redisData.toLowerCase() === value.toLowerCase();\n  } else {\n    return false;\n  }\n};\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY29tbW9uL1V0aWxzLmpzP2I0ZGYiXSwibmFtZXMiOlsiY2hlY2tDb2RlIiwia2V5IiwidmFsdWUiLCJyZWRpc0RhdGEiLCJnZXRWYWx1ZSIsInRvTG93ZXJDYXNlIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFFQSxNQUFNQSxTQUFTLEdBQUcsT0FBT0MsR0FBUCxFQUFZQyxLQUFaLEtBQXNCO0FBQ3RDLFFBQU1DLFNBQVMsR0FBRyxNQUFNQyxvRUFBUSxDQUFDSCxHQUFELENBQWhDOztBQUNBLE1BQUlFLFNBQVMsS0FBSyxJQUFsQixFQUF3QjtBQUN0QixXQUFPQSxTQUFTLENBQUNFLFdBQVYsT0FBNEJILEtBQUssQ0FBQ0csV0FBTixFQUFuQztBQUNELEdBRkQsTUFFTztBQUNMLFdBQU8sS0FBUDtBQUNEO0FBQ0YsQ0FQRCIsImZpbGUiOiIuL3NyYy9jb21tb24vVXRpbHMuanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBnZXRWYWx1ZSB9IGZyb20gJ0AvY29uZmlnL1JlZGlzQ29uZmlnJ1xyXG5cclxuY29uc3QgY2hlY2tDb2RlID0gYXN5bmMgKGtleSwgdmFsdWUpID0+IHtcclxuICBjb25zdCByZWRpc0RhdGEgPSBhd2FpdCBnZXRWYWx1ZShrZXkpXHJcbiAgaWYgKHJlZGlzRGF0YSAhPT0gbnVsbCkge1xyXG4gICAgcmV0dXJuIHJlZGlzRGF0YS50b0xvd2VyQ2FzZSgpID09PSB2YWx1ZS50b0xvd2VyQ2FzZSgpXHJcbiAgfSBlbHNlIHtcclxuICAgIHJldHVybiBmYWxzZVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IHtcclxuICBjaGVja0NvZGVcclxufSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/common/Utils.js\n");

/***/ }),

/***/ "./src/config/DBhelper.js":
/*!********************************!*\
  !*** ./src/config/DBhelper.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index */ \"./src/config/index.js\");\n\n\nmongoose__WEBPACK_IMPORTED_MODULE_0___default.a.connect(_index__WEBPACK_IMPORTED_MODULE_1__[\"default\"].DB_URL, {\n  useNewUrlParser: true,\n  useUnifiedTopology: true\n});\nmongoose__WEBPACK_IMPORTED_MODULE_0___default.a.connection.on('connected', () => {\n  console.log('连接成功');\n});\nmongoose__WEBPACK_IMPORTED_MODULE_0___default.a.connection.on('error', () => {\n  console.log('连接失败');\n});\nmongoose__WEBPACK_IMPORTED_MODULE_0___default.a.connection.on('disconnected', () => {\n  console.log('断线');\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (mongoose__WEBPACK_IMPORTED_MODULE_0___default.a);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY29uZmlnL0RCaGVscGVyLmpzP2UwNjUiXSwibmFtZXMiOlsibW9uZ29vc2UiLCJjb25uZWN0IiwiY29uZmlnIiwiREJfVVJMIiwidXNlTmV3VXJsUGFyc2VyIiwidXNlVW5pZmllZFRvcG9sb2d5IiwiY29ubmVjdGlvbiIsIm9uIiwiY29uc29sZSIsImxvZyJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBRUFBLCtDQUFRLENBQUNDLE9BQVQsQ0FBaUJDLDhDQUFNLENBQUNDLE1BQXhCLEVBQWdDO0FBQzlCQyxpQkFBZSxFQUFFLElBRGE7QUFFOUJDLG9CQUFrQixFQUFFO0FBRlUsQ0FBaEM7QUFLQUwsK0NBQVEsQ0FBQ00sVUFBVCxDQUFvQkMsRUFBcEIsQ0FBdUIsV0FBdkIsRUFBb0MsTUFBTTtBQUN4Q0MsU0FBTyxDQUFDQyxHQUFSLENBQVksTUFBWjtBQUNELENBRkQ7QUFHQVQsK0NBQVEsQ0FBQ00sVUFBVCxDQUFvQkMsRUFBcEIsQ0FBdUIsT0FBdkIsRUFBZ0MsTUFBTTtBQUNwQ0MsU0FBTyxDQUFDQyxHQUFSLENBQVksTUFBWjtBQUNELENBRkQ7QUFHQVQsK0NBQVEsQ0FBQ00sVUFBVCxDQUFvQkMsRUFBcEIsQ0FBdUIsY0FBdkIsRUFBdUMsTUFBTTtBQUMzQ0MsU0FBTyxDQUFDQyxHQUFSLENBQVksSUFBWjtBQUNELENBRkQ7QUFJZVQsOEdBQWYiLCJmaWxlIjoiLi9zcmMvY29uZmlnL0RCaGVscGVyLmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG1vbmdvb3NlIGZyb20gJ21vbmdvb3NlJ1xyXG5pbXBvcnQgY29uZmlnIGZyb20gJy4vaW5kZXgnXHJcblxyXG5tb25nb29zZS5jb25uZWN0KGNvbmZpZy5EQl9VUkwsIHtcclxuICB1c2VOZXdVcmxQYXJzZXI6IHRydWUsXHJcbiAgdXNlVW5pZmllZFRvcG9sb2d5OiB0cnVlXHJcbn0pO1xyXG5cclxubW9uZ29vc2UuY29ubmVjdGlvbi5vbignY29ubmVjdGVkJywgKCkgPT4ge1xyXG4gIGNvbnNvbGUubG9nKCfov57mjqXmiJDlip8nKVxyXG59KVxyXG5tb25nb29zZS5jb25uZWN0aW9uLm9uKCdlcnJvcicsICgpID0+IHtcclxuICBjb25zb2xlLmxvZygn6L+e5o6l5aSx6LSlJylcclxufSlcclxubW9uZ29vc2UuY29ubmVjdGlvbi5vbignZGlzY29ubmVjdGVkJywgKCkgPT4ge1xyXG4gIGNvbnNvbGUubG9nKCfmlq3nur8nKVxyXG59KVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgbW9uZ29vc2UiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/config/DBhelper.js\n");

/***/ }),

/***/ "./src/config/MailConfig.js":
/*!**********************************!*\
  !*** ./src/config/MailConfig.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var nodemailer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! nodemailer */ \"nodemailer\");\n/* harmony import */ var nodemailer__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(nodemailer__WEBPACK_IMPORTED_MODULE_0__);\n // async..await is not allowed in global scope, must use a wrapper\n\nasync function send(sendInfo) {\n  // Generate test SMTP service account from ethereal.email\n  // Only needed if you don't have a real mail account for testing\n  // let testAccount = await nodemailer.createTestAccount();\n  // create reusable transporter object using the default SMTP transport\n  let transporter = nodemailer__WEBPACK_IMPORTED_MODULE_0___default.a.createTransport({\n    host: \"smtp.qq.com\",\n    port: 587,\n    secure: false,\n    // true for 465, false for other ports\n    auth: {\n      user: '947140669@qq.com',\n      // generated ethereal user\n      pass: 'sgyamwqnsausbbeb' // generated ethereal password\n\n    }\n  });\n  const url = 'https://www.baidu.com'; // send mail with defined transport object\n\n  let info = await transporter.sendMail({\n    from: '\"认证邮件\" <947140669@qq.com>',\n    // sender address\n    to: sendInfo.email,\n    // list of receivers\n    subject: sendInfo.user !== '' ? `你好开发者，${sendInfo.user}！《慕课网前端全栈实践》注册码` : '《慕课网前端全栈实践》注册码',\n    // Subject line\n    text: `您在《慕课网前端全栈实践》课程中注册，您的邀请码是${sendInfo.code},邀请码的过期时间: ${sendInfo.expire}`,\n    // plain text body\n    html: `\n        <div style=\"border: 1px solid #dcdcdc;color: #676767;width: 600px; margin: 0 auto; padding-bottom: 50px;position: relative;\">\n        <div style=\"height: 60px; background: #393d49; line-height: 60px; color: #58a36f; font-size: 18px;padding-left: 10px;\">Imooc社区——欢迎来到官方社区</div>\n        <div style=\"padding: 25px\">\n          <div>您好，${sendInfo.user}童鞋，重置链接有效时间30分钟，请在${sendInfo.expire}之前重置您的密码：</div>\n          <a href=\"${url}\" style=\"padding: 10px 20px; color: #fff; background: #009e94; display: inline-block;margin: 15px 0;\">立即重置密码</a>\n          <div style=\"padding: 5px; background: #f2f2f2;\">如果该邮件不是由你本人操作，请勿进行激活！否则你的邮箱将会被他人绑定。</div>\n        </div>\n        <div style=\"background: #fafafa; color: #b4b4b4;text-align: center; line-height: 45px; height: 45px; position: absolute; left: 0; bottom: 0;width: 100%;\">系统邮件，请勿直接回复</div>\n    </div>\n    ` // html body\n\n  });\n  return 'Message sent: %s', info.messageId;\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (send);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY29uZmlnL01haWxDb25maWcuanM/MmRiMSJdLCJuYW1lcyI6WyJzZW5kIiwic2VuZEluZm8iLCJ0cmFuc3BvcnRlciIsIm5vZGVtYWlsZXIiLCJjcmVhdGVUcmFuc3BvcnQiLCJob3N0IiwicG9ydCIsInNlY3VyZSIsImF1dGgiLCJ1c2VyIiwicGFzcyIsInVybCIsImluZm8iLCJzZW5kTWFpbCIsImZyb20iLCJ0byIsImVtYWlsIiwic3ViamVjdCIsInRleHQiLCJjb2RlIiwiZXhwaXJlIiwiaHRtbCIsIm1lc3NhZ2VJZCJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0NBRUE7O0FBQ0EsZUFBZUEsSUFBZixDQUFvQkMsUUFBcEIsRUFBOEI7QUFDMUI7QUFDQTtBQUNBO0FBRUE7QUFDQSxNQUFJQyxXQUFXLEdBQUdDLGlEQUFVLENBQUNDLGVBQVgsQ0FBMkI7QUFDekNDLFFBQUksRUFBRSxhQURtQztBQUV6Q0MsUUFBSSxFQUFFLEdBRm1DO0FBR3pDQyxVQUFNLEVBQUUsS0FIaUM7QUFHMUI7QUFDZkMsUUFBSSxFQUFFO0FBQ0ZDLFVBQUksRUFBRSxrQkFESjtBQUN3QjtBQUMxQkMsVUFBSSxFQUFFLGtCQUZKLENBRXdCOztBQUZ4QjtBQUptQyxHQUEzQixDQUFsQjtBQVNBLFFBQU1DLEdBQUcsR0FBRyx1QkFBWixDQWYwQixDQWdCMUI7O0FBQ0EsTUFBSUMsSUFBSSxHQUFHLE1BQU1WLFdBQVcsQ0FBQ1csUUFBWixDQUFxQjtBQUNsQ0MsUUFBSSxFQUFFLDJCQUQ0QjtBQUNDO0FBQ25DQyxNQUFFLEVBQUVkLFFBQVEsQ0FBQ2UsS0FGcUI7QUFFZDtBQUNwQkMsV0FBTyxFQUNIaEIsUUFBUSxDQUFDUSxJQUFULEtBQWtCLEVBQWxCLEdBQ08sU0FBUVIsUUFBUSxDQUFDUSxJQUFLLGlCQUQ3QixHQUVNLGdCQU53QjtBQU1OO0FBQzVCUyxRQUFJLEVBQUcsNEJBQ0hqQixRQUFRLENBQUNrQixJQUNSLGNBQWFsQixRQUFRLENBQUNtQixNQUFPLEVBVEE7QUFTRztBQUNyQ0MsUUFBSSxFQUFHOzs7O29CQUlLcEIsUUFBUSxDQUFDUSxJQUFLLHFCQUN0QlIsUUFBUSxDQUFDbUIsTUFDUjtxQkFDUVQsR0FBSTs7Ozs7S0FqQmlCLENBc0JuQzs7QUF0Qm1DLEdBQXJCLENBQWpCO0FBeUJBLFNBQU8sb0JBQW9CQyxJQUFJLENBQUNVLFNBQWhDO0FBRUg7O0FBRWN0QixtRUFBZiIsImZpbGUiOiIuL3NyYy9jb25maWcvTWFpbENvbmZpZy5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBub2RlbWFpbGVyIGZyb20gJ25vZGVtYWlsZXInXHJcblxyXG4vLyBhc3luYy4uYXdhaXQgaXMgbm90IGFsbG93ZWQgaW4gZ2xvYmFsIHNjb3BlLCBtdXN0IHVzZSBhIHdyYXBwZXJcclxuYXN5bmMgZnVuY3Rpb24gc2VuZChzZW5kSW5mbykge1xyXG4gICAgLy8gR2VuZXJhdGUgdGVzdCBTTVRQIHNlcnZpY2UgYWNjb3VudCBmcm9tIGV0aGVyZWFsLmVtYWlsXHJcbiAgICAvLyBPbmx5IG5lZWRlZCBpZiB5b3UgZG9uJ3QgaGF2ZSBhIHJlYWwgbWFpbCBhY2NvdW50IGZvciB0ZXN0aW5nXHJcbiAgICAvLyBsZXQgdGVzdEFjY291bnQgPSBhd2FpdCBub2RlbWFpbGVyLmNyZWF0ZVRlc3RBY2NvdW50KCk7XHJcblxyXG4gICAgLy8gY3JlYXRlIHJldXNhYmxlIHRyYW5zcG9ydGVyIG9iamVjdCB1c2luZyB0aGUgZGVmYXVsdCBTTVRQIHRyYW5zcG9ydFxyXG4gICAgbGV0IHRyYW5zcG9ydGVyID0gbm9kZW1haWxlci5jcmVhdGVUcmFuc3BvcnQoe1xyXG4gICAgICAgIGhvc3Q6IFwic210cC5xcS5jb21cIixcclxuICAgICAgICBwb3J0OiA1ODcsXHJcbiAgICAgICAgc2VjdXJlOiBmYWxzZSwgLy8gdHJ1ZSBmb3IgNDY1LCBmYWxzZSBmb3Igb3RoZXIgcG9ydHNcclxuICAgICAgICBhdXRoOiB7XHJcbiAgICAgICAgICAgIHVzZXI6ICc5NDcxNDA2NjlAcXEuY29tJywgLy8gZ2VuZXJhdGVkIGV0aGVyZWFsIHVzZXJcclxuICAgICAgICAgICAgcGFzczogJ3NneWFtd3Fuc2F1c2JiZWInLCAvLyBnZW5lcmF0ZWQgZXRoZXJlYWwgcGFzc3dvcmRcclxuICAgICAgICB9LFxyXG4gICAgfSk7XHJcbiAgICBjb25zdCB1cmwgPSAnaHR0cHM6Ly93d3cuYmFpZHUuY29tJ1xyXG4gICAgLy8gc2VuZCBtYWlsIHdpdGggZGVmaW5lZCB0cmFuc3BvcnQgb2JqZWN0XHJcbiAgICBsZXQgaW5mbyA9IGF3YWl0IHRyYW5zcG9ydGVyLnNlbmRNYWlsKHtcclxuICAgICAgICBmcm9tOiAnXCLorqTor4Hpgq7ku7ZcIiA8OTQ3MTQwNjY5QHFxLmNvbT4nLCAvLyBzZW5kZXIgYWRkcmVzc1xyXG4gICAgICAgIHRvOiBzZW5kSW5mby5lbWFpbCwgLy8gbGlzdCBvZiByZWNlaXZlcnNcclxuICAgICAgICBzdWJqZWN0OlxyXG4gICAgICAgICAgICBzZW5kSW5mby51c2VyICE9PSAnJ1xyXG4gICAgICAgICAgICAgICAgPyBg5L2g5aW95byA5Y+R6ICF77yMJHtzZW5kSW5mby51c2Vyfe+8geOAiuaFleivvue9keWJjeerr+WFqOagiOWunui3teOAi+azqOWGjOeggWBcclxuICAgICAgICAgICAgICAgIDogJ+OAiuaFleivvue9keWJjeerr+WFqOagiOWunui3teOAi+azqOWGjOeggScsIC8vIFN1YmplY3QgbGluZVxyXG4gICAgICAgIHRleHQ6IGDmgqjlnKjjgIrmhZXor77nvZHliY3nq6/lhajmoIjlrp7ot7XjgIvor77nqIvkuK3ms6jlhozvvIzmgqjnmoTpgoDor7fnoIHmmK8ke1xyXG4gICAgICAgICAgICBzZW5kSW5mby5jb2RlXHJcbiAgICAgICAgICAgIH0s6YKA6K+356CB55qE6L+H5pyf5pe26Ze0OiAke3NlbmRJbmZvLmV4cGlyZX1gLCAvLyBwbGFpbiB0ZXh0IGJvZHlcclxuICAgICAgICBodG1sOiBgXHJcbiAgICAgICAgPGRpdiBzdHlsZT1cImJvcmRlcjogMXB4IHNvbGlkICNkY2RjZGM7Y29sb3I6ICM2NzY3Njc7d2lkdGg6IDYwMHB4OyBtYXJnaW46IDAgYXV0bzsgcGFkZGluZy1ib3R0b206IDUwcHg7cG9zaXRpb246IHJlbGF0aXZlO1wiPlxyXG4gICAgICAgIDxkaXYgc3R5bGU9XCJoZWlnaHQ6IDYwcHg7IGJhY2tncm91bmQ6ICMzOTNkNDk7IGxpbmUtaGVpZ2h0OiA2MHB4OyBjb2xvcjogIzU4YTM2ZjsgZm9udC1zaXplOiAxOHB4O3BhZGRpbmctbGVmdDogMTBweDtcIj5JbW9vY+ekvuWMuuKAlOKAlOasoui/juadpeWIsOWumOaWueekvuWMujwvZGl2PlxyXG4gICAgICAgIDxkaXYgc3R5bGU9XCJwYWRkaW5nOiAyNXB4XCI+XHJcbiAgICAgICAgICA8ZGl2PuaCqOWlve+8jCR7c2VuZEluZm8udXNlcn3nq6XpnovvvIzph43nva7pk77mjqXmnInmlYjml7bpl7QzMOWIhumSn++8jOivt+WcqCR7XHJcbiAgICAgICAgICAgIHNlbmRJbmZvLmV4cGlyZVxyXG4gICAgICAgICAgICB95LmL5YmN6YeN572u5oKo55qE5a+G56CB77yaPC9kaXY+XHJcbiAgICAgICAgICA8YSBocmVmPVwiJHt1cmx9XCIgc3R5bGU9XCJwYWRkaW5nOiAxMHB4IDIwcHg7IGNvbG9yOiAjZmZmOyBiYWNrZ3JvdW5kOiAjMDA5ZTk0OyBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7bWFyZ2luOiAxNXB4IDA7XCI+56uL5Y2z6YeN572u5a+G56CBPC9hPlxyXG4gICAgICAgICAgPGRpdiBzdHlsZT1cInBhZGRpbmc6IDVweDsgYmFja2dyb3VuZDogI2YyZjJmMjtcIj7lpoLmnpzor6Xpgq7ku7bkuI3mmK/nlLHkvaDmnKzkurrmk43kvZzvvIzor7fli7/ov5vooYzmv4DmtLvvvIHlkKbliJnkvaDnmoTpgq7nrrHlsIbkvJrooqvku5bkurrnu5HlrprjgII8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IHN0eWxlPVwiYmFja2dyb3VuZDogI2ZhZmFmYTsgY29sb3I6ICNiNGI0YjQ7dGV4dC1hbGlnbjogY2VudGVyOyBsaW5lLWhlaWdodDogNDVweDsgaGVpZ2h0OiA0NXB4OyBwb3NpdGlvbjogYWJzb2x1dGU7IGxlZnQ6IDA7IGJvdHRvbTogMDt3aWR0aDogMTAwJTtcIj7ns7vnu5/pgq7ku7bvvIzor7fli7/nm7TmjqXlm57lpI08L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gICAgYCwgLy8gaHRtbCBib2R5XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gJ01lc3NhZ2Ugc2VudDogJXMnLCBpbmZvLm1lc3NhZ2VJZFxyXG5cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgc2VuZCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/config/MailConfig.js\n");

/***/ }),

/***/ "./src/config/RedisConfig.js":
/*!***********************************!*\
  !*** ./src/config/RedisConfig.js ***!
  \***********************************/
/*! exports provided: client, setValue, getValue, getHValue, delValue */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"client\", function() { return client; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"setValue\", function() { return setValue; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getValue\", function() { return getValue; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getHValue\", function() { return getHValue; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"delValue\", function() { return delValue; });\n/* harmony import */ var redis__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redis */ \"redis\");\n/* harmony import */ var redis__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(redis__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var bluebird__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! bluebird */ \"bluebird\");\n/* harmony import */ var bluebird__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(bluebird__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index */ \"./src/config/index.js\");\n\n\n\nconst options = {\n  host: _index__WEBPACK_IMPORTED_MODULE_2__[\"default\"].REDIS.host,\n  port: _index__WEBPACK_IMPORTED_MODULE_2__[\"default\"].REDIS.port,\n  password: _index__WEBPACK_IMPORTED_MODULE_2__[\"default\"].REDIS.password,\n  detect_buffers: true,\n  retry_strategy: function (options) {\n    if (options.error && options.error.code === \"ECONNREFUSED\") {\n      // End reconnecting on a specific error and flush all commands with\n      // a individual error\n      return new Error(\"The server refused the connection\");\n    }\n\n    if (options.total_retry_time > 1000 * 60 * 60) {\n      // End reconnecting after a specific timeout and flush all commands\n      // with a individual error\n      return new Error(\"Retry time exhausted\");\n    }\n\n    if (options.attempt > 10) {\n      // End reconnecting with built in error\n      return undefined;\n    } // reconnect after\n\n\n    return Math.min(options.attempt * 100, 3000);\n  }\n};\nconst client = Object(bluebird__WEBPACK_IMPORTED_MODULE_1__[\"promisifyAll\"])(redis__WEBPACK_IMPORTED_MODULE_0___default.a.createClient(options));\nclient.on('error', err => {\n  console.log('Redis Client Error:' + err);\n});\n\nconst setValue = (key, value, time) => {\n  if (typeof value === 'undefined' || value === '' || value === null) {\n    return;\n  }\n\n  if (typeof value === 'string') {\n    // 如果存在time就设置过期时间\n    if (typeof time !== 'undefined') {\n      client.set(key, value, 'EX', time);\n    } else {\n      client.set(key, value);\n    }\n  } else if (typeof value === 'object') {\n    Object.keys(value).forEach(item => {\n      client.hset(key, item, value[item], redis__WEBPACK_IMPORTED_MODULE_0___default.a.print);\n    });\n  }\n};\n\nconst getValue = key => {\n  return client.getAsync(key);\n};\n\nconst getHValue = key => {\n  // v8 Promisify method use util, must node > 8\n  // return promisify(client.hgetall).bind(client)(key)\n  // bluebird async\n  return client.hgetallAsync(key);\n};\n\nconst delValue = key => {\n  client.del(key, (err, res) => {\n    if (res === 1) {\n      console.log('delete successfully');\n    } else {\n      console.log('delete redis key error:' + err);\n    }\n  });\n};\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY29uZmlnL1JlZGlzQ29uZmlnLmpzP2I3ODkiXSwibmFtZXMiOlsib3B0aW9ucyIsImhvc3QiLCJjb25maWciLCJSRURJUyIsInBvcnQiLCJwYXNzd29yZCIsImRldGVjdF9idWZmZXJzIiwicmV0cnlfc3RyYXRlZ3kiLCJlcnJvciIsImNvZGUiLCJFcnJvciIsInRvdGFsX3JldHJ5X3RpbWUiLCJhdHRlbXB0IiwidW5kZWZpbmVkIiwiTWF0aCIsIm1pbiIsImNsaWVudCIsInByb21pc2lmeUFsbCIsInJlZGlzIiwiY3JlYXRlQ2xpZW50Iiwib24iLCJlcnIiLCJjb25zb2xlIiwibG9nIiwic2V0VmFsdWUiLCJrZXkiLCJ2YWx1ZSIsInRpbWUiLCJzZXQiLCJPYmplY3QiLCJrZXlzIiwiZm9yRWFjaCIsIml0ZW0iLCJoc2V0IiwicHJpbnQiLCJnZXRWYWx1ZSIsImdldEFzeW5jIiwiZ2V0SFZhbHVlIiwiaGdldGFsbEFzeW5jIiwiZGVsVmFsdWUiLCJkZWwiLCJyZXMiXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFFQSxNQUFNQSxPQUFPLEdBQUc7QUFDZEMsTUFBSSxFQUFFQyw4Q0FBTSxDQUFDQyxLQUFQLENBQWFGLElBREw7QUFFZEcsTUFBSSxFQUFFRiw4Q0FBTSxDQUFDQyxLQUFQLENBQWFDLElBRkw7QUFHZEMsVUFBUSxFQUFFSCw4Q0FBTSxDQUFDQyxLQUFQLENBQWFFLFFBSFQ7QUFJZEMsZ0JBQWMsRUFBRSxJQUpGO0FBS2RDLGdCQUFjLEVBQUUsVUFBU1AsT0FBVCxFQUFrQjtBQUNoQyxRQUFJQSxPQUFPLENBQUNRLEtBQVIsSUFBaUJSLE9BQU8sQ0FBQ1EsS0FBUixDQUFjQyxJQUFkLEtBQXVCLGNBQTVDLEVBQTREO0FBQzFEO0FBQ0E7QUFDQSxhQUFPLElBQUlDLEtBQUosQ0FBVSxtQ0FBVixDQUFQO0FBQ0Q7O0FBQ0QsUUFBSVYsT0FBTyxDQUFDVyxnQkFBUixHQUEyQixPQUFPLEVBQVAsR0FBWSxFQUEzQyxFQUErQztBQUM3QztBQUNBO0FBQ0EsYUFBTyxJQUFJRCxLQUFKLENBQVUsc0JBQVYsQ0FBUDtBQUNEOztBQUNELFFBQUlWLE9BQU8sQ0FBQ1ksT0FBUixHQUFrQixFQUF0QixFQUEwQjtBQUN4QjtBQUNBLGFBQU9DLFNBQVA7QUFDRCxLQWQrQixDQWVoQzs7O0FBQ0EsV0FBT0MsSUFBSSxDQUFDQyxHQUFMLENBQVNmLE9BQU8sQ0FBQ1ksT0FBUixHQUFrQixHQUEzQixFQUFnQyxJQUFoQyxDQUFQO0FBQ0Q7QUF0QmEsQ0FBaEI7QUF5QkEsTUFBTUksTUFBTSxHQUFHQyw2REFBWSxDQUFDQyw0Q0FBSyxDQUFDQyxZQUFOLENBQW1CbkIsT0FBbkIsQ0FBRCxDQUEzQjtBQUVBZ0IsTUFBTSxDQUFDSSxFQUFQLENBQVUsT0FBVixFQUFvQkMsR0FBRCxJQUFTO0FBQzFCQyxTQUFPLENBQUNDLEdBQVIsQ0FBWSx3QkFBd0JGLEdBQXBDO0FBQ0QsQ0FGRDs7QUFJQSxNQUFNRyxRQUFRLEdBQUcsQ0FBQ0MsR0FBRCxFQUFNQyxLQUFOLEVBQWFDLElBQWIsS0FBc0I7QUFDckMsTUFBSSxPQUFPRCxLQUFQLEtBQWlCLFdBQWpCLElBQWdDQSxLQUFLLEtBQUssRUFBMUMsSUFBZ0RBLEtBQUssS0FBSyxJQUE5RCxFQUFvRTtBQUNsRTtBQUNEOztBQUNELE1BQUksT0FBT0EsS0FBUCxLQUFpQixRQUFyQixFQUErQjtBQUM3QjtBQUNBLFFBQUksT0FBT0MsSUFBUCxLQUFnQixXQUFwQixFQUFpQztBQUMvQlgsWUFBTSxDQUFDWSxHQUFQLENBQVdILEdBQVgsRUFBZ0JDLEtBQWhCLEVBQXVCLElBQXZCLEVBQTZCQyxJQUE3QjtBQUNELEtBRkQsTUFFTztBQUNMWCxZQUFNLENBQUNZLEdBQVAsQ0FBV0gsR0FBWCxFQUFnQkMsS0FBaEI7QUFDRDtBQUNGLEdBUEQsTUFPTyxJQUFJLE9BQU9BLEtBQVAsS0FBaUIsUUFBckIsRUFBK0I7QUFDcENHLFVBQU0sQ0FBQ0MsSUFBUCxDQUFZSixLQUFaLEVBQW1CSyxPQUFuQixDQUE0QkMsSUFBRCxJQUFVO0FBQ25DaEIsWUFBTSxDQUFDaUIsSUFBUCxDQUFZUixHQUFaLEVBQWlCTyxJQUFqQixFQUF1Qk4sS0FBSyxDQUFDTSxJQUFELENBQTVCLEVBQW9DZCw0Q0FBSyxDQUFDZ0IsS0FBMUM7QUFDRCxLQUZEO0FBR0Q7QUFDRixDQWhCRDs7QUFrQkEsTUFBTUMsUUFBUSxHQUFJVixHQUFELElBQVM7QUFDeEIsU0FBT1QsTUFBTSxDQUFDb0IsUUFBUCxDQUFnQlgsR0FBaEIsQ0FBUDtBQUNELENBRkQ7O0FBSUEsTUFBTVksU0FBUyxHQUFJWixHQUFELElBQVM7QUFDekI7QUFDQTtBQUVBO0FBQ0EsU0FBT1QsTUFBTSxDQUFDc0IsWUFBUCxDQUFvQmIsR0FBcEIsQ0FBUDtBQUNELENBTkQ7O0FBUUEsTUFBTWMsUUFBUSxHQUFJZCxHQUFELElBQVM7QUFDeEJULFFBQU0sQ0FBQ3dCLEdBQVAsQ0FBV2YsR0FBWCxFQUFnQixDQUFDSixHQUFELEVBQU1vQixHQUFOLEtBQWM7QUFDNUIsUUFBSUEsR0FBRyxLQUFLLENBQVosRUFBZTtBQUNibkIsYUFBTyxDQUFDQyxHQUFSLENBQVkscUJBQVo7QUFDRCxLQUZELE1BRU87QUFDTEQsYUFBTyxDQUFDQyxHQUFSLENBQVksNEJBQTRCRixHQUF4QztBQUNEO0FBQ0YsR0FORDtBQU9ELENBUkQiLCJmaWxlIjoiLi9zcmMvY29uZmlnL1JlZGlzQ29uZmlnLmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHJlZGlzIGZyb20gJ3JlZGlzJ1xyXG5pbXBvcnQgeyBwcm9taXNpZnlBbGwgfSBmcm9tICdibHVlYmlyZCdcclxuaW1wb3J0IGNvbmZpZyBmcm9tICcuL2luZGV4J1xyXG5cclxuY29uc3Qgb3B0aW9ucyA9IHtcclxuICBob3N0OiBjb25maWcuUkVESVMuaG9zdCxcclxuICBwb3J0OiBjb25maWcuUkVESVMucG9ydCxcclxuICBwYXNzd29yZDogY29uZmlnLlJFRElTLnBhc3N3b3JkLFxyXG4gIGRldGVjdF9idWZmZXJzOiB0cnVlLFxyXG4gIHJldHJ5X3N0cmF0ZWd5OiBmdW5jdGlvbihvcHRpb25zKSB7XHJcbiAgICBpZiAob3B0aW9ucy5lcnJvciAmJiBvcHRpb25zLmVycm9yLmNvZGUgPT09IFwiRUNPTk5SRUZVU0VEXCIpIHtcclxuICAgICAgLy8gRW5kIHJlY29ubmVjdGluZyBvbiBhIHNwZWNpZmljIGVycm9yIGFuZCBmbHVzaCBhbGwgY29tbWFuZHMgd2l0aFxyXG4gICAgICAvLyBhIGluZGl2aWR1YWwgZXJyb3JcclxuICAgICAgcmV0dXJuIG5ldyBFcnJvcihcIlRoZSBzZXJ2ZXIgcmVmdXNlZCB0aGUgY29ubmVjdGlvblwiKTtcclxuICAgIH1cclxuICAgIGlmIChvcHRpb25zLnRvdGFsX3JldHJ5X3RpbWUgPiAxMDAwICogNjAgKiA2MCkge1xyXG4gICAgICAvLyBFbmQgcmVjb25uZWN0aW5nIGFmdGVyIGEgc3BlY2lmaWMgdGltZW91dCBhbmQgZmx1c2ggYWxsIGNvbW1hbmRzXHJcbiAgICAgIC8vIHdpdGggYSBpbmRpdmlkdWFsIGVycm9yXHJcbiAgICAgIHJldHVybiBuZXcgRXJyb3IoXCJSZXRyeSB0aW1lIGV4aGF1c3RlZFwiKTtcclxuICAgIH1cclxuICAgIGlmIChvcHRpb25zLmF0dGVtcHQgPiAxMCkge1xyXG4gICAgICAvLyBFbmQgcmVjb25uZWN0aW5nIHdpdGggYnVpbHQgaW4gZXJyb3JcclxuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxuICAgIC8vIHJlY29ubmVjdCBhZnRlclxyXG4gICAgcmV0dXJuIE1hdGgubWluKG9wdGlvbnMuYXR0ZW1wdCAqIDEwMCwgMzAwMCk7XHJcbiAgfSxcclxufVxyXG5cclxuY29uc3QgY2xpZW50ID0gcHJvbWlzaWZ5QWxsKHJlZGlzLmNyZWF0ZUNsaWVudChvcHRpb25zKSlcclxuXHJcbmNsaWVudC5vbignZXJyb3InLCAoZXJyKSA9PiB7XHJcbiAgY29uc29sZS5sb2coJ1JlZGlzIENsaWVudCBFcnJvcjonICsgZXJyKVxyXG59KVxyXG5cclxuY29uc3Qgc2V0VmFsdWUgPSAoa2V5LCB2YWx1ZSwgdGltZSkgPT4ge1xyXG4gIGlmICh0eXBlb2YgdmFsdWUgPT09ICd1bmRlZmluZWQnIHx8IHZhbHVlID09PSAnJyB8fCB2YWx1ZSA9PT0gbnVsbCkge1xyXG4gICAgcmV0dXJuXHJcbiAgfVxyXG4gIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAvLyDlpoLmnpzlrZjlnKh0aW1l5bCx6K6+572u6L+H5pyf5pe26Ze0XHJcbiAgICBpZiAodHlwZW9mIHRpbWUgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgIGNsaWVudC5zZXQoa2V5LCB2YWx1ZSwgJ0VYJywgdGltZSlcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNsaWVudC5zZXQoa2V5LCB2YWx1ZSlcclxuICAgIH1cclxuICB9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcclxuICAgIE9iamVjdC5rZXlzKHZhbHVlKS5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgIGNsaWVudC5oc2V0KGtleSwgaXRlbSwgdmFsdWVbaXRlbV0sIHJlZGlzLnByaW50KVxyXG4gICAgfSlcclxuICB9XHJcbn1cclxuXHJcbmNvbnN0IGdldFZhbHVlID0gKGtleSkgPT4ge1xyXG4gIHJldHVybiBjbGllbnQuZ2V0QXN5bmMoa2V5KVxyXG59XHJcblxyXG5jb25zdCBnZXRIVmFsdWUgPSAoa2V5KSA9PiB7XHJcbiAgLy8gdjggUHJvbWlzaWZ5IG1ldGhvZCB1c2UgdXRpbCwgbXVzdCBub2RlID4gOFxyXG4gIC8vIHJldHVybiBwcm9taXNpZnkoY2xpZW50LmhnZXRhbGwpLmJpbmQoY2xpZW50KShrZXkpXHJcblxyXG4gIC8vIGJsdWViaXJkIGFzeW5jXHJcbiAgcmV0dXJuIGNsaWVudC5oZ2V0YWxsQXN5bmMoa2V5KVxyXG59XHJcblxyXG5jb25zdCBkZWxWYWx1ZSA9IChrZXkpID0+IHtcclxuICBjbGllbnQuZGVsKGtleSwgKGVyciwgcmVzKSA9PiB7XHJcbiAgICBpZiAocmVzID09PSAxKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdkZWxldGUgc3VjY2Vzc2Z1bGx5Jyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZygnZGVsZXRlIHJlZGlzIGtleSBlcnJvcjonICsgZXJyKVxyXG4gICAgfVxyXG4gIH0pXHJcbn1cclxuXHJcbmV4cG9ydCB7XHJcbiAgY2xpZW50LFxyXG4gIHNldFZhbHVlLFxyXG4gIGdldFZhbHVlLFxyXG4gIGdldEhWYWx1ZSxcclxuICBkZWxWYWx1ZVxyXG59Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/config/RedisConfig.js\n");

/***/ }),

/***/ "./src/config/index.js":
/*!*****************************!*\
  !*** ./src/config/index.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst DB_URL = 'mongodb://localhost/testdb';\nconst REDIS = {\n  host: '127.0.0.1',\n  port: 6379,\n  password: '123456'\n};\nconst JWT_SECRET = 'a&*38QthAKuiRwISGLotgq^3%^$zvA3A6Hfr8MF$jM*HY4*dWcwAW&9NGp7*b53!';\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  DB_URL,\n  REDIS,\n  JWT_SECRET\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY29uZmlnL2luZGV4LmpzP2YxMjEiXSwibmFtZXMiOlsiREJfVVJMIiwiUkVESVMiLCJob3N0IiwicG9ydCIsInBhc3N3b3JkIiwiSldUX1NFQ1JFVCJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQSxNQUFNQSxNQUFNLEdBQUcsNEJBQWY7QUFDQSxNQUFNQyxLQUFLLEdBQUc7QUFDWkMsTUFBSSxFQUFFLFdBRE07QUFFWkMsTUFBSSxFQUFFLElBRk07QUFHWkMsVUFBUSxFQUFFO0FBSEUsQ0FBZDtBQUtBLE1BQU1DLFVBQVUsR0FBRyxrRUFBbkI7QUFFZTtBQUNiTCxRQURhO0FBRWJDLE9BRmE7QUFHYkk7QUFIYSxDQUFmIiwiZmlsZSI6Ii4vc3JjL2NvbmZpZy9pbmRleC5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IERCX1VSTCA9ICdtb25nb2RiOi8vbG9jYWxob3N0L3Rlc3RkYidcclxuY29uc3QgUkVESVMgPSB7XHJcbiAgaG9zdDogJzEyNy4wLjAuMScsXHJcbiAgcG9ydDogNjM3OSxcclxuICBwYXNzd29yZDogJzEyMzQ1NidcclxufVxyXG5jb25zdCBKV1RfU0VDUkVUID0gJ2EmKjM4UXRoQUt1aVJ3SVNHTG90Z3FeMyVeJHp2QTNBNkhmcjhNRiRqTSpIWTQqZFdjd0FXJjlOR3A3KmI1MyEnXHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgREJfVVJMLFxyXG4gIFJFRElTLFxyXG4gIEpXVF9TRUNSRVRcclxufSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/config/index.js\n");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(__dirname) {/* harmony import */ var koa__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! koa */ \"koa\");\n/* harmony import */ var koa__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(koa__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var koa_jwt__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! koa-jwt */ \"koa-jwt\");\n/* harmony import */ var koa_jwt__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(koa_jwt__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var koa_helmet__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! koa-helmet */ \"koa-helmet\");\n/* harmony import */ var koa_helmet__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(koa_helmet__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var koa_static__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! koa-static */ \"koa-static\");\n/* harmony import */ var koa_static__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(koa_static__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _routes_routes__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./routes/routes */ \"./src/routes/routes.js\");\n/* harmony import */ var koa_body__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! koa-body */ \"koa-body\");\n/* harmony import */ var koa_body__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(koa_body__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var koa_json__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! koa-json */ \"koa-json\");\n/* harmony import */ var koa_json__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(koa_json__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var _koa_cors__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @koa/cors */ \"@koa/cors\");\n/* harmony import */ var _koa_cors__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_koa_cors__WEBPACK_IMPORTED_MODULE_8__);\n/* harmony import */ var koa_compose__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! koa-compose */ \"koa-compose\");\n/* harmony import */ var koa_compose__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(koa_compose__WEBPACK_IMPORTED_MODULE_9__);\n/* harmony import */ var koa_compress__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! koa-compress */ \"koa-compress\");\n/* harmony import */ var koa_compress__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(koa_compress__WEBPACK_IMPORTED_MODULE_10__);\n/* harmony import */ var _config_index__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./config/index */ \"./src/config/index.js\");\n/* harmony import */ var _common_ErrorHandle__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./common/ErrorHandle */ \"./src/common/ErrorHandle.js\");\n\n\n\n\n\n\n\n\n\n\n\n\n\nconst app = new koa__WEBPACK_IMPORTED_MODULE_0___default.a();\nconst isDevMode = 'development' === 'production'; // 定义公共路径,不需要jwt鉴权\n// 这两个路径不需要鉴权就可以访问\n\nconst jwt = koa_jwt__WEBPACK_IMPORTED_MODULE_1___default()({\n  secret: _config_index__WEBPACK_IMPORTED_MODULE_11__[\"default\"].JWT_SECRET\n}).unless({\n  path: [/^\\/public/, /^\\/auth/]\n});\n/**\r\n * 使用koa-compose 集成中间件\r\n */\n\nconst middleware = koa_compose__WEBPACK_IMPORTED_MODULE_9___default()([koa_body__WEBPACK_IMPORTED_MODULE_6___default()(), koa_static__WEBPACK_IMPORTED_MODULE_4___default()(path__WEBPACK_IMPORTED_MODULE_2___default.a.join(__dirname, '../public')), _koa_cors__WEBPACK_IMPORTED_MODULE_8___default()(), koa_json__WEBPACK_IMPORTED_MODULE_7___default()({\n  pretty: false,\n  param: 'pretty'\n}), koa_helmet__WEBPACK_IMPORTED_MODULE_3___default()(), _common_ErrorHandle__WEBPACK_IMPORTED_MODULE_12__[\"default\"], jwt]);\n\nif (!isDevMode) {\n  app.use(koa_compress__WEBPACK_IMPORTED_MODULE_10___default()());\n}\n\napp.use(middleware);\napp.use(Object(_routes_routes__WEBPACK_IMPORTED_MODULE_5__[\"default\"])());\napp.listen(3000);\n/* WEBPACK VAR INJECTION */}.call(this, \"src\"))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanM/YjYzNSJdLCJuYW1lcyI6WyJhcHAiLCJrb2EiLCJpc0Rldk1vZGUiLCJwcm9jZXNzIiwiand0IiwiSldUIiwic2VjcmV0IiwiY29uZmlnIiwiSldUX1NFQ1JFVCIsInVubGVzcyIsInBhdGgiLCJtaWRkbGV3YXJlIiwiY29tcG9zZSIsImtvYUJvZHkiLCJzdGF0aWNzIiwiam9pbiIsIl9fZGlybmFtZSIsImNvcnMiLCJqc29uVXRpbCIsInByZXR0eSIsInBhcmFtIiwiaGVsbWV0IiwiZXJyb3JIYW5kbGUiLCJ1c2UiLCJjb21wcmVzcyIsInJvdXRlciIsImxpc3RlbiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQSxNQUFNQSxHQUFHLEdBQUcsSUFBSUMsMENBQUosRUFBWjtBQUVBLE1BQU1DLFNBQVMsR0FBR0MsYUFBQSxLQUF5QixZQUEzQyxDLENBRUE7QUFDQTs7QUFDQSxNQUFNQyxHQUFHLEdBQUdDLDhDQUFHLENBQUM7QUFBQ0MsUUFBTSxFQUFFQyxzREFBTSxDQUFDQztBQUFoQixDQUFELENBQUgsQ0FDUEMsTUFETyxDQUNBO0FBQUVDLE1BQUksRUFBRSxDQUFDLFdBQUQsRUFBYyxTQUFkO0FBQVIsQ0FEQSxDQUFaO0FBRUE7Ozs7QUFHQSxNQUFNQyxVQUFVLEdBQUdDLGtEQUFPLENBQUMsQ0FDekJDLCtDQUFPLEVBRGtCLEVBRXpCQyxpREFBTyxDQUFDSiwyQ0FBSSxDQUFDSyxJQUFMLENBQVVDLFNBQVYsRUFBcUIsV0FBckIsQ0FBRCxDQUZrQixFQUd6QkMsZ0RBQUksRUFIcUIsRUFJekJDLCtDQUFRLENBQUM7QUFBRUMsUUFBTSxFQUFFLEtBQVY7QUFBaUJDLE9BQUssRUFBRTtBQUF4QixDQUFELENBSmlCLEVBS3pCQyxpREFBTSxFQUxtQixFQU16QkMsNERBTnlCLEVBT3pCbEIsR0FQeUIsQ0FBRCxDQUExQjs7QUFVQSxJQUFJLENBQUNGLFNBQUwsRUFBZ0I7QUFDZEYsS0FBRyxDQUFDdUIsR0FBSixDQUFRQyxvREFBUSxFQUFoQjtBQUNEOztBQUVEeEIsR0FBRyxDQUFDdUIsR0FBSixDQUFRWixVQUFSO0FBQ0FYLEdBQUcsQ0FBQ3VCLEdBQUosQ0FBUUUsOERBQU0sRUFBZDtBQUVBekIsR0FBRyxDQUFDMEIsTUFBSixDQUFXLElBQVgsRSIsImZpbGUiOiIuL3NyYy9pbmRleC5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBrb2EgZnJvbSAna29hJ1xyXG5pbXBvcnQgSldUIGZyb20gJ2tvYS1qd3QnXHJcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXHJcbmltcG9ydCBoZWxtZXQgZnJvbSAna29hLWhlbG1ldCdcclxuaW1wb3J0IHN0YXRpY3MgZnJvbSAna29hLXN0YXRpYydcclxuaW1wb3J0IHJvdXRlciBmcm9tICcuL3JvdXRlcy9yb3V0ZXMnXHJcbmltcG9ydCBrb2FCb2R5IGZyb20gJ2tvYS1ib2R5J1xyXG5pbXBvcnQganNvblV0aWwgZnJvbSAna29hLWpzb24nXHJcbmltcG9ydCBjb3JzIGZyb20gJ0Brb2EvY29ycydcclxuaW1wb3J0IGNvbXBvc2UgZnJvbSAna29hLWNvbXBvc2UnXHJcbmltcG9ydCBjb21wcmVzcyBmcm9tICdrb2EtY29tcHJlc3MnXHJcbmltcG9ydCBjb25maWcgZnJvbSAnLi9jb25maWcvaW5kZXgnXHJcbmltcG9ydCBlcnJvckhhbmRsZSBmcm9tICcuL2NvbW1vbi9FcnJvckhhbmRsZSdcclxuXHJcbmNvbnN0IGFwcCA9IG5ldyBrb2EoKVxyXG5cclxuY29uc3QgaXNEZXZNb2RlID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdwcm9kdWN0aW9uJ1xyXG5cclxuLy8g5a6a5LmJ5YWs5YWx6Lev5b6ELOS4jemcgOimgWp3dOmJtOadg1xyXG4vLyDov5nkuKTkuKrot6/lvoTkuI3pnIDopoHpibTmnYPlsLHlj6/ku6Xorr/pl65cclxuY29uc3Qgand0ID0gSldUKHtzZWNyZXQ6IGNvbmZpZy5KV1RfU0VDUkVUfSlcclxuICAgIC51bmxlc3MoeyBwYXRoOiBbL15cXC9wdWJsaWMvLCAvXlxcL2F1dGgvXX0pXHJcbi8qKlxyXG4gKiDkvb/nlKhrb2EtY29tcG9zZSDpm4bmiJDkuK3pl7Tku7ZcclxuICovXHJcbmNvbnN0IG1pZGRsZXdhcmUgPSBjb21wb3NlKFtcclxuICBrb2FCb2R5KCksXHJcbiAgc3RhdGljcyhwYXRoLmpvaW4oX19kaXJuYW1lLCAnLi4vcHVibGljJykpLFxyXG4gIGNvcnMoKSxcclxuICBqc29uVXRpbCh7IHByZXR0eTogZmFsc2UsIHBhcmFtOiAncHJldHR5JyB9KSxcclxuICBoZWxtZXQoKSxcclxuICBlcnJvckhhbmRsZSxcclxuICBqd3RcclxuXSlcclxuXHJcbmlmICghaXNEZXZNb2RlKSB7XHJcbiAgYXBwLnVzZShjb21wcmVzcygpKVxyXG59XHJcblxyXG5hcHAudXNlKG1pZGRsZXdhcmUpXHJcbmFwcC51c2Uocm91dGVyKCkpXHJcblxyXG5hcHAubGlzdGVuKDMwMDApXHJcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/index.js\n");

/***/ }),

/***/ "./src/model/User.js":
/*!***************************!*\
  !*** ./src/model/User.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _config_DBhelper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/config/DBhelper */ \"./src/config/DBhelper.js\");\n\nconst Schema = _config_DBhelper__WEBPACK_IMPORTED_MODULE_0__[\"default\"].Schema;\nconst UserSchema = new Schema({\n  'username': {\n    type: String\n  },\n  'nickname': {\n    type: String\n  },\n  'password': {\n    type: String\n  }\n});\nconst UserModel = _config_DBhelper__WEBPACK_IMPORTED_MODULE_0__[\"default\"].model('users', UserSchema);\n/* harmony default export */ __webpack_exports__[\"default\"] = (UserModel);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvbW9kZWwvVXNlci5qcz83NmZlIl0sIm5hbWVzIjpbIlNjaGVtYSIsIm1vbmdvb3NlIiwiVXNlclNjaGVtYSIsInR5cGUiLCJTdHJpbmciLCJVc2VyTW9kZWwiLCJtb2RlbCJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBRUEsTUFBTUEsTUFBTSxHQUFHQyx3REFBUSxDQUFDRCxNQUF4QjtBQUVBLE1BQU1FLFVBQVUsR0FBRyxJQUFJRixNQUFKLENBQVc7QUFDNUIsY0FBWTtBQUFFRyxRQUFJLEVBQUVDO0FBQVIsR0FEZ0I7QUFFNUIsY0FBWTtBQUFFRCxRQUFJLEVBQUVDO0FBQVIsR0FGZ0I7QUFHNUIsY0FBWTtBQUFFRCxRQUFJLEVBQUVDO0FBQVI7QUFIZ0IsQ0FBWCxDQUFuQjtBQU1BLE1BQU1DLFNBQVMsR0FBR0osd0RBQVEsQ0FBQ0ssS0FBVCxDQUFlLE9BQWYsRUFBd0JKLFVBQXhCLENBQWxCO0FBRWVHLHdFQUFmIiwiZmlsZSI6Ii4vc3JjL21vZGVsL1VzZXIuanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbW9uZ29vc2UgZnJvbSAnQC9jb25maWcvREJoZWxwZXInXHJcblxyXG5jb25zdCBTY2hlbWEgPSBtb25nb29zZS5TY2hlbWE7XHJcblxyXG5jb25zdCBVc2VyU2NoZW1hID0gbmV3IFNjaGVtYSh7XHJcbiAgJ3VzZXJuYW1lJzogeyB0eXBlOiBTdHJpbmcgfSxcclxuICAnbmlja25hbWUnOiB7IHR5cGU6IFN0cmluZyB9LFxyXG4gICdwYXNzd29yZCc6IHsgdHlwZTogU3RyaW5nIH0sXHJcbn0pO1xyXG5cclxuY29uc3QgVXNlck1vZGVsID0gbW9uZ29vc2UubW9kZWwoJ3VzZXJzJywgVXNlclNjaGVtYSlcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFVzZXJNb2RlbCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/model/User.js\n");

/***/ }),

/***/ "./src/routes/LoginRouter.js":
/*!***********************************!*\
  !*** ./src/routes/LoginRouter.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var koa_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! koa-router */ \"koa-router\");\n/* harmony import */ var koa_router__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(koa_router__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _api_LoginController__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../api/LoginController */ \"./src/api/LoginController.js\");\n\n\nconst router = new koa_router__WEBPACK_IMPORTED_MODULE_0___default.a();\nrouter.prefix('/auth');\nrouter.post('/forget', _api_LoginController__WEBPACK_IMPORTED_MODULE_1__[\"default\"].forget);\nrouter.post('/login', _api_LoginController__WEBPACK_IMPORTED_MODULE_1__[\"default\"].login);\nrouter.post('/reg', _api_LoginController__WEBPACK_IMPORTED_MODULE_1__[\"default\"].reg);\n/* harmony default export */ __webpack_exports__[\"default\"] = (router);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvcm91dGVzL0xvZ2luUm91dGVyLmpzP2Y0YjkiXSwibmFtZXMiOlsicm91dGVyIiwiUm91dGVyIiwicHJlZml4IiwicG9zdCIsImxvZ2luQ29udHJvbGxlciIsImZvcmdldCIsImxvZ2luIiwicmVnIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFFQSxNQUFNQSxNQUFNLEdBQUcsSUFBSUMsaURBQUosRUFBZjtBQUVBRCxNQUFNLENBQUNFLE1BQVAsQ0FBYyxPQUFkO0FBQ0FGLE1BQU0sQ0FBQ0csSUFBUCxDQUFZLFNBQVosRUFBdUJDLDREQUFlLENBQUNDLE1BQXZDO0FBQ0FMLE1BQU0sQ0FBQ0csSUFBUCxDQUFZLFFBQVosRUFBc0JDLDREQUFlLENBQUNFLEtBQXRDO0FBQ0FOLE1BQU0sQ0FBQ0csSUFBUCxDQUFZLE1BQVosRUFBb0JDLDREQUFlLENBQUNHLEdBQXBDO0FBRWVQLHFFQUFmIiwiZmlsZSI6Ii4vc3JjL3JvdXRlcy9Mb2dpblJvdXRlci5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSb3V0ZXIgZnJvbSAna29hLXJvdXRlcidcclxuaW1wb3J0IGxvZ2luQ29udHJvbGxlciBmcm9tICcuLi9hcGkvTG9naW5Db250cm9sbGVyJ1xyXG5cclxuY29uc3Qgcm91dGVyID0gbmV3IFJvdXRlcigpXHJcblxyXG5yb3V0ZXIucHJlZml4KCcvYXV0aCcpXHJcbnJvdXRlci5wb3N0KCcvZm9yZ2V0JywgbG9naW5Db250cm9sbGVyLmZvcmdldClcclxucm91dGVyLnBvc3QoJy9sb2dpbicsIGxvZ2luQ29udHJvbGxlci5sb2dpbilcclxucm91dGVyLnBvc3QoJy9yZWcnLCBsb2dpbkNvbnRyb2xsZXIucmVnKVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgcm91dGVyIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/routes/LoginRouter.js\n");

/***/ }),

/***/ "./src/routes/PublicRouter.js":
/*!************************************!*\
  !*** ./src/routes/PublicRouter.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var koa_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! koa-router */ \"koa-router\");\n/* harmony import */ var koa_router__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(koa_router__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _api_PublicController__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../api/PublicController */ \"./src/api/PublicController.js\");\n\n\nconst router = new koa_router__WEBPACK_IMPORTED_MODULE_0___default.a();\nrouter.prefix('/public');\nrouter.get('/getCaptcha', _api_PublicController__WEBPACK_IMPORTED_MODULE_1__[\"default\"].getCaptcha);\n/* harmony default export */ __webpack_exports__[\"default\"] = (router);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvcm91dGVzL1B1YmxpY1JvdXRlci5qcz83YTQ1Il0sIm5hbWVzIjpbInJvdXRlciIsIlJvdXRlciIsInByZWZpeCIsImdldCIsInB1YmxpY0NvbnRyb2xsZXIiLCJnZXRDYXB0Y2hhIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFFQSxNQUFNQSxNQUFNLEdBQUcsSUFBSUMsaURBQUosRUFBZjtBQUVBRCxNQUFNLENBQUNFLE1BQVAsQ0FBYyxTQUFkO0FBQ0FGLE1BQU0sQ0FBQ0csR0FBUCxDQUFXLGFBQVgsRUFBMEJDLDZEQUFnQixDQUFDQyxVQUEzQztBQUVlTCxxRUFBZiIsImZpbGUiOiIuL3NyYy9yb3V0ZXMvUHVibGljUm91dGVyLmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJvdXRlciBmcm9tICdrb2Etcm91dGVyJ1xyXG5pbXBvcnQgcHVibGljQ29udHJvbGxlciBmcm9tICcuLi9hcGkvUHVibGljQ29udHJvbGxlcidcclxuXHJcbmNvbnN0IHJvdXRlciA9IG5ldyBSb3V0ZXIoKVxyXG5cclxucm91dGVyLnByZWZpeCgnL3B1YmxpYycpXHJcbnJvdXRlci5nZXQoJy9nZXRDYXB0Y2hhJywgcHVibGljQ29udHJvbGxlci5nZXRDYXB0Y2hhKVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgcm91dGVyXHJcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/routes/PublicRouter.js\n");

/***/ }),

/***/ "./src/routes/routes.js":
/*!******************************!*\
  !*** ./src/routes/routes.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var koa_combine_routers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! koa-combine-routers */ \"koa-combine-routers\");\n/* harmony import */ var koa_combine_routers__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(koa_combine_routers__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _PublicRouter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PublicRouter */ \"./src/routes/PublicRouter.js\");\n/* harmony import */ var _LoginRouter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./LoginRouter */ \"./src/routes/LoginRouter.js\");\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (koa_combine_routers__WEBPACK_IMPORTED_MODULE_0___default()(_PublicRouter__WEBPACK_IMPORTED_MODULE_1__[\"default\"], _LoginRouter__WEBPACK_IMPORTED_MODULE_2__[\"default\"]));//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvcm91dGVzL3JvdXRlcy5qcz82NDFiIl0sIm5hbWVzIjpbImNvbWJpbmVSb3V0ZXMiLCJQdWJsaWNSb3V0ZXIiLCJMb2dpblJvdXRlciJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRUE7QUFDQTtBQUdlQSx5SEFBYSxDQUFDQyxxREFBRCxFQUFlQyxvREFBZixDQUE1QiIsImZpbGUiOiIuL3NyYy9yb3V0ZXMvcm91dGVzLmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNvbWJpbmVSb3V0ZXMgZnJvbSAna29hLWNvbWJpbmUtcm91dGVycydcclxuXHJcbmltcG9ydCBQdWJsaWNSb3V0ZXIgZnJvbSAnLi9QdWJsaWNSb3V0ZXInXHJcbmltcG9ydCBMb2dpblJvdXRlciBmcm9tICcuL0xvZ2luUm91dGVyJ1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNvbWJpbmVSb3V0ZXMoUHVibGljUm91dGVyLCBMb2dpblJvdXRlcilcclxuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/routes/routes.js\n");

/***/ }),

/***/ "@koa/cors":
/*!****************************!*\
  !*** external "@koa/cors" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"@koa/cors\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJAa29hL2NvcnNcIj9hNjk1Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBIiwiZmlsZSI6IkBrb2EvY29ycy5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIkBrb2EvY29yc1wiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///@koa/cors\n");

/***/ }),

/***/ "bcrypt":
/*!*************************!*\
  !*** external "bcrypt" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"bcrypt\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJiY3J5cHRcIj9jZjljIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBIiwiZmlsZSI6ImJjcnlwdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJjcnlwdFwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///bcrypt\n");

/***/ }),

/***/ "bluebird":
/*!***************************!*\
  !*** external "bluebird" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"bluebird\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJibHVlYmlyZFwiPzJjNmIiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEiLCJmaWxlIjoiYmx1ZWJpcmQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJibHVlYmlyZFwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///bluebird\n");

/***/ }),

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"jsonwebtoken\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJqc29ud2VidG9rZW5cIj82NDkwIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBIiwiZmlsZSI6Impzb253ZWJ0b2tlbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImpzb253ZWJ0b2tlblwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///jsonwebtoken\n");

/***/ }),

/***/ "koa":
/*!**********************!*\
  !*** external "koa" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"koa\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJrb2FcIj9lZWI5Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBIiwiZmlsZSI6ImtvYS5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImtvYVwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///koa\n");

/***/ }),

/***/ "koa-body":
/*!***************************!*\
  !*** external "koa-body" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"koa-body\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJrb2EtYm9keVwiPzNmNjUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEiLCJmaWxlIjoia29hLWJvZHkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJrb2EtYm9keVwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///koa-body\n");

/***/ }),

/***/ "koa-combine-routers":
/*!**************************************!*\
  !*** external "koa-combine-routers" ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"koa-combine-routers\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJrb2EtY29tYmluZS1yb3V0ZXJzXCI/MmM3NSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSIsImZpbGUiOiJrb2EtY29tYmluZS1yb3V0ZXJzLmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwia29hLWNvbWJpbmUtcm91dGVyc1wiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///koa-combine-routers\n");

/***/ }),

/***/ "koa-compose":
/*!******************************!*\
  !*** external "koa-compose" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"koa-compose\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJrb2EtY29tcG9zZVwiPzczMTciXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEiLCJmaWxlIjoia29hLWNvbXBvc2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJrb2EtY29tcG9zZVwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///koa-compose\n");

/***/ }),

/***/ "koa-compress":
/*!*******************************!*\
  !*** external "koa-compress" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"koa-compress\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJrb2EtY29tcHJlc3NcIj9hNmY2Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBIiwiZmlsZSI6ImtvYS1jb21wcmVzcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImtvYS1jb21wcmVzc1wiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///koa-compress\n");

/***/ }),

/***/ "koa-helmet":
/*!*****************************!*\
  !*** external "koa-helmet" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"koa-helmet\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJrb2EtaGVsbWV0XCI/NDJkMSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSIsImZpbGUiOiJrb2EtaGVsbWV0LmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwia29hLWhlbG1ldFwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///koa-helmet\n");

/***/ }),

/***/ "koa-json":
/*!***************************!*\
  !*** external "koa-json" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"koa-json\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJrb2EtanNvblwiPzY1MjgiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEiLCJmaWxlIjoia29hLWpzb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJrb2EtanNvblwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///koa-json\n");

/***/ }),

/***/ "koa-jwt":
/*!**************************!*\
  !*** external "koa-jwt" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"koa-jwt\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJrb2Etand0XCI/ZWIwZiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSIsImZpbGUiOiJrb2Etand0LmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwia29hLWp3dFwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///koa-jwt\n");

/***/ }),

/***/ "koa-router":
/*!*****************************!*\
  !*** external "koa-router" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"koa-router\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJrb2Etcm91dGVyXCI/MDM1ZCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSIsImZpbGUiOiJrb2Etcm91dGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwia29hLXJvdXRlclwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///koa-router\n");

/***/ }),

/***/ "koa-static":
/*!*****************************!*\
  !*** external "koa-static" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"koa-static\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJrb2Etc3RhdGljXCI/OWE0YyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSIsImZpbGUiOiJrb2Etc3RhdGljLmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwia29hLXN0YXRpY1wiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///koa-static\n");

/***/ }),

/***/ "moment":
/*!*************************!*\
  !*** external "moment" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"moment\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtb21lbnRcIj9iZDc2Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBIiwiZmlsZSI6Im1vbWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm1vbWVudFwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///moment\n");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"mongoose\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtb25nb29zZVwiP2ZmZDciXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEiLCJmaWxlIjoibW9uZ29vc2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtb25nb29zZVwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///mongoose\n");

/***/ }),

/***/ "nodemailer":
/*!*****************************!*\
  !*** external "nodemailer" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"nodemailer\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJub2RlbWFpbGVyXCI/M2Q1NSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSIsImZpbGUiOiJub2RlbWFpbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibm9kZW1haWxlclwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///nodemailer\n");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJwYXRoXCI/NzRiYiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSIsImZpbGUiOiJwYXRoLmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicGF0aFwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///path\n");

/***/ }),

/***/ "redis":
/*!************************!*\
  !*** external "redis" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"redis\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWRpc1wiPzcwNmMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEiLCJmaWxlIjoicmVkaXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWRpc1wiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///redis\n");

/***/ }),

/***/ "svg-captcha":
/*!******************************!*\
  !*** external "svg-captcha" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"svg-captcha\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJzdmctY2FwdGNoYVwiP2NjNjAiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEiLCJmaWxlIjoic3ZnLWNhcHRjaGEuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJzdmctY2FwdGNoYVwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///svg-captcha\n");

/***/ })

/******/ });