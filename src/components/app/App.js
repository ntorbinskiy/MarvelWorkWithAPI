import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import { Component } from "react";
import decoration from "../../resources/img/vision.png";

class App extends Component {
  state = {
    showRandomChar: true,
  };

  toggleRandomChar = () => {
    this.setState((state) => {
      return {
        showRandomChar: !state.showRandomChar,
      };
    });
  };

  render() {
    return (
      <div className="app">
        <AppHeader />
        <main>
            <RandomChar/>
          <div className="char__content">
            <CharList />
            <CharInfo />
          </div>
          <img className="bg-decoration" src={decoration} alt="vision" />
        </main>
      </div>
    );
  }
}

export default App;
