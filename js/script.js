// var map = L.map('map').setView([0, 0], 2);

// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

// var firebaseConfig = {
// apiKey: "AIzaSyCKSpg6rEK-DJ0_XNmvxj_DAwfmeDE5XkE",
// authDomain: "trial-6c107.firebaseapp.com",
// databaseURL: "https://trial-6c107-default-rtdb.firebaseio.com",
// projectId: "trial-6c107",
// storageBucket: "trial-6c107.appspot.com",
// messagingSenderId: "883705435651",
// appId: "1:883705435651:web:f653819835e7c2f46fe036"
// };

// firebase.initializeApp(firebaseConfig);
// var database = firebase.database();

// function retrieveAndDisplayDeviceData() {
//   var devicesRef = database.ref('devices');
//   var deviceTableBody = document.getElementById('device-table-body');

//   devicesRef.on('value', function(snapshot) {
//     deviceTableBody.innerHTML = ''; // Clear existing table rows
//     snapshot.forEach(function(childSnapshot) {
//       var deviceData = childSnapshot.val();
//       var deviceName = childSnapshot.key; // Get the device name
//       var lat = deviceData.lat;
//       var lon = deviceData.lon;
//       var speed = deviceData.speed;

//       L.marker([lat, lon]).addTo(map).bindPopup("Device Name: " + deviceName); // Show a popup with device name on marker click

//       // Add a row to the device table
//       var row = deviceTableBody.insertRow();
//       var nameCell = row.insertCell(0);
//       var latCell = row.insertCell(1);
//       var lonCell = row.insertCell(2);
//       var speedCell = row.insertCell(3);

//       nameCell.textContent = deviceName;
//       latCell.textContent = lat;
//       lonCell.textContent = lon;
//       speedCell.textContent = speed;

//       // Add a click event listener to show details and place a marker on the map
//       row.addEventListener('click', function() {
//         // Show details in an alert
//         alert("Device Name: " + deviceName + "\nLatitude: " + lat + "\nLongitude: " + lon + "\nSpeed: " + speed);
//         // Place a marker on the map
//         L.marker([lat, lon]).addTo(map);
//       });
//     });
//   });
// }

// retrieveAndDisplayDeviceData();








// Ensure Firebase is initialized before using it
var firebaseConfig = {
  apiKey: "AIzaSyCKSpg6rEK-DJ0_XNmvxj_DAwfmeDE5XkE",
  authDomain: "trial-6c107.firebaseapp.com",
  databaseURL: "https://trial-6c107-default-rtdb.firebaseio.com",
  projectId: "trial-6c107",
  storageBucket: "trial-6c107.appspot.com",
  messagingSenderId: "883705435651",
  appId: "1:883705435651:web:f653819835e7c2f46fe036"
};

firebase.initializeApp(firebaseConfig);
var database = firebase.database();
var user = null;

// // Function to initialize the map
// function initializeMap() {
//   var map = L.map('map').setView([23.7795, 90.4165], 12);

//   L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

//   // Retrieve and display device data
//   retrieveAndDisplayDeviceData(map);
// }

// Function to initialize the map and user authentication
function initializeMap() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (!user) {
      // Redirect to the login page if the user is not authenticated
      window.location.href = 'login.html';
    } else {
      var map = L.map('map').setView([23.7795, 90.4165], 12);
      retrieveAndDisplayDeviceData(map);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
    }
  });
}

// Function to retrieve and display device data
function retrieveAndDisplayDeviceData(map) {
  var devicesRef = database.ref();
  var deviceTableBody = document.getElementById('device-table-body');

  devicesRef.on('value', function (snapshot) {

    deviceTableBody.innerHTML = ''; // Clear existing table rows
    snapshot.forEach(function (childSnapshot) {

      for (var user in childSnapshot.val()) {
        for (var device in childSnapshot.val()[user]['devices']) {
          console.log(childSnapshot.val()[user]['devices'][device])

          var device_id = device;
          var vehicle_type = childSnapshot.val()[user]['devices'][device].vehichle_type;
          var lat = childSnapshot.val()[user]['devices'][device].latitude;
          var lon = childSnapshot.val()[user]['devices'][device].longitude;
          var speed = childSnapshot.val()[user]['devices'][device].speed;

          L.marker([lat, lon]).addTo(map).bindPopup("Device ID: " + device_id); // Show a popup with device_id on marker click

          // Add a row to the device table
          var row = deviceTableBody.insertRow();
          var idCell = row.insertCell(0);
          var typeCell = row.insertCell(1);
          var latCell = row.insertCell(2);
          var lonCell = row.insertCell(3);
          var speedCell = row.insertCell(4);

          idCell.textContent = device_id;
          typeCell.textContent = vehicle_type;
          latCell.textContent = lat;
          lonCell.textContent = lon;
          speedCell.textContent = speed;

          // Add a click event listener to show details and place a marker on the map
          row.addEventListener('click', function () {
            // Show details in an alert
            alert("Device ID: " + device_id + "\nVehicle Type: " + vehicle_type + "\nLatitude: " + lat + "\nLongitude: " + lon + "\nSpeed: " + speed);
            // Place a marker on the map
            L.marker([lat, lon]).addTo(map);
          });
        }
      }
    });
  });
}

// Function to log out the user
function logout() {
  firebase.auth().signOut().then(function () {
    window.location.replace("login.html"); // Redirect to login page after logout
  }).catch(function (error) {
    console.error("Error logging out: ", error);
  });
}

// Auto-refresh the device list every minute
setInterval(retrieveAndDisplayDeviceData, 10000);

// Ensure the DOM is ready before initializing the map
window.addEventListener('DOMContentLoaded', function () {
  initializeMap();
});

