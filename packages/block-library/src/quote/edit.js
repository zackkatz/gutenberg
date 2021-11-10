/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useEffect, useState, Platform } from '@wordpress/element';
import {
	AlignmentControl,
	BlockControls,
	useBlockProps,
	useInnerBlocksProps,
	RichText,
	store as blockEditorStore,
} from '@wordpress/block-editor';
import {
	BlockQuotation,
	ToolbarGroup,
	ToolbarButton,
} from '@wordpress/components';
import { createBlock } from '@wordpress/blocks';
import { useSelect } from '@wordpress/data';

const isWebPlatform = Platform.OS === 'web';

export default function QuoteEdit( {
	attributes,
	setAttributes,
	isSelected,
	className,
	insertBlocksAfter,
	clientId,
	style,
} ) {
	const [ withAttribution, setWithAttribution ] = useState( false );
	const { align, attribution } = attributes;
	const blockProps = useBlockProps( {
		className: classnames( className, {
			[ `has-text-align-${ align }` ]: align,
		} ),
		style,
	} );
	const innerBlocksProps = useInnerBlocksProps( blockProps );
	const isAncestorOfSelectedBlock = useSelect( ( select ) =>
		select( blockEditorStore ).hasSelectedInnerBlock( clientId )
	);

	useEffect( () => {
		if ( ! RichText.isEmpty( attribution ) ) {
			setWithAttribution( true );
		}
	}, [] );

	let shouldAttributionBeVisible = ! RichText.isEmpty( attribution );
	if ( isSelected || isAncestorOfSelectedBlock ) {
		shouldAttributionBeVisible = withAttribution;
	}

	return (
		<>
			<BlockControls group="block">
				<AlignmentControl
					value={ align }
					onChange={ ( nextAlign ) => {
						setAttributes( { align: nextAlign } );
					} }
				/>
				<ToolbarGroup>
					<ToolbarButton
						isActive={ withAttribution }
						label={ __( 'Toggle attribution visibility' ) }
						onClick={ () => {
							if ( true === withAttribution ) {
								// Reset text if it's transitioning to hidden.
								setAttributes( { attribution: '' } );
							}
							setWithAttribution( ! withAttribution );
						} }
					>
						{ __( 'Add attribution' ) }
					</ToolbarButton>
				</ToolbarGroup>
			</BlockControls>
			{ shouldAttributionBeVisible ? (
				<figure { ...innerBlocksProps }>
					<BlockQuotation>
						{ innerBlocksProps.children }
					</BlockQuotation>
					<RichText
						identifier="attribution"
						tagName={ isWebPlatform ? 'figcaption' : undefined }
						style={ { display: 'block' } }
						value={ attribution }
						onChange={ ( nextAttribution ) =>
							setAttributes( {
								attribution: nextAttribution,
							} )
						}
						__unstableMobileNoFocusOnMount
						aria-label={ __( 'Quote attribution' ) }
						placeholder={
							// translators: placeholder text used for the attribution
							__( 'Add attribution' )
						}
						className="wp-block-quote__attribution"
						textAlign={ align }
						__unstableOnSplitAtEnd={ () =>
							insertBlocksAfter( createBlock( 'core/paragraph' ) )
						}
					/>
				</figure>
			) : (
				<BlockQuotation { ...innerBlocksProps }>
					{ innerBlocksProps.children }
				</BlockQuotation>
			) }
		</>
	);
}
