import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const CardNews = ({ item }) => {
    const navigation = useNavigation();
    // const handleClickSubmit = async () => {
    //     await AsyncStorage.setItem('idPeriode', JSON.stringify(item.id));
    //     navigation.navigate('Menu Periode');
    // };
    return (
        <View style={styles.card}>
            <View style={{ flexDirection: 'row' }}>
                <Image style={styles.image} source={{
                    uri: item.urlToImage,
                }} />
                <View style={{ flexDirection: 'column' }}>
                    <Text style={{ fontWeight: 'bold', maxWidth: wp('40%') }}>{item.title}</Text>
                    {item.description != null &&
                        <Text style={{ marginTop: 10, maxWidth: wp('40%') }}>{item.description.substr(0, 100)}...</Text>
                    }
                    <Text style={{
                        position: 'absolute',
                        bottom: 0
                    }}>{item.source.name}</Text>
                </View>
                <Text style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0
                }}>{item.publishedAt.substr(0, 10)}</Text>
            </View>
        </View>
    );
};

export default CardNews;

const styles = StyleSheet.create({
    card: {
        width: wp('80%'),
        height: hp('20%'),
        borderRadius: 20,
        padding: 12,
        backgroundColor: 'white',
        marginBottom: 20
    },
    image: {
        backgroundColor: 'black',
        margin: 10,
        width: wp('28%'),
        height: wp('28%')
    }
});
