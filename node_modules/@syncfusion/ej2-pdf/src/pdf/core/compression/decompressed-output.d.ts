import { _InBuffer } from './in-buffer';
export declare class _DecompressedOutput {
    constructor();
    static _dOutSize: number;
    static _dOutMask: number;
    _dOutput: number[];
    _end: number;
    _usedBytes: number;
    readonly _unusedBytes: number;
    _write(b: number): void;
    _writeLD(length: number, distance: number): void;
    _copyFrom(input: _InBuffer, length: number): number;
    _copyTo(output: number[], offset: number, length: number): {
        count: number;
        data: number[];
    };
}
