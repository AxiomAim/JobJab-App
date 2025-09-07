import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PdfViewerModule } from './pdfviewer.module';
import { LinkAnnotation, BookmarkView, Magnification, ThumbnailView, Toolbar, Navigation, Print, TextSelection, TextSearch, Annotation, FormDesigner, FormFields, PageOrganizer } from '@syncfusion/ej2-pdfviewer';
import * as i0 from "@angular/core";
export const LinkAnnotationService = { provide: 'PdfViewerLinkAnnotation', useValue: LinkAnnotation };
export const BookmarkViewService = { provide: 'PdfViewerBookmarkView', useValue: BookmarkView };
export const MagnificationService = { provide: 'PdfViewerMagnification', useValue: Magnification };
export const ThumbnailViewService = { provide: 'PdfViewerThumbnailView', useValue: ThumbnailView };
export const ToolbarService = { provide: 'PdfViewerToolbar', useValue: Toolbar };
export const NavigationService = { provide: 'PdfViewerNavigation', useValue: Navigation };
export const PrintService = { provide: 'PdfViewerPrint', useValue: Print };
export const TextSelectionService = { provide: 'PdfViewerTextSelection', useValue: TextSelection };
export const TextSearchService = { provide: 'PdfViewerTextSearch', useValue: TextSearch };
export const AnnotationService = { provide: 'PdfViewerAnnotation', useValue: Annotation };
export const FormDesignerService = { provide: 'PdfViewerFormDesigner', useValue: FormDesigner };
export const FormFieldsService = { provide: 'PdfViewerFormFields', useValue: FormFields };
export const PageOrganizerService = { provide: 'PdfViewerPageOrganizer', useValue: PageOrganizer };
/**
 * NgModule definition for the PdfViewer component with providers.
 */
