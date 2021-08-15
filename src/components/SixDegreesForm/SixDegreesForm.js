import React, { useState } from "react";
import g from "../Graph/Graph";
import InputField from "../InputField";
import Button from "../Button";

function SixDegreesForm() {
  const [searched, setSearched] = useState(false);

  const [playerOne, setPlayerOne] = useState("");
  const [playerTwo, setPlayerTwo] = useState("");

  const [pathIDs, setPathIDs] = useState([]);

  const PathResults = () => {
    if (searched && !pathIDs.length) {
      return (
        <p>
          No path found. Double check that the inputs are spelled correctly. If
          they are, then there's no way to connect these two players through
          mutual teammates.
        </p>
      );
    }
    const path = [];
    pathIDs.forEach((node, idx) => {
      path[idx] = g.id_to_name[node];
    });

    console.log("Ret table");
    return (
      <table>
        <tbody>
          {path.map((item, i) => {
            return (
              <tr key={i}>
                <td>{item}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
    //     setPathRes(path.map((item) => <li key={`path-item-${item}`}>{item}</li>));
  };

  function handleSubmit2(e) {
    e.preventDefault(); // Default behavior is to refresh page, we don't want that
    setSearched(false);

    const id1 = g.name_to_id[playerOne];
    const id2 = g.name_to_id[playerTwo];
    g.uiBlockingTest(id1, id2, setPathIDs, setSearched);
    // setSearched(true);
  }

  return (
    <div>
      <h1>Six Degrees of Separation</h1>
      <p>
        Search any two players and see how they're linked by mutual teammates!
      </p>
      <form onSubmit={handleSubmit2}>
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
        <Button submit value="Submit" />
      </form>
      <PathResults />
    </div>
  );
}

export default SixDegreesForm;
