System.register([], function (exports_1, context_1) {
    "use strict";
    var BaseElement;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            BaseElement = class BaseElement {
                constructor(element) {
                    this._element = element;
                }
                get element() {
                    return this._element;
                }
            };
            exports_1("BaseElement", BaseElement);
        }
    };
});
//# sourceMappingURL=BaseElement.js.map