# SplitBorderControl

<div class="callout callout-alert">
This feature is still experimental. “Experimental” means this is an early implementation subject to drastic and breaking changes.
</div>
<br />

This displays four `BorderControl` components allowing for configuration of
individual side borders. It also renders a visualizer to provide limited visual
feedback on the current border selections.

## Usage

This component is generated automatically by its parent `BorderBoxControl`.

<div class="callout callout-alert">
<strong>In general, this should not be used directly.</strong>
</div>

## Props

### `colors`: `Array`

An array of color definitions. This may also be a multi-dimensional array where
colors are organized by multiple origins.

Each color may be an object containing a `name` and `color` value.

- Required: No

### `disableCustomColors`: `boolean`

This toggles the ability to choose custom colors.

- Required: No

### `enableAlpha`: `boolean`

This controls whether the alpha channel will be offered when selecting
custom colors.

- Required: No

### `onChange`: `onChange: ( value: Object | undefined, side: string ) => void;`

A callback that is invoked whenever an individual side's border has changed.

- Required: Yes

### `showStyle`: `boolean`

This controls whether to include border style options within the individual
`BorderControl` components.

- Required: No

### `value`: `Object`

An object representing the current border configuration. It contains properties
for each side, with each side an object reflecting the border color, style, and
width.

Example:
```js
{
	top: { color: '#72aee6', style: 'solid', width: '1px' },
	right: { color: '#e65054', style: 'dashed', width: '2px' },
	bottom: { color: '#68de7c', style: 'solid', width: '1px' },
	left: { color: '#f2d675', style: 'dotted', width: '1em' },
}
```

- Required: No

### `__experimentalHasMultipleOrigins`: `boolean`

This is passed through each `BorderControl` on to their color related
sub-components which need to be made aware of whether the colors prop contains
multiple origins.

- Required: No

### `__experimentalIsRenderedInSidebar`: `boolean`

This is passed through each `BorderControl` on to their color related
sub-components so they may render more effectively when used within a sidebar.

- Required: No
