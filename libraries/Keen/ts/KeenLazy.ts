import { Query } from "../../../ts/Query";

export class KeenLazy{
    private options:any={
        slideImage:'.lazy__slide img',
    };
    private loaded:any=[];
    constructor(options:object){
        this.options = Query.extend(this.options,options);
    }
    afterChange(params:any){
        let id = params.id;
        let instance = params.instance;
        var parent = Query.create(`#${id}`).parent();
        
        const slideIdx = instance.details().relativeSlide;
        let elements = parent.find(this.options.slideImage);
        if(!this.loaded[id]) this.loaded[id] = [];
        this.loaded[id][slideIdx] = true;
        elements.forEach((element, idx) => {
           if(this.loaded[id][idx]){
                element.attr("src", element.attr('data-src'));
           }
        });
    }

    public static getInstance(options:object){
        let nav = new KeenLazy(options);
       
        return {
            afterChange:function(params:any){
                nav.afterChange(params)
            }
        }
    }
}