# BorderDropdown

<div class="callout callout-alert">
This feature is still experimental. “Experimental” means this is an early implementation subject to drastic and breaking changes.
</div>
<br />

This component renders a custom `Dropdown`. Its toggle button includes a
`ColorIndicator` along with a wrapper to visually indicate any border style
selection. The dropdown's popover content contains a `ColorPalette` and
optional `BorderStyleControl` to facilitate selections of border color
and style.

## Usage

This component is generated automatically by its parent `BorderControl`.

<div class="callout callout-alert">
<strong>In general, this should not be used directly.</strong>
</div>

## Props

### `border`: `Object`

An object representing a border or `undefined`. This component will extract the
border color and style selections from this object to use as values for its
popover controls.

Example:
```js
 {
	color: '#72aee6',
	style: 'solid',
	width: '2px,
}
```

- Required: No

### `colors`: `Array`

An array of color definitions. This may also be a multi-dimensional array where
colors are organized by multiple origins.

Each color may be an object containing a `name` and `color` value.

- Required: No

### `disableCustomColors`: `boolean`

This toggles the ability to choose custom colors via the `ColorPalette`.

- Required: No

### `enableAlpha`: `boolean`

This controls whether the alpha channel will be offered via the `ColorPalette`'s
`ColorPicker`.

- Required: No

### `onChange`: `( value: Object | undefined ) => void`

A callback invoked when the border color or style selections change.

- Required: Yes

### `previousStyleSelection`: `string`

Any previous style selection made by the user. This can be used to reapply that
previous selection when, for example, a zero border width is to a non-zero
value.

- Required: Yes

### `showStyle`: `boolean`

This controls whether to render border style options.

- Required: No
- Default: `true`

### `__experimentalHasMultipleOrigins`: `boolean`

This is passed on to the `ColorPalette` which needs to be made aware of whether
the colors prop contains multiple origins.

- Required: No

### `__experimentalIsRenderedInSidebar`: `boolean`

This is passed on to the `ColorPalette` so it may render more effectively when
used within a sidebar.

- Required: No
