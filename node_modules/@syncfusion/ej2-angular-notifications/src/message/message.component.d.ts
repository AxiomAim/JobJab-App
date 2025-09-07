import { ElementRef, ViewContainerRef, Renderer2, Injector } from '@angular/core';
import { IComponentBase } from '@syncfusion/ej2-angular-base';
import { Message } from '@syncfusion/ej2-notifications';
import * as i0 from "@angular/core";
export declare const inputs: string[];
export declare const outputs: string[];
export declare const twoWays: string[];
/**
 * The Angular Message component displays messages with severity by differentiating icons and colors to denote the importance and context of the message to the end user.
 * ```html
 * <ejs-message id='msg' content='Editing is restricted' [showCloseIcon]='true'></ejs-message>
 * ```
 */
export declare class MessageComponent extends Message implements IComponentBase {
    private ngEle;
    private srenderer;
    private viewContainerRef;
    private injector;
    containerContext: any;
    tagObjects: any;
    closed: any;
    created: any;
    destroyed: any;
    /**
     * Specifies the content to be displayed in the Message component. It can be a paragraph, a list, or any other HTML element.
     * @default null
     * @angulartype string | object
     * @reacttype string | function | JSX.Element
     * @vuetype string | function
     * @asptype string
     */
    content: any;
    constructor(ngEle: ElementRef, srenderer: Renderer2, viewContainerRef: ViewContainerRef, injector: Injector);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    ngAfterContentChecked(): void;
    registerEvents: (eventList: string[]) => void;
    addTwoWay: (propList: string[]) => void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MessageComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MessageComponent, "ejs-message", never, { "content": "content"; "cssClass": "cssClass"; "enablePersistence": "enablePersistence"; "enableRtl": "enableRtl"; "locale": "locale"; "severity": "severity"; "showCloseIcon": "showCloseIcon"; "showIcon": "showIcon"; "variant": "variant"; "visible": "visible"; }, { "closed": "closed"; "created": "created"; "destroyed": "destroyed"; }, ["content"], ["*"]>;
}
