import React, { useState, useEffect } from 'react'
import { FlatList, RefreshControl } from 'react-native'
import { useIsFocused } from '@react-navigation/core';

import TaskItem from './tasksitems';
import { getTasks,deleteTask } from '../../api';

const TaskList = ({iduser}) => { 

    const [tasks, setTasks] = useState([]);
    const [refresing, setRefresing] = useState(false);

    const isFocus = useIsFocused();

    const loadTasks = async () => {
        const data = await getTasks(iduser);
        
        setTasks(data);
    }

    //cuando cargue el home screen esto sera lo primero que se ejecutara
    useEffect(() => {
        loadTasks();
    }, [isFocus])

    const handleDelete = async (id) => {
        await deleteTask(id);
        await loadTasks();
    }

    const renderItem = ({ item }) => {

        return <TaskItem tasks={item} iduser={iduser} handleDelete={handleDelete}/>; 

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