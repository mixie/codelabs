// Basic fullfilment working with three DIalogflow intents: "Default Welcome Intent", "Default Fallback Intent" 
// and "Rich intent" - needs to be added in Dialogflow in order to work

// imports
const functions = require('firebase-functions');
const { dialogflow, SimpleResponse, BrowseCarousel, BrowseCarouselItem, 
            Suggestions, Image} = require('actions-on-google');

const app = dialogflow();

// handling response for 'Default Welcome Intent' 
app.intent('Default Welcome Intent', conv => {
  conv.ask('Hi, how are you?');
});

// handling response for 'Default Fallback Intent'
app.intent('Default Fallback Intent', conv => {
  conv.ask(new SimpleResponse({
  speech: 'Sorry, I am saying that I did not get that.',
  text: 'Sorry, I am writing that I did not get that.',
    }));
  conv.ask('Can you repeat that?');
});

// handling response for 'Rich Intent' 
app.intent('Rich intent', conv => {
    
    // adding simple response using SSML
    const ssml = '<speak>' +
    'Here are <say-as interpret-as="characters">SSML</say-as> samples. ' +
    'I can pause <break time="3" />. ' +
    'I can play a sound <audio src="https://www.example.com/MY_WAVE_FILE.wav">your wave file</audio>. ' +
    'I can speak in cardinals. Your position is <say-as interpret-as="cardinal">10</say-as> in line. ' +
    'Or I can speak in ordinals. You are <say-as interpret-as="ordinal">10</say-as> in line. ' +
    'Or I can even speak in digits. Your position in line is <say-as interpret-as="digits">10</say-as>. ' +
    'I can also substitute phrases, like the <sub alias="World Wide Web Consortium">W3C</sub>. ' +
    'Finally, I can speak a paragraph with two sentences. ' +
    '<p><s>This is sentence one.</s><s>This is sentence two.</s></p>' +
    '</speak>';
  conv.ask(ssml);
  
  // adding BrowseCarousel to the response
  conv.ask(new BrowseCarousel({
      items: [
        new BrowseCarouselItem({
          title: 'Dialogflow',
          url: 'https://developers.google.com/actions/images/logo-dialogflow.png',
          description: 'Description of item 1',
          image: new Image({
            url: 'https://developers.google.com/actions/images/logo-dialogflow.png',
            alt: 'Dialogflow logo',
          }),
          footer: 'Item 1 footer',
        }),
        new BrowseCarouselItem({
          title: 'Actions on Google',
          url: 'https://images.techhive.com/images/article/2016/10/actionsongoogle-100685919-large.jpg',
          description: 'Description of item 2',
          image: new Image({
            url: 'https://images.techhive.com/images/article/2016/10/actionsongoogle-100685919-large.jpg',
            alt: 'AoG logo',
          }),
          footer: 'Item 2 footer',
        }),
      ],
    }));
    
    // adding Suggestion chips to the response
    conv.ask(new Suggestions('Suggestion Chips'));
    conv.ask(new Suggestions(['suggestion 1', 'suggestion 2']));
});


exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);
