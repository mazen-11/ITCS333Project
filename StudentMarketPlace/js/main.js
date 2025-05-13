    // Filter code using card ID
    document.addEventListener('DOMContentLoaded', function () {
    const filterForm = document.getElementById('filter-form');

    filterForm.addEventListener('submit', function (e) {
        e.preventDefault(); // Stop form from submitting normally

        // Get all selected checkboxes
        const checkedFilters = Array.from(
            filterForm.querySelectorAll('input[type="checkbox"]:checked')
        ).map(cb => cb.value.toLowerCase()); // ensure consistency

        // Get all cards inside the product list
        const allCards = document.querySelectorAll('#product-list .col-md-4');

        allCards.forEach(card => {
            const cardType = card.id.toLowerCase(); // match case
            if (checkedFilters.length === 0 || checkedFilters.includes(cardType)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
    });



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
  
        // Check if the search text matches the title or description
        if (cardTitle.includes(text)) {
          card.style.display = 'block'; // Show card if text matches
        } else {
          card.style.display = 'none'; // Hide card if text does not match
        }
      });
    }
  });
  