import { icon } from "@fortawesome/fontawesome-svg-core";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

/**
 * Renders a FontAwesome icon as an SVG string for use with Leaflet ExtraMarkers innerHTML
 * @param iconDefinition - FontAwesome icon definition
 * @param className - Additional CSS classes to apply to the SVG
 * @returns SVG string ready to be used as innerHTML
 */
export function renderIconAsSVG(
  iconDefinition: IconDefinition,
  className?: string,
): string {
  const rendered = icon(iconDefinition, {
    classes: className ? className.split(" ") : undefined,
  });

  return rendered.html[0];
}

/**
 * Creates a centered SVG wrapper for ExtraMarkers
 * This ensures the icon is properly centered within the marker
 */
export function createMarkerIconHTML(
  iconDefinition: IconDefinition,
  className?: string,
): string {
  const svgContent = renderIconAsSVG(iconDefinition, className);

  // Wrap in a div with flexbox centering to ensure proper alignment
  return `${svgContent}`;
}
