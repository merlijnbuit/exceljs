const XmlStream = require('../../../utils/xml-stream');
const BaseXform = require('../base-xform');

class MetadataXform extends BaseXform {
  render(xmlStream, model) {
    const valueMetadata = (model && model.valueMetadata) || [];
    const count = valueMetadata.length;

    xmlStream.openXml(XmlStream.StdDocAttributes);
    xmlStream.openNode('metadata', {
      xmlns: 'http://schemas.openxmlformats.org/spreadsheetml/2006/main',
      'xmlns:xlrd': 'http://schemas.microsoft.com/office/spreadsheetml/2017/richdata',
    });

    xmlStream.openNode('metadataTypes', {count: 1});
    xmlStream.leafNode('metadataType', {
      name: 'XLRICHVALUE',
      minSupportedVersion: '120000',
      copy: '1',
      pasteAll: '1',
      pasteValues: '1',
      merge: '1',
      splitFirst: '1',
      rowColShift: '1',
      clearFormats: '1',
      clearComments: '1',
      assign: '1',
      coerce: '1',
    });
    xmlStream.closeNode(); // metadataTypes

    const futureCount = count;
    xmlStream.openNode('futureMetadata', {name: 'XLRICHVALUE', count: futureCount});
    for (let i = 0; i < count; i++) {
      xmlStream.openNode('bk');
      xmlStream.openNode('extLst');
      xmlStream.openNode('ext', {uri: '{3e2802c4-a4d2-4d8b-9148-e3be6c30e623}'});
      xmlStream.leafNode('xlrd:rvb', {i});
      xmlStream.closeNode(); // ext
      xmlStream.closeNode(); // extLst
      xmlStream.closeNode(); // bk
    }
    xmlStream.closeNode(); // futureMetadata

    xmlStream.openNode('valueMetadata', {count});
    valueMetadata.forEach(entry => {
      xmlStream.openNode('bk');
      xmlStream.leafNode('rc', {t: 1, v: entry.rvIndex});
      xmlStream.closeNode(); // bk
    });
    xmlStream.closeNode(); // valueMetadata

    xmlStream.closeNode(); // metadata
  }
}

module.exports = MetadataXform;
