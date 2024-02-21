window['__onGCastApiAvailable'] = function(isAvailable) {
    if (isAvailable) {
        initializeCastApi();
    }
};

function initializeCastApi() {
    cast.framework.CastContext.getInstance().setOptions({
        receiverApplicationId: chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID,
        autoJoinPolicy: chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED
    });

    const castButton = document.getElementById('castButton');
    castButton.onclick = () => cast.framework.CastContext.getInstance().requestSession();
}

// Add any additional logic for your sketch.js content below
document.addEventListener('DOMContentLoaded', function() {
    // Example content logic
    const content = document.getElementById('content');
    content.innerHTML += '<p>Ready to cast. Click the Cast button to start.</p>';
});
