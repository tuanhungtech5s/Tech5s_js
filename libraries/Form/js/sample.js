var ajxForm = new Form.Ajax();
ajxForm.execute();
var FORM = {
    success: function (e) {
        console.log("success");
    },
    before: function () {
        console.log("before");
    },
    always: function () {
        console.log("always");
    },
    error: function () {
        console.log("error");
    },
};
