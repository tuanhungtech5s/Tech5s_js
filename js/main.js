var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { Query } from 'Tech5s/ts/Query';
var BackToTop = (function () {
    function BackToTop(target, configs) {
        if (target === void 0) { target = '.back-to-top'; }
        if (configs === void 0) { configs = {}; }
        this._defaultConfig = {
            'threshold': 300,
            'classShow': 'show',
            'classHidden': 'hidden',
            'isDemo': false,
        };
        this._target = target;
        this._defaultConfig = __assign(__assign({}, this._defaultConfig), configs);
        this._element = Query.create(target);
        if (this._element.isNotNull()) {
            this.initScroll();
        }
    }
    Object.defineProperty(BackToTop.prototype, "target", {
        get: function () {
            return this._target;
        },
        set: function (v) {
            this.target = v;
        },
        enumerable: false,
        configurable: true
    });
    BackToTop.prototype.initScroll = function () {
        var _self = this;
        Query.create(document).on('scroll', function (e) {
            var top = Query.getScrollTop();
            var configs = _self._defaultConfig;
            if (top > _self._defaultConfig.threshold) {
                _self._element.removeClass(configs.classHidden).addClass(configs.classShow);
            }
            else {
                _self._element.removeClass(configs.classShow).addClass(configs.classHidden);
            }
        });
        _self._element.on('click', function (e) {
            e.preventDefault();
            Query.scrollTo();
        });
    };
    return BackToTop;
}());
export { BackToTop };
//# sourceMappingURL=main.js.map