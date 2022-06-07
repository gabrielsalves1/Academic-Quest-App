import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom';
import CreateGroup from ".";

describe('Renderiza o formulário de criação de grupo', () => {
  it('e deve conter o campo nome do grupo', () => {
    render(<CreateGroup/>, {wrapper: MemoryRouter })

    expect(screen.getByText('Nome do Grupo')).toBeInTheDocument();
  });

  it('e deve conter o botão de Salvar', () => {
    render(<CreateGroup/>, {wrapper: MemoryRouter })

    expect(screen.getByRole("button", { name: /Salvar/i})).toBeInTheDocument();
  });
})