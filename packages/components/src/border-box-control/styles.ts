/**
 * External dependencies
 */
import { css } from '@emotion/react';

/**
 * Internal dependencies
 */
import { COLORS, CONFIG } from '../utils';
import { space } from '../ui/utils/space';

export const BorderBoxControl = css`
	/* TODO: Remove this if not styling is required. */
`;

export const LinkedBorderControl = css`
	flex: 1;
`;

export const LinkedButton = css`
	flex: 0;
	flex-basis: 36px;
	margin-top: 7px;
`;

export const BorderVisualizer = css`
	border: ${ CONFIG.borderWidth } solid ${ COLORS.gray[ 200 ] };
	position: absolute;
	top: 20px;
	right: 30px;
	bottom: 20px;
	left: 30px;
`;

export const SplitBorderControl = css`
	display: grid;
	position: relative;
	gap: ${ space( 4 ) };
	flex: 1;
`;

export const CenteredBorderControl = css`
	grid-column: span 2;
	margin: 0 auto;
`;
