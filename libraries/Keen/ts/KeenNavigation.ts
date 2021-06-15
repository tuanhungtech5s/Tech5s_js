import { Element } from "../../../ts/Element";
import { Query } from "../../../ts/Query";

export class KeenNavigation{
    private options:any={
        hasArrow:true,
        hasDot:true,
        arrowLeft:'.arrow-left',
        arrowRight:'.arrow-right',
        dotWrapper:'.dots',
        slideItem:'.keen-slider__slide',
        dotClass:'dot',
        dotClassActive:'dot--active',
        arrowDisabled:'arrow--disabled',
    };
    private arrowLeft:Element;
    private arrowRight:Element;
    constructor(options:object){
        this.options = Query.extend(this.options,options);
        
    }
    created(params:any) {
        let id = params.id;
        let instance = params.instance;
        var parent = Query.create(`#${id}`).parent();
        if(this.options.hasArrow){
            this.arrowLeft = parent.find(this.options.arrowLeft);
            this.arrowRight = parent.find(this.options.arrowRight);
            
            this.arrowLeft.onClick(function(e){
                instance.prev();
            });
            this.arrowRight.onClick(function(e){
                instance.next();
            });
        }
        if(this.options.hasDot){
            this.createDots(parent,instance);
            this.updateClasses(parent,instance)
        }
        
    }
    private createDots(parent:any,instance:any){
        let self = this;
        var dots_wrapper:Element = parent.find(this.options.dotWrapper);
        var slides = parent.find(this.options.slideItem);
        slides.forEach(function (slide:any, idx:any) {
            dots_wrapper.append(`<button data-index="${idx}" class=${self.options.dotClass}>${idx}</button>`);
        })
        dots_wrapper.find(`.${self.options.dotClass}`).onClick(function(e){
            instance.moveToSlide(Query.create(e.target).attr('data-index'));
        });
    }
    private updateClasses(parent:any,instance:any) {
        if(!this.options.hasDot){
            return;
        }
        let self = this;
        var slide = instance.details().relativeSlide;
        slide===0?this.arrowLeft.addClass(this.options.arrowDisabled):this.arrowLeft.removeClass(this.options.arrowDisabled);
        slide === instance.details().size - 1?this.arrowRight.addClass(this.options.arrowDisabled):this.arrowRight.removeClass(this.options.arrowDisabled);
    
        var dots = parent.find(`.${this.options.dotClass}`);
        dots.forEach(function (dot:any, idx:any) {
          idx === slide
            ? dot.addClass(self.options.dotClassActive)
            : dot.removeClass(self.options.dotClassActive)
        })
      }
    slideChanged(params:any) {
        let id = params.id;
        let instance = params.instance;
        var parent = Query.create(`#${id}`).parent();
        this.arrowLeft = parent.find(this.options.arrowLeft);
        this.arrowRight = parent.find(this.options.arrowRight);
        this.updateClasses(parent,instance);
    }
    public static getInstance(options:object){
        let nav = new KeenNavigation(options);
        return {
            created:function(params:any){
                nav.created(params)
            },
            slideChanged:function(params:any){
                nav.slideChanged(params);
            },
        }
    }
}