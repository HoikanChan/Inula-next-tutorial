// src/lifecycle.ts
var DidMountStore;
var WillUnmountStore = [];
var DidUnmountStore = [];
var addWillUnmount = (node, func) => {
  const willUnmountStore = WillUnmountStore;
  const currentStore = willUnmountStore[willUnmountStore.length - 1];
  if (!currentStore)
    return;
  currentStore.push(() => func(node));
};
var addDidUnmount = (node, func) => {
  const didUnmountStore = DidUnmountStore;
  const currentStore = didUnmountStore[didUnmountStore.length - 1];
  if (!currentStore)
    return;
  currentStore.push(() => func(node));
};
var addDidMount = (node, func) => {
  if (!DidMountStore)
    DidMountStore = [];
  DidMountStore.push(() => func(node));
};
var runDidMount = () => {
  const didMountStore = DidMountStore;
  if (!didMountStore || didMountStore.length === 0)
    return;
  for (let i = didMountStore.length - 1; i >= 0; i--) {
    didMountStore[i]();
  }
  DidMountStore = [];
};
function startUnmountScope() {
  WillUnmountStore.push([]);
  DidUnmountStore.push([]);
}
function endUnmountScope() {
  return [WillUnmountStore.pop(), DidUnmountStore.pop()];
}

// src/InulaNode.ts
var toEls = (nodes) => {
  const els = [];
  loopShallowEls(nodes, (el) => {
    els.push(el);
  });
  return els;
};
var loopShallowEls = (nodes, runFunc) => {
  const stack = [...nodes].reverse();
  while (stack.length > 0) {
    const node = stack.pop();
    if (node instanceof HTMLElement || node instanceof Text) {
      runFunc(node);
    } else if (node._$nodes) {
      stack.push(...[...node._$nodes].reverse());
    }
  }
};
var addParentEl = (nodes, parentEl) => {
  nodes.forEach((node) => {
    if ("__type" in node) {
      node._$parentEl = parentEl;
      node._$nodes && addParentEl(node._$nodes, parentEl);
    }
  });
};
var getFlowIndexFromNodes = (nodes, stopNode) => {
  let index = 0;
  const stack = [...nodes].reverse();
  while (stack.length > 0) {
    const node = stack.pop();
    if (node === stopNode)
      break;
    if ("__type" in node) {
      node._$nodes && stack.push(...[...node._$nodes].reverse());
    } else {
      index++;
    }
  }
  return index;
};
var appendNodesWithSibling = (nodes, parentEl, nextSibling) => {
  if (nextSibling)
    return insertNodesBefore(nodes, parentEl, nextSibling);
  return appendNodes(nodes, parentEl);
};
var appendNodesWithIndex = (nodes, parentEl, index, length) => {
  length = length ?? parentEl.childNodes.length;
  if (length !== index)
    return insertNodesBefore(nodes, parentEl, parentEl.childNodes[index]);
  return appendNodes(nodes, parentEl);
};
var insertNodesBefore = (nodes, parentEl, nextSibling) => {
  let count = 0;
  loopShallowEls(nodes, (el) => {
    parentEl.insertBefore(el, nextSibling);
    count++;
  });
  return count;
};
var appendNodes = (nodes, parentEl) => {
  let count = 0;
  loopShallowEls(nodes, (el) => {
    parentEl.appendChild(el);
    count++;
  });
  return count;
};

// src/equal.ts
function equal(deps, prevDeps) {
  if (!prevDeps || deps.length !== prevDeps.length)
    return false;
  return deps.every((dep, i) => !(dep instanceof Object) && prevDeps[i] === dep);
}

