import { __decorate } from "tslib";
import { Component, ChangeDetectionStrategy, ContentChild } from '@angular/core';
import { ComponentBase, ComponentMixins, setValue } from '@syncfusion/ej2-angular-base';
import { Dialog } from '@syncfusion/ej2-popups';
import { Template } from '@syncfusion/ej2-angular-base';
import { ButtonsDirective } from './buttons.directive';
import * as i0 from "@angular/core";
export const inputs = ['allowDragging', 'animationSettings', 'buttons', 'closeOnEscape', 'content', 'cssClass', 'enableHtmlSanitizer', 'enablePersistence', 'enableResize', 'enableRtl', 'footerTemplate', 'header', 'height', 'isModal', 'locale', 'minHeight', 'position', 'resizeHandles', 'showCloseIcon', 'target', 'visible', 'width', 'zIndex'];
export const outputs = ['beforeClose', 'beforeOpen', 'beforeSanitizeHtml', 'close', 'created', 'destroyed', 'drag', 'dragStart', 'dragStop', 'open', 'overlayClick', 'resizeStart', 'resizeStop', 'resizing', 'visibleChange'];
export const twoWays = ['visible'];
/**
 * Represents the Angular Dialog Component
 * ```html
 * <ejs-dialog></ejs-dialog>
 * ```
 */
