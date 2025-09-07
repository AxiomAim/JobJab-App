import { ElementRef, ViewContainerRef, Renderer2, Injector } from '@angular/core';
import { IComponentBase } from '@syncfusion/ej2-angular-base';
import { Skeleton } from '@syncfusion/ej2-notifications';
import * as i0 from "@angular/core";
export declare const inputs: string[];
export declare const outputs: string[];
export declare const twoWays: string[];
/**
 * Represents the Angular Skeleton component
 * ```html
 * <ejs-skeleton></ejs-skeleton>
 * ```
 */
export declare class SkeletonComponent extends Skeleton implements IComponentBase {
    private ngEle;
    private srenderer;
    private viewContainerRef;
    private injector;
    context: any;
    tagObjects: any;
    constructor(ngEle: ElementRef, srenderer: Renderer2, viewContainerRef: ViewContainerRef, injector: Injector);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    ngAfterContentChecked(): void;
    registerEvents: (eventList: string[]) => void;
    addTwoWay: (propList: string[]) => void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SkeletonComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SkeletonComponent, "ejs-skeleton", never, { "cssClass": "cssClass"; "enablePersistence": "enablePersistence"; "enableRtl": "enableRtl"; "height": "height"; "label": "label"; "locale": "locale"; "shape": "shape"; "shimmerEffect": "shimmerEffect"; "visible": "visible"; "width": "width"; }, {}, never, never>;
}
