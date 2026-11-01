function editProfile() {
  let newName = prompt("Enter New Name");
  let newEmail = prompt("Enter New Email");
  let newPhone = prompt("Enter New Phone Number");

  if (newName) {
    document.getElementById("userName").innerText = newName;
    localStorage.setItem("name", newName);
  }

  if (newEmail) {
    document.getElementById("userEmail").innerText = newEmail;
    localStorage.setItem("email", newEmail);
  }

  if (newPhone) {
    document.getElementById("userPhone").innerText = newPhone;
    localStorage.setItem("phone", newPhone);
  }

  document.getElementById("statusBox").innerText =
    "✅ Profile Updated Successfully";
}

/* LOAD SAVED DATA */
window.onload = () => {
  if (localStorage.getItem("name"))
    document.getElementById("userName").innerText = localStorage.getItem("name");

  if (localStorage.getItem("email"))
    document.getElementById("userEmail").innerText = localStorage.getItem("email");

  if (localStorage.getItem("phone"))
    document.getElementById("userPhone").innerText = localStorage.getItem("phone");
};