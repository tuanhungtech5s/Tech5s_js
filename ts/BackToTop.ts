import { Query } from "./Query";

interface Option{
    threshold:number,
    classShow:string,
    classHidden:string,
    isDemo:boolean
}
export class BackToTop{
    private _target:string;
    private _defaultConfig:Option={
        'threshold':300,
        'classShow':'show',
        'classHidden':'hidden',
        'isDemo':false,
    };
    private _element:any;
    
    public get target() : string {
        return this._target;
    }
    
    public set target(v : string) {
        this.target = v;
    }

    constructor(target:string = '.back-to-top',configs:object = {}){
        this._target = target;
        this._defaultConfig = {...this._defaultConfig,...configs};
        this._element = Query.create(target);
        if(this._defaultConfig.isDemo){
            Query.create('body').height(10000);
        }
        if(this._element.isNotNull()){
            this.initScroll();
        }
    }
    
    private initScroll():void{
        let _self = this;
        Query.create(document).on('scroll',function(e){
            let top =  Query.getScrollTop();
            let configs = _self._defaultConfig;
            if(top>_self._defaultConfig.threshold){
                _self._element.removeClass(configs.classHidden).addClass(configs.classShow);
            }
            else{
                _self._element.removeClass(configs.classShow).addClass(configs.classHidden);
            }
        })
        _self._element.on('click',function(e:any){
            e.preventDefault();
            Query.scrollTo();
        })
    }
    
    
}
export function create(target:string = '.back-to-top',configs:object = {}){
    return new BackToTop(target,configs);
}
export function help():void{
    console.log(`Sử dụng BackToTop.create('Selector đến nút backtotop, mặc định là .back-to-top', 
    {
        threshold:Ngưỡng độ cao bắt đầu hiển thị nút,
        classShow:class add vào khi vượt ngưỡng,
        classHidden: class add vào khi nhỏ hơn ngưỡng,
        isDemo: true sẽ set height body = 10000
    })`);
}