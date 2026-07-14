// ==========================================
// Football Maker v1.0
// Storage System
// ==========================================

const STORAGE = {

    load(key){

        const data = localStorage.getItem(key);

        if(data){

            return JSON.parse(data);

        }

        return [];

    },

    save(key,data){

        localStorage.setItem(

            key,

            JSON.stringify(data)

        );

    }

};

const TEAM_STORAGE="footballMakerTeams";
const LEAGUE_STORAGE="footballMakerLeagues";
const TOURNAMENT_STORAGE="footballMakerTournaments";
const TABLE_STORAGE = "footballMakerTables";