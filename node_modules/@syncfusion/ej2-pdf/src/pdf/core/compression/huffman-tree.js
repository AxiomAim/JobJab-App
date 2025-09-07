import { _toUnsigned, _toSigned16 } from './../utils';
var _HuffmanTree = /** @class */ (function () {
    function _HuffmanTree() {
    }
    _HuffmanTree.prototype._load = function (code) {
        this._clArray = code;
        this._initialize();
    };
    _HuffmanTree.prototype._loadTree = function (isLengthTree) {
        this._clArray = isLengthTree ? this._getLengthTree() : this._getDepthTree();
        this._initialize();
    };
    _HuffmanTree.prototype._initialize = function () {
        if (this._clArray.length === _HuffmanTree._maxLengthTree) {
            this._tBits = 9;
        }
        else {
            this._tBits = 7;
        }
        this._tMask = (1 << this._tBits) - 1;
        this._createTable();
    };
    _HuffmanTree.prototype._getLengthTree = function () {
        var lTree = Array(_HuffmanTree._maxLengthTree).fill(0);
        for (var i = 0; i <= 143; i++) {
            lTree[Number.parseInt(i.toString(), 10)] = _toUnsigned(8, 8);
        }
        for (var i = 144; i <= 255; i++) {
            lTree[Number.parseInt(i.toString(), 10)] = _toUnsigned(9, 8);
        }
        for (var i = 256; i <= 279; i++) {
            lTree[Number.parseInt(i.toString(), 10)] = _toUnsigned(7, 8);
        }
        for (var i = 280; i <= 287; i++) {
            lTree[Number.parseInt(i.toString(), 10)] = _toUnsigned(8, 8);
        }
        return lTree;
    };
    _HuffmanTree.prototype._getDepthTree = function () {
        return Array(_HuffmanTree._maxDepthTree).fill(5);
    };
    _HuffmanTree.prototype._calculateHashCode = function () {
        var bit = Array(17).fill(0);
        for (var i = 0; i < this._clArray.length; i++) {
            bit[this._clArray[Number.parseInt(i.toString(), 10)]]++;
        }
        bit[0] = 0;
        var next = Array(17).fill(0);
        var temp = 0;
        for (var bits = 1; bits <= 16; bits++) {
            temp = (temp + bit[bits - 1]) << 1;
            next[Number.parseInt(bits.toString(), 10)] = temp;
        }
        var code = Array(_HuffmanTree._maxLengthTree).fill(0);
        for (var i = 0; i < this._clArray.length; i++) {
            var len = this._clArray[Number.parseInt(i.toString(), 10)];
            if (len > 0) {
                code[Number.parseInt(i.toString(), 10)] = this._bitReverse(next[Number.parseInt(len.toString(), 10)], len);
                next[Number.parseInt(len.toString(), 10)]++;
            }
        }
        return code;
    };
    _HuffmanTree.prototype._bitReverse = function (code, length) {
        var newcode = 0;
        do {
            newcode |= code & 1;
            newcode <<= 1;
            code >>= 1;
        } while (--length > 0);
        return newcode >> 1;
    };
    _HuffmanTree.prototype._createTable = function () {
        var codeArray = this._calculateHashCode();
        this._table = Array(1 << this._tBits).fill(0);
        this._left = Array(2 * this._clArray.length).fill(0);
        this._right = Array(2 * this._clArray.length).fill(0);
        var avail = _toSigned16(this._clArray.length);
        for (var ch = 0; ch < this._clArray.length; ch++) {
            var len = this._clArray[Number.parseInt(ch.toString(), 10)];
            if (len > 0) {
                var start = codeArray[Number.parseInt(ch.toString(), 10)];
                if (len <= this._tBits) {
                    var i = 1 << len;
                    if (start >= i) {
                        throw new Error('Invalid Data.');
                    }
                    var l = 1 << (this._tBits - len);
                    for (var j = 0; j < l; j++) {
                        this._table[Number.parseInt(start.toString(), 10)] = _toSigned16(ch);
                        start += i;
                    }
                }
                else {
                    var ofBits = len - this._tBits;
                    var bitMask = 1 << this._tBits;
                    var index = start & ((1 << this._tBits) - 1);
                    var array = this._table;
                    do {
                        var value = _toSigned16(array[Number.parseInt(index.toString(), 10)]);
                        if (value === 0) {
                            array[Number.parseInt(index.toString(), 10)] = _toSigned16(-avail);
                            value = _toSigned16(-avail);
                            avail++;
                        }
                        if (value > 0) {
                            throw new Error('Invalid Data.');
                        }
                        if ((start & bitMask) === 0) {
                            array = this._left;
                        }
                        else {
                            array = this._right;
                        }
                        index = -value;
                        bitMask <<= 1;
                        ofBits--;
                    } while (ofBits !== 0);
                    array[Number.parseInt(index.toString(), 10)] = _toSigned16(ch);
                }
            }
        }
    };
    _HuffmanTree.prototype._getNextSymbol = function (input) {
        var bitBuffer = input._load16Bits();
        if (input._bInBuffer === 0) {
            return -1;
        }
        var symbol = this._table[bitBuffer & this._tMask];
        if (symbol < 0) {
            var mask = _toUnsigned((1 << this._tBits), 32);
            do {
                symbol = -symbol;
                if ((bitBuffer & mask) === 0) {
                    symbol = this._left[Number.parseInt(symbol.toString(), 10)];
                }
                else {
                    symbol = this._right[Number.parseInt(symbol.toString(), 10)];
                }
                mask <<= 1;
            } while (symbol < 0);
        }
        var codeLength = this._clArray[Number.parseInt(symbol.toString(), 10)];
        if (codeLength <= 0) {
            throw new Error('Invalid Data.');
        }
        if (codeLength > input._bInBuffer) {
            return -1;
        }
        input._skipBits(codeLength);
        return symbol;
    };
    _HuffmanTree._maxLengthTree = 288;
    _HuffmanTree._maxDepthTree = 32;
    _HuffmanTree._nCLength = 19;
    return _HuffmanTree;
}());
export { _HuffmanTree };
