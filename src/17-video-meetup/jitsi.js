jQuery(document).ready(function () {
    const api = [];

    jQuery('.jitsi-wrapper').each(function (index, element) {

        const domain = jQuery(element).data('domain'),
            room = jQuery(element).data('room'),
            width = jQuery(element).data('width'),
            height = jQuery(element).data('height'),
            secret = jQuery(element).data('secret');

        const options = {
            roomName: room,
            width: width,
            height: height,
            parentNode: document.querySelector('.jitsi-wrapper')
        };

        api[index] = new JitsiMeetExternalAPI(domain, options);
        if (typeof displayname !== 'undefined') {
            api[index].executeCommand('displayName', displayname);
        }

        if (secret !== '') {
            // Set secret for channel
            api[index].addEventListener('participantRoleChanged', function (event) {
                if (event.role === "moderator") {
                    api[index].executeCommand('secret', secret);
                }
            });
            // Join a protected channel
            api[index].on('secretRequired', function () {
                api[index].executeCommand('secret', secret);
            });
        }
    });
});
