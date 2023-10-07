// Initialize the map
var map = L.map('map').setView([23.7644025, 90.3890150], 10);

// Add the OpenStreetMap layer
L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

// Initialize an empty array to store user-provided marker coordinates
var userMarkers = [];

// Function to add a marker based on user input
function addMarker() {
  var latInput = parseFloat(prompt("Enter latitude:"));
  var lonInput = parseFloat(prompt("Enter longitude:"));

  if (!isNaN(latInput) && !isNaN(lonInput)) {
      // Create a marker and add it to the map
      var marker = L.marker([latInput, lonInput]).addTo(map);

      // Add the marker to the userMarkers array
      userMarkers.push(marker);

      // Center the map to the user's latest marker
      map.panTo([latInput, lonInput]);

      // Optionally, you can display all user markers in the console
      console.log("User markers:", userMarkers);
  } else {
      alert("Invalid input. Please enter valid latitude and longitude.");
  }
}

// Add a click event listener to the "Add Marker" button
document.getElementById("addMarkerButton").addEventListener("click", addMarker);
