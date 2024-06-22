import { quickFormSubmit } from '../src/index.js';
import { JSDOM } from 'jsdom';

// Mock form submission
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
  })
);

// Set up a basic DOM environment using jsdom
const { window } = new JSDOM('<!doctype html><html><body></body></html>');
const { document } = window;

// Assign the document and window to the global object
global.document = document;
global.window = window;

// Simulate creating a form element and appending it to the document body
const formElement = document.createElement('form');
formElement.action = '/submit';
formElement.method = 'POST';
formElement.classList.add('test-form');
formElement.innerHTML = `
  <input type="text" name="username" value="testuser" />
  <input type="submit" value="Submit" />
`;
document.body.appendChild(formElement);

// Add logging to verify form element properties
console.log('Form element:', formElement);
console.log('Form action:', formElement.action);
console.log('Form method:', formElement.method);

// Write your test
test('quickFormSubmit submits forms based on config', () => {
  const config = {
    selector: '.test-form',
    data: { extraField: 'extraValue' },
    onSuccess: jest.fn(),
    onError: jest.fn(),
  };

  quickFormSubmit(config);

  // Create a submit event and dispatch it on the form element
  const submitEvent = new window.Event('submit', { bubbles: true, cancelable: true });
  formElement.dispatchEvent(submitEvent);

  expect(fetch).toHaveBeenCalledTimes(1);
  expect(fetch).toHaveBeenCalledWith('/submit', {
    method: 'POST',
    body: expect.any(window.FormData), // Ensure FormData object is passed
  });

  // Ensure the additional data is appended
  const formData = fetch.mock.calls[0][1].body;
  expect(formData.get('username')).toBe('testuser');
  expect(formData.get('extraField')).toBe('extraValue');
});
