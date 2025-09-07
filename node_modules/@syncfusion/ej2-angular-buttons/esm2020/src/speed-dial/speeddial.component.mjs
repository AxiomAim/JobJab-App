import { __decorate } from "tslib";
import { Component, ChangeDetectionStrategy, ContentChild } from '@angular/core';
import { ComponentBase, ComponentMixins, setValue } from '@syncfusion/ej2-angular-base';
import { SpeedDial } from '@syncfusion/ej2-buttons';
import { Template } from '@syncfusion/ej2-angular-base';
import { SpeedDialItemsDirective } from './items.directive';
import * as i0 from "@angular/core";
export const inputs = ['animation', 'closeIconCss', 'content', 'cssClass', 'direction', 'disabled', 'enablePersistence', 'enableRtl', 'iconPosition', 'isPrimary', 'itemTemplate', 'items', 'locale', 'modal', 'mode', 'openIconCss', 'opensOnHover', 'popupTemplate', 'position', 'radialSettings', 'target', 'visible'];
export const outputs = ['beforeClose', 'beforeItemRender', 'beforeOpen', 'clicked', 'created', 'onClose', 'onOpen', 'visibleChange'];
export const twoWays = ['visible'];
/**
 * Represents the Angular SpeedDial Component.
 * ```html
 * <button ejs-speeddial content='Edit'></button>
 * ```
 */
