import { _toUnsigned } from './../utils';
var _InBuffer = /** @class */ (function () {
    function _InBuffer() {
        this._bBuffer = 0;
        this._bInBuffer = 0;
        this._begin = 0;
        this._end = 0;
    }
    Object.defineProperty(_InBuffer.prototype, "_bytes", {
        get: function () {
            return (this._end - this._begin) + Math.floor(this._bInBuffer / 8);
        },
        enumerable: true,
        configurable: true
    });
    _InBuffer.prototype._needsInput = function () {
        return this._begin === this._end;
    };
    _InBuffer.prototype._availableBits = function (count) {
        if (this._bInBuffer < count) {
            if (this._needsInput()) {
                return false;
            }
            this._bBuffer |= _toUnsigned(this._buffer[this._begin++], 32) << this._bInBuffer;
            this._bInBuffer += 8;
            if (this._bInBuffer < count) {
                if (this._needsInput()) {
                    return false;
                }
                this._bBuffer |= _toUnsigned(this._buffer[this._begin++], 32) << this._bInBuffer;
                this._bInBuffer += 8;
            }
        }
        return true;
    };
    _InBuffer.prototype._load16Bits = function () {
        if (this._bInBuffer < 8) {
            if (this._begin < this._end) {
                this._bBuffer |= _toUnsigned(this._buffer[this._begin++], 32) << this._bInBuffer;
                this._bInBuffer += 8;
            }
            if (this._begin < this._end) {
                this._bBuffer |= _toUnsigned(this._buffer[this._begin++], 32) << this._bInBuffer;
                this._bInBuffer += 8;
            }
        }
        else if (this._bInBuffer < 16) {
            if (this._begin < this._end) {
                this._bBuffer |= _toUnsigned(this._buffer[this._begin++], 32) << this._bInBuffer;
                this._bInBuffer += 8;
            }
        }
        return this._bBuffer;
    };
    _InBuffer.prototype._getBitMask = function (count) {
        return (_toUnsigned(1, 32) << count) - 1;
    };
    _InBuffer.prototype._getBits = function (count) {
        if (!this._availableBits(count)) {
            return -1;
        }
        var result = this._bBuffer & this._getBitMask(count);
        this._bBuffer >>= count;
        this._bInBuffer -= count;
        return result;
    };
    _InBuffer.prototype._copyTo = function (output, offset, length) {
        var bitBuffer = 0;
        while (this._bInBuffer > 0 && length > 0) {
            output[offset++] = _toUnsigned(this._bBuffer, 8);
            this._bBuffer >>= 8;
            this._bInBuffer -= 8;
            length--;
            bitBuffer++;
        }
        if (length === 0) {
            return bitBuffer;
        }
        var avail = this._end - this._begin;
        if (length > avail) {
            length = avail;
        }
        for (var i = 0; i < length && i + this._begin < this._buffer.length && i + offset < output.length; i++) {
            output[offset + i] = this._buffer[this._begin + i];
        }
        this._begin += length;
        return bitBuffer + length;
    };
    _InBuffer.prototype._setInput = function (buffer, offset, length) {
        this._buffer = buffer;
        this._begin = offset;
        this._end = offset + length;
    };
    _InBuffer.prototype._skipBits = function (n) {
        this._bBuffer >>= n;
        this._bInBuffer -= n;
    };
    _InBuffer.prototype._skipByteBoundary = function () {
        this._bBuffer >>= this._bInBuffer % 8;
        this._bInBuffer = this._bInBuffer - (this._bInBuffer % 8);
    };
    return _InBuffer;
}());
export { _InBuffer };
