describe('xml', () => {
  let xml;
  const tag_simple = "<xml><a><b>B DATA</b></a><c>C DATA</c></xml>";
  const tag_directory = "<directory><properties><name/><elements>3</elements><up_path/><up_dir/></properties><contents><element><name>backup</name><path>/YmFja3Vw</path><type>DIRECTORY</type><size>1</size><last_modified>18/09/06 13:02</last_modified><num>0</num></element><element><name>cache</name><path>/Y2FjaGU</path><type>DIRECTORY</type><size>21</size><last_modified>19/02/14 02:09</last_modified><num>1</num></element><element><name>environment</name><path>/ZW52aXJvbm1lbnQ</path><type>DIRECTORY</type><size>3</size><last_modified>18/06/24 15:16</last_modified><num>2</num></element></contents></directory>";

  beforeEach(() => {
    xml = require('../config').require.jsUtils.xml;
  });

  describe('getFirstFoundChildNode()', () => {
    test('getFirstFoundChildNode with simple', () => {
      var elem = xml.getDom(tag_simple);
      expect(xml.getFirstFoundTagData(xml.getFirstFoundChildNode(elem, "xml").childNodes, "c")).toBe("C DATA");
      expect(xml.getFirstFoundChildNode(xml.getFirstFoundChildNode(elem, "xml").childNodes, "xml")).toBe(null);
      expect(xml.getFirstFoundChildNode(elem, "a")).toBe(null);
      expect(xml.getFirstFoundChildNode(elem, "b")).toBe(null);
      expect(xml.getFirstFoundChildNode(elem, "c")).toBe(null);
    });
    test('getFirstFoundChildNode with directory', () => {
      var elem = xml.getDom(tag_directory);
      var directory = xml.getFirstFoundChildNode(elem, "directory");
      expect(directory).not.toBe(null);
    });
  });

  describe('getDataInElements()', () => {
    test('getDataInElements', () => {
      var elem = xml.getDom("<xml><a>A Data</a><b>B data</b></xml>");
      expect(xml.getDataInElements(elem, "xml", ["a", "b"])).toEqual({a: "A Data", b: "B data"});
    });
  });
});
