document.addEventListener('DOMContentLoaded', () => {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    // Cache DOM elements to avoid repeated lookups inside updateClock
    const dayOfWeekEl = document.getElementById('day-of-week');
    const monthEl = document.getElementById('month');
    const dayOfMonthEl = document.getElementById('day-of-month');
    const ampmElement = document.getElementById('ampm');

    // Function to pad a single-digit number with a leading zero
    const formatTime = (time) => String(time).padStart(2, '0');

    // Main function to update the clock display
    const updateClock = () => {
        const now = new Date();
        let hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();

        // Date display
        dayOfWeekEl.textContent = daysOfWeek[now.getDay()];
        monthEl.textContent = months[now.getMonth()];
        dayOfMonthEl.textContent = now.getDate();
        
        // Displaying time in 12-hour format with AM/PM
        const isPm = hours >= 12;
        ampmElement.textContent = isPm ? 'PM' : 'AM';
        
        if (hours > 12) {
            hours -= 12;
        } else if (hours === 0) {
            hours = 12;
        }
        
        // Hours will now be padded with a leading zero
        document.getElementById('hours').textContent = formatTime(hours);
        document.getElementById('minutes').textContent = formatTime(minutes);
        document.getElementById('seconds').textContent = formatTime(seconds);
    };

    // Dark/Light mode toggle logic
    const themeToggleBtn = document.getElementById('theme-toggle');
    const sunIcon = document.getElementById('sun-icon');
    const moonIcon = document.getElementById('moon-icon');
    const clockContainer = document.getElementById('clock');
    const gradientElements = document.querySelectorAll('.time-unit, .divider, #attribution');

    // A more streamlined and efficient theme toggle function
    const toggleTheme = () => {
        // Toggle the main theme classes on the body
        document.body.classList.toggle('dark-mode');
        document.body.classList.toggle('light-mode');

        // Toggle icons
        sunIcon.classList.toggle('hidden');
        moonIcon.classList.toggle('hidden');

        // Toggle all theme-specific classes on their respective elements
        clockContainer.classList.toggle('container-dark');
        clockContainer.classList.toggle('container-light');
        themeToggleBtn.classList.toggle('toggle-button-gradient-dark');
        themeToggleBtn.classList.toggle('toggle-button-gradient-light');
        ampmElement.classList.toggle('ampm-gradient-dark');
        ampmElement.classList.toggle('ampm-gradient-light');
        gradientElements.forEach(el => {
            el.classList.toggle('gradient-text-dark');
            el.classList.toggle('gradient-text-light');
        });
    };
    themeToggleBtn.addEventListener('click', toggleTheme);
    
    // Set initial AM/PM gradient class based on current theme
    if (document.body.classList.contains('dark-mode')) {
        ampmElement.classList.add('ampm-gradient-dark');
    } else {
        ampmElement.classList.add('ampm-gradient-light');
    }

    // Initial call to set the time and day immediately
    updateClock();

    // Call the updateClock function every second
    setInterval(updateClock, 1000);
});
