import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-list/iron-list.js';
import '@polymer/iron-scroll-threshold/iron-scroll-threshold.js';
import '@polymer/paper-spinner/paper-spinner.js';
import '@polymer/paper-fab/paper-fab.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-dialog/paper-dialog.js';
import '@polymer/paper-toggle-button/paper-toggle-button.js';
import '@polymer/paper-checkbox/paper-checkbox.js';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-dialog-scrollable/paper-dialog-scrollable.js';
import { settingsIcon } from './any-icons.js';
import { AnywhereStyles } from './anywhere-styles.js';
import './any-list-item.js';

const resourceName = 'workorder';

class AnyListView extends PolymerElement {

  constructor() {
    super();
  }

  static get properties () {
    return {
      workorders: {
        type: Array,
        reflectToAttribute: true,
        notify: true,
        value: []
      },
      workordersLoaded: {
        type: Boolean,
        value: false
      },
      workordersLoading: {
        type: Boolean,
        value: false
      },
      isLoading: {
        type: Boolean,
        computed: '_isLoadingWorkorders(workordersLoaded, workordersLoading)'
      },
      isEmpty: {
        type: Boolean,
        computed: '_loadedAndNoRecords(isLoading)'
      },
      indexOptions: {
        type: Object,
        value: {
          index: {
            fields: ['id', 'resourceName']
          }
        }
      },
      fetchOptions: {
        type: Object,
        value: {
          selector: {resourceName: resourceName, id: {$gt: null}},
          fields: ['_id', 'id', 'desc','status','assetNum','dueDate','timer'],
          sort: [{id: 'asc'}],
          include_docs: true, 
          deleted: false, 
          limit: 10, 
          skip: 0
        }
      },
      inputOn: {
        type: Boolean,
        value: false
      },
      fieldsSearch: {
        type: Array,
        value: [
          {checked: true, desc: 'desc'},
          {checked: true, desc: 'status'},
          {checked: false, desc: 'assetNum'},
          {checked: false, desc: 'timer'},
          {checked: false, desc: 'id'}
        ]
      },
      fieldsSortBy: {
        type: Array,
        value: [
          {checked: false, desc: 'desc'},
          {checked: false, desc: 'status'},
          {checked: false, desc: 'assetNum'},
          {checked: false, desc: 'timer'},
          {checked: false, desc: 'dueDate'},
          {checked: true, desc: 'id'}
        ]
      },
      exactMatch: {
        type: Boolean,
        value: false
      },
      sortAscending: {
        type: Boolean,
        value: true,
        observer: '_sortDirectionChanged'
      }
    };
  }

