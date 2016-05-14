function gradeSite(site) {
  var grades = [
    ["*.wikipedia.org", 1],
    ["www.google.com", 0],
    ["scholar.google.com", 1],
    ["*.youtube.com", 0],
    ["*.duolingo.com", 1],
    ["*.history.com", 0.5],
    ["*.khanacademy.org", 1],
    ["*.reddit.com", -1],
    ["*.collegeboard.org", 0.5],
    ["*.purplemath.com", 1],
    ["*.sparknotes.com", 1],
    ["*.twitter.com", -1],
    ["*.facebook.com", -0.5],
    ["*.tumblr.com", -1],
    ["*.netflix.com", -1],
    ["*.hulu.com", -1],
    ["*.openstudy.com", 1],
    ["*.turnitin.com", 1],
    ["*.quizlet.com", 1],
    ["*.instagrok.com", 1],
    ["(Other Application)",0]
  ]
  
  var matchedGrade = grades.find(function(grade) {
    return wildcard(grade[0], site);
  });
  
  if (matchedGrade === undefined) {
    return 0;
  } else {
    return matchedGrade[1];
  }
}
