<%@ Page Language="C#" AutoEventWireup="true" CodeFile="googleMap_1.aspx.cs" Inherits="Samples_DefaultMap_googleMap" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <style type="text/css">
        body { margin : 0 0 0 20 ; font-size:small; }
        .text { width : 30px; }
       .canvas div.mapArea { float : left; width:500px; height:500px; border:1px solid Gray; margin: 10 10 0 0;}        
    </style>
    <script src="//code.jquery.com/jquery-1.10.2.js"></script>       
    <script id="mapSC" src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&language=ko&libraries=weather"></script>     
    <script src="GoogleMap_1.js"></script>    
    <script type="text/javascript" >
        function getContext(obj) {
            var strVal = "";

            strVal = "<div>title : " + obj["title"] + "<br/> lat : " + obj["lat"] + "<br/> lng : " + obj["lng"] + "</div>";

            //            return "가나다라마바사아자차카타파하";
            return strVal;
        }
        
        var spotInfosCity = [
//            { "title": "인천광역시", "lat": "37.4485517865239", "lng": "126.45111322403", "callBack": getContext, "가": "aa", "나": "bb", "다": "cc", "라": "dd" }
             { "title": "런던", "lat": "51.508129", "lng": "-0.128005", "callBack": getContext }
            , { "title": "브뤼셀", "lat": "50.8503396", "lng": "4.3517103", "callBack": getContext }
            , { "title": "브뤼헤", "lat": "51.2094345", "lng": "3.2252377", "callBack": getContext }
            , { "title": "암스테르담", "lat": "52.3702157", "lng": "4.8951679", "callBack": getContext }
            , { "title": "뮌헨", "lat": "48.1448353", "lng": "11.5580067" }
            , { "title": "만하임", "lat": "49.4846773", "lng": "8.476724" }
            , { "title": "프라하", "lat": "50.0878114", "lng": "14.4204598" }
            , { "title": "빈(비엔나)", "lat": "48.2081743", "lng": "16.3738189" }
            , { "title": "베네치아(베니스)", "lat": "45.4343363", "lng": "12.3387844" }
            , { "title": "밀라노", "lat": "45.463681", "lng": "9.1881714" }
            , { "title": "피렌체", "lat": "43.7687324", "lng": "11.2569013" }
            , { "title": "로마", "lat": "41.8905198", "lng": "12.4942486" }
            , { "title": "인스부르크", "lat": "47.2692124", "lng": "11.4041024" }
            , { "title": "취리히", "lat": "47.367347", "lng": "8.5500025" }
            , { "title": "인터라켄", "lat": "46.6854831", "lng": "7.8559015" }
            , { "title": "파리", "lat": "48.856614", "lng": "2.3522219" }
        ];
    </script>
    <script type="text/javascript">

        $(document).ready(function() {
            $(".mapArea").GoogleMap_default();
        });

        function ApplyOptions(tar) {
            var options = null;
            Options = getOptions();

            if (tar == "a")
                $("#map_1").GoogleMap_default(Options);
            else if (tar == "b")
                $(".mapArea").eq(1).GoogleMap_default(Options);
            else if (tar == "all")
                $(".mapArea").GoogleMap_default(Options);
            else
                alert("?????");
        }

        function getOptions() {
            var defaultOption = {};
            var defaultPosOption = {};
            var mapOption = {};
            var spotOption = {};
            var markerOption = {};
            
            defaultPosOption = { lat: $("#txtLat").val()
                                , lng: $("#txtLng").val()
            };            

            defaultOption = { width: $("#txtWidth").val()
                            , height: $("#txtHeight").val()
                            , viewStyleMap: $("#chkViewStyleMap").is(':checked')
                            , viewMarkers: $("#chkViewMarkers").is(':checked')
                            , displayAllMarkers: $("#chkDisplayAllMarkers").is(':checked')
            };

            if ($("#chkMapEnable").is(':checked')) {

                mapOption = {
                    zoom: Number($("#ddlZoom").val())
                    , center: new google.maps.LatLng($("#txtLat").val(), $("#txtLng").val()) //서울
                    , mapTypeControl: $("#chkMapTypeControl").is(':checked')
                    , scrollwheel: $("#chkScrollwheel").is(':checked') //휠 줌 사용여부
                    , draggable: $("#chkDraggable").is(':checked') //클릭 드래그
                    , panControl: $("#chkPanControl").is(':checked') //위치이동 컨트롤
                    , scaleControl: $("#chkScaleControl").is(':checked') //지도 배율 컨트롤
                    , streetViewControl: $("#chkStreetViewControl").is(':checked') //스트리트뷰 컨트롤
                    , zoomControl: $("#chkZoomControl").is(':checked') //줌컨트롤                
                };
            }

            if ($("#chkViewMarkers").is(':checked')) {
                spotOption = spotInfosCity;

                markerOption = {
                    draggeable: $("#chkDraggeable").is(':checked')
                    , animation: $("#chkMarkerAni").is(':checked') ? google.maps.Animation.DROP : ""
                    , iconimageType: $("#chkMarkerNum").is(':checked') ? "num" : "default"                    
                };
            }

            Options = [
                { type: "default", option: defaultOption }
                , { type: 'defaultPos', option: defaultPosOption }
                , { type: "map", option: mapOption }
                , { type: "spot", option: spotOption }
                , { type: "marker", option: markerOption }
            ];

            return Options;
        }
    </script>
