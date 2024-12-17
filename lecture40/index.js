//map in practice
let arr =[10, 3, 5, 6, 9, 75, 20, 30, 50];
function addvalue(arr){
    let sum=0;
arr.forEach((value)=>{
sum=sum+value;
})
return sum;
}
let totalsum=addvalue(arr);

console.log(totalsum);



