import React, { useState } from "react";

function SixDegreesForm() {
  const [pathRes, setPathRes] = useState(null);

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
        <input type="text" id="player1" name="player1" />
        <br /> {/* Rename these ids later */}
        <label htmlFor="player2">Player 2:</label>
        <input type="text" id="player2" name="player2" />
        <br />
        <input type="submit" value="Submit" />
        <br />
      </form>
      <ul>{pathRes}</ul>
    </div>
  );
}

export default SixDegreesForm;
