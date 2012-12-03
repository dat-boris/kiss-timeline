/**
 $.timeline - create a timeline on particular element 
 @author http://mattbango.com/notebook/web-development/pure-css-timeline/


 <h1> Example html </h1>

    <div class="timeline">
        <ul class="events">
            <li style="width: 42.48%; left: 57.2%;">Design &amp; Typography <em>(2007 - 2009)</em></li>
            <li style="width: 56.68%; left: 43%;">Photography <em>(2006 - 2009)</em></li>
            <li style="width: 71.3%; left: 28.4%;">Object Oriented Programming <em>(2005 - 2009)</em></li>
            <li style="width: 85.5%; left: 14.2%;">Web Development <em>(2004 - 2009)</em></li>
            <li style="width: 42.75%; left: 0;">3D Modeling and Rendering <em>(2003 - 2006)</em></li>
            <li style="width: 99.5%; left: 0;">Drawing &amp; Illustration <em>(2003 - 2009)</em></li>
        </ul> <!-- end .events -->

        <ul class="intervals">
            <li class="first">2003</li>
            <li>2004</li>
            <li>2005</li>
            <li>2006</li>
            <li>2007</li>
            <li>2008</li>
            <li class="last">2009</li>
        </ul> <!-- end .intervals -->
    </div> <!-- end .timeline -->
 */

/**
  @param data {Hash} Simple structure of [ {t: timeInEpoch, html: html, hover: function } ]  
  */
(function ($) {
    "use strict";

    $.timeline = function ($div, data, options) {
        options = options || {}; 
        var minTime = Math.min.apply(null, data.map(function (v) { return v.t; }));
        var maxTime = Math.max.apply(null, data.map(function (v) { return v.t; }));
        var minLengthInMS = Math.max(options.minLengthInMS, (maxTime - minTime));

        if (!minLengthInMS) {
            throw "No valid time length found!";
        }

        var roundTo2Sig = function (i) {
            var val = Math.round(i*100)/100;
            // for debugging bar graph
            //if (val <0 || val > 100) { throw "Error in value - expect value "+val+" to be between [0,100]!"; }
            return val; 
        };

        var $events = $("<ul class='events'/>").appendTo($div);
        $.each(data, function (i, e) {
            $("<li/>").css({
                left: roundTo2Sig(100*(e.t-minTime)/minLengthInMS)+'%',
                width : roundTo2Sig(100*(e.duration || 3000)/minLengthInMS)+'%',
            })
            .attr({ title : '@'+roundTo2Sig((e.t-minTime)/1000)+'s' })
            .html(e.html)
            .click(e.click)
            .appendTo($events);
        });
        
        // TODO: determine timeframe
        var $events = $("<ul class='intervals'/>").appendTo($div);
        $events.text("Total duration: "+roundTo2Sig(minLengthInMS/1000)+" s ");
        /*
        if (minLengthInMS <= 3*60*1000) { ... }
        */
    };
})($ /*jQuery*/);
