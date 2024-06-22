import { quickFormSubmit } from '../src/index';

// Mock form submission
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
  })
);

document.body.innerHTML = `
  <form action="/submit" method="POST" class="test-form">
    <input type="text" name="username" value="testuser" />
    <input type="submit" value="Submit" />
  </form>
`;

test('quick forms submits forms based on config', () => {
  const config = {
    selector: '.test-form',
    data: { extraField: 'extraValue' },
    onSuccess: jest.fn(),
    onError: jest.fn(),
  };

  forminator(config);

  expect(fetch).toHaveBeenCalledTimes(1);
  expect(fetch).toHaveBeenCalledWith('/submit', expect.any(Object));
});
