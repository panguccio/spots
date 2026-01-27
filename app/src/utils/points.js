const points = {
    football: [3, 0, 1],
    volleyball: [2, 0, 0],
    basketball: [2, 0, 0]
};

let computePoints = function (matches, win, lose, draw) {
    let teams = {};
    for (const { team1Id, team2Id, points1, points2 } of matches) {
        if (points1 === undefined || points2 === undefined) continue;

        let createTeam = () => ({ played: 0, scored: 0, conceded: 0, points: 0 });

        if (!teams[team1Id]) teams[team1Id] = createTeam();
        if (!teams[team2Id]) teams[team2Id] = createTeam();

        teams[team1Id].played = teams[team1Id].played + 1;
        teams[team2Id].played = teams[team2Id].played + 1;

        teams[team1Id].scored = teams[team1Id].scored + points1;
        teams[team2Id].scored = teams[team2Id].scored + points2;

        teams[team1Id].conceded = teams[team1Id].conceded + points2;
        teams[team2Id].conceded = teams[team2Id].conceded + points1;

        let [p1, p2] = points1 > points2 ? [win, lose] : points1 < points2 ? [lose, win] : [draw, draw];
        teams[team1Id].points = teams[team1Id].points + p1;
        teams[team2Id].points = teams[team2Id].points + p2;
    }
    for (const id in teams) {
        teams[id].diff = teams[id].scored - teams[id].conceded;
    }
    return teams;
};

exports.computePoints = computePoints;
exports.points = points;

