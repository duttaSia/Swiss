document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================================================
    // 1. HERO SLIDESHOW ROTATION MACHINE
    // ==========================================================================
    const slides = document.querySelectorAll('.hero-slideshow .slide');
    let currentSlideIndex = 0;
    const slideIntervalTime = 6000; // Transitions media frames every 6 seconds

    function nextSlide() {
        if(slides.length === 0) return;
        
        // Wipe away active rendering class from current slide frame track
        slides[currentSlideIndex].classList.remove('active');
        
        // Step forward incrementally or wrap back around to frame zero
        currentSlideIndex = (currentSlideIndex + 1) % slides.length;
        
        // Append active configuration class to target frame
        slides[currentSlideIndex].classList.add('active');
    }
    
    if(slides.length > 1) {
        setInterval(nextSlide, slideIntervalTime);
    }

    // ==========================================================================
    // 2. MODAL COMPONENTS CACHED IDENTIFIERS
    // ==========================================================================
    const bookingModal = document.getElementById('bookingModal');
    const reservationForm = document.getElementById('reservationForm');
    const selectedRoomInput = document.getElementById('selectedRoom');
    
    // Fields for separate booking interfaces
    const barCheckIn = document.getElementById('barCheckIn');
    const barCheckOut = document.getElementById('barCheckOut');
    const modalCheckIn = document.getElementById('modalCheckIn');
    const modalCheckOut = document.getElementById('modalCheckOut');
    
    const navBookBtn = document.getElementById('navBookBtn');

    // ==========================================================================
    // 3. CALENDAR BOUNDARY ENGINE RULES
    // ==========================================================================
    const today = new Date().toISOString().split('T')[0];
    
    // Apply baseline rules immediately
    if(barCheckIn) barCheckIn.min = today;
    if(barCheckOut) barCheckOut.min = today;
    if(modalCheckIn) modalCheckIn.min = today;
    if(modalCheckOut) modalCheckOut.min = today;

    // Direct listener hooks forcing chronological checkout validations
    if(barCheckIn && barCheckOut) {
        barCheckIn.addEventListener('change', () => {
            barCheckOut.min = barCheckIn.value;
            if (barCheckOut.value && barCheckOut.value < barCheckIn.value) {
                barCheckOut.value = barCheckIn.value;
            }
        });
    }

    if(modalCheckIn && modalCheckOut) {
        modalCheckIn.addEventListener('change', () => {
            modalCheckOut.min = modalCheckIn.value;
            if (modalCheckOut.value && modalCheckOut.value < modalCheckIn.value) {
                modalCheckOut.value = modalCheckIn.value;
            }
        });
    }

    // ==========================================================================
    // 4. INTERACTION MANAGEMENT METHODS
    // ==========================================================================
    window.openBooking = function(roomName) {
        if (!bookingModal || !selectedRoomInput) return;
        selectedRoomInput.value = roomName;
        bookingModal.classList.add('open');
    };

    window.closeBooking = function() {
        if (!bookingModal) return;
        bookingModal.classList.remove('open');
        if(reservationForm) reservationForm.reset();
    };

    // Trigger general reservation modal from Navigation header button
    if(navBookBtn) {
        navBookBtn.addEventListener('click', (event) => {
            event.preventDefault();
            window.openBooking('General Custom Reservation Package');
        });
    }

    // Close on overlay blur clicking background track
    window.addEventListener('click', (event) => {
        if (event.target === bookingModal) {
            window.closeBooking();
        }
    });

    // ==========================================================================
    // 5. INTERCEPT SUBMISSION HANDLERS
    // ==========================================================================
    if(reservationForm) {
        reservationForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const payload = {
                room: selectedRoomInput.value,
                checkIn: modalCheckIn.value,
                checkOut: modalCheckOut.value,
                guests: document.getElementById('modalGuests').value
            };

            console.log('Modal Booking Logged Successfully:', payload);
            alert(`Success! Request Captured.\n\nSuite: ${payload.room}\nDates: ${payload.checkIn} to ${payload.checkOut}\nGuests: ${payload.guests}`);
            window.closeBooking();
        });
    }

    const hotelBookingForm = document.getElementById('hotelBookingForm');
    if(hotelBookingForm) {
        hotelBookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const payload = {
                room: "General Query (Quickbar Input)",
                checkIn: barCheckIn.value,
                checkOut: barCheckOut.value,
                guests: document.getElementById('barGuests').value
            };

            console.log('Quick Bar Availability Logged Successfully:', payload);
            alert(`Checking Availability...\n\nDates Requested: ${payload.checkIn} to ${payload.checkOut}\nParty Size: ${payload.guests}`);
        });
    }
});
