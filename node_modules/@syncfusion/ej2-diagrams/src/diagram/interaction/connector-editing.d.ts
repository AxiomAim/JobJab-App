import { PointModel } from '../primitives/point-model';
import { ConnectorModel } from '../objects/connector-model';
import { CommandHandler } from './command-manager';
import { MouseEventArgs } from './event-handlers';
import { ToolBase } from './tool';
/**
 * Multiple segments editing for Connector
 */
export declare class ConnectorEditing extends ToolBase {
    private endPoint;
    private oldValue;
    private selectedSegment;
    private segmentIndex;
    constructor(commandHandler: CommandHandler, endPoint: string);
    /**
     * mouseDown method\
     *
     * @returns {  void }    mouseDown method .\
     * @param {MouseEventArgs} args - provide the args value.
     * @private
     */
    mouseDown(args: MouseEventArgs): void;
    /**
     * mouseMove method\
     *
     * @returns {  void }    mouseMove method .\
     * @param {MouseEventArgs} args - provide the args value.
     * @private
     */
    mouseMove(args: MouseEventArgs): boolean;
    /**
     * mouseUp method\
     *
     * @returns {  void }    mouseUp method .\
     * @param {MouseEventArgs} args - provide the args value.
     * @private
     */
    mouseUp(args: MouseEventArgs): void;
    private removePrevSegment;
    private findSegmentDirection;
    private removeNextSegment;
    /**
     * addOrRemoveSegment method Used to add or remove intermediate segments to the straight connector. \
     *
     * @returns {void} addOrRemoveSegment method Used to add or remove intermediate segments to the straight connector.
     * @param {ConnectorModel} connector - provide the connector value in which segment to be added/removed.
     * @param {PointModel} point - provide the mouse clicked position as a point of the segment
     * @param {CommandHandler} commandHandler - provide the CommandHandler value that defines the behavior of commands
     * @private
     */
    addOrRemoveSegment(connector: ConnectorModel, point: PointModel, commandHandler?: CommandHandler): void;
    private findIndex;
    private dragOrthogonalSegment;
    private addSegments;
    private insertFirstSegment;
    private updateAdjacentSegments;
    private addTerminalSegment;
    private updatePortSegment;
    private updatePreviousSegment;
    private changeSegmentDirection;
    private updateNextSegment;
    private updateFirstSegment;
    private updateLastSegment;
    /**
     *To destroy the module
     *
     * @returns {void} To destroy the module
     */
    destroy(): void;
    /**
     * Get module name.
     */
    /**
     * Get module name.\
     *
     * @returns {  string  }    Get module name.\
     */
    protected getModuleName(): string;
}
