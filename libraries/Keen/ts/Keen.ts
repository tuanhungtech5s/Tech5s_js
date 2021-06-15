import { Query } from "../../../ts/Query";
declare var KeenSlider:any;
// import "./../js/keen-slider.js";
class SubFunction{
    private functionName:string;

    
    constructor(functionName:string){
        this.functionName = functionName;
    }
    private isWindowFunction(fnc:any){
        return window[fnc]!=undefined && typeof window[fnc] === 'function';
    }

    public static isWindowObject(obj:any){
        return window[obj]!=undefined && typeof window[obj] == 'object';
    }
    execute(instance:any){
        if(this.functionName == null){
            return;
        }
        let temp = this.functionName.split('.');
        if(temp.length==1){
			let fnc:any = temp[0];
			if(this.isWindowFunction(fnc)){
                let tmp:any = (window[fnc]);
                tmp(instance);
			}
		}
        else if(temp.length==2){
			var obj:any = temp[0];
			var fnc:any = temp[1];
            if(SubFunction.isWindowObject(obj)){
                if(window[obj][fnc]!=undefined && typeof window[obj][fnc] === 'function'){
                    let tmp:any = (window[obj][fnc]);
                    tmp(instance);
				}
            }
		}
    }
    static callSubFunction(functionName:string,instance:any):void{
        let subFunction = new SubFunction(functionName);
        subFunction.execute(instance);
	}

}
export class Keen {
    private methods = ['afterChange','beforeChange','mounted','created','slideChanged','dragEnd','dragStart','move','destroyed'];
    private booleanAttributes = ['centered','controls','loop','resetSlide','rtl','rubberband','vertical'];
    
    constructor(options: object = {}) {

    }
    public create(){
        let keens = Query.create('[tech5s-keen]');
        for (let index = 0; index < keens.length(); index++) {
            const element = keens.item(index);
            let id = element.attr('id');
            if(id ==null){
                console.warn('Keen Slider required id to create slider');
                continue;
            }
            let options = element.tech5s();
            let extensions:any={};
            for (const [key, value] of Object.entries(options)) {
                if(this.methods.indexOf(key)!=-1){
                    options[key] = function(instance:any){
                        let fncName:string = value as unknown as string;
                        SubFunction.callSubFunction(fncName,{instance:instance,id:id});
                    }
                }
                else if(this.booleanAttributes.indexOf(key)!=-1){
                    options[key] = Boolean(JSON.parse(value as string));
                }
                else if(key=="breakpoints"){
                    options[key] =this.stringToObject(value as string);
                }
                else if(key=="slides"){
                    let tmp:any = (value as string);
                    if(!isNaN(tmp)){
                        options[key] = 4;
                    }
                }
                else if(key=="extensions"){
                    extensions = this.stringToObject(value as string);
                }
            }
            options = this.executeExtensions(extensions,options,id);

            this.initSlider(id,options);
        }

    }
    private stringToObject(str:string){
        let tmp = str.replace(/\n/g, "");
        return JSON.parse(tmp);
    }
    private executeExtensions(extensions:Array<any>,options:any,id:any){
        let moreOptions:any = {
            'created':[],
            'slideChanged':[],
            'afterChange':[],
            'beforeChange':[],
            'mounted':[],
            'dragEnd':[],
            'dragStart':[],
            'move':[],
            'destroyed':[]
        };
        const self = this;
        for (const [extension, options] of Object.entries(extensions)) {
            if(SubFunction.isWindowObject(extension)){
                let objExtension:any = window[extension as any][extension as any];
                let ins = objExtension.getInstance(options);
                for (let i = 0; i < self.methods.length; i++) {
                    const optionName = self.methods[i];
                    if(typeof ins[optionName] === "function"){
                        moreOptions[optionName].push(ins[optionName]);   
                    }
                    
                }
            }
        }
        const cloneOptions = {...options};
        this.methods.forEach(function(method:any){
            options[method] = function(instance:any){
                let oldFnc:any = cloneOptions[method];
                if(typeof oldFnc == "function") oldFnc(instance);
                let exts = moreOptions[method];
                for (let i = 0; i < exts.length; i++) {
                    const moreFnc = exts[i];
                    moreFnc({instance:instance,id:id});
                }
            }
        });

        return options;
    }
    public initSlider(htmlElementId:any,options:any):void{
        let keenId:any = `keen_${htmlElementId}`;
        window[keenId] = new KeenSlider(`#${htmlElementId}`,options);
    }
}
