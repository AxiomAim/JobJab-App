import { _ImageFormat } from './../../enumerator';
var _ImageDecoder = /** @class */ (function () {
    function _ImageDecoder() {
        this._format = _ImageFormat.unknown;
        this._height = 0;
        this._width = 0;
        this._bitsPerComponent = 8;
        this._position = 0;
        this._noOfComponents = -1;
    }
    _ImageDecoder.prototype._reset = function () {
        this._position = 0;
    };
    _ImageDecoder.prototype._getBuffer = function (index) {
        return this._stream[Number.parseInt(index.toString(), 10)];
    };
    _ImageDecoder.prototype._read = function (buffer, offset, count, stream) {
        if (stream && Array.isArray(stream)) {
            var result = 0;
            if (count <= stream.length && stream.length - offset >= count) {
                for (var i = 0; i < count; i++) {
                    buffer[Number.parseInt(i.toString(), 10)] = stream[Number.parseInt(offset.toString(), 10)];
                    offset++;
                    result++;
                }
            }
            return { 'outputBuffer': buffer, 'offset': offset, 'length': result };
        }
        else {
            for (var index = offset; index < count; index++) {
                var position = this._position;
                buffer[Number.parseInt(index.toString(), 10)] = this._getBuffer(position);
                this._position++;
            }
        }
    };
    _ImageDecoder.prototype._readString = function (length) {
        var result = '';
        for (var i = 0; i < length; i++) {
            result += String.fromCharCode(this._readByte());
        }
        return result;
    };
    _ImageDecoder.prototype._seek = function (length) {
        this._position += length;
    };
    _ImageDecoder.prototype._readByte = function () {
        if (this._position < this._stream.byteLength) {
            var value = this._getBuffer(this._position);
            this._position += 1;
            return value;
        }
        else {
            throw new Error('Error decoding JPEG image. Invalid offset.');
        }
    };
    _ImageDecoder.prototype._toUnsigned16 = function (value) {
        value = value & 0xFFFF;
        return value < 0 ? (value + 0x10000) : value;
    };
    _ImageDecoder.prototype._readUnsigned32 = function (offset) {
        var i1 = this._getBuffer(offset + 3);
        var i2 = this._getBuffer(offset + 2);
        var i3 = this._getBuffer(offset + 1);
        var i4 = this._getBuffer(offset);
        return i1 | (i2 << 8) | (i3 << 16) | (i4 << 24);
    };
    return _ImageDecoder;
}());
export { _ImageDecoder };
