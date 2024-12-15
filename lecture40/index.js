 let arr=[10,20,30,40]
 function getsum(arr){
    let sum=0;
    arr.forEach((value)=>{
        sum=sum+value;
});
return sum;
 }
let totalsum=getsum(arr);
console.log(totalsum);
 
