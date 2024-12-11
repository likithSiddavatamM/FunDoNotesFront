// import { render, screen } from '@testing-library/react';
// import App from './App';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders App component without crashing', () => {
  render(<App />);
  const appTitle = screen.getByText(/FunDoNotes/i);
  expect(appTitle).toBeInTheDocument();
});