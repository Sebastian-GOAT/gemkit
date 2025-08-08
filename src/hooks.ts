type Effect = {
    dependencies: string[];
    func: () => void | (() => void);
    cleanup: (() => void) | null;
};

const appState: Record<string, any> = {};

const appEffects: Effect[] = [];
const effectCleanups: (() => void)[] = [];

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
}

export function withState<T>(stateName: string, init: T): [T, (newValue: T) => void] {

    let value: T = appState[stateName] ?? init;

    const setValue = (newValue: T) => {
        if (newValue !== value) {
            value = newValue;
            appState[stateName] = newValue;

            effectCleanups.forEach(c => c());

            reRender();

            const effects = appEffects.find(e => e.dependencies.includes(stateName));
            
            for (const effect of appEffects) {
                const cleanup = effect.func();
                if (cleanup)
                    effectCleanups.push(cleanup);
            }
        }
    }

    return [value, setValue];
}

export function withEffect(callback: () => void | (() => void), dependencies: any[]) {
    appEffects.push({
        dependencies,
        func: callback,
        cleanup: null
    });
}