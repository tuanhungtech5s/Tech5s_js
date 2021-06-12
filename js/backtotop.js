var Tech5s;
(function (Tech5s) {
    class BackToTop {
        constructor(target = '.back-to-top', configs = {}) {
            this._defaultConfig = {
                'threshold': 300,
                'classShow': 'show',
                'classHidden': 'hidden',
                'isDemo': false,
            };
            this._target = target;
            this._defaultConfig = Object.assign(Object.assign({}, this._defaultConfig), configs);
            this._element = document.querySelector(this._target);
            if (this._element != null) {
                this.initScroll();
            }
        }
        get target() {
            return this._target;
        }
        set target(v) {
            this.target = v;
        }
        getScrollTop() {
            return document.documentElement.scrollTop || document.body.scrollTop;
        }
        scrollTo(time = 300, position = 0) {
            var currentPos = window.pageYOffset;
            let start = 0;
            window.requestAnimationFrame(function step(currentTime) {
                start = !start ? currentTime : start;
                var progress = currentTime - start;
                if (currentPos < position) {
                    window.scrollTo(0, ((position - currentPos) * progress / time) + currentPos);
                }
                else {
                    window.scrollTo(0, currentPos - ((currentPos - position) * progress / time));
                }
                if (progress < time) {
                    window.requestAnimationFrame(step);
                }
                else {
                    window.scrollTo(0, position);
                }
            });
        }
        initScroll() {
            let _self = this;
            document.addEventListener('scroll', function (e) {
                let top = _self.getScrollTop();
                let configs = _self._defaultConfig;
                if (top > _self._defaultConfig.threshold) {
                    _self._element.classList.remove(configs.classHidden);
                    _self._element.classList.add(configs.classShow);
                }
                else {
                    _self._element.classList.remove(configs.classShow);
                    _self._element.classList.add(configs.classHidden);
                }
            });
            _self._element.addEventListener('click', function () {
                _self.scrollTo();
            });
        }
    }
    Tech5s.BackToTop = BackToTop;
})(Tech5s || (Tech5s = {}));
var backToTop = new Tech5s.BackToTop();
//# sourceMappingURL=backtotop.js.map