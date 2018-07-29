import React from "react";

const Form = props => {
  const buttonValue = props.editing.isEditing ? "Save Edit" : "Add Player";
  return (
    <form onSubmit={props.onSubmit}>
      <label>
        First Name:
        <input
          onChange={props.handleInputChange}
          type="text"
          name="firstName"
          value={props.newPlayer.firstName}
        />
      </label>
      <label>
        Last Name:
        <input
          onChange={props.handleInputChange}
          type="text"
          name="lastName"
          value={props.newPlayer.lastName}
        />
      </label>
      <label>
        Score:
        <input
          onChange={props.handleInputChange}
          type="text"
          name="score"
          value={props.newPlayer.score}
        />
      </label>
      <input type="submit" disabled={!props.formValid} value={buttonValue} />
    </form>
  );
};
export default Form;
