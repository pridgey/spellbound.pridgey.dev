/**
 * Utility function to generate a random number within range
 * @param min the minimum number
 * @param max the maximum number
 * @returns a random number within the range
 */
export function getRandomNumber(min: number, max: number): number {
    return Math.random() * (max - min + 1) + min;
}