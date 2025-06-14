// --- GLOBAL STATE ---
let isLoggedIn = false; // Should be determined by actual auth status on page load
let rating = 0; // For review form rating

// --- CORE FUNCTIONS ---

// Preloader Logic: Hide preloader after page load
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    setTimeout(() => {
        if (preloader) preloader.classList.add('hidden');
    }, 600); // Fade out duration
});

// Particles.js Initialization (if library is loaded)
 if (typeof particlesJS !== 'undefined') {
     try {
         particlesJS('particles-js', { /* Configuration object for particles */
             particles: { number: { value: 60, density: { enable: true, value_area: 800 } }, color: { value: '#ffc107' }, shape: { type: 'circle' }, opacity: { value: 0.4, random: true, anim: { enable: true, speed: 0.5, opacity_min: 0.1, sync: false } }, size: { value: 2.5, random: true, anim: { enable: false } }, line_linked: { enable: true, distance: 130, color: '#ffffff', opacity: 0.15, width: 1 }, move: { enable: true, speed: 1.5, direction: 'none', random: true, straight: false, out_mode: 'out', bounce: false } }, interactivity: { detect_on: 'canvas', events: { onhover: { enable: true, mode: 'grab' }, onclick: { enable: true, mode: 'push' }, resize: true }, modes: { grab: { distance: 150, line_opacity: 0.3 }, bubble: {}, repulse: {}, push: { particles_nb: 3 }, remove: {} } }, retina_detect: true
         });
     } catch (error) {
        console.error("Error initializing Particles.js:", error);
     }
} else {
    console.warn("particles.js library not loaded or failed to initialize.");
}


// --- REMOVED: Custom Cursor Logic ---
// JavaScript code for custom cursor was here


// Hamburger Menu Toggle for Mobile Navigation
function toggleMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const hamburgerButton = document.querySelector('.hamburger');
    const hamburgerIcon = hamburgerButton ? hamburgerButton.querySelector('i') : null;
    if (navMenu && hamburgerButton && hamburgerIcon) {
        const isActive = navMenu.classList.toggle('active'); // Toggle active class on menu
        hamburgerIcon.className = isActive ? 'fas fa-times' : 'fas fa-bars'; // Toggle icon (bars/close)
        hamburgerButton.setAttribute('aria-expanded', isActive); // Update accessibility state
    }
}

// Modal Open/Close Functions
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if(modal) {
        modal.style.display = 'flex'; // Show the modal
        // Focus on the first focusable element within the modal for accessibility
        const focusableElements = modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstFocusable = focusableElements.length > 0 ? focusableElements[0] : null;
        if (firstFocusable) {
             // Delay focus slightly to allow transition/animation to complete
             setTimeout(() => firstFocusable.focus(), 50);
        }
        // Basic focus trapping could be added here if needed
    }
}
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if(modal) modal.style.display = 'none'; // Hide the modal
     // Consider returning focus to the element that opened the modal
}
// Close modal if user clicks on the background overlay
window.addEventListener('click', (event) => {
     document.querySelectorAll('.modal').forEach(modal => {
         if (event.target === modal) { // Check if the click target is the modal background itself
             closeModal(modal.id);
         }
     });
 });
 // Close modal if user presses the Escape key
 window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
         const openModal = document.querySelector('.modal[style*="display: flex"]'); // Find the currently open modal
         if (openModal) {
            closeModal(openModal.id);
         }
    }
 });

// --- Authentication Logic (Simulated - Replace with actual backend integration) ---
function login() {
     const emailInput = document.getElementById('login-email');
     const passwordInput = document.getElementById('login-password');
     const email = emailInput ? emailInput.value.trim() : '';
     const password = passwordInput ? passwordInput.value.trim() : '';

     // Basic validation
     if (!email || !/\S+@\S+\.\S+/.test(email)) { alert('Please enter a valid email address.'); emailInput?.focus(); return; }
     if (!password || password.length < 6) { alert('Password must be at least 6 characters.'); passwordInput?.focus(); return; }

     console.log('Simulating login attempt for:', email);
     // --- Replace simulation with actual API call to your backend ---
     // Example: fetch('/api/login', { method: 'POST', body: JSON.stringify({email, password}), ... })
     // On Successful API response:
     updateLoginState(true, email.split('@')[0] || 'User'); // Use actual username if available
     // Redirect back to index page after successful login
     window.location.href = 'index.html';
     // alert('Login Successful!'); // Provide user feedback (Optional, as redirection happens)
     // On Failed API response:
     // alert('Login failed. Please check your credentials.');
}

