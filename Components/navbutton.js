import React, {Component} from 'react';  //1. import `NativeBaseProvider` component
import {VStack, Box, Heading,Divider, HStack, ScrollView,Circle, Spacer, Flex,Center, Stack, Button,Text,Badge} from 'native-base';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonList: [],
    };
  }

  render() {
    var allbuttons = [];
    for(let i = 0; i < 10; i++){
        allbuttons.push(<Button key={i} bg="darkBlue.800" style={{borderRadius:0}} p={1} m={1}>
        <HStack>
        <Text p={1} color="darkBlue.50">Button</Text><Circle bg="lightBlue.50" size="35px">100</Circle>
        </HStack>
      </Button>);
    }

      return <Flex direction="row" wrap="wrap" justifyContent="space-evenly">
        { allbuttons }
        </Flex>;
  }

  componentDidMount() {
    let mounted = true;
    let Buttonlist=['Samsung','Nokia','Apple','Xioami','Honor'];
    this.setState({LocationList: items.data});
    /*getRegionList()
      .then(items => {
        if(mounted) {
          //console.log(items);
          if(items.status=="success"){
            //console.log(items.data);
            this.setState({LocationList: items.data});
            mounted = false;
          }
        }
      }); */
      
  }

}
