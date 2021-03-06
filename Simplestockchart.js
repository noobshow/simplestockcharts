/** 
 * 
 * Copyright 2018 KENNETH FAM WENCONG
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * 
**/
function SimpleStockChart() {
    var pointer = this;
    pointer.element = null;
    pointer.ticker = null;
    pointer.skin = "dark";
    pointer.cache = null;
    pointer.type = "line";
    pointer.style = {
        "width": "100%",
        "height": "420px",
        "padding": "20px",
        "margin": "10px 0px",
        "border": "1px solid #ccc",
        "background": "linear-gradient(180deg, #585858, #444)",
        "boxSizing": "border-box",
        "position": "relative"
    };
    pointer.area = {
        "fill": "#ffb889"
    };
    pointer.chart = {
        "fill": "none",
        "stroke": "#f60"
    };
    pointer.font = {
        "fontFamily": "Calibri",
        "fontSize": "11",
        "fill": "#888"
    };
    pointer.majorAxis = {
        "fill": "#888"
    };
    pointer.minorAxis = {
        "fill": "#333",
        "count": 5,
    };
    pointer.pointer = {
        "fill": "none",
        "r": 4,
        "stroke": "#f60"
    };
    pointer.volume = {
        "fill": "#9fcfff",
        "stroke": "#6688aa"
    };
};
SimpleStockChart.prototype.draw = function () {
    try {
        var pointer = this;
        for (var property in pointer.style) {
            pointer.element.style[property] = pointer.style[property];
        };
        pointer.element.innerHTML = '<div style="left:calc(50% - 12px);top:calc(50% - 12px)"><svg width="24px" height="24px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" class="uil-ring"><rect x="0" y="0" width="100" height="100" fill="none" class="bk"></rect><circle cx="50" cy="50" r="40" stroke-dasharray="163.36281798666926 87.9645943005142" stroke="' + pointer.chart.stroke + '" fill="none" stroke-width="20"><animateTransform attributeName="transform" type="rotate" values="0 50 50;180 50 50;360 50 50;" keyTimes="0;0.5;1" dur="1s" repeatCount="indefinite" begin="0s"></animateTransform></circle></svg></div>';
        var dates = [], xhr;
        dates[0] = new Date();
        dates[1] = new Date(new Date().setFullYear(new Date().getFullYear() - 1)).getTime();
        xhr = new XMLHttpRequest();
        xhr.open("GET", "https://api.iextrading.com/1.0/stock/" + pointer.ticker + "/chart/5y");
        xhr.send();
        xhr.onload = function () {
            pointer.element.innerHTML = "";
            pointer.cache = pointer.parse(xhr.responseText);
            pointer.init(pointer.closest(new Date(new Date().setFullYear(new Date().getFullYear() - 1)).getTime(), pointer.cache.date), pointer.cache.date.length - 1);
        };
    }
    catch (e) {
        console.log(e.stack + ": " + e.message);
    };
};
SimpleStockChart.prototype.parse = function (response) {
    try {
        var data = JSON.parse(response);
        var results = {};
        for (var property in data[0]) results[property.toLowerCase()] = [];
        for (var i = 0, iL = data.length; i < iL; i++) {
            for (var property in data[i]) results[property.toLowerCase()].push(data[i][property.toLowerCase()]);
        };
        results.date.forEach(function (value, index, array) {
            array[index] = Date.parse(value);
        });
        return results;
    }
    catch (e) {
        console.log(e.stack + ": " + e.message);
    };
};
SimpleStockChart.prototype.svg = function (tagname) {
    try {
        return document.createElementNS('http://www.w3.org/2000/svg', tagname);
    }
    catch (e) {
        console.log(e.stack + ": " + e.message);
    };
};
SimpleStockChart.prototype.attrNS = function (ns, element, attributes) {
    try {
        for (var property in attributes) element.setAttributeNS(ns, property, attributes[property]);
        return element;
    }
    catch (e) {
        console.log(e.stack + ": " + e.message);
    };
};
SimpleStockChart.prototype.attr = function (element, attributes) {
    try {
        for (var property in attributes) element.setAttribute(property, attributes[property]);
        return element;
    }
    catch (e) {
        console.log(e.stack + ": " + e.message);
    };
};
SimpleStockChart.prototype.css = function (element, attributes) {
    try {
        for (var property in attributes) element.style[property] = attributes[property];
        return element;
    }
    catch (e) {
        console.log(e.stack + ": " + e.message);
    };
};
SimpleStockChart.prototype.image = function (index) {
    try {
        switch (index) {
            case 1:
                return "data:image/gif;base64,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"
                break;
            case 2:
                return "data:image/png;base64,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"
                break;
            case 3:
                return "data:image/png;base64,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";
                break;
            case 4:
                return "data:image/png;base64,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";
                break;
            case 5:
                return "data:image/png;base64,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";
                break;
        };
    }
    catch (e) {
        console.log(e.stack + ": " + e.message);
    };
};
SimpleStockChart.prototype.closest = function (number, array) {
    try {
        var difference;
        var index = 0;
        var min = Math.abs(number - array[0]);
        for (var i = 0, iL = array.length; i < iL; i++) {
            difference = Math.abs(number - array[i]);
            if (difference < min) {
                min = difference;
                index = i;
            };
        };
        return index;
    }
    catch (e) {
        console.log(e.stack + ": " + e.message);
    };
};
SimpleStockChart.prototype.init = function (x_i, x_ii) {
    try {
        var pointer = this;
        if (x_i < 0) x_i = 0;
        if (x_ii > pointer.cache.date.length - 1) x_ii = pointer.cache.date.length - 1;
        pointer.element.innerHTML = "";
        var svg = pointer.svg("svg");
        pointer.attr(svg, {
            "xmlns": "http://www.w3.org/2000/svg",
            "xmlns:xlink": "http://www.w3.org/1999/xlink",
            "width": "100%",
            "height": "100%"
        });
        var defs = pointer.svg("defs");
        var gradient = pointer.svg("linearGradient");
        pointer.attr(gradient, {
            "id": "grad1",
            "x1": "0%",
            "y1": "0%",
            "x2": "0%",
            "y2": "100%"
        });
        var stop = pointer.svg("stop");
        pointer.attr(stop, {
            "offset": "0%"
        });
        pointer.css(stop, {
            "stop-color": "rgb(128,128,128)",
            "stop-opacity": "1"
        });
        gradient.appendChild(stop);
        var stop = pointer.svg("stop");
        pointer.attr(stop, {
            "offset": "100%"
        });
        pointer.css(stop, {
            "stop-color": "rgb(128,128,128)",
            "stop-opacity": "1"
        });
        gradient.appendChild(stop);
        defs.appendChild(gradient);
        svg.appendChild(defs);
        pointer.element.appendChild(svg);
        var defaultPath;
        var close = Array.prototype.slice.call(pointer.cache.close, x_i, x_ii + 1);
        var volume = Array.prototype.slice.call(pointer.cache.volume, x_i, x_ii + 1);
        var width = parseFloat(getComputedStyle(svg).width);
        var height = parseFloat(getComputedStyle(svg).height) - 140;
        var offset = height;
        var doc = document.createDocumentFragment();
        if (pointer.type == "line") {
            var y = close.slice(0);
            var x = [];
            var perValue = width / y.length;
            for (var i = 0, iL = y.length; i < iL; i++) x.push(perValue * i);
            var maxY = Math.max.apply(null, y);
            var minY = Math.min.apply(null, y);
            var distance = maxY - minY;
            var perValue = distance / height;
            for (var i = 0, iL = y.length; i < iL; i++) {
                y[i] = y[i] - minY;
                y[i] = y[i] / perValue;
            };
            var g = pointer.svg("g");
            pointer.attr(g, {
                "shape-rendering": "crispEdges",
                "transform": "translate(0, 20)"
            });
            var minorAxis = distance / pointer.minorAxis.count;
            minorAxisPx = minorAxis / perValue;
            minorAxisValue = minorAxisPx * perValue;
            var rect = pointer.svg("rect");
            pointer.attr(rect, {
                "x": "0",
                "y": height,
                "width": width,
                "height": 1,
                "fill": pointer.majorAxis.fill
            });
            g.appendChild(rect);
            var text = pointer.svg("text");
            pointer.attr(text, {
                "x": "0",
                "y": height - 1 - 5,
                "font-family": pointer.font.fontFamily,
                "font-size": pointer.font.fontSize,
                "fill": pointer.font.fill,
                "cursor": "default"
            });
            pointer.css(text, {
                "-webkit-user-select": "none",
                "-moz-user-select": "none",
                "-ms-user-select": "none"
            });
            text.textContent = (minY).toFixed(2);
            g.appendChild(text);
            for (var i = 1; i < pointer.minorAxis.count; i++) {
                var rect = pointer.svg("rect");
                pointer.attr(rect, {
                    "x": "0",
                    "y": minorAxisPx * i,
                    "width": width,
                    "height": 1,
                    "fill": pointer.minorAxis.fill
                });
                g.appendChild(rect);
                var text = pointer.svg("text");
                pointer.attr(text, {
                    "x": "0",
                    "y": height - minorAxisPx * i - 5,
                    "font-family": pointer.font.fontFamily,
                    "font-size": pointer.font.fontSize,
                    "fill": pointer.font.fill,
                    "cursor": "default"
                });
                pointer.css(text, {
                    "-webkit-user-select": "none",
                    "-moz-user-select": "none",
                    "-ms-user-select": "none"
                });
                text.textContent = (minY + (minorAxisPx * perValue * i)).toFixed(2);
                g.appendChild(text);
            };
            doc.appendChild(g);
            var g = pointer.svg("g");
            pointer.attr(g, {
                "transform": "translate(0, 20) translate(0 " + height + ") scale(1 -1)"
            });
            var pathData = "M" + parseInt(x[0]) + " " + parseInt(y[0]);
            for (var i = 1, iL = y.length; i < iL; i++) pathData += (" L " + parseInt(x[i]) + " " + parseInt(y[i]));
            pathData += " L " + parseInt(width) + " " + parseInt(y[y.length - 1]);
            defaultPath = pointer.svg("path");
            pointer.attr(defaultPath, {
                "fill": pointer.chart.fill,
                "stroke": pointer.chart.stroke,
                "stroke-width": "2",
                "d": pathData
            });
            g.appendChild(defaultPath);
            var pointer1 = pointer.svg("line");
            pointer.attr(pointer1, {
                "x1": 0,
                "y1": 0,
                "x2": 0,
                "y2": 0,
                "stroke-width": 1,
                "stroke": "#aaa"
            });
            pointer.css(pointer1, {
                "display": "none"
            });
            g.appendChild(pointer1);
            var pointer2 = pointer.svg("circle");
            pointer.attr(pointer2, {
                "cx": 0,
                "cy": 0,
                "r": pointer.pointer.r,
                "fill": pointer.pointer.fill,
                "stroke": pointer.pointer.stroke,
                "stroke-width": 1
            });
            pointer.css(pointer2, {
                "display": "none"
            });
            g.appendChild(pointer2);
            doc.appendChild(g);
        } else if (pointer.type == "area") {
            var y = close.slice(0);
            var x = [];
            var perValue = width / y.length;
            for (var i = 0, iL = y.length; i < iL; i++) x.push(perValue * i);
            var maxY = Math.max.apply(null, y);
            var minY = Math.min.apply(null, y);
            var distance = maxY - minY;
            var perValue = distance / height;
            for (var i = 0, iL = y.length; i < iL; i++) {
                y[i] = y[i] - minY;
                y[i] = y[i] / perValue;
            };
            var g = pointer.svg("g");
            pointer.attr(g, {
                "shape-rendering": "crispEdges",
                "transform": "translate(0, 20)"
            });
            var minorAxis = distance / pointer.minorAxis.count;
            minorAxisPx = minorAxis / perValue;
            minorAxisValue = minorAxisPx * perValue;
            var rect = pointer.svg("rect");
            pointer.attr(rect, {
                "x": "0",
                "y": height,
                "width": width,
                "height": 1,
                "fill": pointer.majorAxis.fill
            });
            g.appendChild(rect);
            var text = pointer.svg("text");
            pointer.attr(text, {
                "x": "0",
                "y": height - 1 - 5,
                "font-family": pointer.font.fontFamily,
                "font-size": pointer.font.fontSize,
                "fill": pointer.font.fill,
                "cursor": "default"
            });
            pointer.css(text, {
                "-webkit-user-select": "none",
                "-moz-user-select": "none",
                "-ms-user-select": "none"
            });
            text.textContent = (minY).toFixed(2);
            g.appendChild(text);
            for (var i = 1; i < pointer.minorAxis.count; i++) {
                var rect = pointer.svg("rect");
                pointer.attr(rect, {
                    "x": "0",
                    "y": minorAxisPx * i,
                    "width": width,
                    "height": 1,
                    "fill": pointer.minorAxis.fill
                });
                g.appendChild(rect);
                var text = pointer.svg("text");
                pointer.attr(text, {
                    "x": "0",
                    "y": height - minorAxisPx * i - 5,
                    "font-family": pointer.font.fontFamily,
                    "font-size": pointer.font.fontSize,
                    "fill": pointer.font.fill,
                    "cursor": "default"
                });
                pointer.css(text, {
                    "-webkit-user-select": "none",
                    "-moz-user-select": "none",
                    "-ms-user-select": "none"
                });
                text.textContent = (minY + (minorAxisPx * perValue * i)).toFixed(2);
                g.appendChild(text);
            };
            doc.appendChild(g);
            var g = pointer.svg("g");
            pointer.attr(g, {
                "transform": "translate(0, 20) translate(0 " + height + ") scale(1 -1)"
            });
            var pathData = "M" + parseInt(x[0]) + " " + parseInt(y[0]);
            for (var i = 1, iL = y.length; i < iL; i++) pathData += (" L " + parseInt(x[i]) + " " + parseInt(y[i]));
            pathData += " L " + parseInt(width) + " " + parseInt(y[y.length - 1]);
            pathData += " L " + parseInt(width) + " " + parseInt(0);
            pathData += " L " + parseInt(0) + " " + parseInt(0);
            pathData += " L " + parseInt(x[0]) + " " + parseInt(y[0]);
            defaultPath = pointer.svg("path");
            pointer.attr(defaultPath, {
                "fill": pointer.area.fill,
                "stroke": pointer.chart.stroke,
                "stroke-width": "2",
                "d": pathData
            });
            g.appendChild(defaultPath);
            var pointer1 = pointer.svg("line");
            pointer.attr(pointer1, {
                "x1": 0,
                "y1": 0,
                "x2": 0,
                "y2": 0,
                "stroke-width": 1,
                "stroke": "#aaa"
            });
            pointer.css(pointer1, {
                "display": "none"
            });
            g.appendChild(pointer1);
            var pointer2 = pointer.svg("circle");
            pointer.attr(pointer2, {
                "cx": 0,
                "cy": 0,
                "r": pointer.pointer.r,
                "fill": pointer.pointer.fill,
                "stroke": pointer.pointer.stroke,
                "stroke-width": 1
            });
            pointer.css(pointer2, {
                "display": "none"
            });
            g.appendChild(pointer2);
            doc.appendChild(g);
        };
        var g = pointer.svg("g");
        pointer.attr(g, {
            "transform": "translate(0, 20) translate(0 " + height + ")"
        });
        var image = pointer.svg("image");
        pointer.attr(image, {
            "x": "0",
            "y": "5",
            "width": "20",
            "height": "20",
            "data-select": (pointer.type == "line")
        });
        image.setAttributeNS("http://www.w3.org/1999/xlink", 'xlink:href', (pointer.type == "line") ? ((pointer.skin == "dark") ? pointer.image(5) : pointer.image(3)) : ((pointer.skin == "dark") ? pointer.image(4) : pointer.image(2)));
        image.onmouseover = function () {
            this.setAttributeNS("http://www.w3.org/1999/xlink", 'xlink:href', ((pointer.skin == "dark") ? pointer.image(5) : pointer.image(3)));
        };
        image.onmouseout = function () {
            if (this.getAttribute("data-select") == "false") this.setAttributeNS("http://www.w3.org/1999/xlink", 'xlink:href', ((pointer.skin == "dark") ? pointer.image(4) : pointer.image(2)));
        };
        image.onclick = function () {
            pointer.type = "line";
            pointer.init(x_i, x_ii);
        };
        g.appendChild(image);
        var image = pointer.svg("image");
        pointer.attr(image, {
            "x": "20",
            "y": "5",
            "width": "20",
            "height": "20",
            "data-select": (pointer.type == "area")
        });
        image.setAttributeNS("http://www.w3.org/1999/xlink", 'xlink:href', (pointer.type == "area") ? ((pointer.skin == "dark") ? pointer.image(5) : pointer.image(3)) : ((pointer.skin == "dark") ? pointer.image(4) : pointer.image(2)));
        image.onmouseover = function () {
            this.setAttributeNS("http://www.w3.org/1999/xlink", 'xlink:href', ((pointer.skin == "dark") ? pointer.image(5) : pointer.image(3)));
        };
        image.onmouseout = function () {
            if (this.getAttribute("data-select") == "false") this.setAttributeNS("http://www.w3.org/1999/xlink", 'xlink:href', ((pointer.skin == "dark") ? pointer.image(4) : pointer.image(2)));
        };
        image.onclick = function () {
            pointer.type = "area";
            pointer.init(x_i, x_ii);
        };
        g.appendChild(image);
        var x = [];
        var y = [];
        for (i = 0; i < volume.length; i++) {
            var vol = volume[i];
            y.push(parseFloat(vol));
        };
        height = 60 - 20;
        width = width;
        var perValue = width / x.length;
        for (var i = 0, iL = y.length; i < iL; i++) x.push(perValue * i);
        var distance = Math.max.apply(null, y);
        var perValue = distance / height;
        for (var i = 0, iL = y.length; i < iL; i++) y[i] = y[i] / perValue;
        var barWidth = width / y.length;
        var barOffset = barWidth * 0.5;
        var g1 = pointer.svg("g");
        pointer.attr(g1, {
            "shape-rendering": "crispEdges",
            "transform": "translate(0 " + (height + 20) + ") scale(1 -1)",
            "fill": pointer.volume.fill,
            "stroke": pointer.volume.stroke,
            "stroke-width": "1"
        });
        for (var i = 0, iL = y.length; i < iL; i++) {
            var rect = pointer.svg("rect");
            pointer.attr(rect, {
                "x": (barWidth * i) - barOffset,
                "y": 0,
                "width": barWidth,
                "height": y[i]
            });
            g1.appendChild(rect);
        };
        g.appendChild(g1);
        doc.appendChild(g);
        var g = pointer.svg("g");
        pointer.attr(g, {
            "transform": "translate(0, 20) translate(0 " + (offset + 110) + ") scale(1 -1)"
        });
        var y = pointer.cache.close.slice(0);
        var x = [];
        var perValue = width / y.length;
        for (var i = 0, iL = y.length; i < iL; i++) x.push(perValue * i);
        var maxY = Math.max.apply(null, y);
        var minY = Math.min.apply(null, y);
        var distance = maxY - minY;
        var perValue = distance / 40;
        for (var i = 0, iL = y.length; i < iL; i++) {
            y[i] = y[i] - minY;
            y[i] = y[i] / perValue;
        };
        var group = pointer.svg("path");
        var pathData = "M" + parseInt(x[0]) + " " + parseInt(y[0]);
        for (var i = 1, iL = y.length; i < iL; i++) pathData += (" L " + parseInt(x[i]) + " " + parseInt(y[i]));
        pointer.attr(group, {
            "fill": pointer.chart.fill,
            "stroke": "#888",
            "stroke-width": "1",
            "d": pathData
        });
        g.appendChild(group);
        doc.appendChild(g);
        var g = pointer.svg("g");
        pointer.attr(g, {
            "shape-rendering": "crispEdges",
            "transform": "translate(0, 20) translate(0 " + (offset + 60) + ")",
            "fill": "#888"
        });
        var years = [];
        for (var i = 0, iL = pointer.cache.date.length; i < iL; i++) {
            var year = new Date(pointer.cache.date[i]);
            years.push(year.getFullYear());
        };
        var a = years[0] + 1;
        var b = years[years.length - 1];
        var c = [];
        for (var i = a; i <= b; i++) {
            c.push(i);
        };
        var d = [];
        for (var i = 0; i < c.length; i++) {
            var e = years.indexOf(c[i]);
            d.push(e);
        };
        for (var i = 0; i < d.length; i++) {
            var x = parseFloat(d[i]) * width / years.length;
            m = x;
            var rect = pointer.svg("rect");
            pointer.attr(rect, {
                "x": x,
                "y": 0,
                "width": 1,
                "height": 20
            });
            g.appendChild(rect);
            var text = pointer.svg("text");
            pointer.attr(text, {
                "x": x + 6,
                "y": 16,
                "font-family": pointer.font.fontFamily,
                "font-size": pointer.font.fontSize,
                "fill": pointer.font.fill,
                "cursor": "default"
            });
            pointer.css(text, {
                "-webkit-user-select": "none",
                "-moz-user-select": "none",
                "-ms-user-select": "none"
            });
            text.textContent = c[i];
            g.appendChild(text);
        };
        doc.appendChild(g);
        var scrollStart, scrollEnd, scrollGutter, scrollEvent;
        var scorllStartPosition = width / pointer.cache.date.length * x_i;
        var scrollEndPosition = width / pointer.cache.date.length * x_ii;
        var scrollGutter = pointer.svg("rect");
        pointer.attr(scrollGutter, {
            "x": scorllStartPosition,
            "y": "5",
            "width": scrollEndPosition - scorllStartPosition,
            "height": 50,
            "fill": "rgb(159, 207, 255)",
            "opacity": 0.25
        });
        var scrollStart = pointer.svg("rect");
        pointer.attr(scrollStart, {
            "x": scorllStartPosition,
            "y": "15",
            "width": 6,
            "height": 30,
            "fill": "url(\"#grad1\")"
        });
        var scrollEnd = pointer.svg("rect");
        pointer.attr(scrollEnd, {
            "x": scrollEndPosition - 6,
            "y": "15",
            "width": 6,
            "height": 30,
            "fill": "url(\"#grad1\")"
        });
        scrollStart.onmouseover = function () {
            this.style.cursor = "e-resize";
        };
        scrollEnd.onmouseover = function () {
            this.style.cursor = "e-resize";
        };
        scrollGutter.onmouseover = function () {
            this.style.cursor = "move";
        };
        scrollGutter.onmouseout = function () {
            this.style.cursor = "default";
        };
        scrollStart.onmousedown = function (event) {
            document.addEventListener('mousemove', moveSlide1, false);
        };
        scrollEnd.onmousedown = function () {
            document.addEventListener('mousemove', moveSlide2, false);
        };
        scrollGutter.onmousedown = function (event) {
            scrollEvent = {
                event: event.clientX,
                scrollStart: parseFloat(scrollStart.getAttribute("x")),
                scrollEnd: parseFloat(scrollEnd.getAttribute("x")),
                scrollGutter: parseFloat(scrollGutter.getAttribute("x"))
            };
            document.addEventListener('mousemove', moveSlide3, false);
        };
        function moveSlide1(event) {
            var x = event.clientX;
            var offsets = svg.getBoundingClientRect();
            var left = offsets.left;
            var x = event.clientX - left;
            if (x <= 0) x = 0;
            if (x >= width - 6) x = (width - 6);
            scrollStart.setAttribute('x', x);
            scrollGutter.setAttribute('x', x);
            scrollGutter.setAttribute('width', Math.abs(scrollStart.getBoundingClientRect().left - scrollEnd.getBoundingClientRect().left) + 6);
            if (scrollStart.getBoundingClientRect().left > scrollEnd.getBoundingClientRect().left) scrollGutter.setAttribute('x', scrollEnd.getBoundingClientRect().left - svg.getBoundingClientRect().left);
            document.addEventListener('mouseup', stopSlide, false);
        };
        function moveSlide2(event) {
            var x = event.clientX;
            var offsets = svg.getBoundingClientRect();
            var left = offsets.left;
            var x = event.clientX - left;
            if (x <= 0) x = 0;
            if (x >= width - 6) x = (width - 6);
            scrollEnd.setAttribute('x', x);
            scrollGutter.setAttribute('width', Math.abs(scrollStart.getBoundingClientRect().left - scrollEnd.getBoundingClientRect().left) + 6);
            if (scrollEnd.getBoundingClientRect().left < scrollStart.getBoundingClientRect().left) scrollGutter.setAttribute('x', x);
            document.addEventListener('mouseup', stopSlide, false);
        };
        function moveSlide3(event) {
            var x = event.clientX - scrollEvent.event;
            if (scrollEvent.scrollStart + x >= 0 && scrollEvent.scrollEnd + x + 6 < width) {
                scrollStart.setAttribute('x', scrollEvent.scrollStart + x);
                scrollEnd.setAttribute('x', scrollEvent.scrollEnd + x);
                scrollGutter.setAttribute('x', scrollEvent.scrollGutter + x);
            } else if (scrollEvent.scrollStart + x <= 0) {
                scrollStart.setAttribute('x', 0);
                scrollEnd.setAttribute('x', scrollGutter.getBoundingClientRect().width - 6);
                scrollGutter.setAttribute('x', 0);
            } else if (scrollEvent.scrollEnd + x > width) {
                scrollStart.setAttribute('x', width - scrollGutter.getBoundingClientRect().width);
                scrollEnd.setAttribute('x', width - 6);
                scrollGutter.setAttribute('x', width - scrollGutter.getBoundingClientRect().width);
            }
            document.addEventListener('mouseup', stopSlide, false);
        };
        function stopSlide(event) {
            if (scrollStart.getBoundingClientRect().left > scrollEnd.getBoundingClientRect().left) {
                var a = parseFloat(scrollStart.getAttribute('x')) + 6;
                var b = parseFloat(scrollEnd.getAttribute('x'));
            } else {
                var a = parseFloat(scrollStart.getAttribute('x'));
                var b = parseFloat(scrollEnd.getAttribute('x')) + 6;
            }
            var points = [a, b];
            points.sort(function (a, b) { return a - b });
            var perValue = width / pointer.cache.date.length;
            var c = parseInt((points[0] / perValue).toFixed(0));
            var d = parseInt((points[1] / perValue).toFixed(0));
            if (c <= 0) c = 0;
            if (d >= pointer.cache.date.length) d = pointer.cache.date.length - 1;
            pointer.init(c, d);
            document.removeEventListener('mousemove', moveSlide1, false);
            document.removeEventListener('mousemove', moveSlide2, false);
            document.removeEventListener('mousemove', moveSlide3, false);
            document.removeEventListener('mouseup', stopSlide, false);
        };
        g.appendChild(scrollGutter);
        g.appendChild(scrollStart);
        g.appendChild(scrollEnd);
        doc.appendChild(g);
        var g = pointer.svg("g");
        pointer.attr(g, {
            "font-family": pointer.font.fontFamily,
            "font-size": pointer.font.fontSize,
            "fill": pointer.font.fill,
            "cursor": "default"
        });
        var pointer3 = pointer.svg("text");
        pointer.attr(pointer3, {
            "x": "0",
            "y": "11"
        });
        pointer3.textContent = "Date: ";
        g.appendChild(pointer3);
        var pointer4 = pointer.svg("text");
        pointer.attr(pointer4, {
            "x": "100",
            "y": "11"
        });
        pointer4.textContent = "Open: ";
        g.appendChild(pointer4);
        var pointer5 = pointer.svg("text");
        pointer.attr(pointer5, {
            "x": "180",
            "y": "11"
        });
        pointer5.textContent = "High: ";
        g.appendChild(pointer5);
        var pointer6 = pointer.svg("text");
        pointer.attr(pointer6, {
            "x": "260",
            "y": "11"
        });
        pointer6.textContent = "Low: ";
        g.appendChild(pointer6);
        var pointer7 = pointer.svg("text");
        pointer.attr(pointer7, {
            "x": "340",
            "y": "11"
        });
        pointer7.textContent = "Close: ";
        g.appendChild(pointer7);
        var pointer8 = pointer.svg("text");
        pointer.attr(pointer8, {
            "x": "420",
            "y": "11"
        });
        pointer8.textContent = "Vol: ";
        g.appendChild(pointer8);
        doc.appendChild(g);
        svg.appendChild(doc);
        svg.addEventListener("mousemove", function (event) {
            var x = event.clientX;
            var offsets = svg.getBoundingClientRect();
            var left = offsets.left;
            var x = parseInt(event.clientX - left);
            var perValue = width / close.length;
            var i = parseInt(x / perValue);
            if (i < 0) i = 0;
            if (i >= pointer.cache.close.length) i = pointer.cache.close.length - 1;
            var matches = defaultPath.getAttribute("d").match(new RegExp("L ([0-9]+) ([0-9]+)", "g"));
            var n = /L ([0-9]+) ([0-9]+)/g.exec(matches[i]);
            if (n) {
                var numX = n[1];
                var numY = n[2];
                pointer.attr(pointer1, {
                    "x1": numX,
                    "y1": 0,
                    "x2": numX,
                    "y2": offset
                });
                pointer.css(pointer1, {
                    "display": "block"
                });
                pointer.attr(pointer2, {
                    "cx": numX,
                    "cy": numY
                });
                pointer.css(pointer2, {
                    "display": "block"
                });
                pointer3.textContent = "Date: " + new Date(pointer.cache.date[i + x_i]).getDate() + "-" + (new Date(pointer.cache.date[i + x_i]).getMonth() + 1) + "-" + new Date(pointer.cache.date[i + x_i]).getFullYear();
                pointer4.textContent = "Open: " + parseFloat(pointer.cache.open[i + x_i]).toFixed(2);
                pointer5.textContent = "High: " + parseFloat(pointer.cache.high[i + x_i]).toFixed(2);
                pointer6.textContent = "Low: " + parseFloat(pointer.cache.low[i + x_i]).toFixed(2);
                pointer7.textContent = "Close: " + parseFloat(pointer.cache.close[i + x_i]).toFixed(2);
                pointer8.textContent = "Vol: " + parseFloat(pointer.cache.volume[i + x_i]).toFixed(0);
            };
        });
        svg.addEventListener("mouseout", function (event) {
            pointer.css(pointer1, {
                "display": "none"
            });
            pointer.css(pointer2, {
                "display": "none"
            });
            pointer3.textContent = "Date: ";
            pointer4.textContent = "Open: ";
            pointer5.textContent = "High: ";
            pointer6.textContent = "Low: ";
            pointer7.textContent = "Close: ";
            pointer8.textContent = "Vol: ";
        });
    }
    catch (e) {
        console.log(e.stack + ": " + e.message);
    };
};