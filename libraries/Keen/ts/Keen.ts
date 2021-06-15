import { Query } from "../../../ts/Query";
declare var KeenSlider:any;
import "./../js/keen-slider.js";
class SubFunction{
    private functionName:string;

    
    constructor(functionName:string){
        this.functionName = functionName;
    }
    private isWindowFunction(fnc:any){
        return window[fnc]!=undefined && typeof window[fnc] === 'function';
    }

    private isWindowObject(obj:any){
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
            if(this.isWindowObject(obj)){
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
            for (const [key, value] of Object.entries(options)) {
                if(this.methods.indexOf(key)!=-1){
                    options[key] = function(instance:any){
                        let fncName:string = value as unknown as string;
                        SubFunction.callSubFunction(fncName,instance);
                    }
                }
                else if(this.booleanAttributes.indexOf(key)!=-1){
                    options[key] = Boolean(JSON.parse(value as string));
                }
                else if(key=="breakpoints"){
                    // options[key] = JSON.parse(value as string);
                }
            }
            this.initSlider(id,options);
        }


    }
    public initSlider(htmlElementId:any,options:any):void{
        console.log(options);
        options= {
            loop: true,
            breakpoints: {
              '(min-width: 720px) and (max-width: 1000px)': {
                loop: false,
              },
            },
          };
          console.log(options);
        let keenId:any = `keen_${htmlElementId}`;
        window[keenId] = new KeenSlider(`#${htmlElementId}`,options);
    }
}
