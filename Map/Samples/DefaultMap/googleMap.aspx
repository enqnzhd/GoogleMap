<%@ Page Language="C#" AutoEventWireup="true" CodeFile="googleMap.aspx.cs" Inherits="Samples_DefaultMap_googleMap" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <style type="text/css">
       .canvas div.mapArea { float : left; width:400px; height:400px; border:1px solid Gray;}        
    </style>
    <script src="//code.jquery.com/jquery-1.10.2.js"></script>       
    <script id="mapSC" src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&language=ko&libraries=weather"></script>     
    <script src="GoogleMap_Default.js"></script>    
    <script type="text/javascript">

        /*지도 설정*/
        var default_lat = "47.546210584345204";
        var default_lng = "136.97929382324219";

        spotArr_0 = [];

        spotArr_1 = [
            { type: 'defaultPos', option: { lat: default_lat, lng: default_lng} }            
        ];

        spotArr_2 = [
            { 
                type: "map",
                option: {
                    zoom : 8,
                    mapTypeControl: true,
                    scrollwheel: true,
//                    panControl: true,
                    scaleControl: true,
                    streetViewControl: true,
                    zoomControl: true 
                } 
            }

        ];

        spotArr_3 = [
            {
                type: "default",
                option: {
                    viewStyleMap: false, //스타일맵  
                    width : 400,
                    height : 300
                } 
            }
        ];

        spotArr_4 = [
            { type: 'defaultPos', option: { lat: default_lat, lng: default_lng} }
            , { type: "map", option: { streetViewControl: true, zoomControl: true, zoom : 5} }
            , { type: "default", option: { aaa:123, bbb:333, viewSelectTravelMode: false} }
        ];

        spotArr_5 = [            
            { type: "default", option: { width:400, height:400, viewStyleMap : true  } }
            , { type: 'defaultPos', option: { lat: default_lat, lng: Number(default_lng-10) } }
            , { type: "map", option: { zoom : 4 } }            
        ];
        /*지도 설정*/

        $(document).ready(function() {
            $(".mapArea").GoogleMap_default();
        });

        function googleMapTest1(objIndex, style) {
            $(".mapArea").each(function() {
                if ($(this).index() == objIndex) {
                    $(this).GoogleMap_default(style);
                }
            });
        }
    </script>
</head>
<body>
    <form id="form1" runat="server">
    <div>
        <h1>구글맵 Test</h1>
        <input type="button" value="test1" onclick="googleMapTest1(0,spotArr_0);" />
        <input type="button" value="test2" onclick="googleMapTest1(1,spotArr_1);" />
        <input type="button" value="test3" onclick="googleMapTest1(2,spotArr_2);" />
        <input type="button" value="test4" onclick="googleMapTest1(3,spotArr_3);" />
        <input type="button" value="test5" onclick="googleMapTest1(4,spotArr_4);" />
        <input type="button" value="test6" onclick="googleMapTest1(5,spotArr_5);" />        
        <br/>
        <div class="canvas">
            <div id="map_1" class="mapArea" ></div>
            <div id="map_2" class="mapArea" ></div>
            <div id="map_3" class="mapArea" ></div>
            <div id="map_4" class="mapArea" ></div>
            <div id="map_5" class="mapArea" ></div>
            <div id="map_6" class="mapArea" ></div>
        </div>
    </div>
    </form>
</body>
</html>
