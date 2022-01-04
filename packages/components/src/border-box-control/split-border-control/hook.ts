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

import type { SplitBorderControlProps } from '../types';

export function useSplitBorderControl(
	props: WordPressComponentProps< SplitBorderControlProps, 'div' >
) {
	const { className, ...otherProps } = useContextSystem(
		props,
		'SplitBorderControl'
	);

	// Generate class names.
	const cx = useCx();
	const classes = useMemo( () => {
		return cx( styles.SplitBorderControl, className );
	}, [ className ] );

	const centeredClassName = useMemo( () => {
		return cx( styles.CenteredBorderControl, className );
	}, [] );

	return { ...otherProps, centeredClassName, className: classes };
}
