import React, { Component } from 'react';
import logo from './logo.png';
import PubNub from 'pubnub';
import Slider from 'material-ui/Slider';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import './App.css';




//PUBNUB creating a new variable and declaring the publish and subscribe key
var pubnub = new PubNub ({
        publishKey: 'pub-c-872e3808-d4fd-4211-ace7-42bbafc03208',
        subscribeKey: 'sub-c-2ee62116-3ff3-11e8-afae-2a65d00afee8'

      });
// declaring the channel
var channel = 'iotchannel';
var blinkState = true;


  // pubnub.subscribe({
  //   channel: channel,
  //   message: function(m) {
  //     blind = m.blink; // the raw data
  //     blinkState = !blinkState; // toggle it to lable the button
  //     RaisedButton.textContent = (blinkState) ? 'Blink LED' : 'Stop LED'; 
  //     console.log(blinkState);
  //   }
  // });

  // button.addEventListener('click', function(e) {
  //   PubNub.publish({
  //     channel: channel, 
  //     message: {blink: blinkState},
  //     callback: function(m) {
  //     console.log(m);
  //   }
  //  });


  //example 

// main class for App
class App extends Component {
	 //declaring the state for the resources menu.
   constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  handleToggle = () => this.setState({
    open: !this.state.open
  });
  // this is the handler that gets exectuted after the button is pressed on the web interface
  buttonOnClickHandler = (e) => {
      pubnub.publish({
        channel: channel, 
        message: 
          "up"
        ,
        callback: function(m) {
          console.log(m);
        }
      });
  }
  buttonOnClickHandler2 = (e) => {
    pubnub.publish({
      channel: channel, 
      message: 
        "down"
      ,
      callback: function(m) {
        console.log(m);
      }
    });
}

  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Automated Blinds</h1>
        </header>
       
        <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
      {/* making the button and adding the onClick event */}
     <button
      className="button1" 
      onClick={this.buttonOnClickHandler}
      
     />
    <button
      className="button1" 
      onClick={this.buttonOnClickHandler2}
      
    />
	 		
   		<RaisedButton className="menu"
          label="Resources"
          onClick={this.handleToggle}
        />
        <Drawer open={this.state.open}>
          <MenuItem href="https://www.w3schools.com" target="_blank" >Github</MenuItem>
          <MenuItem href="https://www.w3schools.com" target="_blank">Video </MenuItem>
        </Drawer>
	    </MuiThemeProvider>
     
      <footer className="App-Footer">
      </footer>
      </div>
    );
  }
}


export default App;

