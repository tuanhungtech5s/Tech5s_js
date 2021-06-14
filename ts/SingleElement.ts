import {BaseElement} from './BaseElement';
import {ListElement} from './ListElement';
import {List,FunctionCallBack,Element, FunctionCallBackTwoParam} from './Element';
import { Query } from './Query';

const camalize = function camalize(str:string) {
    return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, function(match, chr)
    {
        return chr.toUpperCase();
    });
}
export const NOT_FOUND = -1;
export class SingleElement extends BaseElement{
    _element: any;
    constructor(element:any){
        super(element);
        if(!element) this.isExist= false;
    }
    outerHeight(): number {
        
            var h = this._element.offsetHeight;
            var style = getComputedStyle(this._element);
            h += parseInt(style.marginTop) + parseInt(style.marginBottom);
            return h;
        
        
    }
    outerWidth(): number {
        var width = this._element.offsetWidth;
        var style = getComputedStyle(this._element);

        width += parseInt(style.marginLeft) + parseInt(style.marginRight);
        return width;
    }
    offset(): object {
        return {left: this._element.offsetLeft, top: this._element.offsetTop};
    }
    position(): object {
        throw new Error('Method not implemented.');
    }
    width(width?:any,unit?:string): number {
        if(width!=undefined){
            if (typeof width === "function") width = width();
            this._element.style.width = width+ (unit==undefined?'px':unit);
            return width;
        }
        let currentWidth = parseFloat(getComputedStyle(this._element, null).width.replace("px", ""));
        if(isNaN(currentWidth)) return 0;
        return currentWidth;
    }
    height(height?:any,unit?:string): number {
        if(height!=undefined){
            if (typeof height === "function") height = height();
            this._element.style.height = height+ (unit==undefined?'px':unit);
            return height;
        }
        let currentHeight = parseFloat(getComputedStyle(this._element, null).height.replace("px", ""));
        if(isNaN(currentHeight)) return 0;
        return currentHeight;
    }
    attr(key:string,value?:string|number):string {
        if(value!=undefined){
            this._element.setAttribute(key, value);
        }
        return this._element.getAttribute(key);
    }
    tech5s(key:string,value?:string|number):string|Array<string> {
        let tech5sKey = 'tech5s-'+key;
        return this.attr(tech5sKey,value);
    }
    removeAttribute(key:string):Element{
        this._element.removeAttribute(key);
        return this;
    }

    remove(): void {
        this._element.parentNode.removeChild(this._element);
    }
    empty(): void {
        while(this._element.firstChild){
            this._element.removeChild(this._element.firstChild);
        }
    }


    item(index:number):Element{
        return this;
    }

    append(element: any): void {
        let html = element;
        if( typeof element != "string"){
            html = element.outerHtml();
        }
        this._element.insertAdjacentHTML('beforeend',html);
    }
    prepend(element: any): void {
        let html = element;
        if( typeof element != "string"){
            html = element.outerHtml();
        }
        this._element.insertAdjacentHTML('afterbegin',html);
    }
    before(element: any): void {
        let html = element;
        if( typeof element != "string"){
            html = element.outerHtml();
        }
        this._element.insertAdjacentHTML('beforebegin',html);
    }
    after(element: any): void {
        let html = element;
        if( typeof element != "string"){
            html = element.outerHtml();
        }
        this._element.insertAdjacentHTML('afterend',html);
    }
    next(): Element {
        if(this._element.nextElementSibling){
            return new SingleElement(this._element.nextElementSibling);
        }
    }
    prev(): Element {
        if(this._element.previousElementSibling){
            return new SingleElement(this._element.previousElementSibling);
        }
    }
    parent(): Element {
        return new SingleElement(this._element.parentNode);
    }
    closest(selector:string):Element{
        let els = this._element.closest(selector);
        return Query.create(els);
    }
    clone(): Element {
        return new SingleElement(this._element.cloneNode(true));
    }

