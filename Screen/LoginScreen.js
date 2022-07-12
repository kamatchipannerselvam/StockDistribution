import React, {Component} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import MyAxios from "../Components/axiosapi";
import {Loginservice} from "../Components/servicelist";
import {Keyboard, TouchableOpacity} from 'react-native';

import {VStack, Box, Heading, Text, FormControl, Input, Link, Button, HStack, IconButton, Icon, 
MaterialCommunityIcons, Spinner} from 'native-base';

import base64 from 'react-native-base64'

const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
        UserEmail: "",
        UserPassword:"",
        formErrors:{},
        isLoading:false,
        isLoginReady:false,
        Errorstr:''
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.validateField = this.validateField.bind(this);
    this.onformSubmit = this.onformSubmit.bind(this);
  }
    
    onformSubmit (){
        let fieldValidationErrors = this.state.formErrors;
        const UserEmail = this.state.UserEmail;
        const UserPassword = this.state.UserPassword;

        if(UserEmail && UserPassword){
            if(fieldValidationErrors.UserEmail=="" && fieldValidationErrors.UserPassword==""){
                let isLoading=this.state.isLoading;
                this.setState({isLoading: true})
            const encText1 = base64.encode(UserEmail);    
            const encText2 = base64.encode(UserPassword);    
            let dataToSend = {apikey:'12334', username: encText1, password: encText2};
                let formBody = [];
                for (let key in dataToSend) {
                    let encodedKey = encodeURIComponent(key);
                    let encodedValue = encodeURIComponent(dataToSend[key]);
                        formBody.push(encodedKey + '=' + encodedValue);
                }
                formBody = formBody.join('&');

                Loginservice(formBody)
                .then(response => { 
                    //console.log(response)
                    if(response.status!=undefined){
                        if(response.status=='success'){
                            let isLoginReady=this.state.isLoginReady;
                            AsyncStorage.setItem('access_token', response.data.access_token);
                            this.setState({isLoginReady: true});
                            this.setState({isLoading: false});
                            this.props.navigation.navigate('Home');
                        }
                        else{
                            let Errorstr=this.state.Errorstr;
                            this.setState({Errorstr:response.message});
                            this.setState({isLoading: false});
                        }
                    }

                });

            }
        }
        else{
            fieldValidationErrors.UserEmail = 'Enter Valid Email';
            fieldValidationErrors.UserPassword = 'Enter Valid Password';
            this.setState({ formErrors: fieldValidationErrors});
        }

    }

    onInputChange(name, value){
        this.setState({
        [name]: value}, 
        () => {this.validateField(name, value)});
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let UserEmail = this.state.UserEmail;
        let UserPassword = this.state.UserPassword;
        switch(fieldName) {
        case 'UserEmail':
            fieldValidationErrors.UserEmail = (regex.test(value)) ? '': ' Enter Valid Email';
            break;
        case 'UserPassword':
            fieldValidationErrors.UserPassword = (value.length<4) ? ' Enter Valid Password' : '';
            break;
        default:
            break;
        }
        this.setState({ fieldName: value });
        this.setState({ formErrors: fieldValidationErrors});
        this.setState({Errorstr:''});
    }

    render(){
        const { UserEmail, UserPassword, formErrors, isLoading, Errorstr } = this.state;

        return <Box safeArea flex={1} p={2} w="90%" mx="auto">
        <Heading color="muted.400" size="lg">Sign in to continue!</Heading>
        <VStack space={2} mt={5}>
          <FormControl isRequired  isInvalid={'UserEmail' in formErrors && formErrors.UserEmail!=''}>
            <FormControl.Label _text={{color: "muted.700",fontSize: "lg",fontWeight: 600}}>
              Email ID
            </FormControl.Label>
            <Input 
              name="username"
              type="email"
              placeholder="Enter Email ID"
              autoCapitalize="none"
              keyboardType="email-address"
              returnKeyType="next"
              underlineColorAndroid="#f000"
              blurOnSubmit={false}
              onChangeText={(value) => this.onInputChange('UserEmail', value) }
              value={this.state.email}
            />
            {'UserEmail' in formErrors ?
            <FormControl.ErrorMessage _text={{fontSize: 'xs', color: 'error.500', fontWeight: 500}}>{formErrors.UserEmail}</FormControl.ErrorMessage>
            : ''
            }
          </FormControl>
          <FormControl isRequired  isInvalid={'UserPassword' in formErrors && formErrors.UserPassword!=''}>
            <FormControl.Label _text={{color: "muted.700",fontSize: "lg",fontWeight: 600 }}>
              Password
            </FormControl.Label>
            <Input 
                name="password"
                type="password" 
                placeholder="Enter Password"
                keyboardType="default"
                blurOnSubmit={false}
                secureTextEntry={true}
                underlineColorAndroid="#f000"
                returnKeyType="next"
                onChangeText={(value) => this.onInputChange('UserPassword', value) }
            />
            {'UserPassword' in formErrors ?
            <FormControl.ErrorMessage _text={{fontSize: 'xs', color: 'error.500', fontWeight: 500}}>{formErrors.UserPassword}</FormControl.ErrorMessage>
            : ''
            }
          </FormControl>
          <Box>
            {isLoading ? <Spinner size="lg" /> : ""}
            { (Errorstr && Errorstr!="") ? <Text color="danger.600">{Errorstr}</Text>  : ""}
          </Box>
          <VStack>
            <TouchableOpacity activeOpacity={0.5}  onPress={ () => this.onformSubmit() }>
              <Text p="3" fontWeight='500' bg="blue.900" color="blue.50" >LOGIN</Text>
            </TouchableOpacity>
          </VStack>
        </VStack>
      </Box>
    }
}