import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom';
import QuestManagement from ".";

describe('Renderiza o gerenciamento de quest', () => {
  it('e deve conter o nome da projeto', () => {
    render(<QuestManagement/>, {wrapper: MemoryRouter })

    expect(screen.getByText('Gerenciamento de Quest')).toBeInTheDocument();
  });
})