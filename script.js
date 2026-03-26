document.addEventListener('DOMContentLoaded', () => {
    // 1. Navbar link highlighting based on current page
    const currentUrl = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-links li a');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentUrl.substring(1)) {
            link.classList.add('active-nav-link');
        }
    });

    // Add a helper class for active nav-link to apply the pseudo-element style
    const style = document.createElement('style');
    style.innerHTML = '.active-nav-link::after { width: 100%; }';
    document.head.appendChild(style);


    // 2. Dynamic Band List Functionality on Register Page
    const bandForm = document.getElementById('bandRegistrationForm');
    const bandListContainer = document.getElementById('registeredBands');

    // Key function to get and render the list from LocalStorage
    const renderBands = () => {
        // Clear current view
        bandListContainer.innerHTML = '';
        
        // Get data from LocalStorage (or an empty array)
        let bands = JSON.parse(localStorage.getItem('bandMitra_bands')) || [];
        
        // Render each band card
        bands.forEach((band, index) => {
            const card = document.createElement('div');
            card.className = 'band-card';
            
            card.innerHTML = `
                <h3>${band.name}</h3>
                <p>📍 ${band.location}</p>
                <p class="price">₹${band.price} / event</p>
                <button class="btn btn-secondary" style="margin-top: 15px; width: 100%;">Book Now</button>
                <button class="btn-delete" style="margin-top: 10px; background: none; border: none; color: #ff6ec7; font-size: 0.9rem; text-decoration: underline; cursor: pointer;">[Delete]</button>
            `;

            // Append new card and add delete event listener
            bandListContainer.appendChild(card);
            
            card.querySelector('.btn-delete').addEventListener('click', () => {
                deleteBand(index);
            });
        });
    };

    // Helper function to add a band and save to LocalStorage
    const addBand = (name, price, location) => {
        let bands = JSON.parse(localStorage.getItem('bandMitra_bands')) || [];
        bands.push({ name, price, location });
        localStorage.setItem('bandMitra_bands', JSON.stringify(bands));
        renderBands();
    };

    // Helper function to delete a band
    const deleteBand = (index) => {
        let bands = JSON.parse(localStorage.getItem('bandMitra_bands')) || [];
        bands.splice(index, 1);
        localStorage.setItem('bandMitra_bands', JSON.stringify(bands));
        renderBands();
    }

    // Initialize with existing data on page load
    if (bandForm) {
        renderBands();

        // Handle form submission
        bandForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent standard form submission

            // Capture the input values
            const name = document.getElementById('bandName').value;
            const price = document.getElementById('bandPrice').value;
            const location = document.getElementById('bandLocation').value;

            // Use the helper function to add and save the band
            addBand(name, price, location);

            // Clear the form fields for the next entry
            bandForm.reset();
        });
    }

    // 3. Contact Form Submission Confirmation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Your message has been sent successfully! We will get back to you soon.');
            contactForm.reset();
        });
    }

});

document.addEventListener("DOMContentLoaded", () => {
  // 1. Select the search input and all the band cards
  const searchInput = document.querySelector('.search-box input');
  const bandCards = document.querySelectorAll('.app-card');

  // 2. Listen for typing in the search box
  searchInput.addEventListener('input', (e) => {
    // Convert the search term to lowercase for accurate matching
    const searchTerm = e.target.value.toLowerCase();

    // 3. Loop through every band card
    bandCards.forEach(card => {
      // Get the title and tags of the current card
      const title = card.querySelector('.app-card-title').textContent.toLowerCase();
      
      // Get all tags and join them into a single string (e.g., "live festival")
      const tags = Array.from(card.querySelectorAll('.tag'))
                        .map(tag => tag.textContent.toLowerCase())
                        .join(' ');
      
      // Combine the title and tags so we can search through both
      const searchableText = `${title} ${tags}`;

      // 4. Check if the search term exists in our text
      if (searchableText.includes(searchTerm)) {
        // If it matches, show the card (leaves the original CSS display intact)
        card.style.display = ''; 
      } else {
        // If it doesn't match, hide the card
        card.style.display = 'none'; 
      }
    });
  });
});