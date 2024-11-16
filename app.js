let transactions = [];
let budget = 0;
let savingsGoals = [];

// Add Transaction Functionality
document.getElementById("transaction-form").addEventListener("submit", function(event) {
    event.preventDefault();
    const description = document.getElementById("description").value;
    const amount = parseFloat(document.getElementById("amount").value);
    const type = document.getElementById("type").value;
    const category = document.getElementById("category").value;

    const transaction = {
        description,
        amount,
        type,
        category
    };

    transactions.push(transaction);
    displayTransactions();
    updateExpenseChart();
    this.reset();
});

// Display Transactions
function displayTransactions() {
    const transactionList = document.getElementById("transaction-list");
    transactionList.innerHTML = "";

    transactions.forEach(transaction => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${transaction.description}</td>
            <td>KSh ${transaction.amount.toFixed(2)}</td>
            <td>${transaction.type}</td>
            <td>${transaction.category}</td>
        `;
        transactionList.appendChild(row);
    });
}

// Update Expense Chart
function updateExpenseChart() {
    const ctx = document.getElementById("expenseChart").getContext("2d");
    const expenseData = transactions.reduce((acc, transaction) => {
        acc[transaction.category] = (acc[transaction.category] || 0) + (transaction.type === 'expense' ? transaction.amount : 0);
        return acc;
    }, {});

    const labels = Object.keys(expenseData);
    const data = labels.map(label => expenseData[label]);

    const chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels,
            datasets: [{
                label: 'Expenses by Category',
                data,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Set Monthly Budget
document.getElementById("budget-form").addEventListener("submit", function(event) {
    event.preventDefault();
    budget = parseFloat(document.getElementById("budget-amount").value);
    document.getElementById("display-budget").innerText = `KSh ${budget.toFixed(2)}`;
    this.reset();
});

// Add Savings Goals
document.getElementById("savings-form").addEventListener("submit", function(event) {
    event.preventDefault();
    const goalDescription = document.getElementById("goal-description").value;
    const goalAmount = parseFloat(document.getElementById("goal-amount").value);

    savingsGoals.push({ description: goalDescription, amount: goalAmount });
    displaySavingsGoals();
    this.reset();
});

// Display Savings Goals
function displaySavingsGoals() {
    const goalList = document.getElementById("goal-list");
    goalList.innerHTML = "";

    savingsGoals.forEach(goal => {
        const listItem = document.createElement("li");
        listItem.innerText = `${goal.description}: KSh ${goal.amount.toFixed(2)}`;
        goalList.appendChild(listItem);
    });
}

// Generate Monthly Expense Report
document.getElementById("generate-report").addEventListener("click", function() {
    const totalExpenses = transactions
        .filter(transaction => transaction.type === 'expense')
        .reduce((acc, transaction) => acc + transaction.amount, 0);

    document.getElementById("monthly-expense-report").innerText = `Total Expenses: KSh ${totalExpenses.toFixed(2)}`;
    document.getElementById("report-output").classList.remove("hidden");
});

// Search Functionality
document.getElementById("search-input").addEventListener("input", function() {
    const searchTerm = this.value.toLowerCase();
    const filteredTransactions = transactions.filter(transaction => 
        transaction.description.toLowerCase().includes(searchTerm) ||
        transaction.category.toLowerCase().includes(searchTerm)
    );

    const transactionList = document.getElementById("transaction-list");
    transactionList.innerHTML = "";

    filteredTransactions.forEach(transaction => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${transaction.description}</td>
            <td>KSh ${transaction.amount.toFixed(2)}</td>
            <td>${transaction.type}</td>
            <td>${transaction.category}</td>
        `;
        transactionList.appendChild(row);
    });
});
