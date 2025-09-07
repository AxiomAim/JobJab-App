import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpeedDialItemDirective, SpeedDialItemsDirective } from './items.directive';
import { SpeedDialComponent } from './speeddial.component';
import * as i0 from "@angular/core";
/**
 * NgModule definition for the SpeedDial component.
 */
export class SpeedDialModule {
}
SpeedDialModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SpeedDialModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
SpeedDialModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SpeedDialModule, declarations: [SpeedDialComponent,
        SpeedDialItemDirective,
        SpeedDialItemsDirective], imports: [CommonModule], exports: [SpeedDialComponent,
        SpeedDialItemDirective,
        SpeedDialItemsDirective] });
SpeedDialModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SpeedDialModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SpeedDialModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    declarations: [
                        SpeedDialComponent,
                        SpeedDialItemDirective,
                        SpeedDialItemsDirective
                    ],
                    exports: [
                        SpeedDialComponent,
                        SpeedDialItemDirective,
                        SpeedDialItemsDirective
                    ]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BlZWRkaWFsLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zcGVlZC1kaWFsL3NwZWVkZGlhbC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLHNCQUFzQixFQUFFLHVCQUF1QixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDcEYsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7O0FBRTNEOztHQUVHO0FBY0gsTUFBTSxPQUFPLGVBQWU7OzRHQUFmLGVBQWU7NkdBQWYsZUFBZSxpQkFWcEIsa0JBQWtCO1FBQ2xCLHNCQUFzQjtRQUN0Qix1QkFBdUIsYUFKakIsWUFBWSxhQU9sQixrQkFBa0I7UUFDbEIsc0JBQXNCO1FBQ3RCLHVCQUF1Qjs2R0FHbEIsZUFBZSxZQVpmLENBQUMsWUFBWSxDQUFDOzJGQVlkLGVBQWU7a0JBYjNCLFFBQVE7bUJBQUM7b0JBQ04sT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO29CQUN2QixZQUFZLEVBQUU7d0JBQ1Ysa0JBQWtCO3dCQUNsQixzQkFBc0I7d0JBQ3RCLHVCQUF1QjtxQkFDMUI7b0JBQ0QsT0FBTyxFQUFFO3dCQUNMLGtCQUFrQjt3QkFDbEIsc0JBQXNCO3dCQUN0Qix1QkFBdUI7cUJBQzFCO2lCQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBTcGVlZERpYWxJdGVtRGlyZWN0aXZlLCBTcGVlZERpYWxJdGVtc0RpcmVjdGl2ZSB9IGZyb20gJy4vaXRlbXMuZGlyZWN0aXZlJztcbmltcG9ydCB7IFNwZWVkRGlhbENvbXBvbmVudCB9IGZyb20gJy4vc3BlZWRkaWFsLmNvbXBvbmVudCc7XG5cbi8qKlxuICogTmdNb2R1bGUgZGVmaW5pdGlvbiBmb3IgdGhlIFNwZWVkRGlhbCBjb21wb25lbnQuXG4gKi9cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIFNwZWVkRGlhbENvbXBvbmVudCxcbiAgICAgICAgU3BlZWREaWFsSXRlbURpcmVjdGl2ZSxcbiAgICAgICAgU3BlZWREaWFsSXRlbXNEaXJlY3RpdmVcbiAgICBdLFxuICAgIGV4cG9ydHM6IFtcbiAgICAgICAgU3BlZWREaWFsQ29tcG9uZW50LFxuICAgICAgICBTcGVlZERpYWxJdGVtRGlyZWN0aXZlLFxuICAgICAgICBTcGVlZERpYWxJdGVtc0RpcmVjdGl2ZVxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgU3BlZWREaWFsTW9kdWxlIHsgfSJdfQ==