import { __decorate } from "tslib";
import { Component, ChangeDetectionStrategy, ContentChild } from '@angular/core';
import { ComponentBase, ComponentMixins, setValue } from '@syncfusion/ej2-angular-base';
import { Kanban } from '@syncfusion/ej2-kanban';
import { Template } from '@syncfusion/ej2-angular-base';
import { ColumnsDirective } from './columns.directive';
import { StackedHeadersDirective } from './stackedheaders.directive';
import * as i0 from "@angular/core";
export const inputs = ['allowDragAndDrop', 'allowKeyboard', 'cardHeight', 'cardSettings', 'columns', 'constraintType', 'cssClass', 'dataSource', 'dialogSettings', 'enableHtmlSanitizer', 'enablePersistence', 'enableRtl', 'enableTooltip', 'enableVirtualization', 'externalDropId', 'height', 'keyField', 'locale', 'query', 'showEmptyColumn', 'sortSettings', 'stackedHeaders', 'swimlaneSettings', 'tooltipTemplate', 'width'];
export const outputs = ['actionBegin', 'actionComplete', 'actionFailure', 'cardClick', 'cardDoubleClick', 'cardRendered', 'created', 'dataBinding', 'dataBound', 'dataSourceChanged', 'dataStateChange', 'dialogClose', 'dialogOpen', 'drag', 'dragStart', 'dragStop', 'queryCellInfo'];
export const twoWays = [''];
/**
 * `ej-kanban` represents the Angular Kanban Component.
 * ```html
 * <ejs-kanban></ejs-kanban>
 * ```
 */
