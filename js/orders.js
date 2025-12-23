let orders = []; // store orders

// Load orders from localStorage
function loadOrders() {
    const data = localStorage.getItem("orders");
    if (data) {
        orders = JSON.parse(data);
    } else {
        orders = [];
    }
}

// Save orders to localStorage
function saveOrders() {
    localStorage.setItem("orders", JSON.stringify(orders));
}

/* Fill items in the select dropdown */
function populateItemOptions() {
    const orderItem = document.getElementById("orderItem");
    orderItem.innerHTML = '<option value="">Select Item</option>';

    if (typeof foodItems !== "undefined" && foodItems.length > 0) {
        foodItems.forEach(item => {
            orderItem.innerHTML += `<option value="${item.code}">${item.name}</option>`;
        });
    }
}

/* Add new order */
function addOrder() {
    const orderId = document.getElementById("orderId").value.trim();
    const customerName = document.getElementById("customerName").value.trim();
    const itemCode = document.getElementById("orderItem").value;
    const quantity = Number(document.getElementById("orderQuantity").value);

    if (!orderId || !customerName || !itemCode || quantity <= 0) {
        alert("Please fill all fields correctly.");
        return;
    }

    const item = foodItems.find(f => f.code === itemCode);
    const totalPrice = item.price * quantity;

    orders.push({
        orderId,
        customerName,
        itemName: item.name,
        quantity,
        totalPrice
    });

    saveOrders(); // persist orders
    clearForm();
    displayOrders();
}

/* Display orders in the table */
function displayOrders() {
    const table = document.getElementById("ordersTable");
    table.innerHTML = "";

    orders.forEach((order, index) => {
        const row = `
            <tr>
                <td>${order.orderId}</td>
                <td>${order.customerName}</td>
                <td>${order.itemName}</td>
                <td>${order.quantity}</td>
                <td>${order.totalPrice}</td>
                <td>
                    <button onclick="deleteOrder(${index})">Delete</button>
                </td>
            </tr>
        `;
        table.innerHTML += row;
    });
}

/* Delete order */
function deleteOrder(index) {
    if (confirm("Are you sure you want to delete this order?")) {
        orders.splice(index, 1);
        saveOrders();
        displayOrders();
    }
}

/* Clear form */
function clearForm() {
    document.getElementById("orderId").value = "";
    document.getElementById("customerName").value = "";
    document.getElementById("orderItem").value = "";
    document.getElementById("orderQuantity").value = "";
}

/* Initialize page */
document.addEventListener("DOMContentLoaded", () => {
    loadOrders();
    populateItemOptions();
    displayOrders();
});

document.addEventListener("DOMContentLoaded", () => {
    if (typeof foodItems === "undefined" || foodItems.length === 0) {
        // Load from localStorage
        const data = localStorage.getItem("foodItems");
        if (data) foodItems = JSON.parse(data);
    }

    populateItemOptions();
    displayOrders();

    // Hamburger toggle
    const navToggle = document.getElementById("navToggle");
    const navbar = document.getElementById("navbar");
    if (navToggle && navbar) {
        navToggle.addEventListener("click", () => {
            navbar.classList.toggle("open");
        });
    }
});