import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Text,
} from 'react-native';

class InfiniteList extends ScrollView {
  constructor(props) {
    super(props);
    var newArray = props.dataModel.slice(0, props.bufferItems).concat(props.dataModel);
    this.state = {
      bodyHeight: (newArray.length - props.bufferItems) * props.itemHeight,
      dataModel: newArray,
      renderModel: [],
    };
    this.itemHeight = props.itemHeight;
    this.bufferItems = props.bufferItems;
    this.displayItems = props.displayItems;
  }
  componentDidMount() {
    this.updateRenderModel({y: 0});
  }
  updateRenderModel(contentOffset) {
    var listItemHeight = this.itemHeight;
    var firstVisibleItem = Math.max(0, Math.floor(contentOffset.y / listItemHeight));
    var renderModelSize = this.bufferItems * 2 + this.displayItems;
    var nextPosition = (firstVisibleItem - this.bufferItems) * listItemHeight;
    var newRenderModel = this.state.dataModel.slice(firstVisibleItem, firstVisibleItem + renderModelSize).map((dataItem, index) => {
      return {
        key: index,
        data: dataItem,
        position: nextPosition + index * listItemHeight
      }
    });
    this.setState({
      renderModel: newRenderModel,
    });
  }
  onScroll(e) {
    this.updateRenderModel(e.nativeEvent.contentOffset);
  }
  render() {
    var items = this.state.renderModel.map(renderItem => {
      const itemStyle = {
        position       : 'absolute',
        height         : this.itemHeight,
        left           : 0,
        top            : renderItem.position,
      };
      return <View key={renderItem.key} style={itemStyle}>{this.props.renderItem(renderItem.data)}</View>;
    });
    return (
      <ScrollView style={{flex: 1}} scrollEventThrottle={1} onScroll={this.onScroll.bind(this)}>
        <View style={{height: this.state.bodyHeight}}>
          {items}
        </View>
      </ScrollView>
    );
  }
}

module.exports = InfiniteList;