    hide(): void {
        this._element.style.display = 'none';
    }
    show(): void {
        this._element.style.display = '';
    }
    index():number{
        var el = this._element;
        var i = 0;
        do {
            i++;
        } while (el = el.previousElementSibling);
        return i;
    }
    fadeIn(time:number =300): void {
        const self = this;
        self.show();
        this._element.style.opacity="0";
        this._element.style.transition="opacity "+time+"ms";
        this._element.style.opacity="1";
    }
    fadeOut(time:number =300): void {
        this._element.style.transition="opacity "+time+"ms";
        this._element.style.opacity="0";
        const self = this;
        setTimeout(function(){
            self.hide();
        },time)
    }
    slideUp(time:number = 500):void{
        this._element.style.transitionProperty = 'height, margin, padding';
        this._element.style.transitionDuration = time + 'ms';
        this._element.style.boxSizing = 'border-box';
        this._element.style.height = this._element.offsetHeight + 'px';
        this._element.offsetHeight;
        this._element.style.overflow = 'hidden';
        this._element.style.height = 0;
        this._element.style.paddingTop = 0;
        this._element.style.paddingBottom = 0;
        this._element.style.marginTop = 0;
        this._element.style.marginBottom = 0;
        window.setTimeout( () => {
            this._element.style.display = 'none';
            this._element.style.removeProperty('height');
            this._element.style.removeProperty('padding-top');
            this._element.style.removeProperty('padding-bottom');
            this._element.style.removeProperty('margin-top');
            this._element.style.removeProperty('margin-bottom');
            this._element.style.removeProperty('overflow');
            this._element.style.removeProperty('transition-duration');
            this._element.style.removeProperty('transition-property');
        }, time);
    }
    slideDown(time:number = 500):void{
        this._element.style.removeProperty('display');
        let display = window.getComputedStyle(this._element).display;

        if (display === 'none')
        display = 'block';

        this._element.style.display = display;
        let height = this._element.offsetHeight;
        this._element.style.overflow = 'hidden';
        this._element.style.height = 0;
        this._element.style.paddingTop = 0;
        this._element.style.paddingBottom = 0;
        this._element.style.marginTop = 0;
        this._element.style.marginBottom = 0;
        this._element.offsetHeight;
        this._element.style.boxSizing = 'border-box';
        this._element.style.transitionProperty = "height, margin, padding";
        this._element.style.transitionDuration = time + 'ms';
        this._element.style.height = height + 'px';
        this._element.style.removeProperty('padding-top');
        this._element.style.removeProperty('padding-bottom');
        this._element.style.removeProperty('margin-top');
        this._element.style.removeProperty('margin-bottom');
        window.setTimeout( () => {
            this._element.style.removeProperty('height');
            this._element.style.removeProperty('overflow');
            this._element.style.removeProperty('transition-duration');
            this._element.style.removeProperty('transition-property');
        }, time);
    }
    toggleSlide(time:number = 500):void{
        if (window.getComputedStyle(this._element).display === 'none') {
            return this.slideDown(time);
        } else {
        return this.slideUp(time);
        }
    }
    on(eventName: string, callback: FunctionCallBack): void {
        this._element.addEventListener(eventName,callback);
    }
    off(eventName: string, callback: FunctionCallBack): void {
        this._element.removeEventListener(eventName,callback);
    }

    

    
    html(html?:string): string {
        if(html!=undefined){
            this._element.innerHTML = html;
        }
        return this._element.innerHTML;
    }
    outerHtml(): string{
        return this._element.outerHTML;
    }
    text(text?:string): string {
        if(text!=undefined){
            this._element.innerText = text;
        }
        return this._element.innerText;
    }
    val(text?:string): string{
        if(text!=undefined){
            this._element.value = text;
        }
        return this._element.value;
    }
    css(key:any,value:string):Element{
        if(typeof key ==='string'){
            let styleKey = camalize(key);
            if(value==undefined){
                return this._element.style[styleKey];
            }
            else{
                if(value==""){
                    this.removeCss(key);
                }
                else{
                    this._element.style[styleKey] = value;
                }
            }
        }
        else if(typeof key ==='object' && value == undefined){
            for ( var att in key ) {
                this._element.style[att] = key[att];
            }
        }
        return this;
    }
    removeCss(key:string):Element{
        this._element.style.removeProperty(key);
        return this;
    }
    find(childSelector:string): Element {
        let children = this._element.querySelectorAll(childSelector);
        let tmps = Array.prototype.slice.call(children);
        if(tmps.length==1){
            return new SingleElement(tmps[0]);
        }
        else{
            if(tmps.length>0)
            {
                return new ListElement(tmps);
            }
        }
        return new SingleElement(undefined);
    }
    onClick(callback: FunctionCallBack): void {
        this._element.addEventListener('click',callback);
    }
    addClass(_class: string): Element {
        this._element.classList.add(_class);
        return this;
    }
    removeClass(_class: string): Element {
        this._element.classList.remove(_class);
        return this;
    }
    toggleClass(_class: string): Element {
        this._element.classList.toggle(_class);
        return this;
    }
    hasClass(_class:string): boolean {
        return this._element.classList.contains(_class);
    }

    trigger(eventName:string):void{
        var event = document.createEvent('HTMLEvents');
        event.initEvent(eventName, true, false);
        this._element.dispatchEvent(event);
    }
    serialize():string{
        let formData = new FormData(this._element);
        return new URLSearchParams(formData as any).toString();
    }
    formData():FormData{
        return new FormData(this._element);
        var formData = new FormData(this._element);
        var object:any={};
        formData.forEach(function(value, key){
            object[key] = value;
        });
        return object;
    }
    isNotNull():boolean{
        return (this._element!=null && this._element!=undefined);
    }
    length():number{
        return this.isNotNull()?1:NOT_FOUND;
    }
    forEach(callback:FunctionCallBackTwoParam){
        callback(this,0);
    }
}