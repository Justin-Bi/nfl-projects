import React, { useState } from "react";
import g from "../Graph/Graph";
import "./TeammatesForm.scss";

function TeammatesForm() {
  const [teammates, setTeammates] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [focused, setFocused] = useState(false);
  const [input, setInput] = useState(""); // Will want to rename this to value
  const [textInput, setTextInput] = useState("");
  const [activeIdx, setActiveIdx] = useState(0);

  const AutocompleteList = () => {
    if (!focused) {
      return null;
    }

    return (
      <div
        className="autocomplete-items"
        id="autocomplete-list"
        style={{ borderBottom: suggestions.length ? null : "none" }}
      >
        {suggestions.map(function (item, i) {
          return (
            <div
              key={i}
              // onMouseDown prevents default to stop the form from blurring before onClick can activate
              onMouseDown={(e) => {
                e.preventDefault();
              }}
              onClick={() => {
                setInput(item);
                setFocused(false);
              }}
              className={activeIdx === i ? "autocomplete-active" : null}
            >
              {item}
              <input type="hidden" value={item} />
            </div>
          );
        })}
      </div>
    );
  };

  function handleTeammatesInputChange(e) {
    setSuggestions(g.bestNames(e.target.value, "players"));
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
      <p>
        Search up any player and hit submit to see all of the people they've
        been on a roster with!
      </p>
      <form autoComplete="off" onSubmit={handleTeammatesForm}>
        <div className="autoComplete">
          <label htmlFor="player">Player: </label>
          <input
            type="text"
            id="player"
            name="player"
            value={input}
            onFocus={() => {
              setFocused(true);
            }}
            onBlur={() => {
              setFocused(false);
            }}
            onChange={(e) => {
              setFocused(true);
              setInput(e.target.value);
              setTextInput(e.target.value);
              handleTeammatesInputChange(e);
            }}
            onKeyDown={(e) => {
              if (focused) {
                if (e.key === "ArrowUp") {
                  e.preventDefault();
                  if (activeIdx <= -1) {
                    setActiveIdx(suggestions.length - 1);
                  } else {
                    setActiveIdx(activeIdx - 1);
                  }

                  // Set inputs
                  const newIdx =
                    activeIdx === -1 ? suggestions.length - 1 : activeIdx - 1;
                  setInput(newIdx !== -1 ? suggestions[newIdx] : textInput);
                } else if (e.key === "ArrowDown") {
                  if (activeIdx >= suggestions.length - 1) {
                    setActiveIdx(-1);
                  } else {
                    setActiveIdx(activeIdx + 1);
                  }
                  setInput(
                    activeIdx < suggestions.length - 1
                      ? suggestions[(activeIdx + 1) % suggestions.length]
                      : textInput
                  );
                } else if (e.key === "Enter") {
                  if (activeIdx !== -1) {
                    e.preventDefault();
                    setInput(suggestions[activeIdx]);
                    setFocused(false);
                    setActiveIdx(-1);
                  }
                }
              }
            }}
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
