module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/assets/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!***************************!*\
  !*** ./server/server.jsx ***!
  \***************************/
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname) {"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports.default = function (parameters) {
	  var app = (0, _express2.default)(),
	      MySQLStore = (0, _expressMysqlSession2.default)(_expressSession2.default),
	      sessionStore = new MySQLStore({
	    host: process.env.DB_HOST,
	    port: process.env.DB_PORT,
	    user: process.env.DB_USER,
	    password: process.env.DB_PASSWORD,
	    database: process.env.DB_NAME
	  });
	
	  _db.database.connect().then(function (db) {
	    // Add the http logging middleware
	    app.use((0, _morgan2.default)('combined'));
	
	    // Useful middleware
	    app.use(_bodyParser2.default.json());
	    app.use(_bodyParser2.default.urlencoded({ extended: true }));
	    app.disable('x-powered-by');
	
	    // Session middleware
	    app.use((0, _expressSession2.default)({
	      maxAge: 31540000000,
	      secret: process.env.SESSION_SECRET,
	      resave: false,
	      saveUninitialized: true,
	      store: sessionStore
	    }));
	
	    // Passport/auth middleware
	    app.use(_passport2.default.initialize());
	    app.use(_passport2.default.session());
	
	    // if we are in development mode then prox the asset requests to the webpack dev server
	    if (process.env.NODE_ENV === "development") {
	      app.use("/assets", (0, _expressHttpProxy2.default)('http://localhost:' + process.env.WEBPACK_PORT, {
	        forwardPath: function forwardPath(req, res) {
	          var path = '/assets' + __webpack_require__(/*! url */ 46).parse(req.url).path;
	          return path;
	        }
	      }));
	    } else {
	      // hosting static assests
	      app.use('/assets', _express2.default.static(__dirname + '/assets'));
	    }
	
	    // Pass off handling of all other routes to React Router
	    app.get('*', function (req, res) {
	      var store = (0, _store.configureStore)(),
	          routes = (0, _routes.getRoutes)(store);
	
	      // Note that req.url here should be the full URL path from
	      // the original request, including the query string.
	      (0, _reactRouter.match)({ routes: routes, location: req.url }, function (error, redirectLocation, renderProps) {
	        if (error) {
	          res.status(500).send(error.message);
	        } else if (redirectLocation) {
	          res.redirect(302, redirectLocation.pathname + redirectLocation.search);
	        } else if (renderProps) {
	          // use load on server to wait for async data
	          (0, _reduxConnect.loadOnServer)(_extends({}, renderProps, { store: store })).then(function () {
	            // You can also check renderProps.components or renderProps.routes for
	            // your "not found" component or route respectively, and send a 404 as
	            // below, if you're using a catch-all route.
	            var appHTML = (0, _server.renderToString)(_react2.default.createElement(
	              _reactRedux.Provider,
	              { store: store, key: 'provider' },
	              _react2.default.createElement(_reduxConnect.ReduxAsyncConnect, renderProps)
	            ));
	
	            var html = createPage(appHTML, store);
	            res.status(200).send(html).end();
	          });
	        } else {
	          res.status(404).send('Not found');
	        }
	      });
	    });
	
	    function createPage(html, store) {
	      return '\n        <!doctype html>\n        <html>\n          <body>\n            <div id="app"><div>' + html + '</div></div>\n\n            <script>window.__data=' + JSON.stringify(store.getState()) + ';</script>\n            <script type="text/javascript" src="/assets/bundle.js" charset="utf-8"></script>\n          </body>\n        </html>\n      ';
	    }
	
	    console.log('Web App started and listen at ' + process.env.HOST + ':' + process.env.PORT);
	    app.listen(process.env.PORT, process.env.HOST);
	  });
	};
	
	var _express = __webpack_require__(/*! express */ 28);
	
	var _express2 = _interopRequireDefault(_express);
	
	var _expressSession = __webpack_require__(/*! express-session */ 31);
	
	var _expressSession2 = _interopRequireDefault(_expressSession);
	
	var _bodyParser = __webpack_require__(/*! body-parser */ 27);
	
	var _bodyParser2 = _interopRequireDefault(_bodyParser);
	
	var _morgan = __webpack_require__(/*! morgan */ 38);
	
	var _morgan2 = _interopRequireDefault(_morgan);
	
	var _passport = __webpack_require__(/*! passport */ 12);
	
	var _passport2 = _interopRequireDefault(_passport);
	
	var _expressMysqlSession = __webpack_require__(/*! express-mysql-session */ 30);
	
	var _expressMysqlSession2 = _interopRequireDefault(_expressMysqlSession);
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _server = __webpack_require__(/*! react-dom/server */ 40);
	
	var _reactRouter = __webpack_require__(/*! react-router */ 6);
	
	var _reduxConnect = __webpack_require__(/*! redux-connect */ 2);
	
	var _createMemoryHistory = __webpack_require__(/*! history/lib/createMemoryHistory */ 33);
	
	var _createMemoryHistory2 = _interopRequireDefault(_createMemoryHistory);
	
	var _reactRedux = __webpack_require__(/*! react-redux */ 13);
	
	var _redux = __webpack_require__(/*! redux */ 14);
	
	var _store = __webpack_require__(/*! ../app/store */ 24);
	
	var _routes = __webpack_require__(/*! ../app/routes */ 10);
	
	var _db = __webpack_require__(/*! ../common/db */ 11);
	
	__webpack_require__(/*! ../common/auth */ 25);
	
	var _expressHttpProxy = __webpack_require__(/*! express-http-proxy */ 29);
	
	var _expressHttpProxy2 = _interopRequireDefault(_expressHttpProxy);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	/* WEBPACK VAR INJECTION */}.call(exports, "/"))

