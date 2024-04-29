import React, { useState, useEffect } from "react";
import axios from "axios";

function PokemonInfo() {
    const [pokemon, setPokemon] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const pokemon_name = `ivysaur`;

    useEffect(()=>{
        setLoading(true);
        const url = `https://pokeapi.co/api/v2/pokemon/${pokemon_name}`;

        axios.get(url)
            .then(response => {
                setPokemon(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError('Error fetching Pokemon data');
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!pokemon) return <p>No pokemon data available.</p>;

    return (
        <div style={{'margin': '50px', 'top':'50px', 'left':'50px'}}>
            <h1>{pokemon.name}</h1>
            <img src={pokemon.sprites.front_default} alt={`${pokemon.name} sprite`} />
            <p>Height: {pokemon.height * 10} cm</p>
            <p>Weight: {pokemon.weight / 10} kg</p>
            <ul>
                {pokemon.abilities.map((ability, index) => (
                    <li key={index}>{ability.ability.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default PokemonInfo;