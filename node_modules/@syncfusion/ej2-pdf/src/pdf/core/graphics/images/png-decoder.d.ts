import { _ImageDecoder } from './image-decoder';
import { _PdfStream } from './../../base-stream';
import { _PdfDictionary } from './../../pdf-primitives';
export declare class _PngDecoder extends _ImageDecoder {
    _isRedGreenBlue: boolean;
    _shades: boolean;
    _ideateDecode: boolean;
    _colors: number;
    _bitsPerPixel: number;
    _idatLength: number;
    _inputBands: number;
    _isDecode: boolean;
    _currentChunkLength: number;
    _header: _PngHeader;
    _encodedStream: number[];
    _maskData: number[];
    _colorSpace: any[];
    _alpha: number[];
    _dataStream: number[];
    _decodedImageData: number[];
    _dataStreamOffset: number;
    /**
     * Initializes a new instance of the `_PngDecoder` class.
     *
     * @private
     * @param {Uint8Array} stream byte array.
     */
    constructor(stream: Uint8Array);
    _initialize(): void;
    _hasValidChunkType(type: _PngChunkTypes): {
        type: _PngChunkTypes;
        hasValidChunk: boolean;
    };
    _ignoreChunk(): void;
    _readHeader(): void;
    _setBitsPerPixel(): void;
    _readImageData(): void;
    _readPhotoPlate(): void;
    _readTransparency(): void;
    _getPngColorSpace(): any;
    _decodeImageData(): void;
    _getDeflatedData(data: number[]): number[];
    _readDecodeData(): void;
    _decodeData(xOffset: number, yOffset: number, xStep: number, yStep: number, width: number, height: number): void;
    _readStream(stream: number[], streamOffset: number, data: number[], count: number): number;
    _decompressSub(data: number[], count: number, bitsPerPixel: number): void;
    _decompressUp(data: number[], pData: number[], count: number): void;
    _decompressAverage(data: number[], pData: number[], count: number, bitsPerPixel: number): void;
    _decompressPaeth(data: number[], pData: number[], count: number, bitsPerPixel: number): void;
    _paethPredictor(a: number, b: number, c: number): number;
    _processPixels(data: number[], x: number, step: number, y: number, width: number): void;
    _getPixel(data: number[]): number[];
    _setPixel(imageData: number[], data: number[], offset: number, size: number, x: number, y: number, bitDepth: number, bpr: number): number[];
    _getImageDictionary(): _PdfStream;
    _setMask(): void;
    _getDecodeParams(): _PdfDictionary;
    _getChunkType(chunk: string): _PngChunkTypes;
    _getFilterType(type: number): _PngFilterTypes;
}
declare class _PngHeader {
    constructor();
    _width: number;
    _height: number;
    _colorType: number;
    _compression: number;
    _bitDepth: number;
    _filter: _PngFilterTypes;
    _interlace: number;
}
declare enum _PngChunkTypes {
    iHDR = 0,
    pLTE = 1,
    iDAT = 2,
    iEND = 3,
    bKGD = 4,
    cHRM = 5,
    gAMA = 6,
    hIST = 7,
    pHYs = 8,
    sBIT = 9,
    tEXt = 10,
    tIME = 11,
    tRNS = 12,
    zTXt = 13,
    sRGB = 14,
    iCCP = 15,
    iTXt = 16,
    unknown = 17
}
declare enum _PngFilterTypes {
    none = 0,
    sub = 1,
    up = 2,
    average = 3,
    paeth = 4
}
export {};