/***/ },
/* 1 */
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ function(module, exports) {

	module.exports = require("react");

/***/ },
/* 2 */
/*!********************************!*\
  !*** external "redux-connect" ***!
  \********************************/
/***/ function(module, exports) {

	module.exports = require("redux-connect");

/***/ },
/* 3 */
/*!*****************************!*\
  !*** ./app/actions/auth.js ***!
  \*****************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.authenticated = exports.AUTHENTICATED = exports.login = exports.LOGIN = undefined;
	
	var _reduxActions = __webpack_require__(/*! redux-actions */ 5);
	
	var _fetch = __webpack_require__(/*! ../fetch */ 9);
	
	var LOGIN = exports.LOGIN = 'LOGIN';
	var login = exports.login = (0, _reduxActions.createAction)(LOGIN, function (email, password) {
	  return (0, _fetch.Fetch)(_fetch.APIURL + '/login', {
	    method: 'POST',
	    body: {
	      email: email,
	      password: password
	    }
	  }).then(function (res) {
	    if (res.status !== 200) {
	      throw new Error("Not authenticated.");
	    }
	    return res.body;
	  });
	});
	
	var AUTHENTICATED = exports.AUTHENTICATED = 'AUTHENTICATED';
	var authenticated = exports.authenticated = (0, _reduxActions.createAction)(AUTHENTICATED, function () {
	  return (0, _fetch.Fetch)(_fetch.APIURL + '/authenticated').then(function (res) {
	    if (res.status !== 200) {
	      throw new Error("Not authenticated.");
	    }
	    return res.json().body;
	  });
	});

/***/ },
/* 4 */
/*!****************************!*\
  !*** external "immutable" ***!
  \****************************/
/***/ function(module, exports) {

	module.exports = require("immutable");

/***/ },
/* 5 */
/*!********************************!*\
  !*** external "redux-actions" ***!
  \********************************/
/***/ function(module, exports) {

	module.exports = require("redux-actions");

/***/ },
/* 6 */
/*!*******************************!*\
  !*** external "react-router" ***!
  \*******************************/
