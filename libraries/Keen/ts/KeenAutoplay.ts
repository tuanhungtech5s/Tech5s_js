import { Query } from "../../../ts/Query";

export class KeenAutoplay{
    private options:any={
        time:2000,
    };
    private intervals:any;
    constructor(options:object){
        this.options = Query.extend(this.options,options);
    }
    dragStart(params:any){
        let id = params.id;
        let instance = params.instance;
        this.autoplay(false,id,instance)
    }
    dragEnd(params:any){
        let id = params.id;
        let instance = params.instance;
        this.autoplay(true,id,instance)
    }
    created(params:any){
        let id = params.id;
        let instance = params.instance;
        this.autoplay(true,id,instance)
    }
    autoplay(run:any,id:any,slider:any) {
        clearInterval(this.intervals)
        this.intervals = setInterval(() => {
          if (run && slider) {
            slider.next()
          }
        }, this.options.time)
      }

    public static getInstance(options:object){
        let nav = new KeenAutoplay(options);
        return {
            dragStart:function(params:any){
                nav.dragStart(params)
            }
            ,
            dragEnd:function(params:any){
                nav.dragEnd(params)
            },
            created:function(params:any){
                nav.created(params)
            }
        }
    }
}