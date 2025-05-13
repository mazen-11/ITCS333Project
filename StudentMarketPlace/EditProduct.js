document.addEventListener('DOMContentLoaded', function() {
            const EditForm = document.getElementById('EditDiv');
                EditForm.innerHTML = '';
                const urlParams = new URLSearchParams(window.location.search);
                const productId = urlParams.get('id');
                const EForm = document.createElement('div');
                    EForm.className = `container mt-5`;
                    EForm.innerHTML = `
                   
                     <h2>edit Service Form</h2>
    <form method="POST" action="">

    <!-- Product ID -->
    <div class="mb-3">
            <input type="number"  name="id" style="display:none;" value="${productId}" class="form-control" id="ProductServiceName" placeholder="Product ID to update">
        </div>

        <!-- Product Name -->
        <div class="mb-3">
            <label for="ProductServiceName" class="form-label">Product or service name</label>
            <input type="text" name="name" class="form-control" id="ProductServiceName" placeholder="Enter product name" >
        </div>

        <!-- Price -->
        <div class="mb-3">
            <label for="price" class="form-label">Price</label>
            <input type="number" name="price" class="form-control" id="price" placeholder="Enter price" >
        </div>

        <!-- Short Description -->
        <div class="mb-3">
            <label for="shortDescription" class="form-label">Short Description</label>
            <textarea class="form-control" name="shortDescription" id="shortDescription" rows="3" placeholder="Enter a short description" ></textarea>
        </div>

        <!-- Detailed Description -->
        <div class="mb-3">
            <label for="detailedDescription" class="form-label">Detailed Description</label>
            <textarea class="form-control" name="detailedDescription" id="detailedDescription" rows="5" placeholder="Enter a detailed description" ></textarea>
        </div>

        <!-- Submit Button -->
        <div class="d-flex justify-content-end">
          <button type="submit" name="BTN" class="btn btn-primary" value="submit">Submit</button>
        </div>
    </form>

                    `;
                    EditForm.appendChild(EForm);
                     
});