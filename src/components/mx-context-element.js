/**
 * `mx-context-element`
 * mimic maximo-context
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */

// export const ContextMixin = (BaseClass) => class extends BaseClass {

//   static get properties(){
//     return {
//       p1:"v1",
//       p2:"v2"
//     };
//   }

//   p2p1(){
//     return this.p2+this.p1;
//   }
// }

export const ContextMixin = (BaseClass) => class extends BaseClass {

  static get is() { return 'mx-context-element'; }

  static get properties() {
    return {
    }
  }
  
  localize (a, b, c, d){
    return c;
  }

  toggleWait (a) {
    console.log(`spinner mode: ${a}`);
    return;
  }

}

// window.customElements.define('mx-context-element', MxContextElement);
