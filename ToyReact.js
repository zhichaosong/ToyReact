class ElementWrapper {
  constructor(vchild) {
    this.root = document.createElement(vchild);
  }

  setAttribute(name, value) {
    this.root.setAttribute(name, value);
  }

  appendChild(vchild) {
    console.log('ElementWrapper:appendChild', vchild);
    vchild.mountTo(this.root);
  }

  mountTo(parent) {
    parent.appendChild(this.root);
  }
}

class TextWrapper {
  constructor(content) {
    this.root = document.createTextNode(content);
  }

  mountTo(parent) {
    parent.appendChild(this.root);
  }
}

export class Component {
  constructor() {
    this.children = [];
  }

  setAttribute(name, value) {
    this[name] = value;
  }

  mountTo(parent) {
    let vdom = this.render();
    vdom.mountTo(parent);
  }

  appendChild(vchild) {
    this.children.push(vchild);
  }
}

let insertChild = function (vchild, root) {
  if (typeof vchild === 'object' && vchild instanceof Array) {
    vchild.forEach(item => {
      insertChild(item, root);
    });
  } else {
    if (!(vchild instanceof Component)
      && !(vchild instanceof ElementWrapper)
      && !(vchild instanceof TextWrapper)) {
      vchild = String(vchild);
    }
    if (typeof vchild === 'string') {
      vchild = new TextWrapper(vchild);
    }
    root.appendChild(vchild);
  }
}

export let ToyReact = {
  createElement(type, attrs, ...children) {
    console.log(arguments);
    let element;
    if (typeof type === 'string') {
      element = new ElementWrapper(type);
    } else {
      element = new type;
    }
    for (let key in attrs) {
      // element[key] = attrs[key]; // wrong
      element.setAttribute(key, attrs[key]);
    }

    insertChild(children, element);

    return element;
  },
  render(vdom, element) {
    vdom.mountTo(element);
  }
}