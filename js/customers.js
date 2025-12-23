// customers.js

let customers = [];

/* =========================
   Load & Save (Persistence)
========================= */

function loadCustomers() {
    const data = localStorage.getItem("customers");
    customers = data ? JSON.parse(data) : [];
}

function saveCustomers() {
    localStorage.setItem("customers", JSON.stringify(customers));
}

/* =========================
   Display Customers
========================= */

function displayCustomers() {
    const table = document.getElementById("customersTable");
    table.innerHTML = "";

    customers.forEach((customer, index) => {
        const row = `
            <tr>
                <td>${customer.id}</td>
                <td>${customer.name}</td>
                <td>${customer.phone}</td>
                <td>
                    <button onclick="editCustomer(${index})">Edit</button>
                    <button onclick="deleteCustomer(${index})">Delete</button>
                </td>
            </tr>
        `;
        table.innerHTML += row;
    });
}

/* =========================
   Add or Update Customer
========================= */

function addCustomer() {
    const id = document.getElementById("customerId").value.trim();
    const name = document.getElementById("customerName").value.trim();
    const phone = document.getElementById("customerPhone").value.trim();

    if (!id || !name || !phone) {
        alert("Please fill all fields correctly.");
        return;
    }

    const addBtn = document.getElementById("addCustomerBtn");
    const editIndex = addBtn.dataset.editIndex;

    if (editIndex !== undefined) {
        // Update existing customer
        customers[editIndex] = { id, name, phone };
        delete addBtn.dataset.editIndex;
        addBtn.textContent = "Add Customer";
    } else {
        // Add new customer
        const exists = customers.some(c => c.id === id || c.phone === phone);
        if (exists) {
            alert("Customer ID or Phone already exists.");
            return;
        }
        customers.push({ id, name, phone });
    }

    saveCustomers();
    clearForm();
    displayCustomers();
}

/* =========================
   Edit Customer
========================= */

function editCustomer(index) {
    const customer = customers[index];

    document.getElementById("customerId").value = customer.id;
    document.getElementById("customerName").value = customer.name;
    document.getElementById("customerPhone").value = customer.phone;

    const addBtn = document.getElementById("addCustomerBtn");
    addBtn.dataset.editIndex = index;
    addBtn.textContent = "Update Customer";
}

/* =========================
   Delete Customer
========================= */

function deleteCustomer(index) {
    if (confirm("Are you sure you want to delete this customer?")) {
        customers.splice(index, 1);
        saveCustomers();
        displayCustomers();
    }
}

/* =========================
   Clear Form
========================= */

function clearForm() {
    document.getElementById("customerId").value = "";
    document.getElementById("customerName").value = "";
    document.getElementById("customerPhone").value = "";

    const addBtn = document.getElementById("addCustomerBtn");
    delete addBtn.dataset.editIndex;
    addBtn.textContent = "Add Customer";
}

/* =========================
   Page Init
========================= */

document.addEventListener("DOMContentLoaded", () => {
    loadCustomers();
    displayCustomers();

    // Hamburger menu
    const navToggle = document.getElementById("navToggle");
    const navbar = document.getElementById("navbar");

    if (navToggle && navbar) {
        navToggle.addEventListener("click", () => {
            navbar.classList.toggle("open");
        });
    }
});
