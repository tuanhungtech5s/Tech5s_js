import { Query } from "../../../ts/Query";

export class KeenFader{
    private options:any={
        slideItem:'.fader__slide',
    };
    constructor(options:object){
        this.options = Query.extend(this.options,options);
        
    }
    move(params:any){
        let id = params.id;
        let instance = params.instance;
        var opacities = instance.details().positions.map((slide:any) => slide.portion)
        var parent = Query.create(`#${id}`).parent();
        let elements = parent.find(this.options.slideItem);
        elements.forEach((element, idx) => {
            element.css('opacity', opacities[idx]);
        })
    }
    public static getInstance(options:object){
        let nav = new KeenFader(options);
       
        return {
            move:function(params:any){
                nav.move(params)
            }
        }
    }
}