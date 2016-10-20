# InfiniteList : ListView replacement for React Native

Ideas and pseudos are taken from
https://blog.getchop.io/fast-and-fluid-infinite-list-with-react-native-336d010e51f2

Suitable for huge list. Only displayed items are rendered.
```
itemHeight : height per row
bufferItems : add X number of items before and after the list / display items
displayItems : show Y number of items at once
dataModel : array
renderItem : function
```
Recycler view

![InfiniteList](https://github.com/kenny1har/infinite-list/blob/master/demo2.gif?raw=true "InfiniteList")

How to use :
npm install --save react-native-infinite-list

```javascript
constructor(props) {
  super(props);
  const data = [];
  for (i=0;i<1000;i++) {
    data.push({text:'HELLO WORLD '+i});
  }
  this.state = {
    data: data,
  };
}
```

```
<InfiniteList
  itemHeight={20}
  bufferItems={10}
  displayItems={50}
  dataModel={this.state.data}
  renderItem={(renderItem)=>(<Text>{renderItem.text}</Text>)}
/>
```

Debug / Dev mode will slow down the rendering when scrolling.
