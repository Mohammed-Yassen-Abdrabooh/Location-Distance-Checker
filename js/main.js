document.getElementById('locationForm').addEventListener('submit', function (event) {
  event.preventDefault();

  const userLat = parseFloat(document.getElementById('latitude1').value);
  const userLon = parseFloat(document.getElementById('longitude1').value);
  const targetLat = parseFloat(document.getElementById('latitude2').value);
  const targetLon = parseFloat(document.getElementById('longitude2').value);
  const distance = calculateDistance(targetLat, targetLon, userLat, userLon);
  const messageElement = document.getElementById("message");
  if (distance <= 0.1) {
    messageElement.textContent = `Success: The distance is ${distance.toFixed(4)} km,which is within 100 meters.`;
    messageElement.style.color = 'green';
  } else {
    messageElement.textContent = `Warning: The distance is ${distance.toFixed(4)} km, which is more than 100 meters.`;
    messageElement.style.color = 'red';
  }
});

document.getElementById('locationForm2').addEventListener('submit', function (event) {
  event.preventDefault();

  const userLat = parseFloat(document.getElementById('latitude').value);
  const userLon = parseFloat(document.getElementById('longitude').value);

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      const currentLat = position.coords.latitude;
      const currentLon = position.coords.longitude;

      const distance = calculateDistance(currentLat, currentLon, userLat, userLon);

      const messageElement = document.getElementById('message');
      if (distance <= 0.1) {
        messageElement.textContent = `Success: The distance is ${distance.toFixed(4)} km,which is within 100 meters.`;;
        messageElement.style.color = 'green';
      } else {
        messageElement.textContent = `Warning: The distance is ${distance.toFixed(4)} km, which is more than 100 meters.`;
        messageElement.style.color = 'red';
      }
    }, function (error) {
      alert('Error: Unable to retrieve your location.');
    });
  } else {
    alert('Geolocation is not supported by this browser.');
  }
});

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the Earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in km
  return distance;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}