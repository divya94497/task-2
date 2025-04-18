
async function fetchProducts() {
    try {
        const response = await fetch('http://localhost:5000/products');
        const products = await response.json();
        const productList = document.getElementById('productList');
        productList.innerHTML = '';
  
        
        products.forEach(product => {
            const li = document.createElement('li');
            li.innerHTML = `
                <strong>${product.name}</strong><br>
                ${product.description}<br>
                <em>Supplier: ${product.supplier}</em><br>
                Sales: ${product.sales} | Price: $${product.price} | Quantity: ${product.quantity}
            `;
            productList.appendChild(li);
        });
    } catch (err) {
        console.error('Error fetching products:', err);
    }
}


document.getElementById('addProductForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const productData = {
        name: document.getElementById('productName').value,
        description: document.getElementById('productDescription').value,
        supplier: document.getElementById('productSupplier').value,
        sales: document.getElementById('productSales').value,
        price: document.getElementById('productPrice').value,
        quantity: document.getElementById('productQuantity').value,
    };

    try {
        await fetch('http://localhost:5000/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productData)
        });

        
        fetchProducts();

    
        document.getElementById('addProductForm').reset();
    } catch (err) {
        console.error('Error adding product:', err);
    }
});


window.onload = fetchProducts;
