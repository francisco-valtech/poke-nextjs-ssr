// Example of ISG
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from "next/head"
import { useRouter } from 'next/router';
import { getPokemons, getPokemonData } from '@/lib/fetch'
import PokemonForm from '@/components/pokemon'

import type { Pokemon } from '@/types/Pokemon'
import type { Pokedex } from '@/types/Pokedex'

interface PokemonApi {
  data: Pokemon,
  date: string
}

const Porygon = (props: PokemonApi) => {
  if (!props?.data?.name) return null;
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading......I had to fetch incrementally!!</div>;
  }
  const pokeName = ""
  // const pokeName = props.data.species.name.charAt(0).toUpperCase() + props.data.species.name.slice(1)
  // console.log("pokeName", pokeName)
  return (
    <>
    <section className="container">
      <Head>
        <title>{pokeName} | PokéSSR - AWS Amplify</title>
        <meta property="og:title" content={`${pokeName} | PokéSSR - AWS Amplify`} key="title" />
      </Head>
      <PokemonForm poke={props} />
    </section>
    <p className="poke-center">{`Generated at ${new Date(props.date).toLocaleString()}`}</p>
    </>
  )
      
}

export const getStaticProps: GetStaticProps = async (context) => {
  let data

  if (context.params) {

    data = await getPokemonData(context.params.name as string)
  } else {
    data = {}
  }

  return {
    props: {
      data,
      date: new Date().toISOString(),
    },
    revalidate: 30
  }
};

export const getStaticPaths: GetStaticPaths<{ name: string }> = async () => {

  const pokemons = await getPokemons(1) as Pokedex
  
  const paths = pokemons.results.map((pokemon) => {
    return { params: { name: pokemon.name.toString() } };
  });

  return {
    fallback: true,
    paths,
  };
};

export default Porygon