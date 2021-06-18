import { Element } from "../../../ts/Element";
import { Query } from "../../../ts/Query";

export class FixedMenu{
    private options:any = {
        hideOnScrollDown : true,
        delayShowOnScrollTop: 35, /* Delay hiển thị khi scroll top. Áp dụng khi hideOnScrollDown = true */
        classMenuInShow : 'in-menu-show',
		classMenuInHide : 'in-menu-hide',
		classMenuIsTop : 'is-top',
        classMenuWrapper:'.header',
        onScroll:null
    };
    private header:Element;
    private body:Element;
    private headerHeight:number = 0;
    private lastScrollTop:number = 0;
    constructor(options:object = {}){
        this.options = Query.extend(this.options,options);
        this.header = Query.create(this.options.classMenuWrapper);
        this.body = Query.create('body');
        this.headerHeight = this.header.outerHeight();
        this.init();
    }
    public static create(options:object = {}){
        return new FixedMenu(options);
    }
    private init():void{
		this.body.css('padding-top',this.headerHeight+`px`);
		this.header.addClass('fixed');
        this.initScroll();
    }
    public showHeader(isTop:boolean= false):void{
        if (!this.body.hasClass(this.options.classMenuInShow) && !this.header.hasClass(this.options.classMenuInShow)) {
            this.body.css('padding-top',this.headerHeight+`px`);
            this.header.css('top','0px');
            this.header
            .addClass(this.options.classMenuInShow)
            .removeClass(this.options.classMenuInHide);
            this.body
            .addClass(this.options.classMenuInShow)
            .removeClass(this.options.classMenuInHide);
            if(isTop){
                this.header.addClass(this.options.classMenuIsTop);
            }
            else{
                this.header.removeClass(this.options.classMenuIsTop);
            }
        }
    }
	public hideHeader():void{
        if (!this.body.hasClass(this.options.classMenuInHide) && !this.header.hasClass(this.options.classMenuInHide)) {
            let headerHeight = this.header.outerHeight();
            this.body.css('padding-top','0px');
            this.header.css('top',`-`+headerHeight+`px`);
            this.header.addClass(this.options.classMenuInHide);
            this.header.removeClass(this.options.classMenuInShow);
            this.body.addClass(this.options.classMenuInHide);
            this.body.removeClass(this.options.classMenuInShow);
            
        }
    };
    
    private initScroll(){
        if(!this.options.hideOnScrollDown) return;
		
        let self = this;
        let fncScroll = this.options.onScroll;
        Query.create(window).on("scroll", function(){
            var currentScrollTop = Query.getScrollTop();
            if (currentScrollTop > self.lastScrollTop){
                if(fncScroll!=null){
                    fncScroll({lastScrollTop:self.lastScrollTop,headerHeight:self.headerHeight,type:'hide'})
                }
                if (self.lastScrollTop > self.headerHeight) {
                    self.hideHeader();
                }
            } else {
                let delayShowOnScrollTop = self.options.delayShowOnScrollTop;
                if((delayShowOnScrollTop >0 && (0-delayShowOnScrollTop)>ScrollSpeedTester.estimate() ) || delayShowOnScrollTop<=0)
                {
                    self.showHeader();
                    if(fncScroll!=null){
                        fncScroll({lastScrollTop:self.lastScrollTop,headerHeight:self.headerHeight,type:'show'})
                    }
                }
            }
            if (self.lastScrollTop <= self.headerHeight) {
                self.showHeader(true);
                if(fncScroll!=null){
                    fncScroll({lastScrollTop:self.lastScrollTop,headerHeight:self.headerHeight,type:'show_top'})
                }
            }
            self.lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
        });
    }
    
}
class ScrollSpeedTester{
    protected static lastPosition:number = null;
    protected static delta:number = 0;
    protected static timer:any;

    static clear():void {
        ScrollSpeedTester.lastPosition = null;
        ScrollSpeedTester.delta = 0;
    }
    static estimate(delay:number = 100):number{
        let newPos:number;
        newPos = window.scrollY;
        if ( ScrollSpeedTester.lastPosition != null ){
            ScrollSpeedTester.delta  = newPos -  ScrollSpeedTester.lastPosition ;
        }
        ScrollSpeedTester.lastPosition = newPos;
        clearTimeout(ScrollSpeedTester.timer);
        ScrollSpeedTester.timer = setTimeout(ScrollSpeedTester.clear, delay);
        return ScrollSpeedTester.delta;
    }
}