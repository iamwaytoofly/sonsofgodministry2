document.addEventListener('DOMContentLoaded', () => {
    const banner = document.getElementById('live-banner');

    function checkLiveStatus() {
        const now = new Date();
        const dayOfWeek = now.getDay(); // Sunday is 0, Monday is 1, ..., Saturday is 6
        const hour = now.getHours();
        const minute = now.getMinutes();

        // Convert current time to a single value in minutes for easy comparison
        const currentTimeInMinutes = hour * 60 + minute;

        // Times are in EST. Note: JavaScript's getHours() is based on the user's local time zone,
        // so this code assumes the user is in the EST time zone. For a more robust solution,
        // you would need a library to handle time zones.
        const sundayStart = 10 * 60; // 10:00 AM
        const sundayEnd = 17 * 60;   // 5:00 PM
        const mondayStart = 1 * 60; // 10:00 AM
        const mondayEnd = 24 * 60;   // 5:00 PM
        const tuesdayStart = 19 * 60; // 7:00 PM
        const tuesdayEnd = 22 * 60 + 30; // 10:30 PM
        const fridayStart = 19 * 60; // 7:00 PM
        const fridayEnd = 22 * 60 + 30; // 10:30 PM

        let isLive = false;

        if (dayOfWeek === 0) { // Sunday
            if (currentTimeInMinutes >= sundayStart && currentTimeInMinutes <= sundayEnd) {
                isLive = true;
            }
        if (dayOfWeek === 1) { // Sunday
            if (currentTimeInMinutes >= mondayStart && currentTimeInMinutes <= mondayEnd) {
                isLive = true;
            }
        } else if (dayOfWeek === 2) { // Tuesday
            if (currentTimeInMinutes >= tuesdayStart && currentTimeInMinutes <= tuesdayEnd) {
                isLive = true;
            }
        } else if (dayOfWeek === 5) { // Friday
            if (currentTimeInMinutes >= fridayStart && currentTimeInMinutes <= fridayEnd) {
                isLive = true;
            }
        }

        if (isLive) {
            banner.classList.remove('hidden');
        } else {
            banner.classList.add('hidden');
        }
    }

    // Check status immediately on page load
    checkLiveStatus();

    // Re-check status every minute to account for time changes without a page refresh
    setInterval(checkLiveStatus, 60000); // 60000 milliseconds = 1 minute
});
