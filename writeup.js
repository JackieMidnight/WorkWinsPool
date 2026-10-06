/*
 * Shared logic for the Tuesday write-ups (weekN.html and weekN-desktop.html).
 * The week's words come from weekN.js (window.WRITEUP); everything else is
 * worked out here from nfl.js and league.js, so phone and desktop always agree.
 */
window.writeupVals = function (comp) {
  var P = window.POOL, N = window.NFL, L = window.LEAGUE, W = window.WRITEUP;
  var wk = W.week, st = comp.state || {};
  var NICK = N.NICK, OWN = P.own;
  // Grids show coaches by name; sentences say "me" for the site's author.
  var name = function (t) { return OWN[t] || 'Nobody'; };
  var who = function (t) { return OWN[t] ? (P.isMe(OWN[t]) ? 'me' : OWN[t]) : 'nobody'; };

  var t = P.table(wk), prev = wk > 1 ? P.table(wk - 1).rank : null;
  var standings = t.order.map(function (c, i) {
    var mv = prev ? prev[c] - t.rank[c] : 0;
    return {
      rk: t.label(c), name: c, teams: P.roster[c].join(' '), wk: P.fmtRec(t.rec[c]), pts: t.pts[c],
      nameColor: i === 0 ? '#C9A24B' : '#EFEDE0', ptsColor: i === 0 ? '#C9A24B' : '#EFEDE0',
      mv: !prev ? '' : mv > 0 ? '▲' + mv : mv < 0 ? '▼' + (-mv) : '–', mvColor: mv > 0 ? '#9CCB55' : '#8FA898',
      mvLabel: !prev ? 'first week' : mv > 0 ? 'up ' + mv : mv < 0 ? 'down ' + (-mv) : 'no change'
    };
  });
  var notes = t.order.map(function (c, i) {
    return { name: c, me: P.isMe(c), nameMe: P.isMe(c) ? c + ' (me)' : c, wk: P.fmtRec(t.rec[c]), pts: t.pts[c] + ' pts', text: W.notes[c] || '',
      chipBg: i === 0 ? 'var(--gold)' : 'var(--chip)', chipFg: i === 0 ? 'var(--ongold)' : 'var(--ink)', ptsColor: i === 0 ? 'var(--gold)' : 'var(--ink)',
      border: i === t.order.length - 1 ? '0' : '1px solid var(--line)' };
  });

  // The week's games, in schedule order, with each team's coach
  var days = {};
  ((N.SCHEDULE && N.SCHEDULE[wk]) || []).forEach(function (g, i) { days[g[1] + ' ' + g[2]] = { day: g[0], i: i }; });
  var games = P.weeks[wk - 1].slice().sort(function (x, y) {
    var dx = days[x.a + ' ' + x.h], dy = days[y.a + ' ' + y.h];
    return (dx ? dx.i : 99) - (dy ? dy.i : 99);
  });
  var ledger = games.map(function (g) {
    var tie = g.as === g.hs, aw = g.as > g.hs, d = days[g.a + ' ' + g.h];
    return { day: d ? d.day : '', a: g.a, ac: name(g.a) + (tie ? '  +½' : aw ? '  +1' : ''), as: g.as, h: g.h, hc: name(g.h) + (tie ? '  +½' : aw ? '' : '  +1'), hs: g.hs,
      aColor: aw || tie ? 'var(--ink)' : 'var(--soft)', hColor: !aw || tie ? 'var(--ink)' : 'var(--soft)',
      aWeight: aw && !tie ? '700' : '400', hWeight: !aw && !tie ? '700' : '400' };
  });
  var allOwned = P.teams.every(function (x) { return OWN[x]; });

  var awards = W.awards.map(function (a) { return { who: a[0], title: a[1], text: a[2] }; });

  // Next week: schedule with records through this week, plus the game the model says matters most
  var rec = {};
  P.teams.forEach(function (x) { rec[x] = [0, 0, 0]; });
  P.weeks.slice(0, wk).forEach(function (w) { w.forEach(function (g) {
    if (g.as === g.hs) { rec[g.a][2]++; rec[g.h][2]++; } else { rec[g.as > g.hs ? g.a : g.h][0]++; rec[g.as > g.hs ? g.h : g.a][1]++; }
  }); });
  var nextWk = wk + 1;
  var sched = ((N.SCHEDULE && N.SCHEDULE[nextWk]) || []).map(function (g) { return { day: g[0], a: g[1], h: g[2] }; });
  var next = sched.map(function (g) { return { day: g.day, a: g.a, ac: name(g.a), ar: P.fmtRec(rec[g.a]), h: '@ ' + g.h, hc: name(g.h), hr: P.fmtRec(rec[g.h]) }; });
  var swing = '';
  if (sched.length) {
    var sim = comp.__wsim || (comp.__wsim = P.simulate(wk, sched));
    var best = null;
    sched.forEach(function (g, i) { P.coaches.forEach(function (c) {
      var d = sim.ifAway[i][c] - sim.ifHome[i][c];
      if (!best || Math.abs(d) > Math.abs(best.d)) best = { i: i, c: c, d: d };
    }); });
    var g = sched[best.i], oa = OWN[g.a], oh = OWN[g.h];
    var dayWord = { Thu: 'Thursday', Fri: 'Friday', Sat: 'Saturday', Sun: 'Sunday', Mon: 'Monday' }[g.day.slice(0, 3)] || '';
    var night = /8:\d\d/.test(g.day) && !/a\.m\./.test(g.day) ? ' night' : '';
    swing = NICK[g.a] + ' at ' + NICK[g.h] + (dayWord ? ', ' + dayWord + night : '') +
      (oa && oh && oa !== oh ? ', ' + who(g.a) + ' against ' + who(g.h) : '') + '. The model has ' + (P.isMe(best.c) ? 'me' : best.c) + ' at ' +
      Math.round(sim.ifAway[best.i][best.c]) + '% to win the pool if the ' + NICK[g.a] + ' win and ' + Math.round(sim.ifHome[best.i][best.c]) + '% if the ' + NICK[g.h] + ' do.';
    swing = swing.charAt(0).toUpperCase() + swing.slice(1);
  }
  var preview = (W.preview || []).map(function (p) { return { label: p[0], text: p[1] }; });

  // Byes for the next two weeks
  var byeWeek = function (w) {
    var ts = Object.keys(N.BYE).filter(function (x) { return N.BYE[x] === w; })
      .sort(function (a, b) { return P.coaches.indexOf(OWN[a]) - P.coaches.indexOf(OWN[b]) || (a < b ? -1 : 1); });
    var by = {}; ts.forEach(function (x) { if (OWN[x]) (by[OWN[x]] = by[OWN[x]] || []).push(x); });
    var owners = Object.keys(by);
    var dbl = owners.filter(function (c) { return by[c].length > 1; }), single = owners.filter(function (c) { return by[c].length === 1; });
    var nm = function (c) { return P.isMe(c) ? 'I' : c; };
    var text = dbl.map(function (c) { return nm(c) + (P.isMe(c) ? ' lose' : ' loses') + ' the ' + P.list(by[c].map(function (x) { return NICK[x]; })) + ' in the same week.'; }).join(' ');
    if (single.length) text += (text ? ' ' : '') + single.map(function (c, i) { return nm(c) + (i === 0 ? (P.isMe(c) ? ' am' : ' is') + ' without' : ' without') + ' the ' + NICK[by[c][0]]; }).reduce(function (s, x, i, xs) {
      return i === 0 ? x : s + (i === xs.length - 1 ? ' and ' : ', ') + x;
    }, '') + '.';
    return { wk: w, teams: ts.map(function (x) { return { abbr: x, owner: OWN[x] || 'Nobody' }; }), note: text, owners: owners.length,
      border: w === nextWk ? '1px solid var(--line)' : '0' };
  };
  var byes = [byeWeek(nextWk), byeWeek(nextWk + 1)].filter(function (b) { return b.teams.length; });
  var nb = byeWeek(nextWk);
  var byeIntro = nb.teams.length
    ? P.cap(P.word(nb.owners)) + (nb.owners === 1 ? ' coach plays' : ' coaches play') + ' Week ' + nextWk + ' a team short.'
    : 'Nobody has a team on bye in Week ' + nextWk + ', so everyone plays with all ' + P.word(P.perCoach) + ' teams.';
  var byeNames = nb.teams.map(function (x) { return NICK[x.abbr]; });
  var nextSub = sched.length ? 'Kicks off ' + ({ Thu: 'Thursday night', Sun: 'Sunday', Sat: 'Saturday' }[sched[0].day.slice(0, 3)] || sched[0].day) + '. ' +
    P.cap(P.word(sched.length)) + ' games' + (byeNames.length ? ', with the ' + P.list(byeNames) + ' on bye' : '') + '. Times are Eastern.' : '';

  // Group-text version of the standings
  var copyText = function () {
    var lines = [L.NAME + ', standings after Week ' + wk].concat(t.order.map(function (c) { return t.label(c) + '. ' + c + ' ' + t.pts[c]; }));
    var url = new URL('week' + wk + '.html', location.href).href;
    var txt = lines.join('\n') + '\n' + W.headline + '. ' + url;
    var done = function () { comp.setState({ copied: true }); setTimeout(function () { comp.setState({ copied: false }); }, 2500); };
    var fallback = function () {
      var ta = document.createElement('textarea'); ta.value = txt; ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); done(); } catch (e) { /* nothing more to try */ }
      document.body.removeChild(ta);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(txt).then(done, fallback); else fallback();
  };

  var weekChips = [], deskWeeks = [];
  for (var n = 1; n <= N.SEASON_WEEKS; n++) {
    var cur = n === wk, played = n <= P.latest, live = P.live(n);
    var href = cur ? 'week' + n + '.html' : played ? P.weekHref(n) : 'season.html';
    if (n <= Math.max(6, P.latest + 1)) weekChips.push({ n: n, link: played, future: !played, href: href, current: cur ? 'page' : 'false',
      border: cur ? 'var(--gold)' : live ? 'var(--gold)' : 'var(--line)', borderStyle: live && !cur ? 'dashed' : 'solid',
      bg: cur ? 'var(--gold)' : 'var(--panel)', fg: cur ? 'var(--ongold)' : 'var(--ink)', weight: cur ? '800' : '700' });
    deskWeeks.push({ n: n, href: cur ? 'week' + n + '-desktop.html' : href, current: cur ? 'page' : 'false',
      border: cur ? '1px solid var(--gold)' : played ? '1px solid var(--line)' : '1px dashed var(--line)',
      bg: cur ? 'var(--gold)' : played ? 'var(--panel)' : 'transparent',
      fg: cur ? 'var(--ongold)' : played ? 'var(--ink)' : 'var(--soft)', weight: cur ? '800' : played ? '700' : '500',
      opacity: played ? '1' : '.6' });
  }

  var mode = st.mode || comp.props.mode || 'dark';
  return {
    modeClass: 'wwp-' + mode, week: wk, prevWeek: wk - 1, hasPrev: wk > 1,
    kicker: 'Week ' + wk + ' · Final · Posted ' + W.posted, headline: W.headline, summary: W.summary,
    standings: standings, notes: notes, ledger: ledger,
    ledgerNote: allOwned ? 'All ' + P.teams.length + ' teams are owned, so every game is one coach against another. The winner’s coach gets the point.' : 'The winner’s coach gets the point.',
    awards: awards, nAwards: awards.length,
    nextTitle: 'Week ' + nextWk + ' preview', nextSub: nextSub, hasNext: sched.length > 0, swing: swing, hasSwing: !!swing, preview: preview, next: next,
    byeIntro: byeIntro, byes: byes,
    copyText: copyText, copyLabel: st.copied ? 'Copied' : 'Copy text', copyLabelLong: st.copied ? 'Copied' : 'Copy group text',
    weekChips: weekChips, deskWeeks: deskWeeks
  };
};
