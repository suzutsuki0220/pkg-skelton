describe('buffer', () => {
    let buffer;

    const utf8 = Buffer.from([0xe3,0x81,0x82,0xe3,0x81,0x84,0xe3,0x81,0x86,0xe3,0x81,0x88,0xe3,0x81,0x8a]);
    const utf8String = "\xe3\x81\x82\xe3\x81\x84\xe3\x81\x86\xe3\x81\x88\xe3\x81\x8a";

    beforeEach(() => {
        buffer = require('../src/buffer.js');
    });

    describe('buffer', () => {
        test('utf8 buffer toBinaryString', () => {
            expect(buffer.toBinaryString('あいうえお')).toBe(utf8String);
            expect(buffer.toBinaryString(Buffer.from('あいうえお'))).toBe(utf8String);
            expect(buffer.toBinaryString(buffer.toArrayBuffer(utf8))).toBe(utf8String);
            expect(buffer.toBinaryString(utf8)).toBe(utf8String);
        });
        test('utf8 arrayBufferToArray', () => {
            expect(buffer.arrayBufferToArray(buffer.toArrayBuffer(utf8))).toEqual(
                Uint8Array.from([0xe3,0x81,0x82,0xe3,0x81,0x84,0xe3,0x81,0x86,0xe3,0x81,0x88,0xe3,0x81,0x8a])
            );
        });
        test('utf8 stringToArray', () => {
            expect(buffer.stringToArray('abcdef')).toEqual(
                Uint8Array.from([0x61,0x62,0x63,0x64,0x65,0x66])
            );
            expect(buffer.stringToArray('あいうえお')).toEqual(
                Uint8Array.from([0xe3,0x81,0x82,0xe3,0x81,0x84,0xe3,0x81,0x86,0xe3,0x81,0x88,0xe3,0x81,0x8a])
            );
        });
    });
    describe('type check', () => {
        test('isArrayBuffer', () => {
            expect(buffer.isArrayBuffer(new ArrayBuffer(1))).toBe(true);
            expect(buffer.isArrayBuffer(new Array(1))).toBe(false);
            expect(buffer.isArrayBuffer(new Buffer(1))).toBe(false);
            expect(buffer.isArrayBuffer('string')).toBe(false);
        });
    });
});
