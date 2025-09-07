import { CircularGauge } from '../circular-gauge';
import { Size, GaugeLocation, Rect, TextOption } from '../utils/helper-common';
import { Border } from '../model/base';
import { LegendPosition, GaugeShape } from '../utils/enum';
import { Axis } from '../axes/axis';
import { LegendSettingsModel } from '../model/base-model';
import { ILegendRegions } from '../model/interface';
export declare class Legend {
    legendCollection: LegendOptions[];
    legendRenderingCollections: any[];
    protected legendRegions: ILegendRegions[];
    titleRect: Rect;
    private totalRowCount;
    private maxColumnWidth;
    protected maxItemHeight: number;
    protected isPaging: boolean;
    protected isVertical: boolean;
    private rowCount;
    private pageButtonSize;
    protected pageXCollections: number[];
    protected maxColumns: number;
    maxWidth: number;
    private clipRect;
    private legendTranslateGroup;
    protected currentPage: number;
    private gauge;
    private totalPages;
    private legend;
    private legendID;
    protected pagingRegions: Rect[];
    private clipPathHeight;
    private toggledIndexes;
    /**
     * Sets and gets the legend bounds in circular gauge.
     *
     * @private
     */
    legendBounds: Rect;
    /**
     * @private
     */
    position: LegendPosition;
    constructor(gauge: CircularGauge);
    /**
     * Binding events for legend module.
     *
     * @returns {void}
     */
    private addEventListener;
    /**
     * UnBinding events for legend module.
     *
     * @returns {void}
     */
    private removeEventListener;
    /**
     * Get the legend options.
     *
     * @param {Axis[]} axes - Specifies the axes.
     * @returns {void}
     * @private
     */
    getLegendOptions(axes: Axis[]): void;
    calculateLegendBounds(rect: Rect, availableSize: Size): void;
    /**
     * To find legend alignment for chart and accumulation chart
     *
     * @param {number} start - Specifies the start.
     * @param {number} size - Specifies the size.
     * @param {number} legendSize - Specifies the  legendSize.
     * @param {Alignment} alignment - Specifies the alignment.
     * @returns {number} - Returns the start value.
     */
    private alignLegend;
    /**
     * To find legend location based on position, alignment for chart and accumulation chart
     *
     * @param {LegendPosition} position - Specifies the position.
     * @param {Alignment} alignment - Specifies the alignment.
     * @param {Rect} legendBounds - Specifies the legendBounds.
     * @param {Rect} rect - Specifies the rect.
     * @param {Size} availableSize - Specifies the availableSize.
     * @returns {void}
     */
    private getLocation;
    /**
     * Renders the legend.
     *
     * @param {LegendSettingsModel} legend - Specifies the legend.
     * @param {Rect} legendBounds - Specifies the legendBounds.
     * @returns {void}
     * @private
     */
    renderLegend(legend: LegendSettingsModel, legendBounds: Rect): void;
    /**
     * To render legend paging elements for chart and accumulation chart
     *
     * @param {Rect} bounds - Specifies the bounds.
     * @param {TextOption} textOption - Specifies the textOption.
     * @param {Element} legendGroup - Specifies the legendGroup.
     * @returns {void}
     */
    private renderPagingElements;
    /**
     * To translate legend pages for chart and accumulation chart
     *
     * @param {Element} pagingText - Specifies the pagingText.
     * @param {number} page - Specifies the page.
     * @param {number} pageNumber - Specifies the pageNumber.
     * @returns {number} - Returns the size.
     */
    protected translatePage(pagingText: Element, page: number, pageNumber: number): number;
    /**
     * To render legend text for chart and accumulation chart
     *
     * @param {LegendOptions} legendOption - Specifies the legendOption.
     * @param {Element} group - Specifies the group.
     * @param {TextOption} textOptions - Specifies the textOptions.
     * @param {number} axisIndex - Specifies the axisIndex.
     * @param {number} rangeIndex - Specifies the rangeIndex.
     * @returns {void}
     */
    protected renderText(legendOption: LegendOptions, group: Element, textOptions: TextOption, axisIndex: number, rangeIndex: number): void;
    /**
     * To render legend symbols for chart and accumulation chart
     *
     * @param {LegendOptions} legendOption - Specifies the legendOption.
     * @param {Element} group - Specifies the group.
     * @param {number} axisIndex - Specifies the axisIndex.
     * @param {number} rangeIndex - Specifies the rangeIndex.
     * @returns {void}
     */
    protected renderSymbol(legendOption: LegendOptions, group: Element, axisIndex: number, rangeIndex: number): void;
    /**
     * To find legend rendering locations from legend options.
     *
     * @param {LegendOptions} legendOption - Specifies the legendOption.
     * @param {GaugeLocation} start - Specifies the start.
     * @param {number} textPadding - Specifies the textPadding.
     * @param {LegendOptions} prevLegend - Specifies the prevLegend.
     * @param {Rect} rect - Specifies the rect.
     * @param {number} count - Specifies the count.
     * @param {number} firstLegend - Specifies the firstLegend.
     * @returns {void}
     * @private
     */
    getRenderPoint(legendOption: LegendOptions, start: GaugeLocation, textPadding: number, prevLegend: LegendOptions, rect: Rect, count: number, firstLegend: number): void;
    private isWithinBounds;
    /**
     * To show or hide the legend on clicking the legend.
     *
     * @param {Event} event - Specifies the event argument.
     * @returns {void}
     *
     * @private
     */
    click(event: Event): void;
    /**
     * Set toggled legend styles.
     *
     * @param {Index[]} toggledIndexes - Specifies the toggledIndexes.
     * @returns {void}
     */
    private setStyles;
    /**
     * To get legend by index
     *
     * @param {number} axisIndex - Specifies the axisIndex.
     * @param {number} rangeIndex - Specifies the rangeIndex.
     * @param {LegendOptions[]} legendCollections - Specifies the legendCollections.
     * @returns {LegendOptions} - Specifies the LegendOptions.
     */
    private legendByIndex;
    /**
     * To change legend pages for chart and accumulation chart
     *
     * @param {Event} event - Specifies the event.
     * @param {boolean} pageUp - Specifies the pageUp.
     * @returns {void}
     */
    protected changePage(event: Event, pageUp: boolean): void;
    /**
     * To find available width from legend x position.
     *
     * @param {number} tx - Specifies the tx value.
     * @param {number} width - Specifies the width.
     * @returns {number} - Returns the number.
     */
    private getAvailWidth;
    /**
     * To create legend rendering elements for chart and accumulation chart
     *
     * @param {Rect} legendBounds - Specifies the legendBounds.
     * @param {Element} legendGroup - Specifies the legendGroup.
     * @param {LegendSettingsModel} legend - Specifies the legend.
     * @param {string} id - Specifies the id.
     * @returns {Element} - Returns the element.
     */
    private createLegendElements;
    /**
     * Method to append child element
     *
     * @param {Element} parent - Specifies the element.
     * @param {Element} childElement - Specifies the child element.
     * @returns {void}
     */
    private appendChildElement;
    /**
     * To find first valid legend text index for chart and accumulation chart
     *
     * @param {LegendOptions[]} legendCollection - Specifies the legend collection.
     * @returns {number} - Returns the count.
     */
    private findFirstLegendPosition;
    /**
     * To find legend bounds for accumulation chart.
     *
     * @param {Size} availableSize - Specifies the availableSize.
     * @param {Rect} legendBounds - Specifies the legendBounds.
     * @param {LegendSettingsModel} legend - Specifies the legend.
     * @returns {void}
     * @private
     */
    getLegendBounds(availableSize: Size, legendBounds: Rect, legend: LegendSettingsModel): void;
    /**
     * @param {Rect} rect - Specifies the rect.
     * @param {number} left - Specifies the left.
     * @param {number} right - Specifies the right.
     * @param {number} top - Specifies the top.
     * @param {number} bottom - Specifies the bottom.
     * @returns {Rect} - Returns the rect.
     * @private
     */
    private subtractThickness;
    /**
     * To set bounds for chart and accumulation chart
     *
     * @param {number} computedWidth - Specifies compute width.
     * @param {number} computedHeight - Specifies compute height.
     * @param {LegendSettingsModel} legend - Specifies the legend.
     * @param {Rect} legendBounds - Specifies the legend bounds.
     * @returns {void}
     */
    protected setBounds(computedWidth: number, computedHeight: number, legend: LegendSettingsModel, legendBounds: Rect): void;
    /**
     * To find maximum column size for legend
     *
     * @param {number[]} columns - Specifies the columns
     * @param {number} width - Specifies the width
     * @param {number} padding - Specifies the padding
     * @param {number} rowWidth - Specifies the row width
     * @returns {number} - Returns the number
     */
    private getMaxColumn;
    /**
     * Get module name.
     *
     * @returns {string} - Returns the module name.
     */
    protected getModuleName(): string;
    /**
     * To destroy the legend.
     *
     * @returns {void}
     * @private
     */
    destroy(): void;
}
/**
 * @private
 */
export declare class Index {
    axisIndex: number;
    rangeIndex: number;
    isToggled: boolean;
    constructor(axisIndex: number, rangeIndex?: number, isToggled?: boolean);
}
/**
 * Class for legend options
 *
 * @private
 */
export declare class LegendOptions {
    render: boolean;
    text: string;
    originalText: string;
    fill: string;
    shape: GaugeShape;
    visible: boolean;
    textSize: Size;
    location: GaugeLocation;
    border: Border;
    shapeBorder: Border;
    shapeWidth: number;
    shapeHeight: number;
    rangeIndex?: number;
    axisIndex?: number;
    constructor(text: string, originalText: string, fill: string, shape: GaugeShape, visible: boolean, border: Border, shapeBorder: Border, shapeWidth: number, shapeHeight: number, rangeIndex?: number, axisIndex?: number);
}
