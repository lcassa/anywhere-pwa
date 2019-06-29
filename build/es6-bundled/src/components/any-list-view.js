define(["exports","./any-app.js","./any-list-item.js"],function(_exports,_anyApp){"use strict";Object.defineProperty(_exports,"__esModule",{value:!0});_exports.elementIsScrollLocked=elementIsScrollLocked;_exports.pushScrollLock=pushScrollLock;_exports.removeScrollLock=removeScrollLock;_exports._hasCachedLockedElement=_hasCachedLockedElement;_exports._hasCachedUnlockedElement=_hasCachedUnlockedElement;_exports._composedTreeContains=_composedTreeContains;_exports._scrollInteractionHandler=_scrollInteractionHandler;_exports._lockScrollInteractions=_lockScrollInteractions;_exports._unlockScrollInteractions=_unlockScrollInteractions;_exports._shouldPreventScrolling=_shouldPreventScrolling;_exports._getScrollableNodes=_getScrollableNodes;_exports._getScrollingNode=_getScrollingNode;_exports._getScrollInfo=_getScrollInfo;_exports.PaperSpinnerBehavior=_exports.PaperMenuButton=_exports.PaperItemBehavior=_exports.PaperItemBehaviorImpl=_exports.PaperDialogBehavior=_exports.PaperDialogBehaviorImpl=_exports.PaperCheckedElementBehavior=_exports.PaperCheckedElementBehaviorImpl=_exports.NeonAnimationRunnerBehavior=_exports.NeonAnimationRunnerBehaviorImpl=_exports.NeonAnimationBehavior=_exports.NeonAnimatableBehavior=_exports._boundScrollHandler=_exports._unlockedElementCache=_exports._lockedElementCache=_exports._lockingElements=_exports.currentLockingElement=_exports.IronOverlayManager=_exports.IronOverlayManagerClass=_exports.IronOverlayBehavior=_exports.IronOverlayBehaviorImpl=_exports.IronFocusablesHelper=_exports.IronFitBehavior=_exports.IronCheckedElementBehavior=_exports.IronCheckedElementBehaviorImpl=_exports.$paperSpinnerBehavior=_exports.$paperMenuButton=_exports.$paperItemBehavior=_exports.$paperDialogBehavior=_exports.$paperCheckedElementBehavior=_exports.$neonAnimationRunnerBehavior=_exports.$neonAnimationBehavior=_exports.$neonAnimatableBehavior=_exports.IronDropdownScrollManager=_exports.$ironScrollManager=_exports.$ironOverlayManager=_exports.$ironOverlayBehavior=_exports.$ironFocusablesHelper=_exports.$ironFitBehavior=_exports.$ironDropdownScrollManager=_exports.$ironCheckedElementBehavior=void 0;var _Mathfloor=Math.floor,_Mathround=Math.round,_Mathceil=Math.ceil,_Mathmax=Math.max,_Mathmin=Math.min,_Mathabs=Math.abs;const IronCheckedElementBehaviorImpl={properties:{checked:{type:Boolean,value:!1,reflectToAttribute:!0,notify:!0,observer:"_checkedChanged"},toggles:{type:Boolean,value:!0,reflectToAttribute:!0},value:{type:String,value:"on",observer:"_valueChanged"}},observers:["_requiredChanged(required)"],created:function(){this._hasIronCheckedElementBehavior=!0},_getValidity:function(){return this.disabled||!this.required||this.checked},_requiredChanged:function(){if(this.required){this.setAttribute("aria-required","true")}else{this.removeAttribute("aria-required")}},_checkedChanged:function(){this.active=this.checked;this.fire("iron-change")},_valueChanged:function(){if(this.value===void 0||null===this.value){this.value="on"}}};_exports.IronCheckedElementBehaviorImpl=IronCheckedElementBehaviorImpl;const IronCheckedElementBehavior=[_anyApp.IronFormElementBehavior,_anyApp.IronValidatableBehavior,IronCheckedElementBehaviorImpl];_exports.IronCheckedElementBehavior=IronCheckedElementBehavior;_exports.$ironCheckedElementBehavior={IronCheckedElementBehaviorImpl:IronCheckedElementBehaviorImpl,IronCheckedElementBehavior:IronCheckedElementBehavior};var lastTouchPosition={pageX:0,pageY:0},lastRootTarget=null,lastScrollableNodes=[],scrollEvents=["wheel","mousewheel","DOMMouseScroll","touchstart","touchmove"],_boundScrollHandler;_exports._boundScrollHandler=_boundScrollHandler;var currentLockingElement;_exports.currentLockingElement=currentLockingElement;function elementIsScrollLocked(element){var lockingElement=currentLockingElement;if(lockingElement===void 0){return!1}var scrollLocked;if(_hasCachedLockedElement(element)){return!0}if(_hasCachedUnlockedElement(element)){return!1}scrollLocked=!!lockingElement&&lockingElement!==element&&!_composedTreeContains(lockingElement,element);if(scrollLocked){_lockedElementCache.push(element)}else{_unlockedElementCache.push(element)}return scrollLocked}function pushScrollLock(element){if(0<=_lockingElements.indexOf(element)){return}if(0===_lockingElements.length){_lockScrollInteractions()}_lockingElements.push(element);_exports.currentLockingElement=currentLockingElement=_lockingElements[_lockingElements.length-1];_exports._lockedElementCache=_lockedElementCache=[];_exports._unlockedElementCache=_unlockedElementCache=[]}function removeScrollLock(element){var index=_lockingElements.indexOf(element);if(-1===index){return}_lockingElements.splice(index,1);_exports.currentLockingElement=currentLockingElement=_lockingElements[_lockingElements.length-1];_exports._lockedElementCache=_lockedElementCache=[];_exports._unlockedElementCache=_unlockedElementCache=[];if(0===_lockingElements.length){_unlockScrollInteractions()}}const _lockingElements=[];_exports._lockingElements=_lockingElements;let _lockedElementCache=null;_exports._lockedElementCache=_lockedElementCache;let _unlockedElementCache=null;_exports._unlockedElementCache=_unlockedElementCache;function _hasCachedLockedElement(element){return-1<_lockedElementCache.indexOf(element)}function _hasCachedUnlockedElement(element){return-1<_unlockedElementCache.indexOf(element)}function _composedTreeContains(element,child){var contentElements,distributedNodes,contentIndex,nodeIndex;if(element.contains(child)){return!0}contentElements=(0,_anyApp.dom)(element).querySelectorAll("content,slot");for(contentIndex=0;contentIndex<contentElements.length;++contentIndex){distributedNodes=(0,_anyApp.dom)(contentElements[contentIndex]).getDistributedNodes();for(nodeIndex=0;nodeIndex<distributedNodes.length;++nodeIndex){if(distributedNodes[nodeIndex].nodeType!==Node.ELEMENT_NODE)continue;if(_composedTreeContains(distributedNodes[nodeIndex],child)){return!0}}}return!1}function _scrollInteractionHandler(event){if(event.cancelable&&_shouldPreventScrolling(event)){event.preventDefault()}if(event.targetTouches){var touch=event.targetTouches[0];lastTouchPosition.pageX=touch.pageX;lastTouchPosition.pageY=touch.pageY}}function _lockScrollInteractions(){_exports._boundScrollHandler=_boundScrollHandler=_boundScrollHandler||_scrollInteractionHandler.bind(void 0);for(var i=0,l=scrollEvents.length;i<l;i++){document.addEventListener(scrollEvents[i],_boundScrollHandler,{capture:!0,passive:!1})}}function _unlockScrollInteractions(){for(var i=0,l=scrollEvents.length;i<l;i++){document.removeEventListener(scrollEvents[i],_boundScrollHandler,{capture:!0,passive:!1})}}function _shouldPreventScrolling(event){var target=(0,_anyApp.dom)(event).rootTarget;if("touchmove"!==event.type&&lastRootTarget!==target){lastRootTarget=target;lastScrollableNodes=_getScrollableNodes((0,_anyApp.dom)(event).path)}if(!lastScrollableNodes.length){return!0}if("touchstart"===event.type){return!1}var info=_getScrollInfo(event);return!_getScrollingNode(lastScrollableNodes,info.deltaX,info.deltaY)}function _getScrollableNodes(nodes){for(var scrollables=[],lockingIndex=nodes.indexOf(currentLockingElement),i=0;i<=lockingIndex;i++){if(nodes[i].nodeType!==Node.ELEMENT_NODE){continue}var node=nodes[i],style=node.style;if("scroll"!==style.overflow&&"auto"!==style.overflow){style=window.getComputedStyle(node)}if("scroll"===style.overflow||"auto"===style.overflow){scrollables.push(node)}}return scrollables}function _getScrollingNode(nodes,deltaX,deltaY){if(!deltaX&&!deltaY){return}for(var verticalScroll=_Mathabs(deltaY)>=_Mathabs(deltaX),i=0;i<nodes.length;i++){var node=nodes[i],canScroll=!1;if(verticalScroll){canScroll=0>deltaY?0<node.scrollTop:node.scrollTop<node.scrollHeight-node.clientHeight}else{canScroll=0>deltaX?0<node.scrollLeft:node.scrollLeft<node.scrollWidth-node.clientWidth}if(canScroll){return node}}}function _getScrollInfo(event){var info={deltaX:event.deltaX,deltaY:event.deltaY};if("deltaX"in event){}else if("wheelDeltaX"in event&&"wheelDeltaY"in event){info.deltaX=-event.wheelDeltaX;info.deltaY=-event.wheelDeltaY}else if("wheelDelta"in event){info.deltaX=0;info.deltaY=-event.wheelDelta}else if("axis"in event){info.deltaX=1===event.axis?event.detail:0;info.deltaY=2===event.axis?event.detail:0}else if(event.targetTouches){var touch=event.targetTouches[0];info.deltaX=lastTouchPosition.pageX-touch.pageX;info.deltaY=lastTouchPosition.pageY-touch.pageY}return info}var ironScrollManager={get currentLockingElement(){return currentLockingElement},elementIsScrollLocked:elementIsScrollLocked,pushScrollLock:pushScrollLock,removeScrollLock:removeScrollLock,_lockingElements:_lockingElements,get _lockedElementCache(){return _lockedElementCache},get _unlockedElementCache(){return _unlockedElementCache},_hasCachedLockedElement:_hasCachedLockedElement,_hasCachedUnlockedElement:_hasCachedUnlockedElement,_composedTreeContains:_composedTreeContains,_scrollInteractionHandler:_scrollInteractionHandler,get _boundScrollHandler(){return _boundScrollHandler},_lockScrollInteractions:_lockScrollInteractions,_unlockScrollInteractions:_unlockScrollInteractions,_shouldPreventScrolling:_shouldPreventScrolling,_getScrollableNodes:_getScrollableNodes,_getScrollingNode:_getScrollingNode,_getScrollInfo:_getScrollInfo};_exports.IronDropdownScrollManager=_exports.$ironScrollManager=ironScrollManager;_exports.$ironDropdownScrollManager={IronDropdownScrollManager:ironScrollManager};const IronFitBehavior={properties:{sizingTarget:{type:Object,value:function(){return this}},fitInto:{type:Object,value:window},noOverlap:{type:Boolean},positionTarget:{type:Element},horizontalAlign:{type:String},verticalAlign:{type:String},dynamicAlign:{type:Boolean},horizontalOffset:{type:Number,value:0,notify:!0},verticalOffset:{type:Number,value:0,notify:!0},autoFitOnAttach:{type:Boolean,value:!1},_fitInfo:{type:Object}},get _fitWidth(){var fitWidth;if(this.fitInto===window){fitWidth=this.fitInto.innerWidth}else{fitWidth=this.fitInto.getBoundingClientRect().width}return fitWidth},get _fitHeight(){var fitHeight;if(this.fitInto===window){fitHeight=this.fitInto.innerHeight}else{fitHeight=this.fitInto.getBoundingClientRect().height}return fitHeight},get _fitLeft(){var fitLeft;if(this.fitInto===window){fitLeft=0}else{fitLeft=this.fitInto.getBoundingClientRect().left}return fitLeft},get _fitTop(){var fitTop;if(this.fitInto===window){fitTop=0}else{fitTop=this.fitInto.getBoundingClientRect().top}return fitTop},get _defaultPositionTarget(){var parent=(0,_anyApp.dom)(this).parentNode;if(parent&&parent.nodeType===Node.DOCUMENT_FRAGMENT_NODE){parent=parent.host}return parent},get _localeHorizontalAlign(){if(this._isRTL){if("right"===this.horizontalAlign){return"left"}if("left"===this.horizontalAlign){return"right"}}return this.horizontalAlign},get __shouldPosition(){return(this.horizontalAlign||this.verticalAlign)&&this.positionTarget},attached:function(){if("undefined"===typeof this._isRTL){this._isRTL="rtl"==window.getComputedStyle(this).direction}this.positionTarget=this.positionTarget||this._defaultPositionTarget;if(this.autoFitOnAttach){if("none"===window.getComputedStyle(this).display){setTimeout(function(){this.fit()}.bind(this))}else{window.ShadyDOM&&ShadyDOM.flush();this.fit()}}},detached:function(){if(this.__deferredFit){clearTimeout(this.__deferredFit);this.__deferredFit=null}},fit:function(){this.position();this.constrain();this.center()},_discoverInfo:function(){if(this._fitInfo){return}var target=window.getComputedStyle(this),sizer=window.getComputedStyle(this.sizingTarget);this._fitInfo={inlineStyle:{top:this.style.top||"",left:this.style.left||"",position:this.style.position||""},sizerInlineStyle:{maxWidth:this.sizingTarget.style.maxWidth||"",maxHeight:this.sizingTarget.style.maxHeight||"",boxSizing:this.sizingTarget.style.boxSizing||""},positionedBy:{vertically:"auto"!==target.top?"top":"auto"!==target.bottom?"bottom":null,horizontally:"auto"!==target.left?"left":"auto"!==target.right?"right":null},sizedBy:{height:"none"!==sizer.maxHeight,width:"none"!==sizer.maxWidth,minWidth:parseInt(sizer.minWidth,10)||0,minHeight:parseInt(sizer.minHeight,10)||0},margin:{top:parseInt(target.marginTop,10)||0,right:parseInt(target.marginRight,10)||0,bottom:parseInt(target.marginBottom,10)||0,left:parseInt(target.marginLeft,10)||0}}},resetFit:function(){var info=this._fitInfo||{};for(var property in info.sizerInlineStyle){this.sizingTarget.style[property]=info.sizerInlineStyle[property]}for(var property in info.inlineStyle){this.style[property]=info.inlineStyle[property]}this._fitInfo=null},refit:function(){var scrollLeft=this.sizingTarget.scrollLeft,scrollTop=this.sizingTarget.scrollTop;this.resetFit();this.fit();this.sizingTarget.scrollLeft=scrollLeft;this.sizingTarget.scrollTop=scrollTop},position:function(){if(!this.__shouldPosition){return}this._discoverInfo();this.style.position="fixed";this.sizingTarget.style.boxSizing="border-box";this.style.left="0px";this.style.top="0px";var rect=this.getBoundingClientRect(),positionRect=this.__getNormalizedRect(this.positionTarget),fitRect=this.__getNormalizedRect(this.fitInto),margin=this._fitInfo.margin,size={width:rect.width+margin.left+margin.right,height:rect.height+margin.top+margin.bottom},position=this.__getPosition(this._localeHorizontalAlign,this.verticalAlign,size,rect,positionRect,fitRect),left=position.left+margin.left,top=position.top+margin.top,right=_Mathmin(fitRect.right-margin.right,left+rect.width),bottom=_Mathmin(fitRect.bottom-margin.bottom,top+rect.height);left=_Mathmax(fitRect.left+margin.left,_Mathmin(left,right-this._fitInfo.sizedBy.minWidth));top=_Mathmax(fitRect.top+margin.top,_Mathmin(top,bottom-this._fitInfo.sizedBy.minHeight));this.sizingTarget.style.maxWidth=_Mathmax(right-left,this._fitInfo.sizedBy.minWidth)+"px";this.sizingTarget.style.maxHeight=_Mathmax(bottom-top,this._fitInfo.sizedBy.minHeight)+"px";this.style.left=left-rect.left+"px";this.style.top=top-rect.top+"px"},constrain:function(){if(this.__shouldPosition){return}this._discoverInfo();var info=this._fitInfo;if(!info.positionedBy.vertically){this.style.position="fixed";this.style.top="0px"}if(!info.positionedBy.horizontally){this.style.position="fixed";this.style.left="0px"}this.sizingTarget.style.boxSizing="border-box";var rect=this.getBoundingClientRect();if(!info.sizedBy.height){this.__sizeDimension(rect,info.positionedBy.vertically,"top","bottom","Height")}if(!info.sizedBy.width){this.__sizeDimension(rect,info.positionedBy.horizontally,"left","right","Width")}},_sizeDimension:function(rect,positionedBy,start,end,extent){this.__sizeDimension(rect,positionedBy,start,end,extent)},__sizeDimension:function(rect,positionedBy,start,end,extent){var info=this._fitInfo,fitRect=this.__getNormalizedRect(this.fitInto),max="Width"===extent?fitRect.width:fitRect.height,flip=positionedBy===end,offset=flip?max-rect[end]:rect[start],margin=info.margin[flip?start:end],offsetExtent="offset"+extent,sizingOffset=this[offsetExtent]-this.sizingTarget[offsetExtent];this.sizingTarget.style["max"+extent]=max-margin-offset-sizingOffset+"px"},center:function(){if(this.__shouldPosition){return}this._discoverInfo();var positionedBy=this._fitInfo.positionedBy;if(positionedBy.vertically&&positionedBy.horizontally){return}this.style.position="fixed";if(!positionedBy.vertically){this.style.top="0px"}if(!positionedBy.horizontally){this.style.left="0px"}var rect=this.getBoundingClientRect(),fitRect=this.__getNormalizedRect(this.fitInto);if(!positionedBy.vertically){var top=fitRect.top-rect.top+(fitRect.height-rect.height)/2;this.style.top=top+"px"}if(!positionedBy.horizontally){var left=fitRect.left-rect.left+(fitRect.width-rect.width)/2;this.style.left=left+"px"}},__getNormalizedRect:function(target){if(target===document.documentElement||target===window){return{top:0,left:0,width:window.innerWidth,height:window.innerHeight,right:window.innerWidth,bottom:window.innerHeight}}return target.getBoundingClientRect()},__getOffscreenArea:function(position,size,fitRect){var verticalCrop=_Mathmin(0,position.top)+_Mathmin(0,fitRect.bottom-(position.top+size.height)),horizontalCrop=_Mathmin(0,position.left)+_Mathmin(0,fitRect.right-(position.left+size.width));return _Mathabs(verticalCrop)*size.width+_Mathabs(horizontalCrop)*size.height},__getPosition:function(hAlign,vAlign,size,sizeNoMargins,positionRect,fitRect){var positions=[{verticalAlign:"top",horizontalAlign:"left",top:positionRect.top+this.verticalOffset,left:positionRect.left+this.horizontalOffset},{verticalAlign:"top",horizontalAlign:"right",top:positionRect.top+this.verticalOffset,left:positionRect.right-size.width-this.horizontalOffset},{verticalAlign:"bottom",horizontalAlign:"left",top:positionRect.bottom-size.height-this.verticalOffset,left:positionRect.left+this.horizontalOffset},{verticalAlign:"bottom",horizontalAlign:"right",top:positionRect.bottom-size.height-this.verticalOffset,left:positionRect.right-size.width-this.horizontalOffset}];if(this.noOverlap){for(var i=0,l=positions.length,copy;i<l;i++){copy={};for(var key in positions[i]){copy[key]=positions[i][key]}positions.push(copy)}positions[0].top=positions[1].top+=positionRect.height;positions[2].top=positions[3].top-=positionRect.height;positions[4].left=positions[6].left+=positionRect.width;positions[5].left=positions[7].left-=positionRect.width}vAlign="auto"===vAlign?null:vAlign;hAlign="auto"===hAlign?null:hAlign;if(!hAlign||"center"===hAlign){positions.push({verticalAlign:"top",horizontalAlign:"center",top:positionRect.top+this.verticalOffset+(this.noOverlap?positionRect.height:0),left:positionRect.left-sizeNoMargins.width/2+positionRect.width/2+this.horizontalOffset});positions.push({verticalAlign:"bottom",horizontalAlign:"center",top:positionRect.bottom-size.height-this.verticalOffset-(this.noOverlap?positionRect.height:0),left:positionRect.left-sizeNoMargins.width/2+positionRect.width/2+this.horizontalOffset})}if(!vAlign||"middle"===vAlign){positions.push({verticalAlign:"middle",horizontalAlign:"left",top:positionRect.top-sizeNoMargins.height/2+positionRect.height/2+this.verticalOffset,left:positionRect.left+this.horizontalOffset+(this.noOverlap?positionRect.width:0)});positions.push({verticalAlign:"middle",horizontalAlign:"right",top:positionRect.top-sizeNoMargins.height/2+positionRect.height/2+this.verticalOffset,left:positionRect.right-size.width-this.horizontalOffset-(this.noOverlap?positionRect.width:0)})}if("middle"===vAlign&&"center"===hAlign){positions.push({verticalAlign:"middle",horizontalAlign:"center",top:positionRect.top-sizeNoMargins.height/2+positionRect.height/2+this.verticalOffset,left:positionRect.left-sizeNoMargins.width/2+positionRect.width/2+this.horizontalOffset})}for(var position,i=0;i<positions.length;i++){var candidate=positions[i],vAlignOk=candidate.verticalAlign===vAlign,hAlignOk=candidate.horizontalAlign===hAlign;if(!this.dynamicAlign&&!this.noOverlap&&vAlignOk&&hAlignOk){position=candidate;break}var alignOk=(!vAlign||vAlignOk)&&(!hAlign||hAlignOk);if(!this.dynamicAlign&&!alignOk){continue}candidate.offscreenArea=this.__getOffscreenArea(candidate,size,fitRect);if(0===candidate.offscreenArea&&alignOk){position=candidate;break}position=position||candidate;var diff=candidate.offscreenArea-position.offscreenArea;if(0>diff||0===diff&&(vAlignOk||hAlignOk)){position=candidate}}return position}};_exports.IronFitBehavior=IronFitBehavior;_exports.$ironFitBehavior={IronFitBehavior:IronFitBehavior};(0,_anyApp.Polymer)({_template:_anyApp.html$1`
    <style>
      :host {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: var(--iron-overlay-backdrop-background-color, #000);
        opacity: 0;
        transition: opacity 0.2s;
        pointer-events: none;
        @apply --iron-overlay-backdrop;
      }

      :host(.opened) {
        opacity: var(--iron-overlay-backdrop-opacity, 0.6);
        pointer-events: auto;
        @apply --iron-overlay-backdrop-opened;
      }
    </style>

    <slot></slot>
`,is:"iron-overlay-backdrop",properties:{opened:{reflectToAttribute:!0,type:Boolean,value:!1,observer:"_openedChanged"}},listeners:{transitionend:"_onTransitionend"},created:function(){this.__openedRaf=null},attached:function(){this.opened&&this._openedChanged(this.opened)},prepare:function(){if(this.opened&&!this.parentNode){(0,_anyApp.dom)(document.body).appendChild(this)}},open:function(){this.opened=!0},close:function(){this.opened=!1},complete:function(){if(!this.opened&&this.parentNode===document.body){(0,_anyApp.dom)(this.parentNode).removeChild(this)}},_onTransitionend:function(event){if(event&&event.target===this){this.complete()}},_openedChanged:function(opened){if(opened){this.prepare()}else{var cs=window.getComputedStyle(this);if("0s"===cs.transitionDuration||0==cs.opacity){this.complete()}}if(!this.isAttached){return}if(this.__openedRaf){window.cancelAnimationFrame(this.__openedRaf);this.__openedRaf=null}this.scrollTop=this.scrollTop;this.__openedRaf=window.requestAnimationFrame(function(){this.__openedRaf=null;this.toggleClass("opened",this.opened)}.bind(this))}});const IronOverlayManagerClass=function(){this._overlays=[];this._minimumZ=101;this._backdropElement=null;(0,_anyApp.add)(document.documentElement,"tap",function(){});document.addEventListener("tap",this._onCaptureClick.bind(this),!0);document.addEventListener("focus",this._onCaptureFocus.bind(this),!0);document.addEventListener("keydown",this._onCaptureKeyDown.bind(this),!0)};_exports.IronOverlayManagerClass=IronOverlayManagerClass;IronOverlayManagerClass.prototype={constructor:IronOverlayManagerClass,get backdropElement(){if(!this._backdropElement){this._backdropElement=document.createElement("iron-overlay-backdrop")}return this._backdropElement},get deepActiveElement(){var active=document.activeElement;if(!active||!1===active instanceof Element){active=document.body}while(active.root&&(0,_anyApp.dom)(active.root).activeElement){active=(0,_anyApp.dom)(active.root).activeElement}return active},_bringOverlayAtIndexToFront:function(i){var overlay=this._overlays[i];if(!overlay){return}var lastI=this._overlays.length-1,currentOverlay=this._overlays[lastI];if(currentOverlay&&this._shouldBeBehindOverlay(overlay,currentOverlay)){lastI--}if(i>=lastI){return}var minimumZ=_Mathmax(this.currentOverlayZ(),this._minimumZ);if(this._getZ(overlay)<=minimumZ){this._applyOverlayZ(overlay,minimumZ)}while(i<lastI){this._overlays[i]=this._overlays[i+1];i++}this._overlays[lastI]=overlay},addOrRemoveOverlay:function(overlay){if(overlay.opened){this.addOverlay(overlay)}else{this.removeOverlay(overlay)}},addOverlay:function(overlay){var i=this._overlays.indexOf(overlay);if(0<=i){this._bringOverlayAtIndexToFront(i);this.trackBackdrop();return}var insertionIndex=this._overlays.length,currentOverlay=this._overlays[insertionIndex-1],minimumZ=_Mathmax(this._getZ(currentOverlay),this._minimumZ),newZ=this._getZ(overlay);if(currentOverlay&&this._shouldBeBehindOverlay(overlay,currentOverlay)){this._applyOverlayZ(currentOverlay,minimumZ);insertionIndex--;var previousOverlay=this._overlays[insertionIndex-1];minimumZ=_Mathmax(this._getZ(previousOverlay),this._minimumZ)}if(newZ<=minimumZ){this._applyOverlayZ(overlay,minimumZ)}this._overlays.splice(insertionIndex,0,overlay);this.trackBackdrop()},removeOverlay:function(overlay){var i=this._overlays.indexOf(overlay);if(-1===i){return}this._overlays.splice(i,1);this.trackBackdrop()},currentOverlay:function(){var i=this._overlays.length-1;return this._overlays[i]},currentOverlayZ:function(){return this._getZ(this.currentOverlay())},ensureMinimumZ:function(minimumZ){this._minimumZ=_Mathmax(this._minimumZ,minimumZ)},focusOverlay:function(){var current=this.currentOverlay();if(current){current._applyFocus()}},trackBackdrop:function(){var overlay=this._overlayWithBackdrop();if(!overlay&&!this._backdropElement){return}this.backdropElement.style.zIndex=this._getZ(overlay)-1;this.backdropElement.opened=!!overlay;this.backdropElement.prepare()},getBackdrops:function(){for(var backdrops=[],i=0;i<this._overlays.length;i++){if(this._overlays[i].withBackdrop){backdrops.push(this._overlays[i])}}return backdrops},backdropZ:function(){return this._getZ(this._overlayWithBackdrop())-1},_overlayWithBackdrop:function(){for(var i=this._overlays.length-1;0<=i;i--){if(this._overlays[i].withBackdrop){return this._overlays[i]}}},_getZ:function(overlay){var z=this._minimumZ;if(overlay){var z1=+(overlay.style.zIndex||window.getComputedStyle(overlay).zIndex);if(z1===z1){z=z1}}return z},_setZ:function(element,z){element.style.zIndex=z},_applyOverlayZ:function(overlay,aboveZ){this._setZ(overlay,aboveZ+2)},_overlayInPath:function(path){path=path||[];for(var i=0;i<path.length;i++){if(path[i]._manager===this){return path[i]}}},_onCaptureClick:function(event){var i=this._overlays.length-1;if(-1===i)return;var path=(0,_anyApp.dom)(event).path,overlay;while((overlay=this._overlays[i])&&this._overlayInPath(path)!==overlay){overlay._onCaptureClick(event);if(overlay.allowClickThrough){i--}else{break}}},_onCaptureFocus:function(event){var overlay=this.currentOverlay();if(overlay){overlay._onCaptureFocus(event)}},_onCaptureKeyDown:function(event){var overlay=this.currentOverlay();if(overlay){if(_anyApp.IronA11yKeysBehavior.keyboardEventMatchesKeys(event,"esc")){overlay._onCaptureEsc(event)}else if(_anyApp.IronA11yKeysBehavior.keyboardEventMatchesKeys(event,"tab")){overlay._onCaptureTab(event)}}},_shouldBeBehindOverlay:function(overlay1,overlay2){return!overlay1.alwaysOnTop&&overlay2.alwaysOnTop}};const IronOverlayManager=new IronOverlayManagerClass;_exports.IronOverlayManager=IronOverlayManager;_exports.$ironOverlayManager={IronOverlayManagerClass:IronOverlayManagerClass,IronOverlayManager:IronOverlayManager};var p=Element.prototype,matches$1=p.matches||p.matchesSelector||p.mozMatchesSelector||p.msMatchesSelector||p.oMatchesSelector||p.webkitMatchesSelector;const IronFocusablesHelper={getTabbableNodes:function(node){var result=[],needsSortByTabIndex=this._collectTabbableNodes(node,result);if(needsSortByTabIndex){return this._sortByTabIndex(result)}return result},isFocusable:function(element){if(matches$1.call(element,"input, select, textarea, button, object")){return matches$1.call(element,":not([disabled])")}return matches$1.call(element,"a[href], area[href], iframe, [tabindex], [contentEditable]")},isTabbable:function(element){return this.isFocusable(element)&&matches$1.call(element,":not([tabindex=\"-1\"])")&&this._isVisible(element)},_normalizedTabIndex:function(element){if(this.isFocusable(element)){var tabIndex=element.getAttribute("tabindex")||0;return+tabIndex}return-1},_collectTabbableNodes:function(node,result){if(node.nodeType!==Node.ELEMENT_NODE||!this._isVisible(node)){return!1}var element=node,tabIndex=this._normalizedTabIndex(element),needsSort=0<tabIndex;if(0<=tabIndex){result.push(element)}var children;if("content"===element.localName||"slot"===element.localName){children=(0,_anyApp.dom)(element).getDistributedNodes()}else{children=(0,_anyApp.dom)(element.root||element).children}for(var i=0;i<children.length;i++){needsSort=this._collectTabbableNodes(children[i],result)||needsSort}return needsSort},_isVisible:function(element){var style=element.style;if("hidden"!==style.visibility&&"none"!==style.display){style=window.getComputedStyle(element);return"hidden"!==style.visibility&&"none"!==style.display}return!1},_sortByTabIndex:function(tabbables){var len=tabbables.length;if(2>len){return tabbables}var pivot=_Mathceil(len/2),left=this._sortByTabIndex(tabbables.slice(0,pivot)),right=this._sortByTabIndex(tabbables.slice(pivot));return this._mergeSortByTabIndex(left,right)},_mergeSortByTabIndex:function(left,right){var result=[];while(0<left.length&&0<right.length){if(this._hasLowerTabOrder(left[0],right[0])){result.push(right.shift())}else{result.push(left.shift())}}return result.concat(left,right)},_hasLowerTabOrder:function(a,b){var ati=_Mathmax(a.tabIndex,0),bti=_Mathmax(b.tabIndex,0);return 0===ati||0===bti?bti>ati:ati>bti}};_exports.IronFocusablesHelper=IronFocusablesHelper;_exports.$ironFocusablesHelper={IronFocusablesHelper:IronFocusablesHelper};const IronOverlayBehaviorImpl={properties:{opened:{observer:"_openedChanged",type:Boolean,value:!1,notify:!0},canceled:{observer:"_canceledChanged",readOnly:!0,type:Boolean,value:!1},withBackdrop:{observer:"_withBackdropChanged",type:Boolean},noAutoFocus:{type:Boolean,value:!1},noCancelOnEscKey:{type:Boolean,value:!1},noCancelOnOutsideClick:{type:Boolean,value:!1},closingReason:{type:Object},restoreFocusOnClose:{type:Boolean,value:!1},allowClickThrough:{type:Boolean},alwaysOnTop:{type:Boolean},scrollAction:{type:String},_manager:{type:Object,value:IronOverlayManager},_focusedChild:{type:Object}},listeners:{"iron-resize":"_onIronResize"},observers:["__updateScrollObservers(isAttached, opened, scrollAction)"],get backdropElement(){return this._manager.backdropElement},get _focusNode(){return this._focusedChild||(0,_anyApp.dom)(this).querySelector("[autofocus]")||this},get _focusableNodes(){return IronFocusablesHelper.getTabbableNodes(this)},ready:function(){this.__isAnimating=!1;this.__shouldRemoveTabIndex=!1;this.__firstFocusableNode=this.__lastFocusableNode=null;this.__rafs={};this.__restoreFocusNode=null;this.__scrollTop=this.__scrollLeft=null;this.__onCaptureScroll=this.__onCaptureScroll.bind(this);this.__rootNodes=null;this._ensureSetup()},attached:function(){if(this.opened){this._openedChanged(this.opened)}this._observer=(0,_anyApp.dom)(this).observeNodes(this._onNodesChange)},detached:function(){(0,_anyApp.dom)(this).unobserveNodes(this._observer);this._observer=null;for(var cb in this.__rafs){if(null!==this.__rafs[cb]){cancelAnimationFrame(this.__rafs[cb])}}this.__rafs={};this._manager.removeOverlay(this);if(this.__isAnimating){if(this.opened){this._finishRenderOpened()}else{this._applyFocus();this._finishRenderClosed()}}},toggle:function(){this._setCanceled(!1);this.opened=!this.opened},open:function(){this._setCanceled(!1);this.opened=!0},close:function(){this._setCanceled(!1);this.opened=!1},cancel:function(event){var cancelEvent=this.fire("iron-overlay-canceled",event,{cancelable:!0});if(cancelEvent.defaultPrevented){return}this._setCanceled(!0);this.opened=!1},invalidateTabbables:function(){this.__firstFocusableNode=this.__lastFocusableNode=null},_ensureSetup:function(){if(this._overlaySetup){return}this._overlaySetup=!0;this.style.outline="none";this.style.display="none"},_openedChanged:function(opened){if(opened){this.removeAttribute("aria-hidden")}else{this.setAttribute("aria-hidden","true")}if(!this.isAttached){return}this.__isAnimating=!0;this.__deraf("__openedChanged",this.__openedChanged)},_canceledChanged:function(){this.closingReason=this.closingReason||{};this.closingReason.canceled=this.canceled},_withBackdropChanged:function(){if(this.withBackdrop&&!this.hasAttribute("tabindex")){this.setAttribute("tabindex","-1");this.__shouldRemoveTabIndex=!0}else if(this.__shouldRemoveTabIndex){this.removeAttribute("tabindex");this.__shouldRemoveTabIndex=!1}if(this.opened&&this.isAttached){this._manager.trackBackdrop()}},_prepareRenderOpened:function(){this.__restoreFocusNode=this._manager.deepActiveElement;this._preparePositioning();this.refit();this._finishPositioning();if(this.noAutoFocus&&document.activeElement===this._focusNode){this._focusNode.blur();this.__restoreFocusNode.focus()}},_renderOpened:function(){this._finishRenderOpened()},_renderClosed:function(){this._finishRenderClosed()},_finishRenderOpened:function(){this.notifyResize();this.__isAnimating=!1;this.fire("iron-overlay-opened")},_finishRenderClosed:function(){this.style.display="none";this.style.zIndex="";this.notifyResize();this.__isAnimating=!1;this.fire("iron-overlay-closed",this.closingReason)},_preparePositioning:function(){this.style.transition=this.style.webkitTransition="none";this.style.transform=this.style.webkitTransform="none";this.style.display=""},_finishPositioning:function(){this.style.display="none";this.scrollTop=this.scrollTop;this.style.transition=this.style.webkitTransition="";this.style.transform=this.style.webkitTransform="";this.style.display="";this.scrollTop=this.scrollTop},_applyFocus:function(){if(this.opened){if(!this.noAutoFocus){this._focusNode.focus()}}else{if(this.restoreFocusOnClose&&this.__restoreFocusNode){var activeElement=this._manager.deepActiveElement;if(activeElement===document.body||(0,_anyApp.dom)(this).deepContains(activeElement)){this.__restoreFocusNode.focus()}}this.__restoreFocusNode=null;this._focusNode.blur();this._focusedChild=null}},_onCaptureClick:function(event){if(!this.noCancelOnOutsideClick){this.cancel(event)}},_onCaptureFocus:function(event){if(!this.withBackdrop){return}var path=(0,_anyApp.dom)(event).path;if(-1===path.indexOf(this)){event.stopPropagation();this._applyFocus()}else{this._focusedChild=path[0]}},_onCaptureEsc:function(event){if(!this.noCancelOnEscKey){this.cancel(event)}},_onCaptureTab:function(event){if(!this.withBackdrop){return}this.__ensureFirstLastFocusables();var shift=event.shiftKey,nodeToCheck=shift?this.__firstFocusableNode:this.__lastFocusableNode,nodeToSet=shift?this.__lastFocusableNode:this.__firstFocusableNode,shouldWrap=!1;if(nodeToCheck===nodeToSet){shouldWrap=!0}else{var focusedNode=this._manager.deepActiveElement;shouldWrap=focusedNode===nodeToCheck||focusedNode===this}if(shouldWrap){event.preventDefault();this._focusedChild=nodeToSet;this._applyFocus()}},_onIronResize:function(){if(this.opened&&!this.__isAnimating){this.__deraf("refit",this.refit)}},_onNodesChange:function(){if(this.opened&&!this.__isAnimating){this.invalidateTabbables();this.notifyResize()}},__ensureFirstLastFocusables:function(){if(!this.__firstFocusableNode||!this.__lastFocusableNode){var focusableNodes=this._focusableNodes;this.__firstFocusableNode=focusableNodes[0];this.__lastFocusableNode=focusableNodes[focusableNodes.length-1]}},__openedChanged:function(){if(this.opened){this._prepareRenderOpened();this._manager.addOverlay(this);this._applyFocus();this._renderOpened()}else{this._manager.removeOverlay(this);this._applyFocus();this._renderClosed()}},__deraf:function(jobname,callback){var rafs=this.__rafs;if(null!==rafs[jobname]){cancelAnimationFrame(rafs[jobname])}rafs[jobname]=requestAnimationFrame(function(){rafs[jobname]=null;callback.call(this)}.bind(this))},__updateScrollObservers:function(isAttached,opened,scrollAction){if(!isAttached||!opened||!this.__isValidScrollAction(scrollAction)){removeScrollLock(this);this.__removeScrollListeners()}else{if("lock"===scrollAction){this.__saveScrollPosition();pushScrollLock(this)}this.__addScrollListeners()}},__addScrollListeners:function(){if(!this.__rootNodes){this.__rootNodes=[];if(_anyApp.useShadow){var node=this;while(node){if(node.nodeType===Node.DOCUMENT_FRAGMENT_NODE&&node.host){this.__rootNodes.push(node)}node=node.host||node.assignedSlot||node.parentNode}}this.__rootNodes.push(document)}this.__rootNodes.forEach(function(el){el.addEventListener("scroll",this.__onCaptureScroll,{capture:!0,passive:!0})},this)},__removeScrollListeners:function(){if(this.__rootNodes){this.__rootNodes.forEach(function(el){el.removeEventListener("scroll",this.__onCaptureScroll,{capture:!0,passive:!0})},this)}if(!this.isAttached){this.__rootNodes=null}},__isValidScrollAction:function(scrollAction){return"lock"===scrollAction||"refit"===scrollAction||"cancel"===scrollAction},__onCaptureScroll:function(event){if(this.__isAnimating){return}if(0<=(0,_anyApp.dom)(event).path.indexOf(this)){return}switch(this.scrollAction){case"lock":this.__restoreScrollPosition();break;case"refit":this.__deraf("refit",this.refit);break;case"cancel":this.cancel(event);break;}},__saveScrollPosition:function(){if(document.scrollingElement){this.__scrollTop=document.scrollingElement.scrollTop;this.__scrollLeft=document.scrollingElement.scrollLeft}else{this.__scrollTop=_Mathmax(document.documentElement.scrollTop,document.body.scrollTop);this.__scrollLeft=_Mathmax(document.documentElement.scrollLeft,document.body.scrollLeft)}},__restoreScrollPosition:function(){if(document.scrollingElement){document.scrollingElement.scrollTop=this.__scrollTop;document.scrollingElement.scrollLeft=this.__scrollLeft}else{document.documentElement.scrollTop=document.body.scrollTop=this.__scrollTop;document.documentElement.scrollLeft=document.body.scrollLeft=this.__scrollLeft}}};_exports.IronOverlayBehaviorImpl=IronOverlayBehaviorImpl;const IronOverlayBehavior=[IronFitBehavior,_anyApp.IronResizableBehavior,IronOverlayBehaviorImpl];_exports.IronOverlayBehavior=IronOverlayBehavior;_exports.$ironOverlayBehavior={IronOverlayBehaviorImpl:IronOverlayBehaviorImpl,IronOverlayBehavior:IronOverlayBehavior};const NeonAnimatableBehavior={properties:{animationConfig:{type:Object},entryAnimation:{observer:"_entryAnimationChanged",type:String},exitAnimation:{observer:"_exitAnimationChanged",type:String}},_entryAnimationChanged:function(){this.animationConfig=this.animationConfig||{};this.animationConfig.entry=[{name:this.entryAnimation,node:this}]},_exitAnimationChanged:function(){this.animationConfig=this.animationConfig||{};this.animationConfig.exit=[{name:this.exitAnimation,node:this}]},_copyProperties:function(config1,config2){for(var property in config2){config1[property]=config2[property]}},_cloneConfig:function(config){var clone={isClone:!0};this._copyProperties(clone,config);return clone},_getAnimationConfigRecursive:function(type,map,allConfigs){if(!this.animationConfig){return}if(this.animationConfig.value&&"function"===typeof this.animationConfig.value){this._warn(this._logf("playAnimation","Please put 'animationConfig' inside of your components 'properties' object instead of outside of it."));return}var thisConfig;if(type){thisConfig=this.animationConfig[type]}else{thisConfig=this.animationConfig}if(!Array.isArray(thisConfig)){thisConfig=[thisConfig]}if(thisConfig){for(var config,index=0;config=thisConfig[index];index++){if(config.animatable){config.animatable._getAnimationConfigRecursive(config.type||type,map,allConfigs)}else{if(config.id){var cachedConfig=map[config.id];if(cachedConfig){if(!cachedConfig.isClone){map[config.id]=this._cloneConfig(cachedConfig);cachedConfig=map[config.id]}this._copyProperties(cachedConfig,config)}else{map[config.id]=config}}else{allConfigs.push(config)}}}}},getAnimationConfig:function(type){var map={},allConfigs=[];this._getAnimationConfigRecursive(type,map,allConfigs);for(var key in map){allConfigs.push(map[key])}return allConfigs}};_exports.NeonAnimatableBehavior=NeonAnimatableBehavior;_exports.$neonAnimatableBehavior={NeonAnimatableBehavior:NeonAnimatableBehavior};const NeonAnimationRunnerBehaviorImpl={_configureAnimations:function(configs){var results=[],resultsToPlay=[];if(0<configs.length){for(var config,index=0,neonAnimation;config=configs[index];index++){neonAnimation=document.createElement(config.name);if(neonAnimation.isNeonAnimation){var result=null;if(!neonAnimation.configure){neonAnimation.configure=function(){return null}}result=neonAnimation.configure(config);resultsToPlay.push({result:result,config:config})}else{console.warn(this.is+":",config.name,"not found!")}}}for(var i=0;i<resultsToPlay.length;i++){var result=resultsToPlay[i].result,config=resultsToPlay[i].config;try{if("function"!=typeof result.cancel){result=document.timeline.play(result)}}catch(e){result=null;console.warn("Couldnt play","(",config.name,").",e)}if(result){results.push({neonAnimation:neonAnimation,config:config,animation:result})}}return results},_shouldComplete:function(activeEntries){for(var finished=!0,i=0;i<activeEntries.length;i++){if("finished"!=activeEntries[i].animation.playState){finished=!1;break}}return finished},_complete:function(activeEntries){for(var i=0;i<activeEntries.length;i++){activeEntries[i].neonAnimation.complete(activeEntries[i].config)}for(var i=0;i<activeEntries.length;i++){activeEntries[i].animation.cancel()}},playAnimation:function(type,cookie){var configs=this.getAnimationConfig(type);if(!configs){return}this._active=this._active||{};if(this._active[type]){this._complete(this._active[type]);delete this._active[type]}var activeEntries=this._configureAnimations(configs);if(0==activeEntries.length){this.fire("neon-animation-finish",cookie,{bubbles:!1});return}this._active[type]=activeEntries;for(var i=0;i<activeEntries.length;i++){activeEntries[i].animation.onfinish=function(){if(this._shouldComplete(activeEntries)){this._complete(activeEntries);delete this._active[type];this.fire("neon-animation-finish",cookie,{bubbles:!1})}}.bind(this)}},cancelAnimation:function(){for(var k in this._active){var entries=this._active[k];for(var j in entries){entries[j].animation.cancel()}}this._active={}}};_exports.NeonAnimationRunnerBehaviorImpl=NeonAnimationRunnerBehaviorImpl;const NeonAnimationRunnerBehavior=[NeonAnimatableBehavior,NeonAnimationRunnerBehaviorImpl];_exports.NeonAnimationRunnerBehavior=NeonAnimationRunnerBehavior;_exports.$neonAnimationRunnerBehavior={NeonAnimationRunnerBehaviorImpl:NeonAnimationRunnerBehaviorImpl,NeonAnimationRunnerBehavior:NeonAnimationRunnerBehavior};(0,_anyApp.Polymer)({_template:_anyApp.html$1`
    <style>
      :host {
        position: fixed;
      }

      #contentWrapper ::slotted(*) {
        overflow: auto;
      }

      #contentWrapper.animating ::slotted(*) {
        overflow: hidden;
        pointer-events: none;
      }
    </style>

    <div id="contentWrapper">
      <slot id="content" name="dropdown-content"></slot>
    </div>
`,is:"iron-dropdown",behaviors:[_anyApp.IronControlState,_anyApp.IronA11yKeysBehavior,IronOverlayBehavior,NeonAnimationRunnerBehavior],properties:{horizontalAlign:{type:String,value:"left",reflectToAttribute:!0},verticalAlign:{type:String,value:"top",reflectToAttribute:!0},openAnimationConfig:{type:Object},closeAnimationConfig:{type:Object},focusTarget:{type:Object},noAnimations:{type:Boolean,value:!1},allowOutsideScroll:{type:Boolean,value:!1,observer:"_allowOutsideScrollChanged"}},listeners:{"neon-animation-finish":"_onNeonAnimationFinish"},observers:["_updateOverlayPosition(positionTarget, verticalAlign, horizontalAlign, verticalOffset, horizontalOffset)"],get containedElement(){for(var nodes=(0,_anyApp.dom)(this.$.content).getDistributedNodes(),i=0,l=nodes.length;i<l;i++){if(nodes[i].nodeType===Node.ELEMENT_NODE){return nodes[i]}}},ready:function(){if(!this.scrollAction){this.scrollAction=this.allowOutsideScroll?"refit":"lock"}this._readied=!0},attached:function(){if(!this.sizingTarget||this.sizingTarget===this){this.sizingTarget=this.containedElement||this}},detached:function(){this.cancelAnimation()},_openedChanged:function(){if(this.opened&&this.disabled){this.cancel()}else{this.cancelAnimation();this._updateAnimationConfig();IronOverlayBehaviorImpl._openedChanged.apply(this,arguments)}},_renderOpened:function(){if(!this.noAnimations&&this.animationConfig.open){this.$.contentWrapper.classList.add("animating");this.playAnimation("open")}else{IronOverlayBehaviorImpl._renderOpened.apply(this,arguments)}},_renderClosed:function(){if(!this.noAnimations&&this.animationConfig.close){this.$.contentWrapper.classList.add("animating");this.playAnimation("close")}else{IronOverlayBehaviorImpl._renderClosed.apply(this,arguments)}},_onNeonAnimationFinish:function(){this.$.contentWrapper.classList.remove("animating");if(this.opened){this._finishRenderOpened()}else{this._finishRenderClosed()}},_updateAnimationConfig:function(){for(var animationNode=this.containedElement,animations=[].concat(this.openAnimationConfig||[]).concat(this.closeAnimationConfig||[]),i=0;i<animations.length;i++){animations[i].node=animationNode}this.animationConfig={open:this.openAnimationConfig,close:this.closeAnimationConfig}},_updateOverlayPosition:function(){if(this.isAttached){this.notifyResize()}},_allowOutsideScrollChanged:function(allowOutsideScroll){if(!this._readied){return}if(!allowOutsideScroll){this.scrollAction="lock"}else if(!this.scrollAction||"lock"===this.scrollAction){this.scrollAction="refit"}},_applyFocus:function(){var focusTarget=this.focusTarget||this.containedElement;if(focusTarget&&this.opened&&!this.noAutoFocus){focusTarget.focus()}else{IronOverlayBehaviorImpl._applyFocus.apply(this,arguments)}}});var IOS=navigator.userAgent.match(/iP(?:hone|ad;(?: U;)? CPU) OS (\d+)/),IOS_TOUCH_SCROLLING=IOS&&8<=IOS[1],DEFAULT_PHYSICAL_COUNT=3,HIDDEN_Y="-10000px",SECRET_TABINDEX=-100,IS_V2=null!=_anyApp.flush$1,ANIMATION_FRAME=IS_V2?_anyApp.animationFrame:0,IDLE_TIME=IS_V2?_anyApp.idlePeriod:1,MICRO_TASK=IS_V2?_anyApp.microTask:2;if(!_anyApp.OptionalMutableDataBehavior){Polymer.OptionalMutableDataBehavior={}}(0,_anyApp.Polymer)({_template:_anyApp.html$1`
    <style>
      :host {
        display: block;
      }

      @media only screen and (-webkit-max-device-pixel-ratio: 1) {
        :host {
          will-change: transform;
        }
      }

      #items {
        @apply --iron-list-items-container;
        position: relative;
      }

      :host(:not([grid])) #items > ::slotted(*) {
        width: 100%;
      }

      #items > ::slotted(*) {
        box-sizing: border-box;
        margin: 0;
        position: absolute;
        top: 0;
        will-change: transform;
      }
    </style>

    <array-selector id="selector" items="{{items}}" selected="{{selectedItems}}" selected-item="{{selectedItem}}"></array-selector>

    <div id="items">
      <slot></slot>
    </div>
`,is:"iron-list",properties:{items:{type:Array},as:{type:String,value:"item"},indexAs:{type:String,value:"index"},selectedAs:{type:String,value:"selected"},grid:{type:Boolean,value:!1,reflectToAttribute:!0,observer:"_gridChanged"},selectionEnabled:{type:Boolean,value:!1},selectedItem:{type:Object,notify:!0},selectedItems:{type:Object,notify:!0},multiSelection:{type:Boolean,value:!1},scrollOffset:{type:Number,value:0}},observers:["_itemsChanged(items.*)","_selectionEnabledChanged(selectionEnabled)","_multiSelectionChanged(multiSelection)","_setOverflow(scrollTarget, scrollOffset)"],behaviors:[_anyApp.Templatizer,_anyApp.IronResizableBehavior,_anyApp.IronScrollTargetBehavior,_anyApp.OptionalMutableDataBehavior],_ratio:.5,_scrollerPaddingTop:0,_scrollPosition:0,_physicalSize:0,_physicalAverage:0,_physicalAverageCount:0,_physicalTop:0,_virtualCount:0,_estScrollHeight:0,_scrollHeight:0,_viewportHeight:0,_viewportWidth:0,_physicalItems:null,_physicalSizes:null,_firstVisibleIndexVal:null,_collection:null,_lastVisibleIndexVal:null,_maxPages:2,_focusedItem:null,_focusedVirtualIndex:-1,_focusedPhysicalIndex:-1,_offscreenFocusedItem:null,_focusBackfillItem:null,_itemsPerRow:1,_itemWidth:0,_rowHeight:0,_templateCost:0,_parentModel:!0,get _physicalBottom(){return this._physicalTop+this._physicalSize},get _scrollBottom(){return this._scrollPosition+this._viewportHeight},get _virtualEnd(){return this._virtualStart+this._physicalCount-1},get _hiddenContentSize(){var size=this.grid?this._physicalRows*this._rowHeight:this._physicalSize;return size-this._viewportHeight},get _itemsParent(){return(0,_anyApp.dom)((0,_anyApp.dom)(this._userTemplate).parentNode)},get _maxScrollTop(){return this._estScrollHeight-this._viewportHeight+this._scrollOffset},get _maxVirtualStart(){var virtualCount=this._convertIndexToCompleteRow(this._virtualCount);return _Mathmax(0,virtualCount-this._physicalCount)},set _virtualStart(val){val=this._clamp(val,0,this._maxVirtualStart);if(this.grid){val=val-val%this._itemsPerRow}this._virtualStartVal=val},get _virtualStart(){return this._virtualStartVal||0},set _physicalStart(val){val=val%this._physicalCount;if(0>val){val=this._physicalCount+val}if(this.grid){val=val-val%this._itemsPerRow}this._physicalStartVal=val},get _physicalStart(){return this._physicalStartVal||0},get _physicalEnd(){return(this._physicalStart+this._physicalCount-1)%this._physicalCount},set _physicalCount(val){this._physicalCountVal=val},get _physicalCount(){return this._physicalCountVal||0},get _optPhysicalSize(){return 0===this._viewportHeight?1/0:this._viewportHeight*this._maxPages},get _isVisible(){return!!(this.offsetWidth||this.offsetHeight)},get firstVisibleIndex(){var idx=this._firstVisibleIndexVal;if(null==idx){var physicalOffset=this._physicalTop+this._scrollOffset;idx=this._iterateItems(function(pidx,vidx){physicalOffset+=this._getPhysicalSizeIncrement(pidx);if(physicalOffset>this._scrollPosition){return this.grid?vidx-vidx%this._itemsPerRow:vidx}if(this.grid&&this._virtualCount-1===vidx){return vidx-vidx%this._itemsPerRow}})||0;this._firstVisibleIndexVal=idx}return idx},get lastVisibleIndex(){var idx=this._lastVisibleIndexVal;if(null==idx){if(this.grid){idx=_Mathmin(this._virtualCount,this.firstVisibleIndex+this._estRowsInView*this._itemsPerRow-1)}else{var physicalOffset=this._physicalTop+this._scrollOffset;this._iterateItems(function(pidx,vidx){if(physicalOffset<this._scrollBottom){idx=vidx}physicalOffset+=this._getPhysicalSizeIncrement(pidx)})}this._lastVisibleIndexVal=idx}return idx},get _defaultScrollTarget(){return this},get _virtualRowCount(){return _Mathceil(this._virtualCount/this._itemsPerRow)},get _estRowsInView(){return _Mathceil(this._viewportHeight/this._rowHeight)},get _physicalRows(){return _Mathceil(this._physicalCount/this._itemsPerRow)},get _scrollOffset(){return this._scrollerPaddingTop+this.scrollOffset},ready:function(){this.addEventListener("focus",this._didFocus.bind(this),!0)},attached:function(){this._debounce("_render",this._render,ANIMATION_FRAME);this.listen(this,"iron-resize","_resizeHandler");this.listen(this,"keydown","_keydownHandler")},detached:function(){this.unlisten(this,"iron-resize","_resizeHandler");this.unlisten(this,"keydown","_keydownHandler")},_setOverflow:function(scrollTarget){this.style.webkitOverflowScrolling=scrollTarget===this?"touch":"";this.style.overflowY=scrollTarget===this?"auto":"";this._lastVisibleIndexVal=null;this._firstVisibleIndexVal=null;this._debounce("_render",this._render,ANIMATION_FRAME)},updateViewportBoundaries:function(){var styles=window.getComputedStyle(this);this._scrollerPaddingTop=this.scrollTarget===this?0:parseInt(styles["padding-top"],10);this._isRTL=!!("rtl"===styles.direction);this._viewportWidth=this.$.items.offsetWidth;this._viewportHeight=this._scrollTargetHeight;this.grid&&this._updateGridMetrics()},_scrollHandler:function(){var scrollTop=_Mathmax(0,_Mathmin(this._maxScrollTop,this._scrollTop)),delta=scrollTop-this._scrollPosition,isScrollingDown=0<=delta;this._scrollPosition=scrollTop;this._firstVisibleIndexVal=null;this._lastVisibleIndexVal=null;if(_Mathabs(delta)>this._physicalSize&&0<this._physicalSize){delta=delta-this._scrollOffset;var idxAdjustment=_Mathround(delta/this._physicalAverage)*this._itemsPerRow;this._virtualStart=this._virtualStart+idxAdjustment;this._physicalStart=this._physicalStart+idxAdjustment;this._physicalTop=_Mathfloor(this._virtualStart/this._itemsPerRow)*this._physicalAverage;this._update()}else if(0<this._physicalCount){var reusables=this._getReusables(isScrollingDown);if(isScrollingDown){this._physicalTop=reusables.physicalTop;this._virtualStart=this._virtualStart+reusables.indexes.length;this._physicalStart=this._physicalStart+reusables.indexes.length}else{this._virtualStart=this._virtualStart-reusables.indexes.length;this._physicalStart=this._physicalStart-reusables.indexes.length}this._update(reusables.indexes,isScrollingDown?null:reusables.indexes);this._debounce("_increasePoolIfNeeded",this._increasePoolIfNeeded.bind(this,0),MICRO_TASK)}},_getReusables:function(fromTop){var ith,offsetContent,physicalItemHeight,idxs=[],protectedOffsetContent=this._hiddenContentSize*this._ratio,virtualStart=this._virtualStart,virtualEnd=this._virtualEnd,physicalCount=this._physicalCount,top=this._physicalTop+this._scrollOffset,bottom=this._physicalBottom+this._scrollOffset,scrollTop=this._scrollTop,scrollBottom=this._scrollBottom;if(fromTop){ith=this._physicalStart;this._physicalEnd;offsetContent=scrollTop-top}else{ith=this._physicalEnd;this._physicalStart;offsetContent=bottom-scrollBottom}while(!0){physicalItemHeight=this._getPhysicalSizeIncrement(ith);offsetContent=offsetContent-physicalItemHeight;if(idxs.length>=physicalCount||offsetContent<=protectedOffsetContent){break}if(fromTop){if(virtualEnd+idxs.length+1>=this._virtualCount){break}if(top+physicalItemHeight>=scrollTop-this._scrollOffset){break}idxs.push(ith);top=top+physicalItemHeight;ith=(ith+1)%physicalCount}else{if(0>=virtualStart-idxs.length){break}if(top+this._physicalSize-physicalItemHeight<=scrollBottom){break}idxs.push(ith);top=top-physicalItemHeight;ith=0===ith?physicalCount-1:ith-1}}return{indexes:idxs,physicalTop:top-this._scrollOffset}},_update:function(itemSet,movingUp){if(itemSet&&0===itemSet.length||0===this._physicalCount){return}this._manageFocus();this._assignModels(itemSet);this._updateMetrics(itemSet);if(movingUp){while(movingUp.length){var idx=movingUp.pop();this._physicalTop-=this._getPhysicalSizeIncrement(idx)}}this._positionItems();this._updateScrollerSize()},_createPool:function(size){this._ensureTemplatized();var i,inst,physicalItems=Array(size);for(i=0;i<size;i++){inst=this.stamp(null);physicalItems[i]=inst.root.querySelector("*");this._itemsParent.appendChild(inst.root)}return physicalItems},_isClientFull:function(){return 0!=this._scrollBottom&&this._physicalBottom-1>=this._scrollBottom&&this._physicalTop<=this._scrollPosition},_increasePoolIfNeeded:function(count){var nextPhysicalCount=this._clamp(this._physicalCount+count,DEFAULT_PHYSICAL_COUNT,this._virtualCount-this._virtualStart);nextPhysicalCount=this._convertIndexToCompleteRow(nextPhysicalCount);if(this.grid){var correction=nextPhysicalCount%this._itemsPerRow;if(correction&&nextPhysicalCount-correction<=this._physicalCount){nextPhysicalCount+=this._itemsPerRow}nextPhysicalCount-=correction}var delta=nextPhysicalCount-this._physicalCount,nextIncrease=_Mathround(.5*this._physicalCount);if(0>delta){return}if(0<delta){var ts=window.performance.now();[].push.apply(this._physicalItems,this._createPool(delta));for(var i=0;i<delta;i++){this._physicalSizes.push(0)}this._physicalCount=this._physicalCount+delta;if(this._physicalStart>this._physicalEnd&&this._isIndexRendered(this._focusedVirtualIndex)&&this._getPhysicalIndex(this._focusedVirtualIndex)<this._physicalEnd){this._physicalStart=this._physicalStart+delta}this._update();this._templateCost=(window.performance.now()-ts)/delta;nextIncrease=_Mathround(.5*this._physicalCount)}if(this._virtualEnd>=this._virtualCount-1||0===nextIncrease){}else if(!this._isClientFull()){this._debounce("_increasePoolIfNeeded",this._increasePoolIfNeeded.bind(this,nextIncrease),MICRO_TASK)}else if(this._physicalSize<this._optPhysicalSize){this._debounce("_increasePoolIfNeeded",this._increasePoolIfNeeded.bind(this,this._clamp(_Mathround(50/this._templateCost),1,nextIncrease)),IDLE_TIME)}},_render:function(){if(!this.isAttached||!this._isVisible){return}if(0!==this._physicalCount){var reusables=this._getReusables(!0);this._physicalTop=reusables.physicalTop;this._virtualStart=this._virtualStart+reusables.indexes.length;this._physicalStart=this._physicalStart+reusables.indexes.length;this._update(reusables.indexes);this._update();this._increasePoolIfNeeded(0)}else if(0<this._virtualCount){this.updateViewportBoundaries();this._increasePoolIfNeeded(DEFAULT_PHYSICAL_COUNT)}},_ensureTemplatized:function(){if(this.ctor){return}this._userTemplate=this.queryEffectiveChildren("template");if(!this._userTemplate){console.warn("iron-list requires a template to be provided in light-dom")}var instanceProps={__key__:!0};instanceProps[this.as]=!0;instanceProps[this.indexAs]=!0;instanceProps[this.selectedAs]=!0;instanceProps.tabIndex=!0;this._instanceProps=instanceProps;this.templatize(this._userTemplate,this.mutableData)},_gridChanged:function(newGrid,oldGrid){if("undefined"===typeof oldGrid)return;this.notifyResize();_anyApp.flush$1?(0,_anyApp.flush$1)():(0,_anyApp.flush)();newGrid&&this._updateGridMetrics()},_itemsChanged:function(change){if("items"===change.path){this._virtualStart=0;this._physicalTop=0;this._virtualCount=this.items?this.items.length:0;this._collection=null;this._physicalIndexForKey={};this._firstVisibleIndexVal=null;this._lastVisibleIndexVal=null;this._physicalCount=this._physicalCount||0;this._physicalItems=this._physicalItems||[];this._physicalSizes=this._physicalSizes||[];this._physicalStart=0;if(this._scrollTop>this._scrollOffset){this._resetScrollPosition(0)}this._removeFocusedItem();this._debounce("_render",this._render,ANIMATION_FRAME)}else if("items.splices"===change.path){this._adjustVirtualIndex(change.value.indexSplices);this._virtualCount=this.items?this.items.length:0;var itemAddedOrRemoved=change.value.indexSplices.some(function(splice){return 0<splice.addedCount||0<splice.removed.length});if(itemAddedOrRemoved){var activeElement=this._getActiveElement();if(this.contains(activeElement)){activeElement.blur()}}var affectedIndexRendered=change.value.indexSplices.some(function(splice){return splice.index+splice.addedCount>=this._virtualStart&&splice.index<=this._virtualEnd},this);if(!this._isClientFull()||affectedIndexRendered){this._debounce("_render",this._render,ANIMATION_FRAME)}}else if("items.length"!==change.path){this._forwardItemPath(change.path,change.value)}},_forwardItemPath:function(path,value){path=path.slice(6);var dot=path.indexOf(".");if(-1===dot){dot=path.length}var isIndexRendered,pidx,inst,offscreenInstance=this.modelForElement(this._offscreenFocusedItem);if(IS_V2){var vidx=parseInt(path.substring(0,dot),10);isIndexRendered=this._isIndexRendered(vidx);if(isIndexRendered){pidx=this._getPhysicalIndex(vidx);inst=this.modelForElement(this._physicalItems[pidx])}else if(offscreenInstance){inst=offscreenInstance}if(!inst||inst[this.indexAs]!==vidx){return}}else{var key=path.substring(0,dot);if(offscreenInstance&&offscreenInstance.__key__===key){inst=offscreenInstance}else{pidx=this._physicalIndexForKey[key];inst=this.modelForElement(this._physicalItems[pidx]);if(!inst||inst.__key__!==key){return}}}path=path.substring(dot+1);path=this.as+(path?"."+path:"");IS_V2?inst._setPendingPropertyOrPath(path,value,!1,!0):inst.notifyPath(path,value,!0);inst._flushProperties&&inst._flushProperties(!0);if(isIndexRendered){this._updateMetrics([pidx]);this._positionItems();this._updateScrollerSize()}},_adjustVirtualIndex:function(splices){splices.forEach(function(splice){splice.removed.forEach(this._removeItem,this);if(splice.index<this._virtualStart){var delta=_Mathmax(splice.addedCount-splice.removed.length,splice.index-this._virtualStart);this._virtualStart=this._virtualStart+delta;if(0<=this._focusedVirtualIndex){this._focusedVirtualIndex=this._focusedVirtualIndex+delta}}},this)},_removeItem:function(item){this.$.selector.deselect(item);if(this._focusedItem&&this.modelForElement(this._focusedItem)[this.as]===item){this._removeFocusedItem()}},_iterateItems:function(fn,itemSet){var pidx,vidx,rtn,i;if(2===arguments.length&&itemSet){for(i=0;i<itemSet.length;i++){pidx=itemSet[i];vidx=this._computeVidx(pidx);if(null!=(rtn=fn.call(this,pidx,vidx))){return rtn}}}else{pidx=this._physicalStart;vidx=this._virtualStart;for(;pidx<this._physicalCount;pidx++,vidx++){if(null!=(rtn=fn.call(this,pidx,vidx))){return rtn}}for(pidx=0;pidx<this._physicalStart;pidx++,vidx++){if(null!=(rtn=fn.call(this,pidx,vidx))){return rtn}}}},_computeVidx:function(pidx){if(pidx>=this._physicalStart){return this._virtualStart+(pidx-this._physicalStart)}return this._virtualStart+(this._physicalCount-this._physicalStart)+pidx},_assignModels:function(itemSet){this._iterateItems(function(pidx,vidx){var el=this._physicalItems[pidx],item=this.items&&this.items[vidx];if(null!=item){var inst=this.modelForElement(el);inst.__key__=this._collection?this._collection.getKey(item):null;this._forwardProperty(inst,this.as,item);this._forwardProperty(inst,this.selectedAs,this.$.selector.isSelected(item));this._forwardProperty(inst,this.indexAs,vidx);this._forwardProperty(inst,"tabIndex",this._focusedVirtualIndex===vidx?0:-1);this._physicalIndexForKey[inst.__key__]=pidx;inst._flushProperties&&inst._flushProperties(!0);el.removeAttribute("hidden")}else{el.setAttribute("hidden","")}},itemSet)},_updateMetrics:function(itemSet){_anyApp.flush$1?(0,_anyApp.flush$1)():(0,_anyApp.flush)();var newPhysicalSize=0,oldPhysicalSize=0,prevAvgCount=this._physicalAverageCount,prevPhysicalAvg=this._physicalAverage;this._iterateItems(function(pidx){oldPhysicalSize+=this._physicalSizes[pidx];this._physicalSizes[pidx]=this._physicalItems[pidx].offsetHeight;newPhysicalSize+=this._physicalSizes[pidx];this._physicalAverageCount+=this._physicalSizes[pidx]?1:0},itemSet);if(this.grid){this._updateGridMetrics();this._physicalSize=_Mathceil(this._physicalCount/this._itemsPerRow)*this._rowHeight}else{oldPhysicalSize=1===this._itemsPerRow?oldPhysicalSize:_Mathceil(this._physicalCount/this._itemsPerRow)*this._rowHeight;this._physicalSize=this._physicalSize+newPhysicalSize-oldPhysicalSize;this._itemsPerRow=1}if(this._physicalAverageCount!==prevAvgCount){this._physicalAverage=_Mathround((prevPhysicalAvg*prevAvgCount+newPhysicalSize)/this._physicalAverageCount)}},_updateGridMetrics:function(){this._itemWidth=0<this._physicalCount?this._physicalItems[0].getBoundingClientRect().width:200;this._rowHeight=0<this._physicalCount?this._physicalItems[0].offsetHeight:200;this._itemsPerRow=this._itemWidth?_Mathfloor(this._viewportWidth/this._itemWidth):this._itemsPerRow},_positionItems:function(){this._adjustScrollPosition();var y=this._physicalTop;if(this.grid){var totalItemWidth=this._itemsPerRow*this._itemWidth,rowOffset=(this._viewportWidth-totalItemWidth)/2;this._iterateItems(function(pidx,vidx){var modulus=vidx%this._itemsPerRow,x=_Mathfloor(modulus*this._itemWidth+rowOffset);if(this._isRTL){x=-1*x}this.translate3d(x+"px",y+"px",0,this._physicalItems[pidx]);if(this._shouldRenderNextRow(vidx)){y+=this._rowHeight}})}else{this._iterateItems(function(pidx){this.translate3d(0,y+"px",0,this._physicalItems[pidx]);y+=this._physicalSizes[pidx]})}},_getPhysicalSizeIncrement:function(pidx){if(!this.grid){return this._physicalSizes[pidx]}if(this._computeVidx(pidx)%this._itemsPerRow!==this._itemsPerRow-1){return 0}return this._rowHeight},_shouldRenderNextRow:function(vidx){return vidx%this._itemsPerRow===this._itemsPerRow-1},_adjustScrollPosition:function(){var deltaHeight=0===this._virtualStart?this._physicalTop:_Mathmin(this._scrollPosition+this._physicalTop,0);if(0!==deltaHeight){this._physicalTop=this._physicalTop-deltaHeight;var scrollTop=this._scrollTop;if(!IOS_TOUCH_SCROLLING&&0<scrollTop){this._resetScrollPosition(scrollTop-deltaHeight)}}},_resetScrollPosition:function(pos){if(this.scrollTarget&&0<=pos){this._scrollTop=pos;this._scrollPosition=this._scrollTop}},_updateScrollerSize:function(forceUpdate){if(this.grid){this._estScrollHeight=this._virtualRowCount*this._rowHeight}else{this._estScrollHeight=this._physicalBottom+_Mathmax(this._virtualCount-this._physicalCount-this._virtualStart,0)*this._physicalAverage}forceUpdate=forceUpdate||0===this._scrollHeight;forceUpdate=forceUpdate||this._scrollPosition>=this._estScrollHeight-this._physicalSize;forceUpdate=forceUpdate||this.grid&&this.$.items.style.height<this._estScrollHeight;if(forceUpdate||_Mathabs(this._estScrollHeight-this._scrollHeight)>=this._viewportHeight){this.$.items.style.height=this._estScrollHeight+"px";this._scrollHeight=this._estScrollHeight}},scrollToItem:function(item){return this.scrollToIndex(this.items.indexOf(item))},scrollToIndex:function(idx){if("number"!==typeof idx||0>idx||idx>this.items.length-1){return}_anyApp.flush$1?(0,_anyApp.flush$1)():(0,_anyApp.flush)();if(0===this._physicalCount){return}idx=this._clamp(idx,0,this._virtualCount-1);if(!this._isIndexRendered(idx)||idx>=this._maxVirtualStart){this._virtualStart=this.grid?idx-2*this._itemsPerRow:idx-1}this._manageFocus();this._assignModels();this._updateMetrics();this._physicalTop=_Mathfloor(this._virtualStart/this._itemsPerRow)*this._physicalAverage;var currentTopItem=this._physicalStart,currentVirtualItem=this._virtualStart,targetOffsetTop=0,hiddenContentSize=this._hiddenContentSize;while(currentVirtualItem<idx&&targetOffsetTop<=hiddenContentSize){targetOffsetTop=targetOffsetTop+this._getPhysicalSizeIncrement(currentTopItem);currentTopItem=(currentTopItem+1)%this._physicalCount;currentVirtualItem++}this._updateScrollerSize(!0);this._positionItems();this._resetScrollPosition(this._physicalTop+this._scrollOffset+targetOffsetTop);this._increasePoolIfNeeded(0);this._firstVisibleIndexVal=null;this._lastVisibleIndexVal=null},_resetAverage:function(){this._physicalAverage=0;this._physicalAverageCount=0},_resizeHandler:function(){this._debounce("_render",function(){this._firstVisibleIndexVal=null;this._lastVisibleIndexVal=null;_Mathabs(this._viewportHeight-this._scrollTargetHeight);this.updateViewportBoundaries();if(this._isVisible){this.toggleScrollListener(!0);this._resetAverage();this._render()}else{this.toggleScrollListener(!1)}},ANIMATION_FRAME)},selectItem:function(item){return this.selectIndex(this.items.indexOf(item))},selectIndex:function(index){if(0>index||index>=this._virtualCount){return}if(!this.multiSelection&&this.selectedItem){this.clearSelection()}if(this._isIndexRendered(index)){var model=this.modelForElement(this._physicalItems[this._getPhysicalIndex(index)]);if(model){model[this.selectedAs]=!0}this.updateSizeForIndex(index)}if(this.$.selector.selectIndex){this.$.selector.selectIndex(index)}else{this.$.selector.select(this.items[index])}},deselectItem:function(item){return this.deselectIndex(this.items.indexOf(item))},deselectIndex:function(index){if(0>index||index>=this._virtualCount){return}if(this._isIndexRendered(index)){var model=this.modelForElement(this._physicalItems[this._getPhysicalIndex(index)]);model[this.selectedAs]=!1;this.updateSizeForIndex(index)}if(this.$.selector.deselectIndex){this.$.selector.deselectIndex(index)}else{this.$.selector.deselect(this.items[index])}},toggleSelectionForItem:function(item){return this.toggleSelectionForIndex(this.items.indexOf(item))},toggleSelectionForIndex:function(index){var isSelected=this.$.selector.isIndexSelected?this.$.selector.isIndexSelected(index):this.$.selector.isSelected(this.items[index]);isSelected?this.deselectIndex(index):this.selectIndex(index)},clearSelection:function(){this._iterateItems(function(pidx){this.modelForElement(this._physicalItems[pidx])[this.selectedAs]=!1});this.$.selector.clearSelection()},_selectionEnabledChanged:function(selectionEnabled){var handler=selectionEnabled?this.listen:this.unlisten;handler.call(this,this,"tap","_selectionHandler")},_selectionHandler:function(e){var model=this.modelForElement(e.target);if(!model){return}var modelTabIndex,activeElTabIndex,target=(0,_anyApp.dom)(e).path[0],activeEl=this._getActiveElement(),physicalItem=this._physicalItems[this._getPhysicalIndex(model[this.indexAs])];if("input"===target.localName||"button"===target.localName||"select"===target.localName){return}modelTabIndex=model.tabIndex;model.tabIndex=SECRET_TABINDEX;activeElTabIndex=activeEl?activeEl.tabIndex:-1;model.tabIndex=modelTabIndex;if(activeEl&&physicalItem!==activeEl&&physicalItem.contains(activeEl)&&activeElTabIndex!==SECRET_TABINDEX){return}this.toggleSelectionForItem(model[this.as])},_multiSelectionChanged:function(multiSelection){this.clearSelection();this.$.selector.multi=multiSelection},updateSizeForItem:function(item){return this.updateSizeForIndex(this.items.indexOf(item))},updateSizeForIndex:function(index){if(!this._isIndexRendered(index)){return null}this._updateMetrics([this._getPhysicalIndex(index)]);this._positionItems();return null},_manageFocus:function(){var fidx=this._focusedVirtualIndex;if(0<=fidx&&fidx<this._virtualCount){if(this._isIndexRendered(fidx)){this._restoreFocusedItem()}else{this._createFocusBackfillItem()}}else if(0<this._virtualCount&&0<this._physicalCount){this._focusedPhysicalIndex=this._physicalStart;this._focusedVirtualIndex=this._virtualStart;this._focusedItem=this._physicalItems[this._physicalStart]}},_convertIndexToCompleteRow:function(idx){this._itemsPerRow=this._itemsPerRow||1;return this.grid?_Mathceil(idx/this._itemsPerRow)*this._itemsPerRow:idx},_isIndexRendered:function(idx){return idx>=this._virtualStart&&idx<=this._virtualEnd},_isIndexVisible:function(idx){return idx>=this.firstVisibleIndex&&idx<=this.lastVisibleIndex},_getPhysicalIndex:function(vidx){return IS_V2?(this._physicalStart+(vidx-this._virtualStart))%this._physicalCount:this._physicalIndexForKey[this._collection.getKey(this.items[vidx])]},focusItem:function(idx){this._focusPhysicalItem(idx)},_focusPhysicalItem:function(idx){if(0>idx||idx>=this._virtualCount){return}this._restoreFocusedItem();if(!this._isIndexRendered(idx)){this.scrollToIndex(idx)}var physicalItem=this._physicalItems[this._getPhysicalIndex(idx)],model=this.modelForElement(physicalItem),focusable;model.tabIndex=SECRET_TABINDEX;if(physicalItem.tabIndex===SECRET_TABINDEX){focusable=physicalItem}if(!focusable){focusable=(0,_anyApp.dom)(physicalItem).querySelector("[tabindex=\""+SECRET_TABINDEX+"\"]")}model.tabIndex=0;this._focusedVirtualIndex=idx;focusable&&focusable.focus()},_removeFocusedItem:function(){if(this._offscreenFocusedItem){this._itemsParent.removeChild(this._offscreenFocusedItem)}this._offscreenFocusedItem=null;this._focusBackfillItem=null;this._focusedItem=null;this._focusedVirtualIndex=-1;this._focusedPhysicalIndex=-1},_createFocusBackfillItem:function(){var fpidx=this._focusedPhysicalIndex;if(this._offscreenFocusedItem||0>this._focusedVirtualIndex){return}if(!this._focusBackfillItem){var inst=this.stamp(null);this._focusBackfillItem=inst.root.querySelector("*");this._itemsParent.appendChild(inst.root)}this._offscreenFocusedItem=this._physicalItems[fpidx];this.modelForElement(this._offscreenFocusedItem).tabIndex=0;this._physicalItems[fpidx]=this._focusBackfillItem;this._focusedPhysicalIndex=fpidx;this.translate3d(0,HIDDEN_Y,0,this._offscreenFocusedItem)},_restoreFocusedItem:function(){if(!this._offscreenFocusedItem||0>this._focusedVirtualIndex){return}this._assignModels();var fpidx=this._focusedPhysicalIndex,onScreenItem=this._physicalItems[fpidx];if(!onScreenItem){return}var onScreenInstance=this.modelForElement(onScreenItem),offScreenInstance=this.modelForElement(this._offscreenFocusedItem);if(onScreenInstance[this.as]===offScreenInstance[this.as]){this._focusBackfillItem=onScreenItem;onScreenInstance.tabIndex=-1;this._physicalItems[fpidx]=this._offscreenFocusedItem;this.translate3d(0,HIDDEN_Y,0,this._focusBackfillItem)}else{this._removeFocusedItem();this._focusBackfillItem=null}this._offscreenFocusedItem=null},_didFocus:function(e){var targetModel=this.modelForElement(e.target),focusedModel=this.modelForElement(this._focusedItem),hasOffscreenFocusedItem=null!==this._offscreenFocusedItem,fidx=this._focusedVirtualIndex;if(!targetModel){return}if(focusedModel===targetModel){if(!this._isIndexVisible(fidx)){this.scrollToIndex(fidx)}}else{this._restoreFocusedItem();if(focusedModel){focusedModel.tabIndex=-1}targetModel.tabIndex=0;fidx=targetModel[this.indexAs];this._focusedVirtualIndex=fidx;this._focusedPhysicalIndex=this._getPhysicalIndex(fidx);this._focusedItem=this._physicalItems[this._focusedPhysicalIndex];if(hasOffscreenFocusedItem&&!this._offscreenFocusedItem){this._update()}}},_keydownHandler:function(e){switch(e.keyCode){case 40:e.preventDefault();this._focusPhysicalItem(this._focusedVirtualIndex+(this.grid?this._itemsPerRow:1));break;case 39:if(this.grid)this._focusPhysicalItem(this._focusedVirtualIndex+(this._isRTL?-1:1));break;case 38:this._focusPhysicalItem(this._focusedVirtualIndex-(this.grid?this._itemsPerRow:1));break;case 37:if(this.grid)this._focusPhysicalItem(this._focusedVirtualIndex+(this._isRTL?1:-1));break;case 13:this._focusPhysicalItem(this._focusedVirtualIndex);if(this.selectionEnabled)this._selectionHandler(e);break;}},_clamp:function(v,min,max){return _Mathmin(max,_Mathmax(min,v))},_debounce:function(name,cb,asyncModule){if(IS_V2){this._debouncers=this._debouncers||{};this._debouncers[name]=_anyApp.Debouncer.debounce(this._debouncers[name],asyncModule,cb.bind(this));(0,_anyApp.enqueueDebouncer)(this._debouncers[name])}else{(0,_anyApp.addDebouncer)(this.debounce(name,cb))}},_forwardProperty:function(inst,name,value){if(IS_V2){inst._setPendingProperty(name,value)}else{inst[name]=value}},_forwardHostPropV2:function(prop,value){(this._physicalItems||[]).concat([this._offscreenFocusedItem,this._focusBackfillItem]).forEach(function(item){if(item){this.modelForElement(item).forwardHostProp(prop,value)}},this)},_notifyInstancePropV2:function(inst,prop,value){if((0,_anyApp.matches)(this.as,prop)){var idx=inst[this.indexAs];if(prop==this.as){this.items[idx]=value}this.notifyPath((0,_anyApp.translate)(this.as,"items."+idx,prop),value)}},_getStampedChildren:function(){return this._physicalItems},_forwardInstancePath:function(inst,path,value){if(0===path.indexOf(this.as+".")){this.notifyPath("items."+inst.__key__+"."+path.slice(this.as.length+1),value)}},_forwardParentPath:function(path,value){(this._physicalItems||[]).concat([this._offscreenFocusedItem,this._focusBackfillItem]).forEach(function(item){if(item){this.modelForElement(item).notifyPath(path,value,!0)}},this)},_forwardParentProp:function(prop,value){(this._physicalItems||[]).concat([this._offscreenFocusedItem,this._focusBackfillItem]).forEach(function(item){if(item){this.modelForElement(item)[prop]=value}},this)},_getActiveElement:function(){var itemsHost=this._itemsParent.node.domHost;return(0,_anyApp.dom)(itemsHost?itemsHost.root:document).activeElement}});(0,_anyApp.Polymer)({_template:_anyApp.html$1`
    <style>
      :host {
        display: block;
      }
    </style>

    <slot></slot>
`,is:"iron-scroll-threshold",properties:{upperThreshold:{type:Number,value:100},lowerThreshold:{type:Number,value:100},upperTriggered:{type:Boolean,value:!1,notify:!0,readOnly:!0},lowerTriggered:{type:Boolean,value:!1,notify:!0,readOnly:!0},horizontal:{type:Boolean,value:!1}},behaviors:[_anyApp.IronScrollTargetBehavior],observers:["_setOverflow(scrollTarget)","_initCheck(horizontal, isAttached)"],get _defaultScrollTarget(){return this},_setOverflow:function(scrollTarget){this.style.overflow=scrollTarget===this?"auto":"";this.style.webkitOverflowScrolling=scrollTarget===this?"touch":""},_scrollHandler:function(){if(!this.isDebouncerActive("_checkTheshold")){this.debounce("_checkTheshold",function(){this.checkScrollThresholds()},200)}},_initCheck:function(horizontal,isAttached){if(isAttached){this.debounce("_init",function(){this.clearTriggers();this.checkScrollThresholds()})}},checkScrollThresholds:function(){if(!this.scrollTarget||this.lowerTriggered&&this.upperTriggered){return}var upperScrollValue=this.horizontal?this._scrollLeft:this._scrollTop,lowerScrollValue=this.horizontal?this.scrollTarget.scrollWidth-this._scrollTargetWidth-this._scrollLeft:this.scrollTarget.scrollHeight-this._scrollTargetHeight-this._scrollTop;if(upperScrollValue<=this.upperThreshold&&!this.upperTriggered){this._setUpperTriggered(!0);this.fire("upper-threshold")}if(lowerScrollValue<=this.lowerThreshold&&!this.lowerTriggered){this._setLowerTriggered(!0);this.fire("lower-threshold")}},checkScrollThesholds:function(){this.checkScrollThresholds()},clearTriggers:function(){this._setUpperTriggered(!1);this._setLowerTriggered(!1)}});const NeonAnimationBehavior={properties:{animationTiming:{type:Object,value:function(){return{duration:500,easing:"cubic-bezier(0.4, 0, 0.2, 1)",fill:"both"}}}},isNeonAnimation:!0,created:function(){if(!document.body.animate){console.warn("No web animations detected. This element will not"+" function without a web animations polyfill.")}},timingFromConfig:function(config){if(config.timing){for(var property in config.timing){this.animationTiming[property]=config.timing[property]}}return this.animationTiming},setPrefixedProperty:function(node,property,value){for(var map={transform:["webkitTransform"],transformOrigin:["mozTransformOrigin","webkitTransformOrigin"]},prefixes=map[property],prefix,index=0;prefix=prefixes[index];index++){node.style[prefix]=value}node.style[property]=value},complete:function(){}};_exports.NeonAnimationBehavior=NeonAnimationBehavior;_exports.$neonAnimationBehavior={NeonAnimationBehavior:NeonAnimationBehavior};(0,_anyApp.Polymer)({is:"fade-in-animation",behaviors:[NeonAnimationBehavior],configure:function(config){var node=config.node;this._effect=new KeyframeEffect(node,[{opacity:"0"},{opacity:"1"}],this.timingFromConfig(config));return this._effect}});(0,_anyApp.Polymer)({is:"fade-out-animation",behaviors:[NeonAnimationBehavior],configure:function(config){var node=config.node;this._effect=new KeyframeEffect(node,[{opacity:"1"},{opacity:"0"}],this.timingFromConfig(config));return this._effect}});const PaperCheckedElementBehaviorImpl={_checkedChanged:function(){IronCheckedElementBehaviorImpl._checkedChanged.call(this);if(this.hasRipple()){if(this.checked){this._ripple.setAttribute("checked","")}else{this._ripple.removeAttribute("checked")}}},_buttonStateChanged:function(){_anyApp.PaperRippleBehavior._buttonStateChanged.call(this);if(this.disabled){return}if(this.isAttached){this.checked=this.active}}};_exports.PaperCheckedElementBehaviorImpl=PaperCheckedElementBehaviorImpl;const PaperCheckedElementBehavior=[_anyApp.PaperInkyFocusBehavior,IronCheckedElementBehavior,PaperCheckedElementBehaviorImpl];_exports.PaperCheckedElementBehavior=PaperCheckedElementBehavior;_exports.$paperCheckedElementBehavior={PaperCheckedElementBehaviorImpl:PaperCheckedElementBehaviorImpl,PaperCheckedElementBehavior:PaperCheckedElementBehavior};const $_documentContainer=document.createElement("template");$_documentContainer.setAttribute("style","display: none;");$_documentContainer.innerHTML=`<dom-module id="paper-checkbox">
  <template strip-whitespace="">
    <style>
      :host {
        display: inline-block;
        white-space: nowrap;
        cursor: pointer;
        --calculated-paper-checkbox-size: var(--paper-checkbox-size, 18px);
        /* -1px is a sentinel for the default and is replaced in \`attached\`. */
        --calculated-paper-checkbox-ink-size: var(--paper-checkbox-ink-size, -1px);
        @apply --paper-font-common-base;
        line-height: 0;
        -webkit-tap-highlight-color: transparent;
      }

      :host([hidden]) {
        display: none !important;
      }

      :host(:focus) {
        outline: none;
      }

      .hidden {
        display: none;
      }

      #checkboxContainer {
        display: inline-block;
        position: relative;
        width: var(--calculated-paper-checkbox-size);
        height: var(--calculated-paper-checkbox-size);
        min-width: var(--calculated-paper-checkbox-size);
        margin: var(--paper-checkbox-margin, initial);
        vertical-align: var(--paper-checkbox-vertical-align, middle);
        background-color: var(--paper-checkbox-unchecked-background-color, transparent);
      }

      #ink {
        position: absolute;

        /* Center the ripple in the checkbox by negative offsetting it by
         * (inkWidth - rippleWidth) / 2 */
        top: calc(0px - (var(--calculated-paper-checkbox-ink-size) - var(--calculated-paper-checkbox-size)) / 2);
        left: calc(0px - (var(--calculated-paper-checkbox-ink-size) - var(--calculated-paper-checkbox-size)) / 2);
        width: var(--calculated-paper-checkbox-ink-size);
        height: var(--calculated-paper-checkbox-ink-size);
        color: var(--paper-checkbox-unchecked-ink-color, var(--primary-text-color));
        opacity: 0.6;
        pointer-events: none;
      }

      #ink:dir(rtl) {
        right: calc(0px - (var(--calculated-paper-checkbox-ink-size) - var(--calculated-paper-checkbox-size)) / 2);
        left: auto;
      }

      #ink[checked] {
        color: var(--paper-checkbox-checked-ink-color, var(--primary-color));
      }

      #checkbox {
        position: relative;
        box-sizing: border-box;
        height: 100%;
        border: solid 2px;
        border-color: var(--paper-checkbox-unchecked-color, var(--primary-text-color));
        border-radius: 2px;
        pointer-events: none;
        -webkit-transition: background-color 140ms, border-color 140ms;
        transition: background-color 140ms, border-color 140ms;
      }

      /* checkbox checked animations */
      #checkbox.checked #checkmark {
        -webkit-animation: checkmark-expand 140ms ease-out forwards;
        animation: checkmark-expand 140ms ease-out forwards;
      }

      @-webkit-keyframes checkmark-expand {
        0% {
          -webkit-transform: scale(0, 0) rotate(45deg);
        }
        100% {
          -webkit-transform: scale(1, 1) rotate(45deg);
        }
      }

      @keyframes checkmark-expand {
        0% {
          transform: scale(0, 0) rotate(45deg);
        }
        100% {
          transform: scale(1, 1) rotate(45deg);
        }
      }

      #checkbox.checked {
        background-color: var(--paper-checkbox-checked-color, var(--primary-color));
        border-color: var(--paper-checkbox-checked-color, var(--primary-color));
      }

      #checkmark {
        position: absolute;
        width: 36%;
        height: 70%;
        border-style: solid;
        border-top: none;
        border-left: none;
        border-right-width: calc(2/15 * var(--calculated-paper-checkbox-size));
        border-bottom-width: calc(2/15 * var(--calculated-paper-checkbox-size));
        border-color: var(--paper-checkbox-checkmark-color, white);
        -webkit-transform-origin: 97% 86%;
        transform-origin: 97% 86%;
        box-sizing: content-box; /* protect against page-level box-sizing */
      }

      #checkmark:dir(rtl) {
        -webkit-transform-origin: 50% 14%;
        transform-origin: 50% 14%;
      }

      /* label */
      #checkboxLabel {
        position: relative;
        display: inline-block;
        vertical-align: middle;
        padding-left: var(--paper-checkbox-label-spacing, 8px);
        white-space: normal;
        line-height: normal;
        color: var(--paper-checkbox-label-color, var(--primary-text-color));
        @apply --paper-checkbox-label;
      }

      :host([checked]) #checkboxLabel {
        color: var(--paper-checkbox-label-checked-color, var(--paper-checkbox-label-color, var(--primary-text-color)));
        @apply --paper-checkbox-label-checked;
      }

      #checkboxLabel:dir(rtl) {
        padding-right: var(--paper-checkbox-label-spacing, 8px);
        padding-left: 0;
      }

      #checkboxLabel[hidden] {
        display: none;
      }

      /* disabled state */

      :host([disabled]) #checkbox {
        opacity: 0.5;
        border-color: var(--paper-checkbox-unchecked-color, var(--primary-text-color));
      }

      :host([disabled][checked]) #checkbox {
        background-color: var(--paper-checkbox-unchecked-color, var(--primary-text-color));
        opacity: 0.5;
      }

      :host([disabled]) #checkboxLabel  {
        opacity: 0.65;
      }

      /* invalid state */
      #checkbox.invalid:not(.checked) {
        border-color: var(--paper-checkbox-error-color, var(--error-color));
      }
    </style>

    <div id="checkboxContainer">
      <div id="checkbox" class\$="[[_computeCheckboxClass(checked, invalid)]]">
        <div id="checkmark" class\$="[[_computeCheckmarkClass(checked)]]"></div>
      </div>
    </div>

    <div id="checkboxLabel"><slot></slot></div>
  </template>

  
</dom-module>`;document.head.appendChild($_documentContainer.content);(0,_anyApp.Polymer)({is:"paper-checkbox",behaviors:[PaperCheckedElementBehavior],hostAttributes:{role:"checkbox","aria-checked":!1,tabindex:0},properties:{ariaActiveAttribute:{type:String,value:"aria-checked"}},attached:function(){(0,_anyApp.afterNextRender)(this,function(){var inkSize=this.getComputedStyleValue("--calculated-paper-checkbox-ink-size").trim();if("-1px"===inkSize){var checkboxSizeText=this.getComputedStyleValue("--calculated-paper-checkbox-size").trim(),units="px",unitsMatches=checkboxSizeText.match(/[A-Za-z]+$/);if(null!==unitsMatches){units=unitsMatches[0]}var checkboxSize=parseFloat(checkboxSizeText),defaultInkSize=8/3*checkboxSize;if("px"===units){defaultInkSize=_Mathfloor(defaultInkSize);if(defaultInkSize%2!==checkboxSize%2){defaultInkSize++}}this.updateStyles({"--paper-checkbox-ink-size":defaultInkSize+units})}})},_computeCheckboxClass:function(checked,invalid){var className="";if(checked){className+="checked "}if(invalid){className+="invalid"}return className},_computeCheckmarkClass:function(checked){return checked?"":"hidden"},_createRipple:function(){this._rippleContainer=this.$.checkboxContainer;return _anyApp.PaperInkyFocusBehaviorImpl._createRipple.call(this)}});const PaperDialogBehaviorImpl={hostAttributes:{role:"dialog",tabindex:"-1"},properties:{modal:{type:Boolean,value:!1},__readied:{type:Boolean,value:!1}},observers:["_modalChanged(modal, __readied)"],listeners:{tap:"_onDialogClick"},ready:function(){this.__prevNoCancelOnOutsideClick=this.noCancelOnOutsideClick;this.__prevNoCancelOnEscKey=this.noCancelOnEscKey;this.__prevWithBackdrop=this.withBackdrop;this.__readied=!0},_modalChanged:function(modal,readied){if(!readied){return}if(modal){this.__prevNoCancelOnOutsideClick=this.noCancelOnOutsideClick;this.__prevNoCancelOnEscKey=this.noCancelOnEscKey;this.__prevWithBackdrop=this.withBackdrop;this.noCancelOnOutsideClick=!0;this.noCancelOnEscKey=!0;this.withBackdrop=!0}else{this.noCancelOnOutsideClick=this.noCancelOnOutsideClick&&this.__prevNoCancelOnOutsideClick;this.noCancelOnEscKey=this.noCancelOnEscKey&&this.__prevNoCancelOnEscKey;this.withBackdrop=this.withBackdrop&&this.__prevWithBackdrop}},_updateClosingReasonConfirmed:function(confirmed){this.closingReason=this.closingReason||{};this.closingReason.confirmed=confirmed},_onDialogClick:function(event){for(var path=(0,_anyApp.dom)(event).path,i=0,l=path.indexOf(this),target;i<l;i++){target=path[i];if(target.hasAttribute&&(target.hasAttribute("dialog-dismiss")||target.hasAttribute("dialog-confirm"))){this._updateClosingReasonConfirmed(target.hasAttribute("dialog-confirm"));this.close();event.stopPropagation();break}}}};_exports.PaperDialogBehaviorImpl=PaperDialogBehaviorImpl;const PaperDialogBehavior=[IronOverlayBehavior,PaperDialogBehaviorImpl];_exports.PaperDialogBehavior=PaperDialogBehavior;_exports.$paperDialogBehavior={PaperDialogBehaviorImpl:PaperDialogBehaviorImpl,PaperDialogBehavior:PaperDialogBehavior};const $_documentContainer$1=document.createElement("template");$_documentContainer$1.setAttribute("style","display: none;");$_documentContainer$1.innerHTML=`<dom-module id="paper-dialog-shared-styles">
  <template>
    <style>
      :host {
        display: block;
        margin: 24px 40px;

        background: var(--paper-dialog-background-color, var(--primary-background-color));
        color: var(--paper-dialog-color, var(--primary-text-color));

        @apply --paper-font-body1;
        @apply --shadow-elevation-16dp;
        @apply --paper-dialog;
      }

      :host > ::slotted(*) {
        margin-top: 20px;
        padding: 0 24px;
      }

      :host > ::slotted(.no-padding) {
        padding: 0;
      }

      
      :host > ::slotted(*:first-child) {
        margin-top: 24px;
      }

      :host > ::slotted(*:last-child) {
        margin-bottom: 24px;
      }

      /* In 1.x, this selector was \`:host > ::content h2\`. In 2.x <slot> allows
      to select direct children only, which increases the weight of this
      selector, so we have to re-define first-child/last-child margins below. */
      :host > ::slotted(h2) {
        position: relative;
        margin: 0;

        @apply --paper-font-title;
        @apply --paper-dialog-title;
      }

      /* Apply mixin again, in case it sets margin-top. */
      :host > ::slotted(h2:first-child) {
        margin-top: 24px;
        @apply --paper-dialog-title;
      }

      /* Apply mixin again, in case it sets margin-bottom. */
      :host > ::slotted(h2:last-child) {
        margin-bottom: 24px;
        @apply --paper-dialog-title;
      }

      :host > ::slotted(.paper-dialog-buttons),
      :host > ::slotted(.buttons) {
        position: relative;
        padding: 8px 8px 8px 24px;
        margin: 0;

        color: var(--paper-dialog-button-color, var(--primary-color));

        @apply --layout-horizontal;
        @apply --layout-end-justified;
      }
    </style>
  </template>
</dom-module>`;document.head.appendChild($_documentContainer$1.content);(0,_anyApp.Polymer)({_template:_anyApp.html$1`
    <style>

      :host {
        display: block;
        @apply --layout-relative;
      }

      :host(.is-scrolled:not(:first-child))::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 1px;
        background: var(--divider-color);
      }

      :host(.can-scroll:not(.scrolled-to-bottom):not(:last-child))::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 1px;
        background: var(--divider-color);
      }

      .scrollable {
        padding: 0 24px;

        @apply --layout-scroll;
        @apply --paper-dialog-scrollable;
      }

      .fit {
        @apply --layout-fit;
      }
    </style>

    <div id="scrollable" class="scrollable" on-scroll="updateScrollState">
      <slot></slot>
    </div>
`,is:"paper-dialog-scrollable",properties:{dialogElement:{type:Object}},get scrollTarget(){return this.$.scrollable},ready:function(){this._ensureTarget();this.classList.add("no-padding")},attached:function(){this._ensureTarget();requestAnimationFrame(this.updateScrollState.bind(this))},updateScrollState:function(){this.toggleClass("is-scrolled",0<this.scrollTarget.scrollTop);this.toggleClass("can-scroll",this.scrollTarget.offsetHeight<this.scrollTarget.scrollHeight);this.toggleClass("scrolled-to-bottom",this.scrollTarget.scrollTop+this.scrollTarget.offsetHeight>=this.scrollTarget.scrollHeight)},_ensureTarget:function(){this.dialogElement=this.dialogElement||this.parentElement;if(this.dialogElement&&this.dialogElement.behaviors&&0<=this.dialogElement.behaviors.indexOf(PaperDialogBehaviorImpl)){this.dialogElement.sizingTarget=this.scrollTarget;this.scrollTarget.classList.remove("fit")}else if(this.dialogElement){this.scrollTarget.classList.add("fit")}}});(0,_anyApp.Polymer)({_template:_anyApp.html$1`
    <style include="paper-dialog-shared-styles"></style>
    <slot></slot>
`,is:"paper-dialog",behaviors:[PaperDialogBehavior,NeonAnimationRunnerBehavior],listeners:{"neon-animation-finish":"_onNeonAnimationFinish"},_renderOpened:function(){this.cancelAnimation();this.playAnimation("entry")},_renderClosed:function(){this.cancelAnimation();this.playAnimation("exit")},_onNeonAnimationFinish:function(){if(this.opened){this._finishRenderOpened()}else{this._finishRenderClosed()}}});const $_documentContainer$2=document.createElement("template");$_documentContainer$2.setAttribute("style","display: none;");$_documentContainer$2.innerHTML=`<iron-iconset-svg name="paper-dropdown-menu" size="24">
<svg><defs>
<g id="arrow-drop-down"><path d="M7 10l5 5 5-5z"></path></g>
</defs></svg>
</iron-iconset-svg>`;document.head.appendChild($_documentContainer$2.content);const $_documentContainer$3=document.createElement("template");$_documentContainer$3.setAttribute("style","display: none;");$_documentContainer$3.innerHTML=`<dom-module id="paper-dropdown-menu-shared-styles">
  <template>
    <style>
      :host {
        display: inline-block;
        position: relative;
        text-align: left;

        /* NOTE(cdata): Both values are needed, since some phones require the
         * value to be \`transparent\`.
         */
        -webkit-tap-highlight-color: rgba(0,0,0,0);
        -webkit-tap-highlight-color: transparent;

        --paper-input-container-input: {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          max-width: 100%;
          box-sizing: border-box;
          cursor: pointer;
        };

        @apply --paper-dropdown-menu;
      }

      :host([disabled]) {
        @apply --paper-dropdown-menu-disabled;
      }

      :host([noink]) paper-ripple {
        display: none;
      }

      :host([no-label-float]) paper-ripple {
        top: 8px;
      }

      paper-ripple {
        top: 12px;
        left: 0px;
        bottom: 8px;
        right: 0px;

        @apply --paper-dropdown-menu-ripple;
      }

      paper-menu-button {
        display: block;
        padding: 0;

        @apply --paper-dropdown-menu-button;
      }

      paper-input {
        @apply --paper-dropdown-menu-input;
      }

      iron-icon {
        color: var(--disabled-text-color);

        @apply --paper-dropdown-menu-icon;
      }
    </style>
  </template>
</dom-module>`;document.head.appendChild($_documentContainer$3.content);(0,_anyApp.Polymer)({is:"paper-menu-grow-height-animation",behaviors:[NeonAnimationBehavior],configure:function(config){var node=config.node,rect=node.getBoundingClientRect(),height=rect.height;this._effect=new KeyframeEffect(node,[{height:height/2+"px"},{height:height+"px"}],this.timingFromConfig(config));return this._effect}});(0,_anyApp.Polymer)({is:"paper-menu-grow-width-animation",behaviors:[NeonAnimationBehavior],configure:function(config){var node=config.node,rect=node.getBoundingClientRect(),width=rect.width;this._effect=new KeyframeEffect(node,[{width:width/2+"px"},{width:width+"px"}],this.timingFromConfig(config));return this._effect}});(0,_anyApp.Polymer)({is:"paper-menu-shrink-width-animation",behaviors:[NeonAnimationBehavior],configure:function(config){var node=config.node,rect=node.getBoundingClientRect(),width=rect.width;this._effect=new KeyframeEffect(node,[{width:width+"px"},{width:width-width/20+"px"}],this.timingFromConfig(config));return this._effect}});(0,_anyApp.Polymer)({is:"paper-menu-shrink-height-animation",behaviors:[NeonAnimationBehavior],configure:function(config){var node=config.node,rect=node.getBoundingClientRect(),height=rect.height;this.setPrefixedProperty(node,"transformOrigin","0 0");this._effect=new KeyframeEffect(node,[{height:height+"px",transform:"translateY(0)"},{height:height/2+"px",transform:"translateY(-20px)"}],this.timingFromConfig(config));return this._effect}});var config={ANIMATION_CUBIC_BEZIER:"cubic-bezier(.3,.95,.5,1)",MAX_ANIMATION_TIME_MS:400};const PaperMenuButton=(0,_anyApp.Polymer)({_template:_anyApp.html$1`
    <style>
      :host {
        display: inline-block;
        position: relative;
        padding: 8px;
        outline: none;

        @apply --paper-menu-button;
      }

      :host([disabled]) {
        cursor: auto;
        color: var(--disabled-text-color);

        @apply --paper-menu-button-disabled;
      }

      iron-dropdown {
        @apply --paper-menu-button-dropdown;
      }

      .dropdown-content {
        @apply --shadow-elevation-2dp;

        position: relative;
        border-radius: 2px;
        background-color: var(--paper-menu-button-dropdown-background, var(--primary-background-color));

        @apply --paper-menu-button-content;
      }

      :host([vertical-align="top"]) .dropdown-content {
        margin-bottom: 20px;
        margin-top: -10px;
        top: 10px;
      }

      :host([vertical-align="bottom"]) .dropdown-content {
        bottom: 10px;
        margin-bottom: -10px;
        margin-top: 20px;
      }

      #trigger {
        cursor: pointer;
      }
    </style>

    <div id="trigger" on-tap="toggle">
      <slot name="dropdown-trigger"></slot>
    </div>

    <iron-dropdown id="dropdown" opened="{{opened}}" horizontal-align="[[horizontalAlign]]" vertical-align="[[verticalAlign]]" dynamic-align="[[dynamicAlign]]" horizontal-offset="[[horizontalOffset]]" vertical-offset="[[verticalOffset]]" no-overlap="[[noOverlap]]" open-animation-config="[[openAnimationConfig]]" close-animation-config="[[closeAnimationConfig]]" no-animations="[[noAnimations]]" focus-target="[[_dropdownContent]]" allow-outside-scroll="[[allowOutsideScroll]]" restore-focus-on-close="[[restoreFocusOnClose]]" on-iron-overlay-canceled="__onIronOverlayCanceled">
      <div slot="dropdown-content" class="dropdown-content">
        <slot id="content" name="dropdown-content"></slot>
      </div>
    </iron-dropdown>
`,is:"paper-menu-button",behaviors:[_anyApp.IronA11yKeysBehavior,_anyApp.IronControlState],properties:{opened:{type:Boolean,value:!1,notify:!0,observer:"_openedChanged"},horizontalAlign:{type:String,value:"left",reflectToAttribute:!0},verticalAlign:{type:String,value:"top",reflectToAttribute:!0},dynamicAlign:{type:Boolean},horizontalOffset:{type:Number,value:0,notify:!0},verticalOffset:{type:Number,value:0,notify:!0},noOverlap:{type:Boolean},noAnimations:{type:Boolean,value:!1},ignoreSelect:{type:Boolean,value:!1},closeOnActivate:{type:Boolean,value:!1},openAnimationConfig:{type:Object,value:function(){return[{name:"fade-in-animation",timing:{delay:100,duration:200}},{name:"paper-menu-grow-width-animation",timing:{delay:100,duration:150,easing:config.ANIMATION_CUBIC_BEZIER}},{name:"paper-menu-grow-height-animation",timing:{delay:100,duration:275,easing:config.ANIMATION_CUBIC_BEZIER}}]}},closeAnimationConfig:{type:Object,value:function(){return[{name:"fade-out-animation",timing:{duration:150}},{name:"paper-menu-shrink-width-animation",timing:{delay:100,duration:50,easing:config.ANIMATION_CUBIC_BEZIER}},{name:"paper-menu-shrink-height-animation",timing:{duration:200,easing:"ease-in"}}]}},allowOutsideScroll:{type:Boolean,value:!1},restoreFocusOnClose:{type:Boolean,value:!0},_dropdownContent:{type:Object}},hostAttributes:{role:"group","aria-haspopup":"true"},listeners:{"iron-activate":"_onIronActivate","iron-select":"_onIronSelect"},get contentElement(){for(var nodes=(0,_anyApp.dom)(this.$.content).getDistributedNodes(),i=0,l=nodes.length;i<l;i++){if(nodes[i].nodeType===Node.ELEMENT_NODE){return nodes[i]}}},toggle:function(){if(this.opened){this.close()}else{this.open()}},open:function(){if(this.disabled){return}this.$.dropdown.open()},close:function(){this.$.dropdown.close()},_onIronSelect:function(){if(!this.ignoreSelect){this.close()}},_onIronActivate:function(){if(this.closeOnActivate){this.close()}},_openedChanged:function(opened,oldOpened){if(opened){this._dropdownContent=this.contentElement;this.fire("paper-dropdown-open")}else if(null!=oldOpened){this.fire("paper-dropdown-close")}},_disabledChanged:function(disabled){_anyApp.IronControlState._disabledChanged.apply(this,arguments);if(disabled&&this.opened){this.close()}},__onIronOverlayCanceled:function(event){var uiEvent=event.detail,trigger=this.$.trigger,path=(0,_anyApp.dom)(uiEvent).path;if(-1<path.indexOf(trigger)){event.preventDefault()}}});_exports.PaperMenuButton=PaperMenuButton;Object.keys(config).forEach(function(key){PaperMenuButton[key]=config[key]});_exports.$paperMenuButton={PaperMenuButton:PaperMenuButton};(0,_anyApp.Polymer)({_template:_anyApp.html$1`
    <style include="paper-dropdown-menu-shared-styles"></style>

    <!-- this div fulfills an a11y requirement for combobox, do not remove -->
    <span role="button"></span>
    <paper-menu-button id="menuButton" vertical-align="[[verticalAlign]]" horizontal-align="[[horizontalAlign]]" dynamic-align="[[dynamicAlign]]" vertical-offset="[[_computeMenuVerticalOffset(noLabelFloat, verticalOffset)]]" disabled="[[disabled]]" no-animations="[[noAnimations]]" on-iron-select="_onIronSelect" on-iron-deselect="_onIronDeselect" opened="{{opened}}" close-on-activate="" allow-outside-scroll="[[allowOutsideScroll]]" restore-focus-on-close="[[restoreFocusOnClose]]">
      <!-- support hybrid mode: user might be using paper-menu-button 1.x which distributes via <content> -->
      <div class="dropdown-trigger" slot="dropdown-trigger">
        <paper-ripple></paper-ripple>
        <!-- paper-input has type="text" for a11y, do not remove -->
        <paper-input type="text" invalid="[[invalid]]" readonly="" disabled="[[disabled]]" value="[[value]]" placeholder="[[placeholder]]" error-message="[[errorMessage]]" always-float-label="[[alwaysFloatLabel]]" no-label-float="[[noLabelFloat]]" label="[[label]]">
          <!-- support hybrid mode: user might be using paper-input 1.x which distributes via <content> -->
          <iron-icon icon="paper-dropdown-menu:arrow-drop-down" suffix="" slot="suffix"></iron-icon>
        </paper-input>
      </div>
      <slot id="content" name="dropdown-content" slot="dropdown-content"></slot>
    </paper-menu-button>
`,is:"paper-dropdown-menu",behaviors:[_anyApp.IronButtonState,_anyApp.IronControlState,_anyApp.IronFormElementBehavior,_anyApp.IronValidatableBehavior],properties:{selectedItemLabel:{type:String,notify:!0,readOnly:!0},selectedItem:{type:Object,notify:!0,readOnly:!0},value:{type:String,notify:!0},label:{type:String},placeholder:{type:String},errorMessage:{type:String},opened:{type:Boolean,notify:!0,value:!1,observer:"_openedChanged"},allowOutsideScroll:{type:Boolean,value:!1},noLabelFloat:{type:Boolean,value:!1,reflectToAttribute:!0},alwaysFloatLabel:{type:Boolean,value:!1},noAnimations:{type:Boolean,value:!1},horizontalAlign:{type:String,value:"right"},verticalAlign:{type:String,value:"top"},verticalOffset:Number,dynamicAlign:{type:Boolean},restoreFocusOnClose:{type:Boolean,value:!0}},listeners:{tap:"_onTap"},keyBindings:{"up down":"open",esc:"close"},hostAttributes:{role:"combobox","aria-autocomplete":"none","aria-haspopup":"true"},observers:["_selectedItemChanged(selectedItem)"],attached:function(){var contentElement=this.contentElement;if(contentElement&&contentElement.selectedItem){this._setSelectedItem(contentElement.selectedItem)}},get contentElement(){for(var nodes=(0,_anyApp.dom)(this.$.content).getDistributedNodes(),i=0,l=nodes.length;i<l;i++){if(nodes[i].nodeType===Node.ELEMENT_NODE){return nodes[i]}}},open:function(){this.$.menuButton.open()},close:function(){this.$.menuButton.close()},_onIronSelect:function(event){this._setSelectedItem(event.detail.item)},_onIronDeselect:function(){this._setSelectedItem(null)},_onTap:function(event){if((0,_anyApp.findOriginalTarget)(event)===this){this.open()}},_selectedItemChanged:function(selectedItem){var value="";if(!selectedItem){value=""}else{value=selectedItem.label||selectedItem.getAttribute("label")||selectedItem.textContent.trim()}this.value=value;this._setSelectedItemLabel(value)},_computeMenuVerticalOffset:function(noLabelFloat,opt_verticalOffset){if(opt_verticalOffset){return opt_verticalOffset}return noLabelFloat?-4:8},_getValidity:function(){return this.disabled||!this.required||this.required&&!!this.value},_openedChanged:function(){var openState=this.opened?"true":"false",e=this.contentElement;if(e){e.setAttribute("aria-expanded",openState)}}});const $_documentContainer$4=document.createElement("template");$_documentContainer$4.setAttribute("style","display: none;");$_documentContainer$4.innerHTML=`<dom-module id="paper-fab">
  <template strip-whitespace="">
    <style include="paper-material-styles">
      :host {
        @apply --layout-vertical;
        @apply --layout-center-center;

        background: var(--paper-fab-background, var(--accent-color));
        border-radius: 50%;
        box-sizing: border-box;
        color: var(--text-primary-color);
        cursor: pointer;
        height: 56px;
        min-width: 0;
        outline: none;
        padding: 16px;
        position: relative;
        -moz-user-select: none;
        -ms-user-select: none;
        -webkit-user-select: none;
        user-select: none;
        width: 56px;
        z-index: 0;

        /* NOTE: Both values are needed, since some phones require the value \`transparent\`. */
        -webkit-tap-highlight-color: rgba(0,0,0,0);
        -webkit-tap-highlight-color: transparent;

        @apply --paper-fab;
      }

      [hidden] {
        display: none !important;
      }

      :host([mini]) {
        width: 40px;
        height: 40px;
        padding: 8px;

        @apply --paper-fab-mini;
      }

      :host([disabled]) {
        color: var(--paper-fab-disabled-text, var(--paper-grey-500));
        background: var(--paper-fab-disabled-background, var(--paper-grey-300));

        @apply --paper-fab-disabled;
      }

      iron-icon {
        @apply --paper-fab-iron-icon;
      }

      span {
        width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        text-align: center;

        @apply --paper-fab-label;
      }

      :host(.keyboard-focus) {
        background: var(--paper-fab-keyboard-focus-background, var(--paper-pink-900));
      }

      :host([elevation="1"]) {
        @apply --paper-material-elevation-1;
      }

      :host([elevation="2"]) {
        @apply --paper-material-elevation-2;
      }

      :host([elevation="3"]) {
        @apply --paper-material-elevation-3;
      }

      :host([elevation="4"]) {
        @apply --paper-material-elevation-4;
      }

      :host([elevation="5"]) {
        @apply --paper-material-elevation-5;
      }
    </style>

    <iron-icon id="icon" hidden\$="{{!_computeIsIconFab(icon, src)}}" src="[[src]]" icon="[[icon]]"></iron-icon>
    <span hidden\$="{{_computeIsIconFab(icon, src)}}">{{label}}</span>
  </template>

  
</dom-module>`;document.head.appendChild($_documentContainer$4.content);(0,_anyApp.Polymer)({is:"paper-fab",behaviors:[_anyApp.PaperButtonBehavior],properties:{src:{type:String,value:""},icon:{type:String,value:""},mini:{type:Boolean,value:!1,reflectToAttribute:!0},label:{type:String,observer:"_labelChanged"}},_labelChanged:function(){this.setAttribute("aria-label",this.label)},_computeIsIconFab:function(icon,src){return 0<icon.length||0<src.length}});const PaperItemBehaviorImpl={hostAttributes:{role:"option",tabindex:"0"}};_exports.PaperItemBehaviorImpl=PaperItemBehaviorImpl;const PaperItemBehavior=[_anyApp.IronButtonState,_anyApp.IronControlState,PaperItemBehaviorImpl];_exports.PaperItemBehavior=PaperItemBehavior;_exports.$paperItemBehavior={PaperItemBehaviorImpl:PaperItemBehaviorImpl,PaperItemBehavior:PaperItemBehavior};const $_documentContainer$5=document.createElement("template");$_documentContainer$5.setAttribute("style","display: none;");$_documentContainer$5.innerHTML=`<dom-module id="paper-item-shared-styles">
  <template>
    <style>
      :host, .paper-item {
        display: block;
        position: relative;
        min-height: var(--paper-item-min-height, 48px);
        padding: 0px 16px;
      }

      .paper-item {
        @apply --paper-font-subhead;
        border:none;
        outline: none;
        background: white;
        width: 100%;
        text-align: left;
      }

      :host([hidden]), .paper-item[hidden] {
        display: none !important;
      }

      :host(.iron-selected), .paper-item.iron-selected {
        font-weight: var(--paper-item-selected-weight, bold);

        @apply --paper-item-selected;
      }

      :host([disabled]), .paper-item[disabled] {
        color: var(--paper-item-disabled-color, var(--disabled-text-color));

        @apply --paper-item-disabled;
      }

      :host(:focus), .paper-item:focus {
        position: relative;
        outline: 0;

        @apply --paper-item-focused;
      }

      :host(:focus):before, .paper-item:focus:before {
        @apply --layout-fit;

        background: currentColor;
        content: '';
        opacity: var(--dark-divider-opacity);
        pointer-events: none;

        @apply --paper-item-focused-before;
      }
    </style>
  </template>
</dom-module>`;document.head.appendChild($_documentContainer$5.content);(0,_anyApp.Polymer)({_template:_anyApp.html$1`
    <style include="paper-item-shared-styles">
      :host {
        @apply --layout-horizontal;
        @apply --layout-center;
        @apply --paper-font-subhead;

        @apply --paper-item;
      }
    </style>
    <slot></slot>
`,is:"paper-item",behaviors:[PaperItemBehavior]});(0,_anyApp.Polymer)({_template:_anyApp.html$1`
    <style>
      :host {
        display: block;
        padding: 8px 0;

        background: var(--paper-listbox-background-color, var(--primary-background-color));
        color: var(--paper-listbox-color, var(--primary-text-color));

        @apply --paper-listbox;
      }
    </style>

    <slot></slot>
`,is:"paper-listbox",behaviors:[_anyApp.IronMenuBehavior],hostAttributes:{role:"listbox"}});const PaperSpinnerBehavior={properties:{active:{type:Boolean,value:!1,reflectToAttribute:!0,observer:"__activeChanged"},alt:{type:String,value:"loading",observer:"__altChanged"},__coolingDown:{type:Boolean,value:!1}},__computeContainerClasses:function(active,coolingDown){return[active||coolingDown?"active":"",coolingDown?"cooldown":""].join(" ")},__activeChanged:function(active,old){this.__setAriaHidden(!active);this.__coolingDown=!active&&old},__altChanged:function(alt){if("loading"===alt){this.alt=this.getAttribute("aria-label")||alt}else{this.__setAriaHidden(""===alt);this.setAttribute("aria-label",alt)}},__setAriaHidden:function(hidden){var attr="aria-hidden";if(hidden){this.setAttribute(attr,"true")}else{this.removeAttribute(attr)}},__reset:function(){this.active=!1;this.__coolingDown=!1}};_exports.PaperSpinnerBehavior=PaperSpinnerBehavior;_exports.$paperSpinnerBehavior={PaperSpinnerBehavior:PaperSpinnerBehavior};const $_documentContainer$6=document.createElement("template");$_documentContainer$6.setAttribute("style","display: none;");$_documentContainer$6.innerHTML=`<dom-module id="paper-spinner-styles">
  <template>
    <style>
      /*
      /**************************/
      /* STYLES FOR THE SPINNER */
      /**************************/

      /*
       * Constants:
       *      ARCSIZE     = 270 degrees (amount of circle the arc takes up)
       *      ARCTIME     = 1333ms (time it takes to expand and contract arc)
       *      ARCSTARTROT = 216 degrees (how much the start location of the arc
       *                                should rotate each time, 216 gives us a
       *                                5 pointed star shape (it's 360/5 * 3).
       *                                For a 7 pointed star, we might do
       *                                360/7 * 3 = 154.286)
       *      SHRINK_TIME = 400ms
       */

      :host {
        display: inline-block;
        position: relative;
        width: 28px;
        height: 28px;

        /* 360 * ARCTIME / (ARCSTARTROT + (360-ARCSIZE)) */
        --paper-spinner-container-rotation-duration: 1568ms;

        /* ARCTIME */
        --paper-spinner-expand-contract-duration: 1333ms;

        /* 4 * ARCTIME */
        --paper-spinner-full-cycle-duration: 5332ms;

        /* SHRINK_TIME */
        --paper-spinner-cooldown-duration: 400ms;
      }

      #spinnerContainer {
        width: 100%;
        height: 100%;

        /* The spinner does not have any contents that would have to be
         * flipped if the direction changes. Always use ltr so that the
         * style works out correctly in both cases. */
        direction: ltr;
      }

      #spinnerContainer.active {
        -webkit-animation: container-rotate var(--paper-spinner-container-rotation-duration) linear infinite;
        animation: container-rotate var(--paper-spinner-container-rotation-duration) linear infinite;
      }

      @-webkit-keyframes container-rotate {
        to { -webkit-transform: rotate(360deg) }
      }

      @keyframes container-rotate {
        to { transform: rotate(360deg) }
      }

      .spinner-layer {
        position: absolute;
        width: 100%;
        height: 100%;
        opacity: 0;
        white-space: nowrap;
        color: var(--paper-spinner-color, var(--google-blue-500));
      }

      .layer-1 {
        color: var(--paper-spinner-layer-1-color, var(--google-blue-500));
      }

      .layer-2 {
        color: var(--paper-spinner-layer-2-color, var(--google-red-500));
      }

      .layer-3 {
        color: var(--paper-spinner-layer-3-color, var(--google-yellow-500));
      }

      .layer-4 {
        color: var(--paper-spinner-layer-4-color, var(--google-green-500));
      }

      /**
       * IMPORTANT NOTE ABOUT CSS ANIMATION PROPERTIES (keanulee):
       *
       * iOS Safari (tested on iOS 8.1) does not handle animation-delay very well - it doesn't
       * guarantee that the animation will start _exactly_ after that value. So we avoid using
       * animation-delay and instead set custom keyframes for each color (as layer-2undant as it
       * seems).
       */
      .active .spinner-layer {
        -webkit-animation-name: fill-unfill-rotate;
        -webkit-animation-duration: var(--paper-spinner-full-cycle-duration);
        -webkit-animation-timing-function: cubic-bezier(0.4, 0.0, 0.2, 1);
        -webkit-animation-iteration-count: infinite;
        animation-name: fill-unfill-rotate;
        animation-duration: var(--paper-spinner-full-cycle-duration);
        animation-timing-function: cubic-bezier(0.4, 0.0, 0.2, 1);
        animation-iteration-count: infinite;
        opacity: 1;
      }

      .active .spinner-layer.layer-1 {
        -webkit-animation-name: fill-unfill-rotate, layer-1-fade-in-out;
        animation-name: fill-unfill-rotate, layer-1-fade-in-out;
      }

      .active .spinner-layer.layer-2 {
        -webkit-animation-name: fill-unfill-rotate, layer-2-fade-in-out;
        animation-name: fill-unfill-rotate, layer-2-fade-in-out;
      }

      .active .spinner-layer.layer-3 {
        -webkit-animation-name: fill-unfill-rotate, layer-3-fade-in-out;
        animation-name: fill-unfill-rotate, layer-3-fade-in-out;
      }

      .active .spinner-layer.layer-4 {
        -webkit-animation-name: fill-unfill-rotate, layer-4-fade-in-out;
        animation-name: fill-unfill-rotate, layer-4-fade-in-out;
      }

      @-webkit-keyframes fill-unfill-rotate {
        12.5% { -webkit-transform: rotate(135deg) } /* 0.5 * ARCSIZE */
        25%   { -webkit-transform: rotate(270deg) } /* 1   * ARCSIZE */
        37.5% { -webkit-transform: rotate(405deg) } /* 1.5 * ARCSIZE */
        50%   { -webkit-transform: rotate(540deg) } /* 2   * ARCSIZE */
        62.5% { -webkit-transform: rotate(675deg) } /* 2.5 * ARCSIZE */
        75%   { -webkit-transform: rotate(810deg) } /* 3   * ARCSIZE */
        87.5% { -webkit-transform: rotate(945deg) } /* 3.5 * ARCSIZE */
        to    { -webkit-transform: rotate(1080deg) } /* 4   * ARCSIZE */
      }

      @keyframes fill-unfill-rotate {
        12.5% { transform: rotate(135deg) } /* 0.5 * ARCSIZE */
        25%   { transform: rotate(270deg) } /* 1   * ARCSIZE */
        37.5% { transform: rotate(405deg) } /* 1.5 * ARCSIZE */
        50%   { transform: rotate(540deg) } /* 2   * ARCSIZE */
        62.5% { transform: rotate(675deg) } /* 2.5 * ARCSIZE */
        75%   { transform: rotate(810deg) } /* 3   * ARCSIZE */
        87.5% { transform: rotate(945deg) } /* 3.5 * ARCSIZE */
        to    { transform: rotate(1080deg) } /* 4   * ARCSIZE */
      }

      @-webkit-keyframes layer-1-fade-in-out {
        0% { opacity: 1 }
        25% { opacity: 1 }
        26% { opacity: 0 }
        89% { opacity: 0 }
        90% { opacity: 1 }
        to { opacity: 1 }
      }

      @keyframes layer-1-fade-in-out {
        0% { opacity: 1 }
        25% { opacity: 1 }
        26% { opacity: 0 }
        89% { opacity: 0 }
        90% { opacity: 1 }
        to { opacity: 1 }
      }

      @-webkit-keyframes layer-2-fade-in-out {
        0% { opacity: 0 }
        15% { opacity: 0 }
        25% { opacity: 1 }
        50% { opacity: 1 }
        51% { opacity: 0 }
        to { opacity: 0 }
      }

      @keyframes layer-2-fade-in-out {
        0% { opacity: 0 }
        15% { opacity: 0 }
        25% { opacity: 1 }
        50% { opacity: 1 }
        51% { opacity: 0 }
        to { opacity: 0 }
      }

      @-webkit-keyframes layer-3-fade-in-out {
        0% { opacity: 0 }
        40% { opacity: 0 }
        50% { opacity: 1 }
        75% { opacity: 1 }
        76% { opacity: 0 }
        to { opacity: 0 }
      }

      @keyframes layer-3-fade-in-out {
        0% { opacity: 0 }
        40% { opacity: 0 }
        50% { opacity: 1 }
        75% { opacity: 1 }
        76% { opacity: 0 }
        to { opacity: 0 }
      }

      @-webkit-keyframes layer-4-fade-in-out {
        0% { opacity: 0 }
        65% { opacity: 0 }
        75% { opacity: 1 }
        90% { opacity: 1 }
        to { opacity: 0 }
      }

      @keyframes layer-4-fade-in-out {
        0% { opacity: 0 }
        65% { opacity: 0 }
        75% { opacity: 1 }
        90% { opacity: 1 }
        to { opacity: 0 }
      }

      .circle-clipper {
        display: inline-block;
        position: relative;
        width: 50%;
        height: 100%;
        overflow: hidden;
      }

      /**
       * Patch the gap that appear between the two adjacent div.circle-clipper while the
       * spinner is rotating (appears on Chrome 50, Safari 9.1.1, and Edge).
       */
      .spinner-layer::after {
        left: 45%;
        width: 10%;
        border-top-style: solid;
      }

      .spinner-layer::after,
      .circle-clipper::after {
        content: '';
        box-sizing: border-box;
        position: absolute;
        top: 0;
        border-width: var(--paper-spinner-stroke-width, 3px);
        border-radius: 50%;
      }

      .circle-clipper::after {
        bottom: 0;
        width: 200%;
        border-style: solid;
        border-bottom-color: transparent !important;
      }

      .circle-clipper.left::after {
        left: 0;
        border-right-color: transparent !important;
        -webkit-transform: rotate(129deg);
        transform: rotate(129deg);
      }

      .circle-clipper.right::after {
        left: -100%;
        border-left-color: transparent !important;
        -webkit-transform: rotate(-129deg);
        transform: rotate(-129deg);
      }

      .active .gap-patch::after,
      .active .circle-clipper::after {
        -webkit-animation-duration: var(--paper-spinner-expand-contract-duration);
        -webkit-animation-timing-function: cubic-bezier(0.4, 0.0, 0.2, 1);
        -webkit-animation-iteration-count: infinite;
        animation-duration: var(--paper-spinner-expand-contract-duration);
        animation-timing-function: cubic-bezier(0.4, 0.0, 0.2, 1);
        animation-iteration-count: infinite;
      }

      .active .circle-clipper.left::after {
        -webkit-animation-name: left-spin;
        animation-name: left-spin;
      }

      .active .circle-clipper.right::after {
        -webkit-animation-name: right-spin;
        animation-name: right-spin;
      }

      @-webkit-keyframes left-spin {
        0% { -webkit-transform: rotate(130deg) }
        50% { -webkit-transform: rotate(-5deg) }
        to { -webkit-transform: rotate(130deg) }
      }

      @keyframes left-spin {
        0% { transform: rotate(130deg) }
        50% { transform: rotate(-5deg) }
        to { transform: rotate(130deg) }
      }

      @-webkit-keyframes right-spin {
        0% { -webkit-transform: rotate(-130deg) }
        50% { -webkit-transform: rotate(5deg) }
        to { -webkit-transform: rotate(-130deg) }
      }

      @keyframes right-spin {
        0% { transform: rotate(-130deg) }
        50% { transform: rotate(5deg) }
        to { transform: rotate(-130deg) }
      }

      #spinnerContainer.cooldown {
        -webkit-animation: container-rotate var(--paper-spinner-container-rotation-duration) linear infinite, fade-out var(--paper-spinner-cooldown-duration) cubic-bezier(0.4, 0.0, 0.2, 1);
        animation: container-rotate var(--paper-spinner-container-rotation-duration) linear infinite, fade-out var(--paper-spinner-cooldown-duration) cubic-bezier(0.4, 0.0, 0.2, 1);
      }

      @-webkit-keyframes fade-out {
        0% { opacity: 1 }
        to { opacity: 0 }
      }

      @keyframes fade-out {
        0% { opacity: 1 }
        to { opacity: 0 }
      }
    </style>
  </template>
</dom-module>`;document.head.appendChild($_documentContainer$6.content);const $_documentContainer$7=document.createElement("template");$_documentContainer$7.setAttribute("style","display: none;");$_documentContainer$7.innerHTML=`<dom-module id="paper-spinner">
  <template strip-whitespace="">
    <style include="paper-spinner-styles"></style>

    <div id="spinnerContainer" class-name="[[__computeContainerClasses(active, __coolingDown)]]" on-animationend="__reset" on-webkit-animation-end="__reset">
      <div class="spinner-layer layer-1">
        <div class="circle-clipper left"></div>
        <div class="circle-clipper right"></div>
      </div>

      <div class="spinner-layer layer-2">
        <div class="circle-clipper left"></div>
        <div class="circle-clipper right"></div>
      </div>

      <div class="spinner-layer layer-3">
        <div class="circle-clipper left"></div>
        <div class="circle-clipper right"></div>
      </div>

      <div class="spinner-layer layer-4">
        <div class="circle-clipper left"></div>
        <div class="circle-clipper right"></div>
      </div>
    </div>
  </template>

  
</dom-module>`;document.head.appendChild($_documentContainer$7.content);(0,_anyApp.Polymer)({is:"paper-spinner",behaviors:[PaperSpinnerBehavior]});const $_documentContainer$8=document.createElement("template");$_documentContainer$8.setAttribute("style","display: none;");$_documentContainer$8.innerHTML=`<dom-module id="paper-toggle-button">
  <template strip-whitespace="">

    <style>
      :host {
        display: inline-block;
        @apply --layout-horizontal;
        @apply --layout-center;
        @apply --paper-font-common-base;
      }

      :host([disabled]) {
        pointer-events: none;
      }

      :host(:focus) {
        outline:none;
      }

      .toggle-bar {
        position: absolute;
        height: 100%;
        width: 100%;
        border-radius: 8px;
        pointer-events: none;
        opacity: 0.4;
        transition: background-color linear .08s;
        background-color: var(--paper-toggle-button-unchecked-bar-color, #000000);

        @apply --paper-toggle-button-unchecked-bar;
      }

      .toggle-button {
        position: absolute;
        top: -3px;
        left: 0;
        height: 20px;
        width: 20px;
        border-radius: 50%;
        box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.6);
        transition: -webkit-transform linear .08s, background-color linear .08s;
        transition: transform linear .08s, background-color linear .08s;
        will-change: transform;
        background-color: var(--paper-toggle-button-unchecked-button-color, var(--paper-grey-50));

        @apply --paper-toggle-button-unchecked-button;
      }

      .toggle-button.dragging {
        -webkit-transition: none;
        transition: none;
      }

      :host([checked]:not([disabled])) .toggle-bar {
        opacity: 0.5;
        background-color: var(--paper-toggle-button-checked-bar-color, var(--primary-color));

        @apply --paper-toggle-button-checked-bar;
      }

      :host([disabled]) .toggle-bar {
        background-color: #000;
        opacity: 0.12;
      }

      :host([checked]) .toggle-button {
        -webkit-transform: translate(16px, 0);
        transform: translate(16px, 0);
      }

      :host([checked]:not([disabled])) .toggle-button {
        background-color: var(--paper-toggle-button-checked-button-color, var(--primary-color));

        @apply --paper-toggle-button-checked-button;
      }

      :host([disabled]) .toggle-button {
        background-color: #bdbdbd;
        opacity: 1;
      }

      .toggle-ink {
        position: absolute;
        top: -14px;
        left: -14px;
        right: auto;
        bottom: auto;
        width: 48px;
        height: 48px;
        opacity: 0.5;
        pointer-events: none;
        color: var(--paper-toggle-button-unchecked-ink-color, var(--primary-text-color));

        @apply --paper-toggle-button-unchecked-ink;
      }

      :host([checked]) .toggle-ink {
        color: var(--paper-toggle-button-checked-ink-color, var(--primary-color));

        @apply --paper-toggle-button-checked-ink;
      }

      .toggle-container {
        display: inline-block;
        position: relative;
        width: 36px;
        height: 14px;
        /* The toggle button has an absolute position of -3px; The extra 1px
        /* accounts for the toggle button shadow box. */
        margin: 4px 1px;
      }

      .toggle-label {
        position: relative;
        display: inline-block;
        vertical-align: middle;
        padding-left: var(--paper-toggle-button-label-spacing, 8px);
        pointer-events: none;
        color: var(--paper-toggle-button-label-color, var(--primary-text-color));
      }

      /* invalid state */
      :host([invalid]) .toggle-bar {
        background-color: var(--paper-toggle-button-invalid-bar-color, var(--error-color));
      }

      :host([invalid]) .toggle-button {
        background-color: var(--paper-toggle-button-invalid-button-color, var(--error-color));
      }

      :host([invalid]) .toggle-ink {
        color: var(--paper-toggle-button-invalid-ink-color, var(--error-color));
      }
    </style>

    <div class="toggle-container">
      <div id="toggleBar" class="toggle-bar"></div>
      <div id="toggleButton" class="toggle-button"></div>
    </div>

    <div class="toggle-label"><slot></slot></div>

  </template>

  
</dom-module>`;document.head.appendChild($_documentContainer$8.content);(0,_anyApp.Polymer)({is:"paper-toggle-button",behaviors:[PaperCheckedElementBehavior],hostAttributes:{role:"button","aria-pressed":"false",tabindex:0},properties:{},listeners:{track:"_ontrack"},attached:function(){(0,_anyApp.afterNextRender)(this,function(){(0,_anyApp.setTouchAction)(this,"pan-y")})},_ontrack:function(event){var track=event.detail;if("start"===track.state){this._trackStart(track)}else if("track"===track.state){this._trackMove(track)}else if("end"===track.state){this._trackEnd(track)}},_trackStart:function(){this._width=this.$.toggleBar.offsetWidth/2;this._trackChecked=this.checked;this.$.toggleButton.classList.add("dragging")},_trackMove:function(track){var dx=track.dx;this._x=_Mathmin(this._width,_Mathmax(0,this._trackChecked?this._width+dx:dx));this.translate3d(this._x+"px",0,0,this.$.toggleButton);this._userActivate(this._x>this._width/2)},_trackEnd:function(){this.$.toggleButton.classList.remove("dragging");this.transform("",this.$.toggleButton)},_createRipple:function(){this._rippleContainer=this.$.toggleButton;var ripple=_anyApp.PaperRippleBehavior._createRipple();ripple.id="ink";ripple.setAttribute("recenters","");ripple.classList.add("circle","toggle-ink");return ripple}});const resourceName="workorder";class AnyListView extends _anyApp.PolymerElement{constructor(){super()}static get properties(){return{workorders:{type:Array,reflectToAttribute:!0,notify:!0,value:[]},workordersLoaded:{type:Boolean,value:!1},workordersLoading:{type:Boolean,value:!1},isLoading:{type:Boolean,computed:"_isLoadingWorkorders(workordersLoaded, workordersLoading)"},isEmpty:{type:Boolean,computed:"_loadedAndNoRecords(isLoading)"},indexOptions:{type:Object,value:{index:{fields:["id","resourceName"]}}},fetchOptions:{type:Object,value:{selector:{resourceName:resourceName,id:{$gt:null}},fields:["_id","id","desc","status","assetNum","dueDate","timer"],sort:[{id:"asc"}],include_docs:!0,deleted:!1,limit:10,skip:0}},inputOn:{type:Boolean,value:!1},fieldsSearch:{type:Array,value:[{checked:!0,desc:"desc"},{checked:!0,desc:"status"},{checked:!1,desc:"assetNum"},{checked:!1,desc:"timer"},{checked:!1,desc:"id"}]},fieldsSortBy:{type:Array,value:[{checked:!1,desc:"desc"},{checked:!1,desc:"status"},{checked:!1,desc:"assetNum"},{checked:!1,desc:"timer"},{checked:!1,desc:"dueDate"},{checked:!0,desc:"id"}]},exactMatch:{type:Boolean,value:!1},sortAscending:{type:Boolean,value:!0,observer:"_sortDirectionChanged"}}}static get template(){return _anyApp.html`
      ${_anyApp.AnywhereStyles}
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
            <button on-click="_openSettingsModal" class="fab">${_anyApp.settingsIcon}</button>
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
    `}ready(){super.ready();this.dispatchEvent(new CustomEvent("ready",{}));AnyAppGlobals.dbBinder.bindDocs("workorders",resourceName,this)}searchTermListener(evt){this.inputOn=evt.detail.inputOn;this.searchTerm=evt.detail.searchTerm;if(null==this.searchTerm){return}if(this.inputOn){if(""!=this.searchTerm){this._updateQuery(this._generateSelector(this.searchTerm))}}else{this._updateQuery({resourceName:resourceName,id:{$gt:null}})}}_isLoadingWorkorders(workordersLoaded,workordersLoading){return!workordersLoaded||workordersLoading}_loadedAndNoRecords(isLoading){return!isLoading&&0==this.workorders.length}_sortDirectionChanged(){if(this.sortAscending){this.sortDescription="Ascending"}else{this.sortDescription="Descending"}}_updateSearchSettings(){this._updateQuery(this._generateSelector(this.searchTerm))}_generateSelector(searchTerm){let fieldSelection=this.fieldsSearch.filter(item=>item.checked),newSelector=null,operator="$regex";if(""==searchTerm){return this.fetchOptions.selector}if(this.exactMatch){searchTerm=new RegExp(`^${searchTerm}$`,"i")}else{searchTerm=new RegExp(`.*${searchTerm}.*`,"i")}if(1==fieldSelection.length){newSelector={resourceName:resourceName};newSelector[fieldSelection[0].desc]={};newSelector[fieldSelection[0].desc][operator]=searchTerm}else{newSelector={resourceName:resourceName,id:{$gt:null}};newSelector.$or=[];let or=newSelector.$or;for(var i=0;i<fieldSelection.length;i++){let entry={};entry[fieldSelection[i].desc]={};entry[fieldSelection[i].desc][operator]=searchTerm;or.push(entry)}}return newSelector}_openSettingsModal(){this.$.settingsModal.open()}_updateQuery(selector){let options={},indexOptions=this.indexOptions;this.workorders=[];options=Object.assign({},this.fetchOptions);options.selector=selector;options.skip=0;let sortField=this.$.sortBy.selected,sortObj={};sortObj[sortField]=this.sortAscending?"asc":"desc";options.sort=[];options.sort.push(sortObj);indexOptions.index.fields=[];indexOptions.index.fields.push(sortField);indexOptions.index.fields.push("resourceName");options.selector[sortField]={$gt:null};this._loadWorkorders(options,indexOptions)}requestLoadWorkorders(){this._loadWorkorders(this.fetchOptions,this.indexOptions,!1)}_loadWorkorders(options,indexOptions,isLoadMore){let that=this;indexOptions=indexOptions?indexOptions:that.indexOptions;if(!options){return}let perf1=new Date().getTime();AnyAppGlobals.anydb.createIndex(indexOptions).then(()=>{that.workordersLoading=!0;AnyAppGlobals.anydb.find(options).then(response=>{if(response&&0<response.docs.length){if(isLoadMore&&that.workordersLoaded){that.fetchOptions.skip+=response.docs.length;that.push("workorders",...response.docs)}else{that.set("workorders",response.docs);that.fetchOptions=options}that.workordersLoaded=!0}else{that.set("workorders",[])}that.$.threshold.clearTriggers();that.workordersLoading=!1;let perf=new Date().getTime()-perf1;console.log(`## query took ${perf} miliseconds`)}).catch(err=>{console.error(err);throw err})})}loadMoreData(){this._loadWorkorders(this.fetchOptions,null,!0)}}window.customElements.define("any-list-view",AnyListView)});