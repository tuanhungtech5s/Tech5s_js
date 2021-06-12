export function success(message:string){
    let toastEx:any = 'Toastify';
    let toast:any = window[toastEx];
    if(typeof toast  === 'function'){
        toast({
            text: message,
            duration: 3000,
            close: true,
            gravity: "top",
            position: "right", 
            backgroundColor: "#029c46",
            stopOnFocus: true,
            }).showToast();
    }
}

export function error(message:string){
    let toastEx:any = 'Toastify';
    let toast:any = window[toastEx];
    if(typeof toast  === 'function'){
        toast({
            text: message,
            duration: 3000,
            close: true,
            gravity: "top",
            position: "right", 
            backgroundColor: "#ae0606",
            stopOnFocus: true,
            }).showToast();
    }
}