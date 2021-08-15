import React, { useState } from "react";
import g from "../Graph/Graph";
import "./TeammatesForm.scss";
import InputField from "../InputField";
import Button from "../Button";
import Icon from "../Icon";
import HeroText from "../HeroText";

function TeammatesForm() {
  const [teammates, setTeammates] = useState([]);
  const [value, setValue] = useState("");
  const [dispValue, setDispValue] = useState("");
  const [corrected, setCorrected] = useState(true);
  const [invSearch, setInvSearch] = useState(false);
  const [listToggle, setListToggle] = useState(false);

  function handleTeammatesForm(e) {
    e.preventDefault(); // Default behavior is to refresh page, we don't want that
    setCorrected(false);
    setInvSearch(false);
    setListToggle(false);
    let id;
    if (!g.players.includes(value)) {
      const res = g.bestNames(value, "players", 1);
      if (!res.length) {
        setInvSearch(true);
        return;
      }
      setCorrected(true);
      id = g.name_to_id[res[0]];
      setDispValue(res[0]);
    } else {
      id = g.name_to_id[value];
      setDispValue(value);
    }

    const teammateRes = g.getTeammates(id);
    teammateRes.forEach((id, idx) => {
      teammateRes[idx] = g.id_to_name[id];
    });
    setTeammates(teammateRes);
  }

  const TeammatesReturnDiv = () => {
    if (invSearch) {
      return (
        <div>
          <p>
            Sorry, we weren't able to find anyone with that name, please double
            check the input.
          </p>
        </div>
      );
    } else if (!teammates.length) {
      return null;
    }
    return (
      <div>
        {corrected && (
          <p>
            Did you mean <strong>{dispValue}</strong>?
          </p>
        )}
        <p>
          <strong>{dispValue}</strong> has been on a roster with{" "}
          <strong>{teammates.length}</strong> unique people.
        </p>
        <p
          id="toggle-paragraph"
          onClick={() => {
            setListToggle(!listToggle);
          }}
        >
          Click here to {listToggle ? "hide" : "show"} all the teammates{" "}
          <Icon
            type={listToggle ? "UpArrow" : "DownArrow"}
            style={{ fill: "#333333", height: "18px" }}
          />
        </p>
        {listToggle &&
          teammates.map(function (item, i) {
            return <li key={i}>{item}</li>;
          })}
      </div>
    );
  };

  const props = {
    inputId: "player",
    label: "Player",
    setValueFunc: setValue,
  };

  return (
    <div id="teammates-form">
      <HeroText>Teammates</HeroText>
      <p>
        Search up any player and hit submit to see all of the people they've
        been on a roster with!
      </p>
      <form autoComplete="off" onSubmit={handleTeammatesForm}>
        <div className="input-field-group">
          <InputField {...props} />
        </div>
        <Button type="submit" value="Submit" />
      </form>
      <TeammatesReturnDiv />
    </div>
  );
}

export default TeammatesForm;
