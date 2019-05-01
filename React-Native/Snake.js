import React from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity  } from 'react-native';
import Part from './part.js'
import { MaterialIcons, MaterialCommunityIcons, Ionicons, Foundation, AntDesign, FontAwesome, Entypo, SimpleLineIcons } from "@expo/vector-icons"

let scale = 30;
let mt = 0;
let ml = 0;
let body_top = [120,120,120];
let body_left = [150,180,210];

export default class Snake extends React.Component {
	constructor(props) {
		super(props);
    this.interval=setInterval(this.go,240);
		this.state = {

			head_t: 4 * scale,
      head_l: 4 * scale,
      score: 0,
      direction: 1,
      apple_t: Math.round(Math.random()*15)*scale,
      apple_l: Math.round(Math.random()*10)*scale,
      length: 3,
    };


	}
  componentWillUnmount(){

    clearInterval(this.interval);
  }


	rendertiles() {
		const tab = [];

    tab.push(<Part key={0} top_head={this.state.head_t} left_head={this.state.head_l} scale={scale} color='rgb(100,200,300)'/>);

    for (let i = 1; i <=this.state.length; i++)
				tab.push( <Part key={`${i}`} top_head={body_top[i-1]} left_head={body_left[i-1]} scale={scale} color='green'/> );

		return tab;
	}

  rand_apple = () =>{
    this.setState({
      apple_t: Math.round(Math.random()*16)*scale,
      apple_l: Math.round(Math.random()*11)*scale,
    })

  }

  go = () =>{

    for(let i = this.state.length;i>0;i--)
    {

        body_left[i] = body_left[i-1];
        body_top[i] = body_top[i-1];

    }

    body_left[0] = this.state.head_l;
    body_top[0] = this.state.head_t;

    if(this.state.direction == 1){this.left()}
    if(this.state.direction == 2){this.up()}
    if(this.state.direction ==3){this.right()}
    if(this.state.direction == 4){this.down()}

    if(this.state.apple_l === this.state.head_l && this.state.apple_t === this.state.head_t)
      { this.rand_apple();
        this.setState({
          score: this.state.score + 10,
          length: this.state.length +1,
        });
      }
    for(let i=0;i<this.state.length;i++)
    {
      if(this.state.head_l === body_left[i] && this.state.head_t === body_top[i])
        this.gameOver();
    }

  }

  gameOver()
  {
    clearInterval(this.interval);
    this.props.navigation.navigate('GameOver');
  }

  left = () => {
    if( this.state.direction!=3){
    this.state.head_l> 0 && this.state.direction!=3
      ? this.setState({  head_l: this.state.head_l - scale,direction: 1})
      : this.setState({ head_l: scale*11, direction: 1});
    }
	}
	up = () => {
    if( this.state.direction!=4){
    this.state.head_t>  scale && this.state.direction!=4
      ? this.setState({  head_t: this.state.head_t - scale,direction: 2})
      : this.setState({ head_t: scale*16, direction: 2});
    }
	}
	right = () => {
    if( this.state.direction!=1){
    this.state.head_l <  scale*11  && this.state.direction!=1
      ? this.setState({  head_l: this.state.head_l + scale,direction: 3})
      : this.setState({ head_l: 0, direction: 3});
    }

	}
	down = () => {
   if( this.state.direction!=2){
    this.state.head_t <  scale*16
      ? this.setState({  head_t: this.state.head_t + scale,direction: 4})
      : this.setState({ head_t: scale, direction: 4})
   }
  }
   left2 = () => {
    if( this.state.direction!=3){
      this.setState({  direction: 1})
    }
	}
	up2 = () => {
    if( this.state.direction!=4){
      this.setState({  direction: 2})
    }
	}
	right2 = () => {
    if( this.state.direction!=1){
      this.setState({  direction: 3})
    }

	}
	down2 = () => {
   if( this.state.direction!=2){


       this.setState({  direction: 4})
   }

	}

	render() {

    const head = (<Part top_head={this.state.head_t} left_head={this.state.head_l} scale={scale} color='rgb(100,200,300)'/>);
    const apple = (<Part top_head={this.state.apple_t} left_head={this.state.apple_l} scale={scale} color='red'/>);
    const body = this.rendertiles();

    return (
			<View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'white' }}>
        {/* {head} */}
        {apple}
        {body}
				<View style={styles.buttoncontainer}>
					{/* <TouchableOpacity onPress={this.left} style={styles.buttonleft}><Text>LEFT</Text></TouchableOpacity>
          <TouchableOpacity onPress={this.up} style={styles.buttonup}><Text>UP</Text></TouchableOpacity>
          <TouchableOpacity onPress={this.right} style={styles.buttonright}><Text>RIGHT</Text></TouchableOpacity>
          <TouchableOpacity onPress={this.down} style={styles.buttondown}><Text>DOWN</Text></TouchableOpacity> */}
          <Button onPress={this.left2} title="LEFT" />
          <Button onPress={this.up2} title="UP" />
          <Button onPress={this.right2} title="RIGHT" />
          <Button onPress={this.down2} title="DOWN" />
          <View style={styles.score}><Text style={{fontSize: 20, color: "white"}}>Score: {this.state.score}</Text></View>

				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: 'white',
		position: 'absolute',
		top: mt,
		left: ml,
		width: 10,
		height: 10,
	},

	buttoncontainer: {
		backgroundColor: 'grey',
		position: 'absolute',
		top: 510,
		left: ml,
		width: '100%',
		height: 220,
	},
	score: {
    backgroundColor: 'grey',
    color: 'white',
    flex: 1,
    alignItems: 'center',
    width: '100%',
    height: 200,
    position: 'absolute',
    top: 140,
    left: 0,
    color: 'white',



  },
  buttonleft: {

    flex: 1,
    alignItems: 'center',
    width: 80,
    height: 60,
    position: 'absolute',
    top: 50,
    left: 30,
    backgroundColor: 'blue',
    color: 'white',

  },
  buttondown: {

    flex: 1,
    alignItems: 'center',
    width: 80,
    height: 60,
    position: 'absolute',
    top: 100,
    left: 200,
    backgroundColor: 'blue',
    color: 'white',

  },
  buttonright: {

    flex: 1,
    alignItems: 'center',
    width: 80,
    height: 60,
    position: 'absolute',
    top: 50,
    right: 30,
    backgroundColor: 'blue',
    color: 'white',
  },
  buttonup: {

    flex: 1,
    alignItems: 'center',
    width: 80,
    height: 60,
    position: 'absolute',
    top: 0,
    left: 200,
    backgroundColor: 'blue',
    color: 'white',
  },
});
