const XmlStream = require('../../../utils/xml-stream');
const BaseXform = require('../base-xform');

class RdRichValueStructureXform extends BaseXform {
  render(xmlStream) {
    xmlStream.openXml(XmlStream.StdDocAttributes);
    xmlStream.openNode('rvStructures', {
      xmlns: 'http://schemas.microsoft.com/office/spreadsheetml/2017/richdata',
      count: 1,
    });

    xmlStream.openNode('s', {t: '_localImage'});
    xmlStream.leafNode('k', {n: '_rvRel:LocalImageIdentifier', t: 'i'});
    xmlStream.leafNode('k', {n: 'CalcOrigin', t: 'i'});
    xmlStream.closeNode(); // s

    xmlStream.closeNode(); // rvStructures
  }
}

module.exports = RdRichValueStructureXform;
