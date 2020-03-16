"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AssistiveTouch = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function easeOutBounce(t, b, c, d) {
  if ((t /= d) < 1 / 2.75) {
    return c * (7.5625 * t * t) + b;
  } else if (t < 2 / 2.75) {
    return c * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75) + b;
  } else if (t < 2.5 / 2.75) {
    return c * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375) + b;
  } else {
    return c * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375) + b;
  }
}

var AssistiveTouch = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(AssistiveTouch, _React$PureComponent);

  function AssistiveTouch(props) {
    var _this2;

    _classCallCheck(this, AssistiveTouch);

    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(AssistiveTouch).call(this, props));
    _this2.assistiveTouch = _react["default"].createRef();
    _this2.initAssistTouch = _this2.initAssistTouch.bind(_assertThisInitialized(_this2));
    return _this2;
  }

  _createClass(AssistiveTouch, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.initAssistTouch();
    }
  }, {
    key: "initAssistTouch",
    value: function initAssistTouch() {
      var _this = this;

      var _this$props = _this.props,
          _this$props$autoEdge = _this$props.autoEdge,
          autoEdge = _this$props$autoEdge === void 0 ? true : _this$props$autoEdge,
          _this$props$edgeMode = _this$props.edgeMode,
          edgeMode = _this$props$edgeMode === void 0 ? "both" : _this$props$edgeMode,
          _this$props$memoryPos = _this$props.memoryPosition,
          memoryPosition = _this$props$memoryPos === void 0 ? true : _this$props$memoryPos,
          _this$props$bounce = _this$props.bounce,
          bounce = _this$props$bounce === void 0 ? true : _this$props$bounce;
      var params = {
        // 是否自动贴边
        autoEdge: autoEdge,
        edgeMode: edgeMode,
        memoryPosition: memoryPosition,
        bounce: bounce
      };
      var data = {
        distanceX: 0,
        distanceY: 0
      };
      var win = window; // 浏览器窗体尺寸

      var winWidth = win.innerWidth;
      var winHeight = win.innerHeight;
      var ele = _this.assistiveTouch.current; // 设置transform坐标等方法

      var fnTranslate = function fnTranslate(x, y) {
        x = Math.round(1000 * x) / 1000;
        y = Math.round(1000 * y) / 1000;
        ele.style.webkitTransform = 'translate(' + [x + 'px', y + 'px'].join(',') + ')';
        ele.style.transform = 'translate3d(' + [x + 'px', y + 'px', 0].join(',') + ')';
      };

      var strStoreDistance = '';

      if (ele.id && win.localStorage && _this.props.memoryPosition && (strStoreDistance = localStorage['assistive-touch' + ele.id])) {
        var arrStoreDistance = strStoreDistance.split(',');
        ele.distanceX = +arrStoreDistance[0];
        ele.distanceY = +arrStoreDistance[1];
        fnTranslate(ele.distanceX, ele.distanceY);
      } // 显示拖拽元素
      // ele.style.visibility = 'visible';


      ele.style.display = 'inline-block'; // 如果元素在屏幕之外，位置使用初始值

      var initBound = ele.getBoundingClientRect();

      if (initBound.left < -0.5 * initBound.width || initBound.top < -0.5 * initBound.height || initBound.right > winWidth + 0.5 * initBound.width || initBound.bottom > winHeight + 0.5 * initBound.height) {
        ele.distanceX = 0;
        ele.distanceY = 0;
        fnTranslate(0, 0);
      }

      ele.addEventListener('touchstart', function (event) {
        if (data.inertiaing) {
          return;
        }

        var events = event.touches[0] || event;
        data.posX = events.pageX;
        data.posY = events.pageY;
        data.touching = true;

        if (ele.distanceX || ele.distanceX === 0) {
          data.distanceX = ele.distanceX;
        }

        if (ele.distanceY || ele.distanceY === 0) {
          data.distanceY = ele.distanceY;
        } // 元素的位置数据


        data.bound = ele.getBoundingClientRect();
        data.timerready = true;
      });
      ele.addEventListener('touchmove', function (event) {
        if (data.touching !== true) {
          return;
        } // 当移动开始的时候开始记录时间


        if (data.timerready === true) {
          data.timerstart = +new Date();
          data.timerready = false;
        }

        event.preventDefault();
        var events = event.touches[0] || event;
        data.nowX = events.pageX;
        data.nowY = events.pageY;
        var distanceX = data.nowX - data.posX,
            distanceY = data.nowY - data.posY; // 此时元素的位置

        var absLeft = data.bound.left + distanceX,
            absTop = data.bound.top + distanceY,
            absRight = absLeft + data.bound.width,
            absBottom = absTop + data.bound.height; // 边缘检测

        if (absLeft < 0) {
          distanceX = distanceX - absLeft;
        }

        if (absTop < 0) {
          distanceY = distanceY - absTop;
        }

        if (absRight > winWidth) {
          distanceX = distanceX - (absRight - winWidth);
        }

        if (absBottom > winHeight) {
          distanceY = distanceY - (absBottom - winHeight);
        } // 元素位置跟随


        var x = data.distanceX + distanceX,
            y = data.distanceY + distanceY;
        fnTranslate(x, y); // 缓存移动位置

        ele.distanceX = x;
        ele.distanceY = y;
      }, {
        // fix #3 #5
        passive: false
      });
      ele.addEventListener('touchend', function () {
        if (data.touching === false) {
          // fix iOS fixed bug
          return;
        }

        data.touching = false; // 计算速度

        data.timerend = +new Date();

        if (!data.nowX || !data.nowY) {
          return;
        } // 移动的水平和垂直距离


        var distanceX = data.nowX - data.posX,
            distanceY = data.nowY - data.posY;

        if (Math.abs(distanceX) < 5 && Math.abs(distanceY) < 5) {
          return;
        } // 开始惯性缓动


        data.inertiaing = true;

        var edge = function edge() {
          // 时间
          var start = 0,
              during = 25;

          if (!_this.props.bounce) {
            start = 24;
          } // 初始值和变化量


          var init = ele.distanceX,
              y = ele.distanceY,
              change = 0; // 判断元素现在在哪个半区

          var bound = ele.getBoundingClientRect();

          if (_this.props.edgeMode === 'left') {
            change = -1 * bound.left;
          } else if (_this.props.edgeMode === 'right') {
            change = winWidth - bound.right;
          } else {
            if (bound.left + bound.width / 2 < winWidth / 2) {
              change = -1 * bound.left;
            } else {
              change = winWidth - bound.right;
            }
          }

          var run = function run() {
            // 如果用户触摸元素，停止继续动画
            if (data.touching === true) {
              data.inertiaing = false;
              return;
            }

            start++;
            var x = easeOutBounce(start, init, change, during);
            fnTranslate(x, y);

            if (start < during) {
              requestAnimationFrame(run);
            } else {
              var t = setTimeout(function () {
                ele.distanceX = x;
                ele.distanceY = y;
                data.inertiaing = false;

                if (win.localStorage && _this.props.memoryPosition) {
                  localStorage['assistive-touch' + ele.id] = [x, y].join();
                }

                clearTimeout(t);
              }, 100);
            }
          };

          run();
        };

        if (_this.props.autoEdge) {
          edge();
        } else {
          data.touching = true;
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          children = _this$props2.children,
          className = _this$props2.className,
          id = _this$props2.id;
      var classNames = {};
      className && (classNames = {
        className: className
      });
      return _react["default"].createElement("div", _extends({}, classNames, {
        id: id || '__assistive-touch',
        ref: this.assistiveTouch
      }), children);
    }
  }]);

  return AssistiveTouch;
}(_react["default"].PureComponent);

exports.AssistiveTouch = AssistiveTouch;
AssistiveTouch.defaultProps = {
  autoEdge: true,
  edgeMode: "both",
  memoryPosition: true,
  bounce: true
};