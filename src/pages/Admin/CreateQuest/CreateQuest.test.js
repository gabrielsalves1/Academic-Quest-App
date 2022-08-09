import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom';
import CreateQuest from ".";

describe('Renderiza o formulário de criação de Quest', () => {
  it('e deve conter o campo nome', () => {
    render(<CreateQuest/>, {wrapper: MemoryRouter })

    expect(screen.getByText('Nome')).toBeInTheDocument();
  });

  it('e deve conter o botão de Salvar', () => {
    render(<CreateQuest/>, {wrapper: MemoryRouter })

    expect(screen.getByRole("button", { name: /Salvar/i})).toBeInTheDocument();
  });
})