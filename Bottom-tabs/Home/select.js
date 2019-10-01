import React, { Component } from "react";
import { Text, View, Picker, Alert } from "react-native";
import { Button } from "react-native-elements";

export default class Select extends Component {
  constructor(props) {
    super();
    this.state = {
      brand: ["BMW", "Benz", "Ferrari"],
      model: ["a", "b", "c"],
      selectedBrand: "",
      selectedModel: ""
    };
  }

  componentDidMount() {
    // 브랜드와 모델을 fetch해서 state에 저장 후 드롭다운 메뉴에 뿌려주기
  }

  goResult = () => {
    if (this.state.selectedBrand === "" || this.state.selectedModel === "") {
      this.setState({
        selectBrand: this.state.brand[0],
        selectModel: this.state.model[0]
      });
    }
    this.props.navigation.push("result");
  };

  selectBrand = event => {
    this.setState({ selectedBrand: event });
  };

  selectModel = event => {
    this.setState({ selectedModel: this.state.model[Number(event)] });
  };

  render() {
    return (
      <View>
        <Text> 여기에 그래프가 들어갈 예정 </Text>
        <Picker
          selectedValue={this.state.selectedBrand}
          style={{ height: 50, width: 200 }}
          onValueChange={itemValue => this.selectBrand(itemValue)}
        >
          {this.state.brand.map(brand => (
            <Picker.Item label={brand} value={brand} key={brand} />
          ))}
        </Picker>
        <Picker
          selectedValue={this.state.selectedModel}
          style={{ height: 50, width: 200 }}
          onValueChange={itemValue =>
            this.setState({ selectedModel: itemValue })
          }
        >
          {this.state.model.map(model => (
            <Picker.Item label={model} value={model} key={model} />
          ))}
        </Picker>
        <Button title="조건 선택" onPress={this.goResult} />
      </View>
    );
  }
}