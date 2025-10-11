import { render, screen } from '@testing-library/react';
import { Header } from '../header';

// Mock du composant MobileMenu
jest.mock('../mobile-menu', () => ({
  MobileMenu: () => <div data-testid="mobile-menu">Mobile Menu</div>
}));

describe('Header Component', () => {
  beforeEach(() => {
    render(<Header />);
  });

  test('renders DogWalking logo', () => {
    expect(screen.getByText('DogWalking')).toBeInTheDocument();
  });

  test('renders dog emoji with proper accessibility', () => {
    const dogEmoji = screen.getByRole('img', { name: /logo chien/i });
    expect(dogEmoji).toBeInTheDocument();
    expect(dogEmoji).toHaveTextContent('🐕');
  });

  test('renders navigation links', () => {
    expect(screen.getByText('Rechercher')).toBeInTheDocument();
    expect(screen.getByText('Devenir Promeneur')).toBeInTheDocument();
    expect(screen.getByText('Être prioritaire')).toBeInTheDocument();
    expect(screen.getByText('Services')).toBeInTheDocument();
    expect(screen.getByText('Blog')).toBeInTheDocument();
    expect(screen.getByText('Aide')).toBeInTheDocument();
  });

  test('renders authentication buttons', () => {
    expect(screen.getByText('Connexion')).toBeInTheDocument();
    expect(screen.getByText("S'inscrire")).toBeInTheDocument();
  });

  test('renders mobile menu component', () => {
    expect(screen.getByTestId('mobile-menu')).toBeInTheDocument();
  });

  test('has proper accessibility attributes', () => {
    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
    
    const nav = screen.getByRole('navigation', { name: /navigation principale/i });
    expect(nav).toBeInTheDocument();
  });

  test('navigation links have correct href attributes', () => {
    expect(screen.getByText('Rechercher').closest('a')).toHaveAttribute('href', '/search');
    expect(screen.getByText('Services').closest('a')).toHaveAttribute('href', '/services');
    expect(screen.getByText('Blog').closest('a')).toHaveAttribute('href', '/blog');
  });
});
