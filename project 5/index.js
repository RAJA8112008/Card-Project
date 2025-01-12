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
        const isMatching = regex.test(username);
        if (!isMatching) {
            alert("Invalid Username");
        }
        return isMatching;
    }

    async function fetchUserDetails(username) {
        const targetUrl = `https://leetcode.com/graphql/`;
        try {
            searchButton.innerHTML = '<div class="loader"></div>'; // Show loader
            searchButton.setAttribute("aria-disabled", "true");
            statsContainer.classList.add("hidden");

            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            const graphql = JSON.stringify({
                query: `
                    query userSessionProgress($username: String!) {
                        allQuestionsCount {
                            difficulty
                            count
                        }
                        matchedUser(username: $username) {
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
                    }
                `,
                variables: { username: username }
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
            displayUserData(parsedData);
        } catch (error) {
            statsContainer.textContent = `Error: ${error.message}`;
        } finally {
            searchButton.innerHTML = "Search"; // Revert button to original text
            searchButton.removeAttribute("aria-disabled");
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

        const cardsData = [
            { label: "Overall Submissions", value: parsedData.data.matchedUser.submitStats.totalSubmissionNum.reduce((sum, q) => sum + q.count, 0) },
            { label: "Easy Submissions", value: parsedData.data.matchedUser.submitStats.totalSubmissionNum.find(q => q.difficulty === "Easy").count },
            { label: "Medium Submissions", value: parsedData.data.matchedUser.submitStats.totalSubmissionNum.find(q => q.difficulty === "Medium").count },
            { label: "Hard Submissions", value: parsedData.data.matchedUser.submitStats.totalSubmissionNum.find(q => q.difficulty === "Hard").count },
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
