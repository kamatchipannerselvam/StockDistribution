import React, {Component} from 'react';  //1. import `NativeBaseProvider` component
import { StyleSheet, View, Linking, SafeAreaView  } from 'react-native';
import {VStack, Box, Heading,Divider, HStack, ScrollView,Circle, Flex,Center,
 Stack, Button,Text,Badge, Checkbox, Spinner, Container, FormControl, Link, Spacer} from 'native-base';
import {getMadein, getBrandlist, getContentlist} from "../Components/servicelist";
import NestedListView, { INode, NestedRow } from 'react-native-nested-listview';
import Icon from 'react-native-vector-icons/FontAwesome';
Icon.loadFont();
import { BackHandler } from 'react-native';
function formatWithThousandsSeparator(num) {
  let numAsString = num.toString();
  
  let characters = numAsString.split("").reverse();
  
  let parts = [];
  
  for (let i = 0; i < characters.length; i += 3) {
    let part = characters.slice(i, i + 3).reverse().join("");    
    
    parts.unshift(part);
  }
  
  return parts.join(",");
}

export default class Example extends Component{
  constructor(props) {
    super(props);
    this.state = {
        isLoading:false,
        madeinList:[],  
        Checkedmadein: [],
        brandList:[],
        selectedBrand:'APPLE',
        ContentList: [],
    }
    this.getSelectedCheckedmadein = this.getSelectedCheckedmadein.bind(this);
    this.setSelectedBrand = this.setSelectedBrand.bind(this);
  }

  getChildrenName = (node: INode) => {
    if (node.name === 'level3') {
      return 'descendants';
    }
    return 'descendants';
  };
  sharedata= (node) =>{
    let TextString = [];
    const shead="*"+node.name+"*";
    TextString.push(shead);
    const obj=node.descendants;
    Object.entries(obj).forEach(entry => {
    const [key, value] = entry;
    const str=value.name;
    TextString.push(str);
    });
    let textWholestr=TextString.join( '\n' );
    Linking.openURL(`whatsapp://send?text=${textWholestr}`);
  }

    setCheckedmadein = (valuees) =>{
      this.setState({Checkedmadein: valuees});
      this.setState({brandList: []});
      this.setState({ContentList:[]});
      setTimeout(() => {
        this.renderbrandlist();
      }, 500);
  }

  getSelectedCheckedmadein = () => {
    const Checkedmadein = this.state.Checkedmadein;
    if (Checkedmadein.length === 0) return "[]";
    let arrayString = Checkedmadein.reduce((accumulator, currentValue) => accumulator + ", " + currentValue);
    //we should be call brand list
    return "[" + arrayString + "]";
  }

    setSelectedBrand = (bname) => {
        this.setState({selectedBrand: bname});
        this.setState({ContentList:[]});
        setTimeout(() => {
        this.renderContentList();
        }, 500);
    }

  renderbrandlist(){
   let isLoading =this.state.isLoading;
    let bmounted = true
    this.setState({isLoading: true});
     if(bmounted){
        let dataToSend = { madeinname: this.getSelectedCheckedmadein() }
            let formBody = [];
            for (let key in dataToSend) {
                let encodedKey = encodeURIComponent(key);
                let encodedValue = encodeURIComponent(dataToSend[key]);
                    formBody.push(encodedKey + '=' + encodedValue);
            }
            formBody = formBody.join('&');
         getBrandlist(formBody).then( response => {
             //console.log(response);
            this.setState({brandList:response.data.resultset});
                setTimeout(() => {
                this.renderContentList();
                this.setState({isLoading: false});
                }, 500);
                
            bmounted=false;
         } );
     }
  }

