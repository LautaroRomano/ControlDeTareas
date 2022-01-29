import React, { useState, useEffect } from 'react'
import { FlatList, RefreshControl } from 'react-native'
import { useIsFocused } from '@react-navigation/core';

import TaskItem from './tasksitems';
import { getJSON,deleteJSON } from '../../asyncStoreControl/aStorageController';

const TaskList = () => { 

    const [tasks, setTasks] = useState([]);
    const [refresing, setRefresing] = useState(false);

    const isFocus = useIsFocused();

    const loadTasks = async () => {
        const data = await getJSON('@taskKey');
        setTasks(data);
    }

    //cuando cargue el home screen esto sera lo primero que se ejecutara
    useEffect(() => {
        loadTasks();
    }, [isFocus])

    const handleDelete = async (id) => {
        await deleteJSON('@taskKey',id);
        await loadTasks();
    }

    const renderItem = ({ item }) => {

        return <TaskItem tasks={item} handleDelete={handleDelete}/>; 

    };

    const onRefresh = React.useCallback(async () => {
        setRefresing(true);
        await loadTasks();
        setRefresing(false);
    })


    return (
        <FlatList
            style={{ width: '100%' }}
            data={tasks}
            keyExtractor={(item) => item.id + ''}
            renderItem={renderItem}
            refreshControl={
                <RefreshControl
                    refreshing={refresing}
                    colors={["tomato"]}
                    onRefresh={onRefresh}
                    progressBackgroundColor="#292929"
                />
            }

        />
    )
};

export default TaskList;