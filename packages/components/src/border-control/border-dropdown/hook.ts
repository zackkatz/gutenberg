/**
 * WordPress dependencies
 */
import { useMemo } from '@wordpress/element';

/**
 * Internal dependencies
 */
import * as styles from '../styles';
import { parseUnit } from '../../unit-control/utils';
import { useContextSystem, WordPressComponentProps } from '../../ui/context';
import { useCx } from '../../utils/hooks/use-cx';

import type { BorderDropdownProps } from '../types';

export function useBorderDropdown(
	props: WordPressComponentProps< BorderDropdownProps, 'div' >
) {
	const {
		border,
		className,
		colors,
		onChange,
		previousStyleSelection,
		...otherProps
	} = useContextSystem( props, 'BorderDropdown' );

	const [ widthValue ] = parseUnit( border?.width );
	const hasZeroWidth = widthValue === 0;

	const onColorChange = ( color: string | undefined ) => {
		const style =
			border?.style === 'none' ? previousStyleSelection : border?.style;
		const width = hasZeroWidth && !! color ? '1px' : border?.width;

		onChange( { color, style, width } );
	};

	const onStyleChange = ( style: string | undefined ) => {
		const width = hasZeroWidth && !! style ? '1px' : border?.width;
		onChange( { ...border, style, width } );
	};

	const onReset = () => {
		onChange( {
			...border,
			color: undefined,
			style: undefined,
		} );
	};

	// Generate class names.
	const cx = useCx();
	const classes = useMemo( () => {
		return cx( styles.BorderDropdown, className );
	}, [ className ] );

	const indicatorClassName = useMemo( () => {
		return cx( styles.BorderColorIndicator );
	}, [] );

	const popoverClassName = useMemo( () => {
		return cx( styles.BorderPopover );
	}, [] );

	const popoverControlsClassName = useMemo( () => {
		return cx( styles.BorderPopoverControls );
	}, [] );

	const popoverContentClassName = useMemo( () => {
		return cx( styles.BorderPopoverContent );
	}, [] );

	const resetButtonClassName = useMemo( () => {
		return cx( styles.ResetButton );
	}, [] );

	return {
		...otherProps,
		border,
		className: classes,
		colors,
		indicatorClassName,
		onColorChange,
		onStyleChange,
		onReset,
		popoverClassName,
		popoverContentClassName,
		popoverControlsClassName,
		resetButtonClassName,
	};
}
