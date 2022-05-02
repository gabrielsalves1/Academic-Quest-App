import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom';
import TableTask from ".";

describe('Renderiza a tabela de tarefas', () => {
  it('e deve conter o cabeçalho da tarefa', () => {
    render(<TableTask/>, {wrapper: MemoryRouter })

    expect(screen.getByTestId('tableTask')).toBeInTheDocument();
    expect(screen.getByText("Grupo")).toBeInTheDocument();
    expect(screen.getByText("Status")).toBeInTheDocument();
  });
})