let SpeedDialComponent = class SpeedDialComponent extends SpeedDial {
    constructor(ngEle, srenderer, viewContainerRef, injector) {
        super();
        this.ngEle = ngEle;
        this.srenderer = srenderer;
        this.viewContainerRef = viewContainerRef;
        this.injector = injector;
        this.tags = ['items'];
        this.element = this.ngEle.nativeElement;
        this.injectedModules = this.injectedModules || [];
        this.registerEvents(outputs);
        this.addTwoWay.call(this, twoWays);
        setValue('currentInstance', this, this.viewContainerRef);
        this.containerContext = new ComponentBase();
    }
    ngOnInit() {
        this.containerContext.ngOnInit(this);
    }
    ngAfterViewInit() {
        this.containerContext.ngAfterViewInit(this);
    }
    ngOnDestroy() {
        this.containerContext.ngOnDestroy(this);
    }
    ngAfterContentChecked() {
        this.tagObjects[0].instance = this.childItems;
        this.containerContext.ngAfterContentChecked(this);
    }
};
SpeedDialComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SpeedDialComponent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ViewContainerRef }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
SpeedDialComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.3", type: SpeedDialComponent, selector: "[ejs-speeddial]", inputs: { animation: "animation", closeIconCss: "closeIconCss", content: "content", cssClass: "cssClass", direction: "direction", disabled: "disabled", enablePersistence: "enablePersistence", enableRtl: "enableRtl", iconPosition: "iconPosition", isPrimary: "isPrimary", itemTemplate: "itemTemplate", items: "items", locale: "locale", modal: "modal", mode: "mode", openIconCss: "openIconCss", opensOnHover: "opensOnHover", popupTemplate: "popupTemplate", position: "position", radialSettings: "radialSettings", target: "target", visible: "visible" }, outputs: { beforeClose: "beforeClose", beforeItemRender: "beforeItemRender", beforeOpen: "beforeOpen", clicked: "clicked", created: "created", onClose: "onClose", onOpen: "onOpen", visibleChange: "visibleChange" }, queries: [{ propertyName: "itemTemplate", first: true, predicate: ["itemTemplate"], descendants: true }, { propertyName: "popupTemplate", first: true, predicate: ["popupTemplate"], descendants: true }, { propertyName: "childItems", first: true, predicate: SpeedDialItemsDirective, descendants: true }], usesInheritance: true, ngImport: i0, template: `<ng-content ></ng-content>`, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
__decorate([
    Template()
], SpeedDialComponent.prototype, "itemTemplate", void 0);
__decorate([
    Template()
], SpeedDialComponent.prototype, "popupTemplate", void 0);
SpeedDialComponent = __decorate([
    ComponentMixins([ComponentBase])
], SpeedDialComponent);
export { SpeedDialComponent };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SpeedDialComponent, decorators: [{
            type: Component,
            args: [{
                    selector: '[ejs-speeddial]',
                    inputs: inputs,
                    outputs: outputs,
                    template: `<ng-content ></ng-content>`,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    queries: {
                        childItems: new ContentChild(SpeedDialItemsDirective)
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ViewContainerRef }, { type: i0.Injector }]; }, propDecorators: { itemTemplate: [{
                type: ContentChild,
                args: ['itemTemplate']
            }], popupTemplate: [{
                type: ContentChild,
                args: ['popupTemplate']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BlZWRkaWFsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zcGVlZC1kaWFsL3NwZWVkZGlhbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQXFELHVCQUF1QixFQUE0QixZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDOUosT0FBTyxFQUFFLGFBQWEsRUFBRSxlQUFlLEVBQXVELFFBQVEsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQzdJLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNwRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDeEQsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sbUJBQW1CLENBQUM7O0FBRTVELE1BQU0sQ0FBQyxNQUFNLE1BQU0sR0FBYSxDQUFDLFdBQVcsRUFBQyxjQUFjLEVBQUMsU0FBUyxFQUFDLFVBQVUsRUFBQyxXQUFXLEVBQUMsVUFBVSxFQUFDLG1CQUFtQixFQUFDLFdBQVcsRUFBQyxjQUFjLEVBQUMsV0FBVyxFQUFDLGNBQWMsRUFBQyxPQUFPLEVBQUMsUUFBUSxFQUFDLE9BQU8sRUFBQyxNQUFNLEVBQUMsYUFBYSxFQUFDLGNBQWMsRUFBQyxlQUFlLEVBQUMsVUFBVSxFQUFDLGdCQUFnQixFQUFDLFFBQVEsRUFBQyxTQUFTLENBQUMsQ0FBQztBQUMvUyxNQUFNLENBQUMsTUFBTSxPQUFPLEdBQWEsQ0FBQyxhQUFhLEVBQUMsa0JBQWtCLEVBQUMsWUFBWSxFQUFDLFNBQVMsRUFBQyxTQUFTLEVBQUMsU0FBUyxFQUFDLFFBQVEsRUFBQyxlQUFlLENBQUMsQ0FBQztBQUN4SSxNQUFNLENBQUMsTUFBTSxPQUFPLEdBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUU3Qzs7Ozs7R0FLRztJQVlVLGtCQUFrQixTQUFsQixrQkFBbUIsU0FBUSxTQUFTO0lBcUM3QyxZQUFvQixLQUFpQixFQUFVLFNBQW9CLEVBQVUsZ0JBQWlDLEVBQVUsUUFBa0I7UUFDdEksS0FBSyxFQUFFLENBQUM7UUFEUSxVQUFLLEdBQUwsS0FBSyxDQUFZO1FBQVUsY0FBUyxHQUFULFNBQVMsQ0FBVztRQUFVLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBaUI7UUFBVSxhQUFRLEdBQVIsUUFBUSxDQUFVO1FBekJuSSxTQUFJLEdBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQTJCOUIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQztRQUN4QyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxlQUFlLElBQUksRUFBRSxDQUFDO1FBRWxELElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDN0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ25DLFFBQVEsQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDekQsSUFBSSxDQUFDLGdCQUFnQixHQUFJLElBQUksYUFBYSxFQUFFLENBQUM7SUFDakQsQ0FBQztJQUVNLFFBQVE7UUFDWCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFFTSxlQUFlO1FBQ2xCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUVNLFdBQVc7UUFDZCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFFTSxxQkFBcUI7UUFDeEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUM5QyxJQUFJLENBQUMsZ0JBQWdCLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdEQsQ0FBQztDQUlKLENBQUE7K0dBbkVZLGtCQUFrQjttR0FBbEIsa0JBQWtCLDRoQ0FKTSx1QkFBdUIsdUVBSDlDLDRCQUE0QjtBQStCdEM7SUFEQyxRQUFRLEVBQUU7d0RBQ2M7QUFXekI7SUFEQyxRQUFRLEVBQUU7eURBQ2U7QUFuQ2pCLGtCQUFrQjtJQUQ5QixlQUFlLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQztHQUNwQixrQkFBa0IsQ0FtRTlCO1NBbkVZLGtCQUFrQjsyRkFBbEIsa0JBQWtCO2tCQVg5QixTQUFTO21CQUFDO29CQUNQLFFBQVEsRUFBRSxpQkFBaUI7b0JBQzNCLE1BQU0sRUFBRSxNQUFNO29CQUNkLE9BQU8sRUFBRSxPQUFPO29CQUNoQixRQUFRLEVBQUUsNEJBQTRCO29CQUN0QyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtvQkFDL0MsT0FBTyxFQUFFO3dCQUNMLFVBQVUsRUFBRSxJQUFJLFlBQVksQ0FBQyx1QkFBdUIsQ0FBQztxQkFDeEQ7aUJBQ0o7K0tBMEJVLFlBQVk7c0JBRmxCLFlBQVk7dUJBQUMsY0FBYztnQkFhckIsYUFBYTtzQkFGbkIsWUFBWTt1QkFBQyxlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBWaWV3Q29udGFpbmVyUmVmLCBSZW5kZXJlcjIsIEluamVjdG9yLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgUXVlcnlMaXN0LCBWYWx1ZVByb3ZpZGVyLCBDb250ZW50Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbXBvbmVudEJhc2UsIENvbXBvbmVudE1peGlucywgSUNvbXBvbmVudEJhc2UsIGFwcGx5TWl4aW5zLCBQcm9wZXJ0eUNvbGxlY3Rpb25JbmZvLCBzZXRWYWx1ZSB9IGZyb20gJ0BzeW5jZnVzaW9uL2VqMi1hbmd1bGFyLWJhc2UnO1xuaW1wb3J0IHsgU3BlZWREaWFsIH0gZnJvbSAnQHN5bmNmdXNpb24vZWoyLWJ1dHRvbnMnO1xuaW1wb3J0IHsgVGVtcGxhdGUgfSBmcm9tICdAc3luY2Z1c2lvbi9lajItYW5ndWxhci1iYXNlJztcbmltcG9ydCB7IFNwZWVkRGlhbEl0ZW1zRGlyZWN0aXZlIH0gZnJvbSAnLi9pdGVtcy5kaXJlY3RpdmUnO1xuXG5leHBvcnQgY29uc3QgaW5wdXRzOiBzdHJpbmdbXSA9IFsnYW5pbWF0aW9uJywnY2xvc2VJY29uQ3NzJywnY29udGVudCcsJ2Nzc0NsYXNzJywnZGlyZWN0aW9uJywnZGlzYWJsZWQnLCdlbmFibGVQZXJzaXN0ZW5jZScsJ2VuYWJsZVJ0bCcsJ2ljb25Qb3NpdGlvbicsJ2lzUHJpbWFyeScsJ2l0ZW1UZW1wbGF0ZScsJ2l0ZW1zJywnbG9jYWxlJywnbW9kYWwnLCdtb2RlJywnb3Blbkljb25Dc3MnLCdvcGVuc09uSG92ZXInLCdwb3B1cFRlbXBsYXRlJywncG9zaXRpb24nLCdyYWRpYWxTZXR0aW5ncycsJ3RhcmdldCcsJ3Zpc2libGUnXTtcbmV4cG9ydCBjb25zdCBvdXRwdXRzOiBzdHJpbmdbXSA9IFsnYmVmb3JlQ2xvc2UnLCdiZWZvcmVJdGVtUmVuZGVyJywnYmVmb3JlT3BlbicsJ2NsaWNrZWQnLCdjcmVhdGVkJywnb25DbG9zZScsJ29uT3BlbicsJ3Zpc2libGVDaGFuZ2UnXTtcbmV4cG9ydCBjb25zdCB0d29XYXlzOiBzdHJpbmdbXSA9IFsndmlzaWJsZSddO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgdGhlIEFuZ3VsYXIgU3BlZWREaWFsIENvbXBvbmVudC5cbiAqIGBgYGh0bWxcbiAqIDxidXR0b24gZWpzLXNwZWVkZGlhbCBjb250ZW50PSdFZGl0Jz48L2J1dHRvbj5cbiAqIGBgYFxuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ1tlanMtc3BlZWRkaWFsXScsXG4gICAgaW5wdXRzOiBpbnB1dHMsXG4gICAgb3V0cHV0czogb3V0cHV0cyxcbiAgICB0ZW1wbGF0ZTogYDxuZy1jb250ZW50ID48L25nLWNvbnRlbnQ+YCxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBxdWVyaWVzOiB7XG4gICAgICAgIGNoaWxkSXRlbXM6IG5ldyBDb250ZW50Q2hpbGQoU3BlZWREaWFsSXRlbXNEaXJlY3RpdmUpXG4gICAgfVxufSlcbkBDb21wb25lbnRNaXhpbnMoW0NvbXBvbmVudEJhc2VdKVxuZXhwb3J0IGNsYXNzIFNwZWVkRGlhbENvbXBvbmVudCBleHRlbmRzIFNwZWVkRGlhbCBpbXBsZW1lbnRzIElDb21wb25lbnRCYXNlIHtcbiAgICBwdWJsaWMgY29udGFpbmVyQ29udGV4dCA6IGFueTtcbiAgICBwdWJsaWMgdGFnT2JqZWN0czogYW55O1xuXHRiZWZvcmVDbG9zZTogYW55O1xuXHRiZWZvcmVJdGVtUmVuZGVyOiBhbnk7XG5cdGJlZm9yZU9wZW46IGFueTtcblx0Y2xpY2tlZDogYW55O1xuXHRjcmVhdGVkOiBhbnk7XG5cdG9uQ2xvc2U6IGFueTtcblx0b25PcGVuOiBhbnk7XG5cdHB1YmxpYyB2aXNpYmxlQ2hhbmdlOiBhbnk7XG4gICAgcHVibGljIGNoaWxkSXRlbXM6IFF1ZXJ5TGlzdDxTcGVlZERpYWxJdGVtc0RpcmVjdGl2ZT47XG4gICAgcHVibGljIHRhZ3M6IHN0cmluZ1tdID0gWydpdGVtcyddO1xuICAgIC8qKiBcbiAgICAgKiBEZWZpbmVzIHRoZSB0ZW1wbGF0ZSBjb250ZW50IGZvciB0aGUgc3BlZWQgZGlhbCBpdGVtLiBcbiAgICAgKiB7JSBjb2RlQmxvY2sgc3JjPSdzcGVlZGRpYWwvaXRlbVRlbXBsYXRlL2luZGV4Lm1kJyAlfXslIGVuZGNvZGVCbG9jayAlfVxuICAgICAqIEBkZWZhdWx0ICcnXG4gICAgICogQGFuZ3VsYXJ0eXBlIHN0cmluZyB8IG9iamVjdFxuICAgICAqIEByZWFjdHR5cGUgc3RyaW5nIHwgZnVuY3Rpb24gfCBKU1guRWxlbWVudFxuICAgICAqIEB2dWV0eXBlIHN0cmluZyB8IGZ1bmN0aW9uXG4gICAgICogQGFzcHR5cGUgc3RyaW5nXG4gICAgICovXG4gICAgQENvbnRlbnRDaGlsZCgnaXRlbVRlbXBsYXRlJylcbiAgICBAVGVtcGxhdGUoKVxuICAgIHB1YmxpYyBpdGVtVGVtcGxhdGU6IGFueTtcbiAgICAvKiogXG4gICAgICogRGVmaW5lcyBhIHRlbXBsYXRlIGNvbnRlbnQgZm9yIHBvcHVwIG9mIFNwZWVkRGlhbC5cbiAgICAgKiBAZGVmYXVsdCAnJ1xuICAgICAqIEBhbmd1bGFydHlwZSBzdHJpbmcgfCBvYmplY3RcbiAgICAgKiBAcmVhY3R0eXBlIHN0cmluZyB8IGZ1bmN0aW9uIHwgSlNYLkVsZW1lbnRcbiAgICAgKiBAdnVldHlwZSBzdHJpbmcgfCBmdW5jdGlvblxuICAgICAqIEBhc3B0eXBlIHN0cmluZ1xuICAgICAqL1xuICAgIEBDb250ZW50Q2hpbGQoJ3BvcHVwVGVtcGxhdGUnKVxuICAgIEBUZW1wbGF0ZSgpXG4gICAgcHVibGljIHBvcHVwVGVtcGxhdGU6IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgbmdFbGU6IEVsZW1lbnRSZWYsIHByaXZhdGUgc3JlbmRlcmVyOiBSZW5kZXJlcjIsIHByaXZhdGUgdmlld0NvbnRhaW5lclJlZjpWaWV3Q29udGFpbmVyUmVmLCBwcml2YXRlIGluamVjdG9yOiBJbmplY3Rvcikge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmVsZW1lbnQgPSB0aGlzLm5nRWxlLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICAgIHRoaXMuaW5qZWN0ZWRNb2R1bGVzID0gdGhpcy5pbmplY3RlZE1vZHVsZXMgfHwgW107XG5cbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50cyhvdXRwdXRzKTtcbiAgICAgICAgdGhpcy5hZGRUd29XYXkuY2FsbCh0aGlzLCB0d29XYXlzKTtcbiAgICAgICAgc2V0VmFsdWUoJ2N1cnJlbnRJbnN0YW5jZScsIHRoaXMsIHRoaXMudmlld0NvbnRhaW5lclJlZik7XG4gICAgICAgIHRoaXMuY29udGFpbmVyQ29udGV4dCAgPSBuZXcgQ29tcG9uZW50QmFzZSgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5jb250YWluZXJDb250ZXh0Lm5nT25Jbml0KHRoaXMpO1xuICAgIH1cblxuICAgIHB1YmxpYyBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuY29udGFpbmVyQ29udGV4dC5uZ0FmdGVyVmlld0luaXQodGhpcyk7XG4gICAgfVxuXG4gICAgcHVibGljIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmNvbnRhaW5lckNvbnRleHQubmdPbkRlc3Ryb3kodGhpcyk7XG4gICAgfVxuXG4gICAgcHVibGljIG5nQWZ0ZXJDb250ZW50Q2hlY2tlZCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy50YWdPYmplY3RzWzBdLmluc3RhbmNlID0gdGhpcy5jaGlsZEl0ZW1zO1xuICAgICAgICB0aGlzLmNvbnRhaW5lckNvbnRleHQubmdBZnRlckNvbnRlbnRDaGVja2VkKHRoaXMpO1xuICAgIH1cblxuICAgIHB1YmxpYyByZWdpc3RlckV2ZW50czogKGV2ZW50TGlzdDogc3RyaW5nW10pID0+IHZvaWQ7XG4gICAgcHVibGljIGFkZFR3b1dheTogKHByb3BMaXN0OiBzdHJpbmdbXSkgPT4gdm9pZDtcbn1cblxuIl19