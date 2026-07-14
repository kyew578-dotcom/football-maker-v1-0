const teams = STORAGE.load(TEAM_STORAGE);

const leagues = STORAGE.load(LEAGUE_STORAGE);

const fixtures = STORAGE.load("footballMakerFixtures");

document.getElementById("teamCount").textContent = teams.length;

document.getElementById("leagueCount").textContent = leagues.length;

document.getElementById("fixtureCount").textContent = fixtures.length;