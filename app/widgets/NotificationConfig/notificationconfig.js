MovimWebsocket.attach(function() {
    if (DesktopNotification.permission !== 'granted') {
        console.log('request');
        NotificationConfig_ajaxHttpRequest();
    }

    navigator.serviceWorker.getRegistration('sw.js').then((registration) => {
        console.log(registration);
        if (!registration) {
            NotificationConfig_ajaxHttpPushGetConfig();
            return;
        }

        registration.pushManager.getSubscription().then((pushSubscription) => {
            NotificationConfig_ajaxHttpPushGetConfig(pushSubscription ? pushSubscription.endpoint : null);
        }, () => {
            NotificationConfig_ajaxHttpPushGetConfig();
        });
    });
});