// src/renderer/dom.ts
var delegatedEvents = /* @__PURE__ */ new Set();
function createElement(tag) {
  return document.createElement(tag);
}
function createTextNode(value, deps) {
  const node = document.createTextNode(value);
  if (deps)
    node.deps = deps;
  return node;
}
function updateText(node, valueFunc, deps) {
  if (equal(deps, node.deps))
    return;
  const value = valueFunc();
  node.textContent = value;
  node.deps = deps;
}
function cache(el, key, deps) {
  if (deps.length === 0)
    return false;
  const cacheKey = `$${key}`;
  if (equal(deps, el[cacheKey]))
    return true;
  el[cacheKey] = deps;
  return false;
}
var isCustomProperty = (name) => name.startsWith("--");
function setStyle(el, newStyle) {
  const style = el.style;
  const prevStyle = el._prevStyle || {};
  for (const key in prevStyle) {
    if (prevStyle.hasOwnProperty(key) && (newStyle == null || !newStyle.hasOwnProperty(key))) {
      if (isCustomProperty(key)) {
        style.removeProperty(key);
      } else if (key === "float") {
        style.cssFloat = "";
      } else {
        style[key] = "";
      }
    }
  }
  for (const key in newStyle) {
    const prevValue = prevStyle[key];
    const newValue = newStyle[key];
    if (newStyle.hasOwnProperty(key) && newValue !== prevValue) {
      if (newValue == null || newValue === "" || typeof newValue === "boolean") {
        if (isCustomProperty(key)) {
          style.removeProperty(key);
        } else if (key === "float") {
          style.cssFloat = "";
        } else {
          style[key] = "";
        }
      } else if (isCustomProperty(key)) {
        style.setProperty(key, newValue);
      } else if (key === "float") {
        style.cssFloat = newValue;
      } else {
        el.style[key] = newValue;
      }
    }
  }
  el._prevStyle = { ...newStyle };
}
function setDataset(el, value) {
  Object.assign(el.dataset, value);
}
function setHTMLProp(el, key, valueFunc, deps) {
  if (cache(el, key, deps))
    return;
  el[key] = valueFunc();
}
function setHTMLProps(el, value) {
  Object.entries(value).forEach(([key, v]) => {
    if (key === "style")
      return setStyle(el, v);
    if (key === "dataset")
      return setDataset(el, v);
    setHTMLProp(el, key, () => v, []);
  });
}
function setHTMLAttr(el, key, valueFunc, deps) {
  if (cache(el, key, deps))
    return;
  el.setAttribute(key, valueFunc());
}
function setHTMLAttrs(el, value) {
  Object.entries(value).forEach(([key, v]) => {
    setHTMLAttr(el, key, () => v, []);
  });
}
function setEvent(el, key, value) {
  const prevEvent = el[`$on${key}`];
  if (prevEvent)
    el.removeEventListener(key, prevEvent);
  el.addEventListener(key, value);
  el[`$on${key}`] = value;
}
function eventHandler(e) {
  const key = `$$${e.type}`;
  for (const node of e.composedPath()) {
    if (node[key])
      node[key](e);
    if (e.cancelBubble)
      return;
  }
}
function delegateEvent(el, key, value) {
  if (el[`$$${key}`] === value)
    return;
  el[`$$${key}`] = value;
  if (!delegatedEvents.has(key)) {
    delegatedEvents.add(key);
    document.addEventListener(key, eventHandler);
  }
}
function appendChild(el, child) {
  if (!el._$nodes)
    el._$nodes = Array.from(el.childNodes);
  el._$nodes.push(child);
  el.appendChild(child);
}
function insertNode(el, node, position) {
  if (!el._$nodes)
    el._$nodes = Array.from(el.childNodes);
  el._$nodes.splice(position, 0, node);
  const flowIdx = getFlowIndexFromNodes(el._$nodes, node);
  appendNodesWithIndex([node], el, flowIdx);
  addParentEl([node], el);
}

// src/scheduler.ts
var p = Promise.resolve();
function schedule(task) {
  p.then(task);
}

// ../inula-next-shared/dist/index.js
var InulaNodeType = /* @__PURE__ */ ((InulaNodeType2) => {
  InulaNodeType2[InulaNodeType2["Comp"] = 0] = "Comp";
  InulaNodeType2[InulaNodeType2["For"] = 1] = "For";
  InulaNodeType2[InulaNodeType2["Cond"] = 2] = "Cond";
  InulaNodeType2[InulaNodeType2["Exp"] = 3] = "Exp";
  InulaNodeType2[InulaNodeType2["Hook"] = 4] = "Hook";
  InulaNodeType2[InulaNodeType2["Context"] = 5] = "Context";
  InulaNodeType2[InulaNodeType2["Children"] = 6] = "Children";
  return InulaNodeType2;
})(InulaNodeType || {});

