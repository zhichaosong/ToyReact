import {ToyReact, Component} from "./ToyReact";
class MyComponent extends Component{
  render(){
    // return <div>cool</div>;
    return <div>
      {this.children}
      <span>hello</span>
      {false}
      <span>world</span>
    </div>;
  }
}
let a = <MyComponent id="myDiv" name="divName">
  <div>1</div>
  <div>2</div>
  <div>
    {true}
    <span>3</span>
  </div>
</MyComponent>;

ToyReact.render(
  a,
  document.body
);