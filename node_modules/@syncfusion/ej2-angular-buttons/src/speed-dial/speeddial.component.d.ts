import { ElementRef, ViewContainerRef, Renderer2, Injector, QueryList } from '@angular/core';
import { IComponentBase } from '@syncfusion/ej2-angular-base';
import { SpeedDial } from '@syncfusion/ej2-buttons';
import { SpeedDialItemsDirective } from './items.directive';
import * as i0 from "@angular/core";
export declare const inputs: string[];
export declare const outputs: string[];
export declare const twoWays: string[];
/**
 * Represents the Angular SpeedDial Component.
 * ```html
 * <button ejs-speeddial content='Edit'></button>
 * ```
 */
export declare class SpeedDialComponent extends SpeedDial implements IComponentBase {
    private ngEle;
    private srenderer;
    private viewContainerRef;
    private injector;
    containerContext: any;
    tagObjects: any;
    beforeClose: any;
    beforeItemRender: any;
    beforeOpen: any;
    clicked: any;
    created: any;
    onClose: any;
    onOpen: any;
    visibleChange: any;
    childItems: QueryList<SpeedDialItemsDirective>;
    tags: string[];
    /**
     * Defines the template content for the speed dial item.
     * {% codeBlock src='speeddial/itemTemplate/index.md' %}{% endcodeBlock %}
     * @default ''
     * @angulartype string | object
     * @reacttype string | function | JSX.Element
     * @vuetype string | function
     * @asptype string
     */
    itemTemplate: any;
    /**
     * Defines a template content for popup of SpeedDial.
     * @default ''
     * @angulartype string | object
     * @reacttype string | function | JSX.Element
     * @vuetype string | function
     * @asptype string
     */
    popupTemplate: any;
    constructor(ngEle: ElementRef, srenderer: Renderer2, viewContainerRef: ViewContainerRef, injector: Injector);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    ngAfterContentChecked(): void;
    registerEvents: (eventList: string[]) => void;
    addTwoWay: (propList: string[]) => void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SpeedDialComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SpeedDialComponent, "[ejs-speeddial]", never, { "animation": "animation"; "closeIconCss": "closeIconCss"; "content": "content"; "cssClass": "cssClass"; "direction": "direction"; "disabled": "disabled"; "enablePersistence": "enablePersistence"; "enableRtl": "enableRtl"; "iconPosition": "iconPosition"; "isPrimary": "isPrimary"; "itemTemplate": "itemTemplate"; "items": "items"; "locale": "locale"; "modal": "modal"; "mode": "mode"; "openIconCss": "openIconCss"; "opensOnHover": "opensOnHover"; "popupTemplate": "popupTemplate"; "position": "position"; "radialSettings": "radialSettings"; "target": "target"; "visible": "visible"; }, { "beforeClose": "beforeClose"; "beforeItemRender": "beforeItemRender"; "beforeOpen": "beforeOpen"; "clicked": "clicked"; "created": "created"; "onClose": "onClose"; "onOpen": "onOpen"; "visibleChange": "visibleChange"; }, ["itemTemplate", "popupTemplate", "childItems"], ["*"]>;
}
