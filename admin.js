// ======================
// ADMIN LOGIN
// ======================

let username = prompt("Enter Admin Username");
let password = prompt("Enter Admin Password");

if(username !== "admin" || password !== "12345"){

alert("Wrong Admin Login ❌");

document.body.innerHTML = `
<h1 style="
text-align:center;
margin-top:100px;
font-family:sans-serif;
color:red;
">
Access Denied
</h1>
`;

throw new Error("Access Denied");

}

// ======================
// LOAD USERS
// ======================

let users =
JSON.parse(localStorage.getItem("users")) || [];

console.log(users);

let table =
document.getElementById("userTable");

let totalTransactions = 0;

users.forEach(user => {

let transactions =
JSON.parse(
localStorage.getItem(
`transactions_${user.email}`
)
) || [];

totalTransactions += transactions.length;

table.innerHTML += `

<tr>

<td>${user.name}</td>

<td>${user.email}</td>

<td>${user.password}</td>

<td>${transactions.length}</td>

</tr>

`;

});

document.getElementById("totalUsers")
.innerText = users.length;

document.getElementById("totalTransactions")
.innerText = totalTransactions;