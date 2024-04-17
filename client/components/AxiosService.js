import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

// CHANGE THIS TO UR LOCAL IP!!! SHOWN WITH STARTING SERVER
<<<<<<< HEAD
const IP = "192.168.0.153"
=======
const IP = "172.20.10.4"
>>>>>>> 134779d72d56ac08b686f78df59b1eba847363b7
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