/***/ function(module, exports) {

	module.exports = require("react-router");

/***/ },
/* 7 */
/*!*************************************!*\
  !*** external "react-router-redux" ***!
  \*************************************/
/***/ function(module, exports) {

	module.exports = require("react-router-redux");

/***/ },
/* 8 */
/*!*****************************!*\
  !*** ./app/actions/test.js ***!
  \*****************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.changeHomeText = exports.CHANGEHOMETEXT = undefined;
	
	var _reduxActions = __webpack_require__(/*! redux-actions */ 5);
	
	var CHANGEHOMETEXT = exports.CHANGEHOMETEXT = 'CHANGE_HOME_TEXT';
	var changeHomeText = exports.changeHomeText = (0, _reduxActions.createAction)(CHANGEHOMETEXT);

/***/ },
/* 9 */
/*!**********************!*\
  !*** ./app/fetch.js ***!
  \**********************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.APIURL = exports.Fetch = undefined;
	
	var _fetchPonyfill = __webpack_require__(/*! fetch-ponyfill */ 32);
	
	var _fetchPonyfill2 = _interopRequireDefault(_fetchPonyfill);
	
	var _bluebird = __webpack_require__(/*! bluebird */ 26);
	
	var _bluebird2 = _interopRequireDefault(_bluebird);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var fetch = (0, _fetchPonyfill2.default)({
	  Promise: _bluebird2.default
	});
	
	exports.Fetch = fetch;
	var APIURL = exports.APIURL = '' + process.env.API_URL;

