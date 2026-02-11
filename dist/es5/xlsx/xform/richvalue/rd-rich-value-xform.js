"use strict";

const XmlStream = require('../../../utils/xml-stream');
const BaseXform = require('../base-xform');
class RdRichValueXform extends BaseXform {
  render(xmlStream, model) {
    const values = model && model.values || [];
    xmlStream.openXml(XmlStream.StdDocAttributes);
    xmlStream.openNode('rvData', {
      xmlns: 'http://schemas.microsoft.com/office/spreadsheetml/2017/richdata',
      count: values.length
    });
    values.forEach(value => {
      xmlStream.openNode('rv', {
        s: 0
      });
      xmlStream.leafNode('v', null, value.relIndex);
      xmlStream.leafNode('v', null, value.calcOrigin);
      xmlStream.closeNode(); // rv
    });
    xmlStream.closeNode(); // rvData
  }
}
module.exports = RdRichValueXform;
//# sourceMappingURL=rd-rich-value-xform.js.map
