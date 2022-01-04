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

import type { BorderVisualizerProps } from '../types';

export function useBorderVisualizer(
	props: WordPressComponentProps< BorderVisualizerProps, 'div' >
) {
	const { className, ...otherProps } = useContextSystem(
		props,
		'BorderVisualizer'
	);

	// Generate class names.
	const cx = useCx();
	const classes = useMemo( () => {
		return cx( styles.BorderVisualizer, className );
	}, [ className ] );

	return { ...otherProps, className: classes };
}
