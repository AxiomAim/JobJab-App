import { ViewContainerRef } from '@angular/core';
import { ComplexBase, ArrayBase } from '@syncfusion/ej2-angular-base';
import * as i0 from "@angular/core";
/**
 * 'e-step' directive represents a step of the Angular Stepper.
 * It must be contained in a Stepper component(`ejs-stepper`).
 * ```html
 * <ejs-stepper>
 *  <e-steps>
 *   <e-step [iconCss]='e-icons e-folder' [text]='Step 1' />
 *   <e-step [iconCss]='e-icons e-folder' [text]='Step 2' />
 *  </e-steps>
 * </ejs-stepper>
 * ```
 */
export declare class StepDirective extends ComplexBase<StepDirective> {
    private viewContainerRef;
    directivePropList: any;
    /**
     * Defines the CSS class to customize the step appearance.
     * @default ''
     */
    cssClass: any;
    /**
     * Defines whether a step is enabled or disabled.
     * @default false
     */
    disabled: any;
    /**
     * Defines the icon content of the step.
     * @default ''
     */
    iconCss: any;
    /**
     * Defines the state whether it is valid completion or not.
     * @asptype bool?
     * @default null
     */
    isValid: any;
    /**
     * Defines the label content of the step.
     * @default ''
     */
    label: any;
    /**
     * Defines whether the step is optionally to skip completion or not.
     * @default false
     */
    optional: any;
    /**
     * Defines the status of the step.
     * The possible values are
     * * NotStarted
     * * InProgress
     * * Completed
     * @isenumeration true
     * @default StepStatus.NotStarted
     * @asptype StepStatus
     */
    status: any;
    /**
     * Defines the text content of the step.
     * @default ''
     */
    text: any;
    constructor(viewContainerRef: ViewContainerRef);
    static ɵfac: i0.ɵɵFactoryDeclaration<StepDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<StepDirective, "ejs-stepper>e-steps>e-step", never, { "cssClass": "cssClass"; "disabled": "disabled"; "iconCss": "iconCss"; "isValid": "isValid"; "label": "label"; "optional": "optional"; "status": "status"; "text": "text"; }, {}, never>;
}
/**
 * Step Array Directive
 * @private
 */
export declare class StepsDirective extends ArrayBase<StepsDirective> {
    constructor();
    static ɵfac: i0.ɵɵFactoryDeclaration<StepsDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<StepsDirective, "ejs-stepper>e-steps", never, {}, {}, ["children"]>;
}
