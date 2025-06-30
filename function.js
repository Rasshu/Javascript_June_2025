function redirect(url) {
    window.location.href = url;
}

let selectedUserId = null;

function confirmDelete(id) {
    selectedUserId = id;
}

function deleteUser() {

    fetch(`https://localhost:7030/api/User/${selectedUserId}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            alert('User deleted successfully!');
            // Optionally refresh or remove the user from the UI
            location.reload();
        } else {
            alert('Failed to delete user.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while deleting.');
    });


    // let users = JSON.parse(localStorage.getItem("users")) || [];
    // users = users.filter(user => user.id !== selectedUserId); // select other that selected item from localstorage and update again in localstorage.
    // debugger
    // localStorage.setItem("users", JSON.stringify(users));
    // location.reload();  // reload the page
}

document.addEventListener("DOMContentLoaded", async function () {
    // let users = localStorage.getItem("users");
    // let usersObj = JSON.parse(users) || [];
    // let tableBody = document.getElementById("userTableBody");


    

    let response = await fetch('https://localhost:7030/api/User')  
    let usersObj = await response.json();
    debugger;
    let tableBody = document.getElementById("userTableBody");

    usersObj.forEach(user => {
        let row = document.createElement("tr");
        row.innerHTML = `
          <td>${user.name}</td>
          <td>${user.email}</td>
          <td>
            
            <a href="./EditUser.html?id=${user.id}">Edit</a> | 
            <button type="button" class="btn btn-link" data-bs-toggle="modal" data-bs-target="#deleteModal" onclick="confirmDelete(${user.id})">Delete</button>
          </td>`;
        tableBody.appendChild(row);
    });
});


