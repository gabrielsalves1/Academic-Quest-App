import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../../Context/AuthContext';
import NavigationBar from ".";

describe('Renderiza a barra de navegação', () => {
  it('e deve conter o nome da aplicação', () => {
    render(<AuthProvider><NavigationBar/></AuthProvider>, {wrapper: MemoryRouter })

    expect(screen.getByText('Academic Quest')).toBeInTheDocument();
  });

  it('e deve conter a barra lateral com o item Projetos', () => {
    render(<AuthProvider><NavigationBar/></AuthProvider>, {wrapper: MemoryRouter })

    const iconSidebar = screen.getByTestId('sidebar');
    fireEvent.click(iconSidebar);
    expect(screen.getByText('Projetos')).toBeInTheDocument();
    expect(screen.getByText('Grupos')).toBeInTheDocument();
  });
})