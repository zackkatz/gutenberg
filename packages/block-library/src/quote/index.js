/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { quote as icon } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import deprecated from './deprecated';
import edit from './edit';
import metadata from './block.json';
import save from './save';
import transforms from './transforms';

const { name } = metadata;

export { metadata, name };

export const settings = {
	icon,
	example: {
		attributes: {
			attribution: 'Julio Cortázar',
		},
		innerBlocks: [
			{
				name: 'core/paragraph',
				attributes: {
					content: __( 'In quoting others, we cite ourselves.' ),
				},
			},
		],
	},
	transforms,
	edit,
	save,
	merge( attributes, { value, attribution } ) {
		// Quote citations cannot be merged. Pick the second one unless it's
		// empty.
		if ( ! attribution ) {
			attribution = attributes.attribution;
		}

		if ( ! value || value === '<p></p>' ) {
			return {
				...attributes,
				attribution,
			};
		}

		return {
			...attributes,
			attribution,
			value: attributes.value + value,
		};
	},
	deprecated,
};
