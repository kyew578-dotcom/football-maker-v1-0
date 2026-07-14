const leagues = STORAGE.load(LEAGUE_STORAGE);

let fixtures = STORAGE.load("footballMakerFixtures");

const fixtureStorage = "footballMakerFixtures";

const leagueSelect = document.getElementById("leagueSelect");
const fixtureList = document.getElementById("fixtureList");
const generateButton = document.getElementById("generateFixtures");
const simulateButton = document.getElementById("simulateSeason");

function saveFixtures(){

    STORAGE.save(fixtureStorage,fixtures);

}

function loadLeagues(){

    leagueSelect.innerHTML="<option>Select League</option>";

    leagues.forEach((league,index)=>{

        leagueSelect.innerHTML+=`
        <option value="${index}">
        ${league.name}
        </option>
        `;

    });

}

function displayFixtures(){

    fixtureList.innerHTML="";

    fixtures.forEach(match=>{

        fixtureList.innerHTML+=`

        <div class="card">

        <h3>

        ${match.home}

        ${match.homeGoals ?? "-"}

        -

        ${match.awayGoals ?? "-"}

        ${match.away}

        </h3>

        </div>

        `;

    });

}
// ======================================
// MATCH SIMULATION
// ======================================

generateButton.onclick = function () {

    fixtures = [];

    const league = leagues[leagueSelect.value];

    if (!league) {

        alert("Choose a league.");

        return;

    }

    const teams = league.teams;

    for (let i = 0; i < teams.length; i++) {

        for (let j = i + 1; j < teams.length; j++) {

            fixtures.push({

                home: teams[i].name,
                away: teams[j].name,
                homeStrength: teams[i].strength,
                awayStrength: teams[j].strength,
                played: false

            });

            fixtures.push({

                home: teams[j].name,
                away: teams[i].name,
                homeStrength: teams[j].strength,
                awayStrength: teams[i].strength,
                played: false

            });

        }

    }

    saveFixtures();

    displayFixtures();

    alert("Fixtures Generated!");

};
function updateLeagueTable(league, match) {

    if (!league.table) return;

    const home = league.table.find(
        t => t.name === match.home
    );

    const away = league.table.find(
        t => t.name === match.away
    );

    if (!home || !away) return;

    home.played++;
    away.played++;

    home.gf += match.homeGoals;
    home.ga += match.awayGoals;

    away.gf += match.awayGoals;
    away.ga += match.homeGoals;

    home.gd = home.gf - home.ga;
    away.gd = away.gf - away.ga;

    if (match.homeGoals > match.awayGoals) {

        home.won++;
        away.lost++;

        home.points += 3;

    }

    else if (match.homeGoals < match.awayGoals) {

        away.won++;
        home.lost++;

        away.points += 3;

    }

    else {

        home.drawn++;
        away.drawn++;

        home.points++;
        away.points++;

    }

}
simulateButton.onclick = function () {
updateLeagueTable(league, match);

    if (fixtures.length === 0) {

        alert("Generate fixtures first.");

        return;

    }

    fixtures.forEach(match => {

        if (match.played) return;

        let homeGoals = Math.floor(Math.random() * 4);

        let awayGoals = Math.floor(Math.random() * 4);

        const difference = match.homeStrength - match.awayStrength;

        if (difference > 15) {

            homeGoals++;

        }

        if (difference > 30) {

            homeGoals++;

        }

        if (difference < -15) {

            awayGoals++;

        }

        if (difference < -30) {

            awayGoals++;

        }

        match.homeGoals = homeGoals;

        match.awayGoals = awayGoals;

        match.played = true;

    });

    saveFixtures();

    displayFixtures();

    alert("Season Simulated!");
STORAGE.save(LEAGUE_STORAGE, leagues);

};