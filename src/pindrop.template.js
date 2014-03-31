//fgnass.github.com/spin.js#v2.0.0
!function(a,b){"object"==typeof exports?module.exports=b():"function"==typeof define&&define.amd?define(b):a.Spinner=b()}(this,function(){"use strict";function a(a,b){var c,d=document.createElement(a||"div");for(c in b)d[c]=b[c];return d}function b(a){for(var b=1,c=arguments.length;c>b;b++)a.appendChild(arguments[b]);return a}function c(a,b,c,d){var e=["opacity",b,~~(100*a),c,d].join("-"),f=.01+c/d*100,g=Math.max(1-(1-a)/b*(100-f),a),h=j.substring(0,j.indexOf("Animation")).toLowerCase(),i=h&&"-"+h+"-"||"";return l[e]||(m.insertRule("@"+i+"keyframes "+e+"{0%{opacity:"+g+"}"+f+"%{opacity:"+a+"}"+(f+.01)+"%{opacity:1}"+(f+b)%100+"%{opacity:"+a+"}100%{opacity:"+g+"}}",m.cssRules.length),l[e]=1),e}function d(a,b){var c,d,e=a.style;for(b=b.charAt(0).toUpperCase()+b.slice(1),d=0;d<k.length;d++)if(c=k[d]+b,void 0!==e[c])return c;return void 0!==e[b]?b:void 0}function e(a,b){for(var c in b)a.style[d(a,c)||c]=b[c];return a}function f(a){for(var b=1;b<arguments.length;b++){var c=arguments[b];for(var d in c)void 0===a[d]&&(a[d]=c[d])}return a}function g(a,b){return"string"==typeof a?a:a[b%a.length]}function h(a){this.opts=f(a||{},h.defaults,n)}function i(){function c(b,c){return a("<"+b+' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">',c)}m.addRule(".spin-vml","behavior:url(#default#VML)"),h.prototype.lines=function(a,d){function f(){return e(c("group",{coordsize:k+" "+k,coordorigin:-j+" "+-j}),{width:k,height:k})}function h(a,h,i){b(m,b(e(f(),{rotation:360/d.lines*a+"deg",left:~~h}),b(e(c("roundrect",{arcsize:d.corners}),{width:j,height:d.width,left:d.radius,top:-d.width>>1,filter:i}),c("fill",{color:g(d.color,a),opacity:d.opacity}),c("stroke",{opacity:0}))))}var i,j=d.length+d.width,k=2*j,l=2*-(d.width+d.length)+"px",m=e(f(),{position:"absolute",top:l,left:l});if(d.shadow)for(i=1;i<=d.lines;i++)h(i,-2,"progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)");for(i=1;i<=d.lines;i++)h(i);return b(a,m)},h.prototype.opacity=function(a,b,c,d){var e=a.firstChild;d=d.shadow&&d.lines||0,e&&b+d<e.childNodes.length&&(e=e.childNodes[b+d],e=e&&e.firstChild,e=e&&e.firstChild,e&&(e.opacity=c))}}var j,k=["webkit","Moz","ms","O"],l={},m=function(){var c=a("style",{type:"text/css"});return b(document.getElementsByTagName("head")[0],c),c.sheet||c.styleSheet}(),n={lines:12,length:7,width:5,radius:10,rotate:0,corners:1,color:"#000",direction:1,speed:1,trail:100,opacity:.25,fps:20,zIndex:2e9,className:"spinner",top:"50%",left:"50%",position:"absolute"};h.defaults={},f(h.prototype,{spin:function(b){this.stop();{var c=this,d=c.opts,f=c.el=e(a(0,{className:d.className}),{position:d.position,width:0,zIndex:d.zIndex});d.radius+d.length+d.width}if(b&&(b.insertBefore(f,b.firstChild||null),e(f,{left:d.left,top:d.top})),f.setAttribute("role","progressbar"),c.lines(f,c.opts),!j){var g,h=0,i=(d.lines-1)*(1-d.direction)/2,k=d.fps,l=k/d.speed,m=(1-d.opacity)/(l*d.trail/100),n=l/d.lines;!function o(){h++;for(var a=0;a<d.lines;a++)g=Math.max(1-(h+(d.lines-a)*n)%l*m,d.opacity),c.opacity(f,a*d.direction+i,g,d);c.timeout=c.el&&setTimeout(o,~~(1e3/k))}()}return c},stop:function(){var a=this.el;return a&&(clearTimeout(this.timeout),a.parentNode&&a.parentNode.removeChild(a),this.el=void 0),this},lines:function(d,f){function h(b,c){return e(a(),{position:"absolute",width:f.length+f.width+"px",height:f.width+"px",background:b,boxShadow:c,transformOrigin:"left",transform:"rotate("+~~(360/f.lines*k+f.rotate)+"deg) translate("+f.radius+"px,0)",borderRadius:(f.corners*f.width>>1)+"px"})}for(var i,k=0,l=(f.lines-1)*(1-f.direction)/2;k<f.lines;k++)i=e(a(),{position:"absolute",top:1+~(f.width/2)+"px",transform:f.hwaccel?"translate3d(0,0,0)":"",opacity:f.opacity,animation:j&&c(f.opacity,f.trail,l+k*f.direction,f.lines)+" "+1/f.speed+"s linear infinite"}),f.shadow&&b(i,e(h("#000","0 0 4px #000"),{top:"2px"})),b(d,b(i,h(g(f.color,k),"0 0 1px rgba(0,0,0,.1)")));return d},opacity:function(a,b,c){b<a.childNodes.length&&(a.childNodes[b].style.opacity=c)}});var o=e(a("group"),{behavior:"url(#default#VML)"});return!d(o,"transform")&&o.adj?i():j=d(o,"animation"),h});

