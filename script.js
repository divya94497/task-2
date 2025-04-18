let products = JSON.parse(localStorage.getItem("products")) || [];

const form = document.getElementById("productForm");
const table = document.getElementById("productTable");

form.onsubmit = function(e) {
  e.preventDefault();
  const product = {
    id: Date.now(),
    name: form.name.value,
    description: form.description.value,
    supplier: form.supplier.value,
    sales: parseInt(form.sales.value),
    price: parseFloat(form.price.value),
    quantity: parseInt(form.quantity.value)
  };
  products.push(product);
  localStorage.setItem("products", JSON.stringify(products));
  form.reset();
  displayProducts();
};

function displayProducts(data = products) {
  table.innerHTML = "";
  data.forEach(p => {
    const row = `<tr>
      <td>${p.name}</td>
      <td>${p.description}</td>
      <td>${p.supplier}</td>
      <td>${p.sales}</td>
      <td>${p.price}</td>
      <td>${p.quantity}</td>
      <td>
        <button onclick="deleteProduct(${p.id})">Delete</button>
      </td>
    </tr>`;
    table.innerHTML += row;
  });
}

function deleteProduct(id) {
  products = products.filter(p => p.id !== id);
  localStorage.setItem("products", JSON.stringify(products));
  displayProducts();
}

function searchProduct() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  const filtered = products.filter(p => p.name.toLowerCase().includes(query));
  displayProducts(filtered);
}

displayProducts();
