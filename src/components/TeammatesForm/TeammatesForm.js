import React, { useState } from "react";
import g from "../Graph/Graph";
import "./TeammatesForm.scss";

function TeammatesForm() {
  const [teammates, setTeammates] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  const AutocompleteList = () => {
    return (
      <div className="autocomplete-items" id="autocomplete-list">
        {suggestions.map(function (item, i) {
          return (
            <div key={i}>
              {item}
              <input type="hidden" value={item} />{" "}
            </div>
          );
        })}
        {/* <div>
          {"Test"}
          <input type="hidden" value="Test"></input>
        </div>
        <div>
          {"Test2"}
          <input type="hidden" value="Test"></input>
        </div> */}
      </div>
    );
  };

  function handleTeammatesInputChange(e) {
    setSuggestions(g.bestNames(e.target.value));
  }

  function handleTeammatesForm(e) {
    e.preventDefault(); // Default behavior is to refresh page, we don't want that
    const id = g.name_to_id[e.target.player.value];

    const teammateRes = g.getTeammates(id);
    teammateRes.forEach((id, idx) => {
      teammateRes[idx] = g.id_to_name[id];
    });
    setTeammates(teammateRes);
  }

  return (
    <div className="body">
      <h1>Temporary Teammates Form</h1>
      <p>Search up any player and hit submit to see all of their teammates!</p>
      <form autoComplete="off" onSubmit={handleTeammatesForm}>
        <div className="autoComplete">
          <label htmlFor="player">Player: </label>
          <input
            type="text"
            id="player"
            name="player"
            // value={playerOne}
            onChange={handleTeammatesInputChange}
          />
          <AutocompleteList />
        </div>
        <button type="button" onClick={() => {}}>
          Random
        </button>
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
