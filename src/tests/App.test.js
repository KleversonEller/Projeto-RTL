import React from 'react-dom';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './Helpers/renderWithRouter';
import App from '../App';

describe('Teste se contém um conjunto fixo de links de navegação', () => {
  it('Verifica se contem os links "Home" "About" "Favorite Pokémons" nessa ordem', () => {
    renderWithRouter(<App />);
    const links = screen.getAllByRole('link');
    expect(links[0]).toHaveTextContent('Home');
    expect(links[1]).toHaveTextContent('About');
    expect(links[2]).toHaveTextContent('Favorite Pokémons');
  });

  it('Verifica se ao clicar em "Home" é direcionado para a rota "/".', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/about');
    const linkHome = screen.getByRole('link', { name: /home/i });
    expect(linkHome).toBeDefined();
    userEvent.click(linkHome);
    expect(history.location.pathname).toBe('/');
  });

  it(`Verifica se ao clicar em "About"
  é direcionado para a rota "/about".`, () => {
    const { history } = renderWithRouter(<App />);
    const linkAbout = screen.getByRole('link', { name: /about/i });
    expect(linkAbout).toBeDefined();
    userEvent.click(linkAbout);
    expect(history.location.pathname).toBe('/about');
  });

  it(`Verifica se ao clicar em "Favorite Pokémons" 
  é direcionado para a rota "/about".`, () => {
    const { history } = renderWithRouter(<App />);
    history.push('/about');
    const linkFavorite = screen.getByRole('link', { name: /favorite pokémons/i });
    expect(linkFavorite).toBeDefined();
    userEvent.click(linkFavorite);
    expect(history.location.pathname).toBe('/favorites');
  });

  it('Verifica se ao usar uma URL invalida é renderizada a rota "notfound".', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/url-invalida');
    const title = screen.getByRole('heading', {
      name: 'Page requested not found Crying emoji',
      level: 2 });
    expect(title).toBeDefined();
  });
});
