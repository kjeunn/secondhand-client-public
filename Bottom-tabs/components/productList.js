import React from "react";
import { View, Text, Linking, StyleSheet } from "react-native";
import { ListItem, Icon } from "react-native-elements";

const ProductList = props => {
  // NOTE 어느 리스트를 전달 받는지에 따라 변수 할당을 다르게 합니다. (즐겨찾기 리스트인지, 제품 검색 결과인지)
  let filteredData, averagePrice, favoriteList;
  if (props.data) {
    filteredData = props.data.filtered_data;
    averagePrice = props.data.average_price;
  } else if (props.favoriteList) {
    favoriteList = props.favoriteList;
  }

  // NOTE 즐겨찾기가 추가 되어 있으면 빈 하트 아이콘, 아니면 일반 하트 아이콘(prop으로 전달 받아야 함)
  // TOFIX 빈 하트 아이콘 로딩이 안되요 ㅠㅠ
  let isFavorite = true;
  let favoritIcon;
  isFavorite ? (favoritIcon = "favorite") : (favoritIcon = "favorite_border");

  // NOTE average_price 변수가 존재하면 해당 객체에 존재하는 평균가격을 할당하고, 그렇지 않으면 '정보 없음' 이라고 표시합니다.
  let average;
  averagePrice
    ? (average = averagePrice.average_price)
    : (average = "정보 없음");

  // NOTE filteredData(검색 결과)가 존재하면 list 변수는 filteredData를 할당받고, favoriteList(즐겨찾기)가 존재하면 list는 favoriteList를 할당받습니다.
  let list;
  if (filteredData) {
    list = filteredData;
  } else {
    list = favoriteList;
  }

  return (
    <View>
      {list.map(l => {
        // NOTE 데이터에 지역정보가 존재하면 해당 지역을 표시하고, 그렇지 않은 경우 대체 문구를 표시합니다.
        let location;
        l.location === "-"
          ? (location = "지역정보 없음")
          : (location = l.location);

        return (
          <ListItem
            key={l.id}
            leftAvatar={{ source: { uri: l.img_url } }}
            title={`${l.brand} / ${l.model}`}
            subtitle={
              <View>
                <Text>{`판매가: ${l.price} / 평균가: ${average}`}</Text>
                <View style={styles.details}>
                  <Icon name="md-pin" type="ionicon" size={18} />
                  <View style={styles.location}>
                    <Text>{location}</Text>
                  </View>
                  <View style={styles.market}>
                    <Text style={{ textAlign: "right" }}>{l.market}</Text>
                  </View>
                </View>
              </View>
            }
            onPress={() => Linking.openURL(l.url)}
            rightIcon={
              <Icon
                name={favoritIcon}
                type="material"
                color="#f9b0c3"
                size={40}
                onPress={() => console.log("즐겨 찾기 상태를 변경해야 합니다.")}
              />
            }
            bottomDivider
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  details: { flex: 1, flexDirection: "row", marginBottom: "5%" },
  location: {
    flex: 1,
    justifyContent: "space-between",
    marginLeft: "1%"
  },
  market: {
    flex: 1,
    justifyContent: "space-between",
    width: "50%"
  }
});

export default ProductList;
