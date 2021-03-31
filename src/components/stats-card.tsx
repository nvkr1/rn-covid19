import React, {useState} from 'react';
import {StyleSheet, View, StyleProp, ViewStyle} from 'react-native';
import {Card, Text} from 'react-native-elements';

type StatsCardProps = {
  title: string;
  stats: number;
  adjustsFontSizeToFit?: boolean;
  titleStyle?: StyleSheet.NamedStyles<Text>;
  containerStyle?: StyleProp<ViewStyle>;
  statsStyle?: StyleSheet.NamedStyles<Text>;
  children?: React.ReactChildren;
};

const StatsCard: React.FC<StatsCardProps> = (props: StatsCardProps) => {
  const [fontSize, setFontSize] = useState(20);
  return (
    <Card containerStyle={props.containerStyle}>
      <Card.Title
        numberOfLines={1}
        adjustsFontSizeToFit={true}
        style={{...props.titleStyle, fontSize: fontSize}}
        onLayout={event => {
          let {width} = event.nativeEvent.layout;
          setFontSize(Math.floor(1.7 * (width / props.title.length)));
        }}>
        Affected
      </Card.Title>
      <Text h2 style={props.statsStyle}>
        {props.stats}
      </Text>
    </Card>
  );
};

const styles = StyleSheet.create({});

export default StatsCard;
