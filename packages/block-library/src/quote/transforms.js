/**
 * WordPress dependencies
 */
import {
	createBlock,
	parseWithAttributeSchema,
	rawHandler,
	serialize,
	switchToBlockType,
} from '@wordpress/blocks';

const toBlocksOfType = ( blocks, type ) => {
	const result = [];
	blocks.forEach( ( block ) => {
		if ( type === block.name ) {
			result.push( block );
		} else {
			const newBlocks = switchToBlockType( block, type );
			if ( newBlocks ) {
				result.push( ...newBlocks );
			}
		}
	} );
	return result.filter( Boolean );
};

const transforms = {
	from: [
		{
			type: 'block',
			isMultiBlock: true,
			blocks: [ '*' ],
			__experimentalConvert: ( blocks ) =>
				createBlock(
					'core/quote',
					{},
					blocks.map( ( block ) =>
						createBlock(
							block.name,
							block.attributes,
							block.innerBlocks
						)
					)
				),
		},
		{
			type: 'block',
			isMultiBlock: true,
			blocks: [ 'core/paragraph' ],
			transform: ( attributes ) => {
				return createBlock(
					'core/quote',
					{},
					attributes.map( ( props ) =>
						createBlock( 'core/paragraph', props )
					)
				);
			},
		},
		{
			type: 'block',
			isMultiBlock: true,
			blocks: [ 'core/heading' ],
			transform: ( attributes ) => {
				return createBlock(
					'core/quote',
					{},
					attributes.map( ( props ) =>
						createBlock( 'core/heading', props )
					)
				);
			},
		},
		{
			type: 'block',
			blocks: [ 'core/pullquote' ],
			transform: ( { value, citation, anchor } ) => {
				return createBlock(
					'core/quote',
					{
						attribution: citation,
						anchor,
					},
					parseWithAttributeSchema( value, {
						type: 'array',
						source: 'query',
						selector: 'p',
						query: {
							content: {
								type: 'string',
								source: 'text',
							},
						},
					} ).map( ( { content } ) =>
						createBlock( 'core/paragraph', { content } )
					)
				);
			},
		},
		{
			type: 'prefix',
			prefix: '>',
			transform: () => createBlock( 'core/quote' ),
		},
		{
			type: 'raw',
			schema: ( { phrasingContentSchema } ) => ( {
				blockquote: {
					children: {
						p: {
							children: phrasingContentSchema,
						},
						figcaption: {
							children: phrasingContentSchema,
						},
					},
				},
			} ),
			isMatch: ( node ) => {
				const isAllowedNode = ( () => {
					let hasCitation = false;
					return ( child ) => {
						if (
							[
								'P',
								'H1',
								'H2',
								'H3',
								'H4',
								'H5',
								'H6',
								'UL',
								'OL',
								'PRE',
							].some( ( tag ) => tag === child.nodeName )
						) {
							return true;
						}
						// Child is a cite and no other cite child exists before it.
						if (
							! hasCitation &&
							child.nodeName === 'FIGCAPTION'
						) {
							hasCitation = true;
							return true;
						}
					};
				} )();
				return (
					node.nodeName === 'BLOCKQUOTE' &&
					// The quote block can only handle multiline paragraph
					// content with an optional figcaption child.
					Array.from( node.childNodes ).every( isAllowedNode )
				);
			},
			transform: ( node ) =>
				createBlock(
					'core/quote',
					{},
					rawHandler( {
						HTML: node.innerHTML,
						mode: 'BLOCKS',
					} )
				),
		},
	],
	to: [
		{
			type: 'block',
			blocks: [ 'core/paragraph' ],
			transform: ( { citation }, innerBlocks ) => {
				const paragraphs = toBlocksOfType(
					innerBlocks,
					'core/paragraph'
				);
				if ( citation && citation !== '<p></p>' ) {
					paragraphs.push(
						createBlock( 'core/paragraph', {
							content: citation,
						} )
					);
				}

				if ( paragraphs.length === 0 ) {
					return createBlock( 'core/paragraph', {
						content: '',
					} );
				}
				return paragraphs;
			},
		},

		{
			type: 'block',
			blocks: [ 'core/heading' ],
			transform: ( { citation }, innerBlocks ) => {
				const result = [];
				result.push( ...toBlocksOfType( innerBlocks, 'core/heading' ) );

				if ( citation && citation !== '<p></p>' ) {
					result.push(
						createBlock( 'core/heading', {
							content: citation,
						} )
					);
				}

				return result;
			},
		},

		{
			type: 'block',
			blocks: [ 'core/pullquote' ],
			transform: ( { citation, anchor }, innerBlocks ) => {
				return createBlock( 'core/pullquote', {
					value: serialize(
						toBlocksOfType( innerBlocks, 'core/paragraph' )
					),
					citation,
					anchor,
				} );
			},
		},
	],
};

export default transforms;
