import React, {useEffect, useMemo, useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  StatusBar,
  Linking,
} from 'react-native';
import {
  Text,
  Card,
  ThemeProvider,
  Button,
  Header,
  Image,
} from 'react-native-elements';
import {SvgXml} from 'react-native-svg';
import {Stack} from '../components/spacing';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';

const sh = Dimensions.get('window').height;
const HomeScreen: React.FC = () => {
  const handleCall = async () => {
    Linking.openURL('tel:/119');
  };

  const handleMessage = async () => {
    if (await Linking.canOpenURL('fb-messenger://')) {
      Linking.openURL(`fb-messenger://user-thread/nationalcancercentermgl`);
    } else {
      console.log('cant open messenger');
    }
  };
  return (
    <ScrollView style={styles.scroll}>
      <StatusBar backgroundColor={'#483F97'} />
      <Header
        containerStyle={{
          backgroundColor: '#483F97',
          borderBottomColor: 'transparent',
        }}
        leftComponent={{icon: 'menu', color: '#fff'}}
        rightComponent={{icon: 'menu', color: '#fff'}}
      />
      <ThemeProvider
        theme={{
          Text: {
            style: {
              color: 'white',
            },
          },
        }}>
        <View style={styles.headerSection}>
          <View style={styles.titleRow}>
            <Text h2 style={{color: '#fff'}}>
              Covid-19
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 50,
                backgroundColor: 'white',
                padding: 10,
              }}>
              <Image
                width={32}
                height={32}
                style={{width: 32, height: 32}}
                resizeMode={'contain'}
                source={{uri: 'https://www.countryflags.io/mn/shiny/64.png'}}
              />
              <Text
                style={{
                  marginLeft: 4,
                  color: '#000',
                }}>
                MONGOLIA
              </Text>
            </View>
          </View>
          <Stack size={'lg'} />
          <Text h4>Are you feeling sick?</Text>
          <Stack size={'sm'} />
          <Text style={{color: '#C7C5DF'}}>
            If you feeling sick with any of covid-19 symptoms please call or SMS
            us immediately for help
          </Text>
          <Stack size={'md'} />
          <ThemeProvider
            theme={{
              Button: {
                containerStyle: {
                  flex: 1,
                  margin: 5,
                  borderRadius: 20,
                },
                buttonStyle: {
                  padding: 10,
                },
              },
            }}>
            <View style={styles.ctaRow}>
              <Button
                title={'Call now'}
                onPress={handleCall}
                buttonStyle={{backgroundColor: '#FF4B58'}}
                titleStyle={{marginLeft: 10}}
                icon={<Icon name="phone" size={30} color={'white'} />}
              />
              <Button
                title={'Send SMS'}
                onPress={handleMessage}
                buttonStyle={{backgroundColor: '#4C79FE'}}
                titleStyle={{marginLeft: 10}}
                icon={<Icon name="wechat" size={30} color={'white'} />}
              />
            </View>
          </ThemeProvider>
        </View>
      </ThemeProvider>
      <View style={styles.bodySection}>
        <Text h2>Prevention</Text>
        <Stack size={'md'} />
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <ThemeProvider
            theme={{
              Card: {
                containerStyle: {
                  flex: 1,
                  margin: 0,
                  padding: 5,
                },
              },
            }}>
            <Card
              containerStyle={{
                borderWidth: 0,
                borderColor: 'transparent',
                elevation: 0,
              }}>
              <Card.Image
                resizeMode="contain"
                source={require('../../assets/images/remote-work-man.png')}
              />

              <Stack size={'sm'} />
              <Card.Title>Avoid close contact</Card.Title>
            </Card>
            <Card
              containerStyle={{
                borderWidth: 0,
                borderColor: 'transparent',
                elevation: 0,
              }}>
              <Card.Image
                resizeMode="contain"
                source={require('../../assets/images/doctor-man.png')}
              />
              <Stack size={'sm'} />
              <Card.Title>Clean your hands often</Card.Title>
            </Card>
            <Card
              containerStyle={{
                borderWidth: 0,
                borderColor: 'transparent',
                elevation: 0,
              }}>
              <Card.Image
                resizeMode="contain"
                source={require('../../assets/images/mask-woman.png')}
              />
              <Stack size={'sm'} />
              <Card.Title>Wear a facemask</Card.Title>
            </Card>
          </ThemeProvider>
        </View>
        <View></View>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  scroll: {
    backgroundColor: 'white',
    flex: 1,
    height: sh,
  },
  headerSection: {
    padding: '5%',
    backgroundColor: '#483F97',
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
  },
  bodySection: {
    padding: '5%',
  },
  titleRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ctaRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
