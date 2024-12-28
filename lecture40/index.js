
let mypara = document.querySelectorAll('p');
function alertpara(event){
alert("Here is your alert information");
}
for(let i=0; i< mypara.length;i++){
    console.log("Event Listener added");
   mypara[i].addEventListener('click',alertpara);
}
