import React, { useState } from "react";

function SixDegreesForm() {
  const [test, setTest] = useState(null);

  function handleSubmit2(e) {
    e.preventDefault(); // Default behavior is to refresh page, we don't want that

    fetch("/api/path", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        player1: e.target.player1.value,
        player2: e.target.player2.value,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.path.length === 0) {
          setTest(
            <p>
              No path found. Double check that the inputs are exactly as they
              are on PFR's website. If so, then it's possible there simply is no
              path between the players.
            </p>
          );
        } else {
          setTest(
            data.path.map((item) => <li key={`path-item-${item}`}>{item}</li>)
          );
        }
      });

      fetch("/api/time", {})
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
        });
  }

  return (
    <div>
      <h1>Six Degrees Form</h1>
      <p>
        Look up two players on Pro Football Reference. Paste in their URL IDs
        and hit submit. As an example, Aaron Rodgers's PFR URL is
        https://www.pro-football-reference.com/players/R/RodgAa00.htm, so his ID
        would be RodgAa00.
      </p>
      <form onSubmit={handleSubmit2}>
        <label htmlFor="player1">Player 1:</label>
        <input type="text" id="player1" name="fname" />
        <br /> {/* Rename these ids later */}
        <label htmlFor="player2">Player 2:</label>
        <input type="text" id="lname" name="player2" />
        <br />
        <input type="submit" value="Submit" />
        <br />
      </form>
      <ul>{test}</ul>
    </div>
  );
}

export default SixDegreesForm;
