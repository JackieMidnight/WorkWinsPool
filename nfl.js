/*
 * NFL data for the 2026 season: scores, schedule notes, Vegas totals, byes and
 * last season's records. Nothing in here belongs to the pool; who owns which
 * team lives in league.js.
 *
 * Updating during a week: add each finished game to that week's part of RESULTS
 * (away home awayScore homeScore) and remove it from PENDING.
 * Starting a new week: add a '/' and the first results to RESULTS and list the
 * rest of that week's games in PENDING under the new week number.
 */
window.NFL = {
  SEASON_START: '2026-09-10', // Thursday of Week 1, used for the "Games Sep 10–14" dates
  SEASON_WEEKS: 18,
  GAMES: 17,

  // Results by week: away home awayScore homeScore. Add a week by appending '/...' with its games.
  RESULTS: 'BUF HOU 36 31,TB CIN 27 33,CLE JAX 10 34,NE SEA 10 13,MIA LV 13 27,GB MIN 22 39,BAL IND 41 23,WAS PHI 22 24,ATL PIT 13 20,NYJ TEN 23 10,NO DET 30 31,DEN KC 10 31,DAL NYG 20 28,CHI CAR 59 37,ARI LAC 26 14,SF LAR 27 7' +
    '/DET BUF 31 41,PHI TEN 24 20,PIT NE 3 20,MIN CHI 9 3,CAR ATL 34 3,GB NYJ 20 17,NO BAL 24 17,CIN HOU 20 6,CLE TB 23 19,JAX DEN 13 20,LV LAC 26 14,SEA ARI 31 7,MIA SF 13 35,WAS DAL 20 37,IND KC 30 33,NYG LAR 6 28' +
    '/ATL GB 35 14,HOU IND 17 19,KC MIA 24 10,LAC BUF 16 24,TEN NYG 7 12,CIN PIT 27 30,SEA WAS 31 33,NE JAX 6 35,CAR CLE 18 21,NYJ DET 24 31,ARI SF 30 36,MIN TB 23 16,LV NO 35 27,BAL DAL 34 31,LAR DEN 26 30,PHI CHI 7 27' +
    '/PIT CLE 24 27,IND WAS 30 13,NE BUF 29 26,ARI NYG 24 36,NYJ CHI 12 23,TEN BAL 18 24,GB TB 17 14,DAL HOU 34 30,JAX CIN 22 17,LAR PHI 24 20,MIA MIN 10 15,DEN SF 14 24,LAC SEA 23 30,KC LV 30 27,DET CAR 26 32,ATL NO 45 24' +
    '/TB DAL 24 16,PHI JAX 17 19,CHI GB 7 31,HOU TEN 26 3,CIN MIA 31 24,LV NE 17 45,MIN NO 23 13,CLE NYJ 12 17,IND PIT 22 34,NYG WAS 27 27,DEN LAC 23 17,DET ARI 45 21,SF SEA 32 29,BAL ATL 30 23,BUF LAR 37 34' +
    '/SEA DEN 14 17,HOU JAX 34 31,CHI ATL 31 23,BAL CLE 10 13,TEN IND 26 20,NYJ NE 19 26,NO NYG 34 27,CAR PHI 25 14,PIT TB 26 19,ARI LAR 18 16,LAC KC 6 22,BUF LV 33 30,DAL GB 13 23,WAS SF 17 23',

  // Games of an in-progress week that haven't finished: [day and time, away, home].
  // When the week is over, add its last games to RESULTS and empty its PENDING entry.
  // Week 7 has not started, so its games live in SCHEDULE until the first result is in.
  PENDING: {},

  // Each week's games: [day and time ET, away, home]. Next week's feeds the previews and the rooting guide;
  // past weeks' give the write-ups their game days.
  // London and other neutral-site games list the designated home team second.
  SCHEDULE: {
    4: [['Thu 8:15', 'PIT', 'CLE'], ['Sun 9:30 a.m.', 'IND', 'WAS'], ['Sun 1:00', 'DAL', 'HOU'], ['Sun 1:00', 'NYJ', 'CHI'],
      ['Sun 1:00', 'JAX', 'CIN'], ['Sun 1:00', 'TEN', 'BAL'], ['Sun 1:00', 'ARI', 'NYG'], ['Sun 1:00', 'LAR', 'PHI'],
      ['Sun 1:00', 'GB', 'TB'], ['Sun 1:00', 'NE', 'BUF'], ['Sun 4:05', 'MIA', 'MIN'], ['Sun 4:25', 'DEN', 'SF'],
      ['Sun 4:25', 'LAC', 'SEA'], ['Sun 4:25', 'KC', 'LV'], ['Sun 8:20', 'DET', 'CAR'], ['Mon 8:15', 'ATL', 'NO']],
    5: [['Thu 8:15', 'TB', 'DAL'], ['Sun 9:30 a.m. · London', 'PHI', 'JAX'], ['Sun 1:00', 'CHI', 'GB'], ['Sun 1:00', 'HOU', 'TEN'],
      ['Sun 1:00', 'CIN', 'MIA'], ['Sun 1:00', 'LV', 'NE'], ['Sun 1:00', 'MIN', 'NO'], ['Sun 1:00', 'CLE', 'NYJ'],
      ['Sun 1:00', 'IND', 'PIT'], ['Sun 1:00', 'NYG', 'WAS'], ['Sun 4:05', 'DEN', 'LAC'], ['Sun 4:25', 'DET', 'ARI'],
      ['Sun 4:25', 'SF', 'SEA'], ['Sun 8:20', 'BAL', 'ATL'], ['Mon 8:15', 'BUF', 'LAR']],
    6: [['Thu 8:15', 'SEA', 'DEN'], ['Sun 9:30 a.m. · London', 'HOU', 'JAX'], ['Sun 1:00', 'CHI', 'ATL'], ['Sun 1:00', 'BAL', 'CLE'],
      ['Sun 1:00', 'TEN', 'IND'], ['Sun 1:00', 'NYJ', 'NE'], ['Sun 1:00', 'NO', 'NYG'], ['Sun 1:00', 'CAR', 'PHI'],
      ['Sun 1:00', 'PIT', 'TB'], ['Sun 4:05', 'ARI', 'LAR'], ['Sun 4:25', 'LAC', 'KC'], ['Sun 4:25', 'BUF', 'LV'],
      ['Sun 8:20', 'DAL', 'GB'], ['Mon 8:15', 'WAS', 'SF']],
    7: [['Thu 8:15', 'NE', 'CHI'], ['Sun 9:30 a.m. · Paris', 'PIT', 'NO'], ['Sun 1:00', 'SF', 'ATL'], ['Sun 1:00', 'CLE', 'TEN'],
      ['Sun 1:00', 'IND', 'MIN'], ['Sun 1:00', 'MIA', 'NYJ'], ['Sun 1:00', 'TB', 'CAR'], ['Sun 1:00', 'CIN', 'BAL'],
      ['Sun 1:00', 'NYG', 'HOU'], ['Sun 4:05', 'DEN', 'ARI'], ['Sun 4:25', 'GB', 'DET'], ['Sun 4:25', 'LAR', 'LV'],
      ['Sun 8:20', 'KC', 'SEA'], ['Mon 8:15', 'DAL', 'PHI']]
  },

  NICK: { ARI: 'Cardinals', ATL: 'Falcons', BAL: 'Ravens', BUF: 'Bills', CAR: 'Panthers', CHI: 'Bears', CIN: 'Bengals', CLE: 'Browns', DAL: 'Cowboys', DEN: 'Broncos', DET: 'Lions', GB: 'Packers', HOU: 'Texans', IND: 'Colts', JAX: 'Jaguars', KC: 'Chiefs', LAC: 'Chargers', LAR: 'Rams', LV: 'Raiders', MIA: 'Dolphins', MIN: 'Vikings', NE: 'Patriots', NO: 'Saints', NYG: 'Giants', NYJ: 'Jets', PHI: 'Eagles', PIT: 'Steelers', SEA: 'Seahawks', SF: '49ers', TB: 'Buccaneers', TEN: 'Titans', WAS: 'Commanders' },
  // Preseason win totals, as listed on the league's roster sheet
  VEGAS: { BUF: 10.5, CIN: 9.5, TB: 8.5, CLE: 5.5, SEA: 10.5, LV: 5.5, GB: 10.5, IND: 7.5, PHI: 10.5, JAX: 8.5, PIT: 8.5, TEN: 6.5, BAL: 11.5, DET: 10.5, MIN: 8.5, ATL: 7.5, KC: 10.5, NYG: 7.5, HOU: 9.5, CAR: 7.5, NYJ: 5.5, DEN: 9.5, NE: 9.5, NO: 7.5, CHI: 9.5, ARI: 4.5, LAR: 11.5, DAL: 8.5, SF: 10.5, LAC: 9.5, WAS: 7.5, MIA: 4.5 },
  BYE: { CAR: 5, KC: 5, CIN: 6, DET: 6, MIA: 6, MIN: 6, BUF: 7, JAX: 7, LAC: 7, WAS: 7, HOU: 8, NO: 8, NYG: 8, SF: 8, PIT: 9, TEN: 9, CHI: 10, DEN: 10, PHI: 10, TB: 10, ATL: 11, CLE: 11, GB: 11, LAR: 11, NE: 11, SEA: 11, BAL: 13, IND: 13, LV: 13, NYJ: 13, ARI: 14, DAL: 14 },

  // 2025 regular season [wins, losses, ties]
  LAST: { SEA: [14, 3, 0], NE: [14, 3, 0], DEN: [14, 3, 0], JAX: [13, 4, 0], LAR: [12, 5, 0], BUF: [12, 5, 0], HOU: [12, 5, 0], SF: [12, 5, 0], PHI: [11, 6, 0], LAC: [11, 6, 0], CHI: [11, 6, 0], PIT: [10, 7, 0], GB: [9, 7, 1], DET: [9, 8, 0], MIN: [9, 8, 0], IND: [8, 9, 0], BAL: [8, 9, 0], TB: [8, 9, 0], ATL: [8, 9, 0], CAR: [8, 9, 0], DAL: [7, 9, 1], MIA: [7, 10, 0], KC: [6, 11, 0], NO: [6, 11, 0], CIN: [6, 11, 0], WAS: [5, 12, 0], CLE: [5, 12, 0], NYG: [4, 13, 0], ARI: [3, 14, 0], LV: [3, 14, 0], TEN: [3, 14, 0], NYJ: [3, 14, 0] },
  // 2025 playoffs, round by round. Conference games are [label, away, home].
  PLAYOFFS_2025: {
    wildCard: ['LAR', 'CHI', 'BUF', 'SF', 'NE', 'HOU'],
    divisional: ['DEN', 'SEA', 'NE', 'LAR'],
    byes: ['DEN', 'SEA'],
    conference: [['AFC Championship', 'NE', 'DEN'], ['NFC Championship', 'LAR', 'SEA']],
    conferenceWinners: ['NE', 'SEA'],
    champion: 'SEA',
    ending: 'Seattle beat the Rams 31-27, New England beat Denver 10-7, and Seattle won the Super Bowl 29-13.'
  }
};
