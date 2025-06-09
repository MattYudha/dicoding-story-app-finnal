Dicoding Story App
A Single-Page Application (SPA) for sharing stories, built for the Dicoding Web Development course.
Features

Story Sharing: Users can post stories with descriptions, photos, and locations.
Digital Map: Displays story locations using Leaflet.js.
Camera Access: Captures photos via the device'sAccessibility: Implements WCAG standards with skip-to-content, alt text, and semantic HTML.
Smooth Transitions: Uses View Transition API for page transitions.
Push Notifications: Supports Web Push notifications.
SPA Architecture: Uses hash-based routing and MVP pattern.

Setup

Clone the repository.
Serve the project using a local server (e.g., npx http-server).
Open in a browser.

Technologies

HTML5, CSS3, JavaScript (ES6+)
Leaflet.js for maps
Web Push API for notifications
View Transition API for transitions

API
Uses the Dicoding Story API: https://story-api.dicoding.dev/v1
Accessibility

Skip-to-content link
Alt text for images
Semantic HTML with landmarks
Associated labels for form inputs
High-contrast colors

Submission Criteria

Uses Dicoding Story API as the data source.
Implements SPA with hash-based routing and MVP pattern.
Displays story list with images, text, and maps.
Supports adding new stories with camera and map integration.
Implements accessibility standards.
Uses smooth page transitions.

Notes

No external API key is required (uses OpenStreetMap).
Ensure a service worker (sw.js) is in the root directory for push notifications.
