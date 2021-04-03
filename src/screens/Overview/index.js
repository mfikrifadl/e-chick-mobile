import React from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
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

const Overview = () => {
    const data = [
        {
            name: "Sisa",
            population: 21500000,
            color: "rgba(131, 167, 234, 1)",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            name: "Panen",
            population: 2800000,
            color: "#F00",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            name: "Afkir",
            population: 527612,
            color: "red",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            name: "Mati",
            population: 8538000,
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
    return (
        <View style={{ padding: 10 }}>
            <View style={styles.cardChart}>
                <Text>Total Panen</Text>
                <LineChart
                    data={{
                        labels: ["January", "February", "March", "April", "May", "June"],
                        datasets: [
                            {
                                data: [
                                    7000,
                                    14000,
                                    Math.random() * 15000,
                                    Math.random() * 15000,
                                    Math.random() * 15000,
                                    Math.random() * 15000
                                ]
                            }
                        ]
                    }}
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
            <View style={styles.cardChart}>
                <Text>Grafik Pakan</Text>
                <LineChart
                    data={{
                        labels: ["January", "February", "March", "April", "May", "June"],
                        datasets: [
                            {
                                data: [1, 7, 6, 4, 2, 5],
                                strokeWidth: 2,
                                color: (opacity = 1) => `rgba(255,0,0,${opacity})`, // optional
                            },
                            {
                                data: [2, 4, 6, 8, 8, 2],
                                strokeWidth: 2,
                                color: (opacity = 1) => `rgba(0,0,102, ${opacity})`, // optional
                            },
                        ],
                        legend: ['Masuk', 'Keluar'],
                    }}
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
