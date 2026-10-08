let map;
let marker;

function initMap() {
  const defaultCenter = { lat: 33.6844, lng: 73.0479 };

  map = new google.maps.Map(document.getElementById('map'), {
    center: defaultCenter,
    zoom: 13,
    mapTypeControl: false,
    streetViewControl: false,
  });

  marker = new google.maps.Marker({
    position: defaultCenter,
    map: map,
    title: 'Your location',
  });
}

function updateLocationInfo(position) {
  const lat = position.coords.latitude;
  const lng = position.coords.longitude;
  const accuracy = position.coords.accuracy;

  document.getElementById('lat').textContent = lat.toFixed(6);
  document.getElementById('lng').textContent = lng.toFixed(6);
  document.getElementById('accuracy').textContent = `${Math.round(accuracy)} m`;

  const latLng = { lat, lng };
  map.setCenter(latLng);
  map.setZoom(16);
  marker.setPosition(latLng);

  const geocoder = new google.maps.Geocoder();
  geocoder.geocode({ location: latLng }, (results, status) => {
    if (status === 'OK' && results[0]) {
      document.getElementById('address').textContent = results[0].formatted_address;
    } else {
      document.getElementById('address').textContent = 'Address not available';
    }
  });
}

function handleLocationError(error) {
  const messages = {
    1: 'Permission denied. Please allow location access.',
    2: 'Location unavailable. Please try again.',
    3: 'Location request timed out.'
  };

  alert(messages[error.code] || 'Unable to get your location.');
}

function watchLocation() {
  if (!navigator.geolocation) {
    alert('Geolocation is not supported by this browser.');
    return;
  }

  navigator.geolocation.getCurrentPosition(updateLocationInfo, handleLocationError, {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 0,
  });

  navigator.geolocation.watchPosition(updateLocationInfo, handleLocationError, {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 0,
  });
}

document.getElementById('locateBtn').addEventListener('click', watchLocation);
