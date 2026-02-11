const XmlStream = require('../../../utils/xml-stream');
const BaseXform = require('../base-xform');

class RdRichValueTypesXform extends BaseXform {
  render(xmlStream) {
    xmlStream.openXml(XmlStream.StdDocAttributes);
    xmlStream.openNode('rvTypesInfo', {
      xmlns: 'http://schemas.microsoft.com/office/spreadsheetml/2017/richdata2',
      'xmlns:mc': 'http://schemas.openxmlformats.org/markup-compatibility/2006',
      'mc:Ignorable': 'x',
      'xmlns:x': 'http://schemas.openxmlformats.org/spreadsheetml/2006/main',
    });

    xmlStream.openNode('global');
    xmlStream.openNode('keyFlags');

    const keys = [
      '_Self',
      '_DisplayString',
      '_Flags',
      '_Format',
      '_SubLabel',
      '_Attribution',
      '_Icon',
      '_Display',
      '_CanonicalPropertyNames',
      '_ClassificationId',
    ];

    keys.forEach(name => {
      xmlStream.openNode('key', {name});
      if (name === '_Self') {
        xmlStream.leafNode('flag', {name: 'ExcludeFromFile', value: 1});
      }
      xmlStream.leafNode('flag', {name: 'ExcludeFromCalcComparison', value: 1});
      xmlStream.closeNode(); // key
    });

    xmlStream.closeNode(); // keyFlags
    xmlStream.closeNode(); // global
    xmlStream.closeNode(); // rvTypesInfo
  }
}

module.exports = RdRichValueTypesXform;
