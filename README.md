# Live Location Tracker

A simple web app that gets the user’s current location using the browser's geolocation API and displays it on a map.

## Important

This project uses Google Maps JavaScript API. You must replace:

```html
YOUR_GOOGLE_MAPS_API_KEY
```

with your own Google Maps API key.

## Run locally

Open `index.html` directly in a browser or serve the folder locally:

```bash
python3 -m http.server 8000
```

Then visit:

```text
http://localhost:8000
```

## Features

- Get current latitude and longitude
- Display map with marker at the user location
- Show location accuracy
- Reverse geocoding for address display
- Live position updates using geolocation tracking
