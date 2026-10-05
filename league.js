/*
 * Everything about the Work Wins Pool itself: its name, its coaches, the
 * rosters and the house rules. Every page reads from here, so this is the one
 * file to edit when the names or teams change.
 */
window.LEAGUE = {
  SAMPLE: false, // true shows a "sample rosters" banner on every page

  NAME: 'Work Wins Pool',
  FIELD_LABEL: 'WORK', // printed in the end zones of the field drawing on the Rules page
  COMMISSIONER: 'Filed by Jack.', // footer line on the week pages. Leave empty to leave it off.
  // The coach who writes the site, if any. Their name shows as "me" / "My" in places. Leave empty for none.
  ME: 'Jack',

  // Each coach's four teams. If the pick order is ever known, list it in DRAFT instead
  // ('Name TEAM', top pick first) and the site will show pick numbers too.
  ROSTERS: {
    Jack: ['SEA', 'GB', 'NYG', 'WAS'],
    Emani: ['LAR', 'SF', 'PIT', 'MIA'],
    Joe: ['KC', 'DEN', 'ATL', 'IND'],
    Jenna: ['BAL', 'LAC', 'CAR', 'LV'],
    Jim: ['BUF', 'CIN', 'JAX', 'CLE'],
    Doug: ['DET', 'NE', 'MIN', 'NYJ'],
    Mills: ['CHI', 'HOU', 'NO', 'TEN'],
    John: ['PHI', 'DAL', 'TB', 'ARI']
  },
  DRAFT: [],
  DRAFT_NOTE: '', // how the draft worked, shown on the Rules and Rosters pages

  BUY_IN: '', // e.g. '$10'. Leave empty to leave the buy-in off the Rules page.
  BUY_IN_NOTE: 'Per person, for the whole season.',
  CONTACT_NOTE: 'Questions about the rules? Ask the commissioner.',
  TAGLINE: '', // footer line; empty uses "FOUR TEAMS. ONE GOAL. BRAGGING RIGHTS FOR A YEAR."

  // Optional headline for a week, e.g. { 5: 'Doug runs away with it' }. Weeks without one get an automatic headline.
  HEADLINES: {},
  // Weeks that have a written Tuesday update saved as weekN.html (and weekN-desktop.html).
  WRITEUPS: []
};
