describe('xml', () => {
  let xml;

  beforeEach(() => {
    xml = require('../config').require.jsUtils.xml;
  });

  describe('getFirstFoundChildNode()', () => {
    test('getFirstFoundChildNode', () => {
      var elem = xml.getDom("<xml><a><b></b></a></xml>");
      expect(xml.getFirstFoundChildNode(elem, "c")).toBe(null);
console.log(elem);
      expect(xml.getFirstFoundChildNode(elem, "a")).toBe(null);
    });
  });
});
