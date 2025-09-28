import { createInjectable } from "ngxtension/create-injectable";
import { signal, computed, inject } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, of } from "rxjs";

import {BookmarkViewService, MagnificationService, ThumbnailViewService,
    ToolbarService, NavigationService, TextSearchService, TextSelectionService, PrintService, AnnotationService, 
    FormDesignerService, LoadEventArgs, FormFieldsService, TextFieldSettings, SignatureFieldSettings, InitialFieldSettings, 
    CheckBoxFieldSettings, RadioButtonFieldSettings, FreeTextSettings,
    ListBoxFieldSettings,
    LinkAnnotationService,
    AnnotationSettings,
    AreaSettings,
    ArrowSettings,
    CircleSettings,
    CustomStampSettings,
    DistanceSettings,
    DocumentTextCollectionSettings,
    DropdownFieldSettings,
    InkAnnotationSettings,
    LineSettings,
    MeasurementSettings,
    PageOrganizerSettings,
    PasswordFieldSettings,
    RadiusSettings,
    RectangleSettings,
    ScrollSettings,
    ServerActionSettings,
    ShapeLabelSettings,
    SignatureDialogSettings,
    SignatureIndicatorSettings,
    StampSettings,
    StickyNotesSettings,
    TextDataSettings,
    TileRenderingSettings,
    ThumbnailView,
    FormDesigner,
    Annotation} from '@syncfusion/ej2-angular-pdfviewer';
import { ContextMenuService } from "@syncfusion/ej2-angular-grids";
import { ScrollDispatcher } from "@angular/cdk/scrolling";

export const ProjectsV2Service = createInjectable(() => {
  const _router = inject(Router);
  const _textFieldSettings = inject(TextFieldSettings);
  const _signatureFieldSettings = inject(SignatureFieldSettings);
  const _initialFieldSettings = inject(InitialFieldSettings);
  const _checkBoxFieldSettings = inject(CheckBoxFieldSettings);
  const _radioButtonFieldSettings = inject(RadioButtonFieldSettings);
  const _freeTextSettings = inject(FreeTextSettings);
  const _listBoxFieldSettings = inject(ListBoxFieldSettings);
  const _annotationSettings = inject(AnnotationSettings);
  const _areaSettings = inject(AreaSettings);
  const _arrowSettings = inject(ArrowSettings);
  const _circleSettings = inject(CircleSettings);
  const _customStampSettings = inject(CustomStampSettings);
  const _distanceSettings = inject(DistanceSettings);
  const _documentTextCollectionSettings = inject(DocumentTextCollectionSettings);
  const _dropdownFieldSettings = inject(DropdownFieldSettings);
  const _inkAnnotationSettings = inject(InkAnnotationSettings);
  const _lineSettings = inject(LineSettings);
  const _measurementSettings = inject(MeasurementSettings);
  const _pageOrganizerSettings = inject(PageOrganizerSettings);
  const _passwordFieldSettings = inject(PasswordFieldSettings);
  const _radiusSettings = inject(RadiusSettings);
  const _rectangleSettings = inject(RectangleSettings);
  const _scrollSettings = inject(ScrollSettings);
  const _ServerActionSettings = inject(ServerActionSettings);
  const _shapeLabelSettings = inject(ShapeLabelSettings);
  const _signatureDialogSettings = inject(SignatureDialogSettings);
  const _signatureIndicatorSettings = inject(SignatureIndicatorSettings);
  const _stampSettings = inject(StampSettings);
  const _StickyNotesSettings = inject(StickyNotesSettings);
  const _textDataSettings = inject(TextDataSettings);
  const _tileRenderingSettings = inject(TileRenderingSettings);
  const _thumbnailView = inject(ThumbnailView);
  const _formDesigner = inject(FormDesigner);
  const _annotation = inject(Annotation);
  
//   const projects = signal<Project[] | null>([]);
//   const project = signal<Project | null>(null);
//   const projectBoards = signal<ProjectBoard[] | null>([]);
//   const projectBoard = signal<ProjectBoard | null>(null);
//   const projectCards = signal<ProjectCard[] | null>([]);
//   const projectCard = signal<ProjectCard | null>(null);
//   const projectLists = signal<ProjectList[] | null>([]);
//   const projectList = signal<ProjectList | null>(null);
//   const projectLabels = signal<ProjectLabel[] | null>([]);
//   const projectLabel = signal<ProjectLabel | null>(null);
  

// getAllProjects
//   const freeTextAnnotation = (pdfviewer): Observable<User> => {
//     return new Observable<User>((observer) => {
//       loginUser.set(_firebaseAuthV2Service.loginUser());
//       organization.set(_firebaseAuthV2Service.organization());
//       if(loginUser()) {
//           observer.next(loginUser());
//         } else {
//           observer.error('Object not found');
//         }
//         observer.complete();
//     });
//   }
  



  return {    
    // allMenusItems: computed(() => allMenusItems()),
    // projects: computed(() => projects()),
    // project: computed(() => project()),
    // getloginUser,

  };
});

