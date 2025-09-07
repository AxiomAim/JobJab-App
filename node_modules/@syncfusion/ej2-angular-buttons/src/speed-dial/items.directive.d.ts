import { ViewContainerRef } from '@angular/core';
import { ComplexBase, ArrayBase } from '@syncfusion/ej2-angular-base';
import * as i0 from "@angular/core";
/**
 * 'e-speeddialitem' directive represent a item of the Angular SpeedDial.
 * It must be contained in a SpeedDial component(`ejs-speeddial`).
 * ```html
 * <ejs-speeddial>
 *   <e-speeddialitems>
 *    <e-speeddialitem text='Cut'></e-speeddialitem>
 *    <e-speeddialitem text='Copy'></e-speeddialitem>
 *   </e-speeddialitems>
 * </ejs-speeddial>
 * ```
 */
export declare class SpeedDialItemDirective extends ComplexBase<SpeedDialItemDirective> {
    private viewContainerRef;
    directivePropList: any;
    /**
     * Defines whether to enable or disable the SpeedDialItem.
     * @default false
     */
    disabled: any;
    /**
     * Defines one or more CSS classes to include an icon or image in speed dial item.
     * @default ''
     */
    iconCss: any;
    /**
     * Defines a unique value for the SpeedDialItem which can be used to identify the item in event args.
     * @default ''
     */
    id: any;
    /**
     * Defines the text content of SpeedDialItem.
     * Text won't be visible when mode is Radial.
     * Also, in Linear mode, text won't be displayed when direction is Left or Right.
     * @default ''
     */
    text: any;
    /**
     * Defines the title of SpeedDialItem to display tooltip.
     * @default ''
     */
    title: any;
    constructor(viewContainerRef: ViewContainerRef);
    static ɵfac: i0.ɵɵFactoryDeclaration<SpeedDialItemDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<SpeedDialItemDirective, "e-speeddial-item", never, { "disabled": "disabled"; "iconCss": "iconCss"; "id": "id"; "text": "text"; "title": "title"; }, {}, never>;
}
/**
 * SpeedDialItem Array Directive
 * @private
 */
export declare class SpeedDialItemsDirective extends ArrayBase<SpeedDialItemsDirective> {
    constructor();
    static ɵfac: i0.ɵɵFactoryDeclaration<SpeedDialItemsDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<SpeedDialItemsDirective, "e-speeddial-items", never, {}, {}, ["children"]>;
}
