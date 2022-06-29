import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom';
import StylizedButton from ".";

describe('Renderiza o botão', () => {
  it('e deve conter o botão com Salvar', () => {
    render(<StylizedButton>Salvar</StylizedButton>, {wrapper: MemoryRouter })

    expect(screen.getByRole("button", { name: /Salvar/i})).toBeInTheDocument();
  });
})