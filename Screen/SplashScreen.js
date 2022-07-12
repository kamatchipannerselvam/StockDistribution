import React, {Component} from 'react';
import { View, Box, Image, Spinner,  VStack  } from "native-base";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getValidLogin} from "../Components/servicelist";

export default class SplashScreenLoader extends Component{
    constructor(props) {
    super(props);
      this.state = {
        isLoading:true,
        isLogin:false
      }
    }

render(){
  const {isLogin, isLoading } = this.state;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Spinner size="lg" />
    </View>
  );

}

componentDidMount() {
let mounted = true;
  if(mounted){
    getValidLogin()
      .then(response => {
        //console.log('');
        let isLogin = this.state.isLogin;
        if(!response){
          this.props.navigation.navigate('Auth')
        }
        else{
          const Validresp=response;
          Validresp.status=="success" ? this.props.navigation.navigate('Home') : this.props.navigation.navigate('Auth');
        }
        mounted=false;
      });
  }
}
};