// src/CompNode.ts
function createCompNode() {
  return {
    updateProp: builtinUpdateFunc,
    updateState: builtinUpdateFunc,
    __type: InulaNodeType.Comp,
    props: {},
    _$nodes: []
  };
}
function builtinUpdateFunc() {
  throw new Error("Component node not initiated.");
}
function constructComp(comp, {
  updateState,
  updateProp,
  updateContext: updateContext2,
  getUpdateViews,
  didUnmount,
  willUnmount: willUnmount2,
  didMount: didMount2
}) {
  comp.updateState = updateState;
  comp.updateProp = updateProp;
  comp.updateContext = updateContext2;
  comp.getUpdateViews = getUpdateViews;
  comp.didUnmount = didUnmount;
  comp.willUnmount = willUnmount2;
  comp.didMount = didMount2;
  return comp;
}
function initCompNode(node) {
  node.mounting = true;
  const willCall = () => {
    callUpdatesBeforeInit(node);
    if (node.didMount)
      addDidMount(node, node.didMount);
    if (node.willUnmount)
      addWillUnmount(node, node.willUnmount);
    addDidUnmount(node, setUnmounted.bind(null, node));
    if (node.didUnmount)
      addDidUnmount(node, node.didUnmount);
    if (node.getUpdateViews) {
      const result = node.getUpdateViews();
      if (Array.isArray(result)) {
        const [baseNode, updateView2] = result;
        node.updateView = updateView2;
        node._$nodes = baseNode;
      } else {
        node.updateView = result;
      }
    }
  };
  willCall();
  return node;
}
function setUnmounted(node) {
  node._$unmounted = true;
}
function callUpdatesBeforeInit(node) {
  node.updateState(-1);
  delete node.mounting;
}
function cacheCheck(node, key, deps) {
  if (!deps || !deps.length)
    return false;
  if (!node.cache) {
    node.cache = {};
  }
  if (equal(deps, node.cache[key]))
    return true;
  node.props[key] = deps;
  return false;
}
function setProp(node, key, valueFunc, deps) {
  if (cacheCheck(node, key, deps))
    return;
  node.props[key] = valueFunc();
  node.updateProp(key, node.props[key]);
}
function setProps(node, valueFunc, deps) {
  if (cacheCheck(node, "props", deps))
    return;
  const props = valueFunc();
  if (!props)
    return;
  Object.entries(props).forEach(([key, value]) => {
    setProp(node, key, () => value, []);
  });
}
function updateContext(node, key, value, context) {
  if (!node.updateContext)
    return;
  node.updateContext(context, key, value);
}
function updateCompNode(node, newValue, bit) {
  if ("mounting" in node)
    return;
  node.updateState(bit || 0);
  if (!inMount()) {
    updateView(node, bit || 0);
  }
}
function updateView(node, bit) {
  if (!bit)
    return;
  if ("_$depNumsToUpdate" in node) {
    node._$depNumsToUpdate?.push(bit);
  } else {
    node._$depNumsToUpdate = [bit];
    schedule(() => {
      if (node._$unmounted)
        return;
      const depNums = node._$depNumsToUpdate || [];
      if (depNums.length > 0) {
        const depNum = depNums.reduce((acc, cur) => acc | cur, 0);
        node.updateView?.(depNum);
      }
      delete node._$depNumsToUpdate;
    });
  }
}

// src/HookNode.ts
function createHookNode(parent, bitmap) {
  return {
    updateProp: builtinUpdateFunc,
    updateState: builtinUpdateFunc,
    __type: InulaNodeType.Hook,
    props: {},
    _$nodes: [],
    bitmap,
    parent
  };
}
function emitUpdate(node) {
  updateCompNode(node.parent, null, node.bitmap);
}
function constructHook(node, {
  value,
  updateState,
  updateProp,
  updateContext: updateContext2,
  getUpdateViews,
  didUnmount,
  willUnmount: willUnmount2,
  didMount: didMount2
}) {
  node.value = value;
  node.updateState = updateState;
  node.updateProp = updateProp;
  node.updateContext = updateContext2;
  node.getUpdateViews = getUpdateViews;
  node.didUnmount = didUnmount;
  node.willUnmount = willUnmount2;
  node.didMount = didMount2;
  return node;
}

// src/ContextNode.ts
var contextNodeMap;
function getContextNodeMap() {
  return contextNodeMap;
}
function createContextNode(ctx, value, depMap) {
  if (!contextNodeMap)
    contextNodeMap = /* @__PURE__ */ new Map();
  const ContextNode = {
    value,
    depMap,
    context: ctx,
    __type: InulaNodeType.Context,
    consumers: /* @__PURE__ */ new Set(),
    _$nodes: []
  };
  replaceContextValue(ContextNode);
  return ContextNode;
}
function updateContextNode(contextNode, name, valueFunc, deps) {
  if (cached(contextNode, deps, name))
    return;
  const value = valueFunc();
  contextNode.value[name] = value;
  contextNode.consumers.forEach((node) => {
    node.updateContext(contextNode.context, name, value);
  });
}
function cached(contextNode, deps, name) {
  if (!deps || !deps.length)
    return false;
  if (equal(deps, contextNode.depMap[name]))
    return true;
  contextNode.depMap[name] = deps;
  return false;
}
function replaceContextValue(contextNode) {
  contextNode.prevValue = contextNode.context.value;
  contextNode.prevContextNode = contextNodeMap.get(contextNode.context.id);
  contextNode.context.value = contextNode.value;
  contextNodeMap.set(contextNode.context.id, contextNode);
}
function initContextChildren(contextNode, nodes) {
  contextNode._$nodes = nodes;
  contextNode.context.value = contextNode.prevValue || null;
  if (contextNode.prevContextNode) {
    contextNodeMap.set(contextNode.context.id, contextNode.prevContextNode);
  } else {
    contextNodeMap.delete(contextNode.context.id);
  }
  contextNode.prevValue = null;
  contextNode.prevContextNode = null;
}
function replaceContext(contextNodeMap2) {
  for (const [ctxId, contextNode] of contextNodeMap2.entries()) {
    replaceContextValue(contextNode);
  }
}
function addConsumer(contextNode, node) {
  contextNode.consumers.add(node);
  addWillUnmount(node, contextNode.consumers.delete.bind(contextNode.consumers, node));
}
function createContext(defaultVal) {
  return {
    id: Symbol("inula-ctx"),
    value: defaultVal
  };
}
function useContext(ctx, key) {
  if (contextNodeMap) {
    const contextNode = contextNodeMap.get(ctx.id);
    if (contextNode) {
      addConsumer(contextNode, currentComp);
    }
  }
  if (key && ctx.value) {
    return ctx.value[key];
  }
  return ctx.value;
}

