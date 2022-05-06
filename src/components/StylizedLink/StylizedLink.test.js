import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom';
import StylizedLink from ".";

describe('Renderiza o link', () => {
  it('e deve conter o texto Visualizar no link', () => {
    render(<StylizedLink to="/">Visualizar</StylizedLink>, {wrapper: MemoryRouter })

    expect(screen.getByRole("link")).toBeInTheDocument();
  });
})