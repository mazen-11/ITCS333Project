document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    const productServiceName = document.getElementById('ProductServiceName');
    const productServiceOptions = document.getElementById('ProductServiceOptions');
    const price = document.getElementById('price');
    const shortDescription = document.getElementById('shortDescription');
    const detailedDescription = document.getElementById('detailedDescription');
    const imageInput = document.getElementById('imageInput');
  
    // Handle form submission
    form.addEventListener('submit', function (e) {
      e.preventDefault(); // Prevent form from submitting normally
  
      let isValid = true;
  
      // Clear previous error messages
      clearErrorMessages();
  
      // Validate Product or Service Name
      if (productServiceName.value.trim() === "") {
        isValid = false;
        showError(productServiceName, "Product or service name is required.");
      }
  
      // Validate Service Options
      if (productServiceOptions.value === "Select an status" || productServiceOptions.value === "") {
        isValid = false;
        showError(productServiceOptions, "Please select a product/service option.");
      }
  
      // Validate Price
      if (price.value.trim() === "" || price.value <= 0) {
        isValid = false;
        showError(price, "Price must be a positive number.");
      }
  
      // Validate Short Description
      if (shortDescription.value.trim() === "") {
        isValid = false;
        showError(shortDescription, "Short description is required.");
      }
  
      // Validate Detailed Description
      if (detailedDescription.value.trim() === "") {
        isValid = false;
        showError(detailedDescription, "Detailed description is required.");
      }
  
      // Validate Image Upload
      if (!imageInput.files.length) {
        isValid = false;
        showError(imageInput, "Image upload is required.");
      }
  
      // If all fields are valid, allow form submission
      if (isValid) {
        alert("Form submitted successfully!"); // Replace with form.submit() to submit the form
      }
    });
  
    // Function to display error message
    function showError(element, message) {
      const errorMessage = document.createElement('div');
      errorMessage.classList.add('text-danger', 'mt-2');
      errorMessage.textContent = message;
      element.classList.add('is-invalid');
      element.parentElement.appendChild(errorMessage);
    }
  
    // Function to clear error messages
    function clearErrorMessages() {
      const errorMessages = document.querySelectorAll('.text-danger');
      const invalidElements = document.querySelectorAll('.is-invalid');
      
      errorMessages.forEach(msg => msg.remove());  // Remove previous error messages
      invalidElements.forEach(el => el.classList.remove('is-invalid'));  // Remove invalid styles
    }
  });
  
