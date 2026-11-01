function registerUser(name, email, password) {

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let exists = users.find(u => u.email === email);

    if (exists) {
        alert("User already exists");
        return false;
    }

    users.push({ name, email, password });

    localStorage.setItem("users", JSON.stringify(users));

    createUserData(email);

    return true;
}


function loginUser(email, password) {

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let user = users.find(u => u.email === email && u.password === password);

    if (!user) return false;

    localStorage.setItem("currentUser", email);

    return true;
}


function logoutUser() {
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
}