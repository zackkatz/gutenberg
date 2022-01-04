/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { View } from '../../view';
import { contextConnect, WordPressComponentProps } from '../../ui/context';
import { getClampedWidthBorderStyle } from '../utils';
import { useBorderVisualizer } from './hook';

import type { BorderVisualizerProps } from '../types';

const BorderVisualizer = (
	props: WordPressComponentProps< BorderVisualizerProps, 'div' >,
	forwardedRef: React.Ref< any >
) => {
	const { value, ...otherProps } = useBorderVisualizer( props );
	const styles = {
		borderTop: getClampedWidthBorderStyle( value?.top ),
		borderRight: getClampedWidthBorderStyle( value?.right ),
		borderBottom: getClampedWidthBorderStyle( value?.bottom ),
		borderLeft: getClampedWidthBorderStyle( value?.left ),
	};

	return <View { ...otherProps } ref={ forwardedRef } style={ styles } />;
};

const ConnectedBorderVisualizer = contextConnect(
	BorderVisualizer,
	'BorderVisualizer'
);
export default ConnectedBorderVisualizer;
