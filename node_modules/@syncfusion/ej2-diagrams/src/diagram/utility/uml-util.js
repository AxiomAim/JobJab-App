import { NodeConstraints, AnnotationConstraints } from '../enum/enum';
import { Node } from '../objects/node';
import { randomId } from './../utility/base-util';
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
export function getULMClassifierShapes(content, node, diagram) {
    var classifier;
    var textWrap = 'NoWrap';
    if (node.shape.classifier === 'Class') {
        classifier = node.shape.classShape;
    }
    else if (node.shape.classifier === 'Enumeration') {
        classifier = node.shape.enumerationShape;
    }
    else if (node.shape.classifier === 'Interface') {
        classifier = node.shape.interfaceShape;
    }
    //let attributeText: string = '';
    node.container = { type: 'Stack', orientation: 'Vertical' };
    node.constraints = (NodeConstraints.Default | NodeConstraints.HideThumbs) &
        ~(NodeConstraints.Rotate | NodeConstraints.Resize);
    node.style = {
        fill: node.style.fill, strokeColor: node.style.strokeColor,
        strokeWidth: 1.5
    };
    node.children = [];
    if (node.maxWidth) {
        textWrap = 'Wrap';
    }
    var newObj = new Node(diagram, 'nodes', {
        id: node.id + '_umlClass_header',
        annotations: [
            {
                id: 'name', content: classifier.name,
                offset: { x: 0.5, y: 0.65 }, margin: { left: 10, right: 10 },
                style: {
                    bold: true, fontSize: 14, color: classifier.style.color, fill: classifier.style.fill,
                    textWrapping: textWrap
                }
            }, {
                content: '<<' + node.shape.classifier + '>>', margin: { left: 10, right: 10 },
                id: 'class', style: {
                    fontSize: classifier.style.fontSize,
                    color: classifier.style.color, fill: classifier.style.fill,
                    textWrapping: textWrap
                }, offset: { x: 0.5, y: 0.3 }, constraints: AnnotationConstraints.ReadOnly
            }
        ],
        constraints: (NodeConstraints.Default | NodeConstraints.HideThumbs) & ~(NodeConstraints.Rotate | NodeConstraints.Drag | NodeConstraints.Resize),
        verticalAlignment: 'Stretch',
        horizontalAlignment: 'Stretch',
        style: { fill: node.style.fill, strokeColor: (node.style.strokeColor === 'black') ? '#ffffff00' : node.style.strokeColor }
    }, true);
    diagram.initObject(newObj);
    diagram.nodes.push(newObj);
    diagram.UpdateBlazorDiagramModel(newObj, 'Node');
    node.children.push(newObj.id);
    getClassNodes(node, diagram, classifier, textWrap);
    getClassMembers(node, diagram, classifier, textWrap);
    /* eslint-disable */
    node.offsetX = node.offsetX;
    node.offsetY = node.offsetY;
    node.style.fill = node.style.fill;
    node.borderColor = node.borderColor;
    diagram.initObject(node);
    /* eslint-enable */
    return content;
}
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
export function getClassNodes(node, diagram, classifier, textWrap) {
    if (node.shape.classifier === 'Enumeration') {
        var member = classifier.members;
        if (member && member.length) {
            addSeparator(node, diagram);
            var memberText = '';
            for (var i = 0; i < member.length; i++) {
                var members = member[parseInt(i.toString(), 10)];
                if (members.name !== '') {
                    memberText += members.name;
                }
                if (i !== member.length) {
                    var style = getStyle(node, members);
                    var temp = new Node(diagram, 'nodes', {
                        id: randomId() + '_umlMember',
                        annotations: [
                            {
                                id: 'name', content: memberText, offset: { x: 0, y: 0.5 },
                                style: {
                                    bold: true, fontSize: style.fontSize, color: style.color, fill: style.fill,
                                    textWrapping: textWrap, italic: style.italic, fontFamily: style.fontFamily, whiteSpace: style.whiteSpace,
                                    textAlign: style.textAlign, textDecoration: style.textDecoration, textOverflow: style.textOverflow
                                },
                                margin: { left: 14, right: 5 }, horizontalAlignment: 'Left'
                            }
                        ], verticalAlignment: 'Stretch', horizontalAlignment: 'Stretch',
                        style: {
                            fill: node.style.fill, strokeColor: (node.style.strokeColor === 'black') ?
                                '#ffffff00' : node.style.strokeColor, textWrapping: textWrap
                        },
                        constraints: (NodeConstraints.Default | NodeConstraints.HideThumbs) & ~(NodeConstraints.Rotate | NodeConstraints.Drag | NodeConstraints.Resize),
                        minHeight: 25
                    }, true);
                    diagram.initObject(temp);
                    diagram.nodes.push(temp);
                    diagram.UpdateBlazorDiagramModel(temp, 'Node');
                    node.children.push(temp.id);
                    memberText = '';
                    if (members.isSeparator && (i !== member.length - 1)) {
                        addSeparator(node, diagram, members.separatorStyle);
                    }
                    //isSeperator boolean set as false whether it is set as true for last element
                    if (members.isSeparator && (i === member.length - 1)) {
                        members.isSeparator = false;
                    }
                }
            }
        }
    }
    else {
        var attributes = classifier.attributes;
        if (attributes.length) {
            var attributeText = '';
            addSeparator(node, diagram);
            for (var i = 0; i < attributes.length; i++) {
                var text = void 0;
                var attribute = attributes[parseInt(i.toString(), 10)];
                if (attribute.scope && (attribute).scope === 'Public') {
                    text = ' +';
                }
                else if (attribute.scope && attribute.scope === 'Private') {
                    text = '-';
                }
                else if (attribute.scope && attribute.scope === 'Protected') {
                    text = '#';
                }
                else {
                    text = '~';
                }
                if (attribute.name !== '') {
                    if (text) {
                        attributeText += text + ' ' + attribute.name + ' ' + ': ' + attribute.type;
                    }
                }
                if (i !== attributes.length) {
                    var style = getStyle(node, attribute);
                    var temp = new Node(diagram, 'nodes', {
                        id: randomId() + '_umlProperty', style: { fill: node.style.fill,
                            strokeColor: (node.style.strokeColor === 'black') ? '#ffffff00' : node.style.strokeColor },
                        annotations: [
                            {
                                id: 'name', content: attributeText, offset: { x: 0, y: 0.5 },
                                style: {
                                    bold: true, fontSize: style.fontSize, color: style.color, fill: style.fill,
                                    textWrapping: textWrap, italic: style.italic, fontFamily: style.fontFamily, whiteSpace: style.whiteSpace,
                                    textAlign: style.textAlign, textDecoration: style.textDecoration, textOverflow: style.textOverflow
                                },
                                margin: { left: 14, right: 5 }, horizontalAlignment: 'Left'
                            }
                        ], verticalAlignment: 'Stretch', horizontalAlignment: 'Stretch',
                        constraints: (NodeConstraints.Default | NodeConstraints.HideThumbs) & ~(NodeConstraints.Rotate | NodeConstraints.Drag | NodeConstraints.Resize),
                        minHeight: 25
                    }, true);
                    diagram.initObject(temp);
                    diagram.nodes.push(temp);
                    diagram.UpdateBlazorDiagramModel(temp, 'Node');
                    node.children.push(temp.id);
                    attributeText = '';
                    if (attribute.isSeparator && (i !== attributes.length - 1)) {
                        addSeparator(node, diagram, attribute.separatorStyle);
                    }
                    //isSeperator boolean set as false whether it is set as true for last element
                    if (attribute.isSeparator && (i === attributes.length - 1)) {
                        attribute.isSeparator = false;
                    }
                }
            }
        }
    }
}
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
export function getClassNodesChild(node, diagram, classifier, textWrap) {
    if (node.shape.classifier === 'Enumeration') {
        var member = classifier.members;
        var memberText = '';
        // if there is no members in existing array, then the separator need to be added for new member
        if (member.length == 1) {
            var newIndex = member.length;
            addSeparatorChild(node, diagram, newIndex);
        }
        var count = 0;
        // Need to indentify the index value for newly added member
        for (var i = 0; i < member.length - 1; i++) {
            if (member[parseInt(i.toString(), 10)].isSeparator == true) {
                count++;
            }
        }
        var index = member.length + count + 1;
        //Iterate through an array of members and create each member as a child node to the UML node
        for (var i = 0; i < member.length; i++) {
            var members = member[member.length - 1];
            if (members.name !== '') {
                memberText += members.name;
            }
            if (i !== member.length) {
                var style = getStyle(node, members);
                var temp = new Node(diagram, 'nodes', {
                    id: randomId() + '_umlMember',
                    annotations: [
                        {
                            id: 'name', content: memberText, offset: { x: 0, y: 0.5 },
                            style: {
                                bold: true, fontSize: style.fontSize, color: style.color, fill: style.fill,
                                textWrapping: textWrap, italic: style.italic, fontFamily: style.fontFamily, whiteSpace: style.whiteSpace,
                                textAlign: style.textAlign, textDecoration: style.textDecoration, textOverflow: style.textOverflow
                            },
                            margin: { left: 14, right: 5 }, horizontalAlignment: 'Left'
                        }
                    ], verticalAlignment: 'Stretch', horizontalAlignment: 'Stretch',
                    style: {
                        fill: node.style.fill, strokeColor: (node.style.strokeColor === 'black') ?
                            '#ffffff00' : node.style.strokeColor, textWrapping: textWrap
                    },
                    constraints: (NodeConstraints.Default | NodeConstraints.HideThumbs) & ~(NodeConstraints.Rotate | NodeConstraints.Drag | NodeConstraints.Resize),
                    minHeight: 25
                }, true);
                temp.parentId = node.id;
                temp.umlIndex = index;
                diagram.add(temp);
                memberText = '';
            }
            break;
        }
    }
}
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
export function getClassAttributesChild(node, diagram, classifier, textWrap) {
    if (classifier.attributes && classifier.attributes.length) {
        var attributes = classifier.attributes;
        var attributeText = '';
        var text = void 0;
        // if there is no attributes in existing array, then the separator need to be added for new attribute
        if (attributes.length == 1) {
            var newIndex = attributes.length;
            addSeparatorChild(node, diagram, newIndex);
        }
        var count = 0;
        // Need to indentify the index value for newly added attribute
        for (var i = 0; i < attributes.length - 1; i++) {
            if (attributes[parseInt(i.toString(), 10)].isSeparator == true) {
                count++;
            }
        }
        var index = attributes.length + count + 1;
        //Iterate through an array of attributes and create each attribute as a child node to the UML node
        for (var i = 0; i < attributes.length; i++) {
            var attribute = attributes[attributes.length - 1];
            if (attribute.scope && (attribute).scope === 'Public') {
                text = ' +';
            }
            else if (attribute.scope && attribute.scope === 'Private') {
                text = '-';
            }
            else if (attribute.scope && attribute.scope === 'Protected') {
                text = '#';
            }
            else {
                text = '~';
            }
            if (attribute.name !== '') {
                if (text) {
                    attributeText += text + ' ' + attribute.name + ' ' + ': ' + attribute.type;
                }
            }
            if (i !== attributes.length) {
                var style = getStyle(node, attribute);
                var temp = new Node(diagram, 'nodes', {
                    id: randomId() + '_umlProperty', style: { fill: node.style.fill,
                        strokeColor: (node.style.strokeColor === 'black') ? '#ffffff00' : node.style.strokeColor },
                    annotations: [
                        {
                            id: 'name', content: attributeText, offset: { x: 0, y: 0.5 },
                            style: {
                                bold: true, fontSize: style.fontSize, color: style.color, fill: style.fill,
                                textWrapping: textWrap, italic: style.italic, fontFamily: style.fontFamily, whiteSpace: style.whiteSpace,
                                textAlign: style.textAlign, textDecoration: style.textDecoration, textOverflow: style.textOverflow
                            },
                            margin: { left: 14, right: 5 }, horizontalAlignment: 'Left'
                        }
                    ], verticalAlignment: 'Stretch', horizontalAlignment: 'Stretch',
                    constraints: (NodeConstraints.Default | NodeConstraints.HideThumbs) & ~(NodeConstraints.Rotate | NodeConstraints.Drag | NodeConstraints.Resize),
                    minHeight: 25
                }, true);
                temp.parentId = node.id;
                temp.umlIndex = index;
                diagram.add(temp);
                attributeText = '';
            }
            break;
        }
    }
}
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
export function getClassMembers(node, diagram, classifier, textWrap) {
    if (classifier.methods && classifier.methods.length) {
        var methods = classifier.methods;
        addSeparator(node, diagram);
        var argumentText = '';
        var methodText = '';
        var text = void 0;
        for (var i = 0; i < methods.length; i++) {
            var method = methods[parseInt(i.toString(), 10)];
            if (method.scope && method.scope === 'Public') {
                text = ' +';
            }
            else if (method.scope && method.scope === 'Private') {
                text = '-';
            }
            else if (method.scope && method.scope === 'Protected') {
                text = '#';
            }
            else {
                text = '~';
            }
            if (method.parameters) {
                for (var j = 0; j < method.parameters.length; j++) {
                    if (method.parameters[parseInt(j.toString(), 10)].type) {
                        argumentText += method.parameters[parseInt(j.toString(), 10)].name + ':' + method.parameters[parseInt(j.toString(), 10)].type;
                    }
                    else {
                        argumentText += method.parameters[parseInt(j.toString(), 10)].name;
                    }
                    if (j !== method.parameters.length - 1) {
                        argumentText += ',';
                    }
                }
            }
            if (method.name !== '') {
                if (text) {
                    methodText += text + ' ' + method.name + '(' + argumentText + ')' + ' ' + ':' + ' ' + method.type;
                }
            }
            if (i !== methods.length) {
                var style = getStyle(node, method);
                var temp = new Node(diagram, 'nodes', {
                    id: randomId() + '_umlMethods', verticalAlignment: 'Stretch', horizontalAlignment: 'Stretch',
                    annotations: [
                        {
                            id: 'name', content: methodText, offset: { x: 0, y: 0.5 },
                            style: {
                                bold: true, fontSize: style.fontSize, color: style.color, fill: style.fill,
                                textWrapping: textWrap, italic: style.italic, fontFamily: style.fontFamily, whiteSpace: style.whiteSpace,
                                textAlign: style.textAlign, textDecoration: style.textDecoration, textOverflow: style.textOverflow
                            },
                            margin: { left: 14, right: 5 }, horizontalAlignment: 'Left'
                        }
                    ],
                    style: {
                        fill: node.style.fill, strokeColor: (node.style.strokeColor === 'black') ?
                            '#ffffff00' : node.style.strokeColor
                    }, minHeight: 25,
                    constraints: (NodeConstraints.Default | NodeConstraints.HideThumbs) & ~(NodeConstraints.Rotate | NodeConstraints.Drag | NodeConstraints.Resize)
                }, true);
                diagram.initObject(temp);
                diagram.nodes.push(temp);
                diagram.UpdateBlazorDiagramModel(temp, 'Node');
                node.children.push(temp.id);
                methodText = '';
                if (method.isSeparator && (i !== methods.length - 1)) {
                    addSeparator(node, diagram, method.separatorStyle);
                }
                //isSeperator boolean set as false whether it is set as true for last element
                if (method.isSeparator && (i === methods.length - 1)) {
                    method.isSeparator = false;
                }
            }
        }
    }
}
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
export function getClassMembersChild(node, diagram, classifier, textWrap) {
    if (classifier.methods && classifier.methods.length) {
        var methods = classifier.methods;
        var argumentText = '';
        var methodText = '';
        var text = void 0;
        var initialIndex = 1;
        var index = void 0;
        var attributeCount = 0;
        var methodCount = 0;
        var shapeModel = node.shape;
        var isClass = shapeModel.classifier === 'Class';
        var isInterface = shapeModel.classifier === 'Interface';
        var umlShape = isClass ? shapeModel.classShape : shapeModel.interfaceShape;
        // Need to indentify the index value for newly added method
        if (methods.length === 1) {
            if (umlShape.attributes.length > 0) {
                attributeCount = umlShape.attributes.filter(function (attr) { return attr.isSeparator; }).length;
                initialIndex = 1 + 1 + umlShape.attributes.length + attributeCount;
                index = initialIndex + 1;
                addSeparatorChild(node, diagram, initialIndex);
            }
            else {
                index = initialIndex + 1;
            }
        }
        // To determine the index value for adding methods, it is essential to take into account the existing attributes
        else {
            attributeCount = umlShape.attributes.filter(function (attr) { return attr.isSeparator; }).length;
            methodCount = umlShape.methods.filter(function (method) { return method.isSeparator; }).length;
            initialIndex = 1 + 1 + umlShape.attributes.length + attributeCount + umlShape.methods.length + methodCount;
            index = initialIndex + 1;
        }
        //Iterate through an array of methods and create each method as a child node to the UML node
        for (var i = 0; i < methods.length; i++) {
            var method = methods[methods.length - 1];
            if (method.scope && method.scope === 'Public') {
                text = ' +';
            }
            else if (method.scope && method.scope === 'Private') {
                text = '-';
            }
            else if (method.scope && method.scope === 'Protected') {
                text = '#';
            }
            else {
                text = '~';
            }
            if (method.parameters) {
                for (var j = 0; j < method.parameters.length; j++) {
                    if (method.parameters[parseInt(j.toString(), 10)].type) {
                        argumentText += method.parameters[parseInt(j.toString(), 10)].name + ':' + method.parameters[parseInt(j.toString(), 10)].type;
                    }
                    else {
                        argumentText += method.parameters[parseInt(j.toString(), 10)].name;
                    }
                    if (j !== method.parameters.length - 1) {
                        argumentText += ',';
                    }
                }
            }
            if (method.name !== '') {
                if (text) {
                    methodText += text + ' ' + method.name + '(' + argumentText + ')' + ' ' + ':' + ' ' + method.type;
                }
            }
            if (i !== methods.length) {
                var style = getStyle(node, method);
                var temp = new Node(diagram, 'nodes', {
                    id: randomId() + '_umlMethods', verticalAlignment: 'Stretch', horizontalAlignment: 'Stretch',
                    annotations: [
                        {
                            id: 'name', content: methodText, offset: { x: 0, y: 0.5 },
                            style: {
                                bold: true, fontSize: style.fontSize, color: style.color, fill: style.fill,
                                textWrapping: textWrap, italic: style.italic, fontFamily: style.fontFamily, whiteSpace: style.whiteSpace,
                                textAlign: style.textAlign, textDecoration: style.textDecoration, textOverflow: style.textOverflow
                            },
                            margin: { left: 14, right: 5 }, horizontalAlignment: 'Left'
                        }
                    ],
                    style: {
                        fill: node.style.fill, strokeColor: (node.style.strokeColor === 'black') ?
                            '#ffffff00' : node.style.strokeColor
                    }, minHeight: 25,
                    constraints: (NodeConstraints.Default | NodeConstraints.HideThumbs) & ~(NodeConstraints.Rotate | NodeConstraints.Drag | NodeConstraints.Resize)
                }, true);
                temp.parentId = node.id;
                temp.umlIndex = index;
                diagram.add(temp);
                methodText = '';
            }
            break;
        }
    }
}
/**
  * addSeparator method \
  *
  * @returns {void} addSeparator method .\
  * @param { Node} stack - provide the stack  value.
  * @param {Diagram} diagram - provide the diagram  value.
  * @param {SeperatorStyle} SeperatorStyle - provide the Seperator color.
  * @private
 */
