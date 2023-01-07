import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './styles/pokeCard.css'

const PokeCard = ({ url }) => {


    const [pokemon, setPokemon] = useState()
    useEffect(() => {
        axios.get(url)
            .then(res => setPokemon(res.data))
            .catch(err => console.log(err))

    }, [])

    const navigate = useNavigate()

    const handledClick = ()=>{
        navigate(`/pokedex/${pokemon.id}`)
    }
    return (
        <article className={`poke-card border-${pokemon?.types[0].type.name}`} onClick={handledClick}>
            <header className={`poke-card_header bg-${pokemon?.types[0].type.name}`}>
                <img className='poke-card_sprite' src={pokemon?.sprites.other['official-artwork'].front_default} alt="" />
            </header>
            <section className='poke-card_body'>
                <h3 className={`poke-card_name color-${pokemon?.types[0].type.name}`}>{pokemon?.name}</h3>
                <ul className='poke-card_types-container'>
                    {
                        pokemon?.types.map(type => (<li className='poke-card_type' key={type.type.name}>{type.type.name}</li>))
                    }
                </ul>
            </section>
            <footer className='poke-card_footer'>
                <ul className='poke-card_stats-container'>
                    {
                        pokemon?.stats.map(stat => (
                            <li className='poke-card_stat' key={stat.stat.name}>
                                <span className='poke-card_label'>
                                    {stat.stat.name}
                                </span>
                                <span className={`poke-card_number color-${pokemon?.types[0].type.name}`}>
                                    {stat.base_stat}
                                </span>

                            </li>
                        ))
                    }
                </ul>
            </footer>
        </article>
    )
}

export default PokeCard