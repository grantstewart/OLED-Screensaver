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


function startCasting() {
    const castContext = cast.framework.CastContext.getInstance();
    // Check if a session is already available
    if (!castContext.getCurrentSession()) {
        // Listen for session state changes to know when a session is started
        castContext.addEventListener(
            cast.framework.CastContextEventType.SESSION_STATE_CHANGED,
            function(event) {
                if (event.sessionState == cast.framework.SessionState.SESSION_STARTED) {
                    sendMessage('Hello World');
                }
            }
        );
        // Attempt to start a session - this might involve user interaction
        castContext.requestSession().catch(function(error) {
            console.log('Error requesting Cast session: ', error);
        });
    } else {
        // If a session is already active, send the message
        sendMessage('Hello World');
    }
}
