
import {Element, FunctionCallBack} from '../../../ts/Element'
import {Query} from '../../../ts/Query'
import { SingleElement } from '../../../ts/SingleElement';
import * as Toast from '../../Common/ts/main';
class SubFunction{
    private functionName:string;
    private form:SingleElement;
    private _hasDefault:boolean = false;
    
    public set hasDefault(v : boolean) {
        this._hasDefault = v;
    }
    
    public get hasDefault() : boolean {
        return this._hasDefault;
    }
    
    
    constructor(functionName:string,form:SingleElement){
        this.functionName = functionName;
        this.form = form;
    }
    private isWindowFunction(fnc:any){
        return window[fnc]!=undefined && typeof window[fnc] === 'function';
    }
    private callDefaultFunction(response:any){
        if(!this.hasDefault) return ;
        response = JSON.parse(response);
        if(response.code!=undefined && response.code ==200){
            Toast.success(response.message);
            if(this.form.isNotNull()){
                this.form._element.reset();
            }
        }
        else if(response.code!=undefined && response.code ==100){
            Toast.error(response.message);
        }
    }
    private isWindowObject(obj:any){
        return window[obj]!=undefined && typeof window[obj] == 'object';
    }
    execute(response:any){
        if(this.functionName == null){
            this.callDefaultFunction(response);
            return;
        }
        let temp = this.functionName.split('.');
        if(temp.length==1){
			let fnc:any = temp[0];
			if(this.isWindowFunction(fnc)){
                let tmp:any = (window[fnc]);
                tmp(response);
			}
            else{
                this.callDefaultFunction(response);
            }
		}
        else if(temp.length==2){
			var obj:any = temp[0];
			var fnc:any = temp[1];
            if(this.isWindowObject(obj)){
                if(window[obj][fnc]!=undefined && typeof window[obj][fnc] === 'function'){
                    let tmp:any = (window[obj][fnc]);
                    tmp(response);
				}
            }
		}
    }

}
class ValidateInput{
    protected input:SingleElement;
    private tagName:string;
    protected value:string;
    constructor(input:SingleElement){
        this.input = input;
        this.tagName = input._element.tagName.toLowerCase();
        this.value = this.input.val().trim();
    }
    static create(input:SingleElement):ValidateInput{
        let tagName = input._element.tagName.toLowerCase();
        if(tagName=='file'){
            return new ValidateInputFile(input);
        }
        else if(tagName =='checkbox'){
            return new ValidateInputCheckbox(input);
        }
        else if(tagName =='select'){
            return new ValidateInputSelect(input);
        }
        else{
            return new ValidateInput(input);
        }
    }
    static removeAllMessaegError(form:Element):void{
        form.find('.validate_error').remove();
    }
    addMessageError(item:Element,message:string,type?:string):void{
        this.removeMessageError(item,type);
        item.after(`<div class="validate_error ${type}" style="color:red"><span>${message}</span></div>`);
    }
    removeMessageError(item:Element,type?:string):void{
        let addClass = type!=undefined ? '.'+type:'';
        item.parent().find('.validate_error'+addClass).remove();
    }
    
    validateRequired(){
        return this.value != '';
    }
    validateRegex(){
        let strRegex = this.input.tech5s('regex') as string;
        let regex =  new RegExp(strRegex);
        if(strRegex==null){
            return true;
        }
        else if(strRegex == 'email'){
            regex = /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/;
        }
        else if(strRegex == 'number'){
            regex = /^[0-9]+$/;
        }
        else if(strRegex =='date'){
            regex = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;
        }
        return regex.test(this.value);
        
    }
    validate(){

        let required =  this.validateRequired();
        
        let regex =  this.validateRegex();
        if(!required){
            let text:any = this.input.tech5s('required');
            if(text==null) text =  'Vui lòng nhập thông tin '+this.input.attr('name');
            this.addMessageError(this.input,text,'required');
        }
        else{
            if(!regex){
                let text:any = this.input.tech5s('text-regex');
                if(text==null) text =  'Vui lòng nhập đúng định dạng '+this.input.attr('name');
                this.addMessageError(this.input,text,'regex');
            }
        }
        return required && regex;
    }
}
class ValidateInputCheckbox extends ValidateInput{
    validateRequired(){
        return this.input._element.checked;
    }
}
class ValidateInputSelect extends ValidateInput{
    validateRequired(){
        let emptyValue = this.input.tech5s('empty-value') || "";
        return this.value != emptyValue;
    }
}
class ValidateInputFile extends ValidateInput{
    validateRequired(){
        return this.input._element.checked;
    }
}
export class Ajax{
    private _forms:Element;

    constructor(selector:string = 'form[tech5s-ajax-form]'){
        this._forms = Query.create(selector);
    }
    static callSubFunction(functionName:string,response:any,form:SingleElement,hasDefault:boolean = false):void{
        let subFunction = new SubFunction(functionName,form);
        subFunction.hasDefault = hasDefault;
        subFunction.execute(response);
	}
    static help(){
        
    }
    
    onChange(item:Element){
        let self = this;
        // item.onClick(function(){
        //     self.removeMessageError(item);
        // })
    }
    validate(form:SingleElement):boolean{
        var inputRequires = form.find('[tech5s-required]');
        let result = true;
        ValidateInput.removeAllMessaegError(form);
        if(inputRequires.length()>0){
            for (var i = 0; i < inputRequires.length(); i++) {
                let item:SingleElement = inputRequires.item(i) as SingleElement;
                let itemResult = ValidateInput.create(item).validate();
                result = result && itemResult;
                
            }
        }
        return result;
	};
    public execute():void{
        let _self = this;
        this._forms.forEach(function(item,index){
            var clearErrorOnClick = item.find('[tech5s-clear-error-on-click]');
            clearErrorOnClick.forEach(function(input:any){
                _self.onChange(input);
            });
            item.on('submit',function(e:any){
                e.preventDefault();
                if(!_self.validate(item)) return;
                let success:any = item.tech5s('ajax-success') ;
                let error:any = item.tech5s('ajax-error');
                let always:any = item.tech5s('ajax-always');
                let method:string = item.attr('method') || 'GET';
                let action:string = item.attr('action') || '';
                Query.ajax({
                    url:action,
                    method:method,
                    body:item.formData(),
                    success: function(res:any){
                        Ajax.callSubFunction(success,res,item,true);
                    },
                    fail:function(res:any){
                        Ajax.callSubFunction(error,res,item,true);
                    },
                    always:function(res:any){
                        Ajax.callSubFunction(always,res,item);
                    }
                });
            })
        });
    }
    
    
}