/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	AlignmentControl,
	BlockControls,
	InnerBlocks,
	RichText,
	useBlockProps,
} from '@wordpress/block-editor';
import { BlockQuotation } from '@wordpress/components';
import { createBlock } from '@wordpress/blocks';
import { Platform } from '@wordpress/element';
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
	const { align, citation } = attributes;
	const blockProps = useBlockProps( {
		className: classnames( className, {
			[ `has-text-align-${ align }` ]: align,
		} ),
		style,
	} );

	const { isAncestorOfSelectedBlock } = useSelect(
		( select ) => {
			const { hasSelectedInnerBlock } = select( 'core/block-editor' );

			return {
				isAncestorOfSelectedBlock: hasSelectedInnerBlock(
					clientId,
					true
				),
			};
		},
		[ clientId ]
	);

	return (
		<>
			<BlockControls group="block">
				<AlignmentControl
					value={ align }
					onChange={ ( nextAlign ) => {
						setAttributes( { align: nextAlign } );
					} }
				/>
			</BlockControls>
			<BlockQuotation { ...blockProps }>
				<InnerBlocks
					allowedBlocks={ [
						'core/code',
						'core/heading',
						'core/list',
						'core/paragraph',
					] }
				/>
				{ ( ! RichText.isEmpty( citation ) ||
					isSelected ||
					isAncestorOfSelectedBlock ) && (
					<RichText
						identifier="citation"
						tagName={ isWebPlatform ? 'cite' : undefined }
						style={ { display: 'block' } }
						value={ citation }
						onChange={ ( nextCitation ) =>
							setAttributes( {
								citation: nextCitation,
							} )
						}
						__unstableMobileNoFocusOnMount
						aria-label={ __( 'Quote citation text' ) }
						placeholder={
							// translators: placeholder text used for the citation
							__( 'Add citation' )
						}
						className="wp-block-quote__citation"
						textAlign={ align }
						__unstableOnSplitAtEnd={ () =>
							insertBlocksAfter( createBlock( 'core/paragraph' ) )
						}
					/>
				) }
			</BlockQuotation>
		</>
	);
}
