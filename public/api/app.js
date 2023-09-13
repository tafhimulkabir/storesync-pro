// Access The window API from tauri ...
const { appWindow } = window.__TAURI__.window;

// Minimize Button ...
document.getElementById('app__minimize__button')
        .addEventListener('click', () => appWindow.minimize());

// Maximize Button ...
document.getElementById('app__maximize__button')
        .addEventListener('click', () => appWindow.toggleMaximize());

// Close Button ...
document.getElementById('app__close__button')
        .addEventListener('click', () => appWindow.close());