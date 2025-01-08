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
        const targetUrl = `https://leetcode.com/graphql/`;
        try {
            searchButton.textContent = "Searching...";
            searchButton.setAttribute("aria-disabled", "true");
            statsContainer.classList.add("hidden");

            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            const graphql = JSON.stringify({
                query: `
                query userSessionProgress($username: String!) {
                    allQuestionsCount { difficulty count }
                    matchedUser(username: $username) {
                        submitStats {
                            acSubmissionNum { difficulty count }
                            totalSubmissionNum { difficulty count }
                        }
                    }
                }`,
                variables: { username }
            });

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: graphql,
                redirect: "follow"
            };

            const response = await fetch(targetUrl, requestOptions);
            if (!response.ok) {
                throw new Error("Unable to fetch user details.");
            }
            const parsedData = await response.json();
            if (!parsedData.data.matchedUser) {
                throw new Error("User not found.");
            }
            displayUserData(parsedData);
        } catch (error) {
            alert(`Error: ${error.message}`);
        } finally {
            searchButton.textContent = "Search";
            searchButton.removeAttribute("aria-disabled");
        }
    }

    function updateProgress(solved, total, label, circle) {
        const progressDegree = (solved / total) * 100;
        circle.style.setProperty("--progress-degree", `${progressDegree}%`);
        label.textContent = `${solved}/${total}`;
    }

    function displayUserData(parsedData) {
        const totalEasyQues = parsedData.data.allQuestionsCount.find(q => q.difficulty === "Easy")?.count || 0;
        const totalMediumQues = parsedData.data.allQuestionsCount.find(q => q.difficulty === "Medium")?.count || 0;
        const totalHardQues = parsedData.data.allQuestionsCount.find(q => q.difficulty === "Hard")?.count || 0;

        const solvedEasyQues = parsedData.data.matchedUser.submitStats.acSubmissionNum.find(q => q.difficulty === "Easy")?.count || 0;
        const solvedMediumQues = parsedData.data.matchedUser.submitStats.acSubmissionNum.find(q => q.difficulty === "Medium")?.count || 0;
        const solvedHardQues = parsedData.data.matchedUser.submitStats.acSubmissionNum.find(q => q.difficulty === "Hard")?.count || 0;

        updateProgress(solvedEasyQues, totalEasyQues, easyLabel, easyProgressCircle);
        updateProgress(solvedMediumQues, totalMediumQues, mediumLabel, mediumProgressCircle);
        updateProgress(solvedHardQues, totalHardQues, hardLabel, hardProgressCircle);

        const cardsData = [
            { label: "Overall Submissions", value: parsedData.data.matchedUser.submitStats.totalSubmissionNum.reduce((sum, q) => sum + q.count, 0) || 0 },
            { label: "Easy Submissions", value: solvedEasyQues },
            { label: "Medium Submissions", value: solvedMediumQues },
            { label: "Hard Submissions", value: solvedHardQues }
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
