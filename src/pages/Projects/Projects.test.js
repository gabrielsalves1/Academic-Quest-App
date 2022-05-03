import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom';
import Projects from ".";

describe('Renderiza o formulário de seleção', () => {
  it('e consegue visualizar o formulário', () => {
    render(<Projects/>, {wrapper: MemoryRouter })

    expect(screen.getByTestId('formSelect')).toBeInTheDocument();
  });
})