/**
 * Automatically submits forms
 * @param {Object} config - Configuration object.
 */
function quickFormSubmit(config) {
  const forms = document.querySelectorAll(config.selector || 'form');
  
  forms.forEach(form => {
    form.addEventListener('submit', event => {
      event.preventDefault();
      
      const formData = new FormData(form);
      const useAjax = form.getAttribute('data-ajax') !== 'false'; // Default to true if not specified or if it's 'true'
      
      // Append additional data from config
      for (const [key, value] of Object.entries(config.data || {})) {
        formData.append(key, value);
      }
      
      if (!useAjax) {
        // If not using AJAX, remove the event listener to avoid recursion and submit the form
        form.removeEventListener('submit', arguments.callee);
        form.submit();
      }

      // AJAX
      fetch(form.action, {
          method: form.method || 'POST',
          body: formData,
        }).then(response => {
          if (config.onSuccess) config.onSuccess(response);
        }).catch(error => {
          if (config.onError) config.onError(error);
        });
      

    });
  });
}

// Ensure the function is accessible globally
if (typeof window !== 'undefined') {
  window.quickFormSubmit = quickFormSubmit;
}

export { quickFormSubmit };
