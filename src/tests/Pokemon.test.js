import React from 'react-dom';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './Helpers/renderWithRouter';
import { Pokemon } from '../components';

const listaPokemons = require('../Mocks/FavoritesMock');

describe('Teste se a pagina "Pokemon" renderiza corretamente.', () => {
  it('O nome correto do Pokémon deve ser mostrado na tela.', () => {
    renderWithRouter(<Pokemon
      pokemon={ listaPokemons[0] }
      isFavorite={ false }
    />);
    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toBeDefined();
    expect(pokemonName).toHaveTextContent('Pikachu');
  });

  it('O tipo correto do pokémon deve ser mostrado na tela.', () => {
    renderWithRouter(<Pokemon
      pokemon={ listaPokemons[0] }
      isFavorite={ false }
    />);
    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType).toBeDefined();
    expect(pokemonType).toHaveTextContent('Electric');
  });

  it(`O peso médio do pokémon deve ser exibido com um texto no formato
  'Average weight: <value> <measurementUnit>'; onde '<value>' e '<measurementUnit>'
  são, respectivamente, o peso médio do pokémon e sua unidade de medida.`, () => {
    renderWithRouter(<Pokemon
      pokemon={ listaPokemons[0] }
      isFavorite={ false }
    />);
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    expect(pokemonWeight).toBeDefined();
    expect(pokemonWeight).toHaveTextContent('Average weight: 6.0 kg');
  });

  it(`A imagem do Pokémon deve ser exibida. Ela deve conter um atributo
  'src' com a URL da imagem e um atributo 'alt' com o texto '<name> sprite',
  onde '<name>' é o nome do pokémon`, () => {
    renderWithRouter(<Pokemon
      pokemon={ listaPokemons[0] }
      isFavorite={ false }
    />);
    const pokemonImg = screen.getByAltText('Pikachu sprite');
    expect(pokemonImg).toBeDefined();
    expect(pokemonImg.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  it(`Verifica se o card do Pokémon indicado na Pokédex contém um link de navegação
  para exibir detalhes deste Pokémon. O link deve possuir a URL '/pokemons/<id>',
  onde '<id>' é o id do Pokémon exibido`, () => {
    const { history } = renderWithRouter(<Pokemon
      pokemon={ listaPokemons[0] }
      isFavorite={ false }
    />);
    const linkDetails = screen.getByRole('link', { name: /More details/i });
    expect(linkDetails).toBeDefined();
    userEvent.click(linkDetails);
    expect(history.location.pathname).toBe('/pokemons/25');
  });

  it('Verifica se existe um ícone de estrela nos Pokémons favoritados', () => {
    renderWithRouter(<Pokemon
      pokemon={ listaPokemons[0] }
      isFavorite
    />);
    const pokemonImg = screen.getByAltText('Pikachu is marked as favorite');
    expect(pokemonImg).toBeDefined();
    expect(pokemonImg.src).toBe('http://localhost/star-icon.svg');
  });
});
