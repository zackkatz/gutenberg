/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Platform } from '@wordpress/element';
import {
	AlignmentControl,
	BlockControls,
	RichText,
	store as blockEditorStore,
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';
import {
	BlockQuotation,
	ToolbarButton,
	ToolbarGroup,
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

	const hasAttribution = attribution !== null;
	const isEditingQuote = isSelected || isAncestorOfSelectedBlock;
	const showAttribution =
		( isEditingQuote && hasAttribution ) ||
		! RichText.isEmpty( attribution );

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
						isActive={ hasAttribution }
						label={ __( 'Toggle attribution visibility' ) }
						onClick={ () =>
							setAttributes( {
								attribution: hasAttribution ? null : '',
							} )
						}
					>
						{ __( 'Add attribution' ) }
					</ToolbarButton>
				</ToolbarGroup>
			</BlockControls>
			{ showAttribution ? (
				<figure { ...innerBlocksProps }>
					<BlockQuotation>
						{ innerBlocksProps.children }
					</BlockQuotation>
					<RichText
						identifier="attribution"
						tagName={ isWebPlatform ? 'figcaption' : undefined }
						style={ { display: 'block' } }
						value={ attribution ?? '' }
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
