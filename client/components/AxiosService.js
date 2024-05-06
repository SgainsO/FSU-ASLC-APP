import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

// CHANGE THIS TO UR LOCAL IP!!! SHOWN WITH STARTING SERVER

const IP = "192.168.1.228"


const PORT = "3000"

// COULD MAKE THESE FETCH DATA IN CORRECT FORMAT HERE AS WELL, TOO LAZY RN
export const getURL = () => {
    return `http://${IP}:${PORT}`;
}

export const getClubsURL = () => {
    return `http://${IP}:${PORT}/api/getClubs`;
}

export const getEventsURL = () => {
    return `http://${IP}:${PORT}/api/getEvents`;
}

export const getUsersURL = () => {
    return `http://${IP}:${PORT}/api/getUsers`;
}