let DialogComponent = class DialogComponent extends Dialog {
    constructor(ngEle, srenderer, viewContainerRef, injector) {
        super();
        this.ngEle = ngEle;
        this.srenderer = srenderer;
        this.viewContainerRef = viewContainerRef;
        this.injector = injector;
        this.tags = ['buttons'];
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
        this.tagObjects[0].instance = this.childButtons;
        this.containerContext.ngAfterContentChecked(this);
    }
};
DialogComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: DialogComponent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ViewContainerRef }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
DialogComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.3", type: DialogComponent, selector: "ejs-dialog", inputs: { allowDragging: "allowDragging", animationSettings: "animationSettings", buttons: "buttons", closeOnEscape: "closeOnEscape", content: "content", cssClass: "cssClass", enableHtmlSanitizer: "enableHtmlSanitizer", enablePersistence: "enablePersistence", enableResize: "enableResize", enableRtl: "enableRtl", footerTemplate: "footerTemplate", header: "header", height: "height", isModal: "isModal", locale: "locale", minHeight: "minHeight", position: "position", resizeHandles: "resizeHandles", showCloseIcon: "showCloseIcon", target: "target", visible: "visible", width: "width", zIndex: "zIndex" }, outputs: { beforeClose: "beforeClose", beforeOpen: "beforeOpen", beforeSanitizeHtml: "beforeSanitizeHtml", close: "close", created: "created", destroyed: "destroyed", drag: "drag", dragStart: "dragStart", dragStop: "dragStop", open: "open", overlayClick: "overlayClick", resizeStart: "resizeStart", resizeStop: "resizeStop", resizing: "resizing", visibleChange: "visibleChange" }, queries: [{ propertyName: "footerTemplate", first: true, predicate: ["footerTemplate"], descendants: true }, { propertyName: "header", first: true, predicate: ["header"], descendants: true }, { propertyName: "content", first: true, predicate: ["content"], descendants: true }, { propertyName: "childButtons", first: true, predicate: ButtonsDirective, descendants: true }], usesInheritance: true, ngImport: i0, template: `<ng-content ></ng-content>`, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
__decorate([
    Template()
], DialogComponent.prototype, "footerTemplate", void 0);
__decorate([
    Template()
], DialogComponent.prototype, "header", void 0);
__decorate([
    Template()
], DialogComponent.prototype, "content", void 0);
DialogComponent = __decorate([
    ComponentMixins([ComponentBase])
], DialogComponent);
export { DialogComponent };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: DialogComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ejs-dialog',
                    inputs: inputs,
                    outputs: outputs,
                    template: `<ng-content ></ng-content>`,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    queries: {
                        childButtons: new ContentChild(ButtonsDirective)
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ViewContainerRef }, { type: i0.Injector }]; }, propDecorators: { footerTemplate: [{
                type: ContentChild,
                args: ['footerTemplate']
            }], header: [{
                type: ContentChild,
                args: ['header']
            }], content: [{
                type: ContentChild,
                args: ['content']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9kaWFsb2cvZGlhbG9nLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBcUQsdUJBQXVCLEVBQTRCLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5SixPQUFPLEVBQUUsYUFBYSxFQUFFLGVBQWUsRUFBdUQsUUFBUSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDN0ksT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ2hELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQzs7QUFFdkQsTUFBTSxDQUFDLE1BQU0sTUFBTSxHQUFhLENBQUMsZUFBZSxFQUFDLG1CQUFtQixFQUFDLFNBQVMsRUFBQyxlQUFlLEVBQUMsU0FBUyxFQUFDLFVBQVUsRUFBQyxxQkFBcUIsRUFBQyxtQkFBbUIsRUFBQyxjQUFjLEVBQUMsV0FBVyxFQUFDLGdCQUFnQixFQUFDLFFBQVEsRUFBQyxRQUFRLEVBQUMsU0FBUyxFQUFDLFFBQVEsRUFBQyxXQUFXLEVBQUMsVUFBVSxFQUFDLGVBQWUsRUFBQyxlQUFlLEVBQUMsUUFBUSxFQUFDLFNBQVMsRUFBQyxPQUFPLEVBQUMsUUFBUSxDQUFDLENBQUM7QUFDM1UsTUFBTSxDQUFDLE1BQU0sT0FBTyxHQUFhLENBQUMsYUFBYSxFQUFDLFlBQVksRUFBQyxvQkFBb0IsRUFBQyxPQUFPLEVBQUMsU0FBUyxFQUFDLFdBQVcsRUFBQyxNQUFNLEVBQUMsV0FBVyxFQUFDLFVBQVUsRUFBQyxNQUFNLEVBQUMsY0FBYyxFQUFDLGFBQWEsRUFBQyxZQUFZLEVBQUMsVUFBVSxFQUFDLGVBQWUsQ0FBQyxDQUFDO0FBQzNOLE1BQU0sQ0FBQyxNQUFNLE9BQU8sR0FBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBRTdDOzs7OztHQUtHO0lBWVUsZUFBZSxTQUFmLGVBQWdCLFNBQVEsTUFBTTtJQThEdkMsWUFBb0IsS0FBaUIsRUFBVSxTQUFvQixFQUFVLGdCQUFpQyxFQUFVLFFBQWtCO1FBQ3RJLEtBQUssRUFBRSxDQUFDO1FBRFEsVUFBSyxHQUFMLEtBQUssQ0FBWTtRQUFVLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFBVSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWlCO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQTNDbkksU0FBSSxHQUFhLENBQUMsU0FBUyxDQUFDLENBQUM7UUE2Q2hDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUM7UUFDeEMsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsZUFBZSxJQUFJLEVBQUUsQ0FBQztRQUVsRCxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzdCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNuQyxRQUFRLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ3pELElBQUksQ0FBQyxnQkFBZ0IsR0FBSSxJQUFJLGFBQWEsRUFBRSxDQUFDO0lBQ2pELENBQUM7SUFFTSxRQUFRO1FBQ1gsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBRU0sZUFBZTtRQUNsQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFFTSxXQUFXO1FBQ2QsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBRU0scUJBQXFCO1FBQ3hCLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7UUFDaEQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3RELENBQUM7Q0FJSixDQUFBOzRHQTVGWSxlQUFlO2dHQUFmLGVBQWUsazBDQUpXLGdCQUFnQix1RUFIekMsNEJBQTRCO0FBeUN0QztJQURDLFFBQVEsRUFBRTt1REFDZ0I7QUFVM0I7SUFEQyxRQUFRLEVBQUU7K0NBQ1E7QUFnQm5CO0lBREMsUUFBUSxFQUFFO2dEQUNTO0FBNURYLGVBQWU7SUFEM0IsZUFBZSxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUM7R0FDcEIsZUFBZSxDQTRGM0I7U0E1RlksZUFBZTsyRkFBZixlQUFlO2tCQVgzQixTQUFTO21CQUFDO29CQUNQLFFBQVEsRUFBRSxZQUFZO29CQUN0QixNQUFNLEVBQUUsTUFBTTtvQkFDZCxPQUFPLEVBQUUsT0FBTztvQkFDaEIsUUFBUSxFQUFFLDRCQUE0QjtvQkFDdEMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07b0JBQy9DLE9BQU8sRUFBRTt3QkFDTCxZQUFZLEVBQUUsSUFBSSxZQUFZLENBQUMsZ0JBQWdCLENBQUM7cUJBQ25EO2lCQUNKOytLQW9DVSxjQUFjO3NCQUZwQixZQUFZO3VCQUFDLGdCQUFnQjtnQkFZdkIsTUFBTTtzQkFGWixZQUFZO3VCQUFDLFFBQVE7Z0JBa0JmLE9BQU87c0JBRmIsWUFBWTt1QkFBQyxTQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBWaWV3Q29udGFpbmVyUmVmLCBSZW5kZXJlcjIsIEluamVjdG9yLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgUXVlcnlMaXN0LCBWYWx1ZVByb3ZpZGVyLCBDb250ZW50Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbXBvbmVudEJhc2UsIENvbXBvbmVudE1peGlucywgSUNvbXBvbmVudEJhc2UsIGFwcGx5TWl4aW5zLCBQcm9wZXJ0eUNvbGxlY3Rpb25JbmZvLCBzZXRWYWx1ZSB9IGZyb20gJ0BzeW5jZnVzaW9uL2VqMi1hbmd1bGFyLWJhc2UnO1xuaW1wb3J0IHsgRGlhbG9nIH0gZnJvbSAnQHN5bmNmdXNpb24vZWoyLXBvcHVwcyc7XG5pbXBvcnQgeyBUZW1wbGF0ZSB9IGZyb20gJ0BzeW5jZnVzaW9uL2VqMi1hbmd1bGFyLWJhc2UnO1xuaW1wb3J0IHsgQnV0dG9uc0RpcmVjdGl2ZSB9IGZyb20gJy4vYnV0dG9ucy5kaXJlY3RpdmUnO1xuXG5leHBvcnQgY29uc3QgaW5wdXRzOiBzdHJpbmdbXSA9IFsnYWxsb3dEcmFnZ2luZycsJ2FuaW1hdGlvblNldHRpbmdzJywnYnV0dG9ucycsJ2Nsb3NlT25Fc2NhcGUnLCdjb250ZW50JywnY3NzQ2xhc3MnLCdlbmFibGVIdG1sU2FuaXRpemVyJywnZW5hYmxlUGVyc2lzdGVuY2UnLCdlbmFibGVSZXNpemUnLCdlbmFibGVSdGwnLCdmb290ZXJUZW1wbGF0ZScsJ2hlYWRlcicsJ2hlaWdodCcsJ2lzTW9kYWwnLCdsb2NhbGUnLCdtaW5IZWlnaHQnLCdwb3NpdGlvbicsJ3Jlc2l6ZUhhbmRsZXMnLCdzaG93Q2xvc2VJY29uJywndGFyZ2V0JywndmlzaWJsZScsJ3dpZHRoJywnekluZGV4J107XG5leHBvcnQgY29uc3Qgb3V0cHV0czogc3RyaW5nW10gPSBbJ2JlZm9yZUNsb3NlJywnYmVmb3JlT3BlbicsJ2JlZm9yZVNhbml0aXplSHRtbCcsJ2Nsb3NlJywnY3JlYXRlZCcsJ2Rlc3Ryb3llZCcsJ2RyYWcnLCdkcmFnU3RhcnQnLCdkcmFnU3RvcCcsJ29wZW4nLCdvdmVybGF5Q2xpY2snLCdyZXNpemVTdGFydCcsJ3Jlc2l6ZVN0b3AnLCdyZXNpemluZycsJ3Zpc2libGVDaGFuZ2UnXTtcbmV4cG9ydCBjb25zdCB0d29XYXlzOiBzdHJpbmdbXSA9IFsndmlzaWJsZSddO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgdGhlIEFuZ3VsYXIgRGlhbG9nIENvbXBvbmVudFxuICogYGBgaHRtbFxuICogPGVqcy1kaWFsb2c+PC9lanMtZGlhbG9nPlxuICogYGBgXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnZWpzLWRpYWxvZycsXG4gICAgaW5wdXRzOiBpbnB1dHMsXG4gICAgb3V0cHV0czogb3V0cHV0cyxcbiAgICB0ZW1wbGF0ZTogYDxuZy1jb250ZW50ID48L25nLWNvbnRlbnQ+YCxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBxdWVyaWVzOiB7XG4gICAgICAgIGNoaWxkQnV0dG9uczogbmV3IENvbnRlbnRDaGlsZChCdXR0b25zRGlyZWN0aXZlKVxuICAgIH1cbn0pXG5AQ29tcG9uZW50TWl4aW5zKFtDb21wb25lbnRCYXNlXSlcbmV4cG9ydCBjbGFzcyBEaWFsb2dDb21wb25lbnQgZXh0ZW5kcyBEaWFsb2cgaW1wbGVtZW50cyBJQ29tcG9uZW50QmFzZSB7XG4gICAgcHVibGljIGNvbnRhaW5lckNvbnRleHQgOiBhbnk7XG4gICAgcHVibGljIHRhZ09iamVjdHM6IGFueTtcblx0YmVmb3JlQ2xvc2U6IGFueTtcblx0YmVmb3JlT3BlbjogYW55O1xuXHRiZWZvcmVTYW5pdGl6ZUh0bWw6IGFueTtcblx0Y2xvc2U6IGFueTtcblx0Y3JlYXRlZDogYW55O1xuXHRkZXN0cm95ZWQ6IGFueTtcblx0ZHJhZzogYW55O1xuXHRkcmFnU3RhcnQ6IGFueTtcblx0ZHJhZ1N0b3A6IGFueTtcblx0b3BlbjogYW55O1xuXHRvdmVybGF5Q2xpY2s6IGFueTtcblx0cmVzaXplU3RhcnQ6IGFueTtcblx0cmVzaXplU3RvcDogYW55O1xuXHRyZXNpemluZzogYW55O1xuXHRwdWJsaWMgdmlzaWJsZUNoYW5nZTogYW55O1xuICAgIHB1YmxpYyBjaGlsZEJ1dHRvbnM6IFF1ZXJ5TGlzdDxCdXR0b25zRGlyZWN0aXZlPjtcbiAgICBwdWJsaWMgdGFnczogc3RyaW5nW10gPSBbJ2J1dHRvbnMnXTtcbiAgICAvKiogXG4gICAgICogU3BlY2lmaWVzIHRoZSB0ZW1wbGF0ZSB2YWx1ZSB0aGF0IGNhbiBiZSBkaXNwbGF5ZWQgd2l0aCBkaWFsb2cncyBmb290ZXIgYXJlYS4gXG4gICAgICogVGhpcyBpcyBvcHRpb25hbCBwcm9wZXJ0eSBhbmQgY2FuIGJlIHVzZWQgb25seSB3aGVuIHRoZSBmb290ZXIgaXMgb2NjdXBpZWQgd2l0aCBpbmZvcm1hdGlvbiBvciBjdXN0b20gY29tcG9uZW50cy4gXG4gICAgICogQnkgZGVmYXVsdCwgdGhlIGZvb3RlciBpcyBjb25maWd1cmVkIHdpdGggYWN0aW9uIFtidXR0b25zXSgjYnV0dG9ucykuIFxuICAgICAqIElmIGZvb3RlciB0ZW1wbGF0ZSBpcyBjb25maWd1cmVkIHRvIGRpYWxvZywgdGhlIGFjdGlvbiBidXR0b25zIHByb3BlcnR5IHdpbGwgYmUgZGlzYWJsZWQuXG4gICAgICogXG4gICAgICogPiBNb3JlIGluZm9ybWF0aW9uIG9uIHRoZSBmb290ZXIgdGVtcGxhdGUgY29uZmlndXJhdGlvbiBjYW4gYmUgZm91bmQgb24gdGhpcyBbZG9jdW1lbnRhdGlvbl0oLi4vLi4vZGlhbG9nL3RlbXBsYXRlLyNmb290ZXIpIHNlY3Rpb24uXG4gICAgICogICAgIFxuICAgICAqIEBkZWZhdWx0ICcnXG4gICAgICogQGJsYXpvcnR5cGUgc3RyaW5nXG4gICAgICogQGFzcHR5cGUgc3RyaW5nXG4gICAgICovXG4gICAgQENvbnRlbnRDaGlsZCgnZm9vdGVyVGVtcGxhdGUnKVxuICAgIEBUZW1wbGF0ZSgpXG4gICAgcHVibGljIGZvb3RlclRlbXBsYXRlOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIFNwZWNpZmllcyB0aGUgdmFsdWUgdGhhdCBjYW4gYmUgZGlzcGxheWVkIGluIHRoZSBkaWFsb2cncyB0aXRsZSBhcmVhIHRoYXQgY2FuIGJlIGNvbmZpZ3VyZWQgd2l0aCBwbGFpbiB0ZXh0IG9yIEhUTUwgZWxlbWVudHMuIFxuICAgICAqIFRoaXMgaXMgb3B0aW9uYWwgcHJvcGVydHkgYW5kIHRoZSBkaWFsb2cgY2FuIGJlIGRpc3BsYXllZCB3aXRob3V0IGhlYWRlciwgaWYgdGhlIGhlYWRlciBwcm9wZXJ0eSBpcyBudWxsLlxuICAgICAqIEBkZWZhdWx0ICcnXG4gICAgICogQGJsYXpvcnR5cGUgc3RyaW5nXG4gICAgICogQGFzcHR5cGUgc3RyaW5nXG4gICAgICovXG4gICAgQENvbnRlbnRDaGlsZCgnaGVhZGVyJylcbiAgICBAVGVtcGxhdGUoKVxuICAgIHB1YmxpYyBoZWFkZXI6IGFueTtcbiAgICAvKiogXG4gICAgICogU3BlY2lmaWVzIHRoZSB2YWx1ZSB0aGF0IGNhbiBiZSBkaXNwbGF5ZWQgaW4gZGlhbG9nJ3MgY29udGVudCBhcmVhLiBcbiAgICAgKiBJdCBjYW4gYmUgaW5mb3JtYXRpb24sIGxpc3QsIG9yIG90aGVyIEhUTUwgZWxlbWVudHMuIFxuICAgICAqIFRoZSBjb250ZW50IG9mIGRpYWxvZyBjYW4gYmUgbG9hZGVkIHdpdGggZHluYW1pYyBkYXRhIHN1Y2ggYXMgZGF0YWJhc2UsIEFKQVggY29udGVudCwgYW5kIG1vcmUuXG4gICAgICogXG4gICAgICogeyUgY29kZUJsb2NrIHNyYz1cImRpYWxvZy9jb250ZW50LWFwaS9pbmRleC50c1wiICV9eyUgZW5kY29kZUJsb2NrICV9XG4gICAgICpcbiAgICAgKnslIGNvZGVCbG9jayBzcmM9XCJkaWFsb2cvY29udGVudC1hcGkvaW5kZXguaHRtbFwiICV9eyUgZW5kY29kZUJsb2NrICV9XG4gICAgICogICAgIFxuICAgICAqIEBkZWZhdWx0ICcnXG4gICAgICogQGJsYXpvcnR5cGUgc3RyaW5nXG4gICAgICogQGFzcHR5cGUgc3RyaW5nXG4gICAgICovXG4gICAgQENvbnRlbnRDaGlsZCgnY29udGVudCcpXG4gICAgQFRlbXBsYXRlKClcbiAgICBwdWJsaWMgY29udGVudDogYW55O1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBuZ0VsZTogRWxlbWVudFJlZiwgcHJpdmF0ZSBzcmVuZGVyZXI6IFJlbmRlcmVyMiwgcHJpdmF0ZSB2aWV3Q29udGFpbmVyUmVmOlZpZXdDb250YWluZXJSZWYsIHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuZWxlbWVudCA9IHRoaXMubmdFbGUubmF0aXZlRWxlbWVudDtcbiAgICAgICAgdGhpcy5pbmplY3RlZE1vZHVsZXMgPSB0aGlzLmluamVjdGVkTW9kdWxlcyB8fCBbXTtcblxuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnRzKG91dHB1dHMpO1xuICAgICAgICB0aGlzLmFkZFR3b1dheS5jYWxsKHRoaXMsIHR3b1dheXMpO1xuICAgICAgICBzZXRWYWx1ZSgnY3VycmVudEluc3RhbmNlJywgdGhpcywgdGhpcy52aWV3Q29udGFpbmVyUmVmKTtcbiAgICAgICAgdGhpcy5jb250YWluZXJDb250ZXh0ICA9IG5ldyBDb21wb25lbnRCYXNlKCk7XG4gICAgfVxuXG4gICAgcHVibGljIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmNvbnRhaW5lckNvbnRleHQubmdPbkluaXQodGhpcyk7XG4gICAgfVxuXG4gICAgcHVibGljIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jb250YWluZXJDb250ZXh0Lm5nQWZ0ZXJWaWV3SW5pdCh0aGlzKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMuY29udGFpbmVyQ29udGV4dC5uZ09uRGVzdHJveSh0aGlzKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdBZnRlckNvbnRlbnRDaGVja2VkKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnRhZ09iamVjdHNbMF0uaW5zdGFuY2UgPSB0aGlzLmNoaWxkQnV0dG9ucztcbiAgICAgICAgdGhpcy5jb250YWluZXJDb250ZXh0Lm5nQWZ0ZXJDb250ZW50Q2hlY2tlZCh0aGlzKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcmVnaXN0ZXJFdmVudHM6IChldmVudExpc3Q6IHN0cmluZ1tdKSA9PiB2b2lkO1xuICAgIHB1YmxpYyBhZGRUd29XYXk6IChwcm9wTGlzdDogc3RyaW5nW10pID0+IHZvaWQ7XG59XG5cbiJdfQ==