import React from 'react-dom';
import { screen } from '@testing-library/react';
import { FavoritePokemons } from '../components';
import renderWithRouter from './Helpers/renderWithRouter';

const pokemonsMock = require('../Mocks/FavoritesMock');

describe('Teste a pagina de "Pokémons Favoritos"', () => {
  it(`Verifica se é exibido na tela a mensagem 'No favorite pokemon found',
  se a pessoa não tiver pokémons favoritos.`, () => {
    renderWithRouter(<FavoritePokemons />);
    const title = screen.getByText(/No favorite pokemon found/i);
    expect(title).toBeDefined();
  });

  it('Verifica se é exibido todos os cards de pokémons favoritados.', () => {
    renderWithRouter(<FavoritePokemons pokemons={ pokemonsMock } />);
    const pokemonsName = screen.getAllByTestId('pokemon-name');
    expect(pokemonsName).toBeDefined();
    expect(pokemonsName.length).toBe(2);
    expect(pokemonsName[0]).toHaveTextContent('Pikachu');
    expect(pokemonsName[1]).toHaveTextContent('Charmander');
  });
});