export class PdfViewerAllModule {
}
PdfViewerAllModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: PdfViewerAllModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
PdfViewerAllModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: PdfViewerAllModule, imports: [CommonModule, PdfViewerModule], exports: [PdfViewerModule] });
PdfViewerAllModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: PdfViewerAllModule, providers: [
        LinkAnnotationService,
        BookmarkViewService,
        MagnificationService,
        ThumbnailViewService,
        ToolbarService,
        NavigationService,
        PrintService,
        TextSelectionService,
        TextSearchService,
        AnnotationService,
        FormDesignerService,
        FormFieldsService,
        PageOrganizerService
    ], imports: [[CommonModule, PdfViewerModule], PdfViewerModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: PdfViewerAllModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, PdfViewerModule],
                    exports: [
                        PdfViewerModule
                    ],
                    providers: [
                        LinkAnnotationService,
                        BookmarkViewService,
                        MagnificationService,
                        ThumbnailViewService,
                        ToolbarService,
                        NavigationService,
                        PrintService,
                        TextSelectionService,
                        TextSearchService,
                        AnnotationService,
                        FormDesignerService,
                        FormFieldsService,
                        PageOrganizerService
                    ]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGRmdmlld2VyLWFsbC5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvcGRmdmlld2VyL3BkZnZpZXdlci1hbGwubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBQ3hELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUUvQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDckQsT0FBTyxFQUFDLGNBQWMsRUFBRSxZQUFZLEVBQUUsYUFBYSxFQUFFLGFBQWEsRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxhQUFhLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLGFBQWEsRUFBQyxNQUFNLDJCQUEyQixDQUFBOztBQUdoTixNQUFNLENBQUMsTUFBTSxxQkFBcUIsR0FBa0IsRUFBRSxPQUFPLEVBQUUseUJBQXlCLEVBQUUsUUFBUSxFQUFFLGNBQWMsRUFBQyxDQUFDO0FBQ3BILE1BQU0sQ0FBQyxNQUFNLG1CQUFtQixHQUFrQixFQUFFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxRQUFRLEVBQUUsWUFBWSxFQUFDLENBQUM7QUFDOUcsTUFBTSxDQUFDLE1BQU0sb0JBQW9CLEdBQWtCLEVBQUUsT0FBTyxFQUFFLHdCQUF3QixFQUFFLFFBQVEsRUFBRSxhQUFhLEVBQUMsQ0FBQztBQUNqSCxNQUFNLENBQUMsTUFBTSxvQkFBb0IsR0FBa0IsRUFBRSxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsUUFBUSxFQUFFLGFBQWEsRUFBQyxDQUFDO0FBQ2pILE1BQU0sQ0FBQyxNQUFNLGNBQWMsR0FBa0IsRUFBRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBQyxDQUFDO0FBQy9GLE1BQU0sQ0FBQyxNQUFNLGlCQUFpQixHQUFrQixFQUFFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFDLENBQUM7QUFDeEcsTUFBTSxDQUFDLE1BQU0sWUFBWSxHQUFrQixFQUFFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFDLENBQUM7QUFDekYsTUFBTSxDQUFDLE1BQU0sb0JBQW9CLEdBQWtCLEVBQUUsT0FBTyxFQUFFLHdCQUF3QixFQUFFLFFBQVEsRUFBRSxhQUFhLEVBQUMsQ0FBQztBQUNqSCxNQUFNLENBQUMsTUFBTSxpQkFBaUIsR0FBa0IsRUFBRSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBQyxDQUFDO0FBQ3hHLE1BQU0sQ0FBQyxNQUFNLGlCQUFpQixHQUFrQixFQUFFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFDLENBQUM7QUFDeEcsTUFBTSxDQUFDLE1BQU0sbUJBQW1CLEdBQWtCLEVBQUUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFFBQVEsRUFBRSxZQUFZLEVBQUMsQ0FBQztBQUM5RyxNQUFNLENBQUMsTUFBTSxpQkFBaUIsR0FBa0IsRUFBRSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBQyxDQUFDO0FBQ3hHLE1BQU0sQ0FBQyxNQUFNLG9CQUFvQixHQUFrQixFQUFFLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxRQUFRLEVBQUUsYUFBYSxFQUFDLENBQUM7QUFFakg7O0dBRUc7QUFzQkgsTUFBTSxPQUFPLGtCQUFrQjs7K0dBQWxCLGtCQUFrQjtnSEFBbEIsa0JBQWtCLFlBcEJqQixZQUFZLEVBQUUsZUFBZSxhQUVuQyxlQUFlO2dIQWtCVixrQkFBa0IsYUFoQmpCO1FBQ04scUJBQXFCO1FBQ3JCLG1CQUFtQjtRQUNuQixvQkFBb0I7UUFDcEIsb0JBQW9CO1FBQ3BCLGNBQWM7UUFDZCxpQkFBaUI7UUFDakIsWUFBWTtRQUNaLG9CQUFvQjtRQUNwQixpQkFBaUI7UUFDakIsaUJBQWlCO1FBQ2pCLG1CQUFtQjtRQUNuQixpQkFBaUI7UUFDakIsb0JBQW9CO0tBQ3ZCLFlBbEJRLENBQUMsWUFBWSxFQUFFLGVBQWUsQ0FBQyxFQUVwQyxlQUFlOzJGQWtCVixrQkFBa0I7a0JBckI5QixRQUFRO21CQUFDO29CQUNOLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxlQUFlLENBQUM7b0JBQ3hDLE9BQU8sRUFBRTt3QkFDTCxlQUFlO3FCQUNsQjtvQkFDRCxTQUFTLEVBQUM7d0JBQ04scUJBQXFCO3dCQUNyQixtQkFBbUI7d0JBQ25CLG9CQUFvQjt3QkFDcEIsb0JBQW9CO3dCQUNwQixjQUFjO3dCQUNkLGlCQUFpQjt3QkFDakIsWUFBWTt3QkFDWixvQkFBb0I7d0JBQ3BCLGlCQUFpQjt3QkFDakIsaUJBQWlCO3dCQUNqQixtQkFBbUI7d0JBQ25CLGlCQUFpQjt3QkFDakIsb0JBQW9CO3FCQUN2QjtpQkFDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBWYWx1ZVByb3ZpZGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgUGRmVmlld2VyQ29tcG9uZW50IH0gZnJvbSAnLi9wZGZ2aWV3ZXIuY29tcG9uZW50JztcbmltcG9ydCB7IFBkZlZpZXdlck1vZHVsZSB9IGZyb20gJy4vcGRmdmlld2VyLm1vZHVsZSc7XG5pbXBvcnQge0xpbmtBbm5vdGF0aW9uLCBCb29rbWFya1ZpZXcsIE1hZ25pZmljYXRpb24sIFRodW1ibmFpbFZpZXcsIFRvb2xiYXIsIE5hdmlnYXRpb24sIFByaW50LCBUZXh0U2VsZWN0aW9uLCBUZXh0U2VhcmNoLCBBbm5vdGF0aW9uLCBGb3JtRGVzaWduZXIsIEZvcm1GaWVsZHMsIFBhZ2VPcmdhbml6ZXJ9IGZyb20gJ0BzeW5jZnVzaW9uL2VqMi1wZGZ2aWV3ZXInXG5cblxuZXhwb3J0IGNvbnN0IExpbmtBbm5vdGF0aW9uU2VydmljZTogVmFsdWVQcm92aWRlciA9IHsgcHJvdmlkZTogJ1BkZlZpZXdlckxpbmtBbm5vdGF0aW9uJywgdXNlVmFsdWU6IExpbmtBbm5vdGF0aW9ufTtcbmV4cG9ydCBjb25zdCBCb29rbWFya1ZpZXdTZXJ2aWNlOiBWYWx1ZVByb3ZpZGVyID0geyBwcm92aWRlOiAnUGRmVmlld2VyQm9va21hcmtWaWV3JywgdXNlVmFsdWU6IEJvb2ttYXJrVmlld307XG5leHBvcnQgY29uc3QgTWFnbmlmaWNhdGlvblNlcnZpY2U6IFZhbHVlUHJvdmlkZXIgPSB7IHByb3ZpZGU6ICdQZGZWaWV3ZXJNYWduaWZpY2F0aW9uJywgdXNlVmFsdWU6IE1hZ25pZmljYXRpb259O1xuZXhwb3J0IGNvbnN0IFRodW1ibmFpbFZpZXdTZXJ2aWNlOiBWYWx1ZVByb3ZpZGVyID0geyBwcm92aWRlOiAnUGRmVmlld2VyVGh1bWJuYWlsVmlldycsIHVzZVZhbHVlOiBUaHVtYm5haWxWaWV3fTtcbmV4cG9ydCBjb25zdCBUb29sYmFyU2VydmljZTogVmFsdWVQcm92aWRlciA9IHsgcHJvdmlkZTogJ1BkZlZpZXdlclRvb2xiYXInLCB1c2VWYWx1ZTogVG9vbGJhcn07XG5leHBvcnQgY29uc3QgTmF2aWdhdGlvblNlcnZpY2U6IFZhbHVlUHJvdmlkZXIgPSB7IHByb3ZpZGU6ICdQZGZWaWV3ZXJOYXZpZ2F0aW9uJywgdXNlVmFsdWU6IE5hdmlnYXRpb259O1xuZXhwb3J0IGNvbnN0IFByaW50U2VydmljZTogVmFsdWVQcm92aWRlciA9IHsgcHJvdmlkZTogJ1BkZlZpZXdlclByaW50JywgdXNlVmFsdWU6IFByaW50fTtcbmV4cG9ydCBjb25zdCBUZXh0U2VsZWN0aW9uU2VydmljZTogVmFsdWVQcm92aWRlciA9IHsgcHJvdmlkZTogJ1BkZlZpZXdlclRleHRTZWxlY3Rpb24nLCB1c2VWYWx1ZTogVGV4dFNlbGVjdGlvbn07XG5leHBvcnQgY29uc3QgVGV4dFNlYXJjaFNlcnZpY2U6IFZhbHVlUHJvdmlkZXIgPSB7IHByb3ZpZGU6ICdQZGZWaWV3ZXJUZXh0U2VhcmNoJywgdXNlVmFsdWU6IFRleHRTZWFyY2h9O1xuZXhwb3J0IGNvbnN0IEFubm90YXRpb25TZXJ2aWNlOiBWYWx1ZVByb3ZpZGVyID0geyBwcm92aWRlOiAnUGRmVmlld2VyQW5ub3RhdGlvbicsIHVzZVZhbHVlOiBBbm5vdGF0aW9ufTtcbmV4cG9ydCBjb25zdCBGb3JtRGVzaWduZXJTZXJ2aWNlOiBWYWx1ZVByb3ZpZGVyID0geyBwcm92aWRlOiAnUGRmVmlld2VyRm9ybURlc2lnbmVyJywgdXNlVmFsdWU6IEZvcm1EZXNpZ25lcn07XG5leHBvcnQgY29uc3QgRm9ybUZpZWxkc1NlcnZpY2U6IFZhbHVlUHJvdmlkZXIgPSB7IHByb3ZpZGU6ICdQZGZWaWV3ZXJGb3JtRmllbGRzJywgdXNlVmFsdWU6IEZvcm1GaWVsZHN9O1xuZXhwb3J0IGNvbnN0IFBhZ2VPcmdhbml6ZXJTZXJ2aWNlOiBWYWx1ZVByb3ZpZGVyID0geyBwcm92aWRlOiAnUGRmVmlld2VyUGFnZU9yZ2FuaXplcicsIHVzZVZhbHVlOiBQYWdlT3JnYW5pemVyfTtcblxuLyoqXG4gKiBOZ01vZHVsZSBkZWZpbml0aW9uIGZvciB0aGUgUGRmVmlld2VyIGNvbXBvbmVudCB3aXRoIHByb3ZpZGVycy5cbiAqL1xuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBQZGZWaWV3ZXJNb2R1bGVdLFxuICAgIGV4cG9ydHM6IFtcbiAgICAgICAgUGRmVmlld2VyTW9kdWxlXG4gICAgXSxcbiAgICBwcm92aWRlcnM6W1xuICAgICAgICBMaW5rQW5ub3RhdGlvblNlcnZpY2UsXG4gICAgICAgIEJvb2ttYXJrVmlld1NlcnZpY2UsXG4gICAgICAgIE1hZ25pZmljYXRpb25TZXJ2aWNlLFxuICAgICAgICBUaHVtYm5haWxWaWV3U2VydmljZSxcbiAgICAgICAgVG9vbGJhclNlcnZpY2UsXG4gICAgICAgIE5hdmlnYXRpb25TZXJ2aWNlLFxuICAgICAgICBQcmludFNlcnZpY2UsXG4gICAgICAgIFRleHRTZWxlY3Rpb25TZXJ2aWNlLFxuICAgICAgICBUZXh0U2VhcmNoU2VydmljZSxcbiAgICAgICAgQW5ub3RhdGlvblNlcnZpY2UsXG4gICAgICAgIEZvcm1EZXNpZ25lclNlcnZpY2UsXG4gICAgICAgIEZvcm1GaWVsZHNTZXJ2aWNlLFxuICAgICAgICBQYWdlT3JnYW5pemVyU2VydmljZVxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgUGRmVmlld2VyQWxsTW9kdWxlIHsgfSJdfQ==