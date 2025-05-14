

    document.addEventListener('DOMContentLoaded', () => {
        console.log("before all");

    fetch('DatabaseFetch.php')
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(data => {
            console.log('Data received:', data);
            const productList = document.getElementById('product-list');
            productList.innerHTML = '';
            
            data.forEach(product => {
                const card = document.createElement('div');
                card.className = 'col-md-4';
                card.innerHTML = `
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">${product.name}</h5>
                            <p class="card-text">${product.price}$</p>
                        </div>
                    </div>
                `;
                productList.appendChild(card);
            });
        })
        .catch(error => {
            console.log("before error");

            console.error('Error:', error);
            document.getElementById('product-list').innerHTML = `
                <div class="alert alert-danger">Error loading products</div>
            `;
        });
});

