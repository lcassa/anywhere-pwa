define(["exports","./any-app.js"],function(_exports,_anyApp){"use strict";Object.defineProperty(_exports,"__esModule",{value:!0});_exports.ContextMixin=_exports.IronMenubarBehavior=_exports.IronMenubarBehaviorImpl=_exports.$mxContextElement=_exports.$ironMenubarBehavior=void 0;(0,_anyApp.Polymer)({is:"iron-request",hostAttributes:{hidden:!0},properties:{xhr:{type:Object,notify:!0,readOnly:!0,value:function(){return new XMLHttpRequest}},response:{type:Object,notify:!0,readOnly:!0,value:function(){return null}},status:{type:Number,notify:!0,readOnly:!0,value:0},statusText:{type:String,notify:!0,readOnly:!0,value:""},completes:{type:Object,readOnly:!0,notify:!0,value:function(){return new Promise(function(resolve,reject){this.resolveCompletes=resolve;this.rejectCompletes=reject}.bind(this))}},progress:{type:Object,notify:!0,readOnly:!0,value:function(){return{}}},aborted:{type:Boolean,notify:!0,readOnly:!0,value:!1},errored:{type:Boolean,notify:!0,readOnly:!0,value:!1},timedOut:{type:Boolean,notify:!0,readOnly:!0,value:!1}},get succeeded(){if(this.errored||this.aborted||this.timedOut){return!1}var status=this.xhr.status||0;return 0===status||200<=status&&300>status},send:function(options){var xhr=this.xhr;if(0<xhr.readyState){return null}xhr.addEventListener("progress",function(progress){this._setProgress({lengthComputable:progress.lengthComputable,loaded:progress.loaded,total:progress.total});this.fire("iron-request-progress-changed",{value:this.progress})}.bind(this));xhr.addEventListener("error",function(error){this._setErrored(!0);this._updateStatus();var response=options.rejectWithRequest?{error:error,request:this}:error;this.rejectCompletes(response)}.bind(this));xhr.addEventListener("timeout",function(error){this._setTimedOut(!0);this._updateStatus();var response=options.rejectWithRequest?{error:error,request:this}:error;this.rejectCompletes(response)}.bind(this));xhr.addEventListener("abort",function(){this._setAborted(!0);this._updateStatus();var error=new Error("Request aborted."),response=options.rejectWithRequest?{error:error,request:this}:error;this.rejectCompletes(response)}.bind(this));xhr.addEventListener("loadend",function(){this._updateStatus();this._setResponse(this.parseResponse());if(!this.succeeded){var error=new Error("The request failed with status code: "+this.xhr.status),response=options.rejectWithRequest?{error:error,request:this}:error;this.rejectCompletes(response);return}this.resolveCompletes(this)}.bind(this));this.url=options.url;var isXHRAsync=!1!==options.async;xhr.open(options.method||"GET",options.url,isXHRAsync);var acceptType={json:"application/json",text:"text/plain",html:"text/html",xml:"application/xml",arraybuffer:"application/octet-stream"}[options.handleAs],headers=options.headers||Object.create(null),newHeaders=Object.create(null);for(var key in headers){newHeaders[key.toLowerCase()]=headers[key]}headers=newHeaders;if(acceptType&&!headers.accept){headers.accept=acceptType}Object.keys(headers).forEach(function(requestHeader){if(/[A-Z]/.test(requestHeader)){_anyApp.Base._error("Headers must be lower case, got",requestHeader)}xhr.setRequestHeader(requestHeader,headers[requestHeader])},this);if(isXHRAsync){xhr.timeout=options.timeout;var handleAs=options.handleAs;if(!!options.jsonPrefix||!handleAs){handleAs="text"}xhr.responseType=xhr._responseType=handleAs;if(!!options.jsonPrefix){xhr._jsonPrefix=options.jsonPrefix}}xhr.withCredentials=!!options.withCredentials;var body=this._encodeBodyObject(options.body,headers["content-type"]);xhr.send(body);return this.completes},parseResponse:function(){var xhr=this.xhr,responseType=xhr.responseType||xhr._responseType,preferResponseText=!this.xhr.responseType,prefixLen=xhr._jsonPrefix&&xhr._jsonPrefix.length||0;try{switch(responseType){case"json":if(preferResponseText||xhr.response===void 0){try{return JSON.parse(xhr.responseText)}catch(_){console.warn("Failed to parse JSON sent from "+xhr.responseURL);return null}}return xhr.response;case"xml":return xhr.responseXML;case"blob":case"document":case"arraybuffer":return xhr.response;case"text":default:{if(prefixLen){try{return JSON.parse(xhr.responseText.substring(prefixLen))}catch(_){console.warn("Failed to parse JSON sent from "+xhr.responseURL);return null}}return xhr.responseText}}}catch(e){this.rejectCompletes(new Error("Could not parse response. "+e.message))}},abort:function(){this._setAborted(!0);this.xhr.abort()},_encodeBodyObject:function(body,contentType){if("string"==typeof body){return body}var bodyObj=body;switch(contentType){case"application/json":return JSON.stringify(bodyObj);case"application/x-www-form-urlencoded":return this._wwwFormUrlEncode(bodyObj);}return body},_wwwFormUrlEncode:function(object){if(!object){return""}var pieces=[];Object.keys(object).forEach(function(key){pieces.push(this._wwwFormUrlEncodePiece(key)+"="+this._wwwFormUrlEncodePiece(object[key]))},this);return pieces.join("&")},_wwwFormUrlEncodePiece:function(str){if(null===str||str===void 0||!str.toString){return""}return encodeURIComponent(str.toString().replace(/\r?\n/g,"\r\n")).replace(/%20/g,"+")},_updateStatus:function(){this._setStatus(this.xhr.status);this._setStatusText(this.xhr.statusText===void 0?"":this.xhr.statusText)}});(0,_anyApp.Polymer)({is:"iron-ajax",hostAttributes:{hidden:!0},properties:{url:{type:String},params:{type:Object,value:function(){return{}}},method:{type:String,value:"GET"},headers:{type:Object,value:function(){return{}}},contentType:{type:String,value:null},body:{type:Object,value:null},sync:{type:Boolean,value:!1},handleAs:{type:String,value:"json"},withCredentials:{type:Boolean,value:!1},timeout:{type:Number,value:0},auto:{type:Boolean,value:!1},verbose:{type:Boolean,value:!1},lastRequest:{type:Object,notify:!0,readOnly:!0},lastProgress:{type:Object,notify:!0,readOnly:!0},loading:{type:Boolean,notify:!0,readOnly:!0},lastResponse:{type:Object,notify:!0,readOnly:!0},lastError:{type:Object,notify:!0,readOnly:!0},activeRequests:{type:Array,notify:!0,readOnly:!0,value:function(){return[]}},debounceDuration:{type:Number,value:0,notify:!0},jsonPrefix:{type:String,value:""},bubbles:{type:Boolean,value:!1},rejectWithRequest:{type:Boolean,value:!1},_boundHandleResponse:{type:Function,value:function(){return this._handleResponse.bind(this)}}},observers:["_requestOptionsChanged(url, method, params.*, headers, contentType, "+"body, sync, handleAs, jsonPrefix, withCredentials, timeout, auto)"],created:function(){this._boundOnProgressChanged=this._onProgressChanged.bind(this)},get queryString(){var queryParts=[],param,value;for(param in this.params){value=this.params[param];param=window.encodeURIComponent(param);if(Array.isArray(value)){for(var i=0;i<value.length;i++){queryParts.push(param+"="+window.encodeURIComponent(value[i]))}}else if(null!==value){queryParts.push(param+"="+window.encodeURIComponent(value))}else{queryParts.push(param)}}return queryParts.join("&")},get requestUrl(){var queryString=this.queryString,url=this.url||"";if(queryString){var bindingChar=0<=url.indexOf("?")?"&":"?";return url+bindingChar+queryString}return url},get requestHeaders(){var headers={},contentType=this.contentType;if(null==contentType&&"string"===typeof this.body){contentType="application/x-www-form-urlencoded"}if(contentType){headers["content-type"]=contentType}if("object"===typeof this.headers){for(var header in this.headers){headers[header]=this.headers[header].toString()}}return headers},_onProgressChanged:function(event){this._setLastProgress(event.detail.value)},toRequestOptions:function(){return{url:this.requestUrl||"",method:this.method,headers:this.requestHeaders,body:this.body,async:!this.sync,handleAs:this.handleAs,jsonPrefix:this.jsonPrefix,withCredentials:this.withCredentials,timeout:this.timeout,rejectWithRequest:this.rejectWithRequest}},generateRequest:function(){var request=document.createElement("iron-request"),requestOptions=this.toRequestOptions();this.push("activeRequests",request);request.completes.then(this._boundHandleResponse).catch(this._handleError.bind(this,request)).then(this._discardRequest.bind(this,request));var evt=this.fire("iron-ajax-presend",{request:request,options:requestOptions},{bubbles:this.bubbles,cancelable:!0});if(evt.defaultPrevented){request.abort();request.rejectCompletes(request);return request}if(this.lastRequest){this.lastRequest.removeEventListener("iron-request-progress-changed",this._boundOnProgressChanged)}request.addEventListener("iron-request-progress-changed",this._boundOnProgressChanged);request.send(requestOptions);this._setLastProgress(null);this._setLastRequest(request);this._setLoading(!0);this.fire("request",{request:request,options:requestOptions},{bubbles:this.bubbles,composed:!0});this.fire("iron-ajax-request",{request:request,options:requestOptions},{bubbles:this.bubbles,composed:!0});return request},_handleResponse:function(request){if(request===this.lastRequest){this._setLastResponse(request.response);this._setLastError(null);this._setLoading(!1)}this.fire("response",request,{bubbles:this.bubbles,composed:!0});this.fire("iron-ajax-response",request,{bubbles:this.bubbles,composed:!0})},_handleError:function(request,error){if(this.verbose){_anyApp.Base._error(error)}if(request===this.lastRequest){this._setLastError({request:request,error:error,status:request.xhr.status,statusText:request.xhr.statusText,response:request.xhr.response});this._setLastResponse(null);this._setLoading(!1)}this.fire("iron-ajax-error",{request:request,error:error},{bubbles:this.bubbles,composed:!0});this.fire("error",{request:request,error:error},{bubbles:this.bubbles,composed:!0})},_discardRequest:function(request){var requestIndex=this.activeRequests.indexOf(request);if(-1<requestIndex){this.splice("activeRequests",requestIndex,1)}},_requestOptionsChanged:function(){this.debounce("generate-request",function(){if(null==this.url){return}if(this.auto){this.generateRequest()}},this.debounceDuration)}});const IronMenubarBehaviorImpl={hostAttributes:{role:"menubar"},keyBindings:{left:"_onLeftKey",right:"_onRightKey"},_onUpKey:function(event){this.focusedItem.click();event.detail.keyboardEvent.preventDefault()},_onDownKey:function(event){this.focusedItem.click();event.detail.keyboardEvent.preventDefault()},get _isRTL(){return"rtl"===window.getComputedStyle(this).direction},_onLeftKey:function(event){if(this._isRTL){this._focusNext()}else{this._focusPrevious()}event.detail.keyboardEvent.preventDefault()},_onRightKey:function(event){if(this._isRTL){this._focusPrevious()}else{this._focusNext()}event.detail.keyboardEvent.preventDefault()},_onKeydown:function(event){if(this.keyboardEventMatchesKeys(event,"up down left right esc")){return}this._focusWithKeyboardEvent(event)}};_exports.IronMenubarBehaviorImpl=IronMenubarBehaviorImpl;const IronMenubarBehavior=[_anyApp.IronMenuBehavior,IronMenubarBehaviorImpl];_exports.IronMenubarBehavior=IronMenubarBehavior;_exports.$ironMenubarBehavior={IronMenubarBehaviorImpl:IronMenubarBehaviorImpl,IronMenubarBehavior:IronMenubarBehavior};(0,_anyApp.Polymer)({_template:_anyApp.html$1`
    <style>
      :host {
        @apply --layout-inline;
        @apply --layout-center;
        @apply --layout-center-justified;
        @apply --layout-flex-auto;

        position: relative;
        padding: 0 12px;
        overflow: hidden;
        cursor: pointer;
        vertical-align: middle;

        @apply --paper-font-common-base;
        @apply --paper-tab;
      }

      :host(:focus) {
        outline: none;
      }

      :host([link]) {
        padding: 0;
      }

      .tab-content {
        height: 100%;
        transform: translateZ(0);
          -webkit-transform: translateZ(0);
        transition: opacity 0.1s cubic-bezier(0.4, 0.0, 1, 1);
        @apply --layout-horizontal;
        @apply --layout-center-center;
        @apply --layout-flex-auto;
        @apply --paper-tab-content;
      }

      :host(:not(.iron-selected)) > .tab-content {
        opacity: 0.8;

        @apply --paper-tab-content-unselected;
      }

      :host(:focus) .tab-content {
        opacity: 1;
        font-weight: 700;
      }

      paper-ripple {
        color: var(--paper-tab-ink, var(--paper-yellow-a100));
      }

      .tab-content > ::slotted(a) {
        @apply --layout-flex-auto;

        height: 100%;
      }
    </style>

    <div class="tab-content">
      <slot></slot>
    </div>
`,is:"paper-tab",behaviors:[_anyApp.IronControlState,_anyApp.IronButtonState,_anyApp.PaperRippleBehavior],properties:{link:{type:Boolean,value:!1,reflectToAttribute:!0}},hostAttributes:{role:"tab"},listeners:{down:"_updateNoink",tap:"_onTap"},attached:function(){this._updateNoink()},get _parentNoink(){var parent=(0,_anyApp.dom)(this).parentNode;return!!parent&&!!parent.noink},_updateNoink:function(){this.noink=!!this.noink||!!this._parentNoink},_onTap:function(event){if(this.link){var anchor=this.queryEffectiveChildren("a");if(!anchor){return}if(event.target===anchor){return}anchor.click()}}});const $_documentContainer=document.createElement("template");$_documentContainer.setAttribute("style","display: none;");$_documentContainer.innerHTML=`<iron-iconset-svg name="paper-tabs" size="24">
<svg><defs>
<g id="chevron-left"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path></g>
<g id="chevron-right"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path></g>
</defs></svg>
</iron-iconset-svg>`;document.head.appendChild($_documentContainer.content);(0,_anyApp.Polymer)({_template:_anyApp.html$1`
    <style>
      :host {
        @apply --layout;
        @apply --layout-center;

        height: 48px;
        font-size: 14px;
        font-weight: 500;
        overflow: hidden;
        -moz-user-select: none;
        -ms-user-select: none;
        -webkit-user-select: none;
        user-select: none;

        /* NOTE: Both values are needed, since some phones require the value to be \`transparent\`. */
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        -webkit-tap-highlight-color: transparent;

        @apply --paper-tabs;
      }

      :host(:dir(rtl)) {
        @apply --layout-horizontal-reverse;
      }

      #tabsContainer {
        position: relative;
        height: 100%;
        white-space: nowrap;
        overflow: hidden;
        @apply --layout-flex-auto;
        @apply --paper-tabs-container;
      }

      #tabsContent {
        height: 100%;
        -moz-flex-basis: auto;
        -ms-flex-basis: auto;
        flex-basis: auto;
        @apply --paper-tabs-content;
      }

      #tabsContent.scrollable {
        position: absolute;
        white-space: nowrap;
      }

      #tabsContent:not(.scrollable),
      #tabsContent.scrollable.fit-container {
        @apply --layout-horizontal;
      }

      #tabsContent.scrollable.fit-container {
        min-width: 100%;
      }

      #tabsContent.scrollable.fit-container > ::slotted(*) {
        /* IE - prevent tabs from compressing when they should scroll. */
        -ms-flex: 1 0 auto;
        -webkit-flex: 1 0 auto;
        flex: 1 0 auto;
      }

      .hidden {
        display: none;
      }

      .not-visible {
        opacity: 0;
        cursor: default;
      }

      paper-icon-button {
        width: 48px;
        height: 48px;
        padding: 12px;
        margin: 0 4px;
      }

      #selectionBar {
        position: absolute;
        height: 0;
        bottom: 0;
        left: 0;
        right: 0;
        border-bottom: 2px solid var(--paper-tabs-selection-bar-color, var(--paper-yellow-a100));
          -webkit-transform: scale(0);
        transform: scale(0);
          -webkit-transform-origin: left center;
        transform-origin: left center;
          transition: -webkit-transform;
        transition: transform;

        @apply --paper-tabs-selection-bar;
      }

      #selectionBar.align-bottom {
        top: 0;
        bottom: auto;
      }

      #selectionBar.expand {
        transition-duration: 0.15s;
        transition-timing-function: cubic-bezier(0.4, 0.0, 1, 1);
      }

      #selectionBar.contract {
        transition-duration: 0.18s;
        transition-timing-function: cubic-bezier(0.0, 0.0, 0.2, 1);
      }

      #tabsContent > ::slotted(:not(#selectionBar)) {
        height: 100%;
      }
    </style>

    <paper-icon-button icon="paper-tabs:chevron-left" class\$="[[_computeScrollButtonClass(_leftHidden, scrollable, hideScrollButtons)]]" on-up="_onScrollButtonUp" on-down="_onLeftScrollButtonDown" tabindex="-1"></paper-icon-button>

    <div id="tabsContainer" on-track="_scroll" on-down="_down">
      <div id="tabsContent" class\$="[[_computeTabsContentClass(scrollable, fitContainer)]]">
        <div id="selectionBar" class\$="[[_computeSelectionBarClass(noBar, alignBottom)]]" on-transitionend="_onBarTransitionEnd"></div>
        <slot></slot>
      </div>
    </div>

    <paper-icon-button icon="paper-tabs:chevron-right" class\$="[[_computeScrollButtonClass(_rightHidden, scrollable, hideScrollButtons)]]" on-up="_onScrollButtonUp" on-down="_onRightScrollButtonDown" tabindex="-1"></paper-icon-button>
`,is:"paper-tabs",behaviors:[_anyApp.IronResizableBehavior,IronMenubarBehavior],properties:{noink:{type:Boolean,value:!1,observer:"_noinkChanged"},noBar:{type:Boolean,value:!1},noSlide:{type:Boolean,value:!1},scrollable:{type:Boolean,value:!1},fitContainer:{type:Boolean,value:!1},disableDrag:{type:Boolean,value:!1},hideScrollButtons:{type:Boolean,value:!1},alignBottom:{type:Boolean,value:!1},selectable:{type:String,value:"paper-tab"},autoselect:{type:Boolean,value:!1},autoselectDelay:{type:Number,value:0},_step:{type:Number,value:10},_holdDelay:{type:Number,value:1},_leftHidden:{type:Boolean,value:!1},_rightHidden:{type:Boolean,value:!1},_previousTab:{type:Object}},hostAttributes:{role:"tablist"},listeners:{"iron-resize":"_onTabSizingChanged","iron-items-changed":"_onTabSizingChanged","iron-select":"_onIronSelect","iron-deselect":"_onIronDeselect"},keyBindings:{"left:keyup right:keyup":"_onArrowKeyup"},created:function(){this._holdJob=null;this._pendingActivationItem=void 0;this._pendingActivationTimeout=void 0;this._bindDelayedActivationHandler=this._delayedActivationHandler.bind(this);this.addEventListener("blur",this._onBlurCapture.bind(this),!0)},ready:function(){this.setScrollDirection("y",this.$.tabsContainer)},detached:function(){this._cancelPendingActivation()},_noinkChanged:function(noink){var childTabs=(0,_anyApp.dom)(this).querySelectorAll("paper-tab");childTabs.forEach(noink?this._setNoinkAttribute:this._removeNoinkAttribute)},_setNoinkAttribute:function(element){element.setAttribute("noink","")},_removeNoinkAttribute:function(element){element.removeAttribute("noink")},_computeScrollButtonClass:function(hideThisButton,scrollable,hideScrollButtons){if(!scrollable||hideScrollButtons){return"hidden"}if(hideThisButton){return"not-visible"}return""},_computeTabsContentClass:function(scrollable,fitContainer){return scrollable?"scrollable"+(fitContainer?" fit-container":""):" fit-container"},_computeSelectionBarClass:function(noBar,alignBottom){if(noBar){return"hidden"}else if(alignBottom){return"align-bottom"}return""},_onTabSizingChanged:function(){this.debounce("_onTabSizingChanged",function(){this._scroll();this._tabChanged(this.selectedItem)},10)},_onIronSelect:function(event){this._tabChanged(event.detail.item,this._previousTab);this._previousTab=event.detail.item;this.cancelDebouncer("tab-changed")},_onIronDeselect:function(){this.debounce("tab-changed",function(){this._tabChanged(null,this._previousTab);this._previousTab=null},1)},_activateHandler:function(){this._cancelPendingActivation();_anyApp.IronMenuBehaviorImpl._activateHandler.apply(this,arguments)},_scheduleActivation:function(item,delay){this._pendingActivationItem=item;this._pendingActivationTimeout=this.async(this._bindDelayedActivationHandler,delay)},_delayedActivationHandler:function(){var item=this._pendingActivationItem;this._pendingActivationItem=void 0;this._pendingActivationTimeout=void 0;item.fire(this.activateEvent,null,{bubbles:!0,cancelable:!0})},_cancelPendingActivation:function(){if(this._pendingActivationTimeout!==void 0){this.cancelAsync(this._pendingActivationTimeout);this._pendingActivationItem=void 0;this._pendingActivationTimeout=void 0}},_onArrowKeyup:function(){if(this.autoselect){this._scheduleActivation(this.focusedItem,this.autoselectDelay)}},_onBlurCapture:function(event){if(event.target===this._pendingActivationItem){this._cancelPendingActivation()}},get _tabContainerScrollSize(){return Math.max(0,this.$.tabsContainer.scrollWidth-this.$.tabsContainer.offsetWidth)},_scroll:function(e,detail){if(!this.scrollable){return}var ddx=detail&&-detail.ddx||0;this._affectScroll(ddx)},_down:function(){this.async(function(){if(this._defaultFocusAsync){this.cancelAsync(this._defaultFocusAsync);this._defaultFocusAsync=null}},1)},_affectScroll:function(dx){this.$.tabsContainer.scrollLeft+=dx;var scrollLeft=this.$.tabsContainer.scrollLeft;this._leftHidden=0===scrollLeft;this._rightHidden=scrollLeft===this._tabContainerScrollSize},_onLeftScrollButtonDown:function(){this._scrollToLeft();this._holdJob=setInterval(this._scrollToLeft.bind(this),this._holdDelay)},_onRightScrollButtonDown:function(){this._scrollToRight();this._holdJob=setInterval(this._scrollToRight.bind(this),this._holdDelay)},_onScrollButtonUp:function(){clearInterval(this._holdJob);this._holdJob=null},_scrollToLeft:function(){this._affectScroll(-this._step)},_scrollToRight:function(){this._affectScroll(this._step)},_tabChanged:function(tab,old){if(!tab){this.$.selectionBar.classList.remove("expand");this.$.selectionBar.classList.remove("contract");this._positionBar(0,0);return}var r=this.$.tabsContent.getBoundingClientRect(),w=r.width,tabRect=tab.getBoundingClientRect(),tabOffsetLeft=tabRect.left-r.left;this._pos={width:this._calcPercent(tabRect.width,w),left:this._calcPercent(tabOffsetLeft,w)};if(this.noSlide||null==old){this.$.selectionBar.classList.remove("expand");this.$.selectionBar.classList.remove("contract");this._positionBar(this._pos.width,this._pos.left);return}var oldRect=old.getBoundingClientRect(),oldIndex=this.items.indexOf(old),index=this.items.indexOf(tab),m=5;this.$.selectionBar.classList.add("expand");var moveRight=oldIndex<index,isRTL=this._isRTL;if(isRTL){moveRight=!moveRight}if(moveRight){this._positionBar(this._calcPercent(tabRect.left+tabRect.width-oldRect.left,w)-m,this._left)}else{this._positionBar(this._calcPercent(oldRect.left+oldRect.width-tabRect.left,w)-m,this._calcPercent(tabOffsetLeft,w)+m)}if(this.scrollable){this._scrollToSelectedIfNeeded(tabRect.width,tabOffsetLeft)}},_scrollToSelectedIfNeeded:function(tabWidth,tabOffsetLeft){var l=tabOffsetLeft-this.$.tabsContainer.scrollLeft;if(0>l){this.$.tabsContainer.scrollLeft+=l}else{l+=tabWidth-this.$.tabsContainer.offsetWidth;if(0<l){this.$.tabsContainer.scrollLeft+=l}}},_calcPercent:function(w,w0){return 100*w/w0},_positionBar:function(width,left){width=width||0;left=left||0;this._width=width;this._left=left;this.transform("translateX("+left+"%) scaleX("+width/100+")",this.$.selectionBar)},_onBarTransitionEnd:function(){var cl=this.$.selectionBar.classList;if(cl.contains("expand")){cl.remove("expand");cl.add("contract");this._positionBar(this._pos.width,this._pos.left)}else if(cl.contains("contract")){cl.remove("contract")}}});const ContextMixin=BaseClass=>class extends BaseClass{static get is(){return"mx-context-element"}static get properties(){return{}}localize(a,b,c){return c}toggleWait(a){console.log(`spinner mode: ${a}`)}};_exports.ContextMixin=ContextMixin;_exports.$mxContextElement={ContextMixin:ContextMixin};class MxInspectorList extends ContextMixin(_anyApp.PolymerElement){static get is(){return"mx-inspector-list"}static get template(){return _anyApp.html`
${_anyApp.AnywhereStyles}
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
            <span class="icon" hidden$="[[isConnected]]">${_anyApp.disconnected}</span>
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
        `}static get properties(){return{connection:{type:String,value:function(){return navigator.onLine?"online":"offline"}},isConnected:{type:Boolean,computed:"_computeConnectionStatus(connection)"},dataSet:{type:Array,value:[],observer:"dataSetRefresh"},selectedTile:{type:Object,value:null},selectedTabName:{type:String,value:"",observer:"_filterList"},hasRecord:{type:Boolean,value:!1,readOnly:!0},noInspectionsFound:{type:String,value(){return"inspector_no_inspections_due"}},selectedInspections:{type:Array,value:[]}}}constructor(){super();this._boundListener=this.updateOnlineStatus.bind(this)}connectedCallback(){super.connectedCallback();window.addEventListener("online",this._boundListener);window.addEventListener("offline",this._boundListener)}disconnectedCallback(){super.disconnectedCallback();window.removeEventListener("online",this._boundListener);window.removeEventListener("offline",this._boundListener)}updateOnlineStatus(event){var condition=navigator.onLine?"online":"offline";this.set("connection",condition);console.log("Event: "+event.type+"; Status: "+condition)}_computeConnectionStatus(connected){return connected&&"online"===connected.toLowerCase()}dataSetRefresh(){var total;if(!this.dataSet){total=0}else{total=this.dataSet.length}var collectionTotal=!this.collectionSearchRef?0:!this.collectionSearchRef.totalCount?0:this.collectionSearchRef.totalCount;if(total&&total<collectionTotal){this._resultCounter=this.localize("uitext","mxapiinspresult","of_results",[total,collectionTotal])}else{this._resultCounter=this.localize("uitext","mxapibase","countresults",[total])}if(0===total){this._setHasRecord(!1)}else{this._setHasRecord(!0)}}tabTap(e){var name=e.currentTarget.getAttribute("name");this.selectTab(name)}selectTab(tabName){if(this.selectedTabName!==tabName){this.selectedTabName=tabName}else{this.dispatchEvent(new CustomEvent("fetch-inspresult"));this.dataSetRefresh()}}_loadExecution(idSet){this.dispatchEvent(new CustomEvent("load-inspection-set",{detail:{inspectionIds:idSet}}))}_loadChildren(inspResult){this.dispatchEvent(new CustomEvent("load-insp-children",{detail:{inspection:inspResult}}))}dataSetReset(){this.resetMultiSelection()}resetMultiSelection(){this.set("selectedInspections",[])}_filterList(tabName){this.toggleWait(!0);var queryName;switch(tabName){case"pending":queryName="INSPRESULTPENDING";this.noInspectionsFound=this.localize("uitext","mxapiinspresult","inspector_no_inspections_due");break;case"inprogress":queryName="INSPRESULTINPROGRESS";this.noInspectionsFound=this.localize("uitext","mxapiinspresult","inspector_no_inspections_due");break;case"completed":queryName="INSPRESULTCOMPLETE";this.noInspectionsFound=this.localize("uitext","mxapiinspresult","inspector_no_inspections_found");break;default:queryName="INSPRESULTALL";this.noInspectionsFound=this.localize("uitext","mxapiinspresult","inspector_no_inspections_found");}this.dispatchEvent(new CustomEvent("fetch-inspresult",{detail:{queryname:queryName}}));this.resetMultiSelection()}}window.customElements.define(MxInspectorList.is,MxInspectorList)});