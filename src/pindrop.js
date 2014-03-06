(function() {

    function isModernBrowser () {
        return !(window.JSON === undefined || typeof window.JSON !== 'object');
    };

    if (!isModernBrowser()) {
        alert("We're sorry, our bookmarklet works only on recent browsers. Please update your browser and try again.");
        return;
    }

    var PinDrop = function () {
        return {
            start: function() {
                PinDrop.insertAddressFinder();

                var elements;

                elements = DomBuilder.make({
                    div: {
                        id: 'pindrop-container'
                    },
                });

                var container, header;
                
                header = document.createElement('h1');
                header.innerHTML = 'Pin Drop';

                container = elements[0];
                container.appendChild(header);

                DomBuilder.styleElement(container, {
                    width: '400px',
                    height: '100%',
                    position: 'fixed',
                    top: 0,
                    right: 0,
                    background: '#dddddd',
                    zIndex: 9999
                });

                DomBuilder.styleElement(header, {
                    color: '#555555'
                });

                body = document.getElementsByTagName('body')[0];
                body.appendChild(container);
            },
            insertAddressFinder: function() {
                var startFindingAddresses, head, script = 0;

                startFindingAddresses = function() {
                    var addresses, i, address, container, list = 0;

                    addresses = window.ziprip.extract(document, window.URL);

                    container = document.getElementById('pindrop-container');
                    list = document.createElement('ul');
                    container.appendChild(list);

                    for (i = addresses.length - 1; i >= 0; i--) {
                        address = addresses[i];
                        var li = document.createElement('li');
                        DomBuilder.styleElement(li, {
                            color: '#888888'
                        });
                        li.innerHTML = address.formatForGeocode();
                        list.appendChild(li);

                        logger(address.formatForGeocode());
                    }

                    if (addresses.length === 0) {
                        logger("No addresses found");
                    }
                };

                var head, script;
                head = document.getElementsByTagName('head')[0];
                script = document.createElement('script');
                script.type = 'text/javascript';
                script.onload = startFindingAddresses;
                script.src = '//raw.github.com/sheriff/ziprip/master/dist/ziprip-latest.js';
                head.appendChild(script);
            },
        };
    }();

    var DomBuilder = function () {
        return {
            make: function(elementDefinitions) {
                var elementType;
                var elements = [];

                for (elementType in elementDefinitions) {
                    var elementDefinition;
                    var element;

                    elementDefinition = elementDefinitions[elementType];

                    if (elementDefinition.hasOwnProperty) {
                        element = document.createElement(elementType);

                        var propertyType;

                        for (propertyType in elementDefinition) {
                            var propertyValue;

                            propertyValue = elementDefinition[propertyType];
                            if (propertyValue.hasOwnProperty && "string" === typeof propertyValue) {
                                PinDrop.set(element, propertyType, propertyValue);
                            }
                        }

                        elements.push(element);
                        break;
                    }
                }

                return elements;
            },
            set: function(element, property, value) {
                "string" === typeof element[property] ? element[property] = value : element.setAttribute(property, value);
            },
            styleElement: function(element, styles) {
                var style = 0;

                for (style in styles) {
                    if (styles[style].hasOwnProperty) {
                        element.style[style] = styles[style];
                    }
                }
            },
        }
    }();

    function logger (message) {
        if (typeof window.console === 'object' && typeof window.console.log === 'function') {
            console.log(message);
        }
    };

    if (typeof PinDrop.start === 'function') {
        logger("pindrop> Pin Drop is already loaded.");
        PinDrop.start(false);
        return;
    }

    PinDrop.start(true);
})();
