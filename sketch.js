// This function will be called once the Cast SDK is available
window['__onGCastApiAvailable'] = function(isAvailable) {
    if (isAvailable) {
        initializeCastApi();
    }
};

function initializeCastApi() {
    // Ensure the Cast SDK is loaded
    if (typeof cast !== 'undefined' && typeof chrome !== 'undefined') {
        cast.framework.CastContext.getInstance().setOptions({
            receiverApplicationId: 'A54AFFA1', // Directly use your custom application ID
            autoJoinPolicy: chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED
        });

        // Setup the Cast button click handler
        const castButton = document.getElementById('castButton');
        castButton.addEventListener('click', () => {
            cast.framework.CastContext.getInstance().requestSession().catch((err) => {
                console.error('Cast request session failed', err);
            });
        });
    } else {
        console.error('Cast SDK not available');
    }
}


// DOMContentLoaded event to ensure the HTML is fully parsed before accessing elements
document.addEventListener('DOMContentLoaded', function() {
    // Additional logic for your sketch.js content
    const content = document.getElementById('content');
    if(content) {
        content.innerHTML += '<p>Ready to cast. Click the Cast button to start.</p>';
    } else {
        console.error('Content div not found');
    }
});
