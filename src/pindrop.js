(function() {
    var PinDrop = window.PinDrop || {};

    if (window.JSON === undefined || typeof window.JSON != 'object') {
        alert("We're sorry, our bookmarklet works only on recent browsers. Please update your browser and try again.");
        return;
    }

    var logger = function() {
        if (window.dcovery_cfg.debug === true) {
            if (typeof window.console === 'object' && typeof window.console.log === 'function') {
                console.log(Array.prototype.slice.call(arguments));
            }
        }
    };
    
    if (typeof PinDrop.start === 'function') {
        logger("pindrop> Pin Drop is already loaded.");
        PinDrop.start(false);
        return;
    }

    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.onload = startFindingAddresses;
    script.src = '//raw.github.com/sheriff/ziprip/master/dist/ziprip-latest.js';
    head.appendChild(script);

    var startFindingAddresses = function() {
        var addresses = window.ziprip.extract( document, window.URL );
        for (var i = addresses.length - 1; i >= 0; i--) {
            var address = addresses[i];
            console.log(address.formatForGeocode());
        }

        if (addresses.length === 0) {
            console.log("No addresses found");
        }
    };
})();