  static get template() {
    return html`
      ${AnywhereStyles}
      <style is="custom-style">
        paper-spinner {
          --paper-spinner-color: #1D3649;
          --paper-spinner-layer-1-color: #1D3649;
          --paper-spinner-layer-2-color: #1D3649;
          --paper-spinner-layer-3-color: #1D3649;
          --paper-spinner-layer-4-color: #1D3649;
          width: 50px;
          height: 50px;
        }
      </style>
      <style is="custom-style">
        paper-fab {
          z-index: 2;
          position: fixed;
          bottom: 30px;          
          right: 25px;
          --paper-fab-background: #5AAAFA;
          --paper-fab-keyboard-focus-background: #5AAAFA;
        }
      </style>
      <style>
        iron-list {
          flex: 1 1 auto;
        }

        iron-list any-list-item:nth-of-type(2n+1) {
          background-color: #ECECEC;
        }

        .container {
          height: calc(100vh - 64px);
          display: flex;
          flex-direction: column;
        }

        paper-checkbox {
          margin: 10px;
        }

        .div--outlined {
          border: thin #1D3649 solid;
        }
        .inline--margin {
          margin-left: 10px;
        }
        .fab {
          z-index: 2;
          position: fixed;
          bottom: 30px;          
          right: 25px;
          width: 50px;
          height: 50px;
          border-radius: 30px;
          background-color: #5AAAFA;
          box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
          border: none;
        }
      }
      </style>

      <div class="container">
        <!-- show when loading -->
        <template is="dom-if" if="{{isLoading}}">
          <div class="flex flex--full-width flex--align-center flex--justify-center">
            <paper-spinner active alt="Loading workorders"></paper-spinner>
          </div>
        </template>

        <!-- show workorders -->
        <iron-scroll-threshold id="threshold" on-lower-threshold="loadMoreData">
          <iron-list items="{{workorders}}" as="workorder" scroll-target="threshold">
            <template>
              <any-list-item item="{{workorder}}" tabindex="[[tabIndex]]"></any-list-item>
            </template>
          </iron-list>
        </iron-scroll-threshold>

        <!-- show if no records have been found -->
        <template is="dom-if" if="{{isEmpty}}">
          <div class="flex flex--full-width flex--align-center flex--justify-center">
            No records found with the current filter settings
          </div>
        </template>

        <!-- show settings fab-button -->
        <template is="dom-if" if="{{inputOn}}">
          <!-- <paper-fab src="../../images/cog.svg" on-click="_openSettingsModal"></paper-fab> -->
          <div class="flex flex--justify-center">
            <button on-click="_openSettingsModal" class="fab">${settingsIcon}</button>
          </div>
        </template>

        <!-- search settings dialog -->
        <paper-dialog id="settingsModal">
          <h2>Search Settings</h2>
          <paper-dialog-scrollable>
            <paper-toggle-button id="exact-match" checked="{{exactMatch}}">Only exact match</paper-toggle-button>
            <h3>Fields to search term</h3>
            <div >
              <template is="dom-repeat" items="{{fieldsSearch}}" as="item">
                <paper-checkbox checked="{{item.checked}}">{{item.desc}}</paper-checkbox>
              </template>
            </div>
            <div class="flex flex--row">
              <h3>Sort By</h3>
              <paper-toggle-button class="inline--margin" checked="{{sortAscending}}">{{sortDescription}}</paper-toggle-button>
            </div>
            <paper-listbox attr-for-selected="item-name" selected="{{itemName}}" fallback-selection="id" id="sortBy" class="div--outlined">
              <template is="dom-repeat" items="{{fieldsSortBy}}" as="item">
                <paper-item select="{{item.checked}}" item-name="{{item.desc}}">{{item.desc}}</paper-item>
              </template>
            </paper-listbox>
          </paper-dialog-scrollable>
          <div class="buttons">
            <paper-button dialog-confirm autofocus on-click="_updateSearchSettings">Done</paper-button>
          </div>
        </paper-dialog>
      </div>
    `;
  }

  ready() {
    super.ready();
    this.dispatchEvent(new CustomEvent('ready', {}));
    AnyAppGlobals.dbBinder.bindDocs('workorders', resourceName, this);
  }

  searchTermListener(evt) {
    this.inputOn = evt.detail.inputOn;
    this.searchTerm = evt.detail.searchTerm;

    // don't even bother to update the query if nothing new
    if (this.searchTerm == null) {
      return;
    }

    // change query parameters if input on
    if (this.inputOn) {
      if (this.searchTerm != "") {
        this._updateQuery(this._generateSelector(this.searchTerm));  
      }
    }
    else {
      // just query by resource name
      let newSelector = {
        resourceName: resourceName, 
        id: {$gt: null}
      }
      this._updateQuery(newSelector);
    }
  }

  _isLoadingWorkorders(workordersLoaded, workordersLoading) {
    let result = (!workordersLoaded || workordersLoading);
    return result;
  }

  _loadedAndNoRecords(isLoading) {
    return (!isLoading && this.workorders.length == 0);
  }

  // updates the description of the toggle for sorting
  _sortDirectionChanged() {
    if (this.sortAscending) {
      this.sortDescription = "Ascending"
    }
    else {
      this.sortDescription = "Descending"
    }
  }

  _updateSearchSettings() {
    this._updateQuery(this._generateSelector(this.searchTerm));
  }

