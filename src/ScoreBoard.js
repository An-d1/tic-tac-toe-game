
export function ScoreBoard({xScore, oScore}) {
  let newXScore = 0;
  newXScore += xScore;
  let newOScore = 0;
  newOScore += oScore;

  return (
    <>
      <div className="scoreFlexContainer">
        <div className="scoreBanner">
          Score!
        </div>
        <div className="score">
          X-Score: {newXScore}
        </div>
        <div className="score">
          O-Score: {newOScore}
        </div>
      </div>
    </>
  );
}
