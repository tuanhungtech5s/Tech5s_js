System.register(["./SingleElement", "./ListElement"], function (exports_1, context_1) {
    "use strict";
    var SingleElement_1, ListElement_1, Query, Tech;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (SingleElement_1_1) {
                SingleElement_1 = SingleElement_1_1;
            },
            function (ListElement_1_1) {
                ListElement_1 = ListElement_1_1;
            }
        ],
        execute: function () {
            Query = class Query {
                constructor(selector) {
                    this._selector = selector;
                    let nodelists = selector;
                    if (typeof selector === "string") {
                        nodelists = document.querySelectorAll(this._selector);
                        let tmps = Array.from(nodelists);
                        if (tmps.length == 1) {
                            this._element = new SingleElement_1.SingleElement(tmps[0]);
                        }
                        else {
                            if (tmps.length > 0) {
                                this._element = new ListElement_1.ListElement(tmps);
                            }
                        }
                    }
                    else {
                        this._element = new SingleElement_1.SingleElement(selector);
                        ;
                    }
                }
                parent() {
                    return this._element.parent();
                }
                position() {
                    return this._element.position();
                }
                outerWidth() {
                    return this._element.outerWidth();
                }
                outerHeight() {
                    return this._element.outerHeight();
                }
                offset() {
                    return this._element.offset();
                }
                width() {
                    return this._element.width();
                }
                height() {
                    return this._element.height();
                }
                attr(key) {
                    return this._element.attr(key);
                }
                remove() {
                    throw new Error('Method not implemented.');
                }
                empty() {
                    this._element.empty();
                }
                static create(selector) {
                    return new Query(selector);
                }
                item(index) {
                    return this._element.item(index);
                }
                hide() {
                    throw new Error("Method not implemented.");
                }
                show() {
                    throw new Error("Method not implemented.");
                }
                append(element) {
                    this._element.append(element);
                }
                prepend(element) {
                    this._element.prepend(element);
                }
                before(element) {
                    this._element.before(element);
                }
                after(element) {
                    this._element.after(element);
                }
                next() {
                    return this._element.next();
                }
                clone() {
                    return this._element.clone();
                }
                index() {
                    return this._element.index();
                }
                fadeIn(time) {
                    this._element.fadeIn(time);
                }
                fadeOut(time) {
                    this._element.fadeOut(time);
                }
                on(eventName, callback) {
                    this._element.on(eventName, callback);
                }
                hasClass(_class) {
                    return this._element.hasClass(_class);
                }
                html() {
                    return this._element.html();
                }
                outerHtml() {
                    return this._element.outerHtml();
                }
                text() {
                    return this._element.text();
                }
                find(childSelector) {
                    return this._element.find(childSelector);
                }
                onClick(callback) {
                    this._element.onClick(callback);
                }
                addClass(_class) {
                    this._element.addClass(_class);
                    return this._element;
                }
                removeClass(_class) {
                    this._element.removeClass(_class);
                    return this._element;
                }
                trigger(eventName) {
                    this._element.trigger(eventName);
                }
                static extend(out, ...maps) {
                    out = out || {};
                    for (var i = 0; i < maps.length; i++) {
                        var obj = maps[i];
                        if (!obj)
                            continue;
                        for (var key in obj) {
                            if (obj.hasOwnProperty(key)) {
                                if (typeof obj[key] === 'object') {
                                    if (obj[key] instanceof Array == true)
                                        out[key] = obj[key].slice(0);
                                    else
                                        out[key] = this.extend(out[key], obj[key]);
                                }
                                else
                                    out[key] = obj[key];
                            }
                        }
                    }
                    return out;
                }
                ;
            };
            exports_1("Query", Query);
            exports_1("Tech", Tech = function (selector) {
                return new Query(selector);
            });
        }
    };
});
//# sourceMappingURL=Query.js.map