/***/ },
/* 10 */
/*!************************!*\
  !*** ./app/routes.jsx ***!
  \************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getRoutes = getRoutes;
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRouter = __webpack_require__(/*! react-router */ 6);
	
	var _app = __webpack_require__(/*! ./containers/app */ 17);
	
	var _home = __webpack_require__(/*! ./containers/home */ 18);
	
	var _login = __webpack_require__(/*! ./containers/login */ 19);
	
	var _admin = __webpack_require__(/*! ./containers/admin */ 16);
	
	var _auth = __webpack_require__(/*! ./actions/auth */ 3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/*
	 * @param {Redux Store}
	 * We require store as an argument here because we wish to get
	 * state from the store after it has been authenticated.
	 */
	function getRoutes(store) {
	  var _this = this;
	
	  var requireAuth = function requireAuth(nextState, replace, callback) {
	    var _store$getState$getIn = store.getState().getIn(['auth']).toJS();
	
	    var authenticated = _store$getState$getIn.authenticated;
	    var loaded = _store$getState$getIn.loaded;
	
	    if (!loaded) {
	      return store.dispatch((0, _auth.authenticated)()).then(requireAuth.bind(_this, nextState, replace, callback));
	    }
	
	    if (!authenticated) {
	      replace({
	        pathname: '/login',
	        state: { nextPathname: nextState.location.pathname }
	      });
	    }
	    callback();
	  };
	
	  var redirectAuth = function redirectAuth(nextState, replace, callback) {
	    var authenticated = store.getState().getIn(['auth', 'authenticated']);
	    if (authenticated) {
	      replace({
	        pathname: '/'
	      });
	    }
	    callback();
	  };
	
	  return _react2.default.createElement(
	    _reactRouter.Route,
	    { path: '/', component: _app.App },
	    _react2.default.createElement(_reactRouter.IndexRoute, { component: _home.Home }),
	    _react2.default.createElement(_reactRouter.Route, { path: 'admin', component: _admin.Admin, onEnter: requireAuth }),
	    _react2.default.createElement(_reactRouter.Route, { path: 'login', component: _login.Login })
	  );
	};

/***/ },
/* 11 */
/*!**********************!*\
  !*** ./common/db.js ***!
  \**********************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Sequelize = __webpack_require__(/*! sequelize */ 45),
	    sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
	  host: process.env.DB_HOST,
	  port: process.env.DB_PORT,
	  dialect: 'mysql'
	}),
	    scrypt = __webpack_require__(/*! scrypt */ 44);
	
	// Models
	var Question = sequelize.define('question', {
	  id: {
	    type: Sequelize.BIGINT,
	    primaryKey: true,
	    autoIncrement: true
	  },
	  text: Sequelize.TEXT
	});
	
	var Answer = sequelize.define('answer', {
	  id: {
	    type: Sequelize.BIGINT,
	    primaryKey: true,
	    autoIncrement: true
	  },
	  text: Sequelize.TEXT,
	  result: Sequelize.BIGINT
	});
	
	var User = sequelize.define('user', {
	  email: {
	    type: Sequelize.TEXT,
	    validate: {
	      isEmail: true
	    }
	  },
	  password_hash: Sequelize.STRING(128)
	});
	
	User.prototype.setPassword = function (password) {
	  var _this = this;
	
	  return scrypt.kdf(password, {
	    N: 14,
	    r: 8,
	    p: 1
	  }).then(function (res) {
	    _this.password_hash = res.toString("base64");
	    return;
	  });
	};
	
	User.prototype.verifyPassword = function (password) {
	  return scrypt.verifyKdf(new Buffer(this.password_hash, "base64"), new Buffer(password));
	};
	
	User.prototype.toJSON = function () {
	  var values = this.get();
	  delete values.password_hash;
	  return values;
	};
	
	// Relationships
	Question.hasMany(Answer, {
	  onDelete: 'CASCADE'
	});
	User.hasMany(Question, {
	  onDelete: 'CASCADE'
	});
	
	// DB Manager Class
	
	var DB = function () {
	  _createClass(DB, [{
	    key: 'User',
	    get: function get() {
	      return User;
	    }
	  }, {
	    key: 'Question',
	    get: function get() {
	      return Question;
	    }
	  }, {
	    key: 'Answer',
	    get: function get() {
	      return Answer;
	    }
	  }]);
	
	  function DB() {
	    _classCallCheck(this, DB);
	
	    this.isConnected = false;
	  }
	
	  _createClass(DB, [{
	    key: 'connect',
	    value: function connect() {
	      var _this2 = this;
	
	      return sequelize.sync().then(function () {
	        _this2.isConnected = true;
	        return _this2;
	      });
	    }
	  }, {
	    key: 'close',
	    value: function close() {
	      return sequelize.close();
	    }
	  }]);
	
	  return DB;
	}();
	
	module.exports.database = new DB();

/***/ },
/* 12 */
/*!***************************!*\
  !*** external "passport" ***!
  \***************************/
/***/ function(module, exports) {

	module.exports = require("passport");

/***/ },
/* 13 */
/*!******************************!*\
  !*** external "react-redux" ***!
  \******************************/
/***/ function(module, exports) {

	module.exports = require("react-redux");

/***/ },
/* 14 */
/*!************************!*\
  !*** external "redux" ***!
  \************************/
/***/ function(module, exports) {

	module.exports = require("redux");

/***/ },
/* 15 */
/*!*********************************!*\
  !*** ./app/components/menu.jsx ***!
  \*********************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Menu = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Toolbar = __webpack_require__(/*! material-ui/Toolbar */ 35);
	
	var _RaisedButton = __webpack_require__(/*! material-ui/RaisedButton */ 34);
	
	var _RaisedButton2 = _interopRequireDefault(_RaisedButton);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Menu = exports.Menu = function (_Component) {
	  _inherits(Menu, _Component);
	
	  function Menu() {
	    _classCallCheck(this, Menu);
	
	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Menu).apply(this, arguments));
	  }
	
	  _createClass(Menu, [{
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        _Toolbar.Toolbar,
	        null,
	        _react2.default.createElement(
	          _Toolbar.ToolbarGroup,
	          null,
	          _react2.default.createElement(_Toolbar.ToolbarTitle, { text: 'Sumo Surveys' })
	        ),
	        _react2.default.createElement(
	          _Toolbar.ToolbarGroup,
	          { lastChild: true },
	          _react2.default.createElement(_RaisedButton2.default, { label: 'Sign Up', primary: true })
	        )
	      );
	    }
	  }]);

	  return Menu;
	}(_react.Component);

