/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { InnerBlocks, RichText, useBlockProps } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { align, attribution } = attributes;

	const className = classnames( {
		[ `has-text-align-${ align }` ]: align,
	} );

	return (
		<figure { ...useBlockProps.save( { className } ) }>
			<blockquote>
				<InnerBlocks.Content />
			</blockquote>
			{ ! RichText.isEmpty( attribution ) && (
				<figcaption>
					<RichText.Content value={ attribution } />
				</figcaption>
			) }
		</figure>
	);
}
