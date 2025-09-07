import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileManagerModule } from './filemanager.module';
import { DetailsView, NavigationPane, LargeIconsView, Toolbar, ContextMenu, BreadCrumbBar, Virtualization } from '@syncfusion/ej2-filemanager';
import * as i0 from "@angular/core";
export const DetailsViewService = { provide: 'FileManagerDetailsView', useValue: DetailsView };
export const NavigationPaneService = { provide: 'FileManagerNavigationPane', useValue: NavigationPane };
export const LargeIconsViewService = { provide: 'FileManagerLargeIconsView', useValue: LargeIconsView };
export const ToolbarService = { provide: 'FileManagerToolbar', useValue: Toolbar };
export const ContextMenuService = { provide: 'FileManagerContextMenu', useValue: ContextMenu };
export const BreadCrumbBarService = { provide: 'FileManagerBreadCrumbBar', useValue: BreadCrumbBar };
export const VirtualizationService = { provide: 'FileManagerVirtualization', useValue: Virtualization };
/**
 * NgModule definition for the FileManager component with providers.
 */
export class FileManagerAllModule {
}
FileManagerAllModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: FileManagerAllModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
FileManagerAllModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: FileManagerAllModule, imports: [CommonModule, FileManagerModule], exports: [FileManagerModule] });
FileManagerAllModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: FileManagerAllModule, providers: [
        DetailsViewService,
        NavigationPaneService,
        LargeIconsViewService,
        ToolbarService,
        ContextMenuService,
        BreadCrumbBarService,
        VirtualizationService
    ], imports: [[CommonModule, FileManagerModule], FileManagerModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: FileManagerAllModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FileManagerModule],
                    exports: [
                        FileManagerModule
                    ],
                    providers: [
                        DetailsViewService,
                        NavigationPaneService,
                        LargeIconsViewService,
                        ToolbarService,
                        ContextMenuService,
                        BreadCrumbBarService,
                        VirtualizationService
                    ]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZW1hbmFnZXItYWxsLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9maWxlLW1hbmFnZXIvZmlsZW1hbmFnZXItYWxsLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUN4RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFHL0MsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDekQsT0FBTyxFQUFDLFdBQVcsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsYUFBYSxFQUFFLGNBQWMsRUFBQyxNQUFNLDZCQUE2QixDQUFBOztBQUc1SSxNQUFNLENBQUMsTUFBTSxrQkFBa0IsR0FBa0IsRUFBRSxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBQyxDQUFDO0FBQzdHLE1BQU0sQ0FBQyxNQUFNLHFCQUFxQixHQUFrQixFQUFFLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxRQUFRLEVBQUUsY0FBYyxFQUFDLENBQUM7QUFDdEgsTUFBTSxDQUFDLE1BQU0scUJBQXFCLEdBQWtCLEVBQUUsT0FBTyxFQUFFLDJCQUEyQixFQUFFLFFBQVEsRUFBRSxjQUFjLEVBQUMsQ0FBQztBQUN0SCxNQUFNLENBQUMsTUFBTSxjQUFjLEdBQWtCLEVBQUUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUMsQ0FBQztBQUNqRyxNQUFNLENBQUMsTUFBTSxrQkFBa0IsR0FBa0IsRUFBRSxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBQyxDQUFDO0FBQzdHLE1BQU0sQ0FBQyxNQUFNLG9CQUFvQixHQUFrQixFQUFFLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxRQUFRLEVBQUUsYUFBYSxFQUFDLENBQUM7QUFDbkgsTUFBTSxDQUFDLE1BQU0scUJBQXFCLEdBQWtCLEVBQUUsT0FBTyxFQUFFLDJCQUEyQixFQUFFLFFBQVEsRUFBRSxjQUFjLEVBQUMsQ0FBQztBQUV0SDs7R0FFRztBQWdCSCxNQUFNLE9BQU8sb0JBQW9COztpSEFBcEIsb0JBQW9CO2tIQUFwQixvQkFBb0IsWUFkbkIsWUFBWSxFQUFFLGlCQUFpQixhQUVyQyxpQkFBaUI7a0hBWVosb0JBQW9CLGFBVm5CO1FBQ04sa0JBQWtCO1FBQ2xCLHFCQUFxQjtRQUNyQixxQkFBcUI7UUFDckIsY0FBYztRQUNkLGtCQUFrQjtRQUNsQixvQkFBb0I7UUFDcEIscUJBQXFCO0tBQ3hCLFlBWlEsQ0FBQyxZQUFZLEVBQUUsaUJBQWlCLENBQUMsRUFFdEMsaUJBQWlCOzJGQVlaLG9CQUFvQjtrQkFmaEMsUUFBUTttQkFBQztvQkFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsaUJBQWlCLENBQUM7b0JBQzFDLE9BQU8sRUFBRTt3QkFDTCxpQkFBaUI7cUJBQ3BCO29CQUNELFNBQVMsRUFBQzt3QkFDTixrQkFBa0I7d0JBQ2xCLHFCQUFxQjt3QkFDckIscUJBQXFCO3dCQUNyQixjQUFjO3dCQUNkLGtCQUFrQjt3QkFDbEIsb0JBQW9CO3dCQUNwQixxQkFBcUI7cUJBQ3hCO2lCQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIFZhbHVlUHJvdmlkZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBUb29sYmFySXRlbURpcmVjdGl2ZSwgVG9vbGJhckl0ZW1zRGlyZWN0aXZlIH0gZnJvbSAnLi90b29sYmFyaXRlbXMuZGlyZWN0aXZlJztcbmltcG9ydCB7IEZpbGVNYW5hZ2VyQ29tcG9uZW50IH0gZnJvbSAnLi9maWxlbWFuYWdlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgRmlsZU1hbmFnZXJNb2R1bGUgfSBmcm9tICcuL2ZpbGVtYW5hZ2VyLm1vZHVsZSc7XG5pbXBvcnQge0RldGFpbHNWaWV3LCBOYXZpZ2F0aW9uUGFuZSwgTGFyZ2VJY29uc1ZpZXcsIFRvb2xiYXIsIENvbnRleHRNZW51LCBCcmVhZENydW1iQmFyLCBWaXJ0dWFsaXphdGlvbn0gZnJvbSAnQHN5bmNmdXNpb24vZWoyLWZpbGVtYW5hZ2VyJ1xuXG5cbmV4cG9ydCBjb25zdCBEZXRhaWxzVmlld1NlcnZpY2U6IFZhbHVlUHJvdmlkZXIgPSB7IHByb3ZpZGU6ICdGaWxlTWFuYWdlckRldGFpbHNWaWV3JywgdXNlVmFsdWU6IERldGFpbHNWaWV3fTtcbmV4cG9ydCBjb25zdCBOYXZpZ2F0aW9uUGFuZVNlcnZpY2U6IFZhbHVlUHJvdmlkZXIgPSB7IHByb3ZpZGU6ICdGaWxlTWFuYWdlck5hdmlnYXRpb25QYW5lJywgdXNlVmFsdWU6IE5hdmlnYXRpb25QYW5lfTtcbmV4cG9ydCBjb25zdCBMYXJnZUljb25zVmlld1NlcnZpY2U6IFZhbHVlUHJvdmlkZXIgPSB7IHByb3ZpZGU6ICdGaWxlTWFuYWdlckxhcmdlSWNvbnNWaWV3JywgdXNlVmFsdWU6IExhcmdlSWNvbnNWaWV3fTtcbmV4cG9ydCBjb25zdCBUb29sYmFyU2VydmljZTogVmFsdWVQcm92aWRlciA9IHsgcHJvdmlkZTogJ0ZpbGVNYW5hZ2VyVG9vbGJhcicsIHVzZVZhbHVlOiBUb29sYmFyfTtcbmV4cG9ydCBjb25zdCBDb250ZXh0TWVudVNlcnZpY2U6IFZhbHVlUHJvdmlkZXIgPSB7IHByb3ZpZGU6ICdGaWxlTWFuYWdlckNvbnRleHRNZW51JywgdXNlVmFsdWU6IENvbnRleHRNZW51fTtcbmV4cG9ydCBjb25zdCBCcmVhZENydW1iQmFyU2VydmljZTogVmFsdWVQcm92aWRlciA9IHsgcHJvdmlkZTogJ0ZpbGVNYW5hZ2VyQnJlYWRDcnVtYkJhcicsIHVzZVZhbHVlOiBCcmVhZENydW1iQmFyfTtcbmV4cG9ydCBjb25zdCBWaXJ0dWFsaXphdGlvblNlcnZpY2U6IFZhbHVlUHJvdmlkZXIgPSB7IHByb3ZpZGU6ICdGaWxlTWFuYWdlclZpcnR1YWxpemF0aW9uJywgdXNlVmFsdWU6IFZpcnR1YWxpemF0aW9ufTtcblxuLyoqXG4gKiBOZ01vZHVsZSBkZWZpbml0aW9uIGZvciB0aGUgRmlsZU1hbmFnZXIgY29tcG9uZW50IHdpdGggcHJvdmlkZXJzLlxuICovXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIEZpbGVNYW5hZ2VyTW9kdWxlXSxcbiAgICBleHBvcnRzOiBbXG4gICAgICAgIEZpbGVNYW5hZ2VyTW9kdWxlXG4gICAgXSxcbiAgICBwcm92aWRlcnM6W1xuICAgICAgICBEZXRhaWxzVmlld1NlcnZpY2UsXG4gICAgICAgIE5hdmlnYXRpb25QYW5lU2VydmljZSxcbiAgICAgICAgTGFyZ2VJY29uc1ZpZXdTZXJ2aWNlLFxuICAgICAgICBUb29sYmFyU2VydmljZSxcbiAgICAgICAgQ29udGV4dE1lbnVTZXJ2aWNlLFxuICAgICAgICBCcmVhZENydW1iQmFyU2VydmljZSxcbiAgICAgICAgVmlydHVhbGl6YXRpb25TZXJ2aWNlXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBGaWxlTWFuYWdlckFsbE1vZHVsZSB7IH0iXX0=