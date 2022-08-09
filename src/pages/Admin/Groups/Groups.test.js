import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom';
import Groups from ".";

describe('Renderiza a página de grupos', () => {
  it('e visualizar o título da página', () => {
    render(<Groups/>, {wrapper: MemoryRouter })

    expect(screen.getByText('Grupos')).toBeInTheDocument();
  });
})