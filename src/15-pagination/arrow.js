const arrow = {};

arrow.left = (
	<svg
		className="nhsuk-icon nhsuk-icon--arrow-left"
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		width="16"
		height="16"
		focusable="false"
		aria-hidden="true"
	>
		<path d="M10.7 6.3c.4.4.4 1 0 1.4L7.4 11H19a1 1 0 0 1 0 2H7.4l3.3 3.3c.4.4.4 1 0 1.4a1 1 0 0 1-1.4 0l-5-5A1 1 0 0 1 4 12c0-.3.1-.5.3-.7l5-5a1 1 0 0 1 1.4 0Z" />
	</svg>
);

arrow.right = (
	<svg
		className="nhsuk-icon nhsuk-icon--arrow-right"
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		width="16"
		height="16"
		focusable="false"
		aria-hidden="true"
	>
		<path d="m14.7 6.3 5 5c.2.2.3.4.3.7 0 .3-.1.5-.3.7l-5 5a1 1 0 0 1-1.4-1.4l3.3-3.3H5a1 1 0 0 1 0-2h11.6l-3.3-3.3a1 1 0 1 1 1.4-1.4Z" />
	</svg>
);

// nhsuk-frontend 8.x/9.x icons, kept for block deprecations.
arrow.leftLegacy = (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		aria-hidden="true"
		className="nhsuk-icon nhsuk-icon__arrow-left"
		viewBox="0 0 24 24"
	>
		<path d="M4.1 12.3l2.7 3c.2.2.5.2.7 0 .1-.1.1-.2.1-.3v-2h11c.6 0 1-.4 1-1s-.4-1-1-1h-11V9c0-.2-.1-.4-.3-.5h-.2c-.1 0-.3.1-.4.2l-2.7 3c0 .2 0 .4.1.6z"></path>
	</svg>
);

arrow.rightLegacy = (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		aria-hidden="true"
		className="nhsuk-icon nhsuk-icon__arrow-right"
		viewBox="0 0 24 24"
	>
		<path d="M19.6 11.66l-2.73-3A.51.51 0 0016 9v2H5a1 1 0 000 2h11v2a.5.5 0 00.32.46.39.39 0 00.18 0 .52.52 0 00.37-.16l2.73-3a.5.5 0 000-.64z"></path>
	</svg>
);

export default arrow;
