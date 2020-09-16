jQuery(document).ready(function () {
    const api = [];

    jQuery('.jitsi-wrapper').each(function (index, element) {

        const domain = jQuery(element).data('domain'),
            user = (typeof displayname !== 'undefined') ? displayname : jQuery(element).data('user'),
            room = jQuery(element).data('room'),
            width = jQuery(element).data('width'),
            height = jQuery(element).data('height'),
            password = jQuery(element).data('pass');

        const options = {
            roomName: room,
            width: width,
            height: height,
            parentNode: document.querySelector('.jitsi-wrapper')
        };

        api[index] = new JitsiMeetExternalAPI(domain, options);
        if (user) {
            api[index].executeCommand('displayName', user);
        }

        if (password !== '') {
            // Set password for channel
            api[index].addEventListener('participantRoleChanged', function (event) {
                console.log('%cp: ' + password + event.role, ' color:red; font-size:20px;');
                if (event.role === "moderator") {
                    api[index].executeCommand('password', password);
                }
            });
            // Join a protected channel
            api[index].on('passwordRequired', function () {
                api[index].executeCommand('password', password);
            });
        }
    });
});
