import React, { useState } from "react";
import "./InputField.scss";
import g from "../Graph/Graph";

function InputField({ inputId, label, setValueFunc }) {
  const [focused, setFocused] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const [suggestions, setSuggestions] = useState([]);
  const [textInput, setTextInput] = useState("");
  const [input, setInput] = useState(""); // Will want to rename this to value

  const AutocompleteList = () => {
    return !focused ? null : (
      <div
        id="autocomplete-list"
        className="autocomplete-items"
        style={{ borderBottom: suggestions.length ? null : "none" }}
      >
        {suggestions.map(function (item, i) {
          return (
            <div
              className={activeIdx === i ? "autocomplete-active" : null}
              // Prevents the bottom item to have a double border conflicting with the container
              style={{
                borderBottom: i === suggestions.length - 1 ? "none" : null,
              }}
              key={i}
              // onMouseDown prevents default to stop the form from blurring before onClick can activate
              onMouseDown={(e) => {
                e.preventDefault();
              }}
              onClick={() => {
                setInput(item);
                setValueFunc(item);
                setFocused(false);
                setActiveIdx(-1);
                handleTeammatesInputChange(item);
              }}
            >
              {item}
            </div>
          );
        })}
      </div>
    );
  };

  function handleTeammatesInputChange(searchQuery) {
    setSuggestions(g.bestNames(searchQuery, "players"));
  }

  return (
    <div className="autoComplete">
      <div className="temp-div">
        <label htmlFor={inputId}>{label}</label>
        <input
          type="text"
          id={inputId}
          name={inputId}
          className="input-class"
          value={input}
          style={{
            borderRadius:
              focused && suggestions.length !== 0 ? "4px 4px 0 0" : "4px",
          }}
          onFocus={() => {
            setFocused(true);
          }}
          onBlur={(e) => {
            setFocused(false);
            setActiveIdx(-1);
            handleTeammatesInputChange(e.target.value);
          }}
          onChange={(e) => {
            setFocused(true);
            setActiveIdx(-1);
            setInput(e.target.value);
            setValueFunc(e.target.value);
            setTextInput(e.target.value);
            handleTeammatesInputChange(e.target.value);
          }}
          onKeyDown={(e) => {
            if (focused) {
              if (e.key === "ArrowUp") {
                e.preventDefault();
                const calcIdx =
                  activeIdx <= -1 ? suggestions.length - 1 : activeIdx - 1;
                setActiveIdx(calcIdx);
                // Set inputs
                const newIdx =
                  activeIdx === -1 ? suggestions.length - 1 : activeIdx - 1;
                setInput(newIdx !== -1 ? suggestions[newIdx] : textInput);
                setValueFunc(newIdx !== -1 ? suggestions[newIdx] : textInput);
              } else if (e.key === "ArrowDown") {
                const calcIdx =
                  activeIdx >= suggestions.length - 1 ? -1 : activeIdx + 1;
                setActiveIdx(calcIdx);
                const calcInput =
                  activeIdx < suggestions.length - 1
                    ? suggestions[(activeIdx + 1) % suggestions.length]
                    : textInput;
                setInput(calcInput);
                setValueFunc(calcInput);
              } else if (e.key === "Enter") {
                if (activeIdx !== -1) {
                  e.preventDefault();
                  setInput(suggestions[activeIdx]);
                  handleTeammatesInputChange(suggestions[activeIdx]);
                  setFocused(false);
                  setActiveIdx(-1);
                }
              }
            }
          }}
        />
        <AutocompleteList />
      </div>
      <div className="svg-container">
        <svg
          version="1.1"
          id="Capa_1"
          className="random-input-icon"
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          viewBox="0 0 230.055 230.055"
          onClick={() => {
            const playerName = g.randomName("players");
            setInput(playerName);
            setTextInput(playerName);
            setValueFunc(playerName);
            handleTeammatesInputChange(playerName);
          }}
        >
          <path
            d="M199.419,124.497c-3.516-3.515-9.213-3.515-12.729,0c-3.515,3.515-3.515,9.213,0,12.728l12.637,12.636h-8.406 c-8.177,0-16.151-2.871-22.453-8.083l-32.346-26.751l32.345-26.751c6.303-5.212,14.277-8.083,22.454-8.083h8.406L186.69,92.83
	              c-3.515,3.515-3.515,9.213,0,12.728c1.758,1.757,4.061,2.636,6.364,2.636s4.606-0.879,6.364-2.636l28-28
	              c3.515-3.515,3.515-9.213,0-12.728l-28-28c-3.516-3.515-9.213-3.515-12.729,0c-3.515,3.515-3.515,9.213,0,12.728l12.637,12.636
                h-8.406c-12.354,0-24.403,4.337-33.926,12.211L122,103.348L82.564,70.733c-6.658-5.507-15.084-8.54-23.724-8.54H9
                c-4.971,0-9,4.029-9,9s4.029,9,9,9h49.841c4.462,0,8.813,1.566,12.252,4.411l36.786,30.423L71.094,145.45
                c-3.439,2.844-7.791,4.411-12.253,4.411H9c-4.971,0-9,4.029-9,9s4.029,9,9,9h49.841c8.64,0,17.065-3.033,23.725-8.54L122,126.707
                l34.996,28.943c9.521,7.875,21.57,12.211,33.925,12.211h8.406l-12.637,12.636c-3.515,3.515-3.515,9.213,0,12.728
                c1.758,1.757,4.061,2.636,6.364,2.636s4.606-0.879,6.364-2.636l28-28c3.515-3.515,3.515-9.213,0-12.728L199.419,124.497z"
          />
        </svg>
      </div>
    </div>
  );
}

export default InputField;
