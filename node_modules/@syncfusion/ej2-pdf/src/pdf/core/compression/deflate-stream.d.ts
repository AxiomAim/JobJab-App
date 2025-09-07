import { _Inflater } from './inflater';
export declare class _DeflateStream {
    _data: number[];
    _leaveOpen: boolean;
    _offset: number;
    _buffer: number[];
    _inflater: _Inflater;
    constructor(data: number[], offset: number, leaveOpen: boolean);
    _read(array: number[], offset: number, count: number): {
        count: number;
        data: number[];
    };
    _readBytes(): {
        buffer: number[];
        count: number;
    };
}
