import { useHttp } from "../hooks/http.hook";
import { useCallback } from "react";

const _transformCharacter = (char) => {
  return {
    id: char.id,
    name: char.name,
    description: char.description
      ? `${char.description.slice(0, 210)}...`
      : "This character hasn't got any description",
    thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
    homepage: char.urls[0].url,
    wiki: char.urls[1].url,
    comics: char.comics.items,
  };
};

const _apiBase = "https://gateway.marvel.com:443/v1/public/";
const _apiKey = "apikey=10ba84080c8a3a9bfa62b457f51143f7";
const _baseOffset = Math.floor(Math.random() * (1500 - 210) + 210);

const useMarvelService = () => {
  const { loading, request, error, clearError} = useHttp();

  const getAllCharacters = useCallback(
    async (offset = _baseOffset) => {
      // console.log(`${ _apiBase}?limit=9&offset=${Math.floor(Math.random() * (1500-210) + 210)}&${ _apiKey}`);
      const res = await request(
        `${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`
      );
      return res.data.results.map(_transformCharacter);
    },
    [request]
  );

  const getCharacter = useCallback(
    async (id) => {
      const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
      return _transformCharacter(res.data.results[0]);
    },
    [request]
  );

  const getAllComics = async (offset = 0) => {
    const res = await request(
      `${_apiBase}comics?orderBy=issueNumber&limit=8&offset=${offset}&${_apiKey}`
    );
    console.log(`${_apiBase}comics?orderBy=issueNumber&limit=8&offset=${offset}&${_apiKey}`);
    return res.data.results.map(_transformComics);
  };

  const getComic = async (id) => {
    const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
    return _transformComics(res.data.results[0]);
  };

  const _transformComics = (comics) => {
    return {
        id: comics.id,
        title: comics.title,
        description: comics.description || 'There is no description',
        pageCount: comics.pageCount ? `${comics.pageCount} p.` : 'No information about the number of pages',
        thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
        language: comics.textObjects.language || 'en-us',
        price: comics.prices[0].price ? `${comics.prices[0].price}$` : 'not available'
    }
}
return {loading, error, clearError, getAllCharacters, getCharacter, getAllComics, getComic}};

export default useMarvelService;
