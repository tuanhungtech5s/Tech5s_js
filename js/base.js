var Tech5s;
(function (Tech5s) {
    class Base {
        constructor(selector) {
            this._isList = false;
            this._selector = selector;
            let nodelists = document.querySelectorAll(this._selector);
            let tmps = Array.from(nodelists);
            if (tmps.length == 0) {
                this._element = tmps[0];
            }
            else {
                this._element = tmps;
                this._isList = true;
            }
        }
        onClick(callback) {
            if (this._isList) {
                this._element.forEach((item) => {
                    item.addEventListener('click', callback);
                });
            }
            else {
                this._element.addEventListener('click', callback);
            }
        }
        find(child) {
            if (!this._isList) {
            }
        }
        static addClass(element, _class) {
            element.classList.add(_class);
        }
        static removeClass(element, _class) {
            element.classList.remove(_class);
        }
        addClass(_class) {
            if (this._isList) {
                this._element.forEach((item) => {
                    Base.addClass(item, _class);
                });
            }
            else {
                Base.addClass(this._element, _class);
            }
            return this;
        }
        removeClass(_class) {
            if (this._isList) {
                this._element.forEach((item) => {
                    Base.removeClass(item, _class);
                });
            }
            else {
                Base.removeClass(this._element, _class);
            }
            return this;
        }
    }
    Tech5s.Base = Base;
})(Tech5s || (Tech5s = {}));
const $ = Tech5s.Base;
var body = new Tech5s.Base('body');
body.onClick(function (e) {
});
var a = new $('a');
a.addClass('hello').removeClass('test').onClick(function (e) {
    e.preventDefault();
    alert(1);
});
//# sourceMappingURL=base.js.map