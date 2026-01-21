# Airbnb Listings Display

This project loads and displays the first 50 Airbnb listings from San Francisco using JavaScript fetch and async/await. Built as part of my web development course assignment.

## Live Demo

**[View the website here](https://kanadmotiwale.github.io/jsdomassess/)**

## What it does

The page shows 50 Airbnb listings with all the required information:
- Listing name and description
- Photos of the property
- Host name and profile picture
- Price per night
- Available amenities

## My creative addition

I added a color-coding system based on price ranges to make it easier to browse:
- **Green border**: Budget listings under $100
- **Yellow border**: Mid-range listings $100-200
- **Red border**: Premium listings over $200

There's also a legend at the top that explains the colors.

## Technical stuff

- Uses `fetch()` and `async/await` to load data from the JSON file
- Responsive design that works on mobile and desktop
- Handles errors if images don't load
- Grid layout that adjusts to screen size

## Files

```
├── index.html                    # Main page
├── style.css                     # Styling and colors
├── script.js                     # JavaScript logic
├── airbnb_sf_listings_500.json   # Data file with listings
└── README.md                     # This file
```

## How to run locally

1. Download all the files
2. Make sure the JSON file is in the same folder
3. Open with a local server (I used VS Code Live Server)
4. Don't open index.html directly - use a server to avoid CORS issues

## Assignment requirements completed

- ✅ Loads first 50 listings only
- ✅ Uses fetch with async/await
- ✅ Shows listing name, description, amenities, host info, price, and thumbnail
- ✅ Added creative price-based color coding
- ✅ Deployed on GitHub Pages
- ✅ Meaningful README with live link

## Challenges I faced

- Had to figure out how to parse the amenities since they're stored as strings in the JSON
- Took a while to get the responsive grid layout working properly
- Initially had CORS errors when testing locally until I used a proper server

Overall this was a good project to practice working with real data and making it look presentable on a webpage.