
document.addEventListener('DOMContentLoaded', function () {
    fetch('add/PHPMySql/DatabaseFecth.php')
        .then(response => response.json())
        .then(data => {
            const productList = document.getElementById('product-list');
            const productPage = document.getElementById('ProductPage');
            productList.innerHTML = '';
            productPage.innerHTML = '';

            const urlParams = new URLSearchParams(window.location.search);
            const productId = urlParams.get('id');

            data.forEach(product => {
                if (productId === product.ID) {
                    const productType = product.ProductType ? product.ProductType.toLowerCase() : 'product';
                    const page = document.createElement('div');
                    page.className = `row`;
                    page.innerHTML = `
                        <div class="col-md-6 mb-4">
                            <img src="${product.image || 'https://via.placeholder.com/150'}" id="mainImage" style="height:300px; width:300px">
                        </div>
                        <div class="col-md-6">
                            <h2 class="mb-3">${product.name}</h2>
                            <p class="text-muted mb-4">Type: ${product.ProductType}</p>
                            <div class="mb-3">
                                <span class="h4 me-2">${product.price}$</span>
                            </div>
                            <p class="mb-4">${product.shortDescription}, ${product.detailedDescription}</p>
                            <button class="btn btn-primary btn-lg mb-3 me-2">
                                <i class="bi bi-cart-plus"></i> Contact for Service
                            </button>
                            <div class="mt-4" id="CommentDiv"></div>
                        </div>
                    `;
                    productPage.appendChild(page);

                fetch('add/PHPMySql/CommentFetch.php')
                .then(response => {
                    if (!response.ok) throw new Error('Failed to load comments');
                    return response.json();
                })
                .then(comments => {
                    const CommentDiv = document.getElementById('CommentDiv');
                    if (!CommentDiv) {
                        console.error("CommentDiv not found in DOM");
                        return;
                    }

                    const urlParams = new URLSearchParams(window.location.search);
                    const productId = urlParams.get('id');

                    // Filter comments by product_id matching the current product ID
                    const filteredComments = comments.filter(comment => comment.product_id === productId);

                    CommentDiv.innerHTML = '';
                    CommentDiv.style.display = 'flex';
                    CommentDiv.style.flexWrap = 'wrap';

                    filteredComments.forEach(commentData => {
                        const commentSection = document.createElement('div');
                        commentSection.className = 'comment me-3 mb-3 p-2 border rounded';
                        commentSection.style.width = '200px';

                        commentSection.innerHTML = `
                            <p><strong>Comment:</strong> ${commentData.comment}</p>
                            <p class="text-muted"><small>${commentData.comment_date}</small></p>
                        `;
                        CommentDiv.appendChild(commentSection);
                    });

                    if (filteredComments.length === 0) {
                        CommentDiv.innerHTML = '<p>No comments for this product yet.</p>';
                    }
                })
                .catch(error => {
                    console.error('Error fetching comments:', error);
                });

                } else {
                    const productType = product.ProductType ? product.ProductType.toLowerCase() : 'product';
                    const card = document.createElement('div');
                    card.className = `col-md-4`;
                    card.id = productType;
                    card.innerHTML = `
                        <div class="card">
                            <img src="${product.image || 'https://via.placeholder.com/150'}" class="card-img-top" alt="...">
                            <div class="card-body">
                                <h5 class="card-title product-id">${product.ID}</h5>
                                <h5 class="card-title">${product.name}</h5>
                                <p class="card-text">${product.price}$</p>
                                <a href="#" class="btn btn-primary">Check for more details</a>
                                <a href="#" class="btn btn-primary edit-btn">Edit</a>
                            </div>
                        </div>
                    `;
                    productList.appendChild(card);
                }
            });

            // Setup event handlers for buttons
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

    function setupButtonHandlers() {
        const detailButtons = document.querySelectorAll('.btn.btn-primary:not(.edit-btn):not(form .btn)');
        detailButtons.forEach(button => {
            button.removeEventListener('click', handleButtonClick);
            button.addEventListener('click', handleButtonClick);
        });

        const editButtons = document.querySelectorAll('.btn.btn-primary.edit-btn:not(form .btn)');
        editButtons.forEach(button => {
            button.removeEventListener('click', handleButtonClickEdit);
            button.addEventListener('click', handleButtonClickEdit);
        });

        console.log(`Set up handlers for ${detailButtons.length} detail buttons`);
        console.log(`Set up handlers for ${editButtons.length} edit buttons`);
    }

    const productList = document.getElementById('product-list');
    if (productList) {
        const observer = new MutationObserver(function (mutations) {
            const nodesAdded = mutations.some(mutation =>
                mutation.type === 'childList' && mutation.addedNodes.length > 0
            );

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
        } else {
            console.error('Product ID element not found in card');
        }
    } else {
        console.error('Could not find parent card element');
    }
}
