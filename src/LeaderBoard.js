import React, { Component } from "react";
import Player from "./Player";
import Form from "./Form";

class LeaderBoard extends Component {
  constructor(props) {
    let initialID =
      "_" +
      Math.random()
        .toString(36)
        .substr(2, 9);
    super(props);
    this.state = {
      editing: {
        isEditing: false,
        editingID: null
      },
      error: {
        scoreError: "",
        firstNameError: "",
        lastNameError: "",
        editingError: "",
        formValid: true
      },
      validFields: {
        firstName: true,
        lastName: true,
        score: true
      },
      playerData: [],
      newPlayer: {
        firstName: "",
        lastName: "",
        score: "",
        id: initialID
      }
    };
  }

  handleSubmit = event => {
    let genId =
      "_" +
      Math.random()
        .toString(36)
        .substr(2, 9);
    event.preventDefault();
    const {
      state: {
        newPlayer,
        newPlayer: { firstName, lastName, score },
        playerData,
        editing,
        editing: { isEditing }
      }
    } = this;
    let updatedPlayerData = playerData,
      updatedEditing = false;

    if (!firstName || !lastName || !score) {
      return false;
    }
    if (isEditing) {
      updatedEditing = false;
      updatedPlayerData = playerData.filter(player => {
        return player.id !== editing.editingID;
      });
    }
    this.setState({
      playerData: [...updatedPlayerData, { ...newPlayer }],
      newPlayer: {
        lastName: "",
        firstName: "",
        score: "",
        id: genId
      },
      editing: { ...editing, isEditing: updatedEditing }
    });
  };

  errorCheck = (inputName, value) => {
    const {
        state: {
          newPlayer: { score }
        }
      } = this,
      validFields = {},
      nameCheck = this.state.newPlayer[inputName],
      updatedName = inputName ? inputName.split("N")[0] + " name" : "";
    let errorMessage = "";

    if (inputName === "score") {
      if (!score || score < 0 || score > 100 || isNaN(score)) {
        validFields[inputName] = false;
        errorMessage = "score must be a number between 0-100";
      } else {
        validFields[inputName] = true;
      }
    } else if (inputName === "firstName" || inputName === "lastName") {
      if (/\d/.test(nameCheck) || !nameCheck) {
        validFields[inputName] = false;
        errorMessage = !nameCheck
          ? `${updatedName} must not be blank`
          : `${updatedName} must be alphabetic`;
      } else {
        validFields[inputName] = true;
      }
    }
    this.setState(
      {
        validFields: {
          ...this.state.validFields,
          [inputName]: validFields[inputName]
        },
        error: { ...this.state.error, [inputName + "Error"]: errorMessage }
      },
      this.validateForm
    );
  };

  validateForm() {
    const {
      state: { error, validFields }
    } = this;
    this.setState({
      error: {
        ...error,
        formValid:
          validFields.firstName && validFields.lastName && validFields.score
      }
    });
  }

  handleInputChange = event => {
    const {
      target: { name: inputName, value }
    } = event;
    const {
      state: { newPlayer }
    } = this;

    this.setState(
      {
        newPlayer: { ...newPlayer, [inputName]: value }
      },
      () => this.errorCheck(inputName, value)
    );
  };

  handleEdit = id => {
    const {
      state: { playerData }
    } = this;
    const editingPlayer = playerData.find(player => {
      return player.id === id;
    });
    this.setState({
      editing: {
        isEditing: true,
        editingID: id
      },
      newPlayer: editingPlayer
    });
  };

  handleDelete = id => {
    const removedPlayer = this.state.playerData.filter(
      player => player.id !== id
    );
    this.setState({
      playerData: removedPlayer
    });
  };

  render() {
    const {
      state: {
        newPlayer: { firstName, lastName },
        playerData,
        error,
        editing: { isEditing }
      }
    } = this;

    const headingText = isEditing
      ? `your editing ${firstName} ${lastName}`
      : "Add a player to the board";

    const playerList = playerData
      .sort((player1, player2) => {
        if (player1.score === player2.score) {
          return player1.lastName.localeCompare(player2.lastName);
        } else {
          return player2.score - player1.score;
        }
      })
      .map((player, i) => {
        return (
          <Player
            isEditing={isEditing}
            key={i}
            player={player}
            deleteHandler={this.handleDelete.bind(this, player.id)}
            editHandler={this.handleEdit.bind(this, player.id)}
          />
        );
      });

    const noPlayers = <div className="no-result"> Currently no players </div>;

    const player = (
      <table style={{ margin: "0 auto" }}>
        <colgroup span="3" />
        <thead>
          <tr>
            <th>Name</th>
            <th>Score</th>
            <th />
          </tr>
        </thead>
        <tbody>{playerList}</tbody>
      </table>
    );

    const players = playerData.length === 0 ? noPlayers : player;

    return (
      <div>
        <h3>{headingText}</h3>
        <Form
          handleInputChange={this.handleInputChange}
          onSubmit={this.handleSubmit}
          editing={this.state.editing}
          newPlayer={this.state.newPlayer}
          formValid={this.state.error.formValid}
        />
        {error.scoreError && <div className="error">{error.scoreError}</div>}
        {error.lastNameError && (
          <div className="error">{error.lastNameError}</div>
        )}
        {error.firstNameError && (
          <div className="error">{error.firstNameError}</div>
        )}
        {error.editingError && (
          <div className="error">{error.editingError}</div>
        )}
        <div>{players}</div>
      </div>
    );
  }
}

export default LeaderBoard;
