import {Element, FunctionCallBack, FunctionCallBackTwoParam} from './Element';
export abstract class BaseElement implements Element{
    _element: any;
    isExist: boolean;
    constructor(element:any){
        this._element = element;
    }
    
    public get element() : any {
        return this._element;
    }


    abstract item(index:number):Element;
    
    abstract text(text?:string): string;
    abstract val(html?:string): string;
    abstract html(html?:string): string;
    abstract outerHtml(): string;
    abstract css(key:any,value:string):Element;
    abstract removeCss(key:string):Element;;


    abstract find(childSelector:string):Element;
    abstract onClick(callback: FunctionCallBack): void;
    abstract addClass(_class: string): Element;
    abstract removeClass(_class: string): Element;
    abstract toggleClass(_class: string): Element;
    abstract hasClass(_class:string):boolean;

    abstract on(eventName:string,callback:FunctionCallBack):void;
    abstract off(eventName:string,callback:FunctionCallBack):void;

    abstract index():number;

    abstract fadeIn(time:number):void;
    abstract fadeOut(time:number):void;
    abstract slideUp(time:number):void;
    abstract slideDown(time:number):void;
    abstract toggleSlide(time:number):void;
    abstract hide():void;
    abstract show():void;



    abstract append(element:any):void;
    abstract prepend(element:any):void;
    abstract before(element:any):void;
    abstract after(element:any):void;
    abstract next():Element;
    abstract prev():Element;
    abstract parent():Element;
    abstract closest(selector:string):Element;

    abstract clone():Element;
    abstract remove():void;
    abstract empty():void;

    abstract attr(key:string,value?:string|number):string;
    abstract tech5s(key?:string,value?:string|number):string|Array<string>|any;

    abstract removeAttribute(key:string):Element;
    abstract height(height?:any,unit?:string):number;
    abstract outerHeight():number;
    abstract width(width?:any,unit?:string):number;
    abstract outerWidth():number;
    abstract offset():object;
    abstract position():object;

    abstract trigger(eventName:string):void;
    
    abstract serialize():string;


    abstract isNotNull():boolean;

    abstract length():number;

    abstract forEach(callback:FunctionCallBackTwoParam):void;

}  


