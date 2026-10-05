/*
 * Shared calculations for the Work Wins Pool pages, built from nfl.js and
 * league.js. Pages read window.POOL inside their renderVals().
 */
(function () {
  var L = window.LEAGUE, N = window.NFL;

  var coaches = [], roster = {}, own = {}, pickNo = {};
  L.DRAFT.forEach(function (d, i) {
    var cut = d.lastIndexOf(' '), c = d.slice(0, cut).trim(), t = d.slice(cut + 1).trim();
    if (!roster[c]) { roster[c] = []; coaches.push(c); }
    roster[c].push(t); own[t] = c; pickNo[t] = i + 1;
  });
  var teams = Object.keys(N.NICK);

  var weeks = N.RESULTS ? N.RESULTS.split('/').map(function (w) {
    return w.split(',').map(function (g) { var f = g.trim().split(/\s+/); return { a: f[0], h: f[1], as: +f[2], hs: +f[3] }; });
  }) : [];
  var latest = weeks.length;
  var pending = function (w) { return (N.PENDING && N.PENDING[w]) || []; };

  // A win is a point, a tie half a point to each side. Teams nobody drafted earn nothing.
  // Points after Weeks 1 to k, each coach's record in Week k, and ranks (tied coaches share a rank).
  var table = function (k) {
    var pts = {}, rec = {};
    coaches.forEach(function (c) { pts[c] = 0; });
    weeks.slice(0, k).forEach(function (games, wi) {
      var last = wi === k - 1;
      if (last) coaches.forEach(function (c) { rec[c] = [0, 0, 0]; });
      games.forEach(function (g) {
        var oa = own[g.a], oh = own[g.h];
        if (g.as === g.hs) {
          if (oa) { pts[oa] += 0.5; if (last) rec[oa][2]++; }
          if (oh) { pts[oh] += 0.5; if (last) rec[oh][2]++; }
          return;
        }
        var win = g.as > g.hs ? oa : oh, lose = g.as > g.hs ? oh : oa;
        if (win) { pts[win] += 1; if (last) rec[win][0]++; }
        if (lose && last) rec[lose][1]++;
      });
    });
    if (k === 0) coaches.forEach(function (c) { rec[c] = [0, 0, 0]; });
    var rank = {};
    coaches.forEach(function (c) { rank[c] = 1 + coaches.filter(function (d) { return pts[d] > pts[c]; }).length; });
    var order = coaches.slice().sort(function (x, y) { return pts[y] - pts[x] || x.localeCompare(y); });
    var tied = function (c) { return coaches.some(function (d) { return d !== c && rank[d] === rank[c]; }); };
    return { pts: pts, rec: rec, rank: rank, order: order, tied: tied, label: function (c) { return (tied(c) ? 'T' : '') + rank[c]; } };
  };

  var list = function (xs) { return xs.length <= 1 ? (xs[0] || '') : xs.slice(0, -1).join(', ') + ' and ' + xs[xs.length - 1]; };
  var fmtRec = function (r) { return r[0] + '-' + r[1] + (r[2] ? '-' + r[2] : ''); };
  var fmt = function (x) { return (Math.round(x * 10) / 10).toString(); };
  var ord = function (n) { var s = n % 100; return n + (s > 10 && s < 14 ? 'th' : n % 10 === 1 ? 'st' : n % 10 === 2 ? 'nd' : n % 10 === 3 ? 'rd' : 'th'); };
  var isMe = function (c) { return !!L.ME && c === L.ME; };
  var poss = function (c) { return isMe(c) ? 'My' : c + '’s'; };
  var NUM = ['no', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen'];
  var word = function (n) { return NUM[n] || String(n); };
  var cap = function (s) { return s.charAt(0).toUpperCase() + s.slice(1); };

  var perCoach = coaches.length ? Math.round(teams.filter(function (t) { return own[t]; }).length / coaches.length) : 0;
  var tagline = L.TAGLINE || (word(perCoach).toUpperCase() + ' TEAMS. ONE GOAL. BRAGGING RIGHTS FOR A YEAR.');

  var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  // Thursday to Monday of week n, e.g. "Sep 10–14" or "Sep 30–Oct 4"
  var weekDates = function (n) {
    var p = N.SEASON_START.split('-');
    var start = new Date(Date.UTC(+p[0], +p[1] - 1, +p[2] + (n - 1) * 7)), end = new Date(start.getTime() + 4 * 864e5);
    var m1 = MONTHS[start.getUTCMonth()], m2 = MONTHS[end.getUTCMonth()];
    return m1 + ' ' + start.getUTCDate() + '–' + (m1 === m2 ? '' : m2 + ' ') + end.getUTCDate();
  };

  var headline = function (w) {
    if (L.HEADLINES && L.HEADLINES[w]) return L.HEADLINES[w];
    if (pending(w).length) return 'Week ' + w + ' so far';
    var t = table(w), lead = t.order.filter(function (c) { return t.rank[c] === 1; });
    return lead.length === 1 ? lead[0] + ' leads after Week ' + w : lead.length === 2 ? lead[0] + ' and ' + lead[1] + ' share first' : lead.length + '-way tie for first';
  };
  var weekHref = function (w) { return (L.WRITEUPS || []).indexOf(w) >= 0 ? 'week' + w + '.html' : 'week.html?w=' + w; };

  window.POOL = {
    coaches: coaches, roster: roster, own: own, pickNo: pickNo, teams: teams,
    weeks: weeks, latest: latest, pending: pending, live: function (w) { return pending(w).length > 0; },
    // the latest week whose games are all final
    lastFinal: pending(latest).length ? latest - 1 : latest,
    table: table, perCoach: perCoach, list: list, fmtRec: fmtRec, fmt: fmt, ord: ord, isMe: isMe, poss: poss, word: word, cap: cap,
    weekDates: weekDates, headline: headline, weekHref: weekHref,
    // values every page template can use
    common: { leagueName: L.NAME, leagueUpper: L.NAME.toUpperCase(), tagline: tagline, commissioner: L.COMMISSIONER || '' }
  };

  // Keep each tab's title in step with the league name.
  document.title = document.title.replace(/^[^,]*/, L.NAME);

  if (L.SAMPLE) {
    var banner = function () {
      if (document.getElementById('wwp-sample')) return;
      var b = document.createElement('div');
      b.id = 'wwp-sample';
      b.setAttribute('role', 'note');
      b.style.cssText = 'padding:10px 16px;background:#C9A24B;color:#0A1F14;font:600 13.5px/1.45 "Libre Franklin",system-ui,sans-serif;text-align:center';
      b.textContent = 'Sample rosters. The coaches and picks are placeholders until the real draft is entered in league.js.';
      document.body.insertBefore(b, document.body.firstChild);
    };
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', banner); else banner();
  }
})();
