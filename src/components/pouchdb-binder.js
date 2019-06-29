export class PouchdbBinder {
  static get properties () {
    return {
      docRegistry: {
        type: Object,
        value: null,
        reflectToAttribute: true,
        notify: true,
        readonly: false
      },
      db: {
        type: Object,
        value: null
      }
    };
  }

  constructor() {
    this.docRegistry = new Object();
  }

  // returns an array of indexes tuples having both the 
  _getIndex(context, collectionAlias, itemId) {
    // find the polymer side index
    return context.get(collectionAlias).map((item) => item._id).indexOf(itemId);
  }

  _findRegistries(registryId) {
    let response = [];
    for (let key in this.docRegistry) {
      if(this.docRegistry[key][registryId]) {
        response.push(key);
      } 
    }
    return response;
  }

  // listen to all database changes
  _registerDbListener(db) {
    this.db = db;
    let that = this;
    this.db.changes({
      since: 'now',
      live: true,
      include_docs: true
    }).on('change', (change) => {
      // must have a resourceName to be considered on binding
      if (!change.doc.resourceName) {
        return;
      }
      // find registries matching id
      let registries = that._findRegistries(change.id);
      if(registries.length > 0) {
        for (let i = registries.length - 1; i >= 0; i--) {
          let registry = that.docRegistry[registries[i]][change.id];
          // each registry can have multiple contexts, multiple screens holding the same data
          for (var j = registry.contexts.length - 1; j >= 0; j--) {
            let currContext = registry.contexts[j];
            let collection = currContext.get(registry.collectionAlias);
            // update data on a collection (array or list)
            if(Array.isArray(collection)) {
              let index = that._getIndex(currContext, registry.collectionAlias, change.id);
              if (change.deleted) {
                // remove from registry
                // mimics polymer this.splice('items', index, 1)
                currContext.splice(registry.collectionAlias, index, 1);
              } else {
                // update registry
                // mimics polymer this.set(['items', index], doc);
                currContext.set([registry.collectionAlias, index], change.doc);
              }
            }
            else {
              // update data of a single record (detail view)
              currContext.set(registry.collectionAlias, change.doc);
            }
          }
        }
      }
      // record was not found on registries
      else {
        // and its not a new record
        if (change.deleted) {
          return;
        }
        let resourceName = change.doc.resourceName;
        // find a registry for such collection
        if (resourceName && that.docRegistry[resourceName] && Object.keys(that.docRegistry[resourceName]).length > 0) {
          // get the first record on the collection to use its context and alias
          let aKey = Object.keys(that.docRegistry[resourceName])[0];
          let aRecord = that.docRegistry[resourceName][aKey];
          // only push new records if not doing a search
          if (!aRecord.contexts[0].inputOn) {
            // LK0 not pretty just yet, gets the first context found and push record in
            // aRecord.contexts[0].push(aRecord.collectionAlias, change.doc);
          }
          // LK0 aRecord.contexts[0] is no good, but should do for now
          that.bindDoc(change.doc, aRecord.collectionAlias, resourceName, aRecord.contexts[0])
        }
        else {
          console.log(`Collection ${resourceName} exists but with no records to it`);
          // LK0 need to figure out how to handle this case
        }
      }
    }).on('error', (err) => {
      // handle errors
      console.error(err);
      throw err;
    });
  }

  bindDocs(collectionAlias, collectionName, context) {
    let that = this;
    // let docsToBind = context.get(collectionAlias);
    // in case the collection is not on the registry just yet
    if (!that.docRegistry[collectionName]) {
      that.docRegistry[collectionName] = [];

      // dynamically add a complex observer to the collection
      context._observeCollection = (result) => { 
        if (!result || result.length == 0) {
          return;
        }
        let docsToBind = null;
        // new records to existing collection
        if(result.indexSplices) {
          let splices = result.indexSplices;
          docsToBind = splices[0].object.slice(splices.index, splices.index + splices.addedCount);
        }
        // brand new collection set
        if (result.length > 0) {
          docsToBind = result;
        }
        
        docsToBind.map((entry, index) => {
          // register the doc id hash to the doc reference
          that.bindDoc(entry, collectionAlias, collectionName, context);
        }, that);
        
      };
      context._createMethodObserver(`_observeCollection(${collectionAlias}.splices)`, true);
      context._createMethodObserver(`_observeCollection(${collectionAlias})`, true);
    }
  }

  bindDoc(docToBind, collectionAlias, collectionName, context) {
    if (!this.docRegistry[collectionName]) {
      this.docRegistry[collectionName] = [];
    }
    this._registerDoc(docToBind._id, collectionAlias, collectionName, context);
  }

  // safely register a doc
  _registerDoc(id, collectionAlias, collectionName, registryContext) {
    let currRegistry;
    // registry already exists
    if (currRegistry = this.docRegistry[collectionName][id]) {
      // check if context is already present
      if(!currRegistry.contexts.includes(registryContext)) {
        // set yet another context to keep up to date
        currRegistry.contexts.push(registryContext)
      }
    }
    else {
      this.docRegistry[collectionName][id] = {collectionAlias: collectionAlias, collectionName: collectionName, contexts: [registryContext]};
    }
  }
}


