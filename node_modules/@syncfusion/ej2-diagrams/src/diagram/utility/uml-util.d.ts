import { Diagram } from '../diagram';
import { NodeModel, UmlClassModel } from '../objects/node-model';
import { DiagramElement } from '../core/elements/diagram-element';
import { ShapeStyleModel, TextStyleModel } from '../core/appearance-model';
import { TextWrap } from '../enum/enum';
import { Node } from '../objects/node';
/**
 * These utility methods help to process the data and to convert it to desired dimensions
 */
/**
 * getULMClassifierShapes method \
 *
 * @returns {DiagramElement} getULMClassifierShapes method .\
 * @param { DiagramElement} content - provide the content  value.
 * @param {NodeModel} node - provide the node  value.
 * @param {Diagram} diagram - provide the diagram  value.
 * @private
 */
export declare function getULMClassifierShapes(content: DiagramElement, node: NodeModel, diagram: Diagram): DiagramElement;
/**
 * getClassNodes method \
 *
 * @returns {void} getClassNodes method .\
 * @param { Node} node - provide the node  value.
 * @param {Diagram} diagram - provide the diagram  value.
 * @param {UmlClassModel} classifier - provide the classifier  value.
 * @param {TextWrap} textWrap - provide the textWrap  value.
 * @private
 */
export declare function getClassNodes(node: Node, diagram: Diagram, classifier: UmlClassModel, textWrap: TextWrap): void;
/**
 * getClassNodesChild method - This method is utilized to dynamically add members to a UML node at runtime. \
 *
 * @returns {void} getClassNodesChild method .\
 * @param { Node} node - provide the node  value.
 * @param {Diagram} diagram - provide the diagram  value.
 * @param {UmlClassModel} classifier - provide the classifier  value.
 * @param {TextWrap} textWrap - provide the textWrap  value.
 * @private
 */
export declare function getClassNodesChild(node: Node, diagram: Diagram, classifier: UmlClassModel, textWrap: TextWrap): void;
/**
 * getClassAttributesChild method - This method is utilized to dynamically add attributes to a UML node at runtime.\
 *
 * @returns {void} getClassAttributesChild method .\
 * @param { Node} node - provide the node  value.
 * @param {Diagram} diagram - provide the diagram  value.
 * @param {UmlClassModel} classifier - provide the classifier  value.
 * @param {TextWrap} textWrap - provide the textWrap  value.
 * @private
 */
export declare function getClassAttributesChild(node: Node, diagram: Diagram, classifier: UmlClassModel, textWrap: TextWrap): void;
/**
 * getClassMembers method \
 *
 * @returns {void} getClassMembers method .\
 * @param { Node} node - provide the node  value.
 * @param {Diagram} diagram - provide the diagram  value.
 * @param {UmlClassModel} classifier - provide the classifier  value.
 * @param {TextWrap} textWrap - provide the textWrap  value.
 * @private
 */
export declare function getClassMembers(node: Node, diagram: Diagram, classifier: UmlClassModel, textWrap: TextWrap): void;
/**
 * getClassMembersChild method - This method is utilized to dynamically add methods to a UML node at runtime. \
 *
 * @returns {void} getClassMembersChild method .\
 * @param { Node} node - provide the node  value.
 * @param {Diagram} diagram - provide the diagram  value.
 * @param {UmlClassModel} classifier - provide the classifier  value.
 * @param {TextWrap} textWrap - provide the textWrap  value.
 * @private
 */
export declare function getClassMembersChild(node: Node, diagram: Diagram, classifier: UmlClassModel, textWrap: TextWrap): void;
/**
  * addSeparator method \
  *
  * @returns {void} addSeparator method .\
  * @param { Node} stack - provide the stack  value.
  * @param {Diagram} diagram - provide the diagram  value.
  * @param {SeperatorStyle} SeperatorStyle - provide the Seperator color.
  * @private
 */
export declare function addSeparator(stack: Node, diagram: Diagram, SeperatorStyle?: ShapeStyleModel): void;
/**
 * addSeparatorChild method -This method is designed to add a separator for the newly added child type to the UML node. \
 *
 * @returns {void} addSeparator method .\
 * @param { Node} stack - provide the stack  value.
 * @param {Diagram} diagram - provide the diagram  value.
 * @param {number} newIndex - provide the index value.
 * @private
 */
export declare function addSeparatorChild(stack: Node, diagram: Diagram, newIndex?: number): void;
/**
 * getStyle method \
 *
 * @returns {TextStyleModel} addSeparator method .\
 * @param { Node} stack - provide the stack  value.
 * @param {UmlClassModel} node - provide the node  value.
 * @private
 */
export declare function getStyle(stack: Node, node: UmlClassModel): TextStyleModel;
