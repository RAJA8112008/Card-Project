document.addEventListener( "DOMcontentLoaded",function(){


    const searchButton=document.getElementById("seach-btn");
    const usernameInput=document.getElementById("user-input");
    const statsContainer=document.querySelector(".stats-container");
    const easyProgressCircle=document.querySelector(".Easy-progress");
    const mediumProgressCircle=document.querySelector(".Medium-progress");

    const HardProgressCircle=document.querySelector(".Hard-progress");
    const easyLabel=document.getElementById("easy-label");
    const mediumLabel=document.getElementById("medium-label");
    const hardLabel=document.getElementById("hard-label");
    const cardStatsContainer=document.querySelector(".stats-cards");

function valideusername(username){
    if(username.trim()=== ""){
        alert("username should not be empty");
        return false;
    }
    const regex=/^[a-za-Z0-9_-]{1,15}$/;

    const isMatching=regex.text(username);
    if(!isMatching){
        alert("Invalid Username");
    }
    return isMatching;
}
async function fetchUerDetails(username){


    // const url =`https://leetcode-stats-api.herokuapp.com/${username}}`
    try{
        searchButton.textContent ="Searching...";
        searchButton.ariaDisabled=true;
    //    const responce =await fetch(url); //updated code
   const proxyUrl ='https://cors-anywhere.herokuapp.com/'
   
    const targeturl=`https://https:leetcode.com/graph/`;

    const myHeaders=new Headers();
    myHeaders.append("content-type","application/json");

    const graphql = JSON.stringify({

        query:"\n   queryuserSessionProgress($username: String!) {\n
            allQuestionsCount {\n  difficulty\n count\n}\n
            
            matchedUser(username: $username) {\n  submitStats {\n  acSubmissionNum 
                { \n  difficulty\n  count\n   submission\n 
                }
                \n  totalSubmissionNum {\n    difficulty\n
                  count\n    submission\n  }\n }\n }\n }\n   ",
              
          variables: { "username": `${username}` }
    })

    const requestOption={
        method: "POST",
        headers:myHeaders,
        body:graphql,
        redirect:"follow"
    };

    const response =await fetch(proxyUrl+targetUrl,requestOptions);
       if(!responce.ok){
        throw new Error("unable to fetch the user details");
       }
       const data =await responce.json();
       console.log("Logging data: ",data);
    }
    catch(error){
        statsContainer.innerHTML=<p>No data found</p>
    }
    finally{
        searchButton.textContent ="Search";
        searchButton.ariaDisabled=false;
    }
}
searchButton.addEventListener('click',function(){
    const username=usernameInput.value;
console.log("logggin username :",username);
if(validateUsername(username)){
fetchUerDetails(username);
}
})

})