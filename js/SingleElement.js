System.register(["./BaseElement", "./ListElement"], function (exports_1, context_1) {
    "use strict";
    var BaseElement_1, ListElement_1, SingleElement;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (BaseElement_1_1) {
                BaseElement_1 = BaseElement_1_1;
            },
            function (ListElement_1_1) {
                ListElement_1 = ListElement_1_1;
            }
        ],
        execute: function () {
            SingleElement = class SingleElement extends BaseElement_1.BaseElement {
                constructor(element) {
                    super(element);
                    if (!element)
                        this.isExist = false;
                }
                outerHeight() {
                    var height = this._element.offsetHeight;
                    var style = getComputedStyle(this._element);
                    height += parseInt(style.marginTop) + parseInt(style.marginBottom);
                    return height;
                }
                outerWidth() {
                    var width = this._element.offsetWidth;
                    var style = getComputedStyle(this._element);
                    width += parseInt(style.marginLeft) + parseInt(style.marginRight);
                    return width;
                }
                offset() {
                    return { left: this._element.offsetLeft, top: this._element.offsetTop };
                }
                position() {
                    throw new Error('Method not implemented.');
                }
                width() {
                    return this._element.clientWidth;
                }
                height() {
                    return this._element.clientHeight;
                }
                attr(key) {
                    return this._element.getAttribute(key);
                }
                remove() {
                    throw new Error('Method not implemented.');
                }
                empty() {
                    while (this._element.firstChild) {
                        this._element.removeChild(this._element.firstChild);
                    }
                }
                item(index) {
                    return this;
                }
                append(element) {
                    let html = element;
                    if (typeof element != "string") {
                        html = element.outerHtml();
                    }
                    this._element.insertAdjacentHTML('beforeend', html);
                }
                prepend(element) {
                    let html = element;
                    if (typeof element != "string") {
                        html = element.outerHtml();
                    }
                    this._element.insertAdjacentHTML('afterbegin', html);
                }
                before(element) {
                    let html = element;
                    if (typeof element != "string") {
                        html = element.outerHtml();
                    }
                    this._element.insertAdjacentHTML('beforebegin', html);
                }
                after(element) {
                    let html = element;
                    if (typeof element != "string") {
                        html = element.outerHtml();
                    }
                    this._element.insertAdjacentHTML('afterend', html);
                }
                next() {
                    if (this._element.nextElementSibling) {
                        return new SingleElement(this._element.nextElementSibling);
                    }
                }
                parent() {
                    return new SingleElement(this._element.parentNode);
                }
                clone() {
                    return new SingleElement(this._element.cloneNode(true));
                }
                hide() {
                    this._element.style.display = 'none';
                }
                show() {
                    this._element.style.display = '';
                }
                index() {
                    var el = this._element;
                    var i = 0;
                    do {
                        i++;
                    } while (el = el.previousElementSibling);
                    return i;
                }
                fadeIn(time = 300) {
                    const self = this;
                    self.show();
                    this._element.style.opacity = "0";
                    this._element.style.transition = "opacity " + time + "ms";
                    this._element.style.opacity = "1";
                }
                fadeOut(time = 300) {
                    this._element.style.transition = "opacity " + time + "ms";
                    this._element.style.opacity = "0";
                    const self = this;
                    setTimeout(function () {
                        self.hide();
                    }, time);
                }
                on(eventName, callback) {
                    this._element.addEventListener(eventName, callback);
                }
                hasClass(_class) {
                    return this._element.classList.contains(_class);
                }
                html() {
                    return this._element.innerHTML;
                }
                outerHtml() {
                    return this._element.outerHTML;
                }
                text() {
                    return this._element.innerText;
                }
                find(childSelector) {
                    let children = this._element.querySelectorAll(childSelector);
                    return new ListElement_1.ListElement(children);
                }
                onClick(callback) {
                    this._element.addEventListener('click', callback);
                }
                addClass(_class) {
                    this._element.classList.add(_class);
                    return this;
                }
                removeClass(_class) {
                    this._element.classList.remove(_class);
                    return this;
                }
                trigger(eventName) {
                    var event = document.createEvent('HTMLEvents');
                    event.initEvent(eventName, true, false);
                    this._element.dispatchEvent(event);
                }
            };
            exports_1("SingleElement", SingleElement);
        }
    };
});
//# sourceMappingURL=SingleElement.js.map