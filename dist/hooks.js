let appState = {};
const mountQueue = [];
let appElement;
let renderFunc;
function mountApp(root, render) {
    appElement = root;
    renderFunc = render;
}
function reRender() {
    if (!appElement || !renderFunc)
        return;
    const appWrapper = appElement;
    appWrapper.innerHTML = '';
    appWrapper.appendChild(renderFunc());
    while (mountQueue.length) {
        const callback = mountQueue.shift();
        callback();
    }
}
function ReactiveState(stateName, init) {
    let value = appState[stateName] ?? init;
    console.log(value);
    const setValue = (newValue) => {
        if (newValue !== value) {
            value = newValue;
            appState[stateName] = newValue;
            reRender();
        }
    };
    return [value, setValue];
}
function onMount(callback) {
    mountQueue.push(callback);
}

export { ReactiveState, mountApp, onMount };
//# sourceMappingURL=hooks.js.map
