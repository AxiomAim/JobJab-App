import { PdfField } from './form';
import { PdfDestination, PdfPage } from './pdf-page';
import { _PdfDictionary } from './pdf-primitives';
/**
 * Represents base class for all action types.
 * ```typescript
 * // Load an existing PDF document
 * let document: PdfDocument = new PdfDocument(data);
 * // Access button field
 * let field: PdfButtonField = document.form.fieldAt(0) as PdfButtonField;
 * // Access the second page
 * let secondPage: PdfPage = document.getPage(2);
 * // Create a PdfDestination for the specified page
 * let destination: PdfDestination = new PdfDestination(secondPage)
 * // Create a new PdfGoToAction with the specified destination
 * let gotoAction: PdfGoToAction = new PdfGoToAction(destination);
 * // Get the GoTo action to the mouse enter property of the button field
 * let pdfAction: PdfAction = field.actions.mouseEnter;
 * // Save the document
 * document.save('output.pdf');
 * // Destroy the document
 * document.destroy();
 */
export declare class PdfAction {
    _dictionary: _PdfDictionary;
    _page: PdfPage;
    _next: PdfAction;
    /**
     * Get the next action to be performed after the action represented by this instance.
     *
     * @returns {PdfAction} The next action to be executed.
     *
     * Represents an action which goes to a destination in the current document.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data);
     * // Access button field
     * let field: PdfButtonField = document.form.fieldAt(0) as PdfButtonField;
     * // Access the page1
     * let Page1: PdfPage = document.getPage(1);
     * // Create a PdfGoToAction for navigating to the specified page.
     * let action: PdfGoToAction = new PdfGoToAction(page1);
     * // Set the destination page for the action
     * action.destination = new PdfDestination(secondPage);
     * // Set the GoTo action to the mouse enter property of the button field
     * field1.actions.mouseEnter = action1;
     * // Access the page
     * let page: PdfPage = document.getPage(2);
     * // Access button field
     * let field1: PdfButtonField = document.form.fieldAt(1) as PdfButtonField;
     * // Create a new GoTo action with the specified page
     * let gotoAction: PdfGoToAction = new PdfGoToAction(page);
     * // Set the next property
     * gotoAction.next = action;
     * // Set the GoTo action to the mouse enter property of the button field
     * field1.actions.mouseEnter = gotoAction;
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     */
    /**
    * Set the next action to be performed after the action represented by this instance.
    *
    * @param {PdfAction} value The next action to be executed.
    *
    * Represents an action which goes to a destination in the current document.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data);
    * // Access button field
    * let field: PdfButtonField = document.form.fieldAt(0) as PdfButtonField;
    * // Access the page1
    * let Page1: PdfPage = document.getPage(1);
    * let action: PdfGoToAction = new PdfGoToAction(page1);
    * // Set the destination page for the action
    * action.destination = new PdfDestination(secondPage);
    * // Set the GoTo action to the mouse enter property of the button field
    * field1.actions.mouseEnter = action1;
    * // Access the third page
    * let page: PdfPage = document.getPage(2);
    * // Access button field
    * let field1: PdfButtonField = document.form.fieldAt(1) as PdfButtonField;
    * // Create a new GoTo action with the specified page
    * let gotoAction: PdfGoToAction = new PdfGoToAction(page);
    * // Set the next property
    * gotoAction.next = action;
    * // Set the GoTo action to the mouse enter property of the button field
    * field1.actions.mouseEnter = gotoAction;
    * // Save the document
    * document.save('output.pdf');
    * // Destroy the document
    * document.destroy();
    */
    next: PdfAction;
}
/**
 * Represents an action which goes to a destination in the current document.
 *
 * ```typescript
 * // Load an existing PDF document
 * let document: PdfDocument = new PdfDocument(data);
 * // Access button field
 * let field: PdfButtonField = document.form.fieldAt(0) as PdfButtonField;
 * // Access the second page
 * let secondPage: PdfPage = document.getPage(2);
 * // Create a PdfDestination for the specified page
 * let destination: PdfDestination = new PdfDestination(secondPage)
 * // Create a new PdfGoToAction with the specified destination
 * let gotoAction: PdfGoToAction = new PdfGoToAction(destination);
 * // Set the goto action to the button
 * field.actions.mouseEnter = gotoAction;
 * // Save the document
 * document.save('output.pdf');
 * // Destroy the document
 * document.destroy();
 */
