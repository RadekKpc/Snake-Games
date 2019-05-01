import React from 'react';
import  {Text,View,Button,StyleSheet} from 'react-native';
export default class GameOverScreen extends React.Component{


    render(){
        return(
       <View style= {styles.container}>
       <Text>Game Over!</Text>
        <Button title="Back to Menu" color="blue" onPress={() => this.props.navigation.navigate('Home')}

         />
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
