import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import { setPassiveTouchGestures, setRootPath } from '@polymer/polymer/lib/utils/settings.js';
import '@polymer/app-route/app-location.js';
import '@polymer/app-route/app-route.js';
import '@polymer/iron-pages/iron-pages.js';
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-header-layout/app-header-layout.js';
import '@polymer/app-layout/app-scroll-effects/app-scroll-effects.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
import './any-quick-search-bar';
import { AnywhereStyles } from './anywhere-styles.js';
import { backArrow, weAppIcon, barcodeIcon, mapIcon, cameraIcon, searchIcon } from './any-icons.js';
// database binder
import { PouchdbBinder } from './pouchdb-binder.js'

// Gesture events like tap and track generated from touch will not be
// preventable, allowing for better scrolling performance.
setPassiveTouchGestures(true);

// Set Polymer's root path to the same value we passed to our service worker
// in `index.html`.
setRootPath(AnyAppGlobals.rootPath);

/**
 * @customElement
 * @polymer
 */
class AnyApp extends PolymerElement {
  constructor() {
    super();
    AnyAppGlobals.dbBinder = new PouchdbBinder();
    // call pouchdb-binder mixin
    AnyAppGlobals.dbBinder._registerDbListener(AnyAppGlobals.anydb);
    let firstTimeLoad = true;
    // data from bluemix cloudant
    let bluemixData = {
      "name": "anywhere",
      "username": "username",
      "password": "password",
      "host": "somehwere",
      "port": 443,
      "url": "https://somewherew"
    };
    // generates something like http://user:pass@host:port/name
    let remoteDbUrl = `https://${bluemixData.username}:${bluemixData.password}@${bluemixData.host}:${bluemixData.port}/anywhere`;
    // sync with remote database
    PouchDB.sync("anywhere", remoteDbUrl, {
      live: true,
      retry: true
    }).on('change', info => {
      // load workorders if needed
      // if (!this.$.listView.workordersLoaded) {
      //   this.$.listView._loadWorkorders();
      // }
      if (firstTimeLoad) {
        console.log("Finish first contact with database");
        this.$.listView.requestLoadWorkorders();
        firstTimeLoad = false;
      }
    });
    this.firstLoad = false;
  }

  static get properties() {
    return {
      pageTitle: {
        type: String,
        value: 'My Assigned Work'
      },
      page: {
        type: String,
        reflectToAttribute: true,
        observer: '_pageChanged'
      },
      firstLoad: {
        type: Boolean,
        value: true
      },
      routeData: Object,
      subroute: Object
    };
  }

  static get observers() {
    return [
      '_routePageChanged(routeData.page)'
    ];
  }

  static get template() {
    return html`
      ${AnywhereStyles}
      <style>
        :host {
          --app-primary-color: #1D3649;
          --app-secondary-color: black;

          display: block;
        }

        :host(:not([page=details-view])) .a__back-btn {
          display: none;
        }

        :host(:not([page=details-view])) .details__show {
          display: none;
        }

        :host(:not([page=list-view])) .list__show {
          display: none;
        }

        .button__back {
          vertical-align: middle;
          padding: 0px
        }

        app-header {
          color: #fff;
          background-color: var(--app-primary-color);
        }

        app-header a:link, a:visited, a:hover, a:active {
          color: white;
        }
      </style>
      
      <app-location 
        route="{{route}}" 
        url-space-regex="^[[rootPath]]">
      </app-location>

      <app-route 
        route="{{route}}" 
        pattern="[[rootPath]]:page" 
        data="{{routeData}}" 
        tail="{{subroute}}">
      </app-route>
      <app-route
          route="{{subroute}}"
          pattern="/:id"
          data="{{subrouteData}}">
      </app-route>


      <!-- Main content -->
      <app-header-layout has-scrolling-region="">

        <app-header reveals>
          <app-toolbar>
            <a class="a__back-btn" href="[[rootPath]]list-view" tabindex="-1">
              <button class="button button__icon button__back" aria-label="Go Back">${backArrow}</button>
            </a>
            <button class="button button__icon list__show" aria-label="WE icon">${weAppIcon}</button>
            <header main-title class="details__show">[[pageTitle]]</header>
            <any-quick-search-bar id="quickSearchBar" class="list__show">[[pageTitle]]</any-quick-search-bar>
            <!-- <button class="button button__icon list__show" aria-label="Scan barcode">${barcodeIcon}</button> -->
            <!-- <button class="button button__icon list__show" aria-label="View records on map">${mapIcon}</button> -->
            <button class="button button__icon details__show" aria-label="Take a picture">${cameraIcon}</button>
          </app-toolbar>
        </app-header>
        <iron-pages selected="[[page]]" attr-for-selected="name" role="main">
          <any-list-view id="listView" title='My Assigned Work' name="list-view"></any-list-view>
          <any-details-view id="detailsView" title='Work Order details' name="details-view" route="{{route}}" item-id="[[subrouteData.id]]"></any-details-view>
          <mx-inspector-list id="inspList" title="Conduct an Inspection" name="insp-list"></mx-inspector-list>
        </iron-pages>
      </app-header-layout>
      
    `;
  }

  ready() {
    super.ready();
    // attach listener when listView is ready
    this.$.listView.addEventListener('ready', (e)=> {
      // make the listview listen to changes on the search bar, must bind its own context otherwise get quickSearchBar context
      this.$.quickSearchBar.addEventListener('searchTermChanged', this.$.listView.searchTermListener.bind(this.$.listView));
    });
  }

  _routePageChanged(page) {
     // Show the corresponding page according to the route.
     //
     // If no page was found in the route data, page will be an empty string.
     // Show 'view1' in that case. And if the page doesn't exist, show 'view404'.
    if (!page) {
      this.page = 'list-view';
    }
    if (['list-view', 'details-view', 'insp-list'].indexOf(page) !== -1) {
      this.page = page;
    }

    // // Close a non-persistent drawer when the page & route are changed.
    // if (!this.$.drawer.persistent) {
    //   this.$.drawer.close();
    // }
  }

  _pageChanged(page) {
    // Import the page component on demand.
    //
    // Note: `polymer build` doesn't like string concatenation in the import
    // statement, so break it up.
    switch (page) {
      case 'list-view':
        import('./any-list-view.js');
        this.pageTitle = this.$.listView.title;
        break;
      case 'details-view':
        import('./any-details-view.js');
        this.pageTitle = this.$.detailsView.title;
        break;
      case 'insp-list':
        import('./mx-inspector-list.js');
        this.pageTitle = this.$.inspList.title;
        break;
    }
  }
}

window.customElements.define('any-app', AnyApp);