// MODIFIED: Signup function to use fetch for API call
async function signup() {
     const usernameInput = document.getElementById('signup-username');
     const emailInput = document.getElementById('signup-email');
     const passwordInput = document.getElementById('signup-password');
     const username = usernameInput ? usernameInput.value.trim() : '';
     const email = emailInput ? emailInput.value.trim() : '';
     const password = passwordInput ? passwordInput.value.trim() : '';
     const confirmPassword = document.getElementById('signup-confirm-password');
     const termsAgreed = document.getElementById('terms-agree');

     // Basic validation
     if (!username || username.length < 3) { alert('Username must be at least 3 characters.'); usernameInput?.focus(); return; }
     if (!email || !/\S+@\S+\.\S+/.test(email)) { alert('Please enter a valid email address.'); emailInput?.focus(); return; }
     if (!password || password.length < 6) { alert('Password must be at least 6 characters.'); passwordInput?.focus(); return; }
     if (confirmPassword && password !== confirmPassword.value) { alert('Passwords do not match!'); confirmPassword?.focus(); return; }
     if (termsAgreed && !termsAgreed.checked) { alert('You must agree to the Terms and Conditions and Privacy Policy!'); termsAgreed?.focus(); return; }


     console.log('Attempting signup for:', username, email);

     // --- Actual API Call (REPLACE SIMULATION) ---
     try {
         const response = await fetch('/api/signup', { // Your backend signup endpoint
             method: 'POST',
             headers: {
                 'Content-Type': 'application/json'
             },
             body: JSON.stringify({ username, email, password })
         });

         const data = await response.json();

         if (response.ok) { // Check if the response status is 2xx
             alert('Signup successful! Please login.'); // User feedback
             window.location.href = 'login.html'; // Redirect to login page
         } else {
             // Handle API errors (e.g., email already exists, invalid data)
             alert(`Signup failed: ${data.message || 'Please try again.'}`); // Display error message from backend
             console.error('Signup API error:', data);
         }
     } catch (error) {
         console.error('Network or server error during signup:', error);
         alert('An unexpected error occurred during signup. Please try again later.');
     }
}

function logout() {
     console.log('Logging out');
     // --- Replace simulation with actual API call to your backend (e.g., invalidate session/token) ---
     // Example: fetch('/api/logout', { method: 'POST', ... })
     updateLoginState(false); // Update UI to logged-out state
     alert('Logged out successfully!'); // Feedback
     // Optionally redirect to home or login page after logout
     // window.location.href = 'index.html';
}

// Function to handle the simulated password reset request
function requestPasswordReset() {
    const emailInput = document.getElementById('reset-email');
    const email = emailInput ? emailInput.value.trim() : '';
    const resetMessage = document.getElementById('reset-message'); // Get the message element

    // Basic validation
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
        alert('Please enter a valid email address.');
        emailInput?.focus();
        return;
    }

    console.log('Simulating password reset request for:', email);
    // --- Replace simulation with actual API call to your backend ---
    // Example: fetch('/api/request-reset', { method: 'POST', body: JSON.stringify({email}), ... })
    // On Successful API response:
    // Display the message directly on the page instead of an alert
    if (resetMessage) { // Check if the message element exists
        resetMessage.style.display = 'block'; // Show the message element
        resetMessage.textContent = `If an account with "${email}" exists, a password reset link has been sent to your inbox. Please check your email.`; // Set the message text
        resetMessage.classList.add('info-message'); // Add a class for styling
    }
    // No immediate redirect, let the user see the message and then decide to go to login.
    // If you still want to redirect, you can add: window.location.href = 'login.html'; after a delay.
    // On Failed API response (optional, might not reveal if email exists for security):
    // alert('Could not process request. Please try again later.');
}


// Function to update UI elements based on login state
function updateLoginState(loggedIn, username = '') {
    isLoggedIn = loggedIn; // Update global state variable
    const authButtons = document.querySelector('.auth-buttons'); // Login/Signup buttons container
    const profileIcon = document.querySelector('.profile-icon'); // Profile icon/dropdown container
    const usernameDisplay = document.getElementById('username-display'); // Span to show username
    const dropdown = document.querySelector('.profile-dropdown'); // Profile dropdown menu

    // Toggle visibility of auth buttons vs profile icon
    if (authButtons) authButtons.style.display = loggedIn ? 'none' : 'flex';
    if (profileIcon) profileIcon.style.display = loggedIn ? 'flex' : 'none';

    // Update username display
    if (usernameDisplay) usernameDisplay.textContent = loggedIn ? username : '';

    // Ensure dropdown is hidden when state changes
    if (dropdown) dropdown.style.display = 'none';
    if (profileIcon) profileIcon.setAttribute('aria-expanded', 'false'); // Reset aria state

    // --- Important: Persist login state (Example using localStorage) ---
    // This is a basic client-side persistence. Real apps should use secure server-side sessions/tokens.
    if (typeof(Storage) !== "undefined") {
        if (loggedIn) {
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("username", username);
        } else {
            localStorage.removeItem("isLoggedIn");
            localStorage.removeItem("username");
        }
    } else {
        console.warn("LocalStorage not supported. Login state will not persist across page loads.");
    }
}

// Toggle the profile dropdown menu
function toggleProfileDropdown() {
     const dropdown = document.querySelector('.profile-dropdown');
     const profileIconButton = document.querySelector('.profile-icon');
     if (dropdown && profileIconButton) {
        const isVisible = dropdown.style.display === 'block';
        dropdown.style.display = isVisible ? 'none' : 'block'; // Toggle display
        profileIconButton.setAttribute('aria-expanded', !isVisible); // Update accessibility state
     }
}
 // Close profile dropdown if user clicks outside of it
 document.addEventListener('click', function(event) {
   const profileIcon = document.querySelector('.profile-icon');
   const dropdown = document.querySelector('.profile-dropdown');
   // Check if dropdown exists, is visible, and the click was outside both the icon and the dropdown
   if (profileIcon && dropdown && dropdown.style.display === 'block' &&
       !profileIcon.contains(event.target) && !dropdown.contains(event.target)) {
     dropdown.style.display = 'none'; // Hide dropdown
     profileIcon.setAttribute('aria-expanded', 'false'); // Reset aria state
   }
 });


