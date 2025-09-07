export declare enum _InflaterState {
    readingHeader = 0,
    readingBFinal = 1,
    readingBType = 2,
    readingNlCodes = 3,
    readingNdCodes = 4,
    readingCodes = 5,
    readingClCodes = 6,
    readingTcBefore = 7,
    readingTcAfter = 8,
    decodeTop = 9,
    iLength = 10,
    fLength = 11,
    dCode = 12,
    unCompressedAligning = 13,
    unCompressedByte1 = 14,
    unCompressedByte2 = 15,
    unCompressedByte3 = 16,
    unCompressedByte4 = 17,
    decodeUnCompressedBytes = 18,
    srFooter = 19,
    rFooter = 20,
    vFooter = 21,
    done = 22
}
export declare enum _BlockType {
    unCompressedType = 0,
    staticType = 1,
    dynamicType = 2
}
