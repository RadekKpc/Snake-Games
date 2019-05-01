import React from 'react';
import  {Button,View,StyleSheet} from 'react-native';

export default class LoginScreen extends React.Component{
    render(){
        let navigation = this.props;
        // let greeting = navigation.getParam(
        //     'greeting',
        //     'Hi'
        // );
        return(
       <View style={styles.container}>
        <Button title="Go to Home" color="blue" onPress={() => this.props.navigation.navigate('Home')}/>
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