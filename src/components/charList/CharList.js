import "./charList.scss";
import { Component } from "react";
import MarvelService from "../../services/MarvelService";
class CharList extends Component {
  MarvelService = new MarvelService();

  constructor(props) {
    super(props);

    this.state = {
      results: [],
      hover: false,
      loading: false,
      error: false
    };

    this.OnHover = this.OnHover.bind(this);
  }

  componentDidMount() {
    this.UpdateChars();
  }

  UpdateChars() {
    console.log("Update");
    this.MarvelService.getAllCharacters()
      .then((result) => this.OnCharsLoaded(result))
      .catch((err) => this.OnCharsError(err));
  }

  OnCharsLoaded(results) {
    console.log("loaded");
    this.setState({
      results,
      loading: false,
      error: false,
    });
  }

  OnCharsError(err) {
    console.error("Error", err);
    this.setState({
      loading: false,
      error: true,
    });
  }
  OnHover() {
    this.setState({
      hover: !this.state.hover
    });
  }
  render() {
    const { results, hover} = this.state;

    const resultItems = results.map((result, index) => (
      <li
      onMouseEnter={this.OnHover}
        className={hover ? "char__item char__item_selected" : "char__item"}
        key={index}
      >
        <img src={result.thumbnail} alt={result.name} />
        <div className="char__name">{result.name}</div>
      </li>
    ));

    return (
      <div className="char__list">
        <ul className="char__grid">{resultItems}</ul>
        <button className="button button__main button__long">
          <div className="inner">load more</div>
        </button>
      </div>
    );
  }
}

export default CharList;
