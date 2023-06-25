import React, {useEffect} from 'react';
import {Text, View, SafeAreaView, ScrollView, ActivityIndicator, RefreshControl, FlatList} from 'react-native'
import quranData from '../../data/quran_en.json';
import {Stack, useLocalSearchParams, useRouter, useSearchParams} from "expo-router";
import { useCallback, useState} from 'react';
import AppLoading from 'expo-app-loading';
import styles from '../Surah/Surah.style'

import {COLORS, FONT, icons, SIZES} from '../../constants';
import useFetch from "../../hook/useFetch";
import ScreenHeaderBtn from "../../components/home/Buttons/ScreenHeaderBtn";


const Surah = () => {
    const router = useRouter();
    const params = useLocalSearchParams();
    const { id: idString, name: surahName } = params;
    const id = Number(idString);

    const [surahData, setSurahData] = useState(null);


    useEffect(() => {
        const surahDataFound = quranData.find((surah) => surah.id === id);
        setSurahData(surahDataFound);
    }, [id]);

    const renderItem = ({ item: verse }) => (
        <View>
            <Text style={styles.arabicName}>
                {verse.text}
            </Text>
            <Text style={styles.englishTranslation}>
                {`${verse.id}. ${verse.translation}`}
            </Text>
        </View>
    );
    if (!surahData) {
        return <ActivityIndicator/>;
    }
    return (

        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.black}}>

        <Stack.Screen
            options={{
                headerStyle: { backgroundColor: COLORS.black },
                headerShadowVisible: false,
                headerTitle: surahName,
                headerTitleStyle: {color: COLORS.green, fontFamily: FONT.bold, fontSize: SIZES.large}
            }}
        />

            <View style={{ flex: 1, padding: SIZES.medium, }}>
<View style={styles.container}>


        <FlatList
            data={surahData.verses}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
/>

</View>
            </View>
        </SafeAreaView>
    )
}

export default Surah;