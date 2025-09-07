import { Directive, ContentChildren } from '@angular/core';
import { ComplexBase, ArrayBase, setValue } from '@syncfusion/ej2-angular-base';
import * as i0 from "@angular/core";
let input = ['disabled', 'iconCss', 'id', 'text', 'title'];
let outputs = [];
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
export class SpeedDialItemDirective extends ComplexBase {
    constructor(viewContainerRef) {
        super();
        this.viewContainerRef = viewContainerRef;
        setValue('currentInstance', this, this.viewContainerRef);
        this.registerEvents(outputs);
        this.directivePropList = input;
    }
}
SpeedDialItemDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SpeedDialItemDirective, deps: [{ token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Directive });
SpeedDialItemDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: SpeedDialItemDirective, selector: "e-speeddial-item", inputs: { disabled: "disabled", iconCss: "iconCss", id: "id", text: "text", title: "title" }, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SpeedDialItemDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'e-speeddial-item',
                    inputs: input,
                    outputs: outputs,
                    queries: {}
                }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }]; } });
/**
 * SpeedDialItem Array Directive
 * @private
 */
export class SpeedDialItemsDirective extends ArrayBase {
    constructor() {
        super('items');
    }
}
SpeedDialItemsDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SpeedDialItemsDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
SpeedDialItemsDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: SpeedDialItemsDirective, selector: "e-speeddial-items", queries: [{ propertyName: "children", predicate: SpeedDialItemDirective }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SpeedDialItemsDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'e-speeddial-items',
                    queries: {
                        children: new ContentChildren(SpeedDialItemDirective)
                    },
                }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbXMuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3NwZWVkLWRpYWwvaXRlbXMuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQW9CLGVBQWUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM3RSxPQUFPLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQzs7QUFJaEYsSUFBSSxLQUFLLEdBQWEsQ0FBQyxVQUFVLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDckUsSUFBSSxPQUFPLEdBQWEsRUFBRSxDQUFDO0FBQzNCOzs7Ozs7Ozs7OztHQVdHO0FBU0gsTUFBTSxPQUFPLHNCQUF1QixTQUFRLFdBQW1DO0lBaUMzRSxZQUFvQixnQkFBaUM7UUFDakQsS0FBSyxFQUFFLENBQUM7UUFEUSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWlCO1FBRWpELFFBQVEsQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDekQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM3QixJQUFJLENBQUMsaUJBQWlCLEdBQUcsS0FBSyxDQUFDO0lBQ25DLENBQUM7O21IQXRDUSxzQkFBc0I7dUdBQXRCLHNCQUFzQjsyRkFBdEIsc0JBQXNCO2tCQVJsQyxTQUFTO21CQUFDO29CQUNQLFFBQVEsRUFBRSxrQkFBa0I7b0JBQzVCLE1BQU0sRUFBRSxLQUFLO29CQUNiLE9BQU8sRUFBRSxPQUFPO29CQUNoQixPQUFPLEVBQUUsRUFFUjtpQkFDSjs7QUEwQ0Q7OztHQUdHO0FBT0gsTUFBTSxPQUFPLHVCQUF3QixTQUFRLFNBQWtDO0lBQzNFO1FBQ0ksS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ25CLENBQUM7O29IQUhRLHVCQUF1Qjt3R0FBdkIsdUJBQXVCLGtGQUhFLHNCQUFzQjsyRkFHL0MsdUJBQXVCO2tCQU5uQyxTQUFTO21CQUFDO29CQUNQLFFBQVEsRUFBRSxtQkFBbUI7b0JBQzdCLE9BQU8sRUFBRTt3QkFDTCxRQUFRLEVBQUUsSUFBSSxlQUFlLENBQUMsc0JBQXNCLENBQUM7cUJBQ3hEO2lCQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBWaWV3Q29udGFpbmVyUmVmLCBDb250ZW50Q2hpbGRyZW4gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbXBsZXhCYXNlLCBBcnJheUJhc2UsIHNldFZhbHVlIH0gZnJvbSAnQHN5bmNmdXNpb24vZWoyLWFuZ3VsYXItYmFzZSc7XG5cblxuXG5sZXQgaW5wdXQ6IHN0cmluZ1tdID0gWydkaXNhYmxlZCcsICdpY29uQ3NzJywgJ2lkJywgJ3RleHQnLCAndGl0bGUnXTtcbmxldCBvdXRwdXRzOiBzdHJpbmdbXSA9IFtdO1xuLyoqXG4gKiAnZS1zcGVlZGRpYWxpdGVtJyBkaXJlY3RpdmUgcmVwcmVzZW50IGEgaXRlbSBvZiB0aGUgQW5ndWxhciBTcGVlZERpYWwuXG4gKiBJdCBtdXN0IGJlIGNvbnRhaW5lZCBpbiBhIFNwZWVkRGlhbCBjb21wb25lbnQoYGVqcy1zcGVlZGRpYWxgKS4gXG4gKiBgYGBodG1sXG4gKiA8ZWpzLXNwZWVkZGlhbD4gXG4gKiAgIDxlLXNwZWVkZGlhbGl0ZW1zPlxuICogICAgPGUtc3BlZWRkaWFsaXRlbSB0ZXh0PSdDdXQnPjwvZS1zcGVlZGRpYWxpdGVtPlxuICogICAgPGUtc3BlZWRkaWFsaXRlbSB0ZXh0PSdDb3B5Jz48L2Utc3BlZWRkaWFsaXRlbT5cbiAqICAgPC9lLXNwZWVkZGlhbGl0ZW1zPlxuICogPC9lanMtc3BlZWRkaWFsPlxuICogYGBgXG4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnZS1zcGVlZGRpYWwtaXRlbScsXG4gICAgaW5wdXRzOiBpbnB1dCxcbiAgICBvdXRwdXRzOiBvdXRwdXRzLCAgICBcbiAgICBxdWVyaWVzOiB7XG5cbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIFNwZWVkRGlhbEl0ZW1EaXJlY3RpdmUgZXh0ZW5kcyBDb21wbGV4QmFzZTxTcGVlZERpYWxJdGVtRGlyZWN0aXZlPiB7XG4gICAgcHVibGljIGRpcmVjdGl2ZVByb3BMaXN0OiBhbnk7XG5cdFxuXG5cbiAgICAvKiogXG4gICAgICogRGVmaW5lcyB3aGV0aGVyIHRvIGVuYWJsZSBvciBkaXNhYmxlIHRoZSBTcGVlZERpYWxJdGVtLlxuICAgICAqIEBkZWZhdWx0IGZhbHNlXG4gICAgICovXG4gICAgcHVibGljIGRpc2FibGVkOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIERlZmluZXMgb25lIG9yIG1vcmUgQ1NTIGNsYXNzZXMgdG8gaW5jbHVkZSBhbiBpY29uIG9yIGltYWdlIGluIHNwZWVkIGRpYWwgaXRlbS5cbiAgICAgKiBAZGVmYXVsdCAnJ1xuICAgICAqL1xuICAgIHB1YmxpYyBpY29uQ3NzOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIERlZmluZXMgYSB1bmlxdWUgdmFsdWUgZm9yIHRoZSBTcGVlZERpYWxJdGVtIHdoaWNoIGNhbiBiZSB1c2VkIHRvIGlkZW50aWZ5IHRoZSBpdGVtIGluIGV2ZW50IGFyZ3MuXG4gICAgICogQGRlZmF1bHQgJydcbiAgICAgKi9cbiAgICBwdWJsaWMgaWQ6IGFueTtcbiAgICAvKiogXG4gICAgICogRGVmaW5lcyB0aGUgdGV4dCBjb250ZW50IG9mIFNwZWVkRGlhbEl0ZW0uIFxuICAgICAqIFRleHQgd29uJ3QgYmUgdmlzaWJsZSB3aGVuIG1vZGUgaXMgUmFkaWFsLiBcbiAgICAgKiBBbHNvLCBpbiBMaW5lYXIgbW9kZSwgdGV4dCB3b24ndCBiZSBkaXNwbGF5ZWQgd2hlbiBkaXJlY3Rpb24gaXMgTGVmdCBvciBSaWdodC5cbiAgICAgKiBAZGVmYXVsdCAnJ1xuICAgICAqL1xuICAgIHB1YmxpYyB0ZXh0OiBhbnk7XG4gICAgLyoqIFxuICAgICAqIERlZmluZXMgdGhlIHRpdGxlIG9mIFNwZWVkRGlhbEl0ZW0gdG8gZGlzcGxheSB0b29sdGlwLlxuICAgICAqIEBkZWZhdWx0ICcnXG4gICAgICovXG4gICAgcHVibGljIHRpdGxlOiBhbnk7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHZpZXdDb250YWluZXJSZWY6Vmlld0NvbnRhaW5lclJlZikge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICBzZXRWYWx1ZSgnY3VycmVudEluc3RhbmNlJywgdGhpcywgdGhpcy52aWV3Q29udGFpbmVyUmVmKTtcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50cyhvdXRwdXRzKTtcbiAgICAgICAgdGhpcy5kaXJlY3RpdmVQcm9wTGlzdCA9IGlucHV0O1xuICAgIH1cbn1cblxuLyoqXG4gKiBTcGVlZERpYWxJdGVtIEFycmF5IERpcmVjdGl2ZVxuICogQHByaXZhdGVcbiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdlLXNwZWVkZGlhbC1pdGVtcycsXG4gICAgcXVlcmllczoge1xuICAgICAgICBjaGlsZHJlbjogbmV3IENvbnRlbnRDaGlsZHJlbihTcGVlZERpYWxJdGVtRGlyZWN0aXZlKVxuICAgIH0sXG59KVxuZXhwb3J0IGNsYXNzIFNwZWVkRGlhbEl0ZW1zRGlyZWN0aXZlIGV4dGVuZHMgQXJyYXlCYXNlPFNwZWVkRGlhbEl0ZW1zRGlyZWN0aXZlPiB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCdpdGVtcycpO1xuICAgIH1cbn0iXX0=