/**
 * Internal dependencies
 */
import type { Border } from '../border-control/types';
import type { AnyBorder, Borders, BorderProp, BorderSide } from './types';

const sides: BorderSide[] = [ 'top', 'right', 'bottom', 'left' ];
const borderProps: BorderProp[] = [ 'color', 'style', 'width' ];

export const isEmptyBorder = ( border: Border | undefined ) => {
	if ( ! border ) {
		return true;
	}
	return ! borderProps.some( ( prop ) => border[ prop ] !== undefined );
};

export const isDefinedBorder = ( border: AnyBorder ) => {
	// No border, no worries :)
	if ( ! border ) {
		return false;
	}

	// If we have individual borders per side within the border object we
	// need to check whether any of those side borders have been set.
	if ( hasSplitBorders( border ) ) {
		const allSidesEmpty = sides.every( ( side ) =>
			isEmptyBorder( ( border as Borders )[ side ] )
		);

		return ! allSidesEmpty;
	}

	// If we have a top-level border only, check if that is empty. e.g.
	// { color: undefined, style: undefined, width: undefined }
	// Border radius can still be set within the border object as it is
	// handled separately.
	return ! isEmptyBorder( border as Border );
};

export const isCompleteBorder = ( border: Border | undefined ) => {
	if ( ! border ) {
		return false;
	}

	return borderProps.every( ( prop ) => border[ prop ] !== undefined );
};

export const hasSplitBorders = ( border: AnyBorder = {} ) => {
	return Object.keys( border ).some(
		( side ) => sides.indexOf( side as BorderSide ) !== -1
	);
};

export const hasMixedBorders = ( borders: AnyBorder ) => {
	if ( ! hasSplitBorders( borders ) ) {
		return false;
	}

	const shorthandBorders = sides.map( ( side: BorderSide ) =>
		getShorthandBorderStyle( ( borders as Borders )?.[ side ] )
	);

	return ! shorthandBorders.every(
		( border ) => border === shorthandBorders[ 0 ]
	);
};

export const getSplitBorders = ( border: Border | undefined ) => {
	if ( ! border || isEmptyBorder( border ) ) {
		return undefined;
	}

	return {
		top: border,
		right: border,
		bottom: border,
		left: border,
	};
};
export const getBorderDiff = ( original: Border, updated: Border ) => {
	const diff: Border = {};

	borderProps.forEach( ( prop ) => {
		if ( original?.[ prop ] !== updated?.[ prop ] ) {
			diff[ prop ] = updated?.[ prop ];
		}
	} );

	return diff;
};

export const getCommonBorder = ( borders: Borders | undefined ) => {
	if ( ! borders ) {
		return undefined;
	}

	const colors: ( string | undefined )[] = [];
	const styles: ( string | undefined )[] = [];
	const widths: ( string | undefined )[] = [];

	sides.forEach( ( side ) => {
		colors.push( borders[ side ]?.color );
		styles.push( borders[ side ]?.style );
		widths.push( borders[ side ]?.width );
	} );

	const allColorsMatch = colors.every( ( value ) => value === colors[ 0 ] );
	const allStylesMatch = styles.every( ( value ) => value === styles[ 0 ] );
	const allWidthsMatch = widths.every( ( value ) => value === widths[ 0 ] );

	return {
		color: allColorsMatch ? colors[ 0 ] : undefined,
		style: allStylesMatch ? styles[ 0 ] : undefined,
		width: allWidthsMatch ? widths[ 0 ] : undefined,
	};
};

export const getShorthandBorderStyle = ( border: Border | undefined ) => {
	if ( isEmptyBorder( border ) ) {
		return undefined;
	}

	const { color, style, width } = border as Border;
	const hasVisibleBorder = ( !! width && width !== '0' ) || !! color;
	const borderStyle = hasVisibleBorder ? style || 'solid' : style;

	// TODO: Can I get a `'0'` value from UnitControl?
	// const borderProps = [ width, borderStyle, color ];
	// return borderProps.filter( ( prop ) => prop !== undefined ).join( ' ' );

	return [ width, borderStyle, color ].filter( Boolean ).join( ' ' );
};

export const getClampedWidthBorderStyle = (
	border: Border | undefined,
	min = '1px',
	max = '10px'
) => {
	if ( ! border ) {
		return undefined;
	}

	return getShorthandBorderStyle( {
		...border,
		width:
			border.width !== undefined
				? `clamp(${ min }, ${ border.width }, ${ max })`
				: undefined,
	} );
};
