import React, {useEffect, useState, useMemo, useContext} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  StatusBar,
  ActivityIndicator,
  Linking,
} from 'react-native';
import {Text, Card, ThemeProvider, Button, Header} from 'react-native-elements';
import numeral from 'numeral';

import SegmentedControlTabs from '../components/segmented-control';
import TextTabs from '../components/text-tabs';
import BarChart from '../components/bar-chart';
import {Stack} from '../components/spacing';
import WorldDataContext from '../context/world-data-context';
import CountryDataContext from '../context/country-data-context';

const sw = Dimensions.get('window').width;
const sh = Dimensions.get('window').height;

const StatisticsScreen: React.FC = () => {
  /* =======
    States
  ========= */

  const [periodIndex, setPeriodIndex] = useState<number>(0);
  const [areaIndex, setAreaIndex] = useState<number>(0);
  const [chartData, setChartData] = useState<ChartData | null>();
  const worldContext = useContext(WorldDataContext);
  const countryContext = useContext(CountryDataContext);

  /* =======
    Utilities
  ========= */
  // return stats difference between index and index-1 from records
  // stats1 - stats2
  const diffRecords = (
    stats1: IStatsRecord | null,
    stats2: IStatsRecord | null,
  ): IStatsRecord | null => {
    if (!stats1 || !stats2) {
      return null;
    }
    const diff: IStatsRecord = {
      ...stats1,
      ...stats2,
      Confirmed: stats1.Confirmed - stats2.Confirmed,
      Deaths: stats1.Deaths - stats2.Deaths,
      Active: stats1.Active! - stats2.Active!,
      Recovered: stats1.Recovered - stats2.Recovered,
    };
    return diff;
  };
  const diffStatsAtIndex = (
    index: number | null | undefined,
    records: IStatsRecord[] | null | undefined,
  ): IStatsRecord | null => {
    if (!records) {
      return null;
    }
    if (!index) {
      return null;
    }
    if (index < 0) {
      return null;
    }
    const stats1: IStatsRecord = records[index];
    const stats2: IStatsRecord = records[index - 1];
    return diffRecords(stats1, stats2);
  };

  /* =========
    Caches
  ========== */

  const worldRecords = useMemo<IStatsRecord[] | undefined>(():
    | IStatsRecord[]
    | undefined => {
    return worldContext.data?.map((w: IWorldData, index) => {
      const stats: IStatsRecord = {
        ID: w.Date,
        Country: 'World',
        CountryCode: 'world',
        Province: 'world',
        City: 'world',
        CityCode: 'world',
        Lat: '0',
        Lon: '0',
        Confirmed: w.TotalConfirmed,
        Deaths: w.TotalDeaths,
        Recovered: w.TotalRecovered,
        Date: w.Date,
      };
      return stats;
    });
  }, [worldContext.data]);

  // data loading
  const isCountryLoading = useMemo<boolean>(() => {
    console.log(`is cd ${countryContext.data?.length}`);
    return countryContext.data == null;
  }, [countryContext.data]);
  const isWorldLoading = useMemo<boolean>(() => {
    console.log(`is wd ${worldContext.data?.length}`);
    return worldContext.data == null;
  }, [worldContext.data]);

  // current records
  const records = useMemo<IStatsRecord[] | null | undefined>(() => {
    switch (areaIndex) {
      case 0:
        return countryContext.data;
      default:
        return worldRecords;
    }
  }, [areaIndex, countryContext, worldRecords]);

  // my country or global
  const areas = useMemo<string[]>((): string[] => {
    return ['My country', 'Global'];
  }, []);

  const periods = useMemo<string[]>((): string[] => {
    return ['Today', 'Yesterday', 'Total'];
  }, []);

  const currentStats = useMemo<IStatsRecord | null>((): IStatsRecord | null => {
    switch (periodIndex) {
      case 0:
        // today
        return diffStatsAtIndex((records?.length || 0) - 1, records);
      case 1:
        // yesterday
        return diffStatsAtIndex((records?.length || 0) - 2, records);
        break;
      case 2:
        // total
        return records![(records?.length || 0) - 1];
    }
    return null;
  }, [records, periodIndex]);

  /* ===========
    Event handlers
  ============= */
  // handle area change
  const handleAreaChanged = async (index: number): Promise<void> => {
    console.log('handle area change');
    setAreaIndex(index);
  };

  // handle period change
  const handlePeriodChanged = (index: number): void => {
    console.log('handle period change');
    setPeriodIndex(index);
  };

  /* ========== 
    Side Effects
  ========== */

  // chart data
  useEffect(() => {
    if (!records) {
      return;
    }
    let data: ChartData = {
      labels: [],
      datasets: [
        {
          data: [],
        },
      ],
    };
    const start: number = Math.max(records.length - 6, 0);
    const end: number = records.length;
    for (let i = start; i < end; i++) {
      const record: IStatsRecord = records[i];
      const date = new Date(record.Date);
      const dateFormat: string = `${date.getMonth() + 1}.${date.getDate()}`;
      data.labels.push(dateFormat);
      const diff = diffRecords(records[i], records[i - 1]);
      const count = diff?.Confirmed || 0;
      data.datasets[0].data.push(count);
    }
    setChartData(data);
  }, [records]);

  // Function return
  return (
    <ScrollView style={styles.scroll}>
      <StatusBar backgroundColor={'#483F97'} />
      <Header
        containerStyle={{
          padding: 50,
          backgroundColor: '#483F97',
          borderBottomColor: 'transparent',
        }}
        leftComponent={{icon: 'menu', color: '#fff'}}
        rightComponent={
          isWorldLoading || isCountryLoading ? (
            <ActivityIndicator color={'#fff'} size={30} />
          ) : (
            <></>
          )
        }
      />
      <View style={styles.container}>
        <Text h3 style={{color: '#fff'}}>
          Statistics
        </Text>
        <Stack size={'md'} />
        <SegmentedControlTabs
          currentIndex={areaIndex}
          values={areas}
          onChanged={handleAreaChanged}
        />
        <Stack size={'md'} />
        <ThemeProvider
          theme={{
            Text: {
              style: {
                color: '#B6B2D4',
              },
            },
          }}>
          <TextTabs
            currentIndex={periodIndex}
            values={periods}
            onChanged={handlePeriodChanged}
          />
        </ThemeProvider>
        <Stack size={'xs'} />
        <ThemeProvider
          theme={{
            Card: {
              containerStyle: {
                flex: 1,
                borderRadius: 10,
                borderWidth: 0,
                padding: 12,
                marginLeft: 15,
                marginRight: 0,
              },
              innerStyle: {
                justifyContent: 'flex-start',
              },
            },
            Text: {
              style: {
                color: 'white',
              },
            },
          }}>
          <View style={styles.cardRow}>
            <Card containerStyle={{backgroundColor: '#FFB159', marginLeft: 0}}>
              <Card.Title
                numberOfLines={1}
                adjustsFontSizeToFit={true}
                style={styles.cardTitle}>
                Affected
              </Card.Title>
              <Text h2 allowFontScaling numberOfLines={1} adjustsFontSizeToFit>
                {numeral(currentStats?.Confirmed ?? 0).format(`0,0`)}
              </Text>
            </Card>
            <Card containerStyle={{backgroundColor: '#FF5958'}}>
              <Card.Title
                numberOfLines={1}
                adjustsFontSizeToFit
                style={styles.cardTitle}>
                Death
              </Card.Title>
              <Text h2 allowFontScaling numberOfLines={1} adjustsFontSizeToFit>
                {numeral(currentStats?.Deaths ?? 0).format(`0,0`)}
              </Text>
            </Card>
          </View>
          <View style={styles.cardRow}>
            <Card containerStyle={{backgroundColor: '#4BD97A', marginLeft: 0}}>
              <Card.Title
                numberOfLines={1}
                adjustsFontSizeToFit
                style={styles.cardTitle}>
                Recovered
              </Card.Title>
              <Text h4 allowFontScaling numberOfLines={1} adjustsFontSizeToFit>
                {numeral(currentStats?.Recovered ?? 0).format(`0,0`)}
              </Text>
            </Card>
            <Card containerStyle={{backgroundColor: '#4BB6FF'}}>
              <Card.Title
                numberOfLines={1}
                adjustsFontSizeToFit
                style={styles.cardTitle}>
                Active
              </Card.Title>
              <Text h4 allowFontScaling numberOfLines={1} adjustsFontSizeToFit>
                {isNaN(currentStats?.Active || NaN) || currentStats!.Active! < 0
                  ? '?'
                  : numeral(currentStats?.Active ?? 0).format(`0,0`)}
              </Text>
            </Card>
            <Card containerStyle={{backgroundColor: '#905AFF'}}>
              <Card.Title
                numberOfLines={1}
                adjustsFontSizeToFit
                style={styles.cardTitle}>
                Serious
              </Card.Title>
              <Text h4 allowFontScaling numberOfLines={1} adjustsFontSizeToFit>
                ?
              </Text>
            </Card>
          </View>
        </ThemeProvider>
      </View>
      <Stack size={'lg'} />
      <View style={styles.footerContainer}>
        <Card
          containerStyle={{
            flex: 1,
            padding: 30,
            margin: 0,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
          }}>
          <Card.Title style={{textAlign: 'left'}} h4>
            Daily new cases
          </Card.Title>
          {chartData ? (
            <BarChart height={sh * 0.4} width={sw - 60} data={chartData} />
          ) : (
            <></>
          )}
        </Card>
      </View>
    </ScrollView>
  );
};

export default StatisticsScreen;

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: '#483F97',
    height: sh,
  },
  tabTitle: {
    color: '#fff',
  },
  container: {
    padding: 8,
    flex: 1,
  },
  cardTitle: {
    textAlign: 'left',
    color: 'white',
  },
  cardRow: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  textTabRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  footerContainer: {
    flex: 1,
    height: sh * 0.55,
  },
});
