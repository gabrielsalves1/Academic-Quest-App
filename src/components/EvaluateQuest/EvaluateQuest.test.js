import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom';
import EvaluateQuest from ".";

describe('Renderiza a página de avaliação de uma quest', () => {
  it('e deve conter o texto Avaliar Quest', () => {
    render(<EvaluateQuest/>, {wrapper: MemoryRouter })

    expect(screen.getByText('Avaliar Quest')).toBeInTheDocument();
  });
})