import { SingleElement } from "./SingleElement";
declare module "./SingleElement" {
    export interface SingleElement {
        backToTop: () => void;
    }
}
SingleElement.prototype.backToTop = function() {
    console.log('new method');
}