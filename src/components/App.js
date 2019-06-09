// App.js is where all of the game logic will be//
// dependencies//
import React, { Component } from "react";
import Navbar from "./Navbar";
import Container from "./Container";
import Footer from "./Footer";
import Banner from "./Banner";
import images from "../images";

class ClickyGame extends Component {
  state = {
    score: 0,
    highScore: 0,
        //this will be change between colors depending on what is clicked
    navMsgColor: "",

    // contains intro, success, and failure message
    navMessage: "Click image to start!",

    // contains the array of the images
    allCharacters: this.shuffleArray(),

    // this will track each clicked image element.
    wasClicked: [],

    // shakes the container image
    shake: false
  };

  //function binds the current this context to checkClicked to have access to the current state
  // when passed down to the Character component
  clickEvent = this.checkClicked.bind(this);

  // used to shuffle the array of images when the DOM loads, and when an image is clicked
  shuffleArray() {
    // creates a copy of the current characters array to modify it by value, and not by reference
    const newArr = images.slice();

    // this variable will store the shuffled array
    const shuffleArr = [];

    // while loop that goes through index and gets spliced from newArr, reducing its length
    while (newArr.length > 0) {
      shuffleArr.push(
        newArr.splice(Math.floor(Math.random() * newArr.length), 1)[0]
      );
    }

    return shuffleArr;
  }

  checkClicked(clickedElem) {
    // This creates a copy of the wasClicked array to modify it by value, and not by the reference. wasClicked stores all previous clicked images
    const prevState = this.state.wasClicked.slice();

    // This variable shuffles the images
    const shuffled = this.shuffleArray();

    // variables to track score
    let score = this.state.score;
    let highScore = this.state.highScore;

    // if the clicked item is not in wasClicked, then it hasn't been clicked and the score is increased
    if (!this.state.wasClicked.includes(clickedElem)) {
      // if score and highScore are the same, then there is a new highScore value
      if (score === highScore) {
        score++;
        highScore++;

        // if this is not equal, then only increase the score value
      } else {
        score++;
      }

      // this changes the state of the clicked item to wasClicked to track that it has been clicked
      prevState.push(clickedElem);
    }

    // resets the current score if the same element was clicked twice (aka- game over)
    if (this.state.wasClicked.includes(clickedElem)) {
      let score = 0;
      return this.setState({
        score: score,
        highScore: highScore,
        navMsgColor: "incorrect",
        navMessage: "Incorrect guess!",
        allCharacters: shuffled,
        wasClicked: [],
        shake: true
      });
    }

    // if this state runs, then the same element has not been clicked twice and then the score is increased
    this.setState({
      score: score,
      highScore: highScore,
      navMsgColor: "correct",
      navMessage: "You Guessed Correctly!",
      allCharacters: shuffled,
      wasClicked: prevState,
      shake: false
    });

    // removes the green correct indicator on a successful click after .5s to re-render the class on each success
    return setTimeout(() => this.setState({ navMsgColor: "" }), 500);
  }

  // render score to the navbar.
  render() {
    const state = this.state;
    return (
      <div>
        <Navbar
          score={state.score}
          highScore={state.highScore}
          navMessage={state.navMessage}
          navMsgColor={state.navMsgColor}
        />
        <Banner />
        <Container
          shake={state.shake}
          characters={state.allCharacters}
          clickEvent={this.clickEvent}
        />
        <Footer />
      </div>
    );
  }
}

export default ClickyGame;
