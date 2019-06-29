import { html } from '@polymer/polymer/polymer-element.js';

export const timerOff = html`<svg height="45" width="45" viewBox="0 0 45 45"><g id="timer-off"><path d="M22.7254628,22.0883087 L28.3436955,17.1662321 L30.3109096,17.1325484 L30.2768031,19.1172845 L24.8376415,24.0239403 C24.9428704,24.3299299 25,24.6582933 25,25 C25,26.6568542 23.6568542,28 22,28 C20.3431458,28 19,26.6568542 19,25 C19,23.3431458 20.3431458,22 22,22 C22.250153,22 22.4931549,22.0306172 22.7254628,22.0883087 Z M31.5865369,9.54092321 L33.9253441,6.85043327 L37.698892,10.1307284 L35.4449258,12.7236199 C38.2748255,15.832511 40,19.9647874 40,24.5 C40,34.1649831 32.1649831,42 22.5,42 C12.8350169,42 5,34.1649831 5,24.5 C5,15.6838202 11.5192646,8.3902963 20,7.17722215 L20,6 L18,6 L18,3 L27,3 L27,6 L25,6 L25,7.17722215 C27.384313,7.5182714 29.6135869,8.33993333 31.5865369,9.54092321 Z M22.5,39 C30.5081289,39 37,32.5081289 37,24.5 C37,16.4918711 30.5081289,10 22.5,10 C14.4918711,10 8,16.4918711 8,24.5 C8,32.5081289 14.4918711,39 22.5,39 Z" id="action_timer_OFF" fill="#5AAAFA"></path></g></svg>`;
export const timerOn = html`<svg height="45" width="45" viewBox="0 0 45 45"><g id="timer-on" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="action_timerRunning_OFF" transform="translate(4.000000, 1.000000)"><path d="M28.424765,27.5791547 L22.5262857,24.1420898 L22.5262857,32.9483699 C20.988207,33.6246192 19.2879409,34 17.5,34 C10.5964406,34 5,28.4035594 5,21.5 C5,14.5964406 10.5964406,9 17.5,9 C24.4035594,9 30,14.5964406 30,21.5 C30,23.7066194 29.4282309,25.779695 28.424765,27.5791547 Z" id="fill" fill="#8CD211"></path><polygon id="play" fill="#5AAAFA" points="24.364347 42.0645486 24.364347 27.2841796 37.046927 34.6743641"></polygon><path d="M32.7461534,30.0972431 L22.5262857,24.1420898 L22.5262857,38.2674577 C20.9342945,38.7439969 19.2470436,39 17.5,39 C7.83501688,39 0,31.1649831 0,21.5 C0,12.6838202 6.51926464,5.3902963 15,4.17722215 L15,3 L13,3 L13,0 L22,0 L22,3 L20,3 L20,4.17722215 C22.384313,4.5182714 24.6135869,5.33993333 26.5865369,6.54092321 L28.9253441,3.85043327 L32.698892,7.13072841 L30.4449258,9.72361991 C33.2748255,12.832511 35,16.9647874 35,21.5 C35,24.6246563 34.1810785,27.5580433 32.7461534,30.0972431 Z M30.1533706,28.5864193 L22.5262857,24.1420898 L22.5262857,35.1051722 C20.9603244,35.6839045 19.2670762,36 17.5,36 C9.49187113,36 3,29.5081289 3,21.5 C3,13.4918711 9.49187113,7 17.5,7 C25.5081289,7 32,13.4918711 32,21.5 C32,24.0738334 31.3293921,26.4910379 30.1533706,28.5864193 Z" id="stroke" fill="#777677"></path><path d="M17.7254628,19.0883087 L23.3436955,14.1662321 L25.3109096,14.1325484 L25.2768031,16.1172845 L19.8376415,21.0239403 C19.9428704,21.3299299 20,21.6582933 20,22 C20,23.6568542 18.6568542,25 17,25 C15.3431458,25 14,23.6568542 14,22 C14,20.3431458 15.3431458,19 17,19 C17.250153,19 17.4931549,19.0306172 17.7254628,19.0883087 Z" id="pointer" fill="#FDFEFF"></path></g></g></svg>`;
export const closeIcon = html`<svg height="32" width="32" viewBox="0 0 32 32"><g id="nany-icon-/-close" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><path d="M16.1923882,14.0710678 L23.263456,7 L25.3847763,9.12132034 L18.3137085,16.1923882 L25.3847763,23.263456 L23.263456,25.3847763 L16.1923882,18.3137085 L9.12132034,25.3847763 L7,23.263456 L14.0710678,16.1923882 L7,9.12132034 L9.12132034,7 L16.1923882,14.0710678 Z" id="action_addNew_OFF" fill="#FFF"></path></g></svg>`;
export const searchIcon = html`<svg height="32" width="32" viewBox="0 0 32 32"><g id="nany-icon-/-lookup-copy" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><path d="M20.3103148,18.2508536 L27.9502885,25.8983403 L27.9502885,27.953789 L25.8802414,27.953789 L18.249124,20.311559 C16.7716056,21.374176 14.9588873,22 13,22 C8.02943725,22 4,17.9705627 4,13 C4,8.02943725 8.02943725,4 13,4 C17.9705627,4 22,8.02943725 22,13 C22,14.9596518 21.3736875,16.7730204 20.3103148,18.2508536 Z M13,20 C16.8659932,20 20,16.8659932 20,13 C20,9.13400675 16.8659932,6 13,6 C9.13400675,6 6,9.13400675 6,13 C6,16.8659932 9.13400675,20 13,20 Z" id="action_lookup_OFF" fill="#fff"></path></g></svg>`;
export const searchIconSmall = html`<svg height="18" width="18" viewBox="0 0 18 18"><g id="nany-icon-/-lookup-copy" transform="translate(-3.000000, -3.000000)" fill="#fff"><path d="M15.2327361,13.6881402 L20.9627163,19.4237552 L20.9627163,20.9653417 L19.410181,20.9653417 L13.686843,15.2336693 C12.5787042,16.030632 11.2191655,16.5 9.75,16.5 C6.02207794,16.5 3,13.4779221 3,9.75 C3,6.02207794 6.02207794,3 9.75,3 C13.4779221,3 16.5,6.02207794 16.5,9.75 C16.5,11.2197388 16.0302656,12.5797653 15.2327361,13.6881402 Z M9.75,15 C12.6494949,15 15,12.6494949 15,9.75 C15,6.85050506 12.6494949,4.5 9.75,4.5 C6.85050506,4.5 4.5,6.85050506 4.5,9.75 C4.5,12.6494949 6.85050506,15 9.75,15 Z" id="action_lookup_OFF"></path></g></svg>`;
export const weAppIcon = html`<svg height="32" width="32" viewBox="0 0 32 32"><g id="we-app-icon"><g id="header_app_WorkExecution_noBack" transform="translate(3.000000, 4.000000)" fill="#FFFFFF"><path d="M16,2 L22,2 L22,10 L21,10 L21,3 L16,3 L16,2 Z M6,2 L6,3 L1,3 L1,23 L13,23 L13,24 L0,24 L0,2 L6,2 Z" id="board"></path><path d="M9,2 C9,0.8954305 9.8954305,0 11,0 C12.1045695,0 13,0.8954305 13,2 L16,2 L16,6 L6,6 L6,2 L9,2 Z M11,3 C11.5522847,3 12,2.55228475 12,2 C12,1.44771525 11.5522847,1 11,1 C10.4477153,1 10,1.44771525 10,2 C10,2.55228475 10.4477153,3 11,3 Z" id="clip"></path><g id="lines" transform="translate(5.000000, 9.000000)"><rect id="Rectangle-3" x="0" y="0" width="12" height="1"></rect><rect id="Rectangle-6" x="0" y="3" width="8" height="1"></rect><rect id="Rectangle-6-Copy" x="0" y="6" width="8" height="1"></rect><rect id="Rectangle-7" x="0" y="9" width="5" height="1"></rect></g><polygon id="play" points="15 24.0266077 15 12 26.5701133 18.0133038"></polygon></g></g></svg>`;
export const mapIcon = html`<svg height="32" width="32" viewBox="0 0 32 32"><g id="map-icon"><g id="nany-icon-/-header-/-maps" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><path d="M18.3284752,19 C14.1566742,11.6441966 13.7331669,11.3643131 13.7331669,8.76683308 C13.7331669,6.13418387 15.8673508,4 18.5,4 C21.1326492,4 23.2668331,6.13418387 23.2668331,8.76683308 C23.2668331,11.3643131 22.7026598,11.6441966 18.6658874,19 L25,19 L25,20 L10,20 L10,25 L9,25 L9,20 L7,20 L7,19 L9,19 L9,10 L10,10 L10,19 L18.3284752,19 Z M12,7 L12,9 L6,9 L6,26 L26,26 L26,9 L25,9 L25,7 L28,7 L28,28 L4,28 L4,7 L12,7 Z" id="header_mapView_OFF" fill="#FFFFFF"></path></g></svg>`;
export const barcodeIcon = html`<svg height="32" width="32" viewBox="0 0 32 32"><g id="barcode-icon"><path d="M5,4 L7,4 L7,28 L5,28 L5,4 Z M26,4 L28,4 L28,28 L26,28 L26,4 Z M21,4 L25,4 L25,22 L21,22 L21,4 Z M12,4 L16,4 L16,22 L12,22 L12,4 Z M18,4 L19,4 L19,22 L18,22 L18,4 Z M8,4 L10,4 L10,22 L8,22 L8,4 Z M10.1,28.084 C8.791,28.084 8.189,27.153 8.189,25.557 C8.189,23.961 8.791,23.03 10.1,23.03 C11.409,23.03 12.011,23.961 12.011,25.557 C12.011,27.153 11.409,28.084 10.1,28.084 Z M10.1,27.258 C10.723,27.258 10.94,26.789 10.94,26.012 L10.94,25.102 C10.94,24.325 10.723,23.856 10.1,23.856 C9.477,23.856 9.26,24.325 9.26,25.102 L9.26,26.012 C9.26,26.789 9.477,27.258 10.1,27.258 Z M10.1,25.97 C9.778,25.97 9.666,25.823 9.666,25.634 L9.666,25.48 C9.666,25.291 9.778,25.144 10.1,25.144 C10.422,25.144 10.534,25.291 10.534,25.48 L10.534,25.634 C10.534,25.823 10.422,25.97 10.1,25.97 Z M16.134,28 L12.732,28 L12.732,27.153 L13.978,27.153 L13.978,24.052 L12.844,24.675 L12.445,23.919 L13.922,23.114 L15.028,23.114 L15.028,27.153 L16.134,27.153 L16.134,28 Z M17.849,25.046 L18.311,25.046 C18.85,25.046 19.088,24.815 19.088,24.514 L19.088,24.465 C19.088,24.115 18.836,23.884 18.402,23.884 C18.003,23.884 17.639,24.094 17.394,24.465 L16.729,23.849 C17.107,23.366 17.59,23.03 18.444,23.03 C19.501,23.03 20.194,23.541 20.194,24.325 C20.194,24.948 19.76,25.333 19.242,25.424 L19.242,25.466 C19.837,25.571 20.285,25.97 20.285,26.642 C20.285,27.517 19.529,28.084 18.374,28.084 C17.394,28.084 16.883,27.636 16.568,27.146 L17.345,26.544 C17.562,26.943 17.856,27.23 18.395,27.23 C18.892,27.23 19.179,26.978 19.179,26.572 L19.179,26.523 C19.179,26.124 18.85,25.921 18.304,25.921 L17.849,25.921 L17.849,25.046 Z M23.981,28 L22.973,28 L22.973,27.062 L20.775,27.062 L20.775,26.166 L22.721,23.114 L23.981,23.114 L23.981,26.25 L24.611,26.25 L24.611,27.062 L23.981,27.062 L23.981,28 Z M22.91,24.199 L21.622,26.25 L22.973,26.25 L22.973,24.199 L22.91,24.199 Z" id="header_barcode_OFF" fill="#FFFFFF"></path></g></svg>`;
export const backArrow = html`<svg height="32" width="32" viewBox="0 0 32 32"><g id="back-arrow"><polygon id="header_back_OFF" fill="#FFFFFF" points="15.5998003 16 19.0356742 22.5 15.6851139 22.5 12.5 16 16.1494397 9.5 19.5 9.5"></polygon></g></svg>`;
export const detailArrow = html`<svg height="32" width="32" viewBox="0 0 32 32"><g id="detail-arrow"><polygon id="arrow" points="20.9696699 16.0303301 21.0606602 16.1213203 13.1213203 24.0606602 11 21.9393398 16.9090097 16.0303301 11 10.1213203 13.1213203 8 21.0606602 15.9393398 20.9696699 16.0303301"></polygon></g></svg>`;
export const cameraIcon = html`<svg height="32" width="32" viewBox="0 0 32 32"><g id="camera"><g id="header_camera_off" transform="translate(2.000000, 5.000000)" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><path d="M17,16 C14.790861,16 13,14.209139 13,12 C13,9.790861 14.790861,8 17,8 C19.209139,8 21,9.790861 21,12 C21,14.209139 19.209139,16 17,16 Z M17,13 C17.5522847,13 18,12.5522847 18,12 C18,11.4477153 17.5522847,11 17,11 C16.4477153,11 16,11.4477153 16,12 C16,12.5522847 16.4477153,13 17,13 Z" id="Combined-Shape" fill="#FFFFFF"></path><circle id="Oval-Copy-2" stroke="#FFFFFF" stroke-width="1.5" cx="17" cy="12" r="6"></circle><path d="M4,2 L4,0 L10,0 L10,2 L27,2 L27,22 L0,22 L0,2 L4,2 Z M2,4 L2,20 L25,20 L25,4 L2,4 Z" id="Combined-Shape" fill="#FFFFFF"></path></g></g></svg>`;
export const disconnected = html`<svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" class="style-scope iron-icon" style="pointer-events: none; display: block; width: 100%; height: 100%;"><g class="style-scope iron-icon"><path d="M23.64 7c-.45-.34-4.93-4-11.64-4-1.5 0-2.89.19-4.15.48L18.18 13.8 23.64 7zm-6.6 8.22L3.27 1.44 2 2.72l2.05 2.06C1.91 5.76.59 6.82.36 7l11.63 14.49.01.01.01-.01 3.9-4.86 3.32 3.32 1.27-1.27-3.46-3.46z" class="style-scope iron-icon"></path></g></svg>`;
export const settingsIcon = html`<svg height="20" width="20" viewBox="0 0 20 20"><g id="nany-icon-/-lookup-copy" transform="translate(-5.000000, -5.000000)" fill="#FFF"><path d="M22.6666667,15 C22.6666667,15.41 22.6253333,15.8093333 22.5633333,16.202 L25,18.3333333 L22.9293333,21.732 L20.0233333,20.7826667 C19.3286667,21.3866667 18.5246667,21.8646667 17.644,22.1886667 L17,25 L13,25 L12.356,22.1893333 C11.4753333,21.8653333 10.6706667,21.3873333 9.976,20.7826667 L7.07066667,21.732 L5,18.3333333 L7.43666667,16.2013333 C7.37466667,15.8086667 7.33333333,15.41 7.33333333,15 C7.33333333,14.5906667 7.37466667,14.1913333 7.43666667,13.7993333 L5,11.6666667 L7.07,8.268 L9.976,9.218 C10.6713333,8.61333333 11.4753333,8.13533333 12.356,7.81133333 L13,5 L17,5 L17.6446667,7.81133333 C18.5253333,8.13533333 19.3293333,8.61333333 20.024,9.21733333 L22.93,8.268 L25,11.6666667 L22.5633333,13.7986667 C22.6253333,14.1913333 22.6666667,14.59 22.6666667,15 Z M15,10.7142857 C12.6328571,10.7142857 10.7142857,12.6321429 10.7142857,15 C10.7142857,17.3678571 12.6328571,19.2857143 15,19.2857143 C17.3678571,19.2857143 19.2857143,17.3678571 19.2857143,15 C19.2857143,12.6321429 17.3678571,10.7142857 15,10.7142857 Z" id="Combined-Shape"></path></g></svg>`