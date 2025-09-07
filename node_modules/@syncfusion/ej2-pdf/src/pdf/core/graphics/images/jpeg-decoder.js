var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { _ImageDecoder } from './image-decoder';
import { _PdfStream } from './../../base-stream';
import { _PdfDictionary, _PdfName } from './../../pdf-primitives';
import { _ImageFormat } from './../../enumerator';
var _JpegDecoder = /** @class */ (function (_super) {
    __extends(_JpegDecoder, _super);
    /**
     * Initializes a new instance of the `_JpegDecoder` class.
     *
     * @private
     * @param {Uint8Array} stream byte array.
     */
    function _JpegDecoder(stream) {
        var _this = _super.call(this) || this;
        _this._stream = stream;
        _this._initialize();
        return _this;
    }
    Object.defineProperty(_JpegDecoder.prototype, "_imageDataAsNumberArray", {
        get: function () {
            return this._imageData;
        },
        enumerable: true,
        configurable: true
    });
    _JpegDecoder.prototype._initialize = function () {
        this._format = _ImageFormat.jpeg;
        this._readHeader();
        this._reset();
        this._imageData = new Uint8Array(this._stream.byteLength);
        this._read(this._imageData, 0, this._imageData.byteLength);
    };
    _JpegDecoder.prototype._readHeader = function () {
        this._reset();
        var imgData = new Uint8Array(this._stream.byteLength);
        this._read(imgData, 0, imgData.byteLength);
        var i = 4;
        var length = this._getBuffer(i) * 256 + this._getBuffer(i + 1);
        var isLengthExceed = false;
        while (i < imgData.byteLength) {
            i += length;
            if (i < imgData.byteLength) {
                if (this._getBuffer(i + 1) === 192) {
                    this._height = this._getBuffer(i + 5) * 256 + this._getBuffer(i + 6);
                    this._width = this._getBuffer(i + 7) * 256 + this._getBuffer(i + 8);
                    this._noOfComponents = this._getBuffer(i + 9);
                    if (this._width !== 0 && this._height !== 0) {
                        return;
                    }
                }
                else {
                    i += 2;
                    length = this._getBuffer(i) * 256 + this._getBuffer(i + 1);
                }
            }
            else {
                isLengthExceed = true;
                break;
            }
        }
        if (isLengthExceed) {
            this._reset();
            this._seek(2);
            this._readExceededJpegImage();
        }
    };
    _JpegDecoder.prototype._getImageDictionary = function () {
        var data = []; // eslint-disable-line
        this._imageStream = new _PdfStream(data, new _PdfDictionary());
        this._imageStream.isImageStream = true;
        var tempString = '';
        var decodedString = '';
        for (var i = 0; i < this._imageDataAsNumberArray.byteLength; i++) {
            tempString += ' ' + String.fromCharCode(this._getBuffer(i));
        }
        for (var i = 0; i < tempString.length; i++) {
            if (i % 2 !== 0) {
                decodedString += tempString[Number.parseInt(i.toString(), 10)];
            }
        }
        this._imageStream.data = [decodedString];
        this._imageStream._isCompress = false;
        var dictionary = new _PdfDictionary();
        dictionary.set('Type', new _PdfName('XObject'));
        dictionary.set('Subtype', new _PdfName('Image'));
        dictionary.set('Width', this._width);
        dictionary.set('Height', this._height);
        dictionary.set('BitsPerComponent', this._bitsPerComponent);
        dictionary.set('Filter', new _PdfName('DCTDecode'));
        dictionary.set('ColorSpace', new _PdfName(this._getColorSpace()));
        dictionary.set('DecodeParms', this._getDecodeParams());
        this._imageStream.dictionary = dictionary;
        this._imageStream.bytes = new Uint8Array(this._imageStream.data[0].length);
        for (var i = 0; i < this._imageStream.data[0].length; i++) {
            this._imageStream.bytes[Number.parseInt(i.toString(), 10)] = this._imageStream.data[0].charCodeAt(i);
        }
        this._imageStream.end = this._imageStream.bytes.length;
        this._imageStream.dictionary._updated = true;
        return this._imageStream;
    };
    _JpegDecoder.prototype._getColorSpace = function () {
        if (this._noOfComponents === 1) {
            return 'DeviceGray';
        }
        else if (this._noOfComponents === 4) {
            return 'DeviceCMYK';
        }
        return 'DeviceRGB';
    };
    _JpegDecoder.prototype._getDecodeParams = function () {
        var decodeParams = new _PdfDictionary();
        decodeParams.set('Columns', this._width);
        decodeParams.set('BlackIs1', true);
        decodeParams.set('K', -1);
        decodeParams.set('Predictor', 15);
        decodeParams.set('BitsPerComponent', this._bitsPerComponent);
        return decodeParams;
    };
    _JpegDecoder.prototype._skipStream = function () {
        var length = this._getBuffer(this._position) << 8 | this._getBuffer(this._position + 1);
        this._seek(2);
        if (length < 2) {
            throw new Error('Error decoding JPEG image');
        }
        else if (length > 0) {
            this._seek(length - 2);
        }
    };
    _JpegDecoder.prototype._readExceededJpegImage = function () {
        var isContinueReading = true;
        while (isContinueReading) {
            var marker = this._getMarker();
            switch (marker) {
                case 0x00C0:
                case 0x00C1:
                case 0x00C2:
                case 0x00C3:
                case 0x00C5:
                case 0x00C6:
                case 0x00C7:
                case 0x00C9:
                case 0x00CA:
                case 0x00CB:
                case 0x00CD:
                case 0x00CE:
                case 0x00CF:
                    this._seek(3);
                    this._height = this._getBuffer(this._position) << 8 | this._getBuffer(this._position + 1);
                    this._seek(2);
                    this._width = this._getBuffer(this._position) << 8 | this._getBuffer(this._position + 1);
                    this._seek(2);
                    this._noOfComponents = this._getBuffer(this._position);
                    this._seek(1);
                    isContinueReading = false;
                    break;
                default:
                    this._skipStream();
                    break;
            }
        }
    };
    _JpegDecoder.prototype._getMarker = function () {
        var skippedByte = 0;
        var marker = this._readByte();
        while (marker !== 255) {
            skippedByte++;
            marker = this._readByte();
        }
        do {
            marker = this._readByte();
        } while (marker === 255);
        if (skippedByte !== 0) {
            throw new Error('Error decoding JPEG image');
        }
        return this._toUnsigned16(marker);
    };
    return _JpegDecoder;
}(_ImageDecoder));
export { _JpegDecoder };
