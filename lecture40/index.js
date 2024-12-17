//map in practice
let arr=[10,20,30,40,50,6]
function addnum(arr){
    let sum=0;
    arr.forEach((value)=>{
         sum=sum+value;
    })
    return sum;
}
let totalsum= addnum(arr)
console.log(totalsum);




