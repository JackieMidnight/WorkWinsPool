/*
 * Everything about the Work Wins Pool itself: its name, its coaches, the draft
 * and the house rules. Every page reads from here, so this is the one file to
 * edit when the names or picks change.
 *
 * The coaches and draft below are PLACEHOLDERS (Alpha, Bravo, ...). Replace
 * them with the real people and picks, then set SAMPLE to false to remove the
 * yellow banner at the top of every page.
 */
window.LEAGUE = {
  SAMPLE: true,

  NAME: 'Work Wins Pool',
  FIELD_LABEL: 'WORK', // printed in the end zones of the field drawing on the Rules page
  COMMISSIONER: '', // e.g. 'Filed by Pat, commissioner.' Leave empty to leave it off.
  // The coach who writes the site, if any. Their name shows as "me" / "My" in places. Leave empty for none.
  ME: '',

  // Draft order, top to bottom. Names can have spaces; the team is the last word.
  DRAFT: [
    'Alpha BAL', 'Bravo LAR', 'Charlie BUF', 'Delta CIN', 'Echo DET', 'Foxtrot KC', 'Golf NE', 'Hotel PHI',
    'Hotel SEA', 'Golf CHI', 'Foxtrot DAL', 'Echo DEN', 'Delta GB', 'Charlie HOU', 'Bravo LAC', 'Alpha SF',
    'Alpha JAX', 'Bravo MIN', 'Charlie PIT', 'Delta TB', 'Echo ATL', 'Foxtrot CAR', 'Golf IND', 'Hotel NO',
    'Hotel NYG', 'Golf WAS', 'Foxtrot TEN', 'Echo CLE', 'Delta LV', 'Charlie NYJ', 'Bravo ARI', 'Alpha MIA'
  ],
  DRAFT_NOTE: 'Snake draft: picks 1 to 8, then 8 to 1, until all 32 teams were gone.',

  BUY_IN: '$10',
  BUY_IN_NOTE: 'Per person, for the whole season.',
  CONTACT_NOTE: 'Questions about the rules? Ask the commissioner.',
  TAGLINE: '', // footer line; empty uses "FOUR TEAMS. ONE GOAL. BRAGGING RIGHTS FOR A YEAR."

  // Optional headline for a week, e.g. { 5: 'Echo runs away with it' }. Weeks without one get an automatic headline.
  HEADLINES: {},
  // Weeks that have a written Tuesday update saved as weekN.html (and weekN-desktop.html).
  WRITEUPS: []
};
