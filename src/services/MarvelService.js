
class MarvelService {
    _apiBase = "https://gateway.marvel.com:443/v1/public/characters";
    _apiKey = "apikey=10ba84080c8a3a9bfa62b457f51143f7";
    getResource = async (url) => {
        let res = await fetch(url);
    
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
    
        return await res.json();
    }
    
    getAllCharacters = () => {
        return this.getResource(`${this._apiBase}?limit=9&offset=210&${this._apiKey}`);
    }

    getCharacter = (id) => {
        return this.getResource(`${this._apiBase}/${id}?${this._apiKey}`)
    }

}

export default MarvelService;