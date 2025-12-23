// reports.js

document.addEventListener("DOMContentLoaded", () => {
    generateReports();

    // Hamburger menu
    const navToggle = document.getElementById("navToggle");
    const navbar = document.getElementById("navbar");
    if (navToggle && navbar) {
        navToggle.addEventListener("click", () => {
            navbar.classList.toggle("open");
        });
    }
});

/* Generate reports from stored data */
function generateReports() {

    // Load orders & customers from localStorage
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    const customers = JSON.parse(localStorage.getItem("customers")) || [];

    // Total Orders
    document.getElementById("totalOrders").textContent = orders.length;

    // Total Customers
    document.getElementById("totalCustomers").textContent = customers.length;

    // Total Sales
    const totalSales = orders.reduce((sum, order) => sum + order.totalPrice, 0);
    document.getElementById("totalSales").textContent = `Rs. ${totalSales}`;

    // Best-Selling Item
    const itemCount = {};

    orders.forEach(order => {
        itemCount[order.itemName] =
            (itemCount[order.itemName] || 0) + order.quantity;
    });

    let bestItem = "-";
    let maxQty = 0;

    for (const item in itemCount) {
        if (itemCount[item] > maxQty) {
            bestItem = item;
            maxQty = itemCount[item];
        }
    }

    document.getElementById("bestItem").textContent = bestItem;
}
