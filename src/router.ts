export function HashRouter(
    staticRoutes: Record<string, (...props: any[]) => HTMLElement>,
    dynamicRoutes: Record<string, (...props: any[]) => HTMLElement>,
    fallback: () => HTMLElement
) {

    const path = location.hash.slice(1) || '/';
    if (staticRoutes[path])
        return staticRoutes[path]();

    const splitted = path.split('/');
    const lastPathElement = splitted[splitted.length - 1];
    const basePath = '/' + splitted.slice(1, -1).join('/');
    
    if (dynamicRoutes[basePath])
        return dynamicRoutes[basePath](lastPathElement);

    return fallback();
}