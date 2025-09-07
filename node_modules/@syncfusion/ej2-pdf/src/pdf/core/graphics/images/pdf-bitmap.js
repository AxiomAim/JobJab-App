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
import { PdfImage } from './pdf-image';
import { _PdfName } from './../../pdf-primitives';
import { _decode, _getDecoder } from './../../utils';
import { _PdfColorSpace } from './../../enumerator';
import { _PngDecoder } from './png-decoder';
/**
 * The 'PdfBitmap' contains methods and properties to handle the Bitmap images.
 * ```typescript
 * // Load an existing PDF document
 * let document: PdfDocument = new PdfDocument(data, password);
 * // Access first page
 * let page: PdfPage = document.getPage(0);
 * // Gets the graphics of the PDF page
 * let graphics: PdfGraphics = page.graphics;
 * // Create new image object by using JPEG image data as Base64 string format
 * let image: PdfImage = new PdfBitmap('/9j/4AAQSkZJRgABAQEAkACQAAD/4....QB//Z');
 * //Draw the image.
 * graphics.drawImage(image, 10, 20, 400, 400);
 * // Save the document
 * document.save('output.pdf');
 * // Destroy the document
 * document.destroy();
 * ```
 */
var PdfBitmap = /** @class */ (function (_super) {
    __extends(PdfBitmap, _super);
    function PdfBitmap(encodedString) {
        var _this = _super.call(this) || this;
        _this._imageStatus = true;
        if (encodedString !== null && typeof encodedString !== 'undefined' && typeof encodedString === 'string') {
            _this._initializeAsync(encodedString);
        }
        else {
            _this._initializeAsync(encodedString);
        }
        return _this;
    }
    PdfBitmap.prototype._initializeAsync = function (encodedString) {
        var byteArray = new Uint8Array(encodedString.length);
        if (encodedString !== null && typeof encodedString !== 'undefined' && typeof encodedString === 'string') {
            byteArray = _decode(encodedString, false);
        }
        else if (encodedString instanceof Uint8Array) {
            byteArray = encodedString;
        }
        this._decoder = _getDecoder(byteArray);
        this.height = this._decoder._height;
        this.width = this._decoder._width;
        this._bitsPerComponent = this._decoder._bitsPerComponent;
    };
    PdfBitmap.prototype._save = function () {
        this._imageStatus = true;
        this._imageStream = this._decoder._getImageDictionary();
        if (this._decoder && this._decoder instanceof _PngDecoder) {
            var decoder = this._decoder;
            this._maskStream = decoder._maskStream;
            if (decoder._isDecode) {
                if (decoder._colorSpace) {
                    this._setColorSpace();
                }
            }
            else {
                this._setColorSpace();
            }
        }
        else {
            this._setColorSpace();
        }
    };
    PdfBitmap.prototype._setColorSpace = function () {
        var stream = this._imageStream;
        var dictionary = stream.dictionary;
        var color = dictionary.get('ColorSpace');
        var colorSpace;
        if (color.name === 'DeviceCMYK') {
            colorSpace = _PdfColorSpace.cmyk;
        }
        else if (color.name === 'DeviceGray') {
            colorSpace = _PdfColorSpace.grayScale;
        }
        if (this._decoder instanceof _PngDecoder) {
            var cs = this._decoder._colorSpace; // eslint-disable-line
            if (typeof cs !== 'undefined' && cs !== null) {
                colorSpace = _PdfColorSpace.indexed;
            }
        }
        switch (colorSpace) {
            case _PdfColorSpace.cmyk:
                dictionary.update('Decode', [1.0, 0.0, 1.0, 0.0, 1.0, 0.0, 1.0, 0.0]);
                dictionary.update('ColorSpace', _PdfName.get('DeviceCMYK'));
                break;
            case _PdfColorSpace.grayScale:
                dictionary.update('Decode', [0.0, 1.0]);
                dictionary.update('ColorSpace', _PdfName.get('DeviceGray'));
                break;
            case _PdfColorSpace.rgb:
                dictionary.update('Decode', [0.0, 1.0, 0.0, 1.0, 0.0, 1.0]);
                dictionary.update('ColorSpace', _PdfName.get('DeviceRGB'));
                break;
            case _PdfColorSpace.indexed:
                dictionary.update('ColorSpace', this._decoder._colorSpace);
                break;
            default:
                break;
        }
    };
    return PdfBitmap;
}(PdfImage));
export { PdfBitmap };
