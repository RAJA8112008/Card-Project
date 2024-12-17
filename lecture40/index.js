//map in practice
let arr=[1,2,3,4,5,6]
function addnum(arr){
let sum=0;
arr.forEach((value)=>{
sum=sum+value;
})
return sum;
}
let totalsum=addnum(arr);
console.log(totalsum);