// --- Navigation & Scrolling ---
// Handles smooth scrolling for internal links AND redirects to signup if not logged in (except for main CTA)
function handleLinkClick(e) {
    const clickedElement = e.currentTarget;
    const targetHref = clickedElement.getAttribute('href');

    // Check if it's an external HTML link (e.g., "emergency.html" or "contact.html")
    // This regular expression checks if the href ends with ".html"
    const isExternalHtmlLink = /\.html(#.*)?$/.test(targetHref);


    // If it's an external HTML link, let the browser handle it normally.
    // We only prevent default for internal anchor links.
    if (isExternalHtmlLink) {
        // You might still want to close the mobile menu if clicked from there
        const navMenu = document.querySelector('.nav-menu');
        if (navMenu && navMenu.classList.contains('active') && clickedElement.closest('.nav-menu')) {
            toggleMenu();
        }
        return; // Exit function, let browser navigate
    }


    // Ensure it's an internal anchor link starting with # (e.g., #container, #hero)
    if (!targetHref || !targetHref.startsWith('#')) return;

    const targetId = targetHref.substring(1);
    const targetElement = document.getElementById(targetId);

    // --- Signup Check ---
    if (!isLoggedIn) { // Check if the user is NOT logged in
        // Check if the clicked link is the ALLOWED button for non-logged-in users
        const isAllowedButton = clickedElement.classList.contains('cta-button') && targetHref === '#container';

        if (!isAllowedButton) {
            // If user is not logged in AND it's NOT the allowed button, redirect to signup
            e.preventDefault(); // Stop the default link behavior (scrolling)
            alert('Please sign up to explore different sections.'); // Optional alert
            window.location.href = 'signup.html'; // Redirect to signup page
            return; // Stop further execution of this function
        }
        // If it IS the allowed button, the code continues below to handle scrolling
    }
    // --- END Signup Check ---


    // If logged in OR if it was the allowed button for non-logged-in user, proceed with smooth scrolling:
    if (targetElement) {
        e.preventDefault(); // Prevent the default browser jump
        const header = document.querySelector('header');
        // Calculate header height dynamically or use CSS variable fallback
        const headerHeight = header ? header.offsetHeight : (parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) || 65);
        const elementPosition = targetElement.getBoundingClientRect().top; // Position relative to viewport
        // Calculate final scroll position, accounting for header height and adding an offset
        const offsetPosition = elementPosition + window.pageYOffset - headerHeight - 20; // 20px extra offset

        // Perform smooth scroll
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });

        // Optional: Immediately update nav link active state (also handled by scroll listener)
        if (clickedElement.closest('nav')) {
            document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));
            clickedElement.classList.add('active');
         }
    }

    // Close mobile menu if a link inside it is clicked
    const navMenu = document.querySelector('.nav-menu');
    if (navMenu && navMenu.classList.contains('active') && clickedElement.closest('.nav-menu')) {
        toggleMenu();
    }
}

// Attach click listener to relevant navigation links and buttons (Ensure this selector covers all intended links)
// This listener now relies on the logic inside handleLinkClick to differentiate behavior
document.querySelectorAll('nav a[href^="#"], nav a[href$=".html"], .cta-button[href^="#"], .explore-button[href^="#"], .explore-button-carousel[href^="#"], .explore-button[href$=".html"], .explore-button-carousel[href$=".html"]').forEach(anchor => {
    anchor.addEventListener('click', handleLinkClick);
});


// Back to Top Button Visibility Control
const backToTopButton = document.querySelector('.back-to-top');
if (backToTopButton) {
     const scrollHandler = () => {
         // Show button if scrolled down more than 500px
         backToTopButton.classList.toggle('visible', window.pageYOffset > 500);
     };
     // Use passive listener for better scroll performance
     window.addEventListener('scroll', scrollHandler, { passive: true });
     scrollHandler(); // Initial check on page load
}
// Function to scroll smoothly to the top of the page
function scrollToTop() { window.scrollTo({ top: 0, behavior: 'smooth' }); }

// Scroll to Review Form via Floating Action Button (FAB)
// KEEP THE LOGIN CHECK HERE - only logged in users should be prompted to submit
function scrollToReview() {
    const reviewSection = document.querySelector('.review-form'); // Target the form element
    if(reviewSection) {
        // Add login check before scrolling to review form
        if (!isLoggedIn) {
             alert('Please log in to leave feedback.');
             window.location.href = 'login.html'; // Redirect to login
             return; // STOP if not logged in
         }

        // If logged in, proceed to scroll
        const header = document.querySelector('header');
         const headerHeight = header ? header.offsetHeight : (parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) || 65);
        const elementPosition = reviewSection.getBoundingClientRect().top;
        // Calculate scroll position with offset for header
        const offsetPosition = elementPosition + window.pageYOffset - headerHeight - 30; // 30px extra offset
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        // Optionally focus the first input in the review form after scrolling
         setTimeout(() => {
            const firstInput = reviewSection.querySelector('input[type="email"], textarea'); // Target specific inputs
            firstInput?.focus();
         }, 600); // Delay focus to allow scroll animation to finish
    }
}


