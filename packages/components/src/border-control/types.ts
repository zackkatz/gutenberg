export type Border = {
	color?: string;
	style?: string;
	width?: string;
};

export type Color = {
	name: string;
	color: string;
};

export type BorderControlProps = {
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
	 * Provides control over whether the label will only be visible to screen
	 * readers.
	 */
	hideLabelFromVision?: boolean;
	/**
	 * This flags the `BorderControl` to render with a more compact appearance.
	 * It restricts the width of the control and prevents it from expanding to
	 * take up additional space.
	 */
	isSmall?: boolean;
	/**
	 * If provided, a label will be generated using this as the content.
	 */
	label?: string;
	/**
	 * A callback function invoked when the border value is changed via an
	 * interaction that selects or clears, border color, style, or width.
	 */
	onChange: ( value: Border | undefined ) => void;
	/**
	 * If opted into, sanitizing the border means that if no width or color have
	 * been selected, the border style is also cleared and `undefined`
	 * is returned as the new border value.
	 */
	shouldSanitizeBorder?: boolean;
	/**
	 * This controls whether to include border style options within the
	 * `BorderDropdown` sub-component.
	 */
	showStyle?: boolean;
	/**
	 * An object representing a border or `undefined`. Used to set the current
	 * border configuration for this component.
	 */
	value?: Border;
	/**
	 * Controls the visual width of the `BorderControl`.
	 */
	width?: string;
	/**
	 * Flags whether this `BorderControl` should also render a `RangeControl`
	 * for additional control over a border's width.
	 */
	withSlider?: boolean;
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

export type BorderDropdownProps = {
	/**
	 * An object representing a border or `undefined`. This component will
	 * extract the border color and style selections from this object to use as
	 * values for its popover controls.
	 */
	border?: Border;
	/**
	 * An array of color definitions. This may also be a multi-dimensional array
	 * where colors are organized by multiple origins.
	 */
	colors?: Color[];
	/**
	 * This toggles the ability to choose custom colors via the `ColorPalette`.
	 */
	disableCustomColors?: boolean;
	/**
	 * This controls whether the alpha channel will be offered via the
	 * `ColorPalette`'s `ColorPicker`.
	 */
	enableAlpha?: boolean;
	/**
	 * A callback invoked when the border color or style selections change.
	 */
	onChange: ( newBorder: Border | undefined ) => void;
	/**
	 * Any previous style selection made by the user. This can be used to
	 * reapply that previous selection when, for example, a zero border width is
	 * to a non-zero value.
	 */
	previousStyleSelection?: string;
	/**
	 * This controls whether to render border style options.
	 */
	showStyle?: boolean;
	/**
	 * This is passed on to the `ColorPalette` which needs to be made aware of
	 * whether the colors prop contains multiple origins.
	 */
	__experimentalHasMultipleOrigins?: boolean;
	/**
	 * This is passed on to the `ColorPalette` so it may render more effectively
	 * when used within a sidebar.
	 */
	__experimentalIsRenderedInSidebar?: boolean;
};

export type BorderStyleControlProps = {
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
	 * A callback function invoked when a border style is selected or cleared.
	 */
	onChange: ( style: string | undefined ) => void;
	/**
	 * The currently selected border style if there is one. Styles available via
	 * this control are `solid`, `dashed` & `dotted`, however the possibility
	 * to store other valid CSS values is maintained e.g. `none`, `inherit` etc.
	 */
	value?: string;
};

export type BorderPopoverProps = {
	onClose: () => void;
};

export type BorderLabelProps = {
	label?: string;
	hideLabelFromVision?: boolean;
};
