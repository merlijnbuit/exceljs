'use strict';

class RichValueStore {
  constructor() {
    this.relIndexByImageId = new Map();
    this.rels = [];
    this.values = [];
    this.valueMetadata = [];
  }

  addLocalImage(imageId) {
    let relIndex = this.relIndexByImageId.get(imageId);
    if (relIndex === undefined) {
      relIndex = this.rels.length;
      this.rels.push({imageId});
      this.relIndexByImageId.set(imageId, relIndex);
    }

    const rvIndex = this.values.length;
    this.values.push({relIndex, calcOrigin: 5});

    const vmIndex = this.valueMetadata.length;
    this.valueMetadata.push({rvIndex});

    return {vm: vmIndex + 1};
  }

  get model() {
    return {
      rels: this.rels,
      values: this.values,
      valueMetadata: this.valueMetadata,
    };
  }
}

module.exports = RichValueStore;
