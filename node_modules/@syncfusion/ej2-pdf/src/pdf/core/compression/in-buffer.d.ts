export declare class _InBuffer {
    _buffer: number[];
    _begin: number;
    _end: number;
    _bBuffer: number;
    _bInBuffer: number;
    constructor();
    readonly _bytes: number;
    _needsInput(): boolean;
    _availableBits(count: number): boolean;
    _load16Bits(): number;
    _getBitMask(count: number): number;
    _getBits(count: number): number;
    _copyTo(output: number[], offset: number, length: number): number;
    _setInput(buffer: number[], offset: number, length: number): void;
    _skipBits(n: number): void;
    _skipByteBoundary(): void;
}
