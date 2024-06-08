/**
 * Calculates and returns the current time in a specified city based on its timezone offset.
 *
 * @param tzOffsetInSec The timezone offset in seconds for the city whose time we want to calculate.
 * @returns A string representation of the current time in the specified city.
 */
export default function getCityTime(tzOffsetInSec: number): string {
    // Get the current date and time
    const date = new Date();
    // Convert the current time to milliseconds since the Unix Epoch
    const timeInMs = date.getTime();
    // Convert the provided timezone offset from seconds to milliseconds
    const tzOffsetInMs = tzOffsetInSec * 1000;
    // Calculate the timezone offset in milliseconds for the local system
    const localTzOffsetInMs = date.getTimezoneOffset() * 60000;
    // Add the calculated offsets to the current time to get the time in the target city
    const cityDate = new Date(timeInMs + tzOffsetInMs + localTzOffsetInMs);
    // Format and return the time as a localized string
    return cityDate.toLocaleString();
}