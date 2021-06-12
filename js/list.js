System.register(["./Query"], function (exports_1, context_1) {
    "use strict";
    var Query_1, a, c, button, button;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (Query_1_1) {
                Query_1 = Query_1_1;
            }
        ],
        execute: function () {
            a = { a: 1 };
            c = Query_1.Query.extend(a, { a: 2, b: { x: 1 } }, { b: { x: 2, y: 3 } });
            console.log(c);
            button = Query_1.Tech('#hide');
            button.onClick(function (e) {
                var list = Query_1.Tech('a');
                var item = list.item(0);
                console.log(item.height());
                console.log(list.height());
            });
            button = Query_1.Tech('#show');
            button.onClick(function (e) {
                var list = Query_1.Tech('a');
                var item = list.item(0);
                item.fadeIn(3000);
            });
        }
    };
});
//# sourceMappingURL=list.js.map