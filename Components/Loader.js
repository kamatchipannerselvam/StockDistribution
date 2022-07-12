import React, {Component} from 'react';  //1. import `NativeBaseProvider` component
import {VStack, View, Box, Heading,Divider, HStack, ScrollView,Circle, Spacer, Flex,Center,
 Stack, Button,Text,Badge, Checkbox, Spinner, Container, FormControl} from 'native-base';
import {getMadein, getBrandlist, getContentlist} from "../Components/servicelist";


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
        selectedBrand:'',
        contenList:[],
    }
    this.getSelectedCheckedmadein = this.getSelectedCheckedmadein.bind(this);
    this.loginHandler = this.loginHandler.bind(this);
  }

    loginHandler = (bname) => {
        this.setState({selectedBrand: bname});
    }
  
    setCheckedmadein = (valuees) =>{
      this.setState({Checkedmadein: valuees});
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
             const cList=response.data.resultset;
             let contenList =  this.state.contenList;
             this.setState({contenList: cList});
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
        checkboxes.push(<HStack mt={2}>
        <Checkbox key={key} value={key} colorScheme="blue">{key}
        <Text key={textkey} px={2} color="red.600" fontWeight="bold">{formatWithThousandsSeparator(obj)}</Text></Checkbox></HStack> );
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
        allbuttons.push(<Button key={key} value={key} bg="darkBlue.800" style={{borderRadius:0}} p={1} m={1} 
        onPress={(e) => { this.loginHandler(key) }}>
        <HStack>
        <Text key={textkey} p={1} color="darkBlue.50">{key}</Text><Box py={1} px={1} key={boxkey} bg="lightBlue.50">{formatWithThousandsSeparator(obj)}</Box>
        </HStack>
      </Button>);
        }.bind(this));
    }

    //content List
    const contenList = this.state.contenList;

  return <Container alignItems="center" mx={5}><Flex direction="row" wrap="wrap" justifyContent="space-evenly">
      <FormControl isRequired isInvalid>
        <Checkbox.Group key="chkg001" colorScheme="green" defaultValue={Checkedmadein} onChange={values => {
        this.setCheckedmadein(values || []); }} flexDirection="row" flexWrap="wrap">
        { checkboxes }
        </Checkbox.Group>
        <Button.Group key="bk001" colorScheme="green" flexDirection="row" flexWrap="wrap">
        { allbuttons }
        </Button.Group>
        { isLoading ? <Spinner key="sp001" size="lg" /> : ""}
      </FormControl>
      </Flex>
    </Container>
    ;
}

componentDidMount() {
   let mounted = true;
   let isLoading =this.state.isLoading;
   this.setState({isLoading: true});
    if(mounted){
        getMadein()
        .then(response => {
            this.setState({madeinList:response.data.resultset});
            mounted=false;
        });
    } 
    this.renderbrandlist()
  }
};