// src/ChildrenNode.ts
function createChildrenNode(childrenFunc) {
  return {
    __type: InulaNodeType.Children,
    childrenFunc,
    updaters: /* @__PURE__ */ new Set()
  };
}
function buildChildren(childrenNode) {
  let update;
  const addUpdate = (updateFunc) => {
    update = updateFunc;
    childrenNode.updaters.add(updateFunc);
  };
  const newNodes = childrenNode.childrenFunc(addUpdate);
  if (newNodes.length === 0)
    return [];
  if (update) {
    addWillUnmount(newNodes[0], childrenNode.updaters.delete.bind(childrenNode.updaters, update));
  }
  return newNodes;
}
function updateChildrenNode(childrenNode, changed) {
  childrenNode.updaters.forEach((update) => {
    update(changed);
  });
}

// src/MutableNode/mutableHandler.ts
function setUnmountFuncs(node) {
  const [willUnmountFuncs, didUnmountFuncs] = endUnmountScope();
  node.willUnmountFuncs = willUnmountFuncs;
  node.didUnmountFuncs = didUnmountFuncs;
}
function runLifeCycle(fn) {
  for (let i = 0; i < fn.length; i++) {
    fn[i]();
  }
}
function removeNodesWithUnmount(node, children) {
  runLifeCycle(node.willUnmountFuncs);
  removeNodes(node, children);
  runLifeCycle(node.didUnmountFuncs);
}
function geneNewNodesInEnvWithUnmount(node, newNodesFunc) {
  startUnmountScope();
  const nodes = geneNewNodesInCtx(node, newNodesFunc);
  setUnmountFuncs(node);
  return nodes;
}
function getSavedCtxNodes() {
  const contextNodeMap2 = getContextNodeMap();
  if (contextNodeMap2) {
    return new Map([...contextNodeMap2]);
  }
  return null;
}
function initNewNodes(node, children) {
  addParentEl(children, node._$parentEl);
}
function geneNewNodesInCtx(node, newNodesFunc) {
  if (!node.savedContextNodes) {
    const newNodes2 = newNodesFunc();
    initNewNodes(node, newNodes2);
    return newNodes2;
  }
  const currentContextNodes = getContextNodeMap();
  replaceContext(node.savedContextNodes);
  const newNodes = newNodesFunc();
  replaceContext(currentContextNodes);
  initNewNodes(node, newNodes);
  return newNodes;
}
function removeNodes(node, children) {
  loopShallowEls(children, (dom) => {
    node._$parentEl.removeChild(dom);
  });
}

