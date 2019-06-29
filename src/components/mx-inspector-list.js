import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/paper-tabs/paper-tabs.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-button/paper-button.js';

import {ContextMixin} from './mx-context-element.js';
import { AnywhereStyles } from './anywhere-styles.js';
import { disconnected } from './any-icons.js';

/**
 * <maximo-inspector-list id="inspResultList" name="inspResultList" data-set="[[recordListData]]" collection-search-ref="{{getLocalObject('inspresultlistcollection')}}"></maximo-inspector-list>
 * `mx-inspector-list`
 * Port maximo-inspector-list to Polymer V3
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class MxInspectorList extends ContextMixin(PolymerElement) {

    static get is() {return 'mx-inspector-list';}

    static get template() {
        return html`
${AnywhereStyles}
<style>
    :host {
        display: block;
        margin: 10px 20px;
    }

    .icon {
        height: 24px;
        width: 24px;
    }
</style>
<iron-ajax url="mock/light-inspections.json" last-response="{{dataSet}}" auto></iron-ajax>
<div>
<div class="header">
    <div class="container">
        <div class="flex flex--row">
            <h1 class="title">Inspections</h1>
            <span style="text-transform:capitalize;">[[connection]]</span>
            <span class="icon" hidden$="[[isConnected]]">${disconnected}</span>
        </div>
        <hr/>
        <div id="inspectorListFlex2Div">
            <paper-tabs id="inspectorListContentSelectorDiv" selected="0" scrollable>
                <paper-tab name="pending" on-click="tabTap">Pending</paper-tab>
                <paper-tab name="inprogress" on-click="tabTap">In Progress</paper-tab>
                <paper-tab name="completed" on-click="tabTap">Completed</paper-tab>
                <paper-tab name="all" on-click="tabTap">All</paper-tab>
            </paper-tabs>
        </div>
        <div class="flex flex--row">
            <paper-input label="Search"></paper-input>
            <paper-button raised>Unscheduled Inspection</paper-button>
        </div>
    </div>
</div>

<div id="inspectorListTileDiv" class="pageDiv scroll">
    <label id="inspectorListCount" class="count">[[_resultCounter]]</label>

    <template is="dom-if" if="[[!hasRecord]]">
        <div id="inspectorListNoRecords" class="noRecords">
            <p>{{noInspectionsFound}}</p>
        </div>
    </template>
    <div id="inspectorListDataScrollerDiv" class="layout horizontal wrap">
        <template id="inspectorListTileTemplate" is="dom-repeat" items="[[dataSet]]" as="inspForm">
            <div>inspform [[index]]</div>
            <!-- <maximo-inspector-tile id="inspectorListTileRecord" data-id="[[inspForm.inspectionformid]]" record="{{inspForm}}" page="inspResultList"
                form-status-set="[[statusSet]]" filter="[[selectedTabName]]" on-card-tap="cardTap"></maximo-inspector-tile> -->
        </template>
    </div>
</div>
        `;
    }

    static get properties() {
        return {

            /**
             * Connection status
             */
            connection: {
                type: String,
                value: function() {
                    return navigator.onLine ? "online" : "offline";
                }
            },

            isConnected: {
                type: Boolean,
                computed: '_computeConnectionStatus(connection)'
            },

            /**
                 * List of inspection form
                 */
            dataSet: {
                type: Array,
                value: [],
                observer: 'dataSetRefresh'
            },

            /**
               * 
               */
            selectedTile: {
                type: Object,
                value: null
            },

            /**
             * Select tab name
             */
            selectedTabName: {
                type: String,
                value: '',
                observer: '_filterList'
            },



            /**
             * Indicator to show/hide message
             */
            hasRecord: {
                type: Boolean,
                value: false,
                readOnly: true
            },

            /**
             * Hold message for each tab
             */
            noInspectionsFound: {
                type: String,
                value() {
                    return 'inspector_no_inspections_due';
                }
            },

            /**
             * Array with selected inspections
             */
            selectedInspections: {
                type: Array,
                value: []
            },

        };
    }

    constructor() {
        super();
        this._boundListener = this.updateOnlineStatus.bind(this);
    }

    connectedCallback() {
        super.connectedCallback();
        window.addEventListener('online',  this._boundListener);
        window.addEventListener('offline', this._boundListener);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        window.removeEventListener('online',  this._boundListener);
        window.removeEventListener('offline', this._boundListener);
    }

    /**
     * 
     */
    updateOnlineStatus(event) {
        var condition = navigator.onLine ? "online" : "offline";

        // status.className = condition;
        // status.innerHTML = condition.toUpperCase();

        this.set('connection', condition);
    
        //log.insertAdjacentHTML("beforeend", "Event: " + event.type + "; Status: " + condition);
        console.log("Event: " + event.type + "; Status: " + condition);
    }

    _computeConnectionStatus(connected) {
        return (connected && connected.toLowerCase() === 'online');
    }

    /**
      * DataSet Refresh - setHasRecord flag true/false if records exist
      */
    dataSetRefresh() {

        var total;
        if (!this.dataSet) {
            total = 0;
        } else {
            total = this.dataSet.length;
        }

        var collectionTotal = !this.collectionSearchRef ? 0 : !this.collectionSearchRef.totalCount ? 0 : this.collectionSearchRef.totalCount;
        if (total && total < collectionTotal) {
            this._resultCounter = this.localize('uitext', 'mxapiinspresult', 'of_results', [total, collectionTotal]);
        } else {
            this._resultCounter = this.localize('uitext', 'mxapibase', 'countresults', [total]);
        }

        if (total === 0) {
            this._setHasRecord(false);
        } else {
            this._setHasRecord(true);
        }
    }

	/**
	 * Listens to tab selection
	 */
    tabTap(e) {

        var name = e.currentTarget.getAttribute('name');
        //this.selectedTabName = name;
        this.selectTab(name);
    }

	/**
	 * Update selectedTabName property
	 */
    selectTab(tabName) {

        if (this.selectedTabName !== tabName) {
            this.selectedTabName = tabName;
        } else {
            this.dispatchEvent(new CustomEvent('fetch-inspresult'));
            //this.fire('fetch-inspresult');
            this.dataSetRefresh();
        }
    }

    /**
       * Request page change to execution
       */
    _loadExecution(idSet) {
        //this.fire('load-inspection-set', {'inspectionIds': idSet});
        this.dispatchEvent(new CustomEvent('load-inspection-set', {detail: {inspectionIds: idSet}}));
    }

    /**
     * Fetch children of WO parent
     */
    _loadChildren(inspResult) {
        //this.fire('load-insp-children', {'inspection': inspResult});
        this.dispatchEvent(new CustomEvent('load-insp-children', {detail: {inspection: inspResult}}));
    }

    /**
     * Card set observer
     * Clear selection whenever dataset is reset
     */
    dataSetReset(newvalue, oldvalue) {
        this.resetMultiSelection();
    }

    resetMultiSelection() {
        this.set('selectedInspections', []);
    }

    /**
	 * Triggered by Status Filtering, Maximo Content Selector component.
	 * Change message according to selected tab
	 * 
	 * @param e
	 * @returns
	 */
    _filterList(tabName) {

        this.toggleWait(true);

        var queryName;

        //find external status value
        switch (tabName) {
            case 'pending':
                queryName = 'INSPRESULTPENDING';
                this.noInspectionsFound = this.localize('uitext', 'mxapiinspresult', 'inspector_no_inspections_due');
                break;
            case 'inprogress':
                queryName = 'INSPRESULTINPROGRESS';
                this.noInspectionsFound = this.localize('uitext', 'mxapiinspresult', 'inspector_no_inspections_due');
                break;
            case 'completed':
                queryName = 'INSPRESULTCOMPLETE';
                this.noInspectionsFound = this.localize('uitext', 'mxapiinspresult', 'inspector_no_inspections_found');
                break;
            default:
                queryName = 'INSPRESULTALL';
                this.noInspectionsFound = this.localize('uitext', 'mxapiinspresult', 'inspector_no_inspections_found');
        }

        this.dispatchEvent(new CustomEvent('fetch-inspresult', {detail: {queryname: queryName}}));

        this.resetMultiSelection();

    }
}

window.customElements.define(MxInspectorList.is, MxInspectorList);
