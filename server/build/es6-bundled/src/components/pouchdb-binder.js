define(["exports"],function(_exports){"use strict";Object.defineProperty(_exports,"__esModule",{value:!0});_exports.PouchdbBinder=_exports.$pouchdbBinder=void 0;class PouchdbBinder{static get properties(){return{docRegistry:{type:Object,value:null,reflectToAttribute:!0,notify:!0,readonly:!1},db:{type:Object,value:null}}}constructor(){this.docRegistry={}}_getIndex(context,collectionAlias,itemId){return context.get(collectionAlias).map(item=>item._id).indexOf(itemId)}_findRegistries(registryId){let response=[];for(let key in this.docRegistry){if(this.docRegistry[key][registryId]){response.push(key)}}return response}_registerDbListener(db){this.db=db;let that=this;this.db.changes({since:"now",live:!0,include_docs:!0}).on("change",change=>{if(!change.doc.resourceName){return}let registries=that._findRegistries(change.id);if(0<registries.length){for(let i=registries.length-1,registry;0<=i;i--){registry=that.docRegistry[registries[i]][change.id];for(var j=registry.contexts.length-1;0<=j;j--){let currContext=registry.contexts[j],collection=currContext.get(registry.collectionAlias);if(Array.isArray(collection)){let index=that._getIndex(currContext,registry.collectionAlias,change.id);if(change.deleted){currContext.splice(registry.collectionAlias,index,1)}else{currContext.set([registry.collectionAlias,index],change.doc)}}else{currContext.set(registry.collectionAlias,change.doc)}}}}else{if(change.deleted){return}let resourceName=change.doc.resourceName;if(resourceName&&that.docRegistry[resourceName]&&0<Object.keys(that.docRegistry[resourceName]).length){let aKey=Object.keys(that.docRegistry[resourceName])[0],aRecord=that.docRegistry[resourceName][aKey];if(!aRecord.contexts[0].inputOn){}that.bindDoc(change.doc,aRecord.collectionAlias,resourceName,aRecord.contexts[0])}else{console.log(`Collection ${resourceName} exists but with no records to it`)}}}).on("error",err=>{console.error(err);throw err})}bindDocs(collectionAlias,collectionName,context){let that=this;if(!that.docRegistry[collectionName]){that.docRegistry[collectionName]=[];context._observeCollection=result=>{if(!result||0==result.length){return}let docsToBind=null;if(result.indexSplices){let splices=result.indexSplices;docsToBind=splices[0].object.slice(splices.index,splices.index+splices.addedCount)}if(0<result.length){docsToBind=result}docsToBind.map(entry=>{that.bindDoc(entry,collectionAlias,collectionName,context)},that)};context._createMethodObserver(`_observeCollection(${collectionAlias}.splices)`,!0);context._createMethodObserver(`_observeCollection(${collectionAlias})`,!0)}}bindDoc(docToBind,collectionAlias,collectionName,context){if(!this.docRegistry[collectionName]){this.docRegistry[collectionName]=[]}this._registerDoc(docToBind._id,collectionAlias,collectionName,context)}_registerDoc(id,collectionAlias,collectionName,registryContext){let currRegistry;if(currRegistry=this.docRegistry[collectionName][id]){if(!currRegistry.contexts.includes(registryContext)){currRegistry.contexts.push(registryContext)}}else{this.docRegistry[collectionName][id]={collectionAlias:collectionAlias,collectionName:collectionName,contexts:[registryContext]}}}}_exports.PouchdbBinder=PouchdbBinder;_exports.$pouchdbBinder={PouchdbBinder:PouchdbBinder}});