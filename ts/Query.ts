import {BaseElement} from './BaseElement';
import {SingleElement} from './SingleElement';
import {ListElement} from './ListElement';
import {List,FunctionCallBack,Element, FunctionCallBackNoParam} from './Element';

interface DOMEvent<T extends EventTarget> extends Event {
    readonly target: T
}

export class Query{
    static ajaxGlobalHeader:object= {'x-requested-with':'XMLHttpRequest'};
    static ajaxGlobalParams:object= {};
    static ajaxGlobalStartFunction:FunctionCallBackNoParam;
    static ajaxGlobalCompleteFunction:FunctionCallBackNoParam;
    static create(selector:any):Element{
        let nodelists= selector;
        if (typeof selector === "string") {
            nodelists = document.querySelectorAll(selector);
            let tmps = Array.prototype.slice.call(nodelists);
            if(tmps.length==1){
                return new SingleElement(tmps[0]);
            }
            else{
                if(tmps.length>0)
                {
                    return new ListElement(tmps);
                }
            }
            return new ListElement(nodelists);
        }
        else{
            return new SingleElement(selector); ;
        }
    }
    static on(eventName:string,elementSelector:string,callback:FunctionCallBack):void{
        document.addEventListener(eventName, function(e:DOMEvent<HTMLElement>) {
            for (var target = (e.target); target && target != this; target = target.parentNode as HTMLElement) {
                if (target.matches(elementSelector)) {
                    callback(e);
                    break;
                }
            }
        }, false);
    }
    static type(obj:any){
        return Object.prototype.toString.call(obj).replace(/^\[object (.+)\]$/, '$1').toLowerCase();
    }
    static extend(defaults:any,...maps:Array<any>):any {
        let out = {...defaults} || {};
        for (var i = 0; i < maps.length; i++) {
          var obj = maps[i];
          if (!obj)
            continue;
      
          for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                
              if (typeof obj[key] === 'object'){
                if(obj[key] instanceof Array == true)
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
      };
    static ready(callback:FunctionCallBackNoParam):void{
        if (document.readyState != 'loading'){
            callback();
        } else {
            document.addEventListener('DOMContentLoaded', callback);
        }
    }
    static ajaxHeader(config:object={}):void{
        Query.ajaxGlobalHeader = Query.extend(Query.ajaxGlobalHeader,config);
    }
    static ajaxSetup(config:object={}):void{
        Query.ajaxGlobalParams = Query.extend(Query.ajaxGlobalParams,config);
    }
    static ajaxStart(callback:FunctionCallBackNoParam){
        Query.ajaxGlobalStartFunction = callback;
    }
    static ajaxComplete(callback:FunctionCallBackNoParam){
        Query.ajaxGlobalCompleteFunction = callback;
    }
    static ajaxHelp(){
        console.log(`
            Hàm ajax: Tham số nhận vào là đối tượng
            {
                success:function gọi khi thành công,
                fail: function gọi khi error,
                always: function gọi khi kết thúc dù thành công hay thất bại,
                body: dữ liệu truyền đi dạng đối tượng {name:'tech',age:4}, sẽ merge với dữ liệu qua ajaxSetup
                method: GET|POST...,
                url: Url gửi request,
                headers: header dạng object {}, tham số này sẽ merge với header setup qua ajaxHeader,
                global: true, mặc định true, sẽ chịu ảnh hưởng của hàm ajaxStart và ajaxComplete
            }
            Sử dụng hàm _ajax nếu muốn dùng Promise
            Có thể setup hàm ajaxStart chạy trước mọi request, và ajaxComplete chạy sau mọi request
        `)
    }
    static ajax(obj:any){
        let global:boolean = obj.global !=undefined ?obj.global:true;
        if(Query.ajaxGlobalStartFunction && global){
            Query.ajaxGlobalStartFunction();
        }
        Query._ajax(obj).then(function(result){
            if(obj.success){
                obj.success(result);
            }
            if(obj.always){
                obj.always();
            }
            if(Query.ajaxGlobalCompleteFunction && global){
                Query.ajaxGlobalCompleteFunction();
            }
        }).catch(function(result){
            if(obj.fail){
                obj.fail(result);
            }
            if(obj.always){
                obj.always();
            }
            if(Query.ajaxGlobalCompleteFunction && global){
                Query.ajaxGlobalCompleteFunction();
            }
        })
    }
    static addParameterToURL(url:string,params:object){
        url += (url.split('?')[1] ? '&':'?') + new URLSearchParams(params as any).toString();
        return url;
    }
    private static getContentType(obj:any){
        let contentType:any = {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'};
        
        if(obj.contentType!=null){
            if(obj.contentType){
                contentType = {'Content-Type':obj.contentType};
            }
            else{
                contentType = {};
            }
        }
        return contentType;
    }
    static _ajax(obj:any){
        let params:any = obj.body as FormData || new FormData();
        var defaultParams:any = Query.ajaxGlobalParams as any;
        for ( var key in defaultParams ) {
            params.append(key, defaultParams[key]);
        }
        if((obj.contentType!=null && obj.contentType!=false) || (obj.contentType==null)){
            params = new URLSearchParams(params as any).toString();
        }
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            let method = obj.method || "GET";
            method = method.toUpperCase();
            if(method=='GET'){
                obj.url = Query.addParameterToURL(obj.url,params);
            }
            xhr.open(method, obj.url);
            let paramHeader = obj.headers || {};
            
            let headers = Query.extend(Query.ajaxGlobalHeader,paramHeader,Query.getContentType(obj));
            Object.keys(headers).forEach(key => {
                xhr.setRequestHeader(key, headers[key]);
            });
            xhr.onload = () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                    resolve(xhr.response);
                } else {
                    reject(xhr.statusText);
                }
            };
            xhr.onerror = () => reject(xhr.statusText);
            xhr.send(params);
        });
    };
    static getScrollTop():number{
        return document.documentElement.scrollTop || document.body.scrollTop;
    }
    static scrollTo(time:number =300, position:number=0):void{
        var currentPos = window.pageYOffset;
        let start:number = 0;
        window.requestAnimationFrame(function step(currentTime) {
            start = !start ? currentTime : start;
            var progress = currentTime - start;
            if (currentPos < position) {
                window.scrollTo(0, ((position - currentPos) * progress / time) + currentPos);
            } else {
                window.scrollTo(0, currentPos - ((currentPos - position) * progress / time));
            }
            if (progress < time) {
                window.requestAnimationFrame(step);
            } else {
                window.scrollTo(0, position);
            }
        });
    }
}