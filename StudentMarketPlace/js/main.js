// Filter code using card ID
document.addEventListener('DOMContentLoaded', function () {
    const filterForm = document.getElementById('filter-form');

    if (filterForm) {
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
    }

    // Improved search functionality
    const searchForm = document.getElementById('search');

    if (searchForm) {
        const searchInput = searchForm.querySelector('input[type="search"]');

        // Add event listener for form submission
        searchForm.addEventListener('submit', function (e) {
            e.preventDefault(); // Prevent form from submitting normally

            const searchText = searchInput.value.trim().toLowerCase(); // Convert to lowercase for case-insensitive search
            filterCardsByText(searchText);
            console.log('Search submitted for:', searchText);
        });

        // Add real-time search as user types
        if (searchInput) {
            searchInput.addEventListener('input', function() {
                const searchText = this.value.trim().toLowerCase();
                filterCardsByText(searchText);
                console.log('Search input changed to:', searchText);
            });
        }
    }

    // Function to filter cards by text (product name)
    function filterCardsByText(text) {
        if (!text) {
            // If search is empty, show all cards
            document.querySelectorAll('#product-list .col-md-4').forEach(card => {
                card.style.display = 'block';
            });
            return;
        }

        const cards = document.querySelectorAll('#product-list .col-md-4');
        let matchCount = 0;

        cards.forEach(card => {
            // Look specifically for the product name (not the product ID)
            // First try to find element with ID "Product_name"
            let productNameElement = card.querySelector('#Product_name');

            // If not found, try to find the second card-title (which is the product name)
            if (!productNameElement) {
                const cardTitles = card.querySelectorAll('.card-title');
                if (cardTitles.length > 1) {
                    productNameElement = cardTitles[1]; // The second card-title should be the product name
                }
            }

            if (productNameElement) {
                const productName = productNameElement.textContent.toLowerCase();

                // Check if the search text matches the product name
                if (productName.includes(text)) {
                    card.style.display = 'block'; // Show card if text matches
                    matchCount++;
                } else {
                    card.style.display = 'none'; // Hide card if text does not match
                }
            }
        });

        console.log(`Found ${matchCount} products matching "${text}"`);
    }
});