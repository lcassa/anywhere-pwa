import { html } from '@polymer/polymer/polymer-element.js';

export const AnywhereStyles = html`
<style>
	.button {

	}
	.button__icon {
		background: none;
        border: none;
        fill: var(--app-header-text-color);
	}
	.flex {
	  display: flex;
	}

	.flex--align-center {
	  align-items: center;
	}

	.flex--justify-center {
	  justify-content: center;
	}

	.flex--justify-end {
	  justify-content: flex-end;
	}

	.flex__children--equaly-spaced > * {
	  flex: 1 100%;
	}

	.flex--align-self-end {
	  align-self: flex-end;
	}

	.flex--row {
	  flex-direction: row;
	}

	.flex--column {
	  flex-direction: column;
	}

	.flex--full-width {
	  flex: 1;
	  min-width: 0;
	}

	/* all child elements get ellipsis when shrinked */
	.flex--ellipsis * {
	  text-overflow: ellipsis;
	  overflow: hidden;
	  white-space: nowrap;
	}
</style>`;