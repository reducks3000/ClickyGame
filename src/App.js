import React, {Component} from 'react';
import Score from './components/Score';
import characters from './characters.json';
import './App.css';
import { HashRouter } from 'react-router-dom';
import Modal from 'react-modal';
import Nav from './components/Navbar'

class App extends Component {

  state = {
    characters: characters,
    beenPicked: [],
    topScore: 0,
  }

  isPicked = e => {
    const name = e.target.attributes.getNamedItem('name').value
    console.log(e.target.attributes.getNamedItem('name').value)
    console.log(this.state)
    this.shuffleCharacters();
    this.checkGuess(name, this.updateTopScore);
  }

  shuffleCharacters = () => {
    this.setState({characters: this.shuffleArray(this.state.characters)})
  }

  

  render() {
    return (
      <HashRouter basename='/'>
        <div>
          <Nav>
            <div className="container">
              <div className="row scoreInfo">
                <div className="col l4 m8 s12">
                  <h3>Try not to click the same character twice!</h3>
                </div>
              </div>
            </div>
          </Nav>
        </div>
      </HashRouter>
    )
  }

}

export default App;