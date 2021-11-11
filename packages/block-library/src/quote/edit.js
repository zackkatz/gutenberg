/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Platform, useState } from '@wordpress/element';
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
	attributes: { align, attribution },
	setAttributes,
	isSelected,
	className,
	insertBlocksAfter,
	clientId,
	style,
} ) {
	const [ withAttribution, setWithAttribution ] = useState(
		! RichText.isEmpty( attribution )
	);
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

	const blockIsInSelection = isSelected || isAncestorOfSelectedBlock;
	const shouldAttributionBeVisible = blockIsInSelection
		? withAttribution
		: ! RichText.isEmpty( attribution );

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
