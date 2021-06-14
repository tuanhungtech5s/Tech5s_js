import {BaseElement} from './BaseElement';
import {SingleElement} from './SingleElement';
import {List,FunctionCallBack,Element, FunctionCallBackTwoParam} from './Element';
export class ListElement extends BaseElement{
    
    
    _element: Array<SingleElement> = [];
    constructor(element:any){
        super(element);
        if(element.length==0) this.isExist= false;
        element.forEach((item:any)=>{
            this._element.push(new SingleElement(item));
        });
    }
    outerHeight(): number {
        let max:number = 0;
        this._element.forEach((item:SingleElement)=>{
            var value = item.outerHeight();
            if(value>max) max = value;
        })
        return max;
    }
    outerWidth(): number {
        let max:number = 0;
        this._element.forEach((item:SingleElement)=>{
            var value = item.outerWidth();
            if(value>max) max = value;
        })
        return max;
    }
    offset(): object {
        console.log('Method offset is not exist in List!');
        return {top:0,left:0};
    }
    position(): object {
        console.log('Method position is not exist in List!');
        return {top:0,left:0};
    }
    width(width?:any,unit?:string): number {
        if(width!=undefined){
            this._element.forEach((item:SingleElement)=>{
                item.width(width,unit);
            })
            return width;
        }
        else{
            let max:number = 0;
            this._element.forEach((item:SingleElement)=>{
                var value = item.width() as number;
                if(value>max && ! isNaN(value)) max = value;
            })
            return max;
        }
        
    }
    height(height?:any,unit?:string): number {
        if(height!=undefined){
            this._element.forEach((item:SingleElement)=>{
                item.height(height,unit);
            })
            return height;
        }
        else{
            let max:number = 0;
            this._element.forEach((item:SingleElement)=>{
                var value = item.height();
                if(value>max && ! isNaN(value)) max = value;
            })
            return max;
        }
        
    }
    attr(key:string,value?:string|number):string {
        if(value!=undefined){
            this._element.forEach((item:SingleElement)=>{
                item.attr(key,value);
            })
            return value as string;
        }
        let results:Array<string> = [];
        this._element.forEach((item:SingleElement)=>{
            var value = item.attr(key);
            if(value!=null){
                results.push(value);
            }
            
        })
        return results.join(',');
    }
    tech5s(key:string,value?:string|number):string|Array<string> {
        if(value!=undefined){
            this._element.forEach((item:SingleElement)=>{
                item.attr(key,value);
            })
            return value as string;
        }
        let results:Array<string> = [];
        this._element.forEach((item:SingleElement)=>{
            var value = item.attr(key);
            if(value!=null){
                results.push(value);
            }
            
        })
        return results;
    }
    removeAttribute(key:string):Element{
        this._element.forEach((item:SingleElement)=>{
            item.removeAttribute(key);
        })
        return this;
    }
    remove(): void {
        this._element.forEach((item:SingleElement)=>{
            item.remove();
        })
    }
    empty(): void {
        this._element.forEach((item:SingleElement)=>{
            item.empty();
        })
    }
    trigger(eventName: string): void {
        throw new Error('Method not implemented.');
    }
    item(index: number): Element {
        return this._element[index];
    }
    append(element: any): void {
        this._element.forEach((item:SingleElement)=>{
            item.append(element);
        })
    }
    prepend(element: any): void {
        this._element.forEach((item:SingleElement)=>{
            item.prepend(element);
        })
    }
    before(element: any): void {
        this._element.forEach((item:SingleElement)=>{
            item.before(element);
        })
    }
    after(element: any): void {
        this._element.forEach((item:SingleElement)=>{
            item.after(element);
        })
    }
    next(): Element {
        if(this._element.length>0){
            return this._element[this._element.length-1].next();
        }
    }
    prev(): Element {
        if(this._element.length>0){
            return this._element[this._element.length-1].prev();
        }
    }
    parent(): Element {
        let results:Array<Element> = [];
        this._element.forEach((item:SingleElement)=>{
            results.push(item.parent());
        })
        return new ListElement(results);
    }
    closest(selector:string):Element{
        let results:Array<Element> = [];
        this._element.forEach((item:SingleElement)=>{
            results.push(item.closest(selector));
        })
        return new ListElement(results);
    }
    clone(): Element {
        let results:Array<Element> = [];
        this._element.forEach((item:SingleElement)=>{
            results.push(item.clone());
        })
        return new ListElement(results);
    }
    hide(): void {
        this._element.forEach((item:SingleElement)=>{
            item.hide();
        })
    }
    show(): void {
        this._element.forEach((item:SingleElement)=>{
            item.show();
        })
    }
    index(): number {
        return this._element[0].index();
    }
    fadeIn(time:number): void {
        this._element.forEach((item:SingleElement)=>{
            item.fadeIn(time);
        })
    }
    fadeOut(time:number): void {
        this._element.forEach((item:SingleElement)=>{
            item.fadeOut(time);
        })
    }
    slideUp(time: number): void {
        this._element.forEach((item:SingleElement)=>{
            item.slideUp(time);
        })
    }
    slideDown(time: number): void {
        this._element.forEach((item:SingleElement)=>{
            item.slideDown(time);
        })
    }
    toggleSlide(time: number): void {
        this._element.forEach((item:SingleElement)=>{
            item.toggleSlide(time);
        })
    }
    on(eventName: string, callback: FunctionCallBack): void {
        this._element.forEach((item:SingleElement)=>{
            item.on(eventName,callback);
        })
    }
    off(eventName: string, callback: FunctionCallBack): void {
        this._element.forEach((item:SingleElement)=>{
            item.off(eventName,callback);
        })
    }

    hasClass(_class:string): boolean {
        return this._element.some((item:SingleElement)=>{
            return item.hasClass(_class);
        })
    }
    html(html?:string): string {
        if(html!=undefined){
            this._element.forEach((item:SingleElement)=>{
                item.html(html);
            });
        }
        let results:Array<string> = [];
        this._element.forEach((item:SingleElement)=>{
            results.push(item.html());
        })
        return results.join(',');
    }
    text(text?:string): string {
        if(text!=undefined){
            this._element.forEach((item:SingleElement)=>{
                item.text(text);
            })
            return text;
        }
        return this._element[0].text();
    }
    val(text?:string): string {
        if(text!=undefined){
            this._element.forEach((item:SingleElement)=>{
                item.val(text);
            })
            return text;
        }
        return this._element[0].val();
    }
    outerHtml(): string{
        let html = '';
        this._element.forEach((item:SingleElement)=>{
            html += item.outerHtml();
        })
        return html;
    }
    css(key:any,value:string):Element{
        this._element.forEach((item:SingleElement)=>{
            item.css(key,value);
        })
        return this;
    }
    removeCss(key:string):Element{
        this._element.forEach((item:SingleElement)=>{
            item.removeCss(key);
        })
        return this;
    }
    find(childSelector:string):Element {
        throw new Error("Method find not exist in ListElement, Please try with SingleElement.");
    }
    onClick(callback: FunctionCallBack): void {
        this._element.forEach((item:SingleElement)=>{
            item.onClick(callback);
        })
    }
    addClass(_class: string): Element {
        this._element.forEach((item:SingleElement)=>{
            item.addClass(_class);
        })
        return this;
    }
    toggleClass(_class: string): Element {
        this._element.forEach((item:SingleElement)=>{
            item.toggleClass(_class);
        })
        return this;
    }
    removeClass(_class: string): Element {
        this._element.forEach((item:SingleElement)=>{
            item.removeClass(_class);
        })
        return this;
    }
    serialize(): string {
        throw new Error('Method not implemented.');
    }
    isNotNull():boolean {
        throw new Error('Method not implemented.');
    }
    length():number{
        return this._element.length;
    }
    forEach(callback:FunctionCallBackTwoParam){
        this._element.forEach((item:SingleElement,index:number)=>{
            callback(item,index);
        })
    }
}
