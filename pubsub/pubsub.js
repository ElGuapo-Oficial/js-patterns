//(function (exports, require, module, __filename, __dirname){
// (Yes) module.exports = PubSub;
// (Yes) module.exports.log = PubSub;
// (Yes) exports.log = PubSub;
// (No)  exports = PubSub // exports parameter is a reference to module.exports
// cannot be changed

var PubSub = function(){
    "use strict";
    var p = {};

    var topics = {};
    var lastUid = -1;

    var publish = function( topic, data ){
        if (!topics.hasOwnProperty(topic)){
            return false;
        }

        var notify = function(){
            var subscribers = topics[topic];

            var throwException = function(e){
                return function(){
                    throw e;
                };
            };

            for (var i = 0; i < subscribers.length; i++){
                try {
                    subscribers[i].func(topic, data);
                } catch( e ){
                    setTimeout( throwException(e), 0);
                }
            }
        };

        setTimeout(notify, 0);
        return true;
    };

    /**
     *  Publishes the topic, passing the data to it's subscribers
     *  @topic (String): The topic to publish
     *  @data: The data to pass to subscribers
    **/
    p.publish = function(topic, data){
        return publish(topic, data);
    };

    /**
     *  Subscribes the passed function to the passed topic.
     *  Every returned token is unique and should be stored if you need to unsubscribe
     *  @topic (String): The topic to subscribe to
     *  @func (Function): The function to call when a new topic is published
    **/
    p.subscribe = function( topic, func ){
        // topic is not registered yet
        if ( !topics.hasOwnProperty( topic ) ){
            topics[topic] = [];
        }
        var token = (++lastUid).toString();
        topics[topic].push( { token : token, func : func } );
        // return token for unsubscribing
        return token;
    };

    /**
     *  Unsubscribes a specific subscriber from a specific topic using the unique token
     *  @token (String): The token of the function to unsubscribe
    **/
    p.unsubscribe = function( token ){
        for ( var m in topics ){
            if ( topics.hasOwnProperty( m ) ){
                for ( var i = 0, j = topics[m].length; i < j; i++ ){
                    if ( topics[m][i].token === token ){
                        topics[m].splice( i, 1 );
                        return token;
                    }
                }
            }
        }

        return false;
    };

    return p;

};

module.exports = PubSub();
