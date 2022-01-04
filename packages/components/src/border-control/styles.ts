/**
 * External dependencies
 */
import { css } from '@emotion/react';

/**
 * Internal dependencies
 */
import { COLORS, CONFIG } from '../utils';
import { space } from '../ui/utils/space';
import { StyledLabel } from '../base-control/styles/base-control-styles';

export const BorderControl = css`
	position: relative;
`;

export const InnerWrapper = css`
	border: ${ CONFIG.borderWidth } solid ${ COLORS.gray[ 200 ] };
	border-radius: 2px;
	flex: 1 0 40%;

	/*
	 * Needs more thought. Aim is to prevent the border for BorderBoxControl
	 * showing through the control. Likely needs to take into account
	 * light/dark themes etc.
	 */
	background: #fff;

	/*
	 * Forces the width control to fill available space given UnitControl
	 * passes its className directly through to the input.
	 * TODO: Extend UnitControl to support custom classes on its wrapper.
	 */
	> div:last-child {
		flex: 1;
		margin-left: 0;
	}

	/* If arbitrary width is supplied honor it. */
	&[style*='width'] {
		flex: 0 0 auto;
	}
`;

export const SmallWrapper = css`
	width: 90px;
	flex: 0 0 auto;
`;

export const BorderDropdown = css`
	border-right: ${ CONFIG.borderWidth } solid ${ COLORS.gray[ 200 ] };
	background: #fff;

	/* TODO: Reduce specificity here and try to find composable classnames for indicator */
	&& button {
		padding: ${ space( 1 ) };

		> span {
			border-radius: 9999px;
			border: 2px solid transparent;
			width: 28px;
			height: 28px;
			padding: 2px;

			& > span {
				background: linear-gradient(
					-45deg,
					transparent 48%,
					#ddd 48%,
					#ddd 52%,
					transparent 52%
				);
			}
		}
	}
`;

export const BorderPopover = css`
	/* Remove padding from content, this will be re-added via inner elements*/
	&& > div > div {
		padding: 0;
	}
`;

export const BorderPopoverControls = css`
	padding: ${ space( 4 ) };

	> div:first-of-type > ${ StyledLabel } {
		margin-bottom: 0;
		font-weight: 500;
	}

	&& ${ StyledLabel } + button:not( .has-text ) {
		min-width: 24px;
		padding: 0;
	}
`;

export const BorderPopoverContent = css``;
export const BorderColorIndicator = css``;

export const ResetButton = css`
	justify-content: center;
	width: 100%;

	/* Override button component styling */
	&& {
		border-top: ${ CONFIG.borderWidth } solid ${ COLORS.gray[ 200 ] };
		height: 46px;
	}
`;

export const BorderWidthControl = css`
	/* Target the UnitControl backdrop. Todo: Find cleaner approach. */
	&&& > div > div {
		border: none;
	}

	/* Specificity required to overcome UnitControl padding */
	/* See packages/components/src/unit-control/styles/unit-control-styles.ts */
	&&& input {
		padding-right: 0;
	}
`;

export const BorderStyleControl = css`
	> label {
		display: block;
	}

	> div {
		display: inline-flex;
	}
`;

export const BorderStyleButton = css`
	&&&&& {
		min-width: 30px;
		width: 30px;
		height: 30px;
		padding: 3px;
		margin-right: ${ space( 1 ) };
	}
`;

export const BorderSlider = css`
	flex: 1 1 60%;

	> div {
		margin-bottom: 0;
		display: flex;
		align-items: center;
	}
`;
