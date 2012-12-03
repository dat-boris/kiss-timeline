kiss-timeline
=============

A very simple epoch based timeline - no hassel!

Demo: https://sketchytechky.github.com/kiss-timeline/

## Synopsis ##

            <div id="timeline" style="width:80%"></div>
            <script>
                $(function () {
                    var data = [
                        // time in epoch
                        { t: 1353113626000, duration: 1000, html : "<p>Data 1</p>" },
                        { t: 1353113628570, duration: 2000, html : "<p>Click here</p>", click : function() { alert("Element 2 Handler!"); } },
                        { t: 1353113628570, duration: 4000, html : "<p>Overlap with above</p>" },
                    ];
                    $.timeline($("#timeline"), data, 
                        {minLengthInMS: 10000}  // minimal length of timeline
                    );
                 });
            </script> 

