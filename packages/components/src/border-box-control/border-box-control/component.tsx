/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import LinkedButton from '../linked-button';
import SplitBorderControl from '../split-border-control';
import { BorderControl } from '../../border-control';
import { HStack } from '../../h-stack';
import { StyledLabel } from '../../base-control/styles/base-control-styles';
import { View } from '../../view';
import { VisuallyHidden } from '../../visually-hidden';
import { contextConnect, WordPressComponentProps } from '../../ui/context';
import { useBorderBoxControl } from './hook';

import type { BorderBoxControlProps, BorderLabelProps } from '../types';

const BorderLabel = ( props: BorderLabelProps ) => {
	const { label, hideLabelFromVision } = props;

	if ( ! label ) {
		return null;
	}

	return hideLabelFromVision ? (
		<VisuallyHidden as="label">{ label }</VisuallyHidden>
	) : (
		<StyledLabel>{ label }</StyledLabel>
	);
};

const BorderBoxControl = (
	props: WordPressComponentProps< BorderBoxControlProps, 'div' >,
	forwardedRef: React.Ref< any >
) => {
	const {
		className,
		colors,
		disableCustomColors,
		enableAlpha,
		hasMixedBorders,
		hideLabelFromVision,
		isLinked,
		label,
		linkedControlClassName,
		linkedValue,
		onLinkedChange,
		onSplitChange,
		showStyle,
		splitValue,
		toggleLinked,
		__experimentalHasMultipleOrigins,
		__experimentalIsRenderedInSidebar,
		...otherProps
	} = useBorderBoxControl( props );

	return (
		<View className={ className } { ...otherProps } ref={ forwardedRef }>
			<BorderLabel
				label={ label }
				hideLabelFromVision={ hideLabelFromVision }
			/>
			<HStack alignment={ 'start' } expanded={ true } spacing={ 3 }>
				{ isLinked ? (
					<BorderControl
						className={ linkedControlClassName }
						colors={ colors }
						disableCustomColors={ disableCustomColors }
						enableAlpha={ enableAlpha }
						onChange={ onLinkedChange }
						placeholder={
							hasMixedBorders ? __( 'Mixed' ) : undefined
						}
						shouldSanitizeBorder={ false } // This component will handle that.
						showStyle={ showStyle }
						value={ linkedValue }
						withSlider={ true }
						width={ '110px' }
						__experimentalHasMultipleOrigins={
							__experimentalHasMultipleOrigins
						}
						__experimentalIsRenderedInSidebar={
							__experimentalIsRenderedInSidebar
						}
					/>
				) : (
					<SplitBorderControl
						colors={ colors }
						disableCustomColors={ disableCustomColors }
						enableAlpha={ enableAlpha }
						onChange={ onSplitChange }
						showStyle={ showStyle }
						value={ splitValue }
						__experimentalHasMultipleOrigins={
							__experimentalHasMultipleOrigins
						}
						__experimentalIsRenderedInSidebar={
							__experimentalIsRenderedInSidebar
						}
					/>
				) }
				<LinkedButton onClick={ toggleLinked } isLinked={ isLinked } />
			</HStack>
		</View>
	);
};

const ConnectedBorderBoxControl = contextConnect(
	BorderBoxControl,
	'BorderBoxControl'
);

export default ConnectedBorderBoxControl;
