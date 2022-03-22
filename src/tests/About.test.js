import React from 'react-dom';
import { screen } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

describe('Verifica se a página contém as informações sobre a Pokédex.', () => {
  it('Verifica se a página contém um heading "h2" com o texto "About Pokédex".', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/about');
    const title = screen.getByRole('heading', { name: /about pokédex/i,
      level: 2 });
    expect(title).toBeDefined();
  });

  it('Verifica se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/about');
    const paragrafoOne = screen.getByText(/This application simulates/i);
    const paragrafoTwo = screen.getByText(/One can filter Pokémons by/i);
    expect(paragrafoOne).toBeDefined();
    expect(paragrafoTwo).toBeDefined();
  });

  it('Verifica a página contém uma imagem de uma Pokédex.', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/about');
    const imgPkedex = screen.getByAltText('Pokédex');
    expect(imgPkedex.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
