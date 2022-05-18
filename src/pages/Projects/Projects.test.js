import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom';
import Projects from ".";

describe('Renderiza a página de projetos', () => {
  it('e consegue visualizar o título da página', () => {
    render(<Projects/>, {wrapper: MemoryRouter })

    expect(screen.getByText('Projetos')).toBeInTheDocument();
  });

  it('e consegue visualizar o formulário de seleção', () => {
    render(<Projects/>, {wrapper: MemoryRouter })

    expect(screen.getByTestId('formSelect')).toBeInTheDocument();
  });
})