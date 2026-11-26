const arrows = {};

arrows.action = (
	<svg
		className="nhsuk-icon nhsuk-icon--arrow-right-circle"
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		width="16"
		height="16"
		focusable="false"
		aria-hidden="true"
	>
		<path d="M12 2a10 10 0 0 0-10 9h11.7l-4-4a1 1 0 0 1 1.5-1.4l5.6 5.7a1 1 0 0 1 0 1.4l-5.6 5.7a1 1 0 0 1-1.5 0 1 1 0 0 1 0-1.4l4-4H2A10 10 0 1 0 12 2z" />
	</svg>
);

// nhsuk-frontend 8.x/9.x arrow, kept for block deprecations.
arrows.actionLegacy = (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		className="nhsuk-icon nhsuk-icon__arrow-right-circle"
		viewBox="0 0 24 24"
	>
		<path d="M12 2a10 10 0 00-9.95 9h11.64L9.74 7.05a1 1 0 011.41-1.41l5.66 5.65a1 1 0 010 1.42l-5.66 5.65a1 1 0 01-1.41 0 1 1 0 010-1.41L13.69 13H2.05A10 10 0 1012 2z"></path>
	</svg>
);

// nhsuk-frontend 8.x/9.x chevron, used as the block icon and in deprecations.
arrows.back = (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		className="nhsuk-icon nhsuk-icon__chevron-left"
		viewBox="0 0 24 24"
	>
		<path d="M8.5 12c0-.3.1-.5.3-.7l5-5c.4-.4 1-.4 1.4 0s.4 1 0 1.4L10.9 12l4.3 4.3c.4.4.4 1 0 1.4s-1 .4-1.4 0l-5-5c-.2-.2-.3-.4-.3-.7z"></path>
	</svg>
);

export default arrows;
