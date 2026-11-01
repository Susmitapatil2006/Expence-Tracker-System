// ==========================
// CHECK LOGIN USER
// ==========================
let currentUser = localStorage.getItem("currentUser");

if (!currentUser) {
    window.location.href = "login.html";
}

// ==========================
// ELEMENTS
// ==========================
const popup = document.getElementById("expensePopup");
const addExpenseBtn = document.getElementById("addExpenseBtn");
const closeBtn = document.getElementById("closeBtn");
const addBtn = document.getElementById("addBtn");
const toast = document.getElementById("toast");
const transactionSection = document.querySelector(".transaction-section");

// ==========================
// LOAD USER TRANSACTIONS
// ==========================
let transactions =
JSON.parse(localStorage.getItem(`transactions_${currentUser}`)) || [];

// ==========================
// SAVE FUNCTION
// ==========================
function saveTransactions() {
    localStorage.setItem(
        `transactions_${currentUser}`,
        JSON.stringify(transactions)
    );
}

// ==========================
// TOAST
// ==========================
function showToast(msg) {
    toast.innerHTML = msg;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2000);
}

// ==========================
// CALCULATE TOTALS
// ==========================
function calculateTotals() {

let income = 0;
let expense = 0;

transactions.forEach(t => {

const amount =
Number(t.amount);

if(amount > 0){

income += amount;

}

else{

expense += Math.abs(amount);

}

});

let balance =
income - expense;

document.querySelector(".income h2")
.innerText = "₹" + income;

document.querySelector(".expense h2")
.innerText = "₹" + expense;

document.querySelector(".balance h2")
.innerText = "₹" + balance;

document.querySelector(".savings h2")
.innerText = "₹" + balance;

}

// ==========================
// RENDER TRANSACTIONS
// ==========================
function renderTransactions() {

document.querySelectorAll(".transaction-item")
.forEach(e => e.remove());

const oldMsg =
document.querySelector(".empty-msg");

if(oldMsg){
oldMsg.remove();
}

if(transactions.length === 0){

const p =
document.createElement("p");

p.classList.add("empty-msg");

p.innerText =
"No Transactions Yet";

transactionSection.appendChild(p);

return;

}

transactions
.slice()
.reverse()
.forEach(t => {

const div =
document.createElement("div");

div.classList.add(
"transaction-item"
);

div.innerHTML = `

<div>

<h4>${t.title || "No Title"}</h4>

<p>

${t.category || t.type}

<br>

<small>

${t.date || ""}

</small>

</p>

</div>

<h3 class="${
Number(t.amount) > 0
? "green"
: "red"
}">

${
Number(t.amount) > 0
? "+"
: "-"
}

₹${Math.abs(Number(t.amount))}

</h3>

`;

transactionSection.appendChild(div);

});

}
// ==========================
// ADD TRANSACTION
// ==========================
addBtn.onclick = () => {

    const title = document.getElementById("titleInput").value;
    const amount = Number(document.getElementById("amountInput").value);
    const type = document.getElementById("typeInput").value;

    if (!title || !amount) {
        showToast("❌ Fill all fields");
        return;
    }

    const category =
document.getElementById("categoryInput").value;

const transaction = {

    title:title,

    amount:

    type === "expense"
    ? -Math.abs(amount)
    : Math.abs(amount),

    type:type,

    category:category,

    date:new Date().toLocaleString()

};

    transactions.push(transaction);

    saveTransactions();

    calculateTotals();
    renderTransactions();

    popup.style.display = "none";

    document.getElementById("titleInput").value = "";
    document.getElementById("amountInput").value = "";

    showToast("✅ Added Successfully");
};

// ==========================
// POPUP OPEN/CLOSE
// ==========================
addExpenseBtn.onclick = () => popup.style.display = "flex";
closeBtn.onclick = () => popup.style.display = "none";

window.onclick = (e) => {
    if (e.target == popup) popup.style.display = "none";
};

// ==========================
// QUICK ACTIONS
// ==========================
document.getElementById("incomeAction").onclick = () => {
    popup.style.display = "flex";
    document.getElementById("typeInput").value = "income";
};

document.getElementById("expenseAction").onclick = () => {
    popup.style.display = "flex";
    document.getElementById("typeInput").value = "expense";
};

// ==========================
// LOGOUT
// ==========================
document.getElementById("logoutBtn").onclick = () => {
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
};

// ==========================
// SEARCH
// ==========================
document.getElementById("searchInput").addEventListener("keyup", function () {
    const value = this.value.toLowerCase();

    document.querySelectorAll(".transaction-item").forEach(item => {
        item.style.display =
            item.innerText.toLowerCase().includes(value)
                ? "flex"
                : "none";
    });
});

// ==========================
// CLOCK
// ==========================
setInterval(() => {
    const el = document.getElementById("liveTime");
    if (el) {
        const now = new Date();
        el.innerText = now.toLocaleString();
    }
}, 1000);

// ==========================
// INIT PAGE
// ==========================
window.onload = () => {

    calculateTotals();
    renderTransactions();

    let users =
    JSON.parse(localStorage.getItem("users")) || [];

    let loggedUser =
    users.find(user => user.email === currentUser);

    let isNewUser =
    localStorage.getItem("isNewUser");

    if(isNewUser === "true"){

        document.getElementById("welcomeText")
        .innerText =
        `Welcome ${loggedUser.name} 👋`;

        showToast("🎉 Registration Successful");

        localStorage.removeItem("isNewUser");

    }
    else{

        document.getElementById("welcomeText")
        .innerText =
        `Welcome Back ${loggedUser.name} 👋`;

        showToast("👋 Welcome Back");

    }

};
// ==========================
// SHOW REGISTER NAME
// ==========================

let users =
JSON.parse(localStorage.getItem("users")) || [];

let loggedUser =
users.find(user => user.email === currentUser);

if(loggedUser){

document.getElementById("welcomeText")
.innerText =
`Welcome Back ${loggedUser.name} 👋`;

}

else{

document.getElementById("welcomeText")
.innerText =
`Welcome Back 👋`;

}
document.getElementById("viewAllBtn")
.onclick = () => {

    window.location.href =
    "transactions.html";

};
document.getElementById("notificationAction")
.onclick = () => {

    showToast(
    `You have ${transactions.length} transactions`
    );

};
document.getElementById("reportAction")
.onclick = () => {

    const { jsPDF } = window.jspdf;

    const doc = new jsPDF();

    doc.text(
    "Expense Tracker Report",
    20,
    20
    );

    let y = 40;

    transactions.forEach((t,index)=>{

        doc.text(
        `${index+1}. ${t.title} - ₹${t.amount} (${t.type})`,
        20,
        y
        );

        y += 10;

    });

    doc.save("report.pdf");

};
// ==========================
// LOAD THEME
// ==========================

let savedTheme =
localStorage.getItem("theme");

if(savedTheme === "dark"){

document.body.classList.add(
"dark-theme"
);

}