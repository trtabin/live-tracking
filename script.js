// Initialize the map
var map = L.map('map').setView([23.7644025, 90.3890150], 10);

// Add the OpenStreetMap layer
L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

// Initialize an empty array to store user-provided marker coordinates
var userMarkers = [];

var firebaseConfig = {
  apiKey: "AIzaSyBKvVZeimn-iqb38WiqtseKzlFFKjeHQ5c",
  authDomain: "hydroquotracker-new.firebaseapp.com",
  projectId: "hydroquotracker-new",
  storageBucket: "hydroquotracker-new.appspot.com",
  messagingSenderId: "604958695388",
  appId: "1:604958695388:web:eaf01e4e1bf1ddf3e23919",
  measurementId: "G-GSNTDC6PQN",
  databaseURL: "https://hydroquotracker-new-default-rtdb.firebaseio.com/"
};

firebase.initializeApp(firebaseConfig);



firebase.database().ref().on("value", function (snapshot) {
  console.log();
  Object.entries(snapshot.val().markers).forEach((entry) => {
      const [key, value] = entry;
      console.log(`${key}: ${value.lat} ${value.log}`);

      var marker = L.marker([`${value.lat}`, `${value.log}`]).addTo(map);

      // Add the marker to the userMarkers array
      userMarkers.push(marker);
  });
}, function (error) {
  console.log("Error: " + error.code);
});

