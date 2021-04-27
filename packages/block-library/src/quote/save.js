/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { InnerBlocks, RichText, useBlockProps } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { align, citation } = attributes;

	const className = classnames( {
		[ `has-text-align-${ align }` ]: align,
	} );

	return (
		<figure { ...useBlockProps.save( { className } ) }>
			<blockquote>
				<InnerBlocks.Content />
			</blockquote>
			{ ! RichText.isEmpty( citation ) && (
				<figcaption>
					<RichText.Content tagName="cite" value={ citation } />
				</figcaption>
			) }
		</figure>
	);
}
