import { Directive, ContentChildren } from '@angular/core';
import { ComplexBase, ArrayBase, setValue } from '@syncfusion/ej2-angular-base';
import * as i0 from "@angular/core";
let input = ['cssClass', 'disabled', 'iconCss', 'isValid', 'label', 'optional', 'status', 'text'];
let outputs = [];
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
export class StepDirective extends ComplexBase {
    constructor(viewContainerRef) {
        super();
        this.viewContainerRef = viewContainerRef;
        setValue('currentInstance', this, this.viewContainerRef);
        this.registerEvents(outputs);
        this.directivePropList = input;
    }
}
StepDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: StepDirective, deps: [{ token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Directive });
StepDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: StepDirective, selector: "ejs-stepper>e-steps>e-step", inputs: { cssClass: "cssClass", disabled: "disabled", iconCss: "iconCss", isValid: "isValid", label: "label", optional: "optional", status: "status", text: "text" }, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: StepDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ejs-stepper>e-steps>e-step',
                    inputs: input,
                    outputs: outputs,
                    queries: {}
                }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }]; } });
/**
 * Step Array Directive
 * @private
 */
export class StepsDirective extends ArrayBase {
    constructor() {
        super('steps');
    }
}
StepsDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: StepsDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
StepsDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: StepsDirective, selector: "ejs-stepper>e-steps", queries: [{ propertyName: "children", predicate: StepDirective }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: StepsDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ejs-stepper>e-steps',
                    queries: {
                        children: new ContentChildren(StepDirective)
                    },
                }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RlcHMuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3N0ZXBwZXIvc3RlcHMuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQW9CLGVBQWUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM3RSxPQUFPLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQzs7QUFJaEYsSUFBSSxLQUFLLEdBQWEsQ0FBQyxVQUFVLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDNUcsSUFBSSxPQUFPLEdBQWEsRUFBRSxDQUFDO0FBQzNCOzs7Ozs7Ozs7OztHQVdHO0FBU0gsTUFBTSxPQUFPLGFBQWMsU0FBUSxXQUEwQjtJQXFEekQsWUFBb0IsZ0JBQWlDO1FBQ2pELEtBQUssRUFBRSxDQUFDO1FBRFEscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFpQjtRQUVqRCxRQUFRLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ3pELElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDN0IsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEtBQUssQ0FBQztJQUNuQyxDQUFDOzswR0ExRFEsYUFBYTs4RkFBYixhQUFhOzJGQUFiLGFBQWE7a0JBUnpCLFNBQVM7bUJBQUM7b0JBQ1AsUUFBUSxFQUFFLDRCQUE0QjtvQkFDdEMsTUFBTSxFQUFFLEtBQUs7b0JBQ2IsT0FBTyxFQUFFLE9BQU87b0JBQ2hCLE9BQU8sRUFBRSxFQUVSO2lCQUNKOztBQThERDs7O0dBR0c7QUFPSCxNQUFNLE9BQU8sY0FBZSxTQUFRLFNBQXlCO0lBQ3pEO1FBQ0ksS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ25CLENBQUM7OzJHQUhRLGNBQWM7K0ZBQWQsY0FBYyxvRkFIVyxhQUFhOzJGQUd0QyxjQUFjO2tCQU4xQixTQUFTO21CQUFDO29CQUNQLFFBQVEsRUFBRSxxQkFBcUI7b0JBQy9CLE9BQU8sRUFBRTt3QkFDTCxRQUFRLEVBQUUsSUFBSSxlQUFlLENBQUMsYUFBYSxDQUFDO3FCQUMvQztpQkFDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgVmlld0NvbnRhaW5lclJlZiwgQ29udGVudENoaWxkcmVuIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21wbGV4QmFzZSwgQXJyYXlCYXNlLCBzZXRWYWx1ZSB9IGZyb20gJ0BzeW5jZnVzaW9uL2VqMi1hbmd1bGFyLWJhc2UnO1xuXG5cblxubGV0IGlucHV0OiBzdHJpbmdbXSA9IFsnY3NzQ2xhc3MnLCAnZGlzYWJsZWQnLCAnaWNvbkNzcycsICdpc1ZhbGlkJywgJ2xhYmVsJywgJ29wdGlvbmFsJywgJ3N0YXR1cycsICd0ZXh0J107XG5sZXQgb3V0cHV0czogc3RyaW5nW10gPSBbXTtcbi8qKlxuICogJ2Utc3RlcCcgZGlyZWN0aXZlIHJlcHJlc2VudHMgYSBzdGVwIG9mIHRoZSBBbmd1bGFyIFN0ZXBwZXIuXG4gKiBJdCBtdXN0IGJlIGNvbnRhaW5lZCBpbiBhIFN0ZXBwZXIgY29tcG9uZW50KGBlanMtc3RlcHBlcmApLiBcbiAqIGBgYGh0bWxcbiAqIDxlanMtc3RlcHBlcj5cbiAqICA8ZS1zdGVwcz5cbiAqICAgPGUtc3RlcCBbaWNvbkNzc109J2UtaWNvbnMgZS1mb2xkZXInIFt0ZXh0XT0nU3RlcCAxJyAvPlxuICogICA8ZS1zdGVwIFtpY29uQ3NzXT0nZS1pY29ucyBlLWZvbGRlcicgW3RleHRdPSdTdGVwIDInIC8+XG4gKiAgPC9lLXN0ZXBzPiBcbiAqIDwvZWpzLXN0ZXBwZXI+XG4gKiBgYGBcbiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdlanMtc3RlcHBlcj5lLXN0ZXBzPmUtc3RlcCcsXG4gICAgaW5wdXRzOiBpbnB1dCxcbiAgICBvdXRwdXRzOiBvdXRwdXRzLCAgICBcbiAgICBxdWVyaWVzOiB7XG5cbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIFN0ZXBEaXJlY3RpdmUgZXh0ZW5kcyBDb21wbGV4QmFzZTxTdGVwRGlyZWN0aXZlPiB7XG4gICAgcHVibGljIGRpcmVjdGl2ZVByb3BMaXN0OiBhbnk7XG5cdFxuXG5cbiAgICAvKiogXG4gICAgICogRGVmaW5lcyB0aGUgQ1NTIGNsYXNzIHRvIGN1c3RvbWl6ZSB0aGUgc3RlcCBhcHBlYXJhbmNlLlxuICAgICAqIEBkZWZhdWx0ICcnXG4gICAgICovXG4gICAgcHVibGljIGNzc0NsYXNzOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIERlZmluZXMgd2hldGhlciBhIHN0ZXAgaXMgZW5hYmxlZCBvciBkaXNhYmxlZC5cbiAgICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgICAqL1xuICAgIHB1YmxpYyBkaXNhYmxlZDogYW55O1xuICAgIC8qKiBcbiAgICAgKiBEZWZpbmVzIHRoZSBpY29uIGNvbnRlbnQgb2YgdGhlIHN0ZXAuXG4gICAgICogQGRlZmF1bHQgJydcbiAgICAgKi9cbiAgICBwdWJsaWMgaWNvbkNzczogYW55O1xuICAgIC8qKiBcbiAgICAgKiBEZWZpbmVzIHRoZSBzdGF0ZSB3aGV0aGVyIGl0IGlzIHZhbGlkIGNvbXBsZXRpb24gb3Igbm90LlxuICAgICAqIEBhc3B0eXBlIGJvb2w/XG4gICAgICogQGRlZmF1bHQgbnVsbFxuICAgICAqL1xuICAgIHB1YmxpYyBpc1ZhbGlkOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIERlZmluZXMgdGhlIGxhYmVsIGNvbnRlbnQgb2YgdGhlIHN0ZXAuXG4gICAgICogQGRlZmF1bHQgJydcbiAgICAgKi9cbiAgICBwdWJsaWMgbGFiZWw6IGFueTtcbiAgICAvKiogXG4gICAgICogRGVmaW5lcyB3aGV0aGVyIHRoZSBzdGVwIGlzIG9wdGlvbmFsbHkgdG8gc2tpcCBjb21wbGV0aW9uIG9yIG5vdC5cbiAgICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgICAqL1xuICAgIHB1YmxpYyBvcHRpb25hbDogYW55O1xuICAgIC8qKiBcbiAgICAgKiBEZWZpbmVzIHRoZSBzdGF0dXMgb2YgdGhlIHN0ZXAuIFxuICAgICAqIFRoZSBwb3NzaWJsZSB2YWx1ZXMgYXJlIFxuICAgICAqICogTm90U3RhcnRlZCBcbiAgICAgKiAqIEluUHJvZ3Jlc3MgXG4gICAgICogKiBDb21wbGV0ZWRcbiAgICAgKiBAaXNlbnVtZXJhdGlvbiB0cnVlXG4gICAgICogQGRlZmF1bHQgU3RlcFN0YXR1cy5Ob3RTdGFydGVkXG4gICAgICogQGFzcHR5cGUgU3RlcFN0YXR1c1xuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0dXM6IGFueTtcbiAgICAvKiogXG4gICAgICogRGVmaW5lcyB0aGUgdGV4dCBjb250ZW50IG9mIHRoZSBzdGVwLlxuICAgICAqIEBkZWZhdWx0ICcnXG4gICAgICovXG4gICAgcHVibGljIHRleHQ6IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgdmlld0NvbnRhaW5lclJlZjpWaWV3Q29udGFpbmVyUmVmKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHNldFZhbHVlKCdjdXJyZW50SW5zdGFuY2UnLCB0aGlzLCB0aGlzLnZpZXdDb250YWluZXJSZWYpO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnRzKG91dHB1dHMpO1xuICAgICAgICB0aGlzLmRpcmVjdGl2ZVByb3BMaXN0ID0gaW5wdXQ7XG4gICAgfVxufVxuXG4vKipcbiAqIFN0ZXAgQXJyYXkgRGlyZWN0aXZlXG4gKiBAcHJpdmF0ZVxuICovXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ2Vqcy1zdGVwcGVyPmUtc3RlcHMnLFxuICAgIHF1ZXJpZXM6IHtcbiAgICAgICAgY2hpbGRyZW46IG5ldyBDb250ZW50Q2hpbGRyZW4oU3RlcERpcmVjdGl2ZSlcbiAgICB9LFxufSlcbmV4cG9ydCBjbGFzcyBTdGVwc0RpcmVjdGl2ZSBleHRlbmRzIEFycmF5QmFzZTxTdGVwc0RpcmVjdGl2ZT4ge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcignc3RlcHMnKTtcbiAgICB9XG59Il19