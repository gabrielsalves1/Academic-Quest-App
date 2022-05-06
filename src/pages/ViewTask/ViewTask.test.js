import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom';
import ViewTask from ".";

describe('Renderiza a view da tarefa', () => {
  it('e deve conter as atividades Entregues', () => {
    render(<ViewTask/>, {wrapper: MemoryRouter })

    expect(screen.getByRole("link", { name: /Visualizar Arquivo/i})).toBeInTheDocument();
  });
})