document.addEventListener("DOMContentLoaded", function () {
    const searchButton = document.getElementById("search-btn");
    const usernameInput = document.getElementById("user-input");
    const statsContainer = document.querySelector(".stats-container");
    const easyProgressCircle = document.querySelector(".easy-progress");
    const mediumProgressCircle = document.querySelector(".medium-progress");
    const hardProgressCircle = document.querySelector(".hard-progress");
    const easyLabel = document.getElementById("easy-label");
    const mediumLabel = document.getElementById("medium-label");
    const hardLabel = document.getElementById("hard-label");
    const cardStatsContainer = document.querySelector(".stats-cards");

    function validateUsername(username) {
        if (username.trim() === "") {
            alert("Username should not be empty.");
            return false;
        }
        const regex = /^[a-zA-Z0-9_-]{1,15}$/;
        if (!regex.test(username)) {
            alert("Invalid Username");
            return false;
        }
        return true;
    }

    async function fetchUserDetails(username) {
        try {
            console.log("Fetching data for:", username); // Debugging step
    
            searchButton.innerHTML = '<div class="loader"></div>';
            searchButton.setAttribute("disabled", "true");
            statsContainer.classList.add("hidden");
    
            const graphqlQuery = {
                query: `
                    query getUserProfile($username: String!) {
                        matchedUser(username: $username) {
                            username
                            submitStats {
                                acSubmissionNum {
                                    difficulty
                                    count
                                }
                                totalSubmissionNum {
                                    difficulty
                                    count
                                }
                            }
                        }
                        allQuestionsCount {
                            difficulty
                            count
                        }
                    }
                `,
                variables: { username }
            };
    
           const response = await fetch("https://corsproxy.io/?https://leetcode.com/graphql/", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(graphqlQuery)
});

    
            console.log("Response Status:", response.status); // Debugging step
            console.log("Response Headers:", response.headers); // Debugging step
    
            if (!response.ok) {
                throw new Error(`Error ${response.status}: Failed to fetch data from LeetCode.`);
            }
    
            const parsedData = await response.json();
            console.log("Parsed Data:", parsedData); // Debugging step
    
            if (!parsedData.data || !parsedData.data.matchedUser) {
                throw new Error("User not found on LeetCode.");
            }
    
            displayUserData(parsedData);
        } catch (error) {
            console.error("Fetch Error:", error); // Debugging step
            alert(error.message);
        } finally {
            searchButton.innerHTML = "Search";
            searchButton.removeAttribute("disabled");
        }
    }
    

    function updateProgress(solved, total, label, circle) {
        const progressDegree = (solved / total) * 100;
        circle.style.setProperty("--progress-degree", `${progressDegree}%`);
        label.textContent = `${solved}/${total}`;
    }

    function displayUserData(parsedData) {
        const totalEasyQues = parsedData.data.allQuestionsCount.find(q => q.difficulty === "Easy").count;
        const totalMediumQues = parsedData.data.allQuestionsCount.find(q => q.difficulty === "Medium").count;
        const totalHardQues = parsedData.data.allQuestionsCount.find(q => q.difficulty === "Hard").count;

        const solvedEasyQues = parsedData.data.matchedUser.submitStats.acSubmissionNum.find(q => q.difficulty === "Easy").count;
        const solvedMediumQues = parsedData.data.matchedUser.submitStats.acSubmissionNum.find(q => q.difficulty === "Medium").count;
        const solvedHardQues = parsedData.data.matchedUser.submitStats.acSubmissionNum.find(q => q.difficulty === "Hard").count;

        updateProgress(solvedEasyQues, totalEasyQues, easyLabel, easyProgressCircle);
        updateProgress(solvedMediumQues, totalMediumQues, mediumLabel, mediumProgressCircle);
        updateProgress(solvedHardQues, totalHardQues, hardLabel, hardProgressCircle);

        const stats = parsedData.data.matchedUser.submitStats.totalSubmissionNum;

        const cardsData = [
            { label: "Total Submissions", value: stats.reduce((sum, q) => sum + q.count, 0) },
            { label: "Easy Submissions", value: stats.find(q => q.difficulty === "Easy").count },
            { label: "Medium Submissions", value: stats.find(q => q.difficulty === "Medium").count },
            { label: "Hard Submissions", value: stats.find(q => q.difficulty === "Hard").count },
        ];

        cardStatsContainer.innerHTML = cardsData.map(data => `
            <div class="card">
                <h4>${data.label}</h4>
                <p>${data.value}</p>
            </div>
        `).join("");

        statsContainer.classList.remove("hidden");
    }

    searchButton.addEventListener("click", function () {
        const username = usernameInput.value;
        if (validateUsername(username)) {
            fetchUserDetails(username);
        }
    });
});
