import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom';
import SubmitButton from ".";

describe('Renderiza o botão', () => {
  it('e deve conter o botão com Salvar', () => {
    render(<SubmitButton>Salvar</SubmitButton>, {wrapper: MemoryRouter })

    expect(screen.getByRole("button", { name: /Salvar/i})).toBeInTheDocument();
  });
})