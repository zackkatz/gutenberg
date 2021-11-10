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
		<>
			{ RichText.isEmpty( attribution ) ? (
				<blockquote { ...useBlockProps.save( { className } ) }>
					<InnerBlocks.Content />
				</blockquote>
			) : (
				<figure { ...useBlockProps.save( { className } ) }>
					<blockquote>
						<InnerBlocks.Content />
					</blockquote>

					<RichText.Content
						tagName="figcaption"
						value={ attribution }
					/>
				</figure>
			) }
		</>
	);
}
