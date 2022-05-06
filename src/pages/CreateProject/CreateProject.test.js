import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom';
import CreateProject from '.';

describe('Renderiza o formulário de seleção', () => {
  it('e consegue visualizar o formulário', () => {
    render(<CreateProject/>, {wrapper: MemoryRouter })

    expect(screen.getByText('Criar Projeto')).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Criar/i})).toBeInTheDocument();
  });
})