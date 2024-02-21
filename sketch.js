// Assuming you've included the appropriate Cast SDK in your sender app
const applicationID = 'A54AFFA1'; // Your App ID from the Google Cast SDK Developer Console

/**
 * Initialize Cast API
 */
window['__onGCastApiAvailable'] = function(isAvailable) {
    if (isAvailable) {
        initializeCastApi();
    }
};

function initializeCastApi() {
    cast.framework.CastContext.getInstance().setOptions({
        receiverApplicationId: applicationID,
        autoJoinPolicy: chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED
    });
}

// Example function to send a message to the receiver
function sendMessage(message) {
    const castContext = cast.framework.CastContext.getInstance();
    const session = castContext.getCurrentSession();

    if(session) {
        session.sendMessage('urn:x-cast:com.example.custom', message).then(
            function() { console.log('Message sent: ', message); },
            function(error) { console.log('Error sending message: ', error); }
        );
    } else {
        console.log('No Cast session is active. Unable to send message.');
    }
}


// This would be triggered by some user action, like pressing a button
function startCasting() {
    sendMessage('Hello World');
}
