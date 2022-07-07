class MarvelService {
  _apiBase = "https://gateway.marvel.com:443/v1/public/characters";
  _apiKey = "apikey=10ba84080c8a3a9bfa62b457f51143f7";
  _baseOffset = 210;
  getResource = async (url) => {
    let res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }
    return await res.json();
  };

  getAllCharacters = async (offset = this._baseOffset) => {
    // console.log(`${this._apiBase}?limit=9&offset=${Math.floor(Math.random() * (1500-210) + 210)}&${this._apiKey}`);
    const res = await this.getResource(
      `${this._apiBase}?limit=9&offset=${offset}&${this._apiKey}`
    );
    return res.data.results.map(this._transformCharacter);
  };

  getCharacter = async (id) => {
    const res = await this.getResource(
      `${this._apiBase}/${id}?${this._apiKey}`
    );
    return this._transformCharacter(res.data.results[0]);
  };

  _transformCharacter = (char) => {
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
}

export default MarvelService;
