import createRouteMap from './create-route-map';
import createRoute from './utils/route';
export default function createMatcher(routes) {
  const {pathList, pathMap} = createRouteMap(routes);
  console.log(pathList);
  console.log(pathMap);
  function match(path) {
    const record = pathMap[path];
    if (record) {
      // 匹配出路由对应的父路由map以及自身映射关系
      return createRoute(record, path);
    }
    return createRoute(null, path);
  }
  console.log(match('/bpage/cpage'));
  function addRoutes(routes) {
    createRouteMap(routes, pathList, pathMap);
  }
  return {
    match,
    addRoutes
  };
}
