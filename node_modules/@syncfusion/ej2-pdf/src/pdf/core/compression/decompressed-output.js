import { _copyRange } from './../utils';
var _DecompressedOutput = /** @class */ (function () {
    function _DecompressedOutput() {
        this._end = 0;
        this._usedBytes = 0;
        this._dOutput = Array(_DecompressedOutput._dOutSize).fill(0);
        this._end = 0;
        this._usedBytes = 0;
    }
    Object.defineProperty(_DecompressedOutput.prototype, "_unusedBytes", {
        get: function () {
            return _DecompressedOutput._dOutSize - this._usedBytes;
        },
        enumerable: true,
        configurable: true
    });
    _DecompressedOutput.prototype._write = function (b) {
        this._dOutput[this._end++] = b;
        this._end &= _DecompressedOutput._dOutMask;
        ++this._usedBytes;
    };
    _DecompressedOutput.prototype._writeLD = function (length, distance) {
        this._usedBytes += length;
        var copyStart = (this._end - distance) & _DecompressedOutput._dOutMask;
        var border = _DecompressedOutput._dOutSize - length;
        if (copyStart <= border && this._end < border) {
            if (length <= distance) {
                _copyRange(this._dOutput, this._end, this._dOutput, copyStart, copyStart + length);
                this._end += length;
            }
            else {
                while (length-- > 0) {
                    this._dOutput[this._end++] = this._dOutput[copyStart++];
                }
            }
        }
        else {
            while (length-- > 0) {
                this._dOutput[this._end++] = this._dOutput[copyStart++];
                this._end &= _DecompressedOutput._dOutMask;
                copyStart &= _DecompressedOutput._dOutMask;
            }
        }
    };
    _DecompressedOutput.prototype._copyFrom = function (input, length) {
        length = Math.min(Math.min(length, _DecompressedOutput._dOutSize - this._usedBytes), input._bytes);
        var copied;
        var tailLen = _DecompressedOutput._dOutSize - this._end;
        if (length > tailLen) {
            copied = input._copyTo(this._dOutput, this._end, tailLen);
            if (copied === tailLen) {
                copied += input._copyTo(this._dOutput, 0, length - tailLen);
            }
        }
        else {
            copied = input._copyTo(this._dOutput, this._end, length);
        }
        this._end = (this._end + copied) & _DecompressedOutput._dOutMask;
        this._usedBytes += copied;
        return copied;
    };
    _DecompressedOutput.prototype._copyTo = function (output, offset, length) {
        var end;
        if (length > this._usedBytes) {
            end = this._end;
            length = this._usedBytes;
        }
        else {
            end = (this._end - this._usedBytes + length) & _DecompressedOutput._dOutMask;
        }
        var copied = length;
        var tailLen = length - end;
        var sourceStart = _DecompressedOutput._dOutSize - tailLen;
        if (tailLen > 0) {
            for (var i = 0; i < tailLen && i + sourceStart < this._dOutput.length && i + offset < output.length; i++) {
                output[offset + i] = this._dOutput[sourceStart + i];
            }
            var sourceStartIndex_1 = _DecompressedOutput._dOutSize - tailLen;
            _copyRange(output, offset, this._dOutput, sourceStartIndex_1, sourceStartIndex_1 + tailLen);
            offset += tailLen;
            length = end;
        }
        sourceStart = end - length;
        var sourceStartIndex = end - length;
        _copyRange(output, offset, this._dOutput, sourceStartIndex, end);
        this._usedBytes -= copied;
        return { 'count': copied, 'data': output };
    };
    _DecompressedOutput._dOutSize = 32768;
    _DecompressedOutput._dOutMask = 32767;
    return _DecompressedOutput;
}());
export { _DecompressedOutput };
