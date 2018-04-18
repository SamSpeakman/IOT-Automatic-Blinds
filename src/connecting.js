var pubnub = new PubNub ({
        publishKey: 'pub-c-872e3808-d4fd-4211-ace7-42bbafc03208',
        subscribeKey: 'sub-c-2ee62116-3ff3-11e8-afae-2a65d00afee8'

      });
var channel = 'Channel-yoe9sswt4';
var blinkState = true;


 pubnub.subscribe({
   channel: channel,
   message: function(m) {
     blinkState = m.blink; // the raw data
     blinkState = !blinkState; // toggle it to lable the button
     RaisedButton.textContent = (blinkState) ? 'Blink LED' : 'Stop LED'; 
     console.log(blinkState);
   }
 });

  button.addEventListener('click', function(e) {
    PubNub.publish({
      channel: channel, 
      message: {blink: blinkState},
      callback: function(m) {
      console.log(m);
    }
   });
  
  });


  //example 
  onClick=(this. _SetBartchart)/>
this.state.pubnub.publish((channel:'channel', message:'eonvalue' + this.state.sliderValue+ '}}'}(response){

});
