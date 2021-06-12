System.register(["./BaseElement", "./SingleElement"], function (exports_1, context_1) {
    "use strict";
    var BaseElement_1, SingleElement_1, ListElement;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (BaseElement_1_1) {
                BaseElement_1 = BaseElement_1_1;
            },
            function (SingleElement_1_1) {
                SingleElement_1 = SingleElement_1_1;
            }
        ],
        execute: function () {
            ListElement = class ListElement extends BaseElement_1.BaseElement {
                constructor(element) {
                    super(element);
                    this._element = [];
                    if (element.length == 0)
                        this.isExist = false;
                    element.forEach((item) => {
                        this._element.push(new SingleElement_1.SingleElement(item));
                    });
                }
                outerHeight() {
                    let max = 0;
                    this._element.forEach((item) => {
                        var value = item.outerHeight();
                        if (value > max)
                            max = value;
                    });
                    return max;
                }
                outerWidth() {
                    let max = 0;
                    this._element.forEach((item) => {
                        var value = item.outerWidth();
                        if (value > max)
                            max = value;
                    });
                    return max;
                }
                offset() {
                    console.log('Method offset is not exist in List!');
                    return { top: 0, left: 0 };
                }
                position() {
                    console.log('Method position is not exist in List!');
                    return { top: 0, left: 0 };
                }
                width() {
                    let max = 0;
                    this._element.forEach((item) => {
                        var value = item.width();
                        if (value > max)
                            max = value;
                    });
                    return max;
                }
                height() {
                    let max = 0;
                    this._element.forEach((item) => {
                        var value = item.height();
                        if (value > max)
                            max = value;
                    });
                    return max;
                }
                attr(key) {
                    let results = [];
                    this._element.forEach((item) => {
                        var value = item.attr(key);
                        if (value != null) {
                            results.push(value);
                        }
                    });
                    return results.join(',');
                }
                remove() {
                    throw new Error('Method not implemented.');
                }
                empty() {
                    this._element.forEach((item) => {
                        item.empty();
                    });
                }
                trigger(eventName) {
                    throw new Error('Method not implemented.');
                }
                item(index) {
                    return this._element[index];
                }
                append(element) {
                    this._element.forEach((item) => {
                        item.append(element);
                    });
                }
                prepend(element) {
                    this._element.forEach((item) => {
                        item.prepend(element);
                    });
                }
                before(element) {
                    this._element.forEach((item) => {
                        item.before(element);
                    });
                }
                after(element) {
                    this._element.forEach((item) => {
                        item.after(element);
                    });
                }
                next() {
                    if (this._element.length > 0) {
                        return this._element[this._element.length - 1].next();
                    }
                }
                parent() {
                    let results = [];
                    this._element.forEach((item) => {
                        results.push(item.parent());
                    });
                    return new ListElement(results);
                }
                clone() {
                    let results = [];
                    this._element.forEach((item) => {
                        results.push(item.clone());
                    });
                    return new ListElement(results);
                }
                hide() {
                    this._element.forEach((item) => {
                        item.hide();
                    });
                }
                show() {
                    this._element.forEach((item) => {
                        item.show();
                    });
                }
                index() {
                    return this._element[0].index();
                }
                fadeIn(time) {
                    throw new Error("Method not implemented.");
                }
                fadeOut(time) {
                    throw new Error('Method not implemented.');
                }
                on(eventName, callback) {
                    this._element.forEach((item) => {
                        item.on(eventName, callback);
                    });
                }
                hasClass() {
                    throw new Error("Method not implemented.");
                }
                html() {
                    return this._element[0].html();
                }
                text() {
                    return this._element[0].text();
                }
                outerHtml() {
                    let html = '';
                    this._element.forEach((item) => {
                        html += item.outerHtml();
                    });
                    return html;
                }
                find(childSelector) {
                    throw new Error("Method not implemented.");
                }
                onClick(callback) {
                    this._element.forEach((item) => {
                        item.onClick(callback);
                    });
                }
                addClass(_class) {
                    this._element.forEach((item) => {
                        item.addClass(_class);
                    });
                    return this;
                }
                removeClass(_class) {
                    this._element.forEach((item) => {
                        item.removeClass(_class);
                    });
                    return this;
                }
            };
            exports_1("ListElement", ListElement);
        }
    };
});
//# sourceMappingURL=ListElement.js.map