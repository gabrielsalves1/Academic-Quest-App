import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom';
import ListQuests from ".";

describe('Renderiza a lista de quests de um projeto', () => {
  it('e deve conter o texto Projeto e Status', () => {
    render(<ListQuests/>, {wrapper: MemoryRouter })

    expect(screen.getByRole("link", { name: /Criar/i})).toBeInTheDocument();
  });
})