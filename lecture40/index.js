function greetme(greet,fullname){
    console.log("hello",fullname);
    greet();
}
function greet(){
    console.log("greetingforme")
}
greetme(greet,"Babbar");