// --- Carousel Logic ---
let currentSlide = 0; // Index of the currently visible slide
const carouselInner = document.querySelector('.carousel-inner');
const slides = carouselInner ? carouselInner.querySelectorAll('.carousel-item') : []; // Get all slide elements
const dotsContainer = document.querySelector('.carousel-dots');
const dots = dotsContainer ? dotsContainer.querySelectorAll('.carousel-dot') : []; // Get all dot elements
let carouselInterval; // Variable to hold the interval timer
const intervalTime = 7000; // Time between automatic slide transitions (7 seconds)

// Function to update the carousel display (transform slides and update dots)
function updateCarouselUI() {
    if (!carouselInner || slides.length === 0 || !dotsContainer || dots.length === 0) return; // Exit if elements not found
    // Move the slide container horizontally based on the current slide index
    carouselInner.style.transform = `translateX(-${currentSlide * 100}%)`;
    // Update the active state of the navigation dots
    dots.forEach((dot, i) => {
        const isActive = (i === currentSlide);
        dot.classList.toggle('active', isActive); // Add/remove 'active' class
        dot.setAttribute('aria-selected', isActive); // Update accessibility state
        dot.setAttribute('tabindex', isActive ? '0' : '-1'); // Make only active dot focusable
    });
}
// Function to move the carousel to the next or previous slide
function moveCarousel(direction) {
    if (slides.length === 0) return; // Exit if no slides
    // Calculate the new slide index, wrapping around if necessary
    currentSlide = (currentSlide + direction + slides.length) % slides.length;
    updateCarouselUI(); // Update the display
    resetCarouselInterval(); // Reset the auto-play timer
}
// Function to jump directly to a specific slide index
function goToSlide(index) {
    if (slides.length === 0 || index < 0 || index >= slides.length) return; // Validate index
    currentSlide = index; // Set the current slide index
    updateCarouselUI(); // Update the display
    resetCarouselInterval(); // Reset the auto-play timer
}
// Function to start the automatic slide transition interval
function startCarouselInterval() {
    if (slides.length > 1) { // Only start if there's more than one slide
       stopCarouselInterval(); // Clear any existing interval first
       carouselInterval = setInterval(() => moveCarousel(1), intervalTime); // Set new interval
    }
}
// Function to stop the automatic slide transition interval
function stopCarouselInterval() { clearInterval(carouselInterval); }
// Function to reset the interval (stop and restart)
function resetCarouselInterval() { stopCarouselInterval(); startCarouselInterval(); }

// Initialize Carousel on page load
if (slides.length > 0 && dots.length === slides.length) { // Check if slides and dots exist and match
    updateCarouselUI(); // Set the initial state
    startCarouselInterval(); // Start auto-play
    const carousel = document.querySelector('.carousel');
    if (carousel) {
        // Pause auto-play when user hovers over or focuses within the carousel
        carousel.addEventListener('mouseenter', stopCarouselInterval);
        carousel.addEventListener('mouseleave', startCarouselInterval);
        carousel.addEventListener('focusin', stopCarouselInterval);
        carousel.addEventListener('focusout', startCarouselInterval);
    }
} else if (slides.length > 0) {
    console.warn("Carousel slides found, but dots mismatch or missing. Ensure dots HTML matches slide count.");
}


// --- Review Form Logic ---
const starContainer = document.querySelector('.star-rating');
const reviewStars = starContainer ? starContainer.querySelectorAll('i.fa-star') : []; // Select only star icons

// Add event listeners to stars if they exist
if (starContainer && reviewStars.length > 0) {
    reviewStars.forEach(star => {
         // Handle click events on stars
         star.addEventListener('click', () => handleStarRating(star));
         // Handle keyboard events (Enter/Space) for accessibility
         star.addEventListener('keydown', (e) => {
             if (e.key === 'Enter' || e.key === ' ') {
                 e.preventDefault(); // Prevent default space bar scroll
                 handleStarRating(star);
             }
         });
         // Provide visual feedback on hover
         star.addEventListener('mouseover', () => updateStarsUI(parseInt(star.getAttribute('data-value')), true));
         // Restore selected rating when mouse leaves the star area
         starContainer.addEventListener('mouseleave', () => updateStarsUI(rating)); // Use mouseleave on container
    });
}

// Function called when a star is clicked or selected via keyboard
function handleStarRating(starElement) {
     rating = parseInt(starElement.getAttribute('data-value')); // Update the global rating state
     updateStarsUI(rating); // Update the visual appearance of stars
     // Update aria-checked attribute for accessibility readers
     reviewStars.forEach(s => s.setAttribute('aria-checked', s.getAttribute('data-value') <= rating));
     // Optionally keep focus on the selected star
     // starElement.focus();
}

// Function to update the visual state (filled/empty) of the stars
function updateStarsUI(value, isHovering = false) {
     reviewStars.forEach(s => {
         const starValue = parseInt(s.getAttribute('data-value'));
         // Determine if the star should be 'active' (filled)
         const isActive = starValue <= value;
         s.classList.toggle('active', isActive);
         // Optionally add a temporary class for hover effect (can be styled in CSS)
         // s.classList.toggle('hovering', isHovering && isActive);
     });
}