/***/ },
/* 16 */
/*!**********************************!*\
  !*** ./app/containers/admin.jsx ***!
  \**********************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Admin = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reduxConnect = __webpack_require__(/*! redux-connect */ 2);
	
	var _fetch = __webpack_require__(/*! ../fetch */ 9);
	
	var _auth = __webpack_require__(/*! ../actions/auth */ 3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Admin = exports.Admin = function (_Component) {
	  _inherits(Admin, _Component);
	
	  function Admin() {
	    _classCallCheck(this, Admin);
	
	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Admin).apply(this, arguments));
	  }
	
	  _createClass(Admin, [{
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        null,
	        ' Admin Area '
	      );
	    }
	  }]);

	  return Admin;
	}(_react.Component);

/***/ },
/* 17 */
/*!********************************!*\
  !*** ./app/containers/app.jsx ***!
  \********************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.App = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reduxConnect = __webpack_require__(/*! redux-connect */ 2);
	
	var _reactRedux = __webpack_require__(/*! react-redux */ 13);
	
	var _reactRouter = __webpack_require__(/*! react-router */ 6);
	
	var _routes = __webpack_require__(/*! ../routes */ 10);
	
	var _auth = __webpack_require__(/*! ../actions/auth */ 3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var App = exports.App = function (_Component) {
	  _inherits(App, _Component);
	
	  function App() {
	    _classCallCheck(this, App);
	
	    return _possibleConstructorReturn(this, Object.getPrototypeOf(App).apply(this, arguments));
	  }
	
	  _createClass(App, [{
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        null,
	        this.props.children
	      );
	    }
	  }]);

	  return App;
	}(_react.Component);

/***/ },
/* 18 */
/*!*********************************!*\
  !*** ./app/containers/home.jsx ***!
  \*********************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Home = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _dec, _class;
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _getMuiTheme = __webpack_require__(/*! material-ui/styles/getMuiTheme */ 37);
	
	var _getMuiTheme2 = _interopRequireDefault(_getMuiTheme);
	
	var _MuiThemeProvider = __webpack_require__(/*! material-ui/styles/MuiThemeProvider */ 36);
	
	var _MuiThemeProvider2 = _interopRequireDefault(_MuiThemeProvider);
	
	var _menu = __webpack_require__(/*! ../components/menu */ 15);
	
	var _test = __webpack_require__(/*! ../actions/test */ 8);
	
	var _reactRouterRedux = __webpack_require__(/*! react-router-redux */ 7);
	
	var _reduxConnect = __webpack_require__(/*! redux-connect */ 2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Home = exports.Home = (_dec = (0, _reduxConnect.asyncConnect)([], function (state) {
	  return {
	    text: state.getIn(['test', 'text'])
	  };
	}, { changeHomeText: _test.changeHomeText, pushNavigation: _reactRouterRedux.push }), _dec(_class = function (_Component) {
	  _inherits(Home, _Component);
	
	  function Home() {
	    _classCallCheck(this, Home);
	
	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Home).apply(this, arguments));
	  }
	
	  _createClass(Home, [{
	    key: 'render',
	    value: function render() {
	      var _this2 = this;
	
	      return _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(
	          'div',
	          null,
	          'Test Hello!!'
	        ),
	        _react2.default.createElement(
	          'div',
	          null,
	          this.props.text
	        ),
	        _react2.default.createElement(
	          'div',
	          null,
	          _react2.default.createElement(
	            'a',
	            { onClick: function onClick() {
	                return _this2.props.changeHomeText("Hello World!");
	              } },
	            'Click here to change text '
	          )
	        ),
	        _react2.default.createElement(
	          'div',
	          null,
	          _react2.default.createElement(
	            'a',
	            { onClick: function onClick() {
	                return _this2.props.pushNavigation("/login");
	              } },
	            'Go To Login Page '
	          )
	        )
	      );
	    }
	  }]);

	  return Home;
	}(_react.Component)) || _class);