export function addSeparator(stack, diagram, SeperatorStyle) {
    var lineObject = new Node(diagram, 'nodes', {
        id: randomId() + '_path', height: 1, constraints: NodeConstraints.Default & ~(NodeConstraints.Select),
        verticalAlignment: 'Stretch', horizontalAlignment: 'Stretch',
        style: { strokeColor: (stack.style.strokeColor === 'black') ? '#ffffff00' : stack.style.strokeColor,
            fill: SeperatorStyle ? SeperatorStyle.fill : 'white' }
    }, true);
    diagram.initObject(lineObject);
    diagram.nodes.push(lineObject);
    stack.children.push(lineObject.id);
}
/**
 * addSeparatorChild method -This method is designed to add a separator for the newly added child type to the UML node. \
 *
 * @returns {void} addSeparator method .\
 * @param { Node} stack - provide the stack  value.
 * @param {Diagram} diagram - provide the diagram  value.
 * @param {number} newIndex - provide the index value.
 * @private
 */
export function addSeparatorChild(stack, diagram, newIndex) {
    var lineObject = new Node(diagram, 'nodes', {
        id: randomId() + '_path', height: 1, constraints: NodeConstraints.Default & ~(NodeConstraints.Select),
        verticalAlignment: 'Stretch', horizontalAlignment: 'Stretch',
        style: { strokeColor: (stack.style.strokeColor === 'black') ? '#ffffff00' : stack.style.strokeColor, fill: "white" }
    }, true);
    lineObject.parentId = stack.id;
    lineObject.umlIndex = newIndex;
    diagram.add(lineObject);
}
/**
 * getStyle method \
 *
 * @returns {TextStyleModel} addSeparator method .\
 * @param { Node} stack - provide the stack  value.
 * @param {UmlClassModel} node - provide the node  value.
 * @private
 */
export function getStyle(stack, node) {
    var newStyle = {};
    var style = node.style;
    newStyle.fill = (style.fill !== 'transparent') ? style.fill : stack.style.fill;
    newStyle.color = style.color;
    newStyle.fontFamily = (style.fontFamily !== 'Arial') ? style.fontFamily : stack.style.fontFamily;
    newStyle.italic = style.italic;
    newStyle.bold = style.bold;
    newStyle.whiteSpace = style.whiteSpace;
    newStyle.textAlign = style.textAlign;
    newStyle.textWrapping = style.textWrapping;
    newStyle.textDecoration = style.textDecoration;
    newStyle.textOverflow = style.textOverflow;
    // newStyle.margin = style.mar
    newStyle.fontSize = (style.fontSize !== 12) ? style.fontSize : stack.style.fontSize;
    newStyle.strokeColor = (style.strokeColor !== 'black') ? style.strokeColor : stack.style.strokeColor;
    newStyle.strokeWidth = (style.strokeWidth !== 1) ? style.strokeWidth : stack.style.strokeWidth;
    return newStyle;
}
