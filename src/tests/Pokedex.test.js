import React from 'react-dom';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './Helpers/renderWithRouter';
import { Pokedex } from '../components';
import App from '../App';

const listaPokemons = require('../Mocks/FavoritesMock');
const favoriteState = require('../Mocks/FavoriteStetMock');

describe('Teste se a pagina "Pokédex" renderiza corretamente.', () => {
  it(`Verifica se página contém um heading "h2" com o texto 'Encountered pokémons'.`, () => {
    renderWithRouter(<App />);
    const title = screen.getByRole('heading', {
      name: 'Encountered pokémons',
      level: 2 });
    expect(title).toBeDefined();
  });

  it('Verifica se a página contém um button com o texto "Próximo pokémon".', () => {
    renderWithRouter(<App />);
    const btn = screen.getByRole('button', {
      name: 'Próximo pokémon' });
    expect(btn).toBeDefined();
  });

  it('Verifica se ao clicar no button troca o card do pokemon".', () => {
    renderWithRouter(<Pokedex
      pokemons={ listaPokemons }
      isPokemonFavoriteById={ favoriteState }
    />);
    const btn = screen.getByRole('button', {
      name: 'Próximo pokémon' });
    expect(btn).toBeDefined();
    userEvent.click(btn);
    const namePokemon = screen.getByTestId('pokemon-name');
    expect(namePokemon).toHaveTextContent('Charmander');
    expect(btn).toBeDefined();
    userEvent.click(btn);
    expect(namePokemon).toHaveTextContent('Pikachu');
  });

  it('Verifica se a página contém um pokemon por vez.', () => {
    renderWithRouter(<Pokedex
      pokemons={ listaPokemons }
      isPokemonFavoriteById={ favoriteState }
    />);
    const namePokemon = screen.getAllByTestId('pokemon-name');
    expect(namePokemon.length).toBe(1);
  });

  it('Verifica se a página contém um button para cada pokemon type.', () => {
    renderWithRouter(<App />);
    const btnElectric = screen.getAllByRole('button', { name: 'Electric' });
    const btnFire = screen.getAllByRole('button', { name: 'Fire' });
    const btnBug = screen.getAllByRole('button', { name: 'Bug' });
    const btnPoison = screen.getAllByRole('button', { name: 'Poison' });
    const btnPsychic = screen.getAllByRole('button', { name: 'Psychic' });
    const btnNormal = screen.getAllByRole('button', { name: 'Normal' });
    const btnDragon = screen.getAllByRole('button', { name: 'Dragon' });
    expect(btnPsychic).toBeDefined();
    expect(btnPsychic.length).toBe(1);
    expect(btnPoison).toBeDefined();
    expect(btnPoison.length).toBe(1);
    expect(btnNormal).toBeDefined();
    expect(btnNormal.length).toBe(1);
    expect(btnFire).toBeDefined();
    expect(btnFire.length).toBe(1);
    expect(btnElectric).toBeDefined();
    expect(btnElectric.length).toBe(1);
    expect(btnDragon).toBeDefined();
    expect(btnDragon.length).toBe(1);
    expect(btnBug).toBeDefined();
    expect(btnBug.length).toBe(1);
  });

  it('Verifica se a página contém um button para cada pokemon type.', () => {
    renderWithRouter(<App />);
    const btnAll = screen.getByRole('button', { name: /All/i });
    expect(btnAll).not.toBeDisabled();
  });

  it('Verifica se os buttons de filtro funcionam.', () => {
    renderWithRouter(<App />);
    const btnSelect = screen.getByTestId('');
    expect(btnSelect).toBeDefined();
    const btnAll = screen.getByRole('button', { name: /All/i });
    userEvent.click(btnAll);
    const btnNext = screen.getByRole('button', { name: /Próximo pokémon/i });
    expect(btnNext).not.toBeDisabled();
  });
});
