// store.js

// Declare foodItems only once
let foodItems = [];

//Load items from localStorage or fallback to default if available
function loadItems() {
    const data = localStorage.getItem("foodItems");
    if (data) {
        foodItems = JSON.parse(data);
    } else if (typeof initialFoodItems !== "undefined") {
        // Use initial items from data.js
        foodItems = initialFoodItems;
        saveItems(); // save initial items to localStorage
    } else {
        foodItems = [];
    }
}

// Save items to localStorage
function saveItems() {
    localStorage.setItem("foodItems", JSON.stringify(foodItems));
}

// Display items in table
function displayItems() {
    const table = document.getElementById("itemTable");
    table.innerHTML = "";

    foodItems.forEach((item, index) => {
        const row = `
            <tr>
                <td>${item.code}</td>
                <td>${item.name}</td>
                <td>${item.category}</td>
                <td>${item.price}</td>
                <td>${item.quantity}</td>
                <td>${item.expiry}</td>
                <td>
                    <button onclick="editItem(${index})">Edit</button>
                    <button onclick="deleteItem(${index})">Delete</button>
                </td>
            </tr>
        `;
        table.innerHTML += row;
    });
}

// Add or update item
function addItem() {
    const code = document.getElementById("itemCode").value.trim();
    const name = document.getElementById("itemName").value.trim();
    const category = document.getElementById("itemCategory").value;
    const price = Number(document.getElementById("itemPrice").value);
    const discount = Number(document.getElementById("itemDiscount").value);
    const quantity = Number(document.getElementById("itemQuantity").value);
    const expiry = document.getElementById("itemExpiry").value;

    if (!code || !name || !expiry || price <= 0 || quantity <= 0) {
        alert("Please fill all fields correctly.");
        return;
    }

    const addBtn = document.getElementById("addItemBtn");
    const editIndex = addBtn.dataset.editIndex;

    if (editIndex !== undefined) {
        // Update existing item
        foodItems[editIndex] = { code, name, category, price, discount, quantity, expiry };
        delete addBtn.dataset.editIndex;
        addBtn.textContent = "Add Item";
    } else {
        // Add new item
        const exists = foodItems.some(item => item.code === code);
        if (exists) {
            alert("Item code already exists.");
            return;
        }
        foodItems.push({ code, name, category, price, discount, quantity, expiry });
    }

    saveItems();
    clearForm();
    displayItems();
}

// Edit item
function editItem(index) {
    const item = foodItems[index];

    document.getElementById("itemCode").value = item.code;
    document.getElementById("itemName").value = item.name;
    document.getElementById("itemCategory").value = item.category;
    document.getElementById("itemPrice").value = item.price;
    document.getElementById("itemDiscount").value = item.discount;
    document.getElementById("itemQuantity").value = item.quantity;
    document.getElementById("itemExpiry").value = item.expiry;

    const addBtn = document.getElementById("addItemBtn");
    addBtn.dataset.editIndex = index;
    addBtn.textContent = "Update Item";
}

//Delete item
function deleteItem(index) {
    if (confirm("Are you sure you want to delete this item?")) {
        foodItems.splice(index, 1);
        saveItems();
        displayItems();
    }
}

// Clear form fields
function clearForm() {
    document.getElementById("itemCode").value = "";
    document.getElementById("itemName").value = "";
    document.getElementById("itemCategory").value = "";
    document.getElementById("itemPrice").value = "";
    document.getElementById("itemDiscount").value = "";
    document.getElementById("itemQuantity").value = "";
    document.getElementById("itemExpiry").value = "";

    const addBtn = document.getElementById("addItemBtn");
    delete addBtn.dataset.editIndex; 
    addBtn.textContent = "Add Item";
}

function checkExpiredItems() {
    const today = new Date().toISOString().split("T")[0];

    foodItems = foodItems.filter(item => {
        if (item.expiry < today) {
            alert(`Expired item removed: ${item.name}`);
            return false;
        }
        return true;
    });

    saveItems();
    displayItems();
}

document.addEventListener("DOMContentLoaded", () => {
    loadItems();
    checkExpiredItems();
    displayItems();

    // Hamburger menu toggle
    const navToggle = document.getElementById("navToggle");
    const navbar = document.getElementById("navbar");
    if (navToggle && navbar) {
        navToggle.addEventListener("click", () => {
            navbar.classList.toggle("open");
        });
    }
});
