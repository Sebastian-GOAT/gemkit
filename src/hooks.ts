let appState: Record<string, any> = {};
const mountQueue: (() => void)[] = [];

let appElement: HTMLElement;
let renderFunc: () => HTMLElement;

export function mountApp(root: HTMLElement, render: () => HTMLElement): void {
    appElement = root;
    renderFunc = render;

    reRender();

    addEventListener('hashchange', reRender);
}

export function reRender(): void {

    if (!appElement || !renderFunc) return;
    
    appElement.innerHTML = '';
    appElement.appendChild(renderFunc());
    
    while (mountQueue.length) {
        const callback = mountQueue.shift()!;
        callback();
    }
}

export function ReactiveState<T>(stateName: string, init: T) {

    let value: T = appState[stateName] ?? init;

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