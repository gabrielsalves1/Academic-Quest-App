import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom';
import TableTask from ".";

describe('Renderiza a lista dos cards de quest', () => {
  it('e deve conter o card', () => {
    render(<TableTask/>, {wrapper: MemoryRouter })

    expect(screen.getByTestId("listCardQuest")).toBeInTheDocument();
  });
})