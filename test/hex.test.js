describe('hex', ()=> {
    let hex;

    beforeEach(() => {
        hex = require('../src/hex.js');
    });

    describe('isHex()', () => {
        test('isHex', () => {
            expect(hex.isHex()).toBe(false);
            expect(hex.isHex(0)).toBe(false);
            expect(hex.isHex('g')).toBe(false);
            expect(hex.isHex('G')).toBe(false);
            expect(hex.isHex('GA')).toBe(false);
            expect(hex.isHex('0')).toBe(true);
            expect(hex.isHex('F')).toBe(true);
            expect(hex.isHex('00')).toBe(true);
            expect(hex.isHex('0a')).toBe(true);
            expect(hex.isHex('0A')).toBe(true);
            expect(hex.isHex('a0')).toBe(true);
            expect(hex.isHex('A0')).toBe(true);
            expect(hex.isHex('A00000000')).toBe(true);
            expect(hex.isHex('FA')).toBe(true);
        });
    });
    describe('toHex()', () => {
        test('toHex', () => {
            expect(hex.toHex()).toBe(null);
            expect(hex.toHex(NaN)).toBe(null);
            expect(hex.toHex(0)).toBe('00');
            expect(hex.toHex(1)).toBe('01');
            expect(hex.toHex(10)).toBe('0a');
            expect(hex.toHex(15)).toBe('0f');
            expect(hex.toHex(16)).toBe('10');
            expect(hex.toHex(256)).toBe('100');
            expect(hex.toHex(1, 3)).toBe('001');
        });
    });
    describe('toDecimal()', () => {
        test('toDecimal', () => {
            expect(hex.toDecimal()).toBe(NaN);
            expect(hex.toDecimal('g')).toBe(NaN);
            expect(hex.toDecimal('0')).toBe(0);
            expect(hex.toDecimal('1')).toBe(1);
            expect(hex.toDecimal('a')).toBe(10);
            expect(hex.toDecimal('A')).toBe(10);
            expect(hex.toDecimal('f')).toBe(15);
            expect(hex.toDecimal('F')).toBe(15);
            expect(hex.toDecimal('10')).toBe(16);
        });
    });
});