// src/MutableNode/ForNode.ts
function createForNode(array, depNum, keys, nodeFunc) {
  const forNode = {
    __type: InulaNodeType.For,
    array: [...array],
    depNum,
    keys,
    nodeFunc,
    nodesMap: /* @__PURE__ */ new Map(),
    updateArr: [],
    didUnmountFuncs: /* @__PURE__ */ new Map(),
    willUnmountFuncs: /* @__PURE__ */ new Map(),
    savedContextNodes: getSavedCtxNodes(),
    get _$nodes() {
      const nodes = [];
      for (let idx = 0; idx < forNode.array.length; idx++) {
        nodes.push(...forNode.nodesMap.get(forNode.keys?.[idx] ?? idx));
      }
      return nodes;
    }
  };
  addNodeFunc(forNode, nodeFunc);
  return forNode;
}
function addNodeFunc(forNode, nodeFunc) {
  forNode.array.forEach((item, idx) => {
    startUnmountScope();
    const key = forNode.keys?.[idx] ?? idx;
    const nodes = nodeFunc(item, idx, forNode.updateArr);
    forNode.nodesMap.set(key, nodes);
    setUnmountMap(forNode, key);
  });
  addWillUnmount(forNode, () => runLifecycleMap(forNode.willUnmountFuncs));
  addDidUnmount(forNode, () => runLifecycleMap(forNode.didUnmountFuncs));
}
function runLifecycleMap(map, key) {
  if (!map || map.size === 0) {
    return;
  }
  if (typeof key === "number") {
    const funcs = map.get(key);
    if (!funcs)
      return;
    for (let i = 0; i < funcs.length; i++)
      funcs[i]?.();
    map.delete(key);
  } else {
    map.forEach((funcs) => {
      for (let i = funcs.length - 1; i >= 0; i--)
        funcs[i]?.();
    });
    map.clear();
  }
}
function setUnmountMap(forNode, key) {
  const [willUnmountMap, didUnmountMap] = endUnmountScope();
  if (willUnmountMap && willUnmountMap.length > 0) {
    if (!forNode.willUnmountFuncs)
      forNode.willUnmountFuncs = /* @__PURE__ */ new Map();
    forNode.willUnmountFuncs.set(key, willUnmountMap);
  }
  if (didUnmountMap && didUnmountMap.length > 0) {
    if (!forNode.didUnmountFuncs)
      forNode.didUnmountFuncs = /* @__PURE__ */ new Map();
    forNode.didUnmountFuncs.set(key, didUnmountMap);
  }
}
function updateForChildren(forNode, changed) {
  if (!(~forNode.depNum & changed))
    return;
  for (let idx = 0; idx < forNode.array.length; idx++) {
    updateItem(forNode, idx, forNode.array, changed);
  }
}
function updateItem(forNode, idx, array, changed) {
  forNode.updateArr[idx]?.(changed ?? forNode.depNum, array[idx]);
}
function updateForNode(forNode, newArray, newKeys) {
  if (newKeys) {
    updateWithKey(forNode, newArray, newKeys);
    return;
  }
  updateWithOutKey(forNode, newArray);
}
function getNewNodes(forNode, idx, key, array, updateArr) {
  startUnmountScope();
  const nodes = geneNewNodesInCtx(forNode, () => forNode.nodeFunc(array[idx], idx, updateArr ?? forNode.updateArr));
  setUnmountMap(forNode, key);
  forNode.nodesMap.set(key, nodes);
  return nodes;
}
function removeNodes2(forNode, nodes, key) {
  runLifecycleMap(forNode.willUnmountFuncs, key);
  removeNodes(forNode, nodes);
  runLifecycleMap(forNode.didUnmountFuncs, key);
  forNode.nodesMap.delete(key);
}
function updateWithOutKey(forNode, newArray) {
  const preLength = forNode.array.length;
  const currLength = newArray.length;
  if (preLength === currLength) {
    for (let idx = 0; idx < forNode.array.length; idx++) {
      updateItem(forNode, idx, newArray);
    }
    forNode.array = [...newArray];
    return;
  }
  const parentEl = forNode._$parentEl;
  if (preLength < currLength) {
    let flowIndex = getFlowIndexFromNodes(parentEl._$nodes, forNode);
    const length = parentEl.childNodes.length;
    for (let idx = 0; idx < currLength; idx++) {
      if (idx < preLength) {
        flowIndex += getFlowIndexFromNodes(forNode.nodesMap.get(idx));
        updateItem(forNode, idx, newArray);
        continue;
      }
      const newNodes = getNewNodes(forNode, idx, idx, newArray);
      appendNodesWithIndex(newNodes, parentEl, flowIndex, length);
    }
    runDidMount();
    forNode.array = [...newArray];
    return;
  }
  for (let idx = 0; idx < currLength; idx++) {
    updateItem(forNode, idx, newArray);
  }
  for (let idx = currLength; idx < preLength; idx++) {
    const nodes = forNode.nodesMap.get(idx);
    removeNodes2(forNode, nodes, idx);
  }
  forNode.updateArr.splice(currLength, preLength - currLength);
  forNode.array = [...newArray];
}
function arrayEqual(arr1, arr2) {
  if (arr1.length !== arr2.length)
    return false;
  return arr1.every((item, idx) => item === arr2[idx]);
}
function updateWithKey(forNode, newArray, newKeys) {
  if (newKeys.length !== new Set(newKeys).size) {
    throw new Error("Inula-Next: Duplicate keys in for loop are not allowed");
  }
  const prevKeys = forNode.keys;
  forNode.keys = newKeys;
  if (arrayEqual(prevKeys, newKeys)) {
    for (let idx = 0; idx < newArray.length; idx++) {
      updateItem(forNode, idx, newArray);
    }
    forNode.array = [...newArray];
    return;
  }
  const parentEl = forNode._$parentEl;
  if (newKeys.length === 0) {
    const parentNodes = parentEl._$nodes ?? [];
    if (parentNodes.length === 1 && parentNodes[0] === forNode) {
      runLifecycleMap(forNode.willUnmountFuncs);
      parentEl.innerHTML = "";
      runLifecycleMap(forNode.didUnmountFuncs);
    } else {
      for (let prevIdx = 0; prevIdx < prevKeys.length; prevIdx++) {
        const prevKey = prevKeys[prevIdx];
        removeNodes2(forNode, forNode.nodesMap.get(prevKey), prevKey);
      }
    }
    forNode.nodesMap.clear();
    forNode.updateArr = [];
    forNode.array = [];
    return;
  }
  const flowIndex = getFlowIndexFromNodes(parentEl._$nodes, forNode);
  if (prevKeys.length === 0) {
    const nextSibling = parentEl.childNodes[flowIndex];
    for (let idx = 0; idx < newKeys.length; idx++) {
      const newNodes = getNewNodes(forNode, idx, newKeys[idx], newArray);
      appendNodesWithSibling(newNodes, parentEl, nextSibling);
    }
    runDidMount();
    forNode.array = [...newArray];
    return;
  }
  const shuffleKeys = [];
  const newUpdateArr = [];
  for (let prevIdx = 0; prevIdx < prevKeys.length; prevIdx++) {
    const prevKey = prevKeys[prevIdx];
    if (forNode.keys.includes(prevKey)) {
      shuffleKeys.push(prevKey);
      newUpdateArr.push(forNode.updateArr[prevIdx]);
      continue;
    }
    removeNodes2(forNode, forNode.nodesMap.get(prevKey), prevKey);
  }
  let length = parentEl.childNodes.length;
  let newFlowIndex = flowIndex;
  for (let idx = 0; idx < forNode.keys.length; idx++) {
    const key = forNode.keys[idx];
    const prevIdx = shuffleKeys.indexOf(key);
    if (prevIdx !== -1) {
      newFlowIndex += getFlowIndexFromNodes(forNode.nodesMap.get(key));
      newUpdateArr[prevIdx]?.(forNode.depNum, newArray[idx]);
      continue;
    }
    newUpdateArr.splice(idx, 0, null);
    const newNodes = getNewNodes(forNode, idx, key, newArray);
    shuffleKeys.splice(idx, 0, key);
    const count = appendNodesWithIndex(newNodes, parentEl, newFlowIndex, length);
    newFlowIndex += count;
    length += count;
  }
  runDidMount();
  if (arrayEqual(forNode.keys, shuffleKeys)) {
    forNode.array = [...newArray];
    forNode.updateArr = newUpdateArr;
    return;
  }
  newFlowIndex = flowIndex;
  const bufferNodes = /* @__PURE__ */ new Map();
  for (let idx = 0; idx < forNode.keys.length; idx++) {
    const key = forNode.keys[idx];
    const prevIdx = shuffleKeys.indexOf(key);
    const bufferedNode = bufferNodes.get(key);
    if (bufferedNode) {
      const bufferedFlowIndex = getFlowIndexFromNodes(bufferedNode);
      const lastEl = toEls(bufferedNode).pop();
      const nextSibling = parentEl.childNodes[newFlowIndex + bufferedFlowIndex];
      if (lastEl !== nextSibling && lastEl.nextSibling !== nextSibling) {
        insertNodesBefore(bufferedNode, parentEl, nextSibling);
      }
      newFlowIndex += bufferedFlowIndex;
    } else if (prevIdx === idx) {
      newFlowIndex += getFlowIndexFromNodes(forNode.nodesMap.get(key));
      continue;
    } else {
      const prevKey = shuffleKeys[idx];
      bufferNodes.set(prevKey, forNode.nodesMap.get(prevKey));
      const childNodes = forNode.nodesMap.get(key);
      const lastEl = toEls(childNodes).pop();
      const nextSibling = parentEl.childNodes[newFlowIndex];
      if (lastEl !== nextSibling && lastEl.nextSibling !== nextSibling) {
        newFlowIndex += insertNodesBefore(childNodes, parentEl, nextSibling);
      }
    }
    const tempKey = shuffleKeys[idx];
    shuffleKeys[idx] = shuffleKeys[prevIdx];
    shuffleKeys[prevIdx] = tempKey;
    const tempUpdateFunc = newUpdateArr[idx];
    newUpdateArr[idx] = newUpdateArr[prevIdx];
    newUpdateArr[prevIdx] = tempUpdateFunc;
  }
  forNode.array = [...newArray];
  forNode.updateArr = newUpdateArr;
}

