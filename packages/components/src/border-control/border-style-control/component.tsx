/**
 * WordPress dependencies
 */
import { lineDashed, lineDotted, lineSolid } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import Button from '../../button';
import { StyledLabel } from '../../base-control/styles/base-control-styles';
import { View } from '../../view';
import { VisuallyHidden } from '../../visually-hidden';
import { contextConnect, WordPressComponentProps } from '../../ui/context';
import { useBorderStyleControl } from './hook';

import type { BorderLabelProps, BorderStyleControlProps } from '../types';

const BORDER_STYLES = [
	{ label: __( 'Solid' ), icon: lineSolid, value: 'solid' },
	{ label: __( 'Dashed' ), icon: lineDashed, value: 'dashed' },
	{ label: __( 'Dotted' ), icon: lineDotted, value: 'dotted' },
];

const Label = ( props: BorderLabelProps ) => {
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

const BorderStyleControl = (
	props: WordPressComponentProps< BorderStyleControlProps, 'div' >,
	forwardedRef: React.Ref< any >
) => {
	const {
		buttonClassName,
		hideLabelFromVision,
		label,
		onChange,
		value,
		...otherProps
	} = useBorderStyleControl( props );

	return (
		<View { ...otherProps } ref={ forwardedRef }>
			<Label
				label={ label }
				hideLabelFromVision={ hideLabelFromVision }
			/>
			<View>
				{ BORDER_STYLES.map( ( borderStyle ) => (
					<Button
						key={ borderStyle.value }
						className={ buttonClassName }
						icon={ borderStyle.icon }
						isSmall
						isPressed={ borderStyle.value === value }
						onClick={ () =>
							onChange(
								borderStyle.value === value
									? undefined
									: borderStyle.value
							)
						}
						aria-label={ borderStyle.label }
					/>
				) ) }
			</View>
		</View>
	);
};

const ConnectedBorderStyleControl = contextConnect(
	BorderStyleControl,
	'BorderStyleControl'
);

export default ConnectedBorderStyleControl;
