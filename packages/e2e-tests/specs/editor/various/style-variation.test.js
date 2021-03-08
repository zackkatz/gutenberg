/**
 * WordPress dependencies
 */
import {
	createNewPost,
	clickBlockToolbarButton,
	insertBlock,
	getEditedPostContent,
} from '@wordpress/e2e-test-utils';

describe( 'adding blocks', () => {
	beforeAll( async () => {
		await createNewPost();
	} );

	it( 'Should switch to the plain style of the quote block', async () => {
		// Inserting a quote block
		await insertBlock( 'Quote' );
		await page.keyboard.press( 'ArrowDown' );
		await page.keyboard.type( 'Quote content' );

		// After adding content, the selected block
		// would be the paragraph, hence we have
		// to select the parent and then click for open
		// style variations.
		await clickBlockToolbarButton( 'Select Quote' );
		await clickBlockToolbarButton( 'Quote' );

		const plainStyleButton = await page.waitForXPath(
			'//*[@role="menuitem"][contains(., "Plain")]'
		);
		await plainStyleButton.click();

		// Check the content
		const content = await getEditedPostContent();
		expect( content ).toMatchInlineSnapshot( `
		"<!-- wp:quote {\\"className\\":\\"is-style-plain\\"} -->
		<blockquote class=\\"wp-block-quote is-style-plain\\">!-- wp:paragraph -->
		<p>Quote content</p>
		<!-- /wp:paragraph --></blockquote>
		<!-- /wp:quote -->"
	` );
	} );
} );
