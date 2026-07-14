const leagues = STORAGE.load(LEAGUE_STORAGE);

const leagueSelect = document.getElementById("leagueSelect");
const tableBody = document.getElementById("tableBody");

leagues.forEach((league,index)=>{

    leagueSelect.innerHTML+=`
        <option value="${index}">
            ${league.name}
        </option>
    `;

});

leagueSelect.onchange=function(){

    const league=leagues[this.value];

    if(!league) return;

    if(!league.table){

        league.table=[];

        league.teams.forEach(team=>{

            league.table.push({

                name:team.name,

                badge:team.badge,

                played:0,
                won:0,
                drawn:0,
                lost:0,
                gf:0,
                ga:0,
                gd:0,
                points:0

            });

        });

        STORAGE.save(LEAGUE_STORAGE,leagues);

    }

    drawTable(league.table);

};

function drawTable(table){

    tableBody.innerHTML="";

    table.sort((a,b)=>{

        if(b.points!==a.points)
            return b.points-a.points;

        if(b.gd!==a.gd)
            return b.gd-a.gd;

        return b.gf-a.gf;

    });

    table.forEach((club,index)=>{

        tableBody.innerHTML+=`

<tr>

<td>${index+1}</td>

<td>${club.name}</td>

<td>${club.played}</td>

<td>${club.won}</td>

<td>${club.drawn}</td>

<td>${club.lost}</td>

<td>${club.gf}</td>

<td>${club.ga}</td>

<td>${club.gd}</td>

<td>${club.points}</td>

</tr>

`;

    });

}