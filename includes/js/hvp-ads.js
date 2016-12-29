/**
 * Copyright 2014 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
jQuery(document).ready( function( $){
  $('video[data-adurl]').each( function( e){
    var id = $(this).attr('id');
    var adurl = $(this).data('adurl');
    if( adurl != '') {
        var player = videojs( id );
        var options = {
          id: id,
          adTagUrl: adurl
        };

        
        player.ima(options);
        // our click
        var contentPlayer =  document.getElementById( id+'_html5_api');
        if ((navigator.userAgent.match(/iPad/i) ||
              navigator.userAgent.match(/Android/i)) &&
            contentPlayer.hasAttribute('controls')) {
          contentPlayer.removeAttribute('controls');
        }

        // Initialize the ad container when the video player is clicked, but only the
        // first time it's clicked.
        var startEvent = 'click';
        if (navigator.userAgent.match(/iPhone/i) ||
            navigator.userAgent.match(/iPad/i) ||
            navigator.userAgent.match(/Android/i)) {
          startEvent = 'touchend';
        }

        player.one(startEvent, function() {
            player.ima.initializeAdDisplayContainer();
            player.ima.requestAds();
            player.play();
        });

      player.vastClient({
       url: adurl,
       playAdAlways: true,
       //Note: As requested we set the preroll timeout at the same place thant the adsCancelTimeout
       adCancelTimeout: 5000,
       vpaidFlashLoaderPath : HVP.flashPath,
       adsEnabled: true
      });

       player.on('reset', function () {
           if (!player.vast.isEnabled()) {
             player.vast.enable();
           } 
       });
    }

  });

});
//var player = videojs('sample_html5_api');

// var options = {
//   id: 'sample_html5_api',
//   adTagUrl: 'http://pubads.g.doubleclick.net/gampad/ads?sz=640x480&' +
//       'iu=/124319096/external/ad_rule_samples&ciu_szs=300x250&ad_rule=1&' +
//       'impl=s&gdfp_req=1&env=vp&output=xml_vmap1&unviewed_position_start=1&' +
//       'cust_params=sample_ar%3Dpremidpostpod%26deployment%3Dgmf-js&cmsid=496&' +
//       'vid=short_onecue&correlator='
// };

// player.ima(options);

// // Remove controls from the player on iPad to stop native controls from stealing

// // our click
// var contentPlayer =  document.getElementById('sample_html5_api_html5_api');
// if ((navigator.userAgent.match(/iPad/i) ||
//       navigator.userAgent.match(/Android/i)) &&
//     contentPlayer.hasAttribute('controls')) {
//   contentPlayer.removeAttribute('controls');
// }

// // Initialize the ad container when the video player is clicked, but only the
// // first time it's clicked.
// var startEvent = 'click';
// if (navigator.userAgent.match(/iPhone/i) ||
//     navigator.userAgent.match(/iPad/i) ||
//     navigator.userAgent.match(/Android/i)) {
//   startEvent = 'touchend';
// }

// player.one(startEvent, function() {
//     player.ima.initializeAdDisplayContainer();
//     player.ima.requestAds();
//     player.play();
// });