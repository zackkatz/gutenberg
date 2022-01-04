/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import BorderVisualizer from '../border-visualizer';
import { BorderControl } from '../../border-control';
import { View } from '../../view';
import { contextConnect, WordPressComponentProps } from '../../ui/context';
import { useSplitBorderControl } from './hook';

import type { SplitBorderControlProps } from '../types';

const SplitBorderControl = (
	props: WordPressComponentProps< SplitBorderControlProps, 'div' >,
	forwardedRef: React.Ref< any >
) => {
	const {
		centeredClassName,
		colors,
		disableCustomColors,
		enableAlpha,
		onChange,
		showStyle,
		value,
		__experimentalHasMultipleOrigins,
		__experimentalIsRenderedInSidebar,
		...otherProps
	} = useSplitBorderControl( props );

	const sharedBorderControlProps = {
		colors,
		disableCustomColors,
		enableAlpha,
		isSmall: true,
		showStyle,
		__experimentalHasMultipleOrigins,
		__experimentalIsRenderedInSidebar,
	};

	return (
		<View { ...otherProps } ref={ forwardedRef }>
			<BorderVisualizer value={ value } />
			<BorderControl
				className={ centeredClassName }
				onChange={ ( newBorder ) => onChange( newBorder, 'top' ) }
				value={ value?.top }
				{ ...sharedBorderControlProps }
			/>
			<BorderControl
				onChange={ ( newBorder ) => onChange( newBorder, 'left' ) }
				value={ value?.left }
				{ ...sharedBorderControlProps }
			/>
			<BorderControl
				onChange={ ( newBorder ) => onChange( newBorder, 'right' ) }
				value={ value?.right }
				{ ...sharedBorderControlProps }
			/>
			<BorderControl
				className={ centeredClassName }
				onChange={ ( newBorder ) => onChange( newBorder, 'bottom' ) }
				value={ value?.bottom }
				{ ...sharedBorderControlProps }
			/>
		</View>
	);
};

const ConnectedSplitBorderControl = contextConnect(
	SplitBorderControl,
	'SplitBorderControl'
);
export default ConnectedSplitBorderControl;