export declare class PdfGoToAction extends PdfAction {
    _destination: PdfDestination;
    /**
     * Initializes a new instance of the `PdfGoToAction` class.
     *
     * @param {PdfDestination} destination Destination to navigate.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data);
     * // Access button field
     * let field: PdfButtonField = document.form.fieldAt(0) as PdfButtonField;
     * // Access the second page
     * let secondPage: PdfPage = document.getPage(2);
     * // Create a PdfDestination for the specified page
     * let destination: PdfDestination = new PdfDestination(secondPage)
     * // Create a new PdfGoToAction with the specified destination
     * let gotoAction: PdfGoToAction = new PdfGoToAction(destination);
     * // Set the GoTo action to the mouse enter property of the button field
     * field.actions.mouseEnter = gotoAction;
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     */
    constructor(destination: PdfDestination);
    /**
     * Initializes a new instance of the `PdfGoToAction` class.
     *
     * @param {PdfPage} page page to navigate.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data);
     * // Access button field
     * let field: PdfButtonField = document.form.fieldAt(0) as PdfButtonField;
     * // Access the page
     * let page: PdfPage = document.getPage(2);
     * // Create a new GoTo action with the specified page
     * let gotoAction: PdfGoToAction = new PdfGoToAction(page);
     * // Set the destination for specified page
     * gotoAction.destination = new PdfDestination(page);
     * // Set the goto action to the button
     * field.actions.mouseEnter = gotoAction;
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     */
    constructor(page: PdfPage);
    /**
     * Get the destination to be navigated.
     *
     * @returns {PdfDestination} The destination to be navigated.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data);
     * // Access button field
     * let field: PdfButtonField = document.form.fieldAt(0) as PdfButtonField;
     * // Get the action value from button field
     * let action: PdfAction = field.actions.mouseEnter.destination;
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Set the destination to be navigated.
    *
    * @param {PdfDestination} value The destination to be navigated.
    *
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data);
    * // Access button field
    * let field: PdfButtonField = document.form.fieldAt(0) as PdfButtonField;
    * // Access the second page
    * let secondPage: PdfPage = document.getPage(2);
    * // Create a new GoTo action with the specified page
    * let gotoAction: PdfGoToAction = new PdfGoToAction(secondPage);
    * // Set the destination location within the specified page for the PdfGoToAction
    * gotoAction.Destination = new PdfDestination(secondPage, [0, 100]);
    * // Set the goto action to the button
    * field.actions.mouseEnter = gotoAction;
    * // Save the document
    * document.save('output.pdf');
    * // Destroy the document
    * document.destroy();
    */
    destination: PdfDestination;
}
/**
 * Represents actions to be performed as response to field events.
 *
 * ```typescript
 * // Load an existing PDF document
 * let document: PdfDocument = new PdfDocument(data);
 * // Access button field
 * let field: PdfButtonField = document.form.fieldAt(0) as PdfButtonField;
 * // Access the second page
 * let secondPage: PdfPage = document.getPage(2);
 * // Create a PdfDestination for the specified page
 * let destination: PdfDestination = new PdfDestination(secondPage)
 * // Create a new PdfGoToAction with the specified destination
 * let gotoAction: PdfGoToAction = new PdfGoToAction(destination);
 * // Get the pdf field actions
 * let fieldActions: PdfFieldActions = field.actions;
 * // Save the document
 * document.save('output.pdf');
 * // Destroy the document
 * document.destroy();
 */
