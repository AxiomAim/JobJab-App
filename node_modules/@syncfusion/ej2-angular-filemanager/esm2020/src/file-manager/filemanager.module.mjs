import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarItemDirective, ToolbarItemsDirective } from './toolbaritems.directive';
import { FileManagerComponent } from './filemanager.component';
import * as i0 from "@angular/core";
/**
 * NgModule definition for the FileManager component.
 */
export class FileManagerModule {
}
FileManagerModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: FileManagerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
FileManagerModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: FileManagerModule, declarations: [FileManagerComponent,
        ToolbarItemDirective,
        ToolbarItemsDirective], imports: [CommonModule], exports: [FileManagerComponent,
        ToolbarItemDirective,
        ToolbarItemsDirective] });
FileManagerModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: FileManagerModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: FileManagerModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    declarations: [
                        FileManagerComponent,
                        ToolbarItemDirective,
                        ToolbarItemsDirective
                    ],
                    exports: [
                        FileManagerComponent,
                        ToolbarItemDirective,
                        ToolbarItemsDirective
                    ]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZW1hbmFnZXIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2ZpbGUtbWFuYWdlci9maWxlbWFuYWdlci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLG9CQUFvQixFQUFFLHFCQUFxQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDdkYsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0seUJBQXlCLENBQUM7O0FBRS9EOztHQUVHO0FBY0gsTUFBTSxPQUFPLGlCQUFpQjs7OEdBQWpCLGlCQUFpQjsrR0FBakIsaUJBQWlCLGlCQVZ0QixvQkFBb0I7UUFDcEIsb0JBQW9CO1FBQ3BCLHFCQUFxQixhQUpmLFlBQVksYUFPbEIsb0JBQW9CO1FBQ3BCLG9CQUFvQjtRQUNwQixxQkFBcUI7K0dBR2hCLGlCQUFpQixZQVpqQixDQUFDLFlBQVksQ0FBQzsyRkFZZCxpQkFBaUI7a0JBYjdCLFFBQVE7bUJBQUM7b0JBQ04sT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO29CQUN2QixZQUFZLEVBQUU7d0JBQ1Ysb0JBQW9CO3dCQUNwQixvQkFBb0I7d0JBQ3BCLHFCQUFxQjtxQkFDeEI7b0JBQ0QsT0FBTyxFQUFFO3dCQUNMLG9CQUFvQjt3QkFDcEIsb0JBQW9CO3dCQUNwQixxQkFBcUI7cUJBQ3hCO2lCQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBUb29sYmFySXRlbURpcmVjdGl2ZSwgVG9vbGJhckl0ZW1zRGlyZWN0aXZlIH0gZnJvbSAnLi90b29sYmFyaXRlbXMuZGlyZWN0aXZlJztcbmltcG9ydCB7IEZpbGVNYW5hZ2VyQ29tcG9uZW50IH0gZnJvbSAnLi9maWxlbWFuYWdlci5jb21wb25lbnQnO1xuXG4vKipcbiAqIE5nTW9kdWxlIGRlZmluaXRpb24gZm9yIHRoZSBGaWxlTWFuYWdlciBjb21wb25lbnQuXG4gKi9cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIEZpbGVNYW5hZ2VyQ29tcG9uZW50LFxuICAgICAgICBUb29sYmFySXRlbURpcmVjdGl2ZSxcbiAgICAgICAgVG9vbGJhckl0ZW1zRGlyZWN0aXZlXG4gICAgXSxcbiAgICBleHBvcnRzOiBbXG4gICAgICAgIEZpbGVNYW5hZ2VyQ29tcG9uZW50LFxuICAgICAgICBUb29sYmFySXRlbURpcmVjdGl2ZSxcbiAgICAgICAgVG9vbGJhckl0ZW1zRGlyZWN0aXZlXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBGaWxlTWFuYWdlck1vZHVsZSB7IH0iXX0=