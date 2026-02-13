/**
 * Safely track an event with Umami Analytics.
 * Checks if the umami global is defined before calling track.
 */
export function trackEvent(
  eventName: string,
  eventData?: Record<string, string | number | boolean>,
) {
  if (typeof window !== "undefined" && window.umami) {
    window.umami.track(eventName, eventData);
  }
}
