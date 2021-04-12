import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, ActivityIndicator, FlatList } from 'react-native'
import { CardNews } from '../../component';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios';

const News = ({ navigation }) => {

    const [isLoading, setIsLoading] = useState(false);
    const [dataTable, setDataTable] = useState('');
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
            getData();
        });

        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, [navigation]);

    const getData = async () => {
        const token = await AsyncStorage.getItem('token');
        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };
        try {
            setIsLoading(true);
            const res = await Axios.get(
                'https://e-chick-backend.herokuapp.com/api/home/news',
                config,
            );
            setDataTable(res.data.data);
            setIsLoading(false);
        } catch (error) {
            alert('gagal');
        }
    };

    if (isLoading === true) {
        return (
            <View style={styles.loader}>
                <ActivityIndicator size="large" color="#009387" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                style={styles.cardContainer}
                data={dataTable}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => <CardNews item={item} />}
            />
        </View>
    )
}

export default News

const styles = StyleSheet.create({
    container: {
        padding: 30,
        alignItems: 'center'
    },
})
