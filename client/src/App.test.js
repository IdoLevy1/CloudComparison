<<<<<<< HEAD
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
=======
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
>>>>>>> feature/feature-Add-react-app-client
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
