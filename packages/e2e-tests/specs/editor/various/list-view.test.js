/**
 * WordPress dependencies
 */
import {
	createNewPost,
	insertBlock,
	getEditedPostContent,
	pressKeyWithModifier,
	openListView,
} from '@wordpress/e2e-test-utils';

async function dragAndDrop( draggableElement, targetElement, offsetY ) {
	const draggablePoint = await draggableElement.clickablePoint();
	const targetClickablePoint = await targetElement.clickablePoint();
	const targetPoint = {
		x: targetClickablePoint.x,
		y: targetClickablePoint.y + offsetY,
	};

	return await page.mouse.dragAndDrop( draggablePoint, targetPoint );
}

async function getBlockListLeafNodes() {
	return await page.$$( '.block-editor-list-view-leaf' );
}

describe( 'List view', () => {
	beforeAll( async () => {
		await page.setDragInterception( true );
	} );

	beforeEach( async () => {
		await createNewPost();
	} );

	afterAll( async () => {
		await page.setDragInterception( false );
	} );

	it( 'allows a user to drag a block to a new sibling position', async () => {
		// Insert some blocks of different types.
		await insertBlock( 'Heading' );
		await insertBlock( 'Image' );
		await insertBlock( 'Paragraph' );

		// Open list view.
		await pressKeyWithModifier( 'access', 'o' );

		const paragraphBlock = await page.waitForXPath(
			'//a[contains(., "Paragraph")][@draggable="true"]'
		);

		// Drag above the heading block
		const headingBlock = await page.waitForXPath(
			'//a[contains(., "Heading")][@draggable="true"]'
		);

		await dragAndDrop( paragraphBlock, headingBlock, -5 );

		expect( await getEditedPostContent() ).toMatchSnapshot();
	} );

	it( 'should expand nested list items', async () => {
		// Insert some blocks of different types.
		await insertBlock( 'Cover' );

		// Click first color option from the block placeholder's color picker to make the inner blocks appear.
		const colorPickerButton = await page.waitForSelector(
			'.wp-block-cover__placeholder-background-options .components-circular-option-picker__option-wrapper:first-child button'
		);
		await colorPickerButton.click();

		// Open list view.
		await openListView();

		// Things start off expanded.
		expect( await getBlockListLeafNodes() ).toHaveLength( 2 );

		const blockListExpanders = await page.$$(
			'.block-editor-list-view__expander'
		);

		// Collapse the first block
		await blockListExpanders[ 0 ].click();

		// Check that we're collapsed
		expect( await getBlockListLeafNodes() ).toHaveLength( 1 );

		// Click the cover title placeholder.
		const coverTitle = await page.waitForSelector(
			'.wp-block-cover .wp-block-paragraph'
		);

		await coverTitle.click();

		// The block list should contain two leafs and the second should be selected (and be a paragraph).
		const selectedElementText = await page.$eval(
			'.block-editor-list-view-leaf:nth-child(2).is-selected a',
			( element ) => element.innerText
		);

		expect( selectedElementText ).toContain( 'Paragraph' );
	} );
} );
