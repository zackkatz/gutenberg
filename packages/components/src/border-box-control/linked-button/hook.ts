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

import type { LinkedButtonProps } from '../types';

export function useLinkedButton(
	props: WordPressComponentProps< LinkedButtonProps, 'div' >
) {
	const { className, ...otherProps } = useContextSystem(
		props,
		'LinkedButton'
	);

	// Generate class names.
	const cx = useCx();
	const classes = useMemo( () => {
		return cx( styles.LinkedButton, className );
	}, [ className ] );

	return { ...otherProps, className: classes };
}