let KanbanComponent = class KanbanComponent extends Kanban {
    constructor(ngEle, srenderer, viewContainerRef, injector) {
        super();
        this.ngEle = ngEle;
        this.srenderer = srenderer;
        this.viewContainerRef = viewContainerRef;
        this.injector = injector;
        this.tags = ['columns', 'stackedHeaders'];
        this.element = this.ngEle.nativeElement;
        this.injectedModules = this.injectedModules || [];
        this.registerEvents(outputs);
        this.addTwoWay.call(this, twoWays);
        setValue('currentInstance', this, this.viewContainerRef);
        this.context = new ComponentBase();
    }
    ngOnInit() {
        this.context.ngOnInit(this);
    }
    ngAfterViewInit() {
        this.context.ngAfterViewInit(this);
    }
    ngOnDestroy() {
        this.context.ngOnDestroy(this);
    }
    ngAfterContentChecked() {
        this.tagObjects[0].instance = this.childColumns;
        if (this.childStackedHeaders) {
            this.tagObjects[1].instance = this.childStackedHeaders;
        }
        this.context.ngAfterContentChecked(this);
    }
};
KanbanComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: KanbanComponent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ViewContainerRef }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
KanbanComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.3", type: KanbanComponent, selector: "ejs-kanban", inputs: { allowDragAndDrop: "allowDragAndDrop", allowKeyboard: "allowKeyboard", cardHeight: "cardHeight", cardSettings: "cardSettings", columns: "columns", constraintType: "constraintType", cssClass: "cssClass", dataSource: "dataSource", dialogSettings: "dialogSettings", enableHtmlSanitizer: "enableHtmlSanitizer", enablePersistence: "enablePersistence", enableRtl: "enableRtl", enableTooltip: "enableTooltip", enableVirtualization: "enableVirtualization", externalDropId: "externalDropId", height: "height", keyField: "keyField", locale: "locale", query: "query", showEmptyColumn: "showEmptyColumn", sortSettings: "sortSettings", stackedHeaders: "stackedHeaders", swimlaneSettings: "swimlaneSettings", tooltipTemplate: "tooltipTemplate", width: "width" }, outputs: { actionBegin: "actionBegin", actionComplete: "actionComplete", actionFailure: "actionFailure", cardClick: "cardClick", cardDoubleClick: "cardDoubleClick", cardRendered: "cardRendered", created: "created", dataBinding: "dataBinding", dataBound: "dataBound", dataSourceChanged: "dataSourceChanged", dataStateChange: "dataStateChange", dialogClose: "dialogClose", dialogOpen: "dialogOpen", drag: "drag", dragStart: "dragStart", dragStop: "dragStop", queryCellInfo: "queryCellInfo" }, queries: [{ propertyName: "tooltipTemplate", first: true, predicate: ["tooltipTemplate"], descendants: true }, { propertyName: "columns_template", first: true, predicate: ["columnsTemplate"], descendants: true }, { propertyName: "swimlaneSettings_template", first: true, predicate: ["swimlaneSettingsTemplate"], descendants: true }, { propertyName: "cardSettings_template", first: true, predicate: ["cardSettingsTemplate"], descendants: true }, { propertyName: "dialogSettings_template", first: true, predicate: ["dialogSettingsTemplate"], descendants: true }, { propertyName: "childColumns", first: true, predicate: ColumnsDirective, descendants: true }, { propertyName: "childStackedHeaders", first: true, predicate: StackedHeadersDirective, descendants: true }], usesInheritance: true, ngImport: i0, template: '', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
__decorate([
    Template()
], KanbanComponent.prototype, "tooltipTemplate", void 0);
__decorate([
    Template()
], KanbanComponent.prototype, "columns_template", void 0);
__decorate([
    Template()
], KanbanComponent.prototype, "swimlaneSettings_template", void 0);
__decorate([
    Template()
], KanbanComponent.prototype, "cardSettings_template", void 0);
__decorate([
    Template()
], KanbanComponent.prototype, "dialogSettings_template", void 0);
KanbanComponent = __decorate([
    ComponentMixins([ComponentBase])
], KanbanComponent);
export { KanbanComponent };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: KanbanComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ejs-kanban',
                    inputs: inputs,
                    outputs: outputs,
                    template: '',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    queries: {
                        childColumns: new ContentChild(ColumnsDirective),
                        childStackedHeaders: new ContentChild(StackedHeadersDirective)
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ViewContainerRef }, { type: i0.Injector }]; }, propDecorators: { tooltipTemplate: [{
                type: ContentChild,
                args: ['tooltipTemplate']
            }], columns_template: [{
                type: ContentChild,
                args: ['columnsTemplate']
            }], swimlaneSettings_template: [{
                type: ContentChild,
                args: ['swimlaneSettingsTemplate']
            }], cardSettings_template: [{
                type: ContentChild,
                args: ['cardSettingsTemplate']
            }], dialogSettings_template: [{
                type: ContentChild,
                args: ['dialogSettingsTemplate']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2FuYmFuLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9rYW5iYW4va2FuYmFuLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBZ0MsdUJBQXVCLEVBQWlELFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5SixPQUFPLEVBQUUsYUFBYSxFQUErQixlQUFlLEVBQTBCLFFBQVEsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQzdJLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNoRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDeEQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdkQsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sNEJBQTRCLENBQUM7O0FBRXJFLE1BQU0sQ0FBQyxNQUFNLE1BQU0sR0FBYSxDQUFDLGtCQUFrQixFQUFDLGVBQWUsRUFBQyxZQUFZLEVBQUMsY0FBYyxFQUFDLFNBQVMsRUFBQyxnQkFBZ0IsRUFBQyxVQUFVLEVBQUMsWUFBWSxFQUFDLGdCQUFnQixFQUFDLHFCQUFxQixFQUFDLG1CQUFtQixFQUFDLFdBQVcsRUFBQyxlQUFlLEVBQUMsc0JBQXNCLEVBQUMsZ0JBQWdCLEVBQUMsUUFBUSxFQUFDLFVBQVUsRUFBQyxRQUFRLEVBQUMsT0FBTyxFQUFDLGlCQUFpQixFQUFDLGNBQWMsRUFBQyxnQkFBZ0IsRUFBQyxrQkFBa0IsRUFBQyxpQkFBaUIsRUFBQyxPQUFPLENBQUMsQ0FBQztBQUN2WixNQUFNLENBQUMsTUFBTSxPQUFPLEdBQWEsQ0FBQyxhQUFhLEVBQUMsZ0JBQWdCLEVBQUMsZUFBZSxFQUFDLFdBQVcsRUFBQyxpQkFBaUIsRUFBQyxjQUFjLEVBQUMsU0FBUyxFQUFDLGFBQWEsRUFBQyxXQUFXLEVBQUMsbUJBQW1CLEVBQUMs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QUFpQjtnQkFLeEIsZ0JBQWdCO3NCQUZ0QixZQUFZO3VCQUFDLGlCQUFpQjtnQkFLeEIseUJBQXlCO3NCQUYvQixZQUFZO3VCQUFDLDBCQUEwQjtnQkFLakMscUJBQXFCO3NCQUYzQixZQUFZO3VCQUFDLHNCQUFzQjtnQkFLN0IsdUJBQXVCO3NCQUY3QixZQUFZO3VCQUFDLHdCQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgVmlld0NvbnRhaW5lclJlZiwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIFF1ZXJ5TGlzdCwgUmVuZGVyZXIyLCBJbmplY3RvciwgVmFsdWVQcm92aWRlciwgQ29udGVudENoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21wb25lbnRCYXNlLCBJQ29tcG9uZW50QmFzZSwgYXBwbHlNaXhpbnMsIENvbXBvbmVudE1peGlucywgUHJvcGVydHlDb2xsZWN0aW9uSW5mbywgc2V0VmFsdWUgfSBmcm9tICdAc3luY2Z1c2lvbi9lajItYW5ndWxhci1iYXNlJztcbmltcG9ydCB7IEthbmJhbiB9IGZyb20gJ0BzeW5jZnVzaW9uL2VqMi1rYW5iYW4nO1xuaW1wb3J0IHsgVGVtcGxhdGUgfSBmcm9tICdAc3luY2Z1c2lvbi9lajItYW5ndWxhci1iYXNlJztcbmltcG9ydCB7IENvbHVtbnNEaXJlY3RpdmUgfSBmcm9tICcuL2NvbHVtbnMuZGlyZWN0aXZlJztcbmltcG9ydCB7IFN0YWNrZWRIZWFkZXJzRGlyZWN0aXZlIH0gZnJvbSAnLi9zdGFja2VkaGVhZGVycy5kaXJlY3RpdmUnO1xuXG5leHBvcnQgY29uc3QgaW5wdXRzOiBzdHJpbmdbXSA9IFsnYWxsb3dEcmFnQW5kRHJvcCcsJ2FsbG93S2V5Ym9hcmQnLCdjYXJkSGVpZ2h0JywnY2FyZFNldHRpbmdzJywnY29sdW1ucycsJ2NvbnN0cmFpbnRUeXBlJywnY3NzQ2xhc3MnLCdkYXRhU291cmNlJywnZGlhbG9nU2V0dGluZ3MnLCdlbmFibGVIdG1sU2FuaXRpemVyJywnZW5hYmxlUGVyc2lzdGVuY2UnLCdlbmFibGVSdGwnLCdlbmFibGVUb29sdGlwJywnZW5hYmxlVmlydHVhbGl6YXRpb24nLCdleHRlcm5hbERyb3BJZCcsJ2hlaWdodCcsJ2tleUZpZWxkJywnbG9jYWxlJywncXVlcnknLCdzaG93RW1wdHlDb2x1bW4nLCdzb3J0U2V0dGluZ3MnLCdzdGFja2VkSGVhZGVycycsJ3N3aW1sYW5lU2V0dGluZ3MnLCd0b29sdGlwVGVtcGxhdGUnLCd3aWR0aCddO1xuZXhwb3J0IGNvbnN0IG91dHB1dHM6IHN0cmluZ1tdID0gWydhY3Rpb25CZWdpbicsJ2FjdGlvbkNvbXBsZXRlJywnYWN0aW9uRmFpbHVyZScsJ2NhcmRDbGljaycsJ2NhcmREb3VibGVDbGljaycsJ2NhcmRSZW5kZXJlZCcsJ2NyZWF0ZWQnLCdkYXRhQmluZGluZycsJ2RhdGFCb3VuZCcsJ2RhdGFTb3VyY2VDaGFuZ2VkJywnZGF0YVN0YXRlQ2hhbmdlJywnZGlhbG9nQ2xvc2UnLCdkaWFsb2dPcGVuJywnZHJhZycsJ2RyYWdTdGFydCcsJ2RyYWdTdG9wJywncXVlcnlDZWxsSW5mbyddO1xuZXhwb3J0IGNvbnN0IHR3b1dheXM6IHN0cmluZ1tdID0gWycnXTtcblxuLyoqXG4gKiBgZWota2FuYmFuYCByZXByZXNlbnRzIHRoZSBBbmd1bGFyIEthbmJhbiBDb21wb25lbnQuXG4gKiBgYGBodG1sXG4gKiA8ZWpzLWthbmJhbj48L2Vqcy1rYW5iYW4+XG4gKiBgYGBcbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdlanMta2FuYmFuJyxcbiAgICBpbnB1dHM6IGlucHV0cyxcbiAgICBvdXRwdXRzOiBvdXRwdXRzLFxuICAgIHRlbXBsYXRlOiAnJyxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBxdWVyaWVzOiB7XG4gICAgICAgIGNoaWxkQ29sdW1uczogbmV3IENvbnRlbnRDaGlsZChDb2x1bW5zRGlyZWN0aXZlKSwgXG4gICAgICAgIGNoaWxkU3RhY2tlZEhlYWRlcnM6IG5ldyBDb250ZW50Q2hpbGQoU3RhY2tlZEhlYWRlcnNEaXJlY3RpdmUpXG4gICAgfVxufSlcbkBDb21wb25lbnRNaXhpbnMoW0NvbXBvbmVudEJhc2VdKVxuZXhwb3J0IGNsYXNzIEthbmJhbkNvbXBvbmVudCBleHRlbmRzIEthbmJhbiBpbXBsZW1lbnRzIElDb21wb25lbnRCYXNlIHtcbiAgICBwdWJsaWMgY29udGV4dCA6IGFueTtcbiAgICBwdWJsaWMgdGFnT2JqZWN0czogYW55O1xuXHRhY3Rpb25CZWdpbjogYW55O1xuXHRhY3Rpb25Db21wbGV0ZTogYW55O1xuXHRhY3Rpb25GYWlsdXJlOiBhbnk7XG5cdGNhcmRDbGljazogYW55O1xuXHRjYXJkRG91YmxlQ2xpY2s6IGFueTtcblx0Y2FyZFJlbmRlcmVkOiBhbnk7XG5cdGNyZWF0ZWQ6IGFueTtcblx0ZGF0YUJpbmRpbmc6IGFueTtcblx0ZGF0YUJvdW5kOiBhbnk7XG5cdGRhdGFTb3VyY2VDaGFuZ2VkOiBhbnk7XG5cdGRhdGFTdGF0ZUNoYW5nZTogYW55O1xuXHRkaWFsb2dDbG9zZTogYW55O1xuXHRkaWFsb2dPcGVuOiBhbnk7XG5cdGRyYWc6IGFueTtcblx0ZHJhZ1N0YXJ0OiBhbnk7XG5cdGRyYWdTdG9wOiBhbnk7XG5cdHB1YmxpYyBxdWVyeUNlbGxJbmZvOiBhbnk7XG4gICAgcHVibGljIGNoaWxkQ29sdW1uczogUXVlcnlMaXN0PENvbHVtbnNEaXJlY3RpdmU+O1xuICAgIHB1YmxpYyBjaGlsZFN0YWNrZWRIZWFkZXJzOiBRdWVyeUxpc3Q8U3RhY2tlZEhlYWRlcnNEaXJlY3RpdmU+O1xuICAgIHB1YmxpYyB0YWdzOiBzdHJpbmdbXSA9IFsnY29sdW1ucycsICdzdGFja2VkSGVhZGVycyddO1xuICAgIC8qKiBcbiAgICAgKiBEZWZpbmVzIHRoZSB0ZW1wbGF0ZSBjb250ZW50IHRvIGNhcmTigJlzIHRvb2x0aXAuIFRoZSBwcm9wZXJ0eSB3b3JrcyBieSBlbmFibGluZyB0aGUg4oCYZW5hYmxlVG9vbHRpcOKAmSBwcm9wZXJ0eS5cbiAgICAgKiBAZGVmYXVsdCBudWxsXG4gICAgICogQGFzcHR5cGUgc3RyaW5nXG4gICAgICovXG4gICAgQENvbnRlbnRDaGlsZCgndG9vbHRpcFRlbXBsYXRlJylcbiAgICBAVGVtcGxhdGUoKVxuICAgIHB1YmxpYyB0b29sdGlwVGVtcGxhdGU6IGFueTtcbiAgICBAQ29udGVudENoaWxkKCdjb2x1bW5zVGVtcGxhdGUnKVxuICAgIEBUZW1wbGF0ZSgpXG4gICAgcHVibGljIGNvbHVtbnNfdGVtcGxhdGU6IGFueTtcbiAgICBAQ29udGVudENoaWxkKCdzd2ltbGFuZVNldHRpbmdzVGVtcGxhdGUnKVxuICAgIEBUZW1wbGF0ZSgpXG4gICAgcHVibGljIHN3aW1sYW5lU2V0dGluZ3NfdGVtcGxhdGU6IGFueTtcbiAgICBAQ29udGVudENoaWxkKCdjYXJkU2V0dGluZ3NUZW1wbGF0ZScpXG4gICAgQFRlbXBsYXRlKClcbiAgICBwdWJsaWMgY2FyZFNldHRpbmdzX3RlbXBsYXRlOiBhbnk7XG4gICAgQENvbnRlbnRDaGlsZCgnZGlhbG9nU2V0dGluZ3NUZW1wbGF0ZScpXG4gICAgQFRlbXBsYXRlKClcbiAgICBwdWJsaWMgZGlhbG9nU2V0dGluZ3NfdGVtcGxhdGU6IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgbmdFbGU6IEVsZW1lbnRSZWYsIHByaXZhdGUgc3JlbmRlcmVyOiBSZW5kZXJlcjIsIHByaXZhdGUgdmlld0NvbnRhaW5lclJlZjpWaWV3Q29udGFpbmVyUmVmLCBwcml2YXRlIGluamVjdG9yOiBJbmplY3Rvcikge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmVsZW1lbnQgPSB0aGlzLm5nRWxlLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICAgIHRoaXMuaW5qZWN0ZWRNb2R1bGVzID0gdGhpcy5pbmplY3RlZE1vZHVsZXMgfHwgW107XG5cbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50cyhvdXRwdXRzKTtcbiAgICAgICAgdGhpcy5hZGRUd29XYXkuY2FsbCh0aGlzLCB0d29XYXlzKTtcbiAgICAgICAgc2V0VmFsdWUoJ2N1cnJlbnRJbnN0YW5jZScsIHRoaXMsIHRoaXMudmlld0NvbnRhaW5lclJlZik7XG4gICAgICAgIHRoaXMuY29udGV4dCAgPSBuZXcgQ29tcG9uZW50QmFzZSgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5jb250ZXh0Lm5nT25Jbml0KHRoaXMpO1xuICAgIH1cblxuICAgIHB1YmxpYyBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuY29udGV4dC5uZ0FmdGVyVmlld0luaXQodGhpcyk7XG4gICAgfVxuXG4gICAgcHVibGljIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmNvbnRleHQubmdPbkRlc3Ryb3kodGhpcyk7XG4gICAgfVxuXG4gICAgcHVibGljIG5nQWZ0ZXJDb250ZW50Q2hlY2tlZCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy50YWdPYmplY3RzWzBdLmluc3RhbmNlID0gdGhpcy5jaGlsZENvbHVtbnM7XG4gICAgICAgIGlmICh0aGlzLmNoaWxkU3RhY2tlZEhlYWRlcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50YWdPYmplY3RzWzFdLmluc3RhbmNlID0gdGhpcy5jaGlsZFN0YWNrZWRIZWFkZXJzIGFzIGFueTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgIHRoaXMuY29udGV4dC5uZ0FmdGVyQ29udGVudENoZWNrZWQodGhpcyk7XG4gICAgfVxuXG4gICAgcHVibGljIHJlZ2lzdGVyRXZlbnRzOiAoZXZlbnRMaXN0OiBzdHJpbmdbXSkgPT4gdm9pZDtcbiAgICBwdWJsaWMgYWRkVHdvV2F5OiAocHJvcExpc3Q6IHN0cmluZ1tdKSA9PiB2b2lkO1xufVxuXG4iXX0=