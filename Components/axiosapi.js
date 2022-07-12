import axios from 'axios';
// const axios = require('axios');
import AsyncStorage from '@react-native-async-storage/async-storage';
//import { useNavigation } from '@react-navigation/native';
//import RootNavigation from './NavigationService.js';
import * as NavigationService from "react-navigation-helpers";

// Set config defaults when creating the instance
var instance = axios.create({
  baseURL: 'https://comsmapp.comtelmea.com/stocklist/',
});

// Add a request interceptor
instance.interceptors.request.use(function (config) {
    // Do something before request is sent
     //console.log(config);
    return config;
  }, function (error) {
    // Do something with request error
    //console.log(error);
    return Promise.reject(error);
  });
 
// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Do something with response data
    //console.log(response);
    if(response.status!=200){
      //console.log("sadasd");
    }
    return response;
  }, function (error) {
    // Do something with response error
    return Promise.reject(error);
  });

// Step-4: Export the newly created Axios instance to be used in different locations.
export default instance;