/***/ },
/* 19 */
/*!**********************************!*\
  !*** ./app/containers/login.jsx ***!
  \**********************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Login = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Login = exports.Login = function (_Component) {
	  _inherits(Login, _Component);
	
	  function Login() {
	    _classCallCheck(this, Login);
	
	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Login).apply(this, arguments));
	  }
	
	  _createClass(Login, [{
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        null,
	        'Login Page Cool'
	      );
	    }
	  }]);

	  return Login;
	}(_react.Component);

/***/ },
/* 20 */
/*!******************************!*\
  !*** ./app/reducers/auth.js ***!
  \******************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.reducer = undefined;
	
	var _auth = __webpack_require__(/*! ../actions/auth */ 3);
	
	var _reduxActions = __webpack_require__(/*! redux-actions */ 5);
	
	var _immutable = __webpack_require__(/*! immutable */ 4);
	
	var _immutable2 = _interopRequireDefault(_immutable);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var initialState = _immutable2.default.Map({
	  authenticated: false,
	  loaded: false
	});
	
	function handleAuth(state, action) {
	  state = state.set('loaded', true);
	
	  if (action.error) {
	    return state.set('authenticated', false);
	  }
	  return state.set('authenticated', true);
	}
	
	var reducer = exports.reducer = (0, _reduxActions.handleActions)({
	  AUTHENTICATED: handleAuth,
	  LOGIN: handleAuth
	}, initialState);

/***/ },
/* 21 */
/*!*******************************!*\
  !*** ./app/reducers/index.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.rootReducer = undefined;
	
	var _reduxImmutable = __webpack_require__(/*! redux-immutable */ 41);
	
	var _auth = __webpack_require__(/*! ./auth */ 20);
	
	var _test = __webpack_require__(/*! ./test */ 23);
	
	var _reduxConnect = __webpack_require__(/*! redux-connect */ 2);
	
	var _routerReducer = __webpack_require__(/*! ./routerReducer */ 22);
	
	var _immutable = __webpack_require__(/*! immutable */ 4);
	
	var _immutable2 = _interopRequireDefault(_immutable);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// Set the mutability/immutability functions
	(0, _reduxConnect.setToImmutableStateFunc)(function (mutableState) {
	  return _immutable2.default.fromJS(mutableState);
	});
	(0, _reduxConnect.setToMutableStateFunc)(function (immutableState) {
	  return immutableState.toJS();
	});
	
	var rootReducer = exports.rootReducer = (0, _reduxImmutable.combineReducers)({
	  auth: _auth.reducer,
	  test: _test.reducer,
	  routing: _routerReducer.reducer,
	  reduxAsyncConnect: _reduxConnect.reducer
	});

/***/ },
/* 22 */
/*!***************************************!*\
  !*** ./app/reducers/routerReducer.js ***!
  \***************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.reducer = undefined;
	
	var _immutable = __webpack_require__(/*! immutable */ 4);
	
	var _immutable2 = _interopRequireDefault(_immutable);
	
	var _reactRouterRedux = __webpack_require__(/*! react-router-redux */ 7);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var initialState = _immutable2.default.Map({
	  locationBeforeTransitions: null
	});
	
	var reducer = exports.reducer = function reducer() {
	  var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
	  var action = arguments[1];
	
	  if (action.type === _reactRouterRedux.LOCATION_CHANGE) {
	    return state.merge({
	      locationBeforeTransitions: action.payload
	    });
	  }
	
	  return state;
	};

