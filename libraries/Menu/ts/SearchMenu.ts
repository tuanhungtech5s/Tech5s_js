import { Element } from "../../../ts/Element";
import { Query } from "../../../ts/Query";
import { NOT_FOUND } from "../../../ts/SingleElement";

export class SearchMenu{
    private options:any = {
        fullContent: true, /* Chỉ để true khi đã dung menu fixed. */
        contentTagertSelector: '.header-content',
        buttonShowSearch:'.btn-show-search',
        buttonDoSearch:'.btn-do-search',
        buttonCloseSearch:'.btn-close-search',
        formSearch:'.form-search-header',
        inputSearch:'input[type=text]',
        typeShowSearch:'overlay'
    };
    private contentTagert:Element;
    private offSetContentTagert:any;
    private buttonShowSearch:Element;
    private formSearch:Element;
    private inputSearch:Element;
    constructor(options:object={}){
        this.options = Query.extend(this.options,options);
        this.contentTagert = Query.create(this.options.contentTagertSelector);
        this.offSetContentTagert = this.contentTagert.offset();
        this.buttonShowSearch = Query.create(this.options.buttonShowSearch);
        this.formSearch = Query.create(this.options.formSearch);
        this.inputSearch   = this.formSearch.find(this.options.inputSearch);
        this.initButtonClick();
        this.initClickOut();
    }
    public static create(options:object = {}){
        return new SearchMenu(options);
    }
    private hasFullContent(){
        return this.options.fullContent &&  this.contentTagert.isNotNull();
    }
    private resetPositionFormSearch():void{
        if (!this.hasFullContent()) return;
        if(this.formSearch.hasClass('active')){
            this.formSearch.css('top',this.offSetContentTagert.top+`px`);
        }else {
            this.formSearch.css('top',(this.offSetContentTagert.top-this.contentTagert.height())+`px`);
        }
    };
    private initButtonClick():void{
        let self = this;
        this.buttonShowSearch.onClick(function(event) {
            self.buttonShowSearch.toggleClass('active');
            if(self.hasFullContent()){
                var	btnDoSearch   = self.formSearch.find(self.options.buttonDoSearch);
                if (btnDoSearch.length() > 0) {
                    btnDoSearch.remove();
                }
                var	btnCloseSearch   = self.formSearch.find(self.options.buttonCloseSearch);
                if (btnCloseSearch.length() == NOT_FOUND) {
                    self.formSearch.append(`<button class="smooth ${self.options.buttonCloseSearch.replace('.','')} d-flex justify-content-center align-items-center" type="button">
                                        <div class="icon-close"></div>
                                    </button>`);
                }
                self.formSearch.css('position','fixed');
                self.formSearch.css('top',(self.offSetContentTagert.top-self.contentTagert.height())+`px`);
                self.formSearch.css('left',self.offSetContentTagert.left+`px`);
                self.formSearch.css('width',self.contentTagert.width()+`px`);
                self.formSearch.css('height',self.contentTagert.height()+`px`);
               
                
            }
            self.formSearch.addClass('have-transition');
            self.formSearch.toggleClass('active');
            self.resetPositionFormSearch();
            setTimeout(function(){ 
                self.inputSearch._element.focus(); 
            }, 500);
        });
    }
    private initClickOut():void{
        let self = this;
        Query.create(document).onClick(function(event) {
            let target = event.target;
            var insideBtnShowSearch = target.closest(self.options.buttonShowSearch);
            var insideFormSearch = target.closest(self.options.formSearch);
            var insideCloseSearch = target.closest(self.options.buttonCloseSearch);
            if ((!insideBtnShowSearch && !insideFormSearch) || insideCloseSearch) {
                self.buttonShowSearch.removeClass('active');
                self.formSearch.removeClass('active');
                self.resetPositionFormSearch();
            }
        });
    }
}

var moduleSearch = function(){


    

 

    
   
}