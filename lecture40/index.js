 let paras=document.querySelectorAll('p');
 function alertpara(event){
    alert("you are here");
 }
 for(let i=0;i<paraslength;i++){
    let paras=paras[i];
    console.log("eventlisteneradded");
    paras.addeventlisner('click here');
 }