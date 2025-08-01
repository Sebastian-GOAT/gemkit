let appState: Record<string, any> = {};
const mountQueue: (() => void)[] = [];

let appElement: HTMLDivElement;
let renderFunc: () => HTMLElement;

export function mountApp(root: HTMLDivElement, render: () => HTMLElement) {
    appElement = root;
    renderFunc = render;
    reRender();
    if (typeof window !== 'undefined') {
        window.addEventListener('hashchange', reRender);
    }
}

function reRender() {

    if (!appElement || !renderFunc) return;
    
    const appWrapper = appElement;
    
    appWrapper.innerHTML = '';
    appWrapper.appendChild(renderFunc());
    
    while (mountQueue.length) {
        const callback = mountQueue.shift()!;
        callback();
    }
}

export function ReactiveState<T>(stateName: string, init: T) {

    let value: T = appState[stateName] ?? init;
    console.log(value)

    const setValue = (newValue: T) => {
        if (newValue !== value) {
            value = newValue;
            appState[stateName] = newValue;
            reRender();
        }
    }

    return [value, setValue];
}

export function onMount(callback: () => void) {
    mountQueue.push(callback);
}