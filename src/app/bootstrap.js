// check if window.RV has been created by ie-polyfills already, otherwise init
const AV = window.AV = window.AV ? window.AV : {};

// test user browser, true if IE false otherwise
AV.isIE = /Edge\/|Trident\/|MSIE /.test(window.navigator.userAgent);

// Safari problem with file saver: https://github.com/eligrey/FileSaver.js/#supported-browsers
// test if it is Safari browser on desktop and it if is, show a message to let user know we can't automatically save the file
// they have to save it manually the same way as when the canvas is tainted.
AV.isSafari = /^((?!chrome|android|crios|fxios).)*safari/i.test(navigator.userAgent) &&
    !/(iPhone|iPod|iPad)/i.test(navigator.platform);

const customAttrs = ['langs'];

const d = document;
const scripts = d.getElementsByTagName('script'); // get scripts

// inject fonts
const headNode = d.getElementsByTagName('head')[0];
const fontsLink = d.createElement('link');
fontsLink.href = '//fonts.googleapis.com/css?family=Roboto:300,400,500,700,400italic';
fontsLink.rel = 'stylesheet';
headNode.appendChild(fontsLink);
