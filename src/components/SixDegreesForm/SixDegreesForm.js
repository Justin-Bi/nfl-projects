import React, { useState } from "react";

function SixDegreesForm() {
  return (
    <div>
      <h1>Six Degrees Form</h1>
      <p>
        Look up two players on Pro Football Reference. Paste in their URL IDs
        and hit submit. As an example, Aaron Rodgers's PFR URL is
        https://www.pro-football-reference.com/players/R/RodgAa00.htm, so his ID
        would be RodgAa00.
      </p>
      {/* <form onSubmit={handleSubmit2}> */}
      <form>
        <label htmlFor="player1">Player 1:</label>
        <input type="text" id="player1" name="fname" />
        <br /> {/* Rename these ids later */}
        <label htmlFor="player2">Player 2:</label>
        <input type="text" id="lname" name="player2" />
        <br />
        <input type="submit" value="Submit" />
        <br />
      </form>
    </div>
  );
}

export default SixDegreesForm;
