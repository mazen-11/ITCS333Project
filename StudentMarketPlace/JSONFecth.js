document.addEventListener('DOMContentLoaded', () => {
    fetch('add/PHPMySql/DatabaseFecth.php') 
        .then(response => response.json())
        .then(data => {
            const productList = document.getElementById('product-list');
            
            // Clear existing content
            productList.innerHTML = '';

            data.forEach(product => {
                // Create a card element with ProductType as its class for filtering
                const card = document.createElement('div');
                
                // Make sure ProductType is lowercase to match filter values
                const productType = product.ProductType ? product.ProductType.toLowerCase() : 'product';
                
                card.className = `col-md-4 `; 
                card.id = productType;
                card.innerHTML = `
                    <div class="card">
                        <img src="${product.image || 'https://via.placeholder.com/150'}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">product code: ${product.ID}</h5>
                            <h5 class="card-title">${product.name}</h5>
                            <p class="card-text">${product.price}$</p>
                            <a href="products-and-services/product-page.html" class="btn btn-primary">Check for more details</a>
                        </div>
                    </div>
                `;
                productList.appendChild(card);
            });
        })
        .catch(error => {
            console.error('Error fetching products:', error);
            
            // Display error message to user
            const productList = document.getElementById('product-list');
            productList.innerHTML = `
                <div class="col-12 text-center">
                    <div class="alert alert-danger" role="alert">
                        Error loading products. Please try again later.
                    </div>
                </div>
            `;
        });
});


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
