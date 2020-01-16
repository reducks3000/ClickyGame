import React, {Component} from 'react';
import CharacterImages from './components/Characters/CharacterImages';
import Nav from './components/Nav';
import Score from './components/Score';
import characters from './characters.json';
import './App.css';
import { HashRouter } from 'react-router-dom';

class App extends Component {

  state = {
    characters: characters,
    pickedCharacters: [],
    topScore: 0,
    message: "",
  }

  isPicked = event => {
    const name = event.target.attributes.getNamedItem('name').value
    console.log(event.target.attributes.getNamedItem('name').value)
    console.log(this.state)
    this.shuffleCharacters();
    this.checkGuess(name, this.updateTopScore);
  }

  updateTopScore = (newState, cb) => {
    if (newState.pickedCharacters.length > newState.topScore) {
      newState.topScore++;
      this.setState({ topScore: newState.topScore })
    }
    cb(newState);
  }

  shuffleCharacters = () => {
    this.setState({characters: this.shuffleArray(this.state.characters)})
  }

    shuffleArray = (array) => {
    let counter = array.length;
    while (counter > 0) {
      let index = Math.floor(Math.random() * counter);
      counter--;
      let temp = array[counter];
      array[counter] = array[index];
      array[index] = temp;
    }
    return array;
  };


  checkGuess = (name, cb) => {
    const newState = { ...this.state };
    if (newState.pickedCharacters.includes(name)) {
      newState.message = `You already chose that character. Game Over!`
      newState.pickedCharacters = []
      alert(`You already chose that character. Game Over!`)
      this.setState({ message: newState.message})
      this.setState({ pickedCharacters: []})
    } else {
      newState.pickedCharacters.push(name);
      this.setState({ pickedCharacters: newState.pickedCharacters })
    }
    cb(newState, this.checkWin)
  }

  render() {
    return (
      <HashRouter basename='/'>
        <div>
          <Nav/>
          <div className="container">
            <div className="row score-info valign-wrapper">
              <div className="col l6 m8 s12">
                <h4>Try to not click the same character twice!</h4>
              </div>
              <div className="col l6 m4 s12 center">
                <Score type="Score" score={this.state.pickedCharacters.length}/>
                <Score type="Top Score" score={this.state.topScore}/>
              </div>
            </div>
          </div>
          <div id="grid" className="container">
            {this.state.characters.map(character => (
              <CharacterImages
                key={character.id}
                id={character.id}
                name={character.name}
                image={character.image}
                isPicked={this.isPicked}
              />
            ))}
          </div>
        </div>
      </HashRouter>
    )
  }
}

export default App;