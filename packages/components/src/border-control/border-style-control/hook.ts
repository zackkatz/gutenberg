/**
 * WordPress dependencies
 */
import { useMemo } from '@wordpress/element';

/**
 * Internal dependencies
 */
import * as styles from '../styles';
import { useContextSystem, WordPressComponentProps } from '../../ui/context';
import { useCx } from '../../utils/hooks/use-cx';

import type { BorderStyleControlProps } from '../types';

export function useBorderStyleControl(
	props: WordPressComponentProps< BorderStyleControlProps, 'div' >
) {
	const { className, ...otherProps } = useContextSystem(
		props,
		'BorderStyleControl'
	);

	// Generate class names.
	const cx = useCx();
	const classes = useMemo( () => {
		return cx( styles.BorderStyleControl, className );
	}, [ className ] );

	const buttonClassName = useMemo( () => {
		return cx( styles.BorderStyleButton );
	}, [] );

	return { ...otherProps, className: classes, buttonClassName };
}
