const XmlStream = require('../../../utils/xml-stream');
const BaseXform = require('../base-xform');

class RichValueRelXform extends BaseXform {
  render(xmlStream, model) {
    const rels = (model && model.rels) || [];

    xmlStream.openXml(XmlStream.StdDocAttributes);
    xmlStream.openNode('richValueRels', {
      xmlns: 'http://schemas.microsoft.com/office/spreadsheetml/2022/richvaluerel',
      'xmlns:r': 'http://schemas.openxmlformats.org/officeDocument/2006/relationships',
    });

    rels.forEach((rel, index) => {
      xmlStream.leafNode('rel', {'r:id': `rId${index + 1}`});
    });

    xmlStream.closeNode(); // richValueRels
  }
}

module.exports = RichValueRelXform;
