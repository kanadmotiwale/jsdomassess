/**
 * Airbnb Listings Display
 * Loads and displays the first 50 Airbnb listings with creative price-based styling
 */

// Main function to load and display listings
async function loadListings() {
    const container = document.getElementById("listings");

    try {
        console.log("🔄 Starting to load Airbnb listings...");

        // Fetch the JSON data
        const response = await fetch("airbnb_sf_listings_500.json");

        if (!response.ok) {
            throw new Error(`Failed to load listings: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log(`📊 Successfully loaded ${data.length} total listings`);

        // Get first 50 listings as required
        const listings = data.slice(0, 50);
        console.log(`✅ Processing first ${listings.length} listings`);

        // Clear loading animation
        container.innerHTML = "";

        // Create and display each listing
        listings.forEach((listing, index) => {
            try {
                createListingCard(listing, container, index);
            } catch (error) {
                console.warn(`⚠️ Skipped listing ${index + 1} due to error:`, error.message);
            }
        });

        console.log("🎉 All listings loaded successfully!");

        // Add some statistics
        displayStatistics(listings);

    } catch (error) {
        console.error("❌ Error loading listings:", error);
        showErrorMessage(container, error);
    }
}

// Create individual listing card
function createListingCard(listing, container, index) {
    // Parse amenities from string format
    let amenities = [];
    try {
        amenities = JSON.parse(listing.amenities || "[]");
        if (!Array.isArray(amenities)) {
            amenities = [];
        }
    } catch (e) {
        console.warn(`Invalid amenities format for listing ${index + 1}`);
        amenities = [];
    }

    // Extract numeric price for categorization
    const priceNum = parseFloat((listing.price || "$0").replace(/[$,]/g, ""));

    // Create card element
    const card = document.createElement("div");
    card.className = "listing-card";

    // Apply creative feature: price-based color coding
    if (priceNum < 100) {
        card.classList.add("cheap");
    } else if (priceNum < 200) {
        card.classList.add("mid");
    } else {
        card.classList.add("expensive");
    }

    // Add hover analytics
    card.addEventListener('mouseenter', () => {
        console.log(`👀 User viewing: ${listing.name} (${listing.price})`);
    });

    // Build card HTML
    card.innerHTML = `
    <img class="thumb" 
         src="${listing.picture_url || 'https://via.placeholder.com/300x200?text=No+Image'}" 
         alt="Photo of ${listing.name || 'Listing'}"
         onerror="this.src='https://via.placeholder.com/300x200?text=Image+Not+Available'">
    
    <div class="card-content">
      <h2 title="${listing.name || 'Unnamed Listing'}">${listing.name || 'Unnamed Listing'}</h2>
      
      <p>${listing.description || 'No description available for this listing.'}</p>
      
      <div class="amenities">
        <strong>🏠 Amenities:</strong>
        ${amenities.length > 0
        ? amenities.slice(0, 6).join(", ") + (amenities.length > 6 ? "..." : "")
        : "No amenities listed"}
      </div>
      
      <div class="host">
        <img class="host-img" 
             src="${listing.host_picture_url || 'https://via.placeholder.com/45x45?text=Host'}" 
             alt="Host ${listing.host_name || 'Unknown'}"
             onerror="this.src='https://via.placeholder.com/45x45?text=Host'">
        <span class="host-name">Hosted by ${listing.host_name || 'Unknown Host'}</span>
      </div>
      
      <div class="price" title="Price per night">
        ${listing.price || 'Price not available'}
      </div>
    </div>
  `;

    container.appendChild(card);
}

// Display error message to user
function showErrorMessage(container, error) {
    container.innerHTML = `
    <div class="error-display">
      <h2>🚨 Unable to Load Listings</h2>
      <p><strong>Error:</strong> ${error.message}</p>
      <p>Please check that the <code>airbnb_sf_listings_500.json</code> file is in the same folder as this HTML file.</p>
      <p>If you're opening this file directly in your browser (file:// URL), try using a local server instead.</p>
      <br>
      <button onclick="location.reload()" style="padding: 10px 20px; background: #3498db; color: white; border: none; border-radius: 5px; cursor: pointer;">
        🔄 Try Again
      </button>
    </div>
  `;
}

// Display statistics about loaded listings
function displayStatistics(listings) {
    const priceStats = listings.reduce((stats, listing) => {
        const price = parseFloat((listing.price || "$0").replace(/[$,]/g, ""));
        if (price < 100) stats.cheap++;
        else if (price < 200) stats.mid++;
        else stats.expensive++;
        return stats;
    }, { cheap: 0, mid: 0, expensive: 0 });

    console.log("📈 Price Distribution:", priceStats);

    // Add stats to the page
    const statsElement = document.createElement("div");
    statsElement.style.cssText = "text-align: center; margin: 2rem 0; padding: 1rem; background: rgba(255,255,255,0.8); border-radius: 8px;";
    statsElement.innerHTML = `
    <p style="color: #666; font-size: 0.9rem;">
      📊 Loaded 50 listings: 
      <span style="color: #2ecc71;">${priceStats.cheap} budget-friendly</span> • 
      <span style="color: #f39c12;">${priceStats.mid} mid-range</span> • 
      <span style="color: #c0392b;">${priceStats.expensive} premium</span>
    </p>
  `;

    document.querySelector("main").appendChild(statsElement);
}

// Utility function to handle image loading errors
function handleImageError(img, fallbackUrl) {
    img.onerror = null; // Prevent infinite loop
    img.src = fallbackUrl;
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log("🏠 Airbnb Listings Demo initialized");
    loadListings();
});

// Add window error handler for debugging
window.addEventListener('error', function(e) {
    console.error("💥 JavaScript error:", e.error);
});

// Export for potential testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { loadListings, createListingCard };
}