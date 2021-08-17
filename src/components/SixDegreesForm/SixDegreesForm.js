import React, { useState, useEffect, useRef } from "react";
import g from "../Graph/Graph";
import InputField from "../InputField";
import Button from "../Button";
import Spinner from "../Spinner";
import "./SixDegreesForm.scss";

function SixDegreesForm() {
  const [searched, setSearched] = useState(false);
  const [searching, setSearching] = useState(false);
  const [numVisited, setNumVisited] = useState(0);

  const [playerOne, setPlayerOne] = useState("");
  const [playerTwo, setPlayerTwo] = useState("");

  const [pathIDs, setPathIDs] = useState([]);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;

    return function cleanup() {
      mounted.current = false;
    };
  }, []);

  function graphReturnFunc(path) {
    if (mounted.current) {
      setPathIDs(path);
      setSearched(true);
      setSearching(false);
    }
  }

  function graphCallback(numVisited) {
    setNumVisited(numVisited);
  }

  const PathResultsDiv = () => {
    if (searching) {
      return (
        <div>
          <p>
            Searched {numVisited} out of {g.size} nodes
          </p>
        </div>
      );
    }
    if (searched && !pathIDs.length) {
      return (
        <div>
          <p>
            No path found. Double check that the inputs are spelled correctly.
            If they are, then there's no way to connect these two players
            through mutual teammates.
          </p>
        </div>
      );
    }
    if (!pathIDs.length) {
      return null;
    }
    const path = [];
    pathIDs.forEach((node, idx) => {
      path.push(g.id_to_name[node]);
      path.push(idx % 2 === 0 ? "who was on the" : "with");
    });
    if (pathIDs.length) {
      path[1] = "was on the";
    }
    const connectionNum = (path.length / 2 - 1) / 2;
    path.pop();

    return (
      <div>
        <p>
          The <strong>number of connections</strong> separating these two
          players is <strong>{connectionNum}</strong>.
        </p>
        <table>
          <tbody>
            {path.map((item, i) => {
              return (
                <tr key={i}>
                  <td
                    className={`six-degrees-row ${
                      i % 4 === 0
                        ? "content-row player-row"
                        : i % 4 === 2
                        ? "content-row team-row"
                        : "filler-row"
                    }`}
                  >
                    <span
                      className={
                        i % 4 === 0
                          ? "player-content"
                          : i % 2 === 0
                          ? `team-content ${g.name_to_id[item].substring(1, 4)}`
                          : "filler-content"
                      }
                    >
                      {item}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  function handleSixDegSubmit(e) {
    e.preventDefault(); // Default behavior is to refresh page, we don't want that
    if (searching) {
      return;
    }
    setSearched(false);
    setSearching(true);

    const id1 = g.name_to_id[playerOne];
    const id2 = g.name_to_id[playerTwo];
    g.uiBlockingTest(id1, id2, graphReturnFunc, graphCallback);
  }

  return (
    <div>
      <h1>Six Degrees of Separation</h1>
      <p>
        Search any two players and see how they're linked by mutual teammates!
      </p>
      <form onSubmit={handleSixDegSubmit}>
        <InputField
          {...{
            inputId: "player1",
            label: "Player 1",
            setValueFunc: setPlayerOne,
          }}
        />
        <InputField
          {...{
            inputId: "player2",
            label: "Player 2",
            setValueFunc: setPlayerTwo,
          }}
        />
        <br />
        <Button type="submit" value="Submit" disabled={searching} />
      </form>
      {searching && (
        <span>
          Loading... <Spinner width="14px" height="14px" />
        </span>
      )}
      <PathResultsDiv />
    </div>
  );
}

export default SixDegreesForm;
