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
        statsContainer.classList.add("hidden");
    //    const responce =await fetch(url); //updated code
   const proxyUrl ='https://cors-anywhere.herokuapp.com/'
    const targeturl=`https://https:leetcode.com/graph/`;

    const myHeaders=new Headers();
    myHeaders.append("content-type","application/json");

    const graphql = JSON.stringify({

        query:"\n   query userSessionProgress($username: String!) {\n allQuestionsCount {\n  difficulty\n count\n }\n matchedUser(username: $username) {\n  submitStats {\n  acSubmissionNum { \n  difficulty\n  count\n   submission\n } \n  totalSubmissionNum {\n    difficulty\n count\n    submission\n  }\n  }\n }\n }\n   ",
              
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
       const parsedData =await responce.json();
       console.log("Logging data: ",parsedData);
       displayUserData(parsedData);
    }
    catch(error){
        statsContainer.innerHTML=<p>${Error.message}</p>
    }
    finally{
        searchButton.textContent ="Search";
        searchButton.ariaDisabled=false;
    }
    function updateProgress(solved,total,label,circle){
            const progressDegree =(solved/total)*100;
           circle.style.setProperty("--progress-degree",`${progressDegree}%`)
           label.textContent = `${solved}/${total}`;
    }
    function displayUserData(parsedData){
        
        const totalQues = parsedData.data.allQuestionsCount[0].count;
        const totalEasyQues = parsedData.data.allQuestionsCount[1].count;
    const totalMediumQues = parsedData.data.allQuestionsCount[2].count;
    const totalHardQues = parsedData.data.allQuestionsCount[3].count;
   

   const solvedTotalQues = parsedData.data.matchedUser.submitStats.acSubmissionNum[0].cout;
   acSubmissionNum[0].cout;
   const solvedEasyQues = parsedData.data.allQuestionsCount[0].count;
   acSubmissionNum[1].cout;
   const solvedTotalMediumQues = parsedData.data.allQuestionsCount[0].count;
   acSubmissionNum[2].cout;
   const solvedTotalHardQues = parsedData.data.allQuestionsCount[0].count;
   acSubmissionNum[3].cout;

        updateProgress(solvedTotalEasyQues,totalEasyQues,easyLabel,easyProgress);
        updateProgress(solvedTotalMediumQues,totalMediumQues,MediumLabel,mediumProgressCircle);

        updateProgress(solvedTotalHardQues,totalHardQues,HardLabel,HaedProgressCircle);
const cardData =[
{label:"Overall Submissions",value:parsedData.data.matchedUser.submitStats.totalSubmissionNum[0].submissions},
{label:"Overall EasySubmissions",value:parsedData.data.matchedUser.submitStats.totalSubmissionNum[1].submissions},
{label:"Overall MediumSubmissions",value:parsedData.data.matchedUser.submitStats.totalSubmissionNum[2].submissions},
{label:"Overall HardSubmissions",value:parsedData.data.matchedUser.submitStats.totalSubmissionNum[3].submissions},
];

cardStatsContainer.innerHTML = cardsData.map(
    data =>
    `<div class="card">
     <h4>${data.label}</h4>
     <p>${data.value}</p>
    </div>`
).join("")
    }
searchButton.addEventListener('click',function(){
    const username=usernameInput.value;
console.log("logggin username :",username);
if(validateUsername(username)){
fetchUerDetails(username);
}
})