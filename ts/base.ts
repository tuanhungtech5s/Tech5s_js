module Tech5s{
    type FunctionCallBack = (e: any) => any;
    export class Base{
        private _selector:string;
        private _element:any;
        private _isList:boolean = false;

        constructor(selector:any){
            this._selector = selector;
            let nodelists = document.querySelectorAll(this._selector);
            let tmps = Array(nodelists);
            if(tmps.length==0){
                this._element = tmps[0];
            }
            else{
                this._element = tmps;
                this._isList = true;
            }          
        }
        

        public onClick(callback:FunctionCallBack):void{
            if(this._isList){
                this._element.forEach((item:any) => {
                    item.addEventListener('click',callback);
                });
            }
            else{
                this._element.addEventListener('click',callback);
            }
        }
        public find(child:string):any{
            if(!this._isList){

            }
        }
        public static addClass(element:HTMLElement,_class:string){
            element.classList.add(_class);
        }
        public static removeClass(element:HTMLElement,_class:string){
            element.classList.remove(_class);
        }
        public addClass(_class:string):this{
            if(this._isList){
                this._element.forEach((item:any) => {
                    Base.addClass(item,_class);
                });
            }
            else{
                Base.addClass(this._element,_class);
            }
            return this;
        }
        public removeClass(_class:string):this{
            if(this._isList){
                this._element.forEach((item:any) => {
                    Base.removeClass(item,_class);
                });
            }
            else{
                Base.removeClass(this._element,_class);
            }
            return this;
        }
    }
}
// export default $;
// var body = new Tech5s.Base('body');
// body.onClick(function(e){
// })



// var a = new $('a');
// a.addClass('hello').removeClass('test').onClick(function(e){
//     e.preventDefault();
//     alert(1);
// });