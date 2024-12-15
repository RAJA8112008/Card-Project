let arr=[10,20,60,80,90]
function sumnum(arr){
    let sum=0;
    arr.forEach((value)=>{
        sum=sum+value;
    })
    return sum;}
 let totalsum=sumnum(arr);
console.log(totalsum);