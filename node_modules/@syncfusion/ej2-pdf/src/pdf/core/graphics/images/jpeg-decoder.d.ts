import { _ImageDecoder } from './image-decoder';
import { _PdfStream } from './../../base-stream';
import { _PdfDictionary } from './../../pdf-primitives';
export declare class _JpegDecoder extends _ImageDecoder {
    /**
     * Initializes a new instance of the `_JpegDecoder` class.
     *
     * @private
     * @param {Uint8Array} stream byte array.
     */
    constructor(stream: Uint8Array);
    readonly _imageDataAsNumberArray: ArrayBuffer;
    _initialize(): void;
    _readHeader(): void;
    _getImageDictionary(): _PdfStream;
    _getColorSpace(): string;
    _getDecodeParams(): _PdfDictionary;
    _skipStream(): void;
    _readExceededJpegImage(): void;
    _getMarker(): number;
}
