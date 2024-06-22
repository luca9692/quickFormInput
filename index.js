/**
 * Automatically submits forms
 * @param {Object} config - Configuration object.
 */
function quickFormSubmit(config) {
  const forms = document.querySelectorAll(config.selector || 'form');
  
  forms.forEach(form => {
    const formData = new FormData(form);
    
    for (const [key, value] of Object.entries(config.data || {})) {
      formData.append(key, value);
    }
    
    fetch(form.action, {
      method: form.method || 'POST',
      body: formData,
    }).then(response => {
      if (config.onSuccess) config.onSuccess(response);
    }).catch(error => {
      if (config.onError) config.onError(error);
    });
  });
}

export { quickFormSubmit };
