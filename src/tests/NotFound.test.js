import React from 'react-dom';
import { screen } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

describe('Teste se a pagina "NotFound" renderiza corretamente.', () => {
  it(`Verifica se página contém um heading "h2" com o texto
  'Page requested not found 😭'.`, () => {
    const { history } = renderWithRouter(<App />);
    history.push('/url-invalida');
    const title = screen.getByRole('heading', {
      name: 'Page requested not found Crying emoji',
      level: 2 });
    expect(title).toBeDefined();
  });

  it(`Verifica se página mostra a imagem
  'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif'`, () => {
    const { history } = renderWithRouter(<App />);
    history.push('/url-invalida');
    const imgNotfound = screen.getByAltText(
      'Pikachu crying because the page requested was not found',
    );
    expect(imgNotfound.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
