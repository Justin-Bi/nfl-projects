import React, { useState } from "react";
import g from "../Graph/Graph";

function SixDegreesForm() {
  const [pathRes, setPathRes] = useState(null);

  const [playerOne, setPlayerOne] = useState("");
  const [playerTwo, setPlayerTwo] = useState("");

  function handleSubmit2(e) {
    e.preventDefault(); // Default behavior is to refresh page, we don't want that
    const id1 = g.name_to_id[e.target.player1.value];
    const id2 = g.name_to_id[e.target.player2.value];

    // If either is undefined, this won't happen
    console.time("path");
    let path = g.path(id1, id2);
    console.timeEnd("path");

    path.forEach((node, idx) => {
      path[idx] = g.id_to_name[node];
    });

    // Covers potential cases if no path has been found
    if (path.length === 0) {
      setPathRes(
        <p>
          No path found. Double check that the inputs are exactly as they are on
          PFR's website. If so, then it's possible there simply is no path
          between the players.
        </p>
      );
      // Otherwise returns the paths in a list format (could update later to make it look better)
    } else {
      setPathRes(path.map((item) => <li key={`path-item-${item}`}>{item}</li>));
    }
  }

  function get_random_player(setFunc) {
    fetch("/api/get_random_player", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setFunc(data.player);
      });
  }

  return (
    <div>
      <h1>Six Degrees of Separation</h1>
      <p>
        Look up two players on Pro Football Reference. Paste in their URL IDs
        and hit submit. As an example, Aaron Rodgers's PFR URL is
        https://www.pro-football-reference.com/players/R/RodgAa00.htm, so his ID
        would be RodgAa00.
      </p>
      <form onSubmit={handleSubmit2}>
        <label htmlFor="player1">Player 1:</label>
        <input
          type="text"
          id="player1"
          name="player1"
          value={playerOne}
          onChange={(e) => setPlayerOne(e.target.value)}
        />
        <button type="button" onClick={() => get_random_player(setPlayerOne)}>
          Random
        </button>
        <br /> {/* Rename these ids later */}
        <label htmlFor="player2">Player 2:</label>
        <input
          type="text"
          id="player2"
          name="player2"
          value={playerTwo}
          onChange={(e) => setPlayerTwo(e.target.value)}
        />
        <button type="button" onClick={() => get_random_player(setPlayerTwo)}>
          Random
        </button>
        <br />
        <input type="submit" value="Submit" />
        <br />
      </form>
      <ul>{pathRes}</ul>
    </div>
  );
}

export default SixDegreesForm;
