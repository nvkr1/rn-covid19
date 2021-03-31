import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';

import {BarChart} from 'react-native-chart-kit';
import {AbstractChartConfig} from 'react-native-chart-kit/dist/AbstractChart';

const sw = Dimensions.get('window').width;
const sh = Dimensions.get('window').height;

const chartConfig: AbstractChartConfig = {
  backgroundGradientFrom: '#FFF',
  backgroundGradientTo: '#FFF',
  color: (opacity = 1) => `#ADB3CB`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  decimalPlaces: 0,
  useShadowColorFromDataset: false, // optional
  fillShadowGradientOpacity: 1,
  fillShadowGradient: '#FF5958',
  propsForBackgroundLines: {
    strokeWidth: 0,
  },
};

type AppBarChartProps = {
  data: any;
  width: number;
  height: number;
  yAxisLabel?: string;
  yAxisSuffix?: string;
  chartConfig?: AbstractChartConfig;
};

const AppBarChart: React.FC<AppBarChartProps> = (props: AppBarChartProps) => {
  return (
    <>
      <BarChart
        fromZero
        verticalLabelRotation={30}
        yAxisLabel=""
        yAxisSuffix=""
        height={props.height}
        width={props.width}
        chartConfig={chartConfig}
        data={props.data}
      />
    </>
  );
};

AppBarChart.defaultProps = {};

export default AppBarChart;
