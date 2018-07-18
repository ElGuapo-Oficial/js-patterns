const PubSub = require("./PubSub");

// a sample subscriber (or observer)
var testSubscriber1 = function( topics , data ){
    console.log( "subscriber1: "+ topics + ": " + data );
};

var testSubscriber2 = function( topics , data ){
    console.log( "subscriber2: "+ topics + ": " + data );
};

// add the function to the list of subscribers to a particular topic
// maintain the token (subscription instance) to enable unsubscription later
var testSubscription1 = PubSub.subscribe( 'example1', testSubscriber1 );
var testSubscription2 = PubSub.subscribe( 'example1', testSubscriber2 );

// publish a topic or message asyncronously
PubSub.publish( 'example1', 'hello scriptjunkie!' );
PubSub.publish( 'example1', ['test','a','b','c'] );
PubSub.publish( 'example1', [{'color':'blue'},{'text':'hello'}] );

// unsubscribe from further topics
setTimeout(function(){
    PubSub.unsubscribe( testSubscription1 );
}, 0);

// test that we've fully unsubscribed
PubSub.publish( 'example1', 'hello again!' );
