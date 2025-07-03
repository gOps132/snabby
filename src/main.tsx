
import Snabbdom from 'snabbdom-pragma'

import {
    init, 
    classModule,
    propsModule,
    styleModule,
    eventListenersModule
} from 'snabbdom';

const patch = init([
  // Init patch function with chosen modules
  classModule, // makes it easy to toggle classes
  propsModule, // for setting properties on DOM elements
  styleModule, // handles styling on elements with support for animations
  eventListenersModule // attaches event listeners
]);

import Navigo from 'navigo';

import router from './router';

import { renderToDoPage, setup as setupToDo } from './pages/todo';

const container = document.getElementById('container');
if (!container) throw new Error('Missing content element');

let oldVNode: VNode;

function render(vnode: any): VNode {
    oldVNode = patch(oldVNode, vnode);
}

// Inject patch + container into todo page module
setupToDo(patch, container);

router.on('/todo', async () => {
  await renderToDoPage();
});

router.on('/', () => {
  patch(container, <div><h1>Welcome Home</h1><a href="#/todo">Go to TODO</a></div>);
});

router.resolve();
