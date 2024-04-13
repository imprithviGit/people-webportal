function onClickSubmit() {
    var isConfirmed = confirm("Are you sure you want to submit?");
    if (!isConfirmed) {
        return
    }
    // Get form inputs
    var fullName = document.getElementById("fullName").value;
    if (fullName == null || fullName == "") {
        return
    }
    console.log("FullName = " + fullName)
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

    // Send payload to API
    sendToAPI(payload);
}

function sendToAPI(payload) {

    console.log(payload)
    // Replace 'YOUR_API_ENDPOINT_URL' with the actual URL of your API endpoint
    var apiUrl = 'https://people-backend-production.up.railway.app/api/user/addOrUpdateUserDetails';

    fetch(apiUrl, {
        method: 'POST', // Adjust the method as per your API requirements
        headers: {
            'Content-Type': 'application/json',
            'Origin': 'localhost',
            'Access-Control-Allow-Origin': '*' // Specify the content type of the request body
        },
        body: JSON.stringify(payload) // Convert the payload object to JSON format
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json(); // Parse the JSON response
    })
    .then(data => {
        console.log('API Response:', data); // Log the response from the API
        // Optionally, perform any further actions based on the API response
        showToast("Success: Form submitted successfully!");
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error); // Log any errors
        showToast("Error while submitting form");
    });
}

function showToast(message) {
    alert(message); // You can replace this with your preferred toast library or implementation
}