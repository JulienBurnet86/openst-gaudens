import React, { useMemo, useState } from "react";
import { render } from "react-dom";
import { Stage, Layer, Text, Line } from "react-konva";

const INITIAL_MATCH_SPACING = 40;
const PLAYER_WIDTH = 170;
const PLAYER_HEIGHT = 20;
const HORIZONTAL_LINE_LENGTH = 30;

const capitalize = (string) => string[0].toUpperCase() + string.slice(1);

function Player({ player, x, y }) {
  const margin = PLAYER_HEIGHT / 10;
  const fontSize = 16;
  return (
    <>
      <Line
        x={x}
        y={y + PLAYER_HEIGHT}
        points={[0, 0, PLAYER_WIDTH, 0]}
        stroke="black"
        tension={1}
      />
      <Text
        fontSize={fontSize}
        x={x + margin}
        y={y + margin}
        text={player.name}
        width={PLAYER_WIDTH}
        height={PLAYER_HEIGHT}
      />
      {player.score && (
        <Text
          fontSize={fontSize - 2}
          x={x + margin}
          y={y + PLAYER_HEIGHT + margin}
          fontStyle="italic"
          text={player.score}
        />
      )}
    </>
  );
}

function Match({ startLine, startColumn, match, matchVerticalSpacing }) {
  return (
    <>
      <Player player={match.player1} x={startColumn} y={startLine} />
      {/* horizontal line 1 */}
      <Line
        x={startColumn + PLAYER_WIDTH}
        y={startLine + PLAYER_HEIGHT}
        points={[0, 0, HORIZONTAL_LINE_LENGTH, 0]}
        stroke="black"
        tension={1}
      />
      <Player
        player={match.player2}
        x={startColumn}
        y={startLine + matchVerticalSpacing}
      />
      {/* horizontal line 2 */}
      <Line
        x={startColumn + PLAYER_WIDTH}
        y={startLine + matchVerticalSpacing + PLAYER_HEIGHT}
        points={[0, 0, HORIZONTAL_LINE_LENGTH, 0]}
        stroke="black"
        tension={1}
      />
      {/* vertical line */}
      <Line
        x={startColumn + PLAYER_WIDTH + HORIZONTAL_LINE_LENGTH}
        y={startLine + PLAYER_HEIGHT}
        points={[0, 0, 0, matchVerticalSpacing]}
        stroke="black"
        tension={1}
      />
      {/* horizontal line winner */}
      <Line
        x={startColumn + PLAYER_WIDTH + HORIZONTAL_LINE_LENGTH}
        y={startLine + matchVerticalSpacing / 2 + PLAYER_HEIGHT}
        points={[0, 0, HORIZONTAL_LINE_LENGTH, 0]}
        stroke="black"
        tension={1}
      />
    </>
  );
}

function Round({ matches, roundIndex }) {
  const startColumn = roundIndex * (PLAYER_WIDTH + HORIZONTAL_LINE_LENGTH * 2);
  const matchVerticalSpacing = INITIAL_MATCH_SPACING * Math.pow(2, roundIndex);
  const lineOffset = matchVerticalSpacing / 2 - PLAYER_HEIGHT;
  return (
    <>
      {matches.map((match, matchIndex) => (
        <Match
          match={match}
          startColumn={startColumn}
          matchVerticalSpacing={matchVerticalSpacing}
          startLine={matchIndex * 2 * matchVerticalSpacing + lineOffset}
        />
      ))}
    </>
  );
}

function Draw({ rounds }) {
  if (!rounds) return null;
  return rounds.map((matches, roundIndex) => (
    <Round matches={matches} roundIndex={roundIndex} />
  ));
}

function App() {
  const [rounds, setRounds] = useState([]);
  const draws = ["qualifications", "singles", "doubles"];
  const [selectedDraw, setSelectedDraw] = useState("qualifications");

  useMemo(() => {
    fetch(`/assets/json/${selectedDraw}.json`)
      .then((response) => {
        return response.json();
      })
      .then((jsonData) => {
        setRounds(jsonData.rounds);
      });
  }, [selectedDraw]);

  function handleChange(event) {
    setSelectedDraw(event.target.value);
  }

  return (
    <>
      <div className="row">
        <select onChange={handleChange} className="col-3">
          {draws.map((value) => (
            <option value={value} selected={selectedDraw === value}>
              {capitalize(value)}
            </option>
          ))}
        </select>
      </div>
      <br />
      <div className="row">
        <Stage
          width={(PLAYER_WIDTH + HORIZONTAL_LINE_LENGTH) * 6}
          height={INITIAL_MATCH_SPACING * 32}
        >
          <Layer>
            <Draw rounds={rounds} />
          </Layer>
        </Stage>
      </div>
    </>
  );
}

render(<App />, document.getElementById("results"));
