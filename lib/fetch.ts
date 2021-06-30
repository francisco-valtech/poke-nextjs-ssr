import axios from 'redaxios'

export async function getPokemons(n?: number) {
  const pokemons = n || 3000
  const {data: response} = await axios(`http://demo0034747.mockable.io/pokemons`);
  return response
}

export async function getPokemonData(name:string) {
  const { data: response } = await axios(`http://demo0034747.mockable.io/bulbasaur`)
  return response
}