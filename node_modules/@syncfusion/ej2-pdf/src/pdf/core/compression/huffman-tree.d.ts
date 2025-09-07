import { _InBuffer } from './in-buffer';
export declare class _HuffmanTree {
    static _maxLengthTree: number;
    static _maxDepthTree: number;
    static _nCLength: number;
    _tBits: number;
    _table: number[];
    _left: number[];
    _right: number[];
    _clArray: number[];
    _tMask: number;
    _load(code: number[]): void;
    _loadTree(isLengthTree: boolean): void;
    _initialize(): void;
    _getLengthTree(): number[];
    _getDepthTree(): number[];
    _calculateHashCode(): number[];
    _bitReverse(code: number, length: number): number;
    _createTable(): void;
    _getNextSymbol(input: _InBuffer): number;
}