// src/MutableNode/ExpNode.ts
function isChildrenNode(node) {
  return node.__type === InulaNodeType.Children;
}
function getExpressionResult(fn) {
  let nodes = fn();
  if (!Array.isArray(nodes))
    nodes = [nodes];
  return nodes.flat(1).filter((node) => node !== void 0 && node !== null && typeof node !== "boolean").map((node) => {
    if (typeof node === "string" || typeof node === "number" || typeof node === "bigint") {
      return createTextNode(`${node}`);
    }
    if (isChildrenNode(node))
      return buildChildren(node);
    return node;
  }).flat(1);
}
function createExpNode(value, deps) {
  startUnmountScope();
  const expNode = {
    __type: InulaNodeType.Exp,
    _$nodes: getExpressionResult(value),
    deps,
    savedContextNodes: getSavedCtxNodes(),
    willUnmountFuncs: [],
    didUnmountFuncs: []
  };
  setUnmountFuncs(expNode);
  if (expNode.willUnmountFuncs) {
    addWillUnmount(expNode, runLifeCycle.bind(expNode, expNode.willUnmountFuncs));
  }
  if (expNode.didUnmountFuncs) {
    addDidUnmount(expNode, runLifeCycle.bind(expNode, expNode.didUnmountFuncs));
  }
  return expNode;
}
function updateExpNode(expNode, valueFunc, deps) {
  if (cache2(expNode, deps))
    return;
  removeNodesWithUnmount(expNode, expNode._$nodes);
  const newNodes = geneNewNodesInCtx(expNode, () => getExpressionResult(valueFunc));
  if (newNodes.length === 0) {
    expNode._$nodes = [];
    return;
  }
  const parentEl = expNode._$parentEl;
  const flowIndex = getFlowIndexFromNodes(parentEl._$nodes, expNode);
  const nextSibling = parentEl.childNodes[flowIndex];
  appendNodesWithSibling(newNodes, parentEl, nextSibling);
  runDidMount();
  expNode._$nodes = newNodes;
}
function cache2(expNode, deps) {
  if (!deps || !deps.length)
    return false;
  if (equal(deps, expNode.deps))
    return true;
  expNode.deps = deps;
  return false;
}

