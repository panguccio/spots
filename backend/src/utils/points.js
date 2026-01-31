const points = {
    football: [3, 0, 1],
    volleyball: [2, 0, 0],
    basketball: [2, 0, 0]
};

let computePoints = function (matches, win, lose, draw) {
    let teamsStats = {};
    for (const { team1Id, team2Id, points1, points2 } of matches) {
        if (points1 === undefined || points2 === undefined) continue;

        let createTeam = () => ({ played: 0, scored: 0, conceded: 0, points: 0 });

        if (!teamsStats[team1Id]) teamsStats[team1Id] = createTeam();
        if (!teamsStats[team2Id]) teamsStats[team2Id] = createTeam();

        teamsStats[team1Id].played = teamsStats[team1Id].played + 1;
        teamsStats[team2Id].played = teamsStats[team2Id].played + 1;

        teamsStats[team1Id].scored = teamsStats[team1Id].scored + points1;
        teamsStats[team2Id].scored = teamsStats[team2Id].scored + points2;

        teamsStats[team1Id].conceded = teamsStats[team1Id].conceded + points2;
        teamsStats[team2Id].conceded = teamsStats[team2Id].conceded + points1;

        let [p1, p2] = points1 > points2 ? [win, lose] : points1 < points2 ? [lose, win] : [draw, draw];
        teamsStats[team1Id].points = teamsStats[team1Id].points + p1;
        teamsStats[team2Id].points = teamsStats[team2Id].points + p2;
    }
    for (const id in teamsStats) {
        teamsStats[id].diff = teamsStats[id].scored - teamsStats[id].conceded;
    }
    return teamsStats;
};

exports.computePoints = computePoints;
exports.points = points;

