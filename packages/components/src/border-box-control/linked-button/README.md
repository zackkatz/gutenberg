# LinkedButton

<div class="callout callout-alert">
This feature is still experimental. “Experimental” means this is an early implementation subject to drastic and breaking changes.
</div>
<br />

This component renders a button to toggle between the "linked" and "unlinked"
states for the `BorderBoxControl`. Effectively, this allows the user to switch
between editing all border sides at once or configuring them individually.

## Usage

This component is generated automatically by its parent `BorderBoxControl`.

<div class="callout callout-alert">
<strong>In general, this should not be used directly.</strong>
</div>

## Props

### `isLinked`: `boolean`

This prop allows the `LinkedButton` to reflect whether the parent
`BorderBoxControl` is currently displaying "linked" or "unlinked" border
controls.

- Required: Yes

### `onClick`: `() => void`

A callback invoked when this `LinkedButton` is clicked. It is used to toggle
display between linked or split border controls within the parent
`BorderBoxControl`.

- Required: Yes
