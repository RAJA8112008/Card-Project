let king=document.querySelectorAll('p');
function alertevent(event){
   alert("you are here");
    
}
for(let i=0;i<king.length;i++){
    console.log("Event listener Added");
    king[i].addEventListener('click',alertevent);
}