export declare class PdfFieldActions {
    _mouseEnter: PdfAction;
    _mouseLeave: PdfAction;
    _mouseUp: PdfAction;
    _mouseDown: PdfAction;
    _gotFocus: PdfAction;
    _lostFocus: PdfAction;
    _field: PdfField;
    _actions: PdfFieldActions;
    /**
     * Initializes a new instance of the `PdfFieldActions` class.
     *
     * @private
     * @param {PdfField} field field items.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data);
     * // Access button field
     * let field: PdfButtonField = document.form.fieldAt(0) as PdfButtonField;
     * // Access the second page
     * let secondPage: PdfPage = document.getPage(2);
     * // Create a PdfDestination for the specified page
     * let destination: PdfDestination = new PdfDestination(secondPage)
     * // Creates a new PdfGoToAction with the specified destination
     * let gotoAction: PdfGoToAction = new PdfGoToAction(destination);
     * // Set the goto action to the button
     * field.actions.mouseEnter = gotoAction;
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     */
    constructor(field: PdfField);
    /**
     * Get the action to be performed when the mouse cursor enters the field area.
     *
     * @returns {PdfAction} The action to be executed when the mouse enters the field area.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data);
     * // Access button field
     * let field: PdfButtonField = document.form.fieldAt(0) as PdfButtonField;
     * // Get the action to be executed when the mouse enters the field area
     * let action: PdfAction = field.actions.mouseEnter;
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Set the action to be performed when the mouse cursor enters the field area.
    *
    * @param {PdfAction} value The action to be executed when the mouse enters the field area.
    *
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data);
    * // Access button field
    * let field: PdfButtonField = document.form.fieldAt(0) as PdfButtonField;
    * // Access the second page
    * let secondPage: PdfPage = document.getPage(2);
    * // Create a new GoTo action with the specified page
    * let gotoAction: PdfGoToAction = new PdfGoToAction(secondPage);
    * // Set the destination location within the specified page for the PdfGoToAction
    * gotoAction.Destination = new PdfDestination(secondPage, [0, 100]);
    * // Set the GoTo action to the mouse enter property of the button field
    * field.actions.mouseEnter = gotoAction;
    * // Save the document
    * document.save('output.pdf');
    * // Destroy the document
    * document.destroy();
    */
    mouseEnter: PdfAction;
    /**
     * Get the action to be performed when the cursor exits the fields area.
     *
     * @returns {PdfAction} The action to be executed when the mouse exists the field area.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data);
     * // Access button field
     * let field: PdfButtonField = document.form.fieldAt(0) as PdfButtonField;
     * // Get the action to be executed when the mouse leave the field area.
     * let action: PdfAction = field.actions.mouseLeave;
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Set the action to be performed when the cursor exits the fields area.
    *
    * @param {PdfAction} value The action to be executed when the mouse exists the field area.
    *
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data);
    * // Access button field
    * let field: PdfButtonField = document.form.fieldAt(0) as PdfButtonField;
    * // Access the second page
    * let secondPage: PdfPage = document.getPage(2);
    * // Create a new GoTo action with the specified page
    * let gotoAction: PdfGoToAction = new PdfGoToAction(secondPage);
    * // Set the destination location within the specified page for the PdfGoToAction
    * gotoAction.Destination = new PdfDestination(secondPage, [0, 100]);
    * // Set the GoTo action to the mouse leave property of the button field
    * field.actions.mouseLeave = gotoAction;
    * // Save the document
    * document.save('output.pdf');
    * // Destroy the document
    * document.destroy();
    */
    mouseLeave: PdfAction;
    /**
     * Get the action to be performed when the mouse button is released inside the field area.
     *
     * @returns {PdfAction} The action to be executed when the mouse released inside the field area.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data);
     * // Access button field
     * let field: PdfButtonField = document.form.fieldAt(0) as PdfButtonField;
     * // Get the action to be executed when the mouse up the field area.
     * let action: PdfAction = field.actions.mouseUp;
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Set the action to be performed when the mouse button is released inside the field area.
    *
    * @param {PdfAction} value The action to be executed when the mouse released inside the field area.
    *
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data);
    * // Access button field
    * let field: PdfButtonField = document.form.fieldAt(0) as PdfButtonField;
    * // Access the second page
    * let secondPage: PdfPage = document.getPage(2);
    * // Create a new GoTo action with the specified page
    * let gotoAction: PdfGoToAction = new PdfGoToAction(secondPage);
    * // Set the destination location within the specified page for the PdfGoToAction
    * gotoAction.Destination = new PdfDestination(secondPage, [0, 100]);
    * // Set the GoTo action to the mouse up property of the button field
    * field.actions.mouseUp = gotoAction;
    * // Save the document
    * document.save('output.pdf');
    * // Destroy the document
    * document.destroy();
    */
    mouseUp: PdfAction;
    /**
     * Get the action to be performed when the mouse button is pressed inside the field’s area.
     *
     * @returns {PdfAction} The action to be executed when the mouse button is pressed inside the field area.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data);
     * // Access button field
     * let field: PdfButtonField = document.form.fieldAt(0) as PdfButtonField;
     * // Get the action to be executed when the mouse down the field area.
     * let action: PdfAction = field.actions.mouseDown;
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Set the action to be performed when the mouse button is pressed inside the field’s area.
    *
    * @param {PdfAction} value The action to be executed when the mouse button is pressed inside the field area.
    *
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data);
    * // Access button field
    * let field: PdfButtonField = document.form.fieldAt(0) as PdfButtonField;
    * // Access the second page
    * let secondPage: PdfPage = document.getPage(2);
    * // Create a new GoTo action with the specified page
    * let gotoAction: PdfGoToAction = new PdfGoToAction(secondPage);
    * // Set the destination location within the specified page for the PdfGoToAction
    * gotoAction.Destination = new PdfDestination(secondPage, [0, 100]);
    * // Set the GoTo action to the mouse down property of the button field
    * field.actions.mouseDown = gotoAction;
    * // Save the document
    * document.save('output.pdf');
    * // Destroy the document
    * document.destroy();
    */
    mouseDown: PdfAction;
    /**
     * Get the action to be performed when the field receives the input focus.
     *
     * @returns {PdfAction} The action to be executed when the field receives the input focus.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data);
     * // Access button field
     * let field: PdfButtonField = document.form.fieldAt(0) as PdfButtonField;
     * // Get the action to be executed when the got focus the field area.
     * let action: PdfAction = field.actions.gotFocus;
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Set the action to be performed when the field receives the input focus.
    *
    * @param {PdfAction} value The action to be executed when the field receives the input focus.
    *
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data);
    * // Access button field
    * let field: PdfButtonField = document.form.fieldAt(0) as PdfButtonField;
    * // Access the second page
    * let secondPage: PdfPage = document.getPage(2);
    * // Create a new GoTo action with the specified page
    * let gotoAction: PdfGoToAction = new PdfGoToAction(secondPage);
    * // Set the destination location within the specified page for the PdfGoToAction
    * gotoAction.Destination = new PdfDestination(secondPage, [0, 100]);
    * // Set the GoTo action to the got focus property of the button field
    * field.actions.gotFocus = gotoAction;
    * // Save the document
    * document.save('output.pdf');
    * // Destroy the document
    * document.destroy();
    */
    gotFocus: PdfAction;
    /**
     * Get the action to be performed when the field loses the input focus.
     *
     * @returns {PdfAction} The action to be executed when the field loses the input focus.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data);
     * // Access button field
     * let field: PdfButtonField = document.form.fieldAt(0) as PdfButtonField;
     * // Get the action to be executed when the lost focus the field area.
     * let action: PdfAction = field.actions.lostFocus;
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Set the action to be performed when the field loses the input focus.
    *
    * @param {PdfAction} value The action to be executed when the field loses the input focus.
    *
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data);
    * // Access button field
    * let field: PdfButtonField = document.form.fieldAt(0) as PdfButtonField;
    * // Access the second page
    * let secondPage: PdfPage = document.getPage(2);
    * // Create a new GoTo action with the specified page
    * let gotoAction: PdfGoToAction = new PdfGoToAction(secondPage);
    * // Set the destination location within the specified page for the PdfGoToAction
    * gotoAction.Destination = new PdfDestination(secondPage, [0, 100]);
    * // Set the GoTo action to the lost focus property of the button field
    * field.actions.lostFocus = gotoAction;
    * // Save the document
    * document.save('output.pdf');
    * // Destroy the document
    * document.destroy();
    */
    lostFocus: PdfAction;
    _updateAction(action: PdfAction, key: string): void;
    _getPdfAction(key: string): PdfAction;
}
