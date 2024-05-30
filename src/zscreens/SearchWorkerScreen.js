import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../constants/theme';
import MainHeader from '../components/MainHeader';
import SearchInput from '../components/SearchInput';
import Tabs from '../components/Tabs';
import SearchMasonry from '../components/SearchMasonry';
import { SEARCH_ALL, SEARCH_HOTELS, SEARCH_PLACES } from '../data';
import WorkerList from '../components/WorkerCard';

const tabs = [
    {
        title: 'Services',
        content: () => <SearchMasonry key="all" list={SEARCH_ALL} />,
    },
    // {
    //     title: 'Places',
    //     content: () => <SearchMasonry key="places" list={SEARCH_PLACES} />,
    // },
    {
        title: 'Workers',
        content: () => <WorkerList/>,
    },
];

const SearchWorkerScreen = () => {
    return (
        <View style={styles.container}>
            <MainHeader title="Search" />
            <View style={styles.inputstyle}>
            <SearchInput />
            </View>
            <Tabs items={tabs} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.light,
    },
    inputstyle: {
        
    }
});


export default SearchWorkerScreen;