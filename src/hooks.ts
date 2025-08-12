import { type Ref } from './types';

type Effect = {
    dependencies: string[];
    func: () => void | (() => void);
};

type EffectCleanup = {
    dependencies: string[];
    func: () => void;
};

const appState: Record<string, any> = {};

const appEffects: Effect[] = [];
let appEffectCleanups: EffectCleanup[] = [];

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

            const effects = appEffects.filter(effect => effect.dependencies.includes(stateName));
            const effectCleanups = appEffectCleanups.filter(effect => effect.dependencies.includes(stateName));

            effectCleanups.forEach(effect => effect.func());
            appEffectCleanups = appEffectCleanups.filter(effect => !effect.dependencies.includes(stateName));

            reRender();
            
            effects.forEach(effect => {
                const cleanup = effect.func();
                if (cleanup)
                    appEffectCleanups.push({ dependencies: effect.dependencies, func: cleanup });
            });
        }
    }

    return [value, setValue];
}

export function withEffect(callback: Effect['func'], dependencies: Effect['dependencies']) {
    appEffects.push({
        dependencies,
        func: callback
    });
}

export function withRef<T>(): Ref<T> {
    return { current: null };
}