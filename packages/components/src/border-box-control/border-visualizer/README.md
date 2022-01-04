# BorderVisualizer

<div class="callout callout-alert">
This feature is still experimental. “Experimental” means this is an early implementation subject to drastic and breaking changes.
</div>
<br />

This component provides visual feedback as to the current configuration of
borders for the `BorderBoxControl`. Each side's border color, style, and width
are reflected however the width is constrained so as to not disappear or be
excessively wide.

## Usage

This component is generated automatically by its parent `BorderBoxControl`.

<div class="callout callout-alert">
<strong>In general, this should not be used directly.</strong>
</div>

## Props

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