// src/MutableNode/CondNode.ts
function createCondNode(depNum, condFunc) {
  startUnmountScope();
  const condNode = {
    __type: InulaNodeType.Cond,
    cond: -1,
    didntChange: false,
    depNum,
    condFunc,
    savedContextNodes: getSavedCtxNodes(),
    _$nodes: [],
    willUnmountFuncs: [],
    didUnmountFuncs: []
  };
  condNode._$nodes = condFunc(condNode);
  setUnmountFuncs(condNode);
  if (condNode.willUnmountFuncs) {
    addWillUnmount(condNode, runLifeCycle.bind(condNode, condNode.willUnmountFuncs));
  }
  if (condNode.didUnmountFuncs) {
    addDidUnmount(condNode, runLifeCycle.bind(condNode, condNode.didUnmountFuncs));
  }
  return condNode;
}
function updateCondChildren(condNode, changed) {
  if (condNode.depNum & changed) {
    return;
  }
  condNode.updateFunc?.(changed);
}
function updateCondNode(condNode) {
  const prevFuncs = [condNode.willUnmountFuncs, condNode.didUnmountFuncs];
  const newNodes = geneNewNodesInEnvWithUnmount(condNode, () => condNode.condFunc(condNode));
  if (condNode.didntChange) {
    [condNode.willUnmountFuncs, condNode.didUnmountFuncs] = prevFuncs;
    condNode.didntChange = false;
    condNode.updateFunc?.(condNode.depNum);
    return;
  }
  const newFuncs = [condNode.willUnmountFuncs, condNode.didUnmountFuncs];
  [condNode.willUnmountFuncs, condNode.didUnmountFuncs] = prevFuncs;
  condNode._$nodes && condNode._$nodes.length > 0 && removeNodesWithUnmount(condNode, condNode._$nodes);
  [condNode.willUnmountFuncs, condNode.didUnmountFuncs] = newFuncs;
  if (newNodes.length === 0) {
    condNode._$nodes = [];
    return;
  }
  const parentEl = condNode._$parentEl;
  const flowIndex = getFlowIndexFromNodes(parentEl._$nodes, condNode);
  const nextSibling = parentEl.childNodes[flowIndex];
  appendNodesWithSibling(newNodes, parentEl, nextSibling);
  runDidMount();
  condNode._$nodes = newNodes;
}

