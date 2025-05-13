document.addEventListener('DOMContentLoaded', function() {
    // Fetch products first
    fetch('add/PHPMySql/DatabaseFecth.php') 
        .then(response => response.json())
        .then(data => {
            const productList = document.getElementById('product-list');
            productList.innerHTML = '';

            data.forEach(product => {
                const productType = product.ProductType ? product.ProductType.toLowerCase() : 'product';
                const card = document.createElement('div');
                card.className = `col-md-4`; 
                card.id = productType;
                card.innerHTML = `
                    <div class="card">
                        <img src="${product.image || 'https://via.placeholder.com/150'}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title product-id">${product.ID}</h5>
                            <h5 class="card-title" id="Product_name">${product.name}</h5>
                            <p class="card-text">${product.price}$</p>
                            <a href="#" class="btn btn-primary">Check for more details</a>
                            <a href="#" class="btn btn-primary edit-btn">Edit</a>
                        </div>
                    </div>
                `;
                productList.appendChild(card);
            });
            
            // Set up button handlers after products are loaded
            setupButtonHandlers();
        })
        .catch(error => {
            console.error('Error fetching products:', error);
            const productList = document.getElementById('product-list');
            productList.innerHTML = `
                <div class="col-12 text-center">
                    <div class="alert alert-danger" role="alert">
                        Error loading products. Please try again later.
                    </div>
                </div>
            `;
        });

    // Function to set up click handlers on all buttons
    function setupButtonHandlers() {
        // Handle "Check for more details" buttons
        const detailButtons = document.querySelectorAll('.btn.btn-primary:not(.edit-btn)');
        detailButtons.forEach(button => {
            button.removeEventListener('click', handleButtonClick);
            button.addEventListener('click', handleButtonClick);
        });
        
        // Handle "Edit" buttons
        const editButtons = document.querySelectorAll('.btn.btn-primary.edit-btn');
        editButtons.forEach(button => {
            button.removeEventListener('click', handleButtonClickEdit);
            button.addEventListener('click', handleButtonClickEdit);
        });
        
        console.log(`Set up handlers for ${detailButtons.length} detail buttons`);
        console.log(`Set up handlers for ${editButtons.length} edit buttons`);
    }
    
    // Set up mutation observer to watch product list only
    const productList = document.getElementById('product-list');
    if (productList) {
        const observer = new MutationObserver(function(mutations) {
            const nodesAdded = mutations.some(mutation => 
                mutation.type === 'childList' && mutation.addedNodes.length > 0);
                
            if (nodesAdded) {
                console.log('Product list changed, updating button handlers');
                setupButtonHandlers();
            }
        });
        
        observer.observe(productList, { 
            childList: true,
            subtree: true
        });
    }
});

function handleButtonClick(e) {
    e.preventDefault();
    const card = this.closest('.card');
    
    if (card) {
        const productIdElement = card.querySelector('.product-id');
        
        if (productIdElement) {
            const productId = productIdElement.textContent.trim();
            console.log('Button clicked for product ID:', productId);
            window.location.href = `product-page.php?id=${productId}`;
            return productId;
        } else {
            console.error('Product ID element not found in card');
        }
    } else {
        console.error('Could not find parent card element');
    }
}

function handleButtonClickEdit(e) {
    e.preventDefault();
    const card = this.closest('.card');
    
    if (card) {
        const productIdElement = card.querySelector('.product-id');
        
        if (productIdElement) {
            const productId = productIdElement.textContent.trim();
            console.log('Edit button clicked for product ID:', productId);
            window.location.href = `edit.php?id=${productId}`;
            return productId;
        } else {
            console.error('Product ID element not found in card');
        }
    } else {
        console.error('Could not find parent card element');
    }
}