// Function to preview the selected image file
function previewImage(event) {
     const imagePreview = document.getElementById('image-preview'); // Get the img element for preview
     const fileInput = event.target; // The input[type=file] element
     const file = fileInput?.files[0]; // Get the selected file
     const fileButton = document.querySelector('.custom-file-button'); // Get the custom file button

     // Reset button text initially
     const defaultButtonText = '<i class="fas fa-paperclip"></i> Attach Image';
     if (fileButton) fileButton.innerHTML = defaultButtonText;

     if (file && imagePreview) { // Check if a file is selected and preview element exists
         const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
         const maxSizeMB = 5; // 5MB size limit

         // Validate file type
         if (!validImageTypes.includes(file.type)) {
             alert(`Invalid file type. Please select a JPG, PNG, or GIF image.`);
             fileInput.value = ''; // Clear the invalid file from input
             imagePreview.style.display = 'none'; imagePreview.src = ''; // Hide preview
             return;
         }
         // Validate file size
         if (file.size > maxSizeMB * 1024 * 1024) {
             alert(`Image size exceeds ${maxSizeMB}MB limit.`);
             fileInput.value = ''; // Clear the large file from input
             imagePreview.style.display = 'none'; imagePreview.src = ''; // Hide preview
             return;
         }

         // Read the file and display preview
         const reader = new FileReader();
         reader.onload = function(e) {
             imagePreview.src = e.target.result; // Set the src for the img preview
             imagePreview.style.display = 'block'; // Show the preview element
             if (fileButton) fileButton.innerHTML = '<i class="fas fa-check"></i> Image Attached'; // Update button text
         };
         reader.readAsDataURL(file); // Read file as Data URL
     } else if (imagePreview) {
         // Clear preview if no file is selected or selection is cancelled
         imagePreview.src = '';
         imagePreview.style.display = 'none';
     }
}

// Function to handle the submission of the review form
// KEEP THE LOGIN CHECK HERE
function submitReview() {
    // ... (get form elements)
    const form = document.querySelector('.review-form');
    const emailInput = document.getElementById('review-email');
    const reviewInput = document.getElementById('review-text');
    const imageInput = document.getElementById('review-image');
    const progressBar = form ? form.querySelector('.progress-bar') : null;
    const submitButton = form ? form.querySelector('button[type="submit"]') : null;
    const fileButton = form ? form.querySelector('.custom-file-button') : null;

    // Get form values
    const email = emailInput?.value.trim() ?? '';
    const review = reviewInput?.value.trim() ?? '';
    const image = imageInput?.files[0] ?? null; // Get the file object

    // --- Validation ---
    // ADDED: Check login status before allowing review submission
    if (!isLoggedIn) {
        alert('Please log in before submitting feedback.');
        window.location.href = 'login.html'; // Redirect to login
        return; // STOP if not logged in
    }
    // ... (rest of validation: email format, review text, rating)
    if (!email || !/\S+@\S+\.\S+/.test(email)) { alert('Please enter a valid email address.'); emailInput?.focus(); return; }
    if (!review) { alert('Please enter your feedback.'); reviewInput?.focus(); return; }
    if (rating === 0) { alert('Please provide a star rating.'); reviewStars[0]?.focus(); return; }
    // Image size validation (redundant check, already done in preview)
    if (image && image.size > 5 * 1024 * 1024) {
         alert(`Image size exceeds 5MB limit.`);
         return;
    }
    // --- End Validation ---

    console.log('Submitting Review:', { email, review, rating, imageName: image?.name ?? 'none', loggedIn: isLoggedIn });

    // Disable form elements during submission to prevent multiple submissions
    if(submitButton) { submitButton.disabled = true; submitButton.textContent = 'Submitting...'; }
    if(progressBar) { progressBar.classList.add('active'); progressBar.setAttribute('aria-valuenow', '50'); } // Show progress

    // --- Replace with actual API call using fetch or XMLHttpRequest ---
    // Example using FormData for potential image upload:
    // const formData = new FormData();
    // formData.append('email', email);
    // formData.append('review', review);
    // formData.append('rating', rating);
    // if (image) formData.append('image', image, image.name); // Append image file if exists
    //
    // fetch('/api/submit-review', { method: 'POST', body: formData }) // Replace with your API endpoint
    //     .then(response => {
    //         if (!response.ok) throw new Error('Network response was not ok');
    //         return response.json();
    //     })
    //     .then(data => {
    //         console.log('Success:', data);
    //         alert(`Thank you for your ${rating}-star feedback!`);
    //         // Reset form on success
    //         if(form) form.reset();
    //         rating = 0; updateStarsUI(0);
    //         const imagePreview = document.getElementById('image-preview');
    //         if(imagePreview) { imagePreview.style.display = 'none'; imagePreview.src = ''; }
    //         if (fileButton) fileButton.innerHTML = '<i class="fas fa-paperclip"></i> Attach Image';
    //         // --- ADDED: Refresh the displayed reviews after submitting a new one ---
    //         displayPreviousReviews(); // Reload the reviews list
    //     })
    //     .catch(error => {
    //         console.error('Error:', error);
    //         alert('There was an error submitting your feedback. Please try again.');
    //     })
    //     .finally(() => {
    //         // Re-enable form elements regardless of success/failure
    //         if(progressBar) { progressBar.classList.remove('active'); progressBar.setAttribute('aria-valuenow', '0'); }
    //         if(submitButton) { submitButton.disabled = false; submitButton.textContent = 'Submit Feedback'; }
    //     });

    // Simulate API call delay for demonstration
    setTimeout(() => {
         alert(`Thank you for your ${rating}-star feedback! We appreciate you helping us improve.`);
         if(progressBar) progressBar.setAttribute('aria-valuenow', '100'); // Indicate completion

         // Reset form after successful simulated submission
         if(form) form.reset(); // Resets text, email, file inputs
         rating = 0; // Reset JS rating variable
         updateStarsUI(0); // Reset visual stars
         const imagePreview = document.getElementById('image-preview');
         if(imagePreview) { imagePreview.style.display = 'none'; imagePreview.src = ''; } // Hide preview
         if (fileButton) fileButton.innerHTML = '<i class="fas fa-paperclip"></i> Attach Image'; // Reset file button text

        // Re-enable button and hide progress bar after a short delay
         setTimeout(() => {
            if(progressBar) { progressBar.classList.remove('active'); progressBar.setAttribute('aria-valuenow', '0'); }
            if(submitButton) { submitButton.disabled = false; submitButton.textContent = 'Submit Feedback'; }
         }, 500);

        // --- ADDED: Refresh the displayed reviews after submitting a new one ---
        displayPreviousReviews(); // Reload the reviews list
        //---------------------------------------------------------------------

     }, 2000); // Simulate 2 second submission time
}

