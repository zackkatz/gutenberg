# BorderStyleControl

<div class="callout callout-alert">
This feature is still experimental. “Experimental” means this is an early implementation subject to drastic and breaking changes.
</div>
<br />

This component renders a segmented control allowing selection of border styles.

## Usage

This component is generated automatically by its parent `BorderControl`.

<div class="callout callout-alert">
<strong>In general, this should not be used directly.</strong>
</div>

## Props

### `hideLabelFromVision`: `boolean`

Provides control over whether the label will only be visible to screen readers.

- Required: No

### `label`: `string`

If provided, a label will be generated using this as the content.

_Whether it is visible only to screen readers is controlled via
`hideLabelFromVision`._

- Required: No

### `onChange`: `( value: string | undefined ) => void`

A callback function invoked when a border style is selected or cleared.

- Required: Yes

### `value`: `string`

The currently selected border style if there is one. Styles available via
this control are `solid`, `dashed` & `dotted`, however the possibility
to store other valid CSS values is maintained e.g. `none`, `inherit` etc.

_At this time `none` is not a supported border style._

- Required: No