  renderContentList(){
    let isLoading =this.state.isLoading;
    let ContentList =  this.state.ContentList;
    let bmounted = true
    this.setState({isLoading: true});
    const brandSelected = this.state.selectedBrand;
     if(bmounted){
        let dataToSend = { madeinname: this.getSelectedCheckedmadein(), brand: brandSelected}
            let formBody = [];
            for (let key in dataToSend) {
                let encodedKey = encodeURIComponent(key);
                let encodedValue = encodeURIComponent(dataToSend[key]);
                    formBody.push(encodedKey + '=' + encodedValue);
            }
            formBody = formBody.join('&');
           getContentlist(formBody).then( response => {
             //console.log(response.data.resultset);
             const cList=response.data.resultset;
             this.setState({ContentList: cList});
            this.setState({isLoading: false});
             bmounted=false;
         } );
     }

  }

render() {
  //made in list  
  const isLoading =this.state.isLoading;
  const Checkedmadein = this.state.Checkedmadein;
  const madeinList = this.state.madeinList;
    let checkboxes = [];
    if(!madeinList.entries){
        Object.keys(madeinList).forEach(function (key,index) {
        const obj = madeinList[key];
        const textkey="text-"+key;
        const hstackkey="Hstack-"+key;
        checkboxes.push(<HStack key={hstackkey} mt={2}>
        <Checkbox key={key} value={key} colorScheme="blue"><Text fontSize="12px"> {key}</Text>
        <Text fontSize="12px" key={textkey} px={2} color="red.600" fontWeight="bold">{formatWithThousandsSeparator(obj)}</Text></Checkbox></HStack> );
        });
    }

    //brand button list
     const brandList = this.state.brandList;
    var allbuttons = [];
    if(!brandList.entries){
        Object.keys(brandList).forEach(function (key,index) {
        const obj = brandList[key];
        const textkey="text-"+key;
        const boxkey="box-"+key;
        allbuttons.push(<Button key={key} value={key} bg={this.state.selectedBrand==key?"tertiary.600":"darkBlue.800"}  style={{borderRadius:0}} p={1} m={1} 
        onPress={(e) => { this.setSelectedBrand(key) }}>
        <HStack>
        <Text fontSize={12} key={textkey} p={1} color="darkBlue.50">{key}</Text><Box py={1} fontSize={12} px={1} key={boxkey} bg="lightBlue.50">{formatWithThousandsSeparator(obj)}</Box>
        </HStack>
      </Button>);
        }.bind(this));
    }

    //content List
 const ContentList = this.state.ContentList;
 const mIcon =  <Icon name="minus" /> ;
 const pIcon = <Icon name="plus" />;
 const ShareButton = <Icon name="whatsapp" color="green" size={20} />

  return <Flex mx={1} flexDirection="row" wrap="wrap" justifyContent="space-evenly" alignItems="center">
      <FormControl isRequired isInvalid>
        <Checkbox.Group size={10} key="chkg001" colorScheme="green" defaultValue={Checkedmadein} onChange={values => {
        this.setCheckedmadein(values || []); }} flexDirection="row" flexWrap="wrap">
        { checkboxes }
        </Checkbox.Group>
        <Button.Group key="bk001" colorScheme="green" flexDirection="row" flexWrap="wrap">
        { allbuttons }
        </Button.Group>
      </FormControl>
      <Box alignItems="center">
        { isLoading ? <Text mt={4} space={4} h={10}><Spinner key="sp001" size="lg" /> Please wait...</Text>: ""}
      </Box>
      <Box height="72%" borderWidth={1} width="100%" borderColor="muted.300">
        <VStack mt={4}>
      {ContentList ?
      <NestedListView 
        data={ContentList}
        getChildrenName={this.getChildrenName}
        renderNode={(node: INode, level?: number) => (
          <NestedRow
            level={level}
            paddingLeftIncrement={20}
            style={{ borderColor: 'black', borderWidth: 0, padding: 2 }}>
            {level==1? <Text >
             {node.opened ? mIcon  : pIcon }
             <Spacer /> {node.name}  &mdash; <Link onPress={()=>{this.sharedata(node)}} w={20} space={2} isUnderlined={false} > { ShareButton } Share </Link> </Text> : <Text>{node.name}
             </Text> 
            }
          </NestedRow>
        )}
      /> : <Text alignItems="center">No Record Found </Text> }
    </VStack>
      </Box>
      </Flex>;
}

componentDidMount() {
   let mounted = true;
   let isLoading =this.state.isLoading;
   this.setState({isLoading: true});
    if(mounted){
        getMadein()
        .then(response => {
          //console.log(response);
            this.setState({madeinList:response.data.resultset});
            mounted=false;
        });
    } 
    this.renderbrandlist();

    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton() {
    return true;
  }

};