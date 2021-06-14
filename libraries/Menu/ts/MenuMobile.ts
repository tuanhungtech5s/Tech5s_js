import { Element } from "../../../ts/Element";
import { Query } from "../../../ts/Query";

export class MenuMobile{
    private options:any={
        mainMenu:'.main-menu',
        menuMobile:'.sp-menu',
        menuMobileContent:'nav.sp-menu-content',
        buttonShowMenu:'.btn-sp-menu',
        overLayMenu:'.over-lay-menu',
        animateIconMenu:'.animated-icon-menu',
        buttonDropDown:'.btn-dropdown-menu'

        

    };
    protected mainMenu 	  :Element;	
    protected spMenu 		  :Element;
    protected spMenuContent :Element;
    protected btnShowMenu	  :Element;
    protected overLayMenu	  :Element;
    protected animateIconMenu:Element;
    constructor(options:object={}){
        this.options = Query.extend(this.options,options);
        this.mainMenu =  Query.create(this.options.mainMenu);
        this.spMenu =  Query.create(this.options.menuMobile);
        this.spMenuContent =  Query.create(this.options.menuMobileContent);
        this.btnShowMenu =  Query.create(this.options.buttonShowMenu);
        this.overLayMenu =  Query.create(this.options.overLayMenu);
        this.animateIconMenu =  Query.create(this.options.animateIconMenu);
        this.appendMenuMobile();
        this.initEvent();
        this.initDropDown();
    }
    public static create(options:object = {}){
        return new MenuMobile(options);
    }

    private appendMenuMobile():void{
        var contentSpMenu = this.mainMenu.find(':scope > ul').item(0).clone();
        this.spMenuContent.append(contentSpMenu);
    }
    private initEvent():void{
        let self = this;
        this.btnShowMenu.onClick(function(event) {
            self.animateIconMenu.toggleClass('open');
            self.spMenu.toggleClass('active');
            self.overLayMenu.toggleClass('active');
        });
        this.overLayMenu.onClick(function(event) {
            Query.create(this).removeClass('active');
            self.spMenu.removeClass('active');
            self.animateIconMenu.removeClass('open');
        });
    }
    private initDropDown():void{
        let self = this;
        var listItemLi = this.spMenuContent.find('li');
        listItemLi.forEach( function(element, index) {
            if (element.find(':scope > ul').length() > 0) {
                element.append(`<div class="${self.options.buttonDropDown.replace('.','')}"><i class="fa fa-angle-right" aria-hidden="true"></i></div>`);
            }
        });
        var listBtnDropdownMenu = this.spMenu.find(this.options.buttonDropDown);
        var timeSlide = 300;
        if(listBtnDropdownMenu.length()<=0) return;
        listBtnDropdownMenu.onClick(function(event) {
            var _this = Query.create(this);
            _this.css('pointer-events','none');
            setTimeout(function(){ 
                _this.css('pointer-events','all');
            }, timeSlide);
            var parentLi = Query.create(this.closest('li'));
            var listUlChild = parentLi.find(':scope > ul');
            parentLi.toggleClass('show');
            _this.toggleClass('open');
            listUlChild.toggleSlide(timeSlide);
        });
    }

}