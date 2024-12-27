function textchange(){
    let fpara=document.getElementById('mypara');
    fpara.textContent="hello ji";
}

let fpara=document.getElementById('mypara');
fpara.addEventListener('click',textchange);