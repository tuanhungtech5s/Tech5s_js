import { Query } from "./Query"

const $ = function(selector:any){
    return  Query.create(selector);
}
export {$,Query};