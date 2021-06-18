import { Element } from "../../../ts/Element";
import { Query } from "../../../ts/Query";

export class FixedMiddleMenu{
    /* Cài đặt chế độ menu */
    private options = {
        hideOnScrollDown : true,
        delayShowOnScrollTop: 25, /* Delay hiển thị khi scroll top. Áp dụng khi hideOnScrollDown = true */
        minOffsetHideMenu:500,
        classMenuWrapper:'.mini-menu',
        classMenuCover:'.mini-menu-cover',
        classMenuInShow:'in-menu-show',
        classMenuInHide:'in-menu-hide',
    };
    private lastScrollTop:number = 0;
    private miniMenuCover:Element;
    private miniMenu:Element;
    private miniMenurHeight:number;
    constructor(options:object = {}){
        this.options = Query.extend(this.options,options);
        this.miniMenu = Query.create(this.options.classMenuWrapper);
        this.miniMenurHeight = this.miniMenu.outerHeight();
        this.miniMenuCover 	= Query.create(this.options.classMenuCover);
        this.miniMenuCover.css('height',this.miniMenuCover+'px');
        this.init();
    }
    public static create(options:object = {}){
        return new FixedMiddleMenu(options);
    }
    showMenu(){
        if (!this.miniMenu.hasClass(this.options.classMenuInShow)) {
            this.miniMenu.css('top','0px');
            this.miniMenu.addClass(this.options.classMenuInShow);
            this.miniMenu.removeClass(this.options.classMenuInHide);
        }
    };
    hideMenu(){
        if (!this.miniMenu.hasClass(this.options.classMenuInHide)) {
            this.miniMenu.css('top','-'+this.miniMenurHeight+'px');
            this.miniMenu.addClass(this.options.classMenuInHide);
            this.miniMenu.removeClass(this.options.classMenuInShow);
        }
    };
    init(){
        let self = this;
        Query.create(window).on("scroll", function(){
            var currentScrollTop = Query.getScrollTop();
            let top = (self.miniMenuCover.offset() as any).top;
            if (currentScrollTop > top) {
                self.miniMenu.addClass('fixed');
            }else {
                self.miniMenu.removeClass('fixed');
            }
            if (self.options.hideOnScrollDown) {
                var heightCheckShow = top + self.miniMenurHeight+ self.options.minOffsetHideMenu;
                   if (currentScrollTop > self.lastScrollTop){
                       if (currentScrollTop > heightCheckShow) {
                           self.hideMenu();
                       }
                   } else {
                       if (self.options.delayShowOnScrollTop > 0) {
                           if ((0 - self.options.delayShowOnScrollTop) > ScrollSpeedTester.estimate()) {
                               self.showMenu();
                           }
                       }else{
                           self.showMenu();
                       }
                   }
                   if (currentScrollTop <= heightCheckShow) {
                       self.showMenu();
                   }
                   self.lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
            }
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