/***/ },
/* 23 */
/*!******************************!*\
  !*** ./app/reducers/test.js ***!
  \******************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.reducer = undefined;
	
	var _test = __webpack_require__(/*! ../actions/test */ 8);
	
	var _reduxActions = __webpack_require__(/*! redux-actions */ 5);
	
	var _immutable = __webpack_require__(/*! immutable */ 4);
	
	var _immutable2 = _interopRequireDefault(_immutable);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var initialState = _immutable2.default.Map({
	  text: "Good Cruel World!"
	});
	
	var reducer = exports.reducer = (0, _reduxActions.handleAction)(_test.CHANGEHOMETEXT, {
	  next: function next(state, action) {
	    return state.set('text', action.payload);
	  },
	  throw: function _throw(state) {
	    return state;
	  }
	}, initialState);

/***/ },
/* 24 */
/*!**********************!*\
  !*** ./app/store.js ***!
  \**********************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	exports.configureStore = configureStore;
	
	var _redux = __webpack_require__(/*! redux */ 14);
	
	var _reduxPromise = __webpack_require__(/*! redux-promise */ 43);
	
	var _reduxPromise2 = _interopRequireDefault(_reduxPromise);
	
	var _reduxLogger = __webpack_require__(/*! redux-logger */ 42);
	
	var _reduxLogger2 = _interopRequireDefault(_reduxLogger);
	
	var _reducers = __webpack_require__(/*! ./reducers */ 21);
	
	var _reactRouterRedux = __webpack_require__(/*! react-router-redux */ 7);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function configureStore(preloadedState, browserHistory) {
	  // Apply the middleware to the store
	  var routermiddleware = (0, _reactRouterRedux.routerMiddleware)(browserHistory);
	  var store = (0, _redux.createStore)(_reducers.rootReducer, preloadedState, (0, _redux.compose)((0, _redux.applyMiddleware)(_reduxPromise2.default, (0, _reduxLogger2.default)(), routermiddleware), (typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : function (f) {
	    return f;
	  }));
	
	  return store;
	}

/***/ },
/* 25 */
/*!************************!*\
  !*** ./common/auth.js ***!
  \************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var db = __webpack_require__(/*! ./db */ 11).database,
	    passport = __webpack_require__(/*! passport */ 12),
	    LocalStrategy = __webpack_require__(/*! passport-local */ 39).Strategy,
	    valid = __webpack_require__(/*! validator */ 47);
	
	passport.serializeUser(function (user, done) {
	  done(null, user.id);
	});
	
	passport.deserializeUser(function (id, done) {
	  db.User.findById(id).then(function (user) {
	    done(null, user);
	  }).catch(done);
	});
	
	passport.use(new LocalStrategy({
	  usernameField: 'email'
	}, function (email, password, done) {
	
	  // Make sure we were given an email address
	  if (!valid.isEmail(email)) {
	    return done(null, false, {
	      message: "Invalid email address provided."
	    });
	  }
	
	  // Search fo the email in the db
	  db.User.findOne({
	    email: email
	  }).then(function (user) {
	    if (!user) {
	      throw new Error('No email found for ' + email);
	    }
	
	    return user.verifyPassword(password).then(function (isPasswordGood) {
	      if (!isPasswordGood) {
	        throw new Error("Incorrect password provided.");
	      }
	      done(null, user);
	    });
	  }).catch(function (e) {
	    console.log(e.message || e);
	    done(null, false, {
	      message: "Incorrect email/password provided."
	    });
	  });
	}));

/***/ },
/* 26 */
/*!***************************!*\
  !*** external "bluebird" ***!
  \***************************/
