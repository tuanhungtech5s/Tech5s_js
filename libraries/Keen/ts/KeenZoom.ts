import { Query } from "../../../ts/Query";

export class KeenZoom{
    private options:any={
        slideItem:'.zoom-out__slide',
    };
    private loaded:any=[];
    constructor(options:object){
        this.options = Query.extend(this.options,options);
    }
    move(params:any){
        let id = params.id;
        let instance = params.instance;
        var parent = Query.create(`#${id}`).parent();
        let elements = parent.find(this.options.slideItem);
        elements.forEach((element, idx) => {
            this.moveElement(element, idx, instance.details())
        })
    }

    moveElement(element:any, idx:any, details:any) {
        var position = details.positions[idx]
        var x = details.widthOrHeight * position.distance
        var scale_size = 0.7
        var scale = 1 - (scale_size - scale_size * position.portion)
        var style = `translate3d(${x}px, 0px, 0px) scale(${scale})`
        element._element.style.transform = style
        element._element.style["-webkit-transform"] = style
    }

    public static getInstance(options:object){
        let nav = new KeenZoom(options);
       
        return {
            move:function(params:any){
                nav.move(params)
            }
        }
    }
}