import { Query } from "../../../ts/Query";
import { FixedMenu } from "./FixedMenu";
import { MenuMobile } from "./MenuMobile";
import { SearchMenu } from "./SearchMenu";

export class Tech5sMenu{
    private isDebug:boolean;
    constructor(isDebug:boolean =true){
        this.isDebug = isDebug;
        if(isDebug){
           console.warn('Tech5s Menu Developed By Toanhtv & convert to libray by Hungvt - Tech5s');
        }
    }
    createFixedMenu(options:object={}):FixedMenu{
        return FixedMenu.create(options);
    }
    createMenuMobile(options:object={}):MenuMobile{
        return MenuMobile.create(options);
    }
    createSearchMenu(options:object={}):SearchMenu{
        return SearchMenu.create(options);
    }

    static quickCreate(isDebug:boolean =true,options:any={}):void{
        let optionsDefault:any={fixedMenu:{},searchMenu:{},menuMobile:{}};
        options = Query.extend(optionsDefault,options);

        let menu = new Tech5sMenu(isDebug);
        if(options.fixedMenu){
            menu.createFixedMenu(options.fixedMenu);
        }
        if(options.searchMenu){
            menu.createSearchMenu(options.searchMenu);
        }
        if(options.menuMobile){
            menu.createMenuMobile(options.menuMobile);
        }
    }

}