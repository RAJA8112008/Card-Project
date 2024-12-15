let arr=[20,50,60,60,58]
function numsum(){
    let sum=0;
    arr.forEach((value)=>{
        sum=sum+value;
    })
    return sum;
}
let totalsum=numsum();
console.log(totalsum);