  _generateSelector(searchTerm) {
    let fieldSelection = this.fieldsSearch.filter((item) => item.checked);
    let newSelector = null;
    let operator = '$regex';

    // return default fetchOptions
    if (searchTerm == "") {
      return this.fetchOptions.selector;
    }

    if (this.exactMatch) {
      searchTerm = new RegExp(`^${searchTerm}$`, "i");
    }
    else {
      searchTerm = new RegExp(`.*${searchTerm}.*`, "i");
    }

    if (fieldSelection.length == 1) {
      newSelector = { resourceName: resourceName };
      newSelector[fieldSelection[0].desc] = new Object();
      newSelector[fieldSelection[0].desc][operator] = searchTerm;
    }
    else {
      // to use $or and sort we must use _id
      newSelector = { resourceName: resourceName, id: {"$gt": null}};
      newSelector['$or'] = [];
      // builds something like
      // $or: [ { status: {$eq: 'xxx'}} , { status: {$regex: 'xxx'}}]
      let or = newSelector['$or'];
      for (var i = 0; i < fieldSelection.length; i++) {
        let entry = new Object();
        entry[fieldSelection[i].desc] = new Object();
        entry[fieldSelection[i].desc][operator] = searchTerm;
        or.push(entry);
      }
    }
    return newSelector;
  }

  _openSettingsModal(evt) {
    this.$.settingsModal.open();
  }

  _updateQuery(selector) {
    let options = new Object();
    let indexOptions = this.indexOptions;
    
    // reset local array
    this.workorders = [];
    // clone fetch options
    options = Object.assign({}, this.fetchOptions);
    // cleanup selector
    options.selector = selector;
    // reset skip
    options.skip = 0;
    
    /* setup indexes and sort */
    let sortField = this.$.sortBy.selected;
    // builds something like sort: [{<attribute>: 'asc'}]
    let sortObj = new Object();
    // for now only supports a single sort value LK0
    sortObj[sortField] = this.sortAscending? 'asc' : 'desc'; 
    // setup sort
    options['sort'] = [];
    options['sort'].push(sortObj);
    // setup index, something like { index: { fields: ['id', 'resourceName'] } }
    indexOptions.index.fields = [];
    // always add resourceName to index
    indexOptions.index.fields.push(sortField);
    // always include resourceName
    indexOptions.index.fields.push('resourceName');

    // add sortField with a default selector, otherwise can't sort by it
    options.selector[sortField] = {"$gt": null};

    this._loadWorkorders(options, indexOptions);
  }

  requestLoadWorkorders() {
    this._loadWorkorders(this.fetchOptions, this.indexOptions, false);
  }

  _loadWorkorders(options, indexOptions, isLoadMore) {
    let that = this;
    indexOptions = indexOptions? indexOptions : that.indexOptions;
    // bad request
    if (!options) {
      return;
    }

    // LK0 checking performance
    let perf1 = new Date().getTime();

    // create a index to quickly find resources
    AnyAppGlobals.anydb.createIndex(indexOptions).then(() => {
      // show loading spinner
      that.workordersLoading = true;
      AnyAppGlobals.anydb.find(options).then((response) => {
        if (response && response.docs.length > 0) {
          // if the same query but loading more records
          if (isLoadMore && that.workordersLoaded) {
            that.fetchOptions.skip += response.docs.length;
            that.push('workorders', ...response.docs);
          }
          // brand new query
          else {
            that.set('workorders', response.docs);
            that.fetchOptions = options;
          }
          that.workordersLoaded = true;
        }
        else {
          that.set('workorders', []);
        }

        that.$.threshold.clearTriggers();
        // hide loading spinner
        that.workordersLoading = false;

        // LK0 checking performance
        let perf = new Date().getTime() - perf1;
        console.log(`## query took ${perf} miliseconds`);
        
      }).catch((err) => {
        console.error(err);
        throw err;
      });
    });
  }

  // load more data when the user hits the bottom of the list
  loadMoreData(event) {
    this._loadWorkorders(this.fetchOptions, null, true);
  }
}

window.customElements.define('any-list-view', AnyListView);
