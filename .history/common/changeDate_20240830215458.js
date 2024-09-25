const changeDate = async (rawDate) => {




const date = new Date(rawDate);

// Array of day names
const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// Array of month names
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// Get components
const dayName = daysOfWeek[date.getUTCDay()];
const monthName = months[date.getUTCMonth()];
const day = date.getUTCDate();
const hours = date.getUTCHours();
const minutes = date.getUTCMinutes();
const ampm = hours >= 12 ? 'pm' : 'am';

// Format hours in 12-hour format
const formattedHours = hours % 12 || 12;
const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

// Combine into the final format
const formattedDate = `${dayName}\n${monthName} ${day}\n${formattedHours}:${formattedMinutes}${ampm}`;

return formattedDate

}

export default changeDate
