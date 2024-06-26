function onClickSubmit() {
    Swal.fire({
        title: 'Are you sure?',
        icon: 'question',
        toast: 'true',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'Cancel',
        position: 'top-end'
    }).then((result) => {
        if (result.isConfirmed) {
            submitForm()
            console.log('Sure to submit');
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            console.log('Form submission cancelled');
            return
        }
    });
}

function submitForm() {

    // Get form inputs
    var fullName = document.getElementById("fullName").value;
    var contactNumber = document.getElementById("contactNumber").value;
    var gender = document.getElementById("gender").value;
    var location = document.getElementById("location").value;
    var dob = document.getElementById("dob").value;
    var stateOfBirth = document.getElementById("stateOfBirth").value;
    var nationality = document.getElementById("nationality").value;
    var aadharNo = document.getElementById("aadharNo").value;
    var panNo = document.getElementById("panNo").value;

    // Construct payload
    var payload = {
        fullName: fullName,
        contactNumber: contactNumber,
        gender: gender,
        location: location,
        dob: dob,
        stateOfBirth: stateOfBirth,
        nationality: nationality,
        aadharNo: aadharNo,
        panNo: panNo
    };

    isCorrect = verifyDetails(payload)
    if (isCorrect == false) {
        showToast("Please input correct details", 1)
        return
    }
    // Send payload to API
    sendToAPI(payload);

}

function isNullOrEmpty(data) {
    if (data == null || data == "") {
        return true;
    }
    return false;
}

function verifyDetails(payload) {
    if (isNullOrEmpty(payload.fullName) || isNullOrEmpty(payload.contactNumber)) {
        return false;
    }
    return true
}

function sendToAPI(payload) {

    console.log(payload)
    // Replace 'YOUR_API_ENDPOINT_URL' with the actual URL of your API endpoint
    var apiUrl = 'https://people-backend-production.up.railway.app/api/user/addOrUpdateUserDetails';

    fetch(apiUrl, {
        method: 'POST', // Adjust the method as per your API requirements
        headers: {
            'Content-Type': 'application/json',
            'Origin': 'dummy',
        },
        body: JSON.stringify(payload) // Convert the payload object to JSON format
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response; // Parse the JSON response
    })
    .then(data => {
        console.log('API Response:', data.body); // Log the response from the API
        // Optionally, perform any further actions based on the API response
        showToast("Success: Form submitted successfully!", 2);
        clearInputFields()
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error); // Log any errors
        showToast("Error while submitting form", 3);
    });
}

function showToast(message, code) {
    
    var icon
    if (code == 1) 
        icon = 'info'
    else if (code == 2)
        icon = 'success'
    else
        icon = 'error'
    
    Swal.fire({
        toast: true,
        position: 'top-end',
        icon: icon,
        title: message,
        showConfirmButton: false,
        timer: 5000
    });
}

function clearInputFields() {
    // Get all input elements
    var inputElements = document.querySelectorAll('input');

    // Loop through each input element
    inputElements.forEach(function(input) {
        // Set the value of the input element to an empty string
        input.value = '';
    });
}

function showDatabaseEntries() {
    Swal.fire({
        title: 'Fetching Data',
        text: 'Fetching data from the API...',
        icon: 'info',
        toast: 'true',
        position: 'top-end',
        timer: 2000,
    });

    var form = document.getElementById("userDetailsForm");
    form.style.display = 'none';

    fetch('https://people-backend-production.up.railway.app/api/user/getUserDetails')
        .then(response => {
            console.log('Response Status:', response.status);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); 
        })
        .then(data => {
            console.log('API Data:', data);
            displayDataInTable(data); 
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            showToast("Error fetching data", 3);
        });
}

    
function displayDataInTable(data) {
    var table = document.createElement("table");
    table.classList.add("table", "table-striped", "table-bordered"); // Adding Bootstrap table classes

    var headerRow = table.insertRow();
    Object.keys(data[0]).forEach(key => {
        var headerCell = document.createElement("th");
        headerCell.textContent = key;
        headerRow.appendChild(headerCell);
    });

    data.forEach(item => {
        var row = table.insertRow(); 
        Object.entries(item).forEach(([key, value]) => {
            var cell = row.insertCell(); 
            // Trim DOB string to get the first 10 characters
            if (key === "dob" && value.length > 10) {
                value = value.substring(0, 10);
            }
            cell.textContent = value;
            cell.style.padding = "8px"; 
        });
    });

    var dataTable = document.getElementById("dataTable");
    if (!dataTable) {
        dataTable = document.createElement("div");
        dataTable.id = "dataTable";
        document.body.appendChild(dataTable);
    }

    dataTable.innerHTML = '';
    dataTable.appendChild(table);
}




