export declare function mountApp(root: HTMLDivElement, render: () => HTMLElement): void;
export declare function ReactiveState<T>(stateName: string, init: T): (T | ((newValue: T) => void))[];
export declare function onMount(callback: () => void): void;
