import { _InflaterState, _BlockType } from './enum';
import { _DecompressedOutput } from './decompressed-output';
import { _InBuffer } from './in-buffer';
import { _HuffmanTree } from './huffman-tree';
export declare class _Inflater {
    constructor();
    _output: _DecompressedOutput;
    _input: _InBuffer;
    _llTree: _HuffmanTree;
    _distanceTree: _HuffmanTree;
    _inflaterState: _InflaterState;
    _bfinal: number;
    _blockType: _BlockType;
    _blBuffer: number[];
    _bLength: number;
    _length: number;
    _distanceCode: number;
    _extraBits: number;
    _loopCounter: number;
    _llCodeCount: number;
    _dCodeCount: number;
    _clCodeCount: number;
    _caSize: number;
    _lengthCode: number;
    _codeList: number[];
    _cltcl: number[];
    _clTree: _HuffmanTree;
    _extraLengthBits: number[];
    _staticDistanceTreeTable: number[];
    _lengthBase: number[];
    _distanceBasePosition: number[];
    _codeOrder: number[];
    readonly _finished: boolean;
    _setInput(inputBytes: number[], offset: number, length: number): void;
    _inflate(bytes: number[], offset: number, length: number): {
        count: number;
        data: number[];
    };
    _decode(): boolean;
    _decodeUncompressedBlock(endBlock: boolean): {
        result: boolean;
        eob: boolean;
        output: _DecompressedOutput;
    };
    _unCompressedByte(): boolean;
    _decodeBlock(endBlock: boolean): {
        result: boolean;
        eob: boolean;
        output: _DecompressedOutput;
    };
    _inLength(fb: number): {
        value: boolean;
        fb: number;
    };
    _fLength(fb: number): {
        value: boolean;
        fb: number;
    };
    _dcode(fb: number): {
        value: boolean;
        fb: number;
    };
    _decodeDynamicBlockHeader(): boolean;
    _readingNDCodes(): boolean;
    _readingCodes(): boolean;
    _readingCLCodes(): boolean;
    _readingTCBefore(): boolean;
    _getBlockType(type: number): _BlockType;
    _getInflaterState(value: number): _InflaterState;
    _getInflaterStateValue(state: _InflaterState): number;
}
