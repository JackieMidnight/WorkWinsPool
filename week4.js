/*
 * The Week 4 write-up's words. Both week4.html (phone) and week4-desktop.html read this file;
 * standings, scores, the preview and the odds on those pages are worked out from nfl.js and league.js.
 */
window.WRITEUP = {
  week: 4,
  posted: 'Tuesday, Oct 6',
  headline: 'Joe closes to one',
  summary: 'Jim is alone in first for the third straight week, but the lead is down to a single point. Joe went 3-1, capped by Atlanta’s 45-24 win in New Orleans on Monday night, and Doug and I are two back.',

  // How everyone's week went, keyed by coach
  notes: {
    Jim: 'Cleveland edged Pittsburgh 27-24 for a third straight win. Jacksonville beat Cincinnati 22-17, a guaranteed point since both teams are Jim’s. Buffalo lost 29-26 to Doug’s Patriots.',
    Joe: 'Kansas City is 4-0 after a 30-27 win in Las Vegas, the Colts won 30-13 in Washington, and the Falcons ran over the Saints on Monday night. Only Denver lost. Joe is 7-1 over the last two weeks.',
    Doug: 'New England beat Buffalo 29-26, a point taken straight from the leader, and Minnesota is 4-0. The Jets lost in Chicago and Detroit lost 32-26 in Carolina.',
    Jack: 'The Giants beat John’s Cardinals 36-24, Green Bay won 17-14 in Tampa, and Seattle beat Jenna’s Chargers 30-23. Washington lost 30-13 to Joe’s Colts. Up one place, into a tie for third.',
    Emani: 'San Francisco is 4-0 after beating Denver 24-14, and the Rams won 24-20 in Philadelphia. Pittsburgh lost by three in Cleveland, and Miami is still looking for a win.',
    Jenna: 'Baltimore beat Tennessee 24-18 and Carolina knocked off Detroit 32-26. The Chargers are 0-4 and the Raiders lost a three-pointer to Kansas City.',
    John: 'Dallas won a 34-30 shootout in Houston. The Eagles lost at home to the Rams, Tampa Bay fell to 0-4, and Arizona lost 36-24 to my Giants.',
    Mills: 'Chicago beat Doug’s Jets 23-12 for the only point. Houston and Tennessee are both 0-4, and New Orleans gave up 45 on Monday night.'
  },

  // Weekly awards: [who, title, text]
  awards: [
    ['Joe', 'Monday knockout', 'Atlanta beat New Orleans 45-24. Bijan Robinson ran for 145 yards and two touchdowns, and he and Brian Robinson Jr. combined for a franchise-record five rushing touchdowns. That made it 3-1 for Joe and sole possession of second.'],
    ['Doug', 'Straight from the top', 'The Patriots beat the Bills 29-26. A win for Doug and a loss for Jim in the same game, which is how the lead shrank to one.'],
    ['Jim', 'Point in the bank', 'Jaguars against Bengals was Jim against Jim. Jacksonville won 22-17, and the point never left the house.'],
    ['Me', 'Moving up', 'Giants, Packers and Seahawks all won, and I went from a three-way tie for fourth to a tie for third. The Commanders were the only miss.'],
    ['Joe, Doug, Emani', 'Still perfect', 'Three teams are 4-0: the Chiefs, Vikings and 49ers. Joe, Doug and Emani have one each.'],
    ['Jenna', 'Upset of the week', 'Carolina, a 7.5-win team by the preseason line, beat 10.5-win Detroit 32-26.'],
    ['Everyone', 'Nail-biters', 'Four games were decided by three points: Browns over Steelers, Patriots over Bills, Packers over Buccaneers and Chiefs over Raiders.'],
    ['Mills', 'Help is on the way', 'Houston and Tennessee are both 0-4, and they play each other on Sunday. Both are Mills’s, so that’s a point either way.']
  ],

  // Week 5 preview cards beside the computed "biggest swing": [label, text]
  preview: [
    ['TWICE OVER', 'Emani and Jim meet twice: Bengals at Dolphins on Sunday and Bills at Rams on Monday night. Jenna and Joe do too, with Broncos at Chargers and then Ravens at Falcons on Sunday night.'],
    ['FREE POINTS', 'Three games pair a coach’s own teams: Buccaneers at Cowboys on Thursday (John), Texans at Titans (Mills) and Giants at Commanders (me).']
  ]
};
