import { useCallback, useEffect, useState } from "react";
import Spinner from "../spinner/Spinner";
import mjolnir from "../../resources/img/mjolnir.png";
import useMarvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";
import "./randomChar.scss";

const falsenail =
  "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg";
const RandomChar = () => {
  const [char, setChar] = useState({});

  const { loading, error, getCharacter } = useMarvelService();

  const onCharLoaded = useCallback((char) => {
    setChar(char);
  }, []);

  const updateChar = useCallback(() => {
    const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
    
    getCharacter(id).then(onCharLoaded).catch(console.error);
  }, [getCharacter, onCharLoaded]);

  useEffect(() => updateChar(), [updateChar]);

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error) ? <View char={char} /> : null;
  return (
    <div className="randomchar">
      {errorMessage}
      {spinner}
      {content}
      <div className="randomchar__static">
        <p className="randomchar__title">
          Random character for today!
          <br />
          Do you want to get to know him better?
        </p>
        <p className="randomchar__title">Or choose another one</p>
        <button onClick={updateChar} className="button button__main">
          <div className="inner">try it</div>
        </button>
        <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
      </div>
    </div>
  );
};
const View = ({ char }) => {
  const { name, description, thumbnail, homepage, wiki } = char;
  const check = falsenail === thumbnail ? true : false;
  return (
    <div className="randomchar__block">
      <img
        src={thumbnail}
        alt="Random character"
        className={
          check ? "randomchar__img__err randomchar__img" : "randomchar__img"
        }
      />
      <div className="randomchar__info">
        <p className="randomchar__name">{name}</p>
        <p className="randomchar__descr">{description}</p>
        <div className="randomchar__btns">
          <a href={homepage} className="button button__main">
            <div className="inner">homepage</div>
          </a>
          <a href={wiki} className="button button__secondary">
            <div className="inner">Wiki</div>
          </a>
        </div>
      </div>
    </div>
  );
};
export default RandomChar;