// Newsletter Subscription Logic
function subscribeNewsletter() {
    const form = document.querySelector('.newsletter-form');
    const emailInput = document.getElementById('newsletter-email');
    const subscribeButton = form ? form.querySelector('button[type="submit"]') : null;
    const email = emailInput?.value.trim() ?? '';

    // Basic email validation
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
        alert('Please enter a valid email address to subscribe.');
        emailInput?.focus();
        return;
    }

    console.log('Subscribing newsletter for:', email);
    if(subscribeButton) { subscribeButton.disabled = true; subscribeButton.textContent = 'Subscribing...'; } // Disable button

    // --- Replace with actual API call to your backend mailing list service ---
    // Example: fetch('/api/subscribe', { method: 'POST', body: JSON.stringify({ email }), headers: {'Content-Type': 'application/json'} })
    //     .then(...) // Handle success
    //     .catch(...) // Handle error
    //     .finally(() => { /* Re-enable button */ });

    // Simulate API call delay
    setTimeout(() => {
        alert('Thank you for subscribing! Stay tuned for updates from Rajshahi.');
        if(emailInput) emailInput.value = ''; // Clear input on success
        if(subscribeButton) { subscribeButton.disabled = false; subscribeButton.textContent = 'Subscribe'; } // Re-enable button
    }, 1500);
}

// --- NEW FUNCTION TO DISPLAY REVIEWS ---
function displayPreviousReviews() {
    const reviewsListContainer = document.getElementById('reviews-list');
    const loadingMessage = document.getElementById('reviews-loading');

    if (!reviewsListContainer) return; // Exit if container not found

    // --- Replace this with an actual API call to fetch reviews ---
    // Example Dummy Data (In a real app, this comes from your server/database)
    const fetchedReviews = [
        { id: 1, username: 'Visitor A', rating: 5, text: 'Great site! Very helpful for finding emergency contacts.', date: '2025-04-28', image: null },
        { id: 2, username: 'Tourist B', rating: 4, text: 'Loved the information about tourist spots. The map links would be a great addition!', date: '2025-04-30', image: null },
        { id: 3, username: 'Local Resident', rating: 4, text: 'Good overview of government offices. Maybe add specific opening hours?', date: '2025-05-01', image: 'https://via.placeholder.com/100x50.png?text=SampleImg' },
        { id: 4, username: 'Student_Raj', rating: 5, text: 'Very useful for transport info. Thanks!', date: '2025-05-02', image: null }
    ];
    // --- End Example Dummy Data ---

    // Clear previous content and hide loading message
    reviewsListContainer.innerHTML = '';
    if (loadingMessage) loadingMessage.style.display = 'none';

    if (fetchedReviews.length === 0) {
        reviewsListContainer.innerHTML = '<p class="no-reviews-message">No feedback submitted yet. Be the first!</p>';
        return;
    }

    // Loop through fetched reviews and create HTML elements
    fetchedReviews.forEach(review => {
        const reviewCard = document.createElement('div');
        reviewCard.className = 'review-card'; // Add class for styling

        // Star Rating Display
        let starsHTML = '<div class="review-card-rating">';
        for (let i = 1; i <= 5; i++) {
            starsHTML += `<i class="fas fa-star ${i <= review.rating ? 'active' : ''}"></i>`;
        }
        starsHTML += '</div>';

        // Review Content
        reviewCard.innerHTML = `
            ${starsHTML}
            <p class="review-card-text">${review.text}</p>
            ${review.image ? `<img src="${review.image}" alt="Review Image" class="review-card-image">` : ''}
            <div class="review-card-footer">
                <span class="review-card-author">- ${review.username}</span>
                <span class="review-card-date">${new Date(review.date).toLocaleDateString()}</span>
            </div>
        `;

        reviewsListContainer.appendChild(reviewCard);
    });
}
// --- END NEW FUNCTION ---

