import { render, fireEvent } from '@testing-library/vue';
import MyButton from '../vue/MyButton.vue';

test('renders button with label and emits click', async () => {
  const { getByTestId, emitted } = render(MyButton, {
    props: { label: 'Press me' },
  });

  const btn = getByTestId('btn');
  expect(btn).toBeInTheDocument();
  expect(btn).toHaveTextContent('Press me');

  await fireEvent.click(btn);
  expect(emitted()).toHaveProperty('click');
});
