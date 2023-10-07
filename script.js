// Initialize Firebase with your own Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAJQBw0dwSqriGDVajDxd6UII5ZZTkIlRI",
  authDomain: "hydroquotracker.firebaseapp.com",
  databaseURL: "https://hydroquotracker-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "hydroquotracker",
  storageBucket: "hydroquotracker.appspot.com",
  messagingSenderId: "503693018454",
  appId: "1:503693018454:web:7be1e63ddee23a087f82f7"
};

firebase.initializeApp(firebaseConfig);

// Reference to the Firebase database
const database = firebase.database();

// Initialize Leaflet map
const map = L.map('map').setView([23.7644025, 90.3890150], 10); // Initial center and zoom level

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Function to add a marker to the map and save its position to Firebase
document.getElementById('addMarkerButton').addEventListener('click', () => {
  navigator.geolocation.getCurrentPosition(position => {
    const { latitude, longitude } = position.coords;
    
    // Add a marker to the map
    const marker = L.marker([latitude, longitude]).addTo(map);

    // Save the latitude and longitude to Firebase
    database.ref('markers').push({
      latitude,
      longitude
    });
  });
});

// Function to retrieve and display markers from Firebase
function displayMarkers() {
  database.ref('markers').on('child_added', snapshot => {
    const markerData = snapshot.val();
    const { latitude, longitude } = markerData;

    // Add a marker to the map
    const marker = L.marker([latitude, longitude]).addTo(map);
  });
}

// Call the function to initially display markers
displayMarkers();
