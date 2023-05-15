import React, { useMemo, useState } from "react";
import { render } from "react-dom";
import { Stage, Layer, Text, Line } from "react-konva";

const INITIAL_MATCH_SPACING = 40;
const PLAYER_WIDTH = 170;
const PLAYER_HEIGHT = 20;
const HORIZONTAL_LINE_LENGTH = 30;
const FONT_SIZE = 16;

const capitalize = (string) => string[0].toUpperCase() + string.slice(1);

function Team({ team, x, y }) {
  const margin = PLAYER_HEIGHT / 10;
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
        fontSize={FONT_SIZE}
        x={x + margin}
        y={y + margin - PLAYER_HEIGHT}
        text={team.player1}
        width={PLAYER_WIDTH}
        height={PLAYER_HEIGHT}
      />
      <Text
        fontSize={FONT_SIZE}
        x={x + margin}
        y={y + margin}
        text={team.player2}
        width={PLAYER_WIDTH}
        height={PLAYER_HEIGHT}
      />
      {team.score && (
        <Text
          fontSize={FONT_SIZE - 2}
          x={x + margin}
          y={y + PLAYER_HEIGHT * 2 + margin}
          fontStyle="italic bold"
          text={team.score}
        />
      )}
    </>
  );
}

function Player({ player, x, y }) {
  const margin = PLAYER_HEIGHT / 10;
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
        fontSize={FONT_SIZE}
        x={x + margin}
        y={y + margin}
        text={player.name}
        width={PLAYER_WIDTH}
        height={PLAYER_HEIGHT}
      />
      {player.score && (
        <Text
          fontSize={FONT_SIZE - 2}
          x={x + margin}
          y={y + PLAYER_HEIGHT + margin}
          fontStyle="italic bold"
          text={player.score}
        />
      )}
    </>
  );
}

function Match({ startLine, startColumn, match, matchVerticalSpacing }) {
  const player1 = match.player1 ? (
    <Player player={match.player1} x={startColumn} y={startLine} />
  ) : (
    <Team team={match.team1} x={startColumn} y={startLine} />
  );
  const player2 = match.player2 ? (
    <Player
      player={match.player2}
      x={startColumn}
      y={startLine + matchVerticalSpacing}
    />
  ) : (
    <Team
      team={match.team2}
      x={startColumn}
      y={startLine + matchVerticalSpacing}
    />
  );

  return (
    <>
      {player1}
      {/* horizontal line 1 */}
      <Line
        x={startColumn + PLAYER_WIDTH}
        y={startLine + PLAYER_HEIGHT}
        points={[0, 0, HORIZONTAL_LINE_LENGTH, 0]}
        stroke="black"
        tension={1}
      />
      {player2}
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

function Round({ matches, roundIndex, doubles }) {
  const startColumn = roundIndex * (PLAYER_WIDTH + HORIZONTAL_LINE_LENGTH * 2);
  const matchVerticalSpacing =
    INITIAL_MATCH_SPACING * (doubles ? 2 : 1) * Math.pow(2, roundIndex);
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

function Draw({ rounds, doubles }) {
  if (!rounds) return null;
  return rounds.map((matches, roundIndex) => (
    <Round matches={matches} roundIndex={roundIndex} doubles={doubles} />
  ));
}

function App() {
  const [currentDraw, setCurrentDraw] = useState([]);
  const draws = ["qualifications", "singles", "doubles"];
  const [selectedDraw, setSelectedDraw] = useState("qualifications");

  useMemo(() => {
    fetch(`/assets/json/${selectedDraw}.json`)
      .then((response) => {
        return response.json();
      })
      .then((jsonData) => {
        setCurrentDraw(jsonData);
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
            <Draw rounds={currentDraw.rounds} doubles={currentDraw.doubles} />
          </Layer>
        </Stage>
      </div>
    </>
  );
}

render(<App />, document.getElementById("results"));
