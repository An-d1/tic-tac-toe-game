
export function ScoreBoard({xScore, oScore}) {
  const displayX = xScore;
  return (
    <>
      <div className="scoreFlexContainer">
        <div className="scoreBanner">
          Score!
        </div>
        <div className="score">
          X-Score: {xScore}
        </div>
        <div className="score">
          O-Score: {oScore}
        </div>
      </div>
    </>
  );
}
