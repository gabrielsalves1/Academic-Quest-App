import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom';
import ListProjects from ".";

describe('Renderiza a lista de projetos', () => {
  it('e deve conter o texto Projeto e Status', () => {
    render(<ListProjects/>, {wrapper: MemoryRouter })

    expect(screen.getByText('Projeto')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
    expect(screen.getByText('Quest')).toBeInTheDocument();
  });
})