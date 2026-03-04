/**
 * A no-operation function that performs no action and returns undefined.
 *
 * Useful as a placeholder or default callback in scenarios where a function
 * is required but no actual operation needs to be performed.
 *
 * @returns {undefined} Always returns undefined.
 *
 * @example
 * // Use as a default callback
 * const callback = noop;
 * callback(); // Returns undefined
 */
export function noop() {
    return undefined;
}
