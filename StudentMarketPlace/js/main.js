//search code
  document.addEventListener('DOMContentLoaded', function () {
    const searchForm = document.getElementById('search');
    const searchInput = searchForm.querySelector('input[type="search"]');
  
    // Add event listener for form submission
    searchForm.addEventListener('submit', function (e) {
      e.preventDefault(); // Prevent form from submitting normally
  
      const searchText = searchInput.value.trim().toLowerCase(); // Convert to lowercase for case-insensitive search
  
      // Call function to filter cards by text
      filterCardsByText(searchText);
    });
  
    // Function to filter cards by text (title or description)
    function filterCardsByText(text) {
      const cards = document.querySelectorAll('.card'); // Get all card elements
  
      cards.forEach(card => {
        const cardTitle = card.querySelector('.card-title').textContent.toLowerCase();
        const cardDescription = card.querySelector('.card-text').textContent.toLowerCase();
  
        // Check if the search text matches the title or description
        if (cardTitle.includes(text) || cardDescription.includes(text)) {
          card.style.display = 'block'; // Show card if text matches
        } else {
          card.style.display = 'none'; // Hide card if text does not match
        }
      });
    }
  });
  