(function(d, w, c, undefined) {
    
    var previousScrollPositionX, previousScrollPositionY;
    
    function renderBasicUI () {
        
        previousScrollPositionX = w.scrollX;
        previousScrollPositionY = w.scrollY;
        
        w.scrollTo(0, 0);
        
        var overlay = d.createElement('div');
        overlay.id = 'pindrop-overlay';
        overlay.style.position = 'absolute';
        overlay.style.top = 0;
        overlay.style.left = 0;
        overlay.style.zIndex = 2147483647;
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.background = '#ccc';
        overlay.style.paddingTop = '60px';
        
        var entry = document.getElementsByTagName('body')[0];
        entry.appendChild(overlay);
        
        var header = d.createElement('div');
        header.innerHTML = '<h2>Pin Drop</h2>';
        header.id = 'pindrop-header';
        header.style.position = 'fixed';
        header.style.background = '#fafafa';
        header.style.boxShadow = '0px 1px 2px #333';
        header.style.height = '50px';
        header.style.width = '100%';
        header.style.marginBottom = '20px';
        header.style.textAlign = 'center';
        header.style.top = 0;
        overlay.appendChild(header);
        
        var cancel = d.createElement('div');
        cancel.style.width = '100px';
        cancel.style.display = 'inline-block';
        cancel.style.textAlign = 'center';
        cancel.style.position = 'absolute';
        cancel.style.top = '0';
        cancel.style.right = '0';
        cancel.style.height = '50px';
        cancel.style.lineHeight = '50px';
        cancel.innerHTML = 'Cancel';
        header.appendChild(cancel);
        cancel.addEventListener('click', closeOverlay);
        
        var opts = {
            lines: 10, // The number of lines to draw
            length: 20, // The length of each line
            width: 10, // The line thickness
            radius: 20, // The radius of the inner circle
            corners: 1, // Corner roundness (0..1)
            rotate: 0, // The rotation offset
            direction: 1, // 1: clockwise, -1: counterclockwise
            color: '#000', // #rgb or #rrggbb or array of colors
            speed: 1, // Rounds per second
            trail: 60, // Afterglow percentage
            shadow: false, // Whether to render a shadow
            hwaccel: false, // Whether to use hardware acceleration
            top: (w.innerHeight / 2) + 'px'
        };
        var spinner = new Spinner(opts).spin(overlay);
    };
    
    function loadScript(url, callback) {
        var script = d.querySelector('script[src="'+url+'"]');
        
        if (script) {
            console.log("script already exists");
            callback();
            return;
        }
        
        script = d.createElement('script');
        script.async = true;

        script.onload = script.onreadystatechange = function() {
            if (!script.readyState || /complete|loaded/.test(script.readyState)) {
                callback();

                script.onload = null;
                script.onreadystatechange = null; // Avoids IE memory leaks
            }
        }

        script.src = url;

        var entry = document.getElementsByTagName('script')[0];
        entry.parentNode.insertBefore(script, entry);
    };
    
    function loadFiles () {
        loadScript('//raw.github.com/sheriff/ziprip/master/dist/ziprip-latest.js', function() {
            var addresses = w.ziprip.extract(document, w.URL);
            
            var spinner = d.querySelector('#pindrop-overlay > div.spinner');
            if (spinner) {
                spinner.parentNode.removeChild(spinner);
            }
            
            renderAddresses(addresses);
        });
    };
    
    function renderAddresses(addresses) {
        var container = d.querySelector('#pindrop-overlay');
        var spanWidth = 300;
        var spanPadding = 20;
        var spanHeight = 330;
        
        var columnsPerRow = Math.floor(container.offsetWidth / (spanWidth + spanPadding));
        
        for (var i = 0; i < addresses.length; i++) {
            var row = Math.floor(i/columnsPerRow);
            var column = i % columnsPerRow;
            
            var top = row * spanHeight;
            var left = (column * spanWidth) + (column > 0 ? (column * spanPadding) : 0);
            
            var image = d.createElement('img');
            image.style.width = spanWidth + 'px';
            image.style.height = spanWidth + 'px';
            
            var span = d.createElement('span');
            span.style.display = 'block';
            span.style.background = '#fff';
            span.style.styleFloat = 'left';
            span.style.cssFloat = 'left';
            span.style.width = spanWidth + 'px';
            span.style.height = spanHeight + 'px';
            span.style.margin = '0 10px 10px 0';
            
            var address = addresses[i];
            var content = d.createElement('p');
            content.innerHTML = address.formatForGeocode();
            
            span.appendChild(image);
            span.appendChild(content);
            
            (function(container, image) {
                var r = new XMLHttpRequest();
                var url = "https://maps.googleapis.com/maps/api/geocode/json?sensor=false&address=" + address.formatForGeocode();
                
                r.open("GET", url + ((/\?/).test(url) ? "&" : "?") + (new Date()).getTime(), true);
                r.onreadystatechange = function () {
                    if (r.readyState != 4 || r.status != 200) {
                        image.src = '';
                        return;
                    }
                    
                    var response = JSON.parse(r.response);

                    if (response.results.length > 0) {
                        var result = response.results[0];
                        var location = result.geometry.location;
                        
                        image.setAttribute('data-lat', location.lat);
                        image.setAttribute('data-lng', location.lng);
                        
                        image.src = 'http://maps.googleapis.com/maps/api/staticmap?markers=' + location.lat + ',' + location.lng + '&center=' + location.lat + ',' + location.lng + '&zoom=16&size=300x300&maptype=roadmap&sensor=false'
                    } else {
                        container.parentElement.removeChild(container);
                    }
                };
                r.send();
            })(span, image);
            
            span.addEventListener("click", (function(address) {
                return function (e) {
                    e.preventDefault();
                    
                    var image = e.target;
                    var lat = image.getAttribute('data-lat');
                    var lng = image.getAttribute('data-lng');
                    var title = address.formatForGeocode();
                    
                    var child = w.open('http://192.168.1.87:8888/bookmarklet/add/?ll='+lat+','+lng+'&title='+encodeURIComponent(title)+'&url='+encodeURIComponent(d.URL), '_blank', 'width=500,height=600');
                    
                    // Because we can't use child.onload we need to poll if the window responds to a message
                    // We need to send a message so the popup can get a reference to this window so it
                    // can send messages back to us
                    // We send the interval ID since we know it'll be unique
                    var pollChildInterval = setInterval((function(child) {
                        return function() {
                            child.postMessage(pollChildInterval.toString(), "http://192.168.1.87:8888");
                        }
                    })(child), 500);
                    
                    // We then need to listen to messages.
                    // If we receive:
                    //  - pollChildInterval: then we clear the interval since we now know the page loaded
                    window.addEventListener("message", (function(pollChildInterval) {
                        return function(event) {
                            if (event.data === pollChildInterval.toString()) {
                                clearInterval(pollChildInterval);
                            } else {
                                var response = JSON.parse(event.data);
                                
                                if (response.windowId === pollChildInterval.toString()) {
                                    renderPin(response.pin);
                                    makeImagesDraggable(response.pin.id);
                                }
                            }
                        }
                    })(pollChildInterval), false);
                    
                    closeOverlay();
                };
            })(address));

            container.appendChild(span);
        }
    };
    
    function renderPin(pin) {
        var side = d.createElement('div');
        side.id = 'pindrop-side';
        side.style.position = 'fixed';
        side.style.top = 0;
        side.style.right = 0;
        side.style.zIndex = 2147483647;
        side.style.width = '400px';
        side.style.height = '100%';
        side.style.background = '#ccc';
        
        var entry = d.getElementsByTagName('body')[0];
        entry.appendChild(side);
        
        var title = d.createElement('h2');
        title.innerHTML = pin.title;
        side.appendChild(title);
        
        var map = d.createElement('img');
        map.style.width = '300px';
        map.style.height = '300px';
        map.src = 'http://maps.googleapis.com/maps/api/staticmap?markers=' + pin.point.lat + ',' + pin.point.lng + '&center=' + pin.point.lat + ',' + pin.point.lng + '&zoom=16&size=300x300&maptype=roadmap&sensor=false';
        side.appendChild(map);
    };
    
    function createIframeTunnel(side, pinId) {
        var iframe = d.querySelector('#pindrop-iframe');
        
        if (!iframe) {
            iframe = d.createElement('iframe');
            iframe.id = 'pindrop-iframe';
            iframe.style.width = 0;
            iframe.style.height = 0;
            iframe.style.padding = 0;
            iframe.style.margin = 0;
            iframe.frameBorder = 0;
            iframe.scrolling = 'no';
            iframe.src = 'http://192.168.1.87:8888/bookmarklet/iframe/' + pinId + '/';
            side.appendChild(iframe);
            
            var receiver = document.getElementById(iframe.id).contentWindow;
            
            var pollIframeInterval = setInterval((function(iframe) {
                return function() {
                    sendMessageToIframeTunnel('iframeLoaded', {
                        'id': pollIframeInterval.toString()
                    });
                }
            })(receiver), 500);
            
            // We then need to listen to messages.
            // If we receive:
            //  - pollIframeInterval: then we clear the interval since we now know the page loaded
            window.addEventListener("message", (function(pollIframeInterval) {
                return function(event) {
                    if (event.data === pollIframeInterval.toString()) {
                        clearInterval(pollIframeInterval);
                    }
                }
            })(pollIframeInterval), false);
        }
        
        return iframe;
    };
    
    function makeImagesDraggable(pinId) {
        
        var side = d.querySelector('#pindrop-side');
        var iframe = createIframeTunnel(side, pinId);
        
        side.addEventListener('dragover', function(e) {
            e.preventDefault();
        });
    
        side.addEventListener('drop', handleImageDrop(side, iframe));
        
        var imgs = d.querySelectorAll('img');
        for (var i = 0; i < imgs.length; i++) {
            var img = imgs[i];
            img.addEventListener("dragstart", dragHandler);
        }
        
        var as = d.querySelectorAll('a');
        for (var i = 0; i < as.length; i++) {
            var a = as[i];
            a.setAttribute('draggable', 'true');
            a.addEventListener("dragstart", dragHandler);
        }
        
        function dragHandler(e) {
            var target = e.target;
            
            if (target.tagName.toLowerCase() !== 'img') {
                for (var i = 0; i < target.childNodes.length; i++) {
                    var element = target.childNodes[i];
                    if (element.tagName && element.tagName.toLowerCase() === 'img') {
                        target = element;
                        break;
                    }
                }
            }
        
            var imageUrl = target.src;
            var dt = e.dataTransfer;
            dt.setData("text/uri-list", imageUrl);
            dt.setData("text/plain", imageUrl);
        };
    };
    
    function handleImageDrop(side, iframe) {
        return function(e) {
            e.preventDefault();
            
            var img = d.querySelector('#pindrop-pin-image');
            
            if (!img) {
                img = d.createElement('img');
                img.id = 'pindrop-pin-image';
                img.style.width = '256px';
                side.appendChild(img);
            }

            if (e.dataTransfer.getData("text/uri-list").length > 0) {
                img.src = e.dataTransfer.getData("text/uri-list");
                
                sendMessageToIframeTunnel('uploadHostedImage', {
                    'src': img.src
                });
                
            } else if (e.dataTransfer.files.length > 0) {
                var reader = new FileReader();
                var file = e.dataTransfer.files[0];
                
                if (!file.type.match('image.*')) {
                    return;
                }
                
                reader.onload = (function(theFile) {
                    return function(e) {
                        img.src = e.target.result;
                
                        sendMessageToIframeTunnel('uploadLocalImage', {
                            'data': e.target.result,
                            'name': theFile.name
                        });
                    }
                })(file);
                
                reader.readAsDataURL(file);
            }
        }
    };
    
    function sendMessageToIframeTunnel(method, kwargs) {
        var message = {
            'method': method,
            'kwargs': kwargs
        };
        
        var receiver = document.getElementById('pindrop-iframe').contentWindow;
        receiver.postMessage(JSON.stringify(message), "http://192.168.1.87:8888");
    };
    
    function closeOverlay() {
        var container = d.querySelector('#pindrop-overlay');
        container.parentNode.removeChild(container);
        w.scrollTo(previousScrollPositionX, previousScrollPositionY);
    };
    
    w.PinDrop = (function() {
        return {
            run: function() {
                var container = d.querySelector('#pindrop-overlay');
                
                if (!container) {
                    renderBasicUI();
                    loadFiles();
                }
            }
        }
    })();
    
    w.PinDrop.run();
})(document, window, {});
