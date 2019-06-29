import{PolymerElement,html,AnywhereStyles}from"./any-app.js";class AnyDetailsView extends PolymerElement{static get properties(){return{route:{type:Object,value:null,observer:"_routeChanged"},itemId:{type:String,value:null},item:{type:Object,reflectToAttribute:!0,notify:!0,value:null}}}static get template(){return html`
      ${AnywhereStyles}
      <style>
      	paper-input {
      		--paper-input-container-focus-color: #325C80;
      		--paper-input-container-input-color: #000000;
      		--paper-input-container-color: #325C80;
      	}

        paper-button {
          background-color: #5AAAFA;
          color: white;
          margin-top: 30px;
        }

        section {
          margin: 10px;
        }

      </style>
      <section class="flex--full-width">
        <paper-input readonly="true" label="WONUM" value="{{item.id}}"></paper-input>
        <paper-input readonly="true" label="Status" value="{{item.status}}"></paper-input>
        <paper-input readonly="true" label="Date" value="{{item.dueDate}}"></paper-input>
        <paper-input label="Description" value="{{item.desc}}"></paper-input>
        <paper-button raised on-tap="_deleteRecord">Delete this record</paper-button>
      </section>
    `}ready(){super.ready();this._loadItem(this.itemId)}static get observers(){return["_itemPropertyChanged(item.*)"]}_loadItem(itemId){let that=this;AnyAppGlobals.anydb.get(itemId).then(doc=>{that.set("item",doc);AnyAppGlobals.dbBinder.bindDoc(doc,"workorders",doc.resourceName,that)}).catch(err=>{console.error(err);throw err})}_itemPropertyChanged(changeRecord){if(!this.item||!changeRecord||"item"===changeRecord.path){return}let that=this,_id=this.item._id.toString(),path=changeRecord.path.match(/\w+\.(.*)/)[1],value=changeRecord.value;AnyAppGlobals.anydb.get(_id).then(doc=>{doc[path]=value;AnyAppGlobals.anydb.put(doc).catch(err=>{console.error("Unable to save record: "+doc);throw err})}).catch(err=>{console.error("Unable to retrieve record with _id: "+_id);throw err})}_deleteRecord(){let that=this;AnyAppGlobals.anydb.get(this.item._id).then(doc=>{AnyAppGlobals.anydb.remove(doc._id,doc._rev).then(result=>{that.set("route.path","/list-view/");return result}).catch(err=>{console.error("Unable to remove record: "+doc._id);throw err})})}_routeChanged(){this._loadItem(this.itemId)}}window.customElements.define("any-details-view",AnyDetailsView);