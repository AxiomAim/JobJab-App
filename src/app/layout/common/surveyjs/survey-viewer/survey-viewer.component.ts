// import {
//     AsyncPipe,
//     DOCUMENT,
//     DatePipe,
//     I18nPluralPipe,
//     NgClass,
//     NgFor,
//     NgForOf,
//     NgIf,
//     TitleCasePipe,
// } from "@angular/common";
// import {
//     ChangeDetectionStrategy,
//     ChangeDetectorRef,
//     Component,
//     Input,
//     OnDestroy,
//     OnInit,
//     ViewChild,
//     ViewEncapsulation,
// } from "@angular/core";
// import {MatButtonModule} from "@angular/material/button";
// import {MatIconModule} from "@angular/material/icon";
// import {MatTooltipModule} from "@angular/material/tooltip";
// import {MatFormFieldModule} from "@angular/material/form-field";
// import {SurveyComponent, SurveyModule} from "survey-angular-ui";
// import {Model} from "survey-core";
// import {BorderlessLightPanelless} from "survey-core/themes";
// import {SurveyPDF, IDocOptions} from "survey-pdf";
// import {DavesaDrawerComponent} from "@davesa/components/drawer";
// import {DocController, SurveyHelper, FlatQuestion} from "survey-pdf";
// import {LOGO_BASE64, TITLE_FONT_BASE64, TEXT_FONT_BASE64} from "./assets.js";

// // Hide the border around a question's input field
// SurveyHelper.FORM_BORDER_VISIBLE = false;

// // Reduce the padding of read-only input fields
// SurveyHelper.VALUE_READONLY_PADDING_SCALE = 0;

// // Increase the width of item labels in Multiple Textboxes questions
// SurveyHelper.MULTIPLETEXT_TEXT_PERS = 0.55;

// // Increase the font size of page titles
// SurveyHelper.TITLE_PAGE_FONT_SIZE_SCALE = 1.4;

// // Increase the font size of question titles
// SurveyHelper.TITLE_FONT_SCALE = 1.4;

// // Change the text color for all questions
// SurveyHelper.TEXT_COLOR = "black";

// // Descrease the horizontal indent of the question content
// FlatQuestion.CONTENT_INDENT_SCALE = 0;

// // Decrease the vertical indent of the question content
// FlatQuestion.CONTENT_GAP_VERT_SCALE = 0.1;

// // Add custom fonts to the document
// const base64TitleFont = TITLE_FONT_BASE64;
// const base64TextFont = TEXT_FONT_BASE64;
// DocController.addFont("Roboto", base64TitleFont, "bold");
// DocController.addFont("Roboto", base64TextFont, "normal");

// const pdfDocOptions: IDocOptions = {
//     fontSize: 12,
//     matrixRenderAs: "list",
// };

// //   const surveyJson = { /* ... */ };

// //   const savePdf = function (surveyData: any) {
// //     const surveyPdf = new SurveyPDF(surveyJson, pdfDocOptions);
// //     surveyPdf.data = surveyData;
// //     surveyPdf.save();
// //   };

// @Component({
//     selector: "survey-viewer",
//     templateUrl: "./survey-viewer.component.html",
//     styles: [
//         `
//             #survey {
//                 height: 100%;
//                 width: 100%;
//             }
//         `,
//     ],
//     encapsulation: ViewEncapsulation.None,
//     changeDetection: ChangeDetectionStrategy.OnPush,
//     standalone: true,
//     imports: [
//         MatButtonModule,
//         MatFormFieldModule,
//         MatTooltipModule,
//         MatIconModule,
//         DavesaDrawerComponent,
//         SurveyModule,
//     ],
// })
// export class SurveyViewerComponent implements OnInit, OnDestroy {
//     @Input() surveyModel: Model;
//     @ViewChild("surveyViewerDrawer") surveyViewerDrawer: DavesaDrawerComponent;
//     @ViewChild("survey") surveyComponent: SurveyComponent;
//     private _document: Document = null;

//     @Input() set document(value: Document | null) {
//         this._document = value || null;
//         if (this._document) {
//             this.initialize();
//         }
//     }

//     get document(): Document {
//         return this._document;
//     }

//     // surveyModel: Model;

//     /**
//      * Constructor
//      */
//     constructor(private _changeDetectorRef: ChangeDetectorRef) {}

//     // -----------------------------------------------------------------------------------------------------
//     // @ Lifecycle hooks
//     // -----------------------------------------------------------------------------------------------------

//     /**
//      * On init
//      */
//     ngOnInit(): void {}

//     initialize() {
//         console.log("document", this.document);
//         if (this.document) {
//             const survey = new Model(JSON.stringify(this.document.eformForm.json));
//             const surveyJson = this.document.eformForm.json;
//             survey.applyTheme(BorderlessLightPanelless);
//             survey.title = this.document.eformForm.name;
//             survey.data = JSON.parse(this.document.eformForm.surveyData ? this.document.eformForm.surveyData : "{}");
//             survey.completedHtml = "<h3>Thank you for completing this Form!</h3>";
//             survey.onComplete.add(this.onSaveDocument.bind(this));
//             const savePdf = function (surveyData: any) {
//                 const surveyPdf = new SurveyPDF(surveyJson, pdfDocOptions);
//                 surveyPdf.data = surveyData;
//                 surveyPdf.save();
//             };
//             survey.addNavigationItem({
//                 id: "pdf-export",
//                 title: "Save as PDF",
//                 action: () => savePdf(survey.data),
//             });
//             // survey.mode = "display";
//             this.surveyModel = survey;
//         }
//     }

//     public savePdf() {
//         this.saveSurveyToPdf("surveyResult.pdf", this.surveyModel);
//     }

//     async onSaveDocument(survey) {
//         this.document.eformForm.surveyData = JSON.stringify(survey.data);
//         this._documentsDataService.updateItem(this.document).subscribe((document) => {});
//     }

//     /**
//      * On destroy
//      */
//     ngOnDestroy(): void {}

//     /**
//      * Track by function for ngFor loops
//      *
//      * @param index
//      * @param item
//      */
//     trackByFn(index: number, item: any): any {
//         return item.id || index;
//     }

//     createSurveyPdfModel(surveyModel) {
//         const pdfWidth = !!surveyModel && surveyModel.pdfWidth ? surveyModel.pdfWidth : 210;
//         const pdfHeight = !!surveyModel && surveyModel.pdfHeight ? surveyModel.pdfHeight : 297;
//         const options = {
//             margins: {
//                 left: 10,
//                 right: 10,
//                 top: 10,
//                 bot: 10,
//             },
//             format: [pdfWidth, pdfHeight],
//             fontSize: 10,
//             fontName: "Roboto",
//         };
//         const surveyPDF = new SurveyPDF(this.document.eformForm.json, options);
//         if (surveyModel) {
//             surveyPDF.data = surveyModel.data;
//             surveyPDF.locale = surveyModel.locale;
//         }
//         surveyPDF.mode = "display";

//         surveyPDF.onRenderHeader.add(async (_, canvas: any) => {
//             const unfoldedPacks = canvas.packs[0].unfold();
//             // Colorize the page title
//             unfoldedPacks.forEach((el) => (el.textColor = "#00008b"));
//             // Colorize the row line under the title
//             unfoldedPacks[unfoldedPacks.length - 1].color = "gray";
//             // Specify the thickness of the row line under the title
//             unfoldedPacks[unfoldedPacks.length - 1].yTop += canvas.controller.unitHeight * 0.9;
//             // Add a company logo
//             await canvas.drawImage({
//                 base64: LOGO_BASE64,
//                 horizontalAlign: "right",
//                 width: (canvas.rect.xRight - canvas.rect.xLeft) * 0.08,
//                 margins: {
//                     top: 15,
//                     right: 18,
//                 },
//             });
//         });

//         surveyPDF.onRenderQuestion.add((_, options: any) => {
//             console.log(options.bricks[0].unfold());
//             // Colorize the form field's title
//             options.bricks[0].unfold()[0].textColor = "blue";
//             // Draw a line under the form field and specify the line's color and thickness
//             const lastRowBricks = options.bricks[options.bricks.length - 1].unfold();
//             lastRowBricks[lastRowBricks.length - 1].color = "gray";
//             lastRowBricks[lastRowBricks.length - 1].yTop += options.controller.unitHeight * 1.3;
//             return new Promise<void>((resolve) => {
//                 resolve();
//             });
//         });

//         return surveyPDF;
//     }

//     saveSurveyToPdf(filename, surveyModel) {
//         this.createSurveyPdfModel(surveyModel).save(filename);
//     }
// }