/***/ function(module, exports) {

	module.exports = require("bluebird");

/***/ },
/* 27 */
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/***/ function(module, exports) {

	module.exports = require("body-parser");

/***/ },
/* 28 */
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 29 */
/*!*************************************!*\
  !*** external "express-http-proxy" ***!
  \*************************************/
/***/ function(module, exports) {

	module.exports = require("express-http-proxy");

/***/ },
/* 30 */
/*!****************************************!*\
  !*** external "express-mysql-session" ***!
  \****************************************/
/***/ function(module, exports) {

	module.exports = require("express-mysql-session");

/***/ },
/* 31 */
/*!**********************************!*\
  !*** external "express-session" ***!
  \**********************************/
/***/ function(module, exports) {

	module.exports = require("express-session");

/***/ },
/* 32 */
/*!*********************************!*\
  !*** external "fetch-ponyfill" ***!
  \*********************************/
/***/ function(module, exports) {

	module.exports = require("fetch-ponyfill");

/***/ },
/* 33 */
/*!**************************************************!*\
  !*** external "history/lib/createMemoryHistory" ***!
  \**************************************************/
/***/ function(module, exports) {

	module.exports = require("history/lib/createMemoryHistory");

/***/ },
/* 34 */
/*!*******************************************!*\
  !*** external "material-ui/RaisedButton" ***!
  \*******************************************/
/***/ function(module, exports) {

	module.exports = require("material-ui/RaisedButton");

/***/ },
/* 35 */
/*!**************************************!*\
  !*** external "material-ui/Toolbar" ***!
  \**************************************/
/***/ function(module, exports) {

	module.exports = require("material-ui/Toolbar");

/***/ },
/* 36 */
/*!******************************************************!*\
  !*** external "material-ui/styles/MuiThemeProvider" ***!
  \******************************************************/
/***/ function(module, exports) {

	module.exports = require("material-ui/styles/MuiThemeProvider");

/***/ },
/* 37 */
/*!*************************************************!*\
  !*** external "material-ui/styles/getMuiTheme" ***!
  \*************************************************/
/***/ function(module, exports) {

	module.exports = require("material-ui/styles/getMuiTheme");

/***/ },
/* 38 */
/*!*************************!*\
  !*** external "morgan" ***!
  \*************************/
/***/ function(module, exports) {

	module.exports = require("morgan");

/***/ },
/* 39 */
/*!*********************************!*\
  !*** external "passport-local" ***!
  \*********************************/
/***/ function(module, exports) {

	module.exports = require("passport-local");

/***/ },
/* 40 */
/*!***********************************!*\
  !*** external "react-dom/server" ***!
  \***********************************/
/***/ function(module, exports) {

	module.exports = require("react-dom/server");

/***/ },
/* 41 */
/*!**********************************!*\
  !*** external "redux-immutable" ***!
  \**********************************/
/***/ function(module, exports) {

	module.exports = require("redux-immutable");

/***/ },
/* 42 */
/*!*******************************!*\
  !*** external "redux-logger" ***!
  \*******************************/
/***/ function(module, exports) {

	module.exports = require("redux-logger");

/***/ },
/* 43 */
/*!********************************!*\
  !*** external "redux-promise" ***!
  \********************************/
/***/ function(module, exports) {

	module.exports = require("redux-promise");

/***/ },
/* 44 */
/*!*************************!*\
  !*** external "scrypt" ***!
  \*************************/
/***/ function(module, exports) {

	module.exports = require("scrypt");

/***/ },
/* 45 */
/*!****************************!*\
  !*** external "sequelize" ***!
  \****************************/
/***/ function(module, exports) {

	module.exports = require("sequelize");

/***/ },
/* 46 */
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ function(module, exports) {

	module.exports = require("url");

/***/ },
/* 47 */
/*!****************************!*\
  !*** external "validator" ***!
  \****************************/
/***/ function(module, exports) {

	module.exports = require("validator");

/***/ }
/******/ ]);
//# sourceMappingURL=server.js.map