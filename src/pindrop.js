(function() {
    var PinDrop = window.PinDrop || {};
    window.pindrop_cfg = {};
    window.pindrop_cfg.debug = true;

    if (window.JSON === undefined || typeof window.JSON != 'object') {
        alert("We're sorry, our bookmarklet works only on recent browsers. Please update your browser and try again.");
        return;
    }

    var logger = function(message) {
        if (window.pindrop_cfg.debug === true) {
            if (typeof window.console === 'object' && typeof window.console.log === 'function') {
                console.log(message);
            }
        }
    };

    if (typeof PinDrop.start === 'function') {
        logger("pindrop> Pin Drop is already loaded.");
        PinDrop.start(false);
        return;
    }

    PinDrop.start = function(init) {
        PinDrop.insertAddressFinder();
    }

    PinDrop.insertAddressFinder = function() {
        var startFindingAddresses = function() {
            logger("Finding addresses");
            var addresses = window.ziprip.extract(document, window.URL);
            for (var i = addresses.length - 1; i >= 0; i--) {
                var address = addresses[i];
                logger(address.formatForGeocode());
            }

            if (addresses.length === 0) {
                logger("No addresses found");
            }
        };

        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.onload = startFindingAddresses;
        script.src = '//raw.github.com/sheriff/ziprip/master/dist/ziprip-latest.js';
        head.appendChild(script);
    }

    PinDrop.start(true);
})();
