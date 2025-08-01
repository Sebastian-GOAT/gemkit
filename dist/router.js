function HashRouter(staticRoutes, dynamicRoutes, fallback) {
    const path = window.location.hash.slice(1) || '/';
    if (staticRoutes[path])
        return staticRoutes[path]();
    const splitted = path.split('/');
    const lastPathElement = splitted[splitted.length - 1];
    const basePath = '/' + splitted.slice(1, -1).join('/');
    if (dynamicRoutes[basePath])
        return dynamicRoutes[basePath](lastPathElement);
    return fallback();
}

export { HashRouter };
//# sourceMappingURL=router.js.map
