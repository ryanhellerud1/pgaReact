import React from "react";
const Player = props => {
  return (
    <tr>
      <td>
        {props.player.lastName}, {props.player.firstName}
      </td>
      <td>{props.player.score}</td>
      <td>
        <button onClick={props.deleteHandler} disabled={props.isEditing}>
          Delete
        </button>
      </td>
      <td>
        <button onClick={props.editHandler}>Edit</button>
      </td>
    </tr>
  );
};
export default Player;
