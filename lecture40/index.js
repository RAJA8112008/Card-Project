
let input=document.getElementById('inputbox');
let button=document.querySelectorAll('button');
let string=" ";
let arr=Array.from(button =>{
    button.addEventListner('click', (e)=>{
        if(e.target.innerHTML== '='){
            string=eval(string);
            input.value=string;
        }
        string += e.target.innerHTML;
        input.value = string;
    })
} )