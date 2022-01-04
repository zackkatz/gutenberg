/**
 * Internal dependencies
 */
import BorderDropdown from '../border-dropdown';
import UnitControl from '../../unit-control';
import RangeControl from '../../range-control';
import { HStack } from '../../h-stack';
import { StyledLabel } from '../../base-control/styles/base-control-styles';
import { View } from '../../view';
import { VisuallyHidden } from '../../visually-hidden';
import { contextConnect, WordPressComponentProps } from '../../ui/context';
import { useBorderControl } from './hook';

import type { BorderControlProps, BorderLabelProps } from '../types';

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

const BorderControl = (
	props: WordPressComponentProps< BorderControlProps, 'div' >,
	forwardedRef: React.Ref< any >
) => {
	const {
		colors,
		disableCustomColors,
		enableAlpha,
		hideLabelFromVision,
		innerWrapperClassName,
		label,
		onBorderChange,
		onSliderChange,
		onWidthChange,
		placeholder,
		previousStyleSelection,
		showStyle = true,
		sliderClassName,
		value: border,
		width,
		widthControlClassName,
		widthUnit,
		widthValue,
		withSlider,
		__experimentalHasMultipleOrigins,
		__experimentalIsRenderedInSidebar,
		...otherProps
	} = useBorderControl( props );

	return (
		<View { ...otherProps } ref={ forwardedRef }>
			<BorderLabel
				label={ label }
				hideLabelFromVision={ hideLabelFromVision }
			/>
			<HStack spacing={ 2 }>
				<HStack className={ innerWrapperClassName } style={ { width } }>
					<BorderDropdown
						border={ border }
						colors={ colors }
						disableCustomColors={ disableCustomColors }
						enableAlpha={ enableAlpha }
						onChange={ onBorderChange }
						showStyle={ showStyle }
						previousStyleSelection={ previousStyleSelection }
						__experimentalHasMultipleOrigins={
							__experimentalHasMultipleOrigins
						}
						__experimentalIsRenderedInSidebar={
							__experimentalIsRenderedInSidebar
						}
					/>
					<UnitControl
						className={ widthControlClassName }
						min={ 0 }
						onChange={ onWidthChange }
						value={ border?.width || '' }
						placeholder={ placeholder }
					/>
				</HStack>
				{ withSlider && (
					<RangeControl
						className={ sliderClassName }
						initialPosition={ 0 }
						max={ 100 }
						min={ 0 }
						onChange={ onSliderChange }
						step={ [ 'px', '%' ].includes( widthUnit ) ? 1 : 0.1 }
						value={ widthValue || undefined }
						withInputField={ false }
					/>
				) }
			</HStack>
		</View>
	);
};

const ConnectedBorderControl = contextConnect( BorderControl, 'BorderControl' );

export default ConnectedBorderControl;
