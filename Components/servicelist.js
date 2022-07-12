import React, {useEffect, useState } from 'react';
import { Dimensions } from "react-native";
import axios from 'axios';
import MyAxios from "./axiosapi";
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function Loginservice(formdata){
  let defaultdetails = { status: "error"};
  return MyAxios.post('/userlogin/?',{data:formdata},{headers: {
                    //Header Defination
                    'Access-Control-Allow-Headers':'*', 'Access-Control-Request-Headers': 'Content-Type, x-requested-with',
                    'Content-Type':
                    'application/x-www-form-urlencoded;charset=UTF-8',
                } },
              )
  .then(response => response.data )
  .catch(error => { console.log(error); return defaultdetails })
}

//validate accesstoken
export async function getValidLogin(){
  let defaultdetails = { status: "error"};
  let token = await AsyncStorage.getItem('access_token');
  //console.log("accessToken " + token);
  if(token==null){ return false }else{
    return MyAxios.get('/validateaccess/',{ headers: {"Authorization" : `Bearer ${token}`} })
    .then(response =>  response.data )
    .catch(error => { console.log(error); return defaultdetails; }  )
  }
}

//fecth madein list 
export async function getMadein(){
  let defaultdetails = { status: "error"};
  let token = await AsyncStorage.getItem('access_token'); //console.log("accessToken " + token);
  if(token==null){ return false }else{
  return MyAxios.get('/madeinlist/',{ headers: {
    "Authorization" : `Bearer ${token}`
    } })
  .then(response =>  response.data )
  .catch(error => { console.log(error); return defaultdetails; }  )
  }
}

//fecth brand list 
export async function getBrandlist(formdata){
  let defaultdetails = { status: "error"};
  let token = await AsyncStorage.getItem('access_token'); //console.log("accessToken " + token);
  if(token==null){ return false }else{
  const result = MyAxios.post( 
    '/brandlist/',
    {data:formdata},
    {headers: { Authorization: `Bearer ${token}` , 
                        'Access-Control-Allow-Headers':'*', 'Access-Control-Request-Headers': 'Content-Type, x-requested-with',
                    'Content-Type':
                    'application/x-www-form-urlencoded;charset=UTF-8'
    }}
  ).then(response =>  response.data )
  .catch(error => { console.log(error); return defaultdetails; }  );
  return result;
  }
}

//fecth content list 
export async function getContentlist(formdata){
  let defaultdetails = { status: "error"};
  let token = await AsyncStorage.getItem('access_token'); //console.log("accessToken " + token);
  if(token==null){ return false }else{
  const result = MyAxios.post( 
    '/contentlist/',
    {data:formdata},
    {headers: { Authorization: `Bearer ${token}` , 
                        'Access-Control-Allow-Headers':'*', 'Access-Control-Request-Headers': 'Content-Type, x-requested-with',
                    'Content-Type':
                    'application/x-www-form-urlencoded;charset=UTF-8'
    }}
  ).then(response =>  response.data )
  .catch(error => { console.log(error); return defaultdetails; }  );
  return result;
  }
}
