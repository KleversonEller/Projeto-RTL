import React from 'react-dom';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

beforeEach(() => {
  const { history } = renderWithRouter(<App />);
  history.push('/pokemons/25');
});

describe('Teste se a pagina "Pokemon Details" renderiza corretamente.', () => {
  it(`A página deve conter um texto "<name> Details",
  onde "<name>" é o nome do Pokémon`, () => {
    const title = screen.getAllByRole('heading', {
      name: /Pikachu Details/i,
      level: 2,
    });
    expect(title).toBeDefined();
  });

  it(`Não deve existir o link de navegação para os detalhes
  do Pokémon selecionado.`, () => {
    const linkDetails = screen.queryByRole('link', { name: /More details/i });
    expect(linkDetails).toBe(null);
  });

  it('A seção de detalhes deve conter um heading "h2" com o texto "Summary".', () => {
    const title = screen.getAllByRole('heading', {
      name: /Summary/i,
      level: 2,
    });
    expect(title).toBeDefined();
  });

  it(`A seção de detalhes deve conter um parágrafo com o resumo do
  Pokémon específico sendo visualizado.`, () => {
    const paragrafo = screen.getByText(/This intelligent Pokémon roasts/i);
    expect(paragrafo).toBeDefined();
  });

  it(`Verifica se existe na página uma seção com os mapas contendo
  as localizações do pokémon`, () => {
    const title = screen.getAllByRole('heading', {
      name: /Game Locations of Pikachu/i,
      level: 2,
    });
    expect(title).toBeDefined();
    const maps = screen.getAllByAltText('Pikachu location');
    expect(maps).toBeDefined();
    expect(maps[0].src).toBe('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(maps[1].src).toBe('https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });
});

describe('Teste se o usuário pode favoritar um pokémon na página de detalhes', () => {
  it('A página deve exibir um `checkbox` que permite favoritar o Pokémon', () => {
    const { history } = renderWithRouter(<App />);
    const checkedFavota = screen.getByLabelText(/Pokémon favoritado?/i);
    expect(checkedFavota).toBeDefined();
    userEvent.click(checkedFavota);
    history.push('/favorites');
    const pokemonName = screen.getByTestId(/pokemon-name/i);
    expect(pokemonName).toBeDefined();
    expect(pokemonName).toHaveTextContent(/pikachu/i);
  });
});
