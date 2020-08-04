export let ToyReact = {
  createElement(type, attrs, ...children) {
    console.log(arguments);
    let element = document.createElement(type);
    for (let key in attrs) {
      // element[key] = attrs[key]; // wrong
      element.setAttribute(key, attrs[key]);
    }
    for (let child of children) {
      if (typeof child === 'string') {
        child = document.createTextNode(child);
      }
      element.appendChild(child);
    }
    return element;
  },
  render(vdom, element){
    element.appendChild(vdom);
  }
}