/**
 * External dependencies
 */
import { omit } from 'lodash';
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { RichText, useBlockProps } from '@wordpress/block-editor';
import { createBlock, parseWithAttributeSchema } from '@wordpress/blocks';

const blockAttributes = {
	value: {
		type: 'string',
		source: 'html',
		selector: 'blockquote',
		multiline: 'p',
		default: '',
	},
	citation: {
		type: 'string',
		source: 'html',
		selector: 'cite',
		default: '',
	},
	align: {
		type: 'string',
	},
};

function migrateToInnerBlocks( value ) {
	// The old value attribute for quotes can contain:
	// - a single paragraph: "<p>single paragraph</p>"
	// - multiple paragraphs: "<p>first paragraph</p><p>second paragraph</p>"
	return parseWithAttributeSchema( value, {
		type: 'array',
		source: 'query',
		selector: 'p',
		query: {
			content: {
				type: 'string',
				source: 'text',
			},
		},
	} ).map( ( { content } ) => createBlock( 'core/paragraph', { content } ) );
}

const deprecated = [
	{
		attributes: blockAttributes,
		migrate( attributes ) {
			return [
				{
					...omit( attributes, [ 'value', 'citation' ] ),
					attribution: attributes.citation,
				},
				migrateToInnerBlocks( attributes.value ),
			];
		},
		save( { attributes } ) {
			const { align, value, citation } = attributes;

			return (
				<blockquote style={ { textAlign: align ? align : null } }>
					<RichText.Content multiline value={ value } />
					{ ! RichText.isEmpty( citation ) && (
						<RichText.Content tagName="cite" value={ citation } />
					) }
				</blockquote>
			);
		},
	},
	{
		attributes: {
			...blockAttributes,
			style: {
				type: 'number',
				default: 1,
			},
		},

		migrate( attributes ) {
			const toOmit = [ 'value', 'citation' ];
			const toAdd = {
				attribution: attributes.citation,
			};

			if ( attributes.style === 2 ) {
				toOmit.push( 'style' );
				toAdd.className = attributes.className
					? attributes.className + ' is-style-large'
					: 'is-style-large';
			}

			return [
				{
					...omit( attributes, toOmit ),
					...toAdd,
				},
				migrateToInnerBlocks( attributes.value ),
			];
		},

		save( { attributes } ) {
			const { align, value, citation, style } = attributes;

			return (
				<blockquote
					className={ style === 2 ? 'is-large' : '' }
					style={ { textAlign: align ? align : null } }
				>
					<RichText.Content multiline value={ value } />
					{ ! RichText.isEmpty( citation ) && (
						<RichText.Content tagName="cite" value={ citation } />
					) }
				</blockquote>
			);
		},
	},
	{
		attributes: {
			...blockAttributes,
			citation: {
				type: 'string',
				source: 'html',
				selector: 'footer',
				default: '',
			},
			style: {
				type: 'number',
				default: 1,
			},
		},

		migrate( attributes ) {
			const toOmit = [ 'value', 'citation' ];

			if ( ! isNaN( parseInt( attributes.style ) ) )
				toOmit.push( 'style' );

			return [
				{
					...omit( attributes, toOmit ),
					attribution: attributes.citation,
				},
				migrateToInnerBlocks( attributes.value ),
			];
		},

		save( { attributes } ) {
			const { align, value, citation, style } = attributes;

			return (
				<blockquote
					className={ `blocks-quote-style-${ style }` }
					style={ { textAlign: align ? align : null } }
				>
					<RichText.Content multiline value={ value } />
					{ ! RichText.isEmpty( citation ) && (
						<RichText.Content tagName="footer" value={ citation } />
					) }
				</blockquote>
			);
		},
	},
	{
		attributes: blockAttributes,
		migrate( attributes ) {
			return [
				{
					...omit( attributes, [ 'value', 'citation' ] ),
					attribution: attributes.citation,
				},
				migrateToInnerBlocks( attributes.value ),
			];
		},
		save( { attributes: { align, value, citation } } ) {
			const className = classnames( {
				[ `has-text-align-${ align }` ]: align,
			} );

			return (
				<blockquote { ...useBlockProps.save( { className } ) }>
					<RichText.Content multiline value={ value } />
					{ ! RichText.isEmpty( citation ) && (
						<RichText.Content tagName="cite" value={ citation } />
					) }
				</blockquote>
			);
		},
	},
];

export default deprecated;