</head>
<body>
    <form id="form1" runat="server">
    <div>
        <h3>구글맵 Test- 지도 + 커스텀 영역 + 마커</h3>
        [지도]<br/>
        width :<input class="text" type="text" id="txtWidth" value="500" />
        height :<input class="text" type="text" id="txtHeight" value="500" />
        center :[ Lat :<input class="text" type="text" id="txtLat" value="36.646" />, Lng :<input class="text" type="text" id="txtLng" value="136.979" /> ]
        <br/>
        [맵기본]<br/>
        enable :<input type="checkbox" id="chkMapEnable" checked="checked" />
        zoom : <select id="ddlZoom">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8" selected="selected">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
        </select>        
        mapTypeControl :<input type="checkbox" id="chkMapTypeControl" checked="checked" />
        scrollwheel :<input type="checkbox" id="chkScrollwheel" checked="checked" />
        draggable :<input type="checkbox" id="chkDraggable" checked="checked" />
        panControl :<input type="checkbox" id="chkPanControl" checked="checked" />
        scaleControl :<input type="checkbox" id="chkScaleControl" checked="checked" />
        streetViewControl :<input type="checkbox" id="chkStreetViewControl" checked="checked" />
        zoomControl :<input type="checkbox" id="chkZoomControl" checked="checked" />
        <br/>
        [스타일맵]<br/>
        enable :<input type="checkbox" id="chkViewStyleMap" checked="checked" />
        <br/>
        [마커]<br/>
        enable :<input type="checkbox" id="chkViewMarkers" checked="checked" />
        <span style="color:Red;">draggeable :<input type="checkbox" id="chkDraggeable" disabled="disabled" /></span>
        markerAni :<input type="checkbox" id="chkMarkerAni" checked="checked" />
        IconType[ <input type="radio" id="chkMarkerDefault" checked="checked" name="markerIconType" />default,  <input type="radio" id="chkMarkerNum" name="markerIconType" />Num]
        viewAllMarkers :<input type="checkbox" id="chkDisplayAllMarkers" checked="checked" />
        <br/>
        
        
        <input type="button" value="첫번째 적용" onclick="ApplyOptions('a');" />
        <input type="button" value="두번째 적용" onclick="ApplyOptions('b');" />
        <input type="button" value="둘다 적용" onclick="ApplyOptions('all');" />
        
        <div class="canvas">
            <div id="map_1" class="mapArea" ></div>
            <div id="map_2" class="mapArea" ></div>
        </div>
    </div>
    </form>
</body>
</html>
