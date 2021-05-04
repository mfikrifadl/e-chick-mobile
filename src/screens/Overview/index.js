import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios';
import { useTheme } from '@react-navigation/native';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Platform,
    StyleSheet,
    StatusBar,
    Alert,
    ActivityIndicator,
    Dimensions
} from 'react-native';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Overview = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [dataAyam, setDataAyam] = useState({ "afkir": 0, "mati": 0, "panen": 0, "sisa": 0 });
    const [totalPanen, setTotalPanen] = useState({});
    const [totalPakan, setTotalPakan] = useState({});
    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', async () => {
            getData();
        });

        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, [props.navigation]);

    const getData = async () => {
        const token = await AsyncStorage.getItem('token');
        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };
        try {
            setIsLoading(true);
            const res = await Axios.get(
                'https://e-chick-backend.herokuapp.com/api/home/overview',
                config,
            );
            setDataAyam(res.data.data.ayam);
            const resDataPanen = res.data.data.total_panen
            const arrayDataPanen = Object.values(resDataPanen)
            const labelsPanen = arrayDataPanen.map(x => x.nama_bulan)
            const dataPanen = arrayDataPanen.map(x => x.ekor)
            const formatDataPanen = {
                labels: labelsPanen,
                datasets: [{ data: dataPanen }]
            }
            setTotalPanen(formatDataPanen)
            const resDataPakan = res.data.data.total_pakan
            const arrayDataPakan = Object.values(resDataPakan)
            const labelsPakan = arrayDataPakan.map(x => x.nama_bulan)
            const dataPakanMasuk = arrayDataPakan.map(x => x.pakan_masuk)
            const dataPakanPakai = arrayDataPakan.map(x => x.pakan_pakai)
            const formatDataPakan = {
                labels: labelsPakan,
                datasets: [{ data: dataPakanMasuk, strokeWidth: 2, color: (opacity = 1) => `rgba(255,0,0,${opacity})` }, { data: dataPakanPakai, strokeWidth: 2, color: (opacity = 1) => `rgba(0,0,102, ${opacity})` }]
            }
            setTotalPakan(formatDataPakan)
            setIsLoading(false);
        } catch (error) {
            alert('gagal');
        }
    };

    // console.log(totalPanen)

    const data = [
        {
            name: "Sisa",
            population: dataAyam.sisa,
            color: "rgba(131, 167, 234, 1)",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            name: "Panen",
            population: dataAyam.panen,
            color: "blue",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            name: "Afkir",
            population: dataAyam.afkir,
            color: "red",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            name: "Mati",
            population: dataAyam.mati,
            color: "#ffffff",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
    ];
    const chartConfig = {
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
    };

    if (isLoading === true) {
        return (
            <View style={styles.loader}>
                <ActivityIndicator size="large" color="#009387" />
            </View>
        );
    }

    return (
        <View style={{ padding: 10 }}>
            {Object.keys(totalPanen).length !== 0 &&
                <View style={styles.cardChart}>
                    <Text>Total Panen</Text>
                    <LineChart
                        data={totalPanen}
                        width={wp('90%')} // from react-native
                        height={220}
                        // yAxisLabel="$"
                        // yAxisSuffix="k"
                        yAxisInterval={1} // optional, defaults to 1
                        chartConfig={{
                            // backgroundColor: "#e26a00",
                            // backgroundGradientFrom: "#fb8c00",
                            // backgroundGradientTo: "#ffa726",
                            decimalPlaces: 2, // optional, defaults to 2dp
                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            style: {
                                borderRadius: 16
                            },
                            propsForDots: {
                                r: "6",
                                strokeWidth: "2",
                                stroke: "#ffa726"
                            }
                        }}
                        bezier
                        style={{
                            marginVertical: 8,
                            borderRadius: 16
                        }}
                    />
                </View>
            }
            <View style={styles.cardChart}>
                <Text>Data Ayam</Text>
                <PieChart
                    data={data}
                    width={Dimensions.get("window").width}
                    height={200}
                    chartConfig={chartConfig}
                    accessor={"population"}
                    backgroundColor={"transparent"}
                // paddingLeft={"15"}
                // absolute
                />
            </View>
            {Object.keys(totalPakan).length !== 0 &&
                <View style={styles.cardChart}>
                    <Text>Grafik Pakan</Text>
                    <LineChart
                        data={totalPakan}
                        width={wp('90%')} // from react-native
                        height={220}
                        // yAxisLabel="$"
                        // yAxisSuffix="k"
                        yAxisInterval={1} // optional, defaults to 1
                        chartConfig={{
                            // backgroundColor: "#e26a00",
                            // backgroundGradientFrom: "#fb8c00",
                            // backgroundGradientTo: "#ffa726",
                            decimalPlaces: 2, // optional, defaults to 2dp
                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            style: {
                                borderRadius: 16
                            },
                            propsForDots: {
                                r: "6",
                                strokeWidth: "2",
                                stroke: "#ffa726"
                            }
                        }}
                        bezier
                        style={{
                            marginVertical: 8,
                            borderRadius: 16
                        }}
                    />
                </View>
            }
        </View>
    )
}

export default Overview

const styles = StyleSheet.create({
    cardChart: {
        alignItems: 'center',
        marginTop: 10,
        // backgroundColor: 'white'
    }
})
