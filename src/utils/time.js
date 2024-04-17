
export function convertMinutesToHours (minutes) {
    if(!minutes) {
        return "0m";
    }

    if (minutes < 60) {
        return `${minutes}m`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
}