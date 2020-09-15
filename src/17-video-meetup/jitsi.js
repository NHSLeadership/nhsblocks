jQuery(document).ready(function(){
     const api = [];

     jQuery('.jitsi-wrapper').each(function(index, element) {

         const domain = jQuery(element).data('domain'),
             user = jQuery(element).data('user'),
             room = jQuery(element).data('room'),
             width = jQuery(element).data('width'),
             height = jQuery(element).data('height');
         // console.log("%c"+domain+"%c"+user+"%c"+room, "color:red;font-size:18px;");

        const options = {
            roomName: room,
            width: width,
            height: height,
            parentNode:  document.querySelector('.jitsi-wrapper')
        };

        api[index] = new JitsiMeetExternalAPI(domain, options);
        api[index].executeCommand('displayName', user);
     });
});