function checkPasswordStrength() {
    const password = document.getElementById('signup-password').value;
    const strengthIndicator = document.getElementById('password-strength');

    let strength = 0;
    if (password.length > 5) strength++;
    if (password.length > 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;

    strengthIndicator.className = 'password-strength'; // Reset classes

    if (strength < 3) {
        strengthIndicator.textContent = 'Weak';
        strengthIndicator.classList.add('weak');
    } else if (strength < 5) {
        strengthIndicator.textContent = 'Medium';
        strengthIndicator.classList.add('medium');
    } else {
        strengthIndicator.textContent = 'Strong';
        strengthIndicator.classList.add('strong');
    }

    if (password.length === 0) {
        strengthIndicator.textContent = '';
        strengthIndicator.className = 'password-strength';
    }
}

// Optional: Function to toggle password visibility
// function togglePasswordVisibility(id) {
//     const input = document.getElementById(id);
//     const icon = input.nextElementSibling.nextElementSibling; // Adjust if structure changes
//     if (input.type === 'password') {
//         input.type = 'text';
//         icon.classList.remove('fa-eye');
//         icon.classList.add('fa-eye-slash');
//     } else {
//         input.type = 'password';
//         icon.classList.remove('fa-eye-slash');
//         icon.classList.add('fa-eye');
//     }
// }


// --- Enhancements & Initializations ---
// Runs after the HTML document has been fully loaded and parsed
document.addEventListener('DOMContentLoaded', () => {

    // Check persisted login state on page load (using localStorage example)
    if (typeof(Storage) !== "undefined") {
        const storedLoggedIn = localStorage.getItem("isLoggedIn");
        const storedUsername = localStorage.getItem("username");
        if (storedLoggedIn === "true" && storedUsername) {
            updateLoginState(true, storedUsername);
        } else {
            updateLoginState(false); // Ensure UI reflects logged-out state if nothing stored
        }
    } else {
        // Fallback if localStorage not supported - defaults to logged out
        updateLoginState(isLoggedIn);
    }


    // Typing Animation for Hero Heading
    const headingElement = document.getElementById('hero-heading-text');
    const cursorElement = document.querySelector('.hero h1 .typing-cursor');
    const ctaButton = document.querySelector('.hero .cta-button');
    const heroParagraph = document.querySelector('.hero p');

    if (headingElement && cursorElement) { // Check if elements exist
         const textToType = "Welcome to OUR RAJSHAHI";
         let charIndex = 0;
         const typingSpeed = 120; // Milliseconds per character

         function typeCharacter() {
             if (charIndex < textToType.length) {
                 headingElement.textContent += textToType.charAt(charIndex); // Add next character
                 charIndex++;
                 setTimeout(typeCharacter, typingSpeed); // Schedule next character
             } else {
                 // Typing finished
                 setTimeout(() => {
                     if (cursorElement) cursorElement.classList.add('hidden'); // Hide the blinking cursor
                     // Fade in the paragraph and button after typing is done
                     if(heroParagraph) {
                        heroParagraph.style.opacity = '1';
                        heroParagraph.style.animationPlayState = 'running'; // Start its fade-in animation
                     }
                      if(ctaButton) {
                        ctaButton.style.opacity = '1';
                        ctaButton.style.display = 'inline-block'; // Make button visible and take space
                     }
                 }, 400); // Delay before hiding cursor and showing elements
             }
         }
         // Start the typing animation after a short delay on page load
         setTimeout(typeCharacter, 800);
    } else {
        console.warn("Hero typing animation elements not found.");
        // Fallback: Ensure paragraph and button are visible if typing elements are missing
        if(heroParagraph) heroParagraph.style.opacity = '1';
        if(ctaButton) { ctaButton.style.opacity = '1'; ctaButton.style.display = 'inline-block'; }
    }


    // Intersection Observer for Scroll Animations on Sections
    try {
        const sectionsToObserve = document.querySelectorAll('.section'); // Select all elements with class 'section'
        if ("IntersectionObserver" in window && sectionsToObserve.length > 0) {
            const observerOptions = {
                root: null, // Observe intersections relative to the viewport
                rootMargin: '0px 0px -10% 0px', // Trigger when element is 10% from bottom edge of viewport
                threshold: 0.1 // Trigger when at least 10% of the element is visible
            };
            // Callback function when intersection occurs
            const observerCallback = (entries, observer) => {
                 entries.forEach(entry => {
                     if (entry.isIntersecting) { // If the element is intersecting the viewport
                         entry.target.style.animationPlayState = 'running'; // Start the CSS animation
                         // Optionally unobserve after first animation to prevent re-triggering:
                         // observer.unobserve(entry.target);
                     }
                     // Optional: Reset animation if element scrolls completely out of view (for re-animation)
                     // else {
                     //    entry.target.style.animationPlayState = 'paused';
                     //    entry.target.style.opacity = 0; // Reset opacity if needed for fade-in
                     //}
                 });
             };
            // Create and start the observer
            const intersectionObserver = new IntersectionObserver(observerCallback, observerOptions);
            sectionsToObserve.forEach(section => {
                // Initial state is set by CSS (opacity: 0, animation-play-state: paused)
                intersectionObserver.observe(section); // Start observing each section
            });
        } else {
            // Fallback for browsers that don't support IntersectionObserver
            sectionsToObserve.forEach(section => {
                section.style.opacity = 1; // Make sections visible immediately
                section.style.animation = 'none'; // Disable CSS animation
            });
            console.warn("IntersectionObserver not supported, scroll animations disabled.");
        }
    } catch (error) {
        console.error("Error setting up Intersection Observer:", error);
         // Fallback if observer setup fails
         document.querySelectorAll('.section').forEach(section => section.style.opacity = 1);
    }

    // Active Nav Link Highlighting on Scroll
     const sectionsForNavHighlight = Array.from(document.querySelectorAll('.container > section[id], .hero[id], footer')); // Include Hero and Footer if they have IDs/nav links
     const navLinks = document.querySelectorAll('nav a[href^="#"]'); // Select only internal nav links
     const header = document.querySelector('header');

     if (navLinks.length > 0 && sectionsForNavHighlight.length > 0) {
         const highlightNavLink = () => {
             let currentSectionId = '';
             const headerHeight = header ? header.offsetHeight : (parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) || 65);
             // Offset to highlight slightly before the section top hits the header bottom
             const scrollThreshold = window.pageYOffset + headerHeight + 50; // Adjust offset as needed

             // Find the ID of the current section in view
             sectionsForNavHighlight.forEach(section => {
                 if (scrollThreshold >= section.offsetTop) { // Check if scroll position is past the top of the section
                     currentSectionId = section.getAttribute('id');
                 }
             });

             // Update active class on navigation links
             let foundActive = false;
             navLinks.forEach(link => {
                 link.classList.remove('active'); // Remove active class from all links first
                 if (link.getAttribute('href') === `#${currentSectionId}`) {
                     link.classList.add('active'); // Add active class to the matching link
                     foundActive = true;
                 }
             });

             // If scrolled to the very top, make 'Home' active if it's pointing to #hero
             if (window.pageYOffset < 100) {
                 const homeLink = document.querySelector('nav a[href="#hero"]');
                 if (homeLink) {
                     navLinks.forEach(link => link.classList.remove('active')); // Clear all first
                     homeLink.classList.add('active');
                 }
             }
         };

         // Debounce scroll handler for performance: only run highlight check after scrolling stops for a short time
         let scrollTimeout;
         window.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout); // Clear previous timeout
            scrollTimeout = setTimeout(highlightNavLink, 50); // Set new timeout (50ms debounce)
         }, { passive: true }); // Use passive listener for better scroll performance

         highlightNavLink(); // Run initial check on page load
     }

    // --- ADDED: Call the function to display reviews ---
    displayPreviousReviews();
    // -----------------------------------------------

    // --- NEW: Search Bar Functionality ---
    const searchInput = document.getElementById('header-search-input');
    const searchButton = document.querySelector('.search-bar button');

    function performSearch() {
        const query = searchInput.value.trim().toLowerCase(); // Convert query to lowercase for case-insensitive search
        if (!query) { // Check if query is empty
            alert('Please enter a search term.'); // Alert user if empty
            return;
        }

        // Hide the carousel when search is performed
        const carousel = document.querySelector('.carousel');
        if (carousel) {
            carousel.style.display = 'none';
        }

        const sections = document.querySelectorAll('.container .section'); // Get all sections
        let foundResults = false; // Flag to track if any results are found
        const mainContainer = document.getElementById('container'); // Get the main container
        let noResultsMessage = document.getElementById('no-search-results'); // Get existing no results message

        sections.forEach(section => { // Iterate through each section
            const sectionTitle = section.querySelector('h2')?.textContent.toLowerCase() || ''; // Get title text
            const sectionParagraph = section.querySelector('p')?.textContent.toLowerCase() || ''; // Get paragraph text

            if (sectionTitle.includes(query) || sectionParagraph.includes(query)) { // Check if query exists in title or paragraph
                section.style.display = 'flex'; // Show section if match
                foundResults = true; // Set flag to true
            } else {
                section.style.display = 'none'; // Hide section if no match
            }
        });

        if (!foundResults) { // If no results were found
            if (!noResultsMessage) { // Create message if it doesn't exist
                noResultsMessage = document.createElement('p'); // Create paragraph element
                noResultsMessage.id = 'no-search-results'; // Assign ID
                noResultsMessage.textContent = `No results found for "${query}".`; // Set message text
                noResultsMessage.style.textAlign = 'center'; // Center text
                noResultsMessage.style.fontSize = '1.2rem'; // Set font size
                noResultsMessage.style.color = 'var(--medium-text)'; // Set color
                // Insert message after the main container's heading or at the top of results area
                if (mainContainer) {
                    const firstSection = mainContainer.querySelector('.section');
                    if (firstSection) {
                        mainContainer.insertBefore(noResultsMessage, firstSection);
                    } else {
                        mainContainer.appendChild(noResultsMessage);
                    }
                }
            } else { // Update existing message
                noResultsMessage.textContent = `No results found for "${query}".`; // Update text
                noResultsMessage.style.display = 'block'; // Ensure visibility
            }
        } else { // If results were found
            if (noResultsMessage) { // Hide existing message if present
                noResultsMessage.style.display = 'none'; // Hide message
            }
        }
        searchInput.value = ''; // Clear input after search
    }

    // Event listener for search button click
    if (searchButton) {
        searchButton.addEventListener('click', performSearch);
    }

    // Event listener for 'Enter' key press in search input
    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
    // --- END NEW: Search Bar Functionality ---

}); // End DOMContentLoaded