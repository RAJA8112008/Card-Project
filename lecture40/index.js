let paras = document.querySelectorAll('p');

function alertPara(event) {
    alert("You are here: " );
}

for (let i = 0; i < paras.length; i++) {
    console.log("Event listener added");
    paras[i].addEventListener('click', alertPara); // Corrected method and usage
}
