import React, { useState, useEffect } from "react";
import Select from "react-select";
import "./SixDegreesForm.css";

function SixDegreesForm() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    fetch("/api/get_all_players", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setPlayers(...players, data.players);
      });
  }, []);

  console.log(players.length);
  console.log(players.map((name) => ({ value: name, label: name }))); // Change this later so that it's stored as data

  const [pathRes, setPathRes] = useState(null);

  const [playerOne, setPlayerOne] = useState("");
  const [playerTwo, setPlayerTwo] = useState("");

  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  function handleSubmit2(e) {
    e.preventDefault(); // Default behavior is to refresh page, we don't want that

    // Send the two player IDs over to the API to perform the shortest path alg
    fetch("/api/path", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // Both player IDs
        player1: e.target.player1.value,
        player2: e.target.player2.value,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // Covers potential cases if no path has been found
        if (data.path.length === 0) {
          setPathRes(
            <p>
              No path found. Double check that the inputs are exactly as they
              are on PFR's website. If so, then it's possible there simply is no
              path between the players.
            </p>
          );
          // Otherwise returns the paths in a list format (could update later to make it look better)
        } else {
          setPathRes(
            data.path.map((item) => <li key={`path-item-${item}`}>{item}</li>)
          );
        }
      });
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