// src/index.ts
function render(compFn, container) {
  if (container == null) {
    throw new Error("Render target is empty. Please provide a valid DOM element.");
  }
  container.innerHTML = "";
  const node = Comp(compFn);
  insertNode(container, node, 0);
  runDidMount();
}
function untrack(callback) {
  return callback();
}
var currentComp = null;
function inMount() {
  return !!currentComp;
}
function Comp(compFn, props = {}) {
  return mountNode(() => createCompNode(), compFn, props);
}
function mountNode(ctor, compFn, props) {
  const compNode = ctor();
  const prevNode = currentComp;
  try {
    currentComp = compNode;
    compFn(props);
  } catch (err) {
    throw err;
  } finally {
    currentComp = prevNode;
  }
  return compNode;
}
function createComponent(compUpdater) {
  if (!currentComp || currentComp.__type !== InulaNodeType.Comp) {
    throw new Error("Should not call createComponent outside the component function");
  }
  constructComp(currentComp, compUpdater);
  return currentComp;
}
function notCached(node, cacheId, cacheValues) {
  if (!cacheValues || !cacheValues.length)
    return false;
  if (!node.$nonkeyedCache) {
    node.$nonkeyedCache = {};
  }
  if (!equal(cacheValues, node.$nonkeyedCache[cacheId])) {
    node.$nonkeyedCache[cacheId] = cacheValues;
    return true;
  }
  return false;
}
function didMount(fn) {
  throw new Error("lifecycle should be compiled, check the babel plugin");
}
function willUnmount(fn) {
  throw new Error("lifecycle should be compiled, check the babel plugin");
}
function didUnMount(fn) {
  throw new Error("lifecycle should be compiled, check the babel plugin");
}
function useHook(hookFn, params, bitMap) {
  if (currentComp) {
    const props = params.reduce((obj, val, idx) => ({ ...obj, [`p${idx}`]: val }), {});
    return mountNode(() => createHookNode(currentComp, bitMap), hookFn, props);
  }
  throw new Error("useHook must be called within a component");
}
function createHook(compUpdater) {
  if (!currentComp || currentComp.__type !== InulaNodeType.Hook) {
    throw new Error("Should not call createComponent outside the component function");
  }
  constructHook(currentComp, compUpdater);
  return currentComp;
}
function runOnce(fn) {
  if (currentComp) {
    fn();
  }
}
function createNode(type, ...args) {
  switch (type) {
    case InulaNodeType.Context:
      return createContextNode(...args);
    case InulaNodeType.Children:
      return createChildrenNode(...args);
    case InulaNodeType.Comp:
      return createCompNode(...args);
    case InulaNodeType.Hook:
      return createHookNode(...args);
    case InulaNodeType.For:
      return createForNode(...args);
    case InulaNodeType.Cond:
      return createCondNode(...args);
    case InulaNodeType.Exp:
      return createExpNode(...args);
    default:
      throw new Error(`Unsupported node type: ${type}`);
  }
}
function updateNode(...args) {
  const node = args[0];
  switch (node.__type) {
    case InulaNodeType.Context:
      updateContextNode(...args);
      break;
    case InulaNodeType.Children:
      updateChildrenNode(...args);
      break;
    case InulaNodeType.For:
      updateForNode(...args);
      break;
    case InulaNodeType.Cond:
      updateCondNode(...args);
      break;
    case InulaNodeType.Exp:
      updateExpNode(...args);
      break;
    case InulaNodeType.Comp:
    case InulaNodeType.Hook:
      updateCompNode(...args);
      break;
    default:
      throw new Error(`Unsupported node type: ${node.__type}`);
  }
}
function updateChildren(...args) {
  const node = args[0];
  switch (node.__type) {
    case InulaNodeType.For:
      updateForChildren(...args);
      break;
    case InulaNodeType.Cond:
      updateCondChildren(...args);
      break;
    default:
      throw new Error(`Unsupported node type: ${node.__type}`);
  }
}
export {
  Comp,
  addConsumer,
  appendChild,
  builtinUpdateFunc,
  constructComp,
  createCompNode,
  createComponent,
  createCondNode,
  createContext,
  createContextNode,
  createElement,
  createExpNode,
  createForNode,
  createHook,
  createNode,
  createTextNode,
  currentComp,
  delegateEvent,
  didMount,
  didUnMount,
  emitUpdate,
  getContextNodeMap,
  inMount,
  initCompNode,
  initContextChildren,
  insertNode,
  notCached,
  render,
  replaceContext,
  runOnce,
  setDataset,
  setEvent,
  setHTMLAttr,
  setHTMLAttrs,
  setHTMLProp,
  setHTMLProps,
  setProp,
  setProps,
  setStyle,
  untrack,
  updateChildren,
  updateCompNode,
  updateCondChildren,
  updateCondNode,
  updateContext,
  updateContextNode,
  updateExpNode,
  updateForChildren,
  updateForNode,
  updateNode,
  updateText,
  useContext,
  useHook,
  willUnmount
};
//# sourceMappingURL=index.js.map