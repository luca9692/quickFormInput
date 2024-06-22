# QuickFormSubmit

QuickFormSubmit is a JavaScript library to automatically submit forms based on a configuration file.

## Installation

You can install the library via npm:

```sh
npm install quickFormSubmit
```

## Example Usage

```html
<form action="/submit" method="POST" class="test-form">
  <input type="text" name="username" value="testuser" />
  <input type="submit" value="Submit" />
</form>

<script src="path/to/forminator.js"></script>
<script>
  const config = {
    selector: '.test-form',
    data: { extraField: 'extraValue' },
    onSuccess: (response) => console.log('Form submitted successfully', response),
    onError: (error) => console.error('Form submission failed', error),
  };

  QuickFormSubmit.quickFormSubmit(config);
</script>
```