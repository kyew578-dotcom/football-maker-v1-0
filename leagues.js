// ======================================
// Football Maker v1.0
// League Manager
// ======================================

let teams = STORAGE.load(TEAM_STORAGE);
let leagues = STORAGE.load(LEAGUE_STORAGE);

const teamSelection = document.getElementById("teamSelection");
const leagueContainer = document.getElementById("leagueContainer");

const leagueName = document.getElementById("leagueName");
const leagueCountry = document.getElementById("leagueCountry");
const leagueLogo = document.getElementById("leagueLogo");

const createLeague = document.getElementById("createLeague");

// ----------------------------
// Show all teams as checkboxes
// ----------------------------

function loadTeamSelection() {

    teamSelection.innerHTML = "";

    if (teams.length === 0) {

        teamSelection.innerHTML =
            "<p>Create some teams first.</p>";

        return;

    }

    teams.forEach((team, index) => {

        teamSelection.innerHTML += `

        <label style="display:block;margin:8px 0;">

            <input
                type="checkbox"
                value="${index}">

            ${team.name}

        </label>

        `;

    });

}

// ----------------------------
// Save leagues
// ----------------------------

function saveLeagues(){

    STORAGE.save(LEAGUE_STORAGE, leagues);

}

// ----------------------------
// Display leagues
// ----------------------------

function displayLeagues(){

    leagueContainer.innerHTML="";

    if(leagues.length===0){

        leagueContainer.innerHTML="<p>No leagues created.</p>";

        return;

    }

    leagues.forEach((league,index)=>{

        const card=document.createElement("div");

        card.className="teamCard";

        card.innerHTML=`

            <img src="${league.logo}">

            <h3>${league.name}</h3>

            <p>${league.country}</p>

            <p>${league.teams.length} Teams</p>

            <button
                class="deleteButton"
                onclick="deleteLeague(${index})">

                Delete

            </button>

        `;

        leagueContainer.appendChild(card);

    });

}

// ----------------------------
// Delete league
// ----------------------------

function deleteLeague(index){

    if(confirm("Delete this league?")){

        leagues.splice(index,1);

        saveLeagues();

        displayLeagues();

    }

}

// ----------------------------
// Create league
// ----------------------------

createLeague.onclick=function(){

    if(leagueName.value.trim()===""){

        alert("Enter a league name.");

        return;

    }

    const selected=[];

    document
        .querySelectorAll("#teamSelection input:checked")
        .forEach(box=>{

            selected.push(
                teams[box.value]
            );

        });

    if(selected.length<2){

        alert("Select at least 2 teams.");

        return;

    }

    const file=leagueLogo.files[0];

    if(!file){

        alert("Choose a league logo.");

        return;

    }

    const reader=new FileReader();

    reader.onload=function(e){

        leagues.push({

            name:leagueName.value,

            country:leagueCountry.value,

            logo:e.target.result,

            teams:selected

        });

        saveLeagues();

        displayLeagues();

        leagueName.value="";
        leagueCountry.value="";
        leagueLogo.value="";

        document
            .querySelectorAll("#teamSelection input")
            .forEach(box=>box.checked=false);

    };

    reader.readAsDataURL(file);

};

// ----------------------------

loadTeamSelection();

displayLeagues();