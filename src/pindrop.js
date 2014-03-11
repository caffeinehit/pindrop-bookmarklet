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
                PinDrop.createUI();
                PinDrop.insertAddressFinder();
            },

            createUI: function() {
                var container = make({
                    div: {
                        id: c.presentation.containerId
                    }
                });

                var body = find('body');
                body.appendChild(container);

                var header = create('h1');
                header.innerHTML = 'Pin Drop';

                container.appendChild(header);

                styleElement(container, {
                    width: '400px',
                    height: '100%',
                    position: 'fixed',
                    top: 0,
                    right: 0,
                    background: '#dddddd',
                    zIndex: 9999
                });

                styleElement(header, {
                    color: '#555555'
                });

                PinDrop.createForm();
            },

            createForm: function() {
                var table = make({
                    table: {
                        id: 'pindrop-table-form'
                    }
                });

                styleElement(table, {
                    display: 'none'
                });

                table.innerHTML = "<tr><td>Name:</td><td><input type='text' name='name'/></td></tr><tr><td>Tags:</td><td><input type='text' name='tags'/></td></tr><tr><td>Image:</td><td><input type='file' name='image'/></td></tr><tr><td>Description:</td><td><textarea name='description'></textarea></td></tr><tr><td>Privacy:</td><td><input type='radio' name='privacy' value='public'/>Public</td></tr><tr><td>Sharing:</td><td><input type='checkbox' name='sharing' value='Facebook'/>Facebook</td></tr><tr><td>Date:</td><td><input type='date' name='date'/></td></tr><tr><td>Location:</td><td><input type='text' name='location'/></td></tr>";
                var container = find('#' + c.presentation.containerId);
                container.appendChild(table);
            },

            insertAddressFinder: function() {
                function startFindingAddresses() {
                    var addresses = window.ziprip.extract(document, window.URL);

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
                        li.addEventListener("click", PinDrop.handleAddressClick);

                        logger(address.formatForGeocode());

                        if (addresses.length == 1) {
                            li.click();
                        } else {
                            list.appendChild(li);
                        }
                    }

                    if (addresses.length === 0) {
                        logger("No addresses found");
                    }
                };

                var script = create('script');
                script.type = 'text/javascript';
                script.onload = startFindingAddresses;
                script.src = '//raw.github.com/sheriff/ziprip/master/dist/ziprip-latest.js';

                var head = find('head');
                head.appendChild(script);
            },

            handleAddressClick: function(event) {
                logger(event.currentTarget.innerHTML);

                var r = new XMLHttpRequest();
                r.open("GET", "https://maps.googleapis.com/maps/api/geocode/json?sensor=false&address=" + event.currentTarget.innerHTML, true);
                r.onreadystatechange = function () {
                    var table = find('#pindrop-table-form');

                    styleElement(table, {
                        display: 'block'
                    });

                    var locationInput = find("input[name='location']");
                    var description = find("textarea[name='description']")
                    var image = find('#pindrop-map');

                    if (r.readyState != 4 || r.status != 200) {
                        locationInput.value = '';

                        if (image) {
                            image.src = '';
                        }
                        return;
                    }

                    var response = JSON.parse(r.response);

                    if (response.results.length > 0) {
                        var result = response.results[0];
                        var location = result.geometry.location;

                        locationInput.value = location.lat + ', ' + location.lng;
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
                    } else {
                        locationInput.value = '';
                        if (image) {
                            image.src = '';
                        }
                    }
                };

                r.send();
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