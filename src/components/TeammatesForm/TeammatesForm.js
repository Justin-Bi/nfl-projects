import React, { useState } from "react";
import g from "../Graph/Graph";
import "./TeammatesForm.scss";
import InputField from "../InputField";

function TeammatesForm() {
  const [teammates, setTeammates] = useState([]);
  const [value, setValue] = useState("");

  // function handleTeammatesInputChange(e) {
  //   setSuggestions(g.bestNames(e.target.value, "players"));
  // }

  function handleTeammatesForm(e) {
    e.preventDefault(); // Default behavior is to refresh page, we don't want that
    // const id = g.name_to_id[e.target.player.value];
    const id = g.name_to_id[value];

    const teammateRes = g.getTeammates(id);
    teammateRes.forEach((id, idx) => {
      teammateRes[idx] = g.id_to_name[id];
    });
    setTeammates(teammateRes);
  }

  const props = {
    inputId: "player",
    passedValue: value,
    setValueFunc: setValue,
  };

  return (
    <div id="teammates-form">
      <h1 className="hero-title">Teammates</h1>
      <p>
        Search up any player and hit submit to see all of the people they've
        been on a roster with!
      </p>
      <form autoComplete="off" onSubmit={handleTeammatesForm}>
        <div className="input-field-group">
          <div className="autoComplete">
            <label htmlFor="player">Player</label>
            <InputField {...props} />
          </div>
        </div>
        <br />
        <input type="submit" value="Submit" />
      </form>
      <div>
        {teammates.map(function (item, i) {
          return <li key={i}>{item}</li>;
        })}
      </div>
    </div>
  );
}

export default TeammatesForm;
