
let selectedDocsId = null;

function confirmDelete(id) {
    selectedDocsId = id;
}

function deleteUser() {

    fetch(`https://localhost:7030/api/Upload/${selectedDocsId}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            alert('Document deleted successfully!');
            // Optionally refresh or remove the user from the UI
            location.reload();
        } else {
            alert('Failed to delete document.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while deleting.');
    });
}


document.addEventListener("DOMContentLoaded", async function () {

    let response = await fetch('https://localhost:7030/api/Upload/getdocuments')  
    let docsObj = await response.json();
    debugger;
    let tableBody = document.getElementById("docsTableBody");

    docsObj.forEach(docs => {
        let row = document.createElement("tr");
        row.innerHTML = `
          <td>${docs.label}</td>
          <td>${docs.fileName}</td>
          <td>
            
            <a href="./EditUser.html?id=${docs.id}">Edit</a> | 
            <button type="button" class="btn btn-link" data-bs-toggle="modal" data-bs-target="#deleteModal" onclick="confirmDelete(${docs.id})">Delete</button>
          </td>`;
        tableBody.appendChild(row);
    });
});


document.addEventListener("DOMContentLoaded", function(e) {
document.getElementById("uploadForm").addEventListener("submit",async function (e) {
    e.preventDefault();
debugger;
    let title = document.getElementById("title").value;
    let filename = document.getElementById("document").value;
    let fileInput = document.getElementById("document");
    let file = fileInput.files[0];

    if (title == "") {
        alert("enter title");
        return false;
    }
   else if (!file) {
      alert("Please select a file to upload.");
      return false;
    }
  
    //const form = e.target;
    const formData = new FormData();
formData.append("Label", document.getElementById("title").value);
formData.append("FileName", file.name);
formData.append("Document", fileInput.files[0]);

    // let uploaddetails ={
    //     Label : title,
    //     FileName : file.name
    // }

    try {
        const response = await fetch("https://localhost:7030/api/Upload/Uploaddocument", {
            method: 'POST',
            body: formData           

        });

        if (!response.ok) {
            throw new Error('Failed to save docs.');
        }

        const result = await response.json();
        alert("Saved successfully");

       location.reload();

    } catch (error) {
        console.error("Error:", error);
        alert("Submission failed. Please try again.");
    }

  });
});
function uploadFile() {
    const fileInput = document.getElementById("fileInput");
    const file = fileInput.files[0];
  
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }
  
    const formData = new FormData();
    formData.append("document", file); // 'document' is the key name used on the server
  
    fetch("/upload", {
      method: "POST",
      body: formData
    })
    .then(response => response.text())
    .then(data => {
      alert("Upload successful: " + data);
    })
    .catch(error => {
      console.error("Upload error:", error);
      alert("Upload failed.");
    });
  }