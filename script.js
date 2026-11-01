let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

// OPEN / CLOSE MODAL
function openModal() {
    document.getElementById("modal").style.display = "block";
}

function closeModal() {
    document.getElementById("modal").style.display = "none";
}

// ADD TRANSACTION
function addTransaction() {
    const name = document.getElementById("name").value;
    const date = document.getElementById("date").value;
    const category = document.getElementById("category").value;
    const amount = +document.getElementById("amount").value;
    const type = document.getElementById("type").value;

    const newTx = { id: Date.now(), name, date, category, amount, type };

    transactions.push(newTx);
    localStorage.setItem("transactions", JSON.stringify(transactions));

    closeModal();
    renderTransactions();
}

// DELETE
function deleteTransaction(id) {
    transactions = transactions.filter(t => t.id !== id);
    localStorage.setItem("transactions", JSON.stringify(transactions));
    renderTransactions();
}

// RENDER
function renderTransactions() {
    const tbody = document.getElementById("tableBody");
    const search = document.getElementById("search").value.toLowerCase();
    const filter = document.getElementById("filterType").value;

    tbody.innerHTML = "";

    let income = 0, expense = 0;

    transactions
        .filter(t => {
            return (
                (filter === "all" || t.type === filter) &&
                t.name.toLowerCase().includes(search)
            );
        })
        .forEach(t => {

            if (t.type === "income") income += t.amount;
            else expense += t.amount;

            tbody.innerHTML += `
                <tr>
                    <td>${t.name}</td>
                    <td>${t.date}</td>
                    <td>${t.category}</td>
                    <td class="${t.type}">₹${t.amount}</td>
                    <td>${t.type}</td>
                    <td><button onclick="deleteTransaction(${t.id})">Delete</button></td>
                </tr>
            `;
        });

    document.getElementById("income").innerText = "₹" + income;
    document.getElementById("expense").innerText = "₹" + expense;
    document.getElementById("balance").innerText = "₹" + (income - expense);
}

// INIT
renderTransactions();