/**
 * Internal dependencies
 */
import type { Border, Color } from '../border-control/types';

export type Borders = {
	top?: Border;
	right?: Border;
	bottom?: Border;
	left?: Border;
};

export type AnyBorder = Border | Borders | undefined;
export type BorderProp = 'color' | 'style' | 'width';
export type BorderSide = 'top' | 'right' | 'bottom' | 'left';

export type BorderBoxControlProps = {
	/**
	 * An array of color definitions. This may also be a multi-dimensional array
	 * where colors are organized by multiple origins.
	 */
	colors?: Color[];
	/**
	 * This toggles the ability to choose custom colors.
	 */
	disableCustomColors?: boolean;
	/**
	 * This controls whether the alpha channel will be offered when selecting
	 * custom colors.
	 */
	enableAlpha?: boolean;
	/**
	 * Provides control over whether the label will only be visible to
	 * screen readers.
	 */
	hideLabelFromVision?: boolean;
	/**
	 * If provided, a label will be generated using this as the content.
	 */
	label?: string;
	/**
	 * A callback function invoked when any border value is changed. The value
	 * received may be a "flat" border object, one that has properties defining
	 * individual side borders, or `undefined`.
	 */
	onChange: ( value: AnyBorder ) => void;
	/**
	 * This controls whether to support border style selections.
	 */
	showStyle?: boolean;
	/**
	 * An object representing the current border configuration.
	 *
	 * This may be a "flat" border where the object has `color`, `style`, and
	 * `width` properties or a "split" border which defines the previous
	 * properties but for each side; `top`, `right`, `bottom`, and `left`.
	 */
	value: AnyBorder;
	/**
	 * This is passed on to the color related sub-components which need to be
	 * made aware of whether the colors prop contains multiple origins.
	 */
	__experimentalHasMultipleOrigins?: boolean;
	/**
	 * This is passed on to the color related sub-components so they may render
	 * more effectively when used within a sidebar.
	 */
	__experimentalIsRenderedInSidebar?: boolean;
};

export type LinkedButtonProps = {
	/**
	 * This prop allows the `LinkedButton` to reflect whether the parent
	 * `BorderBoxControl` is currently displaying "linked" or "unlinked"
	 * border controls.
	 */
	isLinked: boolean;
	/**
	 * A callback invoked when this `LinkedButton` is clicked. It is used to
	 * toggle display between linked or split border controls within the parent
	 * `BorderBoxControl`.
	 */
	onClick: () => void;
};

export type BorderVisualizerProps = {
	/**
	 * An object representing the current border configuration. It contains
	 * properties for each side, with each side an object reflecting the border
	 * color, style, and width.
	 */
	value?: Borders;
};

export type SplitBorderControlProps = {
	/**
	 * An array of color definitions. This may also be a multi-dimensional array
	 * where colors are organized by multiple origins.
	 */
	colors?: Color[];
	/**
	 * This toggles the ability to choose custom colors.
	 */
	disableCustomColors?: boolean;
	/**
	 * This controls whether the alpha channel will be offered when selecting
	 * custom colors.
	 */
	enableAlpha?: boolean;
	/**
	 * A callback that is invoked whenever an individual side's border has
	 * changed.
	 */
	onChange: ( value: Border | undefined, side: BorderSide ) => void;
	/**
	 * This controls whether to include border style options within the
	 * individual `BorderControl` components.
	 */
	showStyle?: boolean;
	/**
	 * An object representing the current border configuration. It contains
	 * properties for each side, with each side an object reflecting the border
	 * color, style, and width.
	 */
	value?: Borders;
	/**
	 * This is passed through each `BorderControl` on to their color related
	 * sub-components which need to be made aware of whether the colors prop
	 * contains multiple origins.
	 */
	__experimentalHasMultipleOrigins?: boolean;
	/**
	 * This is passed through each `BorderControl` on to their color related
	 * sub-components so they may render more effectively when used within a
	 * sidebar.
	 */
	__experimentalIsRenderedInSidebar?: boolean;
};

export type BorderLabelProps = {
	/**
	 * Provides control over whether the label will only be visible to
	 * screen readers.
	 */
	hideLabelFromVision?: boolean;
	/**
	 * If provided, a label will be generated using this as the content.
	 */
	label?: string;
};
