import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-button/paper-button.js';
import { AnywhereStyles } from './anywhere-styles.js';

class AnyDetailsView extends PolymerElement {
  static get properties () {
    return {
      route: {
        type: Object,
        value: null,
        observer: '_routeChanged'
      },
      itemId: {
        type: String,
        value: null
      },
      item: {
        type: Object,
        reflectToAttribute: true,
        notify: true,
        value: null
      }
    };
  }

  static get template() {
    return html`
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
    `;
  }

  ready() {
    super.ready();
    // load item (record) from database
    this._loadItem(this.itemId);
  }

  static get observers() {
    return [
      // captures any changes made to item properties
      '_itemPropertyChanged(item.*)'
    ]
  }

  _loadItem(itemId) {
    let that = this;
    AnyAppGlobals.anydb.get(itemId).then((doc) => {
      // change the doc (record)
      that.set('item', doc);
      AnyAppGlobals.dbBinder.bindDoc(doc, 'workorders', doc.resourceName, that);
    }).catch((err) => {
      console.error(err);
      throw err;
    });
  }

  _itemPropertyChanged(changeRecord) {
    // only goes in if its it not a full object change
    if (!this.item || !changeRecord || changeRecord.path === 'item') {
      return;
    };

    let that = this;
    let _id = this.item._id.toString();
    // removing the first item of the path i.e. 'item.desc' becomes 'desc'
    let path = changeRecord.path.match(/\w+\.(.*)/)[1];
    let value = changeRecord.value;

    // fetch item (record)
    AnyAppGlobals.anydb.get(_id).then((doc) => {
      // change the doc (record) on db side
      doc[path] = value;
      // update db
      AnyAppGlobals.anydb.put(doc).catch((err) => {
        console.error('Unable to save record: ' + doc);
        throw err;  
      });
    }).catch((err) => {
      console.error('Unable to retrieve record with _id: ' + _id);
      throw err;
    });
  }

  _deleteRecord() {
    let that = this;
    AnyAppGlobals.anydb.get(this.item._id).then((doc) => {
      AnyAppGlobals.anydb.remove(doc._id, doc._rev).then((result) => {
        // go back to list page
        that.set('route.path', '/list-view/');

        return result;
      }).catch((err) => {
        console.error('Unable to remove record: ' + doc._id);
        throw err;
      })
    });
  }

  _routeChanged(value) {
  	// if the route changes the content of the view should also be updated
  	this._loadItem(this.itemId);
  }
}

window.customElements.define('any-details-view', AnyDetailsView);
