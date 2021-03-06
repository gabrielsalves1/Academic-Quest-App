import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom';
import LinkButton from ".";

describe('Renderiza o link', () => {
  it('e deve conter o texto Voltar no link', () => {
    render(<LinkButton to="/">Voltar</LinkButton>, {wrapper: MemoryRouter })

    expect(screen.getByRole("link")).toBeInTheDocument();
  });
})