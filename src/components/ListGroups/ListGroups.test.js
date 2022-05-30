import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom';
import ListGroups from '.';

describe('Renderiza a lista de grupos', () => {
  it('e consegue visualizar a listagem de matérias', () => {
    render(<ListGroups/>, {wrapper: MemoryRouter })

    expect(screen.getByTestId('listSubject')).toBeInTheDocument();
  });
})