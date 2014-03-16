(function(d, w, c) {

    var isModernBrowser = !(w.JSON === undefined || typeof w.JSON !== 'object');

    if (!isModernBrowser) {
        alert("We're sorry, our bookmarklet works only on recent browsers. Please update your browser and try again.");
        return;
    }

    function find(selector) {
        var results = d.querySelectorAll(selector);

        if (results.length === 1) {
            return results[0];
        }

        return results.length === 0 ? null : results;
    };

    function create(element) {
        return d.createElement(element);
    }

    function make(elementDefinitions) {
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
                        set(element, propertyType, propertyValue);
                    }
                }

                elements.push(element);
                break;
            }
        }

        return elements.length == 1 ? elements[0] : elements;
    }

    function set(element, property, value) {
        "string" === typeof element[property] ? element[property] = value : element.setAttribute(property, value);
    }

    function styleElement(element, styles) {
        var style = 0;

        for (style in styles) {
            if (styles[style].hasOwnProperty) {
                element.style[style] = styles[style];
            }
        }
    }

    var PinDrop = function() {
        return {
            start: function() {
                PinDrop.insertAddressFinder();
            },

            insertAddressFinder: function() {
                function startFindingAddresses() {
                    var addresses = window.ziprip.extract(document, window.URL);

                    if (addresses.length == 0) {
                        PinDrop.noAddressesFound();
                    } else if (addresses.length == 1) {
                        PinDrop.oneAddressFound(addresses[0]);
                    } else {
                        PinDrop.multipleAddressesFound(addresses);
                    }

                    if (addresses.length === 0) {
                        logger("No addresses found");
                    }
                };

                var script = create('script');
                script.type = 'text/javascript';
                script.onload = startFindingAddresses;
                script.src = 'http://raw.github.com/sheriff/ziprip/master/dist/ziprip-latest.js';

                var head = find('head');
                head.appendChild(script);
            },

            noAddressesFound: function() {

            },

            oneAddressFound: function(address) {
                PinDrop.addressSelected(address.formatForGeocode());

                if (typeof w.getSelection === 'function') {
                    var selectedText = window.getSelection().toString();

                    if (selectedText.length > 0) {
                        var name = find("input[name='name']");
                        name.value = selectedText;
                    } else {
                        setTimeout(function(){
                            PinDrop.oneAddressFound(address)
                        }, 3000);
                    }
                }
            },

            multipleAddressesFound: function(addresses) {
                var container = find('#' + c.presentation.containerId);
                var list = create('ul');
                container.appendChild(list);

                var i;
                for (i = addresses.length - 1; i >= 0; i--) {
                    
                    var li = create('li');
                    styleElement(li, {
                        color: '#888888'
                    });
                    
                    var address = addresses[i];
                    li.innerHTML = address.formatForGeocode();

                    li.addEventListener("click", (function() {
                        var address = addresses[i];
                        PinDrop.addressSelected(address.formatForGeocode());
                    })());

                    logger(address.formatForGeocode());

                    list.appendChild(li);
                }
            },

            addressSelected: function(address) {
                logger(address);

                var r = new XMLHttpRequest();
                r.open("GET", "https://maps.googleapis.com/maps/api/geocode/json?sensor=false&address=" + address, true);
                r.onreadystatechange = function () {
                    var form = find('#pindrop-content-form');

                    styleElement(form, {
                        display: 'block'
                    });

                    // var locationInput = find("input[name='location']");
                    var description = find("textarea[name='description']")
                    var image = find('#pindrop-map');

                    if (r.readyState != 4 || r.status != 200) {
                        // locationInput.value = '';

                        if (image) {
                            image.src = '';
                        }
                        return;
                    }

                    var response = JSON.parse(r.response);

                    if (response.results.length > 0) {
                        var result = response.results[0];
                        var location = result.geometry.location;

                        // locationInput.value = location.lat + ', ' + location.lng;
                        logger(result.formatted_address);
                        description.innerHTML = result.formatted_address.replace(', ', '\n', 'g');

                        if (!image) {
                            logger('Making image');
                            image = make({
                                img: {
                                    id: 'pindrop-map',
                                    width: 200,
                                    height: 200
                                }
                            });

                            var container = find('#' + c.presentation.containerId);
                            container.appendChild(image);
                        }

                        image.src = 'http://maps.googleapis.com/maps/api/staticmap?markers=' + location.lat + ',' + location.lng + '&center=' + location.lat + ',' + location.lng + '&zoom=16&size=300x300&maptype=roadmap&sensor=false'
                        logger(image.src);
                        
                        var submit = find("#pindrop-content-form > form");
                        submit.addEventListener("submit", PinDrop.submitForm)
                    } else {
                        locationInput.value = '';
                        if (image) {
                            image.src = '';
                        }
                    }
                };

                r.send();
            },
            
            submitForm: function(e) {
                e.preventDefault();
                logger("Submit");
                
                var r = new XMLHttpRequest();
                r.open("POST", "http://192.168.0.7:8888/api/v3/pins/", true, "tom", "tom");
                r.onreadystatechange = function () {
                    logger(r);
                    logger(r.getAllResponseHeaders());
                    logger(r.response);
                };
                
                r.setRequestHeader("Content-type","application/x-www-form-urlencoded");
                r.send("title=Caffeinehit")
                
                return false;
            },
        };
    }();

    function logger(message) {
        if (typeof window.console === 'object' && typeof window.console.log === 'function') {
            console.log(message);
        }
    };

    PinDrop.start(true);
})(document, window, {
    presentation: {
        containerId: 'pindrop-container'
    }
});