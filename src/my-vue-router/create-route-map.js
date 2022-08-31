/**
 * @author: CXM
 * @date: 2022-08-31 13:19:14
 * @description: 建立路由映射
 */
export default function createRouteMap(routes) {
  // 存储所有的路由地址
  const pathList = [];
  // 路由表，路径和组件的相关信息 {'/page':{name:'',component:f} ... }
  const pathMap = {};

  routes.forEach(route => {
    addRouteRecord(route, pathList, pathMap);
  });

  return {
    pathList,
    pathMap
  };
}
function addRouteRecord(route, pathList, pathMap, parentRecord) {
  // parentRecord 用于记录它的父路由
  const path = parentRecord ? `${parentRecord.path}/${route.path}` : route.path;
  const record = {
    path: path,
    component: route.component,
    parentRecord: parentRecord // 只有子路由才有值，否则就是undefined
  };
  // 判断当前路径是否已经存在路由表中
  if (!pathMap[path]) {
    pathList.push(path);
    pathMap[path] = record;
  }
  // 判断是否有子路由
  if (route.children) {
    route.children.forEach(childRoute => {
      addRouteRecord(childRoute, pathList, pathMap, route);
    });
  }
}
