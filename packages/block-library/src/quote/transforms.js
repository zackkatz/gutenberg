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
			return result.push( block );
		}
		const newBlocks = switchToBlockType( block, type );
		if ( newBlocks ) {
			result.push( ...newBlocks.filter( Boolean ) );
		}
	} );
	return result;
};

const unwrapContainers = ( blocks ) =>
	blocks.length === 1 && blocks[ 0 ].name === 'core/group'
		? blocks[ 0 ].innerBlocks
		: blocks;

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
					unwrapContainers( blocks ).map( ( block ) =>
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
				figure: {
					require: [ 'blockquote' ],
					children: {
						blockquote: {
							children: '*',
						},
						figcaption: {
							children: phrasingContentSchema,
						},
					},
				},
			} ),
			isMatch: ( node ) =>
				node.nodeName === 'FIGURE' &&
				!! node.querySelector( 'blockquote' ),
			transform: ( node ) => {
				return createBlock(
					'core/quote',
					{
						attribution: node.querySelector( 'figcaption' )
							?.innerHTML,
					},
					rawHandler( {
						HTML: node.querySelector( 'blockquote' ).innerHTML,
						mode: 'BLOCKS',
					} )
				);
			},
		},
	],
	to: [
		{
			type: 'block',
			blocks: [ 'core/group' ],
			transform: ( { attribution }, innerBlocks ) =>
				createBlock(
					'core/group',
					{},
					attribution
						? [
								...innerBlocks,
								createBlock( 'core/paragraph', {
									content: attribution,
								} ),
						  ]
						: innerBlocks
				),
		},
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
