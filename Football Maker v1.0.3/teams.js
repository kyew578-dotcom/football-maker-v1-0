// ======================================
// Football Maker v1.0
// Team Manager - Stage 1
// ======================================

let teams = STORAGE.load(TEAM_STORAGE);

// Elements
const createButton = document.getElementById("createTeam");
const container = document.getElementById("teamContainer");

const nameInput = document.getElementById("teamName");
const stadiumInput = document.getElementById("stadiumName");
const countryInput = document.getElementById("country");
const strengthInput = document.getElementById("strength");
const strengthValue = document.getElementById("strengthValue");
const primaryInput = document.getElementById("primaryColour");
const secondaryInput = document.getElementById("secondaryColour");
const budgetInput = document.getElementById("budget");
const badgeInput = document.getElementById("badge");

// Live strength number
strengthInput.oninput = function () {
    strengthValue.textContent = strengthInput.value;
};

// Save teams
function saveTeams() {
    STORAGE.save(TEAM_STORAGE, teams);
}

// Draw teams
function displayTeams() {

    container.innerHTML = "";

    if (teams.length === 0) {

        container.innerHTML =
            "<p>No teams have been created yet.</p>";

        return;
    }

    teams.forEach(team => {

        const card = document.createElement("div");

        card.className = "teamCard";

        card.innerHTML = `

        <img src="${team.badge}" alt="Badge">

        <h3>${team.name}</h3>

        <p><strong>Country</strong><br>${team.country}</p>

        <p><strong>Stadium</strong><br>${team.stadium}</p>

        <p><strong>Strength</strong><br>${team.strength}</p>

        <p><strong>Budget</strong><br>£${Number(team.budget).toLocaleString()}</p>

        <div style="
            display:flex;
            justify-content:center;
            gap:8px;
            margin-top:10px;
        ">

            <div style="
                width:25px;
                height:25px;
                background:${team.primary};
                border-radius:50%;
                border:1px solid #000;
            "></div>

            <div style="
                width:25px;
                height:25px;
                background:${team.secondary};
                border-radius:50%;
                border:1px solid #000;
            "></div>

        </div>

        `;

        container.appendChild(card);

    });

}

// Create team
createButton.onclick = function () {

    if (nameInput.value.trim() === "") {

        alert("Enter a team name.");

        return;

    }

    const file = badgeInput.files[0];

    if (!file) {

        alert("Choose a team badge.");

        return;

    }

    const reader = new FileReader();

    reader.onload = function (e) {

        teams.push({

            name: nameInput.value,

            stadium: stadiumInput.value,

            country: countryInput.value,

            strength: Number(strengthInput.value),

            primary: primaryInput.value,

            secondary: secondaryInput.value,

            budget: budgetInput.value,

            badge: e.target.result

        });

        saveTeams();

        displayTeams();

        nameInput.value = "";
        stadiumInput.value = "";
        countryInput.value = "";
        budgetInput.value = "";
        badgeInput.value = "";
        strengthInput.value = 50;
        strengthValue.textContent = 50;

    };

    reader.readAsDataURL(file);

};

displayTeams();