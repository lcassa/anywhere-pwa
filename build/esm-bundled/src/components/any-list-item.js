import{PolymerElement,html,afterNextRender,timerOff,timerOn,detailArrow,AnywhereStyles}from"./any-app.js";class AnyListItem extends PolymerElement{constructor(){super();afterNextRender(this,function(){this.addEventListener("click",this._onClick)})}static get properties(){return{item:{type:Object,value:null,reflectToAttribute:!0,notify:!0,readonly:!1,observer:"_dataChanged"},tabindex:{type:Number,value:-1},statusClass:{type:String,value:""},timerIcon:{type:Object,value:null}}}static get template(){return html`
      ${AnywhereStyles}
      <style is="custom-style">
        paper-icon-button {
          width: 61px;
          height: 61px;
        }
      </style>
      <style>
        header {
          font-size: 18px;
        }

        paper-ripple {
          color: #325C80;
        }

        .container {
          height: 100px;
          padding: 10px 0px 10px 10px;
        }

        .container__attributes > * {
          margin-bottom: 6px;
        }

        .status {
          border-radius: 4px;
          height: 15px;
          width: 36px;
          margin-right: 5px;
        }
        .status--green {
          background-color: #8CD211;
        }

        .status--yellow {
          background-color: #FFBB00;
        }

        .status--gray {
          background-color: #777677;
        }

        .status--error {
          background-color: #D74108;
          height: 100px;
          width: 5px;
        }

        .detail-arrow {
          fill: #88898B;
        }

      </style>
      <article tabindex$="[[tabIndex]]" class="container flex flex--align-center flex--row">
        
        <!-- attributes -->
        <div class="flex--full-width flex--column flex--ellipsis container__attributes">
          <header>[[item.desc]]</header>
          <div class="flex flex--row flex--align-center flex--full-width flex__children--equaly-spaced">
            <div> 
              [[item.id]]
            </div>
            <div>[[item.dueDate]]</div>
          </div>
          <div class="flex flex--row flex--align-center flex--full-width flex__children--equaly-spaced">
            <div class="flex flex--row flex--align-center"> 
              <div class$="[[statusClass]]"></div>
              <div>[[item.status]]</div>
            </div>
            <div>[[item.assetNum]]</div>
          </div>
        </div>

        <div class="flex flex--row flex--justify-end flex--align-center">
          <!-- timer -->
          <div>
            <!-- LK0 aria label needs fixing -->
            <template is="dom-if" if="[[_isTimer(item.timer, 'on')]]">
              <button class="button button__icon" aria-label="Start timer">${timerOn}</button>
            </template>
            <template is="dom-if" if="[[_isTimer(item.timer, 'off')]]">
              <button class="button button__icon" aria-label="Stop timer">${timerOff}</button>
            </template>
          </div>

          <!-- chevron -->
          <div>
            ${detailArrow}
          </div>
        </div>
        <paper-ripple></paper-ripple>
      </article>
    `}_onClick(){window.history.pushState({},null,AnyAppGlobals.rootPath+"details-view/"+this.item._id);window.dispatchEvent(new CustomEvent("location-changed"))}_dataChanged(){this._updateStatusClass()}_isTimer(timer,value){if(timer===value){return!0}return!1}_updateStatusClass(){if(!this.item)return;this.statusClass="status ";switch(this.item.status){case"In Progress":this.statusClass+="status--green";break;case"Waiting on Approval":this.statusClass+="status--yellow";break;default:this.statusClass+="status--gray";}}}window.customElements.define("any-list-item",AnyListItem);