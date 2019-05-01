import React from 'react';
import {View,TouchableOpacity  } from 'react-native';

export default class Part extends React.Component {


    render(){

        return(

            <View
				style={{
					flex: 1,
					alignItems: 'center',
					backgroundColor: this.props.color,
					position: 'absolute',
					width: this.props.scale,
					height: this.props.scale,
					top: this.props.top_head,
					left: this.props.left_head,
				}}
			/>


        );
    }


}