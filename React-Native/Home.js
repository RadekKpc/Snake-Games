import React from 'react';
import  {View,Button,StyleSheet} from 'react-native';
export default class Home extends React.Component{


    render(){
        return(
       <View style= {styles.container}>
        <Button title="start game" color="blue" onPress={() => this.props.navigation.navigate('Snake' , {
            greeting: 'Hello'
        })} />
        </View>
    );
}
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
