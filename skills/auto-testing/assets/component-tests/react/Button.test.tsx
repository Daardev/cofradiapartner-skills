import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '../react/Button';

test('renders button with label and responds to click', () => {
  const handleClick = jest.fn();
  render(<Button label="Click me" onClick={handleClick} />);

  const btn = screen.getByTestId('btn');
  expect(btn).toBeInTheDocument();
  expect(btn).toHaveTextContent('Click me');

  fireEvent.click(btn);
  expect(handleClick).toHaveBeenCalledTimes(1);
});
