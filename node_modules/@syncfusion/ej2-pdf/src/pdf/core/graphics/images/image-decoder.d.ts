import { _PdfStream } from './../../base-stream';
import { _ImageFormat } from './../../enumerator';
export declare abstract class _ImageDecoder {
    _stream: Uint8Array;
    _format: _ImageFormat;
    _height: number;
    _width: number;
    _bitsPerComponent: number;
    _imageData: Uint8Array;
    _imageStream: _PdfStream;
    _maskStream: _PdfStream;
    _position: number;
    _noOfComponents: number;
    _reset(): void;
    _getBuffer(index: number): number;
    _read(buffer: Uint8Array, offset: number, count: number): void;
    _read(buffer: number[], offset: number, count: number, stream: number[]): {
        outputBuffer: number[];
        offset: number;
        length: number;
    };
    _readString(length: number): string;
    _seek(length: number): void;
    _readByte(): number;
    _toUnsigned16(value: number): number;
    _readUnsigned32(offset: number): number;
    abstract _getImageDictionary(): _PdfStream;
    abstract _initialize(): void;
    abstract _readHeader(): void;
}
