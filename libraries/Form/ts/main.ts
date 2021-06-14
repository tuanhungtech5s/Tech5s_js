
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
        if(typeof response == 'string'){
            try {
                response = JSON.parse(response);
            } catch (error) {
                response = false;
                console.error(error);
            }
        }
        if(!response) {
            return;
        }
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
    protected keyRequired = 'required';
    protected keyRegex = 'text-regex';
    constructor(input:SingleElement){
        this.input = input;
        this.tagName = input._element.tagName.toLowerCase();
        this.value = this.input.val().trim();
    }
    static create(input:SingleElement):ValidateInput{
        let tagName = input._element.tagName.toLowerCase();
        
        if(tagName=='input'){
            let type = input.attr('type')
            type = type==null?'text':type.toLowerCase();
            if(type=='file'){
                return new ValidateInputFile(input);
            }
            else if(type =='checkbox'){
                return new ValidateInputCheckbox(input);
            }
            else{
                return new ValidateInput(input);
            }
        }
        else{
            if(tagName =='select'){
                return new ValidateInputSelect(input);
            }
        }
        
    }
    static removeAllMessaegError(form:Element):void{
        form.find('.validate_error').remove();
    }
    static addMessageError(item:Element,message:string,type?:string):void{
        ValidateInput.removeMessageError(item,type);
        item.after(`<div class="validate_error ${type}" style="color:red"><span>${message}</span></div>`);
    }
    static removeMessageError(item:Element,type?:string):void{
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
            let text:any = this.input.tech5s(this.keyRequired);
            if(text==null) text =  'Vui lòng nhập thông tin '+this.input.attr('name');
            ValidateInput.addMessageError(this.input,text,'required');
        }
        else{
            if(!regex){
                let text:any = this.input.tech5s(this.keyRegex);
                if(text==null) text =  'Vui lòng nhập đúng định dạng '+this.input.attr('name');
                ValidateInput.addMessageError(this.input,text,'regex');
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
    validateNumberFile(){
        this.keyRegex = 'max-file-error';
        let max:number = this.input.tech5s('max-file') as unknown as number;
        return this.input._element.files.length <= max;
    }

    validateSizeFile(){
        this.keyRegex = 'max-size-error';
        let max:number = this.input.tech5s('max-size') as unknown as number;
        let files = this.input._element.files;
        if (files.length > 0) {
            for (let i = 0; i <= files.length - 1; i++) {
                const fsize = files.item(i).size;
                const file = Math.round((fsize / 1024));
                if (file >= max) {
                    return false;
                }
            }
        }
        return true;
    }
    validateTypeFile(){
        this.keyRegex = 'file-types-error';
        let type:string = this.input.tech5s('file-types') as string;
        let types = type.split(',');
        let files = this.input._element.files;
        if (files.length > 0) {
            for (let i = 0; i <= files.length - 1; i++) {
                let extension = this.value.substring(this.value.lastIndexOf('.') + 1).toLowerCase();
                if (types.indexOf(extension) <= -1) {  
                    return false;
                }
            }
        }
        return true;
    }
  
    validateRegex(){
        return this.validateTypeFile() && this.validateNumberFile() && this.validateSizeFile();
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
    
    onChange(form:Element){
        var clearErrorOnClick = form.find('[tech5s-clear-error-on-click]');
        clearErrorOnClick.forEach(function(input:Element){
            input.onClick(function(){
                ValidateInput.removeMessageError(input);
            })
        });
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
    private getImageLoading():string{
        return `<img style="height: 24px;" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBzdHlsZT0ibWFyZ2luOiBhdXRvOyBiYWNrZ3JvdW5kOiBub25lOyBkaXNwbGF5OiBibG9jazsgc2hhcGUtcmVuZGVyaW5nOiBhdXRvOyIgd2lkdGg9IjY0cHgiIGhlaWdodD0iNjRweCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaWRZTWlkIj4KPGNpcmNsZSBjeD0iNTAiIGN5PSI1MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjYzVjNWM1IiBzdHJva2Utd2lkdGg9IjciIHI9IjQ0IiBzdHJva2UtZGFzaGFycmF5PSIyMDcuMzQ1MTE1MTM2OTI2MzIgNzEuMTE1MDM4Mzc4OTc1NDQiPgogIDxhbmltYXRlVHJhbnNmb3JtIGF0dHJpYnV0ZU5hbWU9InRyYW5zZm9ybSIgdHlwZT0icm90YXRlIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgZHVyPSIwLjU1ODY1OTIxNzg3NzA5NDlzIiB2YWx1ZXM9IjAgNTAgNTA7MzYwIDUwIDUwIiBrZXlUaW1lcz0iMDsxIj48L2FuaW1hdGVUcmFuc2Zvcm0+CjwvY2lyY2xlPgo8IS0tIFtsZGlvXSBnZW5lcmF0ZWQgYnkgaHR0cHM6Ly9sb2FkaW5nLmlvLyAtLT48L3N2Zz4=" />`;
    }
    private disableButtonSubmit(form:Element,isLoading:boolean=false):void{
        let _self = this;
        let buttons:Element = form.find('button[type=submit]');
        buttons.forEach(function(item:Element,index:number){
            if(isLoading){
                item.attr('data-old-text',item.html());
                item.html(_self.getImageLoading());
                item.attr('disabled','true');
                item.css('cursor','wait');
            }
            else{
                item.html(item.attr('data-old-text'));
                item.removeAttribute('disabled');
                item.css('cursor','');
                item.removeAttribute('data-old-text');
            }
            
        })
    }
    public execute():void{
        let _self = this;
        this._forms.forEach(function(item,index){
            _self.onChange(item);
            item.on('submit',function(e:any){
                e.preventDefault();
                if(!_self.validate(item)) return;
                let countFile = item.find('[type=file]').length()>0;
                let before:any = item.tech5s('ajax-before') ;
                let success:any = item.tech5s('ajax-success') ;
                let error:any = item.tech5s('ajax-error');
                let always:any = item.tech5s('ajax-always');
                let method:string = item.attr('method') || 'GET';
                let action:string = item.attr('action') || '';
                let contentType= countFile?false:item.tech5s('content-type') ;
                Ajax.callSubFunction(before,'',item,false);
                _self.disableButtonSubmit(item,true);
                Query.ajax({
                    url:action,
                    method:method,
                    body:item.formData(),
                    contentType:contentType,
                    success: function(res:any){
                        Ajax.callSubFunction(success,res,item,true);
                    },
                    fail:function(res:any){
                        Ajax.callSubFunction(error,res,item,true);
                    },
                    always:function(res:any){
                        Ajax.callSubFunction(always,res,item);
                        _self.disableButtonSubmit(item,false);
                        
                    }
                });
            })
        });
    }
    
    
}