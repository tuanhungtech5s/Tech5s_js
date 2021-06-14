
export type FunctionCallBack = (e: any) => any;
export type FunctionCallBackTwoParam = (e:any,i: any) => any;
export type FunctionCallBackNoParam = () => any;
export interface List{
    
}

export interface Element{
    _element:any;
    text(text?:string): string;
    html(html?:string): string;
    val(html?:string): string;
    outerHtml(): string;
    css(key:any,value:string):Element;
    removeCss(key:string):Element;

    find(childSelector:string):Element;
    
    addClass(_class: string): Element;
    removeClass(_class: string): Element;
    hasClass(_class:string):boolean;
    toggleClass(_class:string):Element;

    onClick(callback: FunctionCallBack): void;
    on(eventName:string,callback:FunctionCallBack):void;
    off(eventName:string,callback:FunctionCallBack):void;
    



    index():number;
    fadeIn(time:number):void;
    fadeOut(time:number):void;
    slideUp(time:number):void;
    slideDown(time:number):void;
    toggleSlide(time:number):void;
    hide():void;
    show():void;


    


    item(index:number):Element;

    append(element:any):void;
    prepend(element:any):void;
    before(element:any):void;
    after(element:any):void;
    next():Element;
    prev():Element;
    parent():Element;
    closest(selector:string):Element;


    clone():Element;
    remove():void;
    empty():void;


    attr(key:string,value?:string|number):string;
    tech5s(key?:string,value?:string|number):string|Array<string>|any;
    removeAttribute(key:string):Element;
    height(height?:any,unit?:string):number;
    outerHeight():number;
    outerWidth():number;
    width(width?:any,unit?:string):number;
    offset():object;
    position():object;

    //event
    trigger(eventName:string):void;
    serialize():string;

    isNotNull():boolean;
    length():number;
    forEach(callback:FunctionCallBackTwoParam):void;
}
