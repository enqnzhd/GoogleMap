;
(function($) {
    $.fn.GoogleMapCustom = function(options) {

        //옵션 설정값 배열로 받음
        //기본 옵션은 최상위 배열 파라미터로 받음
        //기본 좌표 배열로 받을것
        //인포박스 내용하고 설정 좌표 배열로 받을것
        //인포박스 내용하고 같이 일별 배열로 받을것!!

        var $self; //맵 영역 div 객체
        var $panel; //패널 영역 div 객체
        var map; //맵 객체

        //var DefaultIcon = "http://openimage.interpark.com/tourpark/tour/FreeyaPlanner/popup/mapicon/iconSpot.png";
        var DefaultIcon = new google.maps.MarkerImage("http://openimage.interpark.com/tourpark/tour/FreeyaPlanner/popup/mapicon/iconSpot.png", null, null, null, new google.maps.Size(22, 26));

        //설정가능 옵션들
        var baseOptions = {
            viewStyleMap: false //스타일맵
            , viewMarkers: true //마커표시
            , viewMarkerAnimation: false //마커 애니메이션
            , viewInfoWindow: true //정보창 표시 여부
            , viewLine: true //직선
            , viewCurve: true //곡선
            , viewLineAnimation: false //라인 애니메이션            
            , viewContextMenu: false //우측메뉴
            , viewOneInfoWinOnly: false //정보창 단일로 표시
            , viewSelectTravelMode: true //여행상태(직선,운전,도보,자전거,정류장등) 선택 창 모출
            , width: 700
            , height: 400
            , aniSpeed: 1000
            , isEndClose: false //순환(종료좌표->시작좌표 연결 추가)
            , viewLineSimbol: true
            , viewWeather: false //날씨 표시
        };

        //구글맵 기본 옵션
        var mapOptions = {
            zoom: 5
            , center: new google.maps.LatLng(37.500, 127.036)
            , mapTypeControl: false
            , scrollwheel: true //휠 줌 사용여부
            , draggable: true //클릭 드래그
            , panControl: false //위치이동 컨트롤
            , scaleControl: false //지도 배율 컨트롤
            , streetViewControl: false //스트리트뷰 컨트롤
            , zoomControl: false //줌컨트롤
            , mapTypeControlOptions: {
                mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
            }
        };

        //마커 옵션
        var markerOptions = {
            draggeable: false
            , animation: google.maps.Animation.DROP
            , iconimageType: "default"
            , iconType: "image"
        };

        var mapStyleOptions =
        [{
            stylers: [
                { hue: "#00ffe6" },
                { saturation: -20 }
              ]
        }, {
            featureType: "road",
            elementType: "geometry",
            stylers: [
                { lightness: 100 },
                { visibility: "simplified" }
              ]
        }, {
            featureType: "road",
            elementType: "labels",
            stylers: [
                { visibility: "off" }
              ]
}];

            //라인 화살표 심볼 옵션
            var ArrowSymbolOptions = {
                path: google.maps.SymbolPath.FORWARD_OPEN_ARROW
        , scale: 3
        , strokeColor: '#006400'
        , fillColor: '#006400'
        , fillOpacity: 1
        , rotation: 0
        , strokeWeight: 2
            };

            //정보창 옵션
            var infoWinOptions = {
                context: ""
            };

            //라인 옵션
            var lineOptions = {
                scale: 3
        , strokeColor: '#006400'
        , strokeWeight: 2
        , strokeOpacity: 0.5
        , icons: [{
            icon: ArrowSymbolOptions,
            offset: '50%'
}]
            };

            //라인 옵션
            var CurvelineOptions = {
                scale: 3
        , icons: [{
            icon: ArrowSymbolOptions,
            offset: '50%'
}]
        , strokeColor: '#3232ff'
        , strokeWeight: 3
        , strokeOpacity: 1.0
        , geodesic: true
            };

            //애니 라인 옵션
            var anilineOptions = {
                strokeColor: '#3232ff'
        , strokeWeight: 3
        , strokeOpacity: 0.5
        , geodesic: true
            };

        /*초기설정*/

        var directionsDisplay = new google.maps.DirectionsRenderer(); //여행모드 렌더링 객체
        var directionsService = new google.maps.DirectionsService(); //여행모드 조회 서비스

        //json 정보 분석        
        var defaultPos = null; //기본 좌표
        var arrPos = new Array(); //좌표값 배열
        var arrSpotInfo; //스팟관련 정보 배열
        var arrMarks = new Array(); //마커배열
        var arrInfoWins = new Array(); //정보창 배열
        var arrLinePaths = new Array(); //경로 좌표 배열
        var arrLines = new Array(); //라인 배열

        var tBaseOptions; //기본옵션 상속 객체
        var tMapOptions; //지도 기본 옵션 상속 객체
        var tMarkerOptions; //마커 기본 옵션 상속 객체
        var tMapStyleOptions; //지도 스타일 옵션 상속 객체    
        var tInfoWinOptions; //정보창 옵션 상속 개체
        var tArrowSymbolOptions; //화살표 심볼 옵션 상속 객체
        var tLineOptions; //라인 옵션 상속 개체
        var tCurvelineOptions; //커브라인 옵션 상속 개체
        var tAnilineOptions; //애니메이션 라인 옵션 상속 개체

        /*각 항목별 옵션들*/
        return this.each(function() {
            var obj = $(this);
            createPanel(obj);

            loadOptions();

            drawMap();

            if (tBaseOptions.viewStyleMap)
                setStyleMap();

            if (tBaseOptions.viewWeather)
                drawWeather();

            if (tBaseOptions.viewMarkers)
                setMarkers();

            if (tBaseOptions.viewInfoWindow)
                setInfowin();

            if (tBaseOptions.viewLine) {
                if (tBaseOptions.viewLineAnimation)
                    drawLineAnimation();
                else
                    drawPathLine();
            }

            updatePanel();

            setAllMarkerCenter();

        });

        function loadOptions() {
            initOptions();

            if (options == null || options == undefined)
                return;

            if (options.length > 0) {
                for (var i = 0; i < options.length; i++) {
                    if (options[i]["type"] != undefined) {
                        getOptionsInfo(options[i]["type"], options[i]["option"]);
                    }
                    else {
                        //alert(i + "번째 배열에 type이 설정되지 않았습니다.");
                    }
                }
            }
            else {
                //alert("options 정보가 없네요");
            }
        }

        //기본 옵션들 상속 객체에 설정
        function initOptions() {
            tBaseOptions = baseOptions;
            tMapOptions = mapOptions;
            tMarkerOptions = markerOptions;
            tMapStyleOptions = mapStyleOptions;
            tArrowSymbolOptions = ArrowSymbolOptions;
            tLineOptions = lineOptions;
            tCurvelineOptions = CurvelineOptions;
            tAnilineOptions = anilineOptions
        }

        //배열에서 필요 내용만 추출
        function getOptionsInfo(type, option) {

            switch (type.toLowerCase()) {
                case "defaultpos":
                    //기본좌표
                    defaultPos = new google.maps.LatLng(option["lat"], option["lng"]);
                    tMapOptions = $.extend({}, tMapOptions, { center: defaultPos });
                    break;
                case "spot":
                    //스팟정보
                    arrSpotInfo = new Array();

                    if (option.length > 0) {
                        for (var s = 0; s < option.length; s++) {

                            //                                var tmpPos = new google.maps.LatLng(option[s]["lat"], option[s]["lng"]);
                            //                                arrSpotInfo.push({ "position": tmpPos, "title": option[s]["title"], "content": option[s]["content"], "contentFunc": option[s]["contentFun"], "imageIcon": option[s]["imageIcon"], "image": option[s]["image"], "imagenm": option[s]["imagenm"] });
                            //                                arrPos.push(tmpPos);

                            var tmpPos = new google.maps.LatLng(option[s]["lat"], option[s]["lng"]);
                            arrSpotInfo.push(Arraymerge(option[s], { "position": tmpPos }));
                            arrPos.push(tmpPos);
                        }
                    }
                    else {
                        //alert("type : spot\n좌표 option 정보가 존재하지 않습니다.");
                    };

                    break;
                case "default":
                    tBaseOptions = $.extend({}, baseOptions, option);
                    break;
                case "map":
                    tMapOptions = $.extend({}, mapOptions, option);

                    if (defaultPos != null)
                        tMapOptions = $.extend({}, tMapOptions, { center: defaultPos });

                    break;
                case "marker":
                    tMarkerOptions = $.extend({}, markerOptions, option);
                    break;

                case "mapstyle":
                    tMapStyleOptions = $.extend({}, mapStyleOptions, option);
                    break;

                case "linesymbol":
                    tArrowSymbolOptions = $.extend({}, ArrowSymbolOptions, option);
                    break;

                case "infowin":
                    tInfoWinOptions = $.extend({}, infoWinOptions, option);
                    break;

                case "line":
                    tLineOptions = $.extend({}, lineOptions, option);
                    break;

                case "curve":
                    tCurvelineOptions = $.extend({}, CurvelineOptions, option);
                    break;

                case "aniline":
                    tAnilineOptions = $.extend({}, anilineOptions, option);
                    break;
            }
        }

        //두개배열 merge
        function Arraymerge(ArrObj1, ArrObj2) {
            for (var key in ArrObj2) {
                if (ArrObj2.hasOwnProperty(key))
                    ArrObj1[key] = ArrObj2[key]
            }

            return ArrObj1;
        }

        //배열로 받은 좌표값 설정

        //1.일자별 셀렉트

        //2.일자별 패널영역

        //3.일자별 좌표값

        //4.일자별 정보창값

        //5.일자별 마커값

        /*패널에 컨트롤 올리기*/
        function createPanel(obj) {
            var $thisCon = obj;

            $panel = $("<div><div>");
            $self = $("<div><div>");

            $thisCon.append($panel);
            $thisCon.append($self);
        }

        function updatePanel() {
            if (arrMarks.length > 0) {
                var msg = "여행경로 : ";

                for (var i = 0; i < arrMarks.length; i++) {
                    msg += (i + 1) + "." + arrMarks[i]["title"];

                    if (i != (arrMarks.length - 1))
                        msg += " -> "
                }

                $panel.html(msg);
            }

            if (tBaseOptions.viewSelectTravelMode) {
                var $selDiv = $("<div>여행 모드 선택</div>");
                $selDiv.appendTo($panel);

                var $selTravel = $("<select></selecct>");
                $selTravel.attr("id", "ddlTravel");

                $selTravel.change(function() {
                    travelMode_OnChange($(this));
                });

                var $optTravel1 = $("<option></option>");
                $optTravel1.attr("value", "Directline").html("라인");
                $optTravel1.appendTo($selTravel);

                var $optTravel2 = $("<option></option>");
                $optTravel2.attr("value", "DRIVING").html("도로");
                $optTravel2.appendTo($selTravel);

                var $optTravel3 = $("<option></option>");
                $optTravel3.attr("value", "WALKING").html("도보");
                $optTravel3.appendTo($selTravel);

                //            var $optTravel4 = $("<option></option>");
                //            $optTravel4.attr("value","BICYCLING").html("자전거길");
                //            $optTravel4.appendTo($selTravel);
                //            
                var $optTravel5 = $("<option></option>");
                $optTravel5.attr("value", "TRANSIT").html("정류장");
                $optTravel5.appendTo($selTravel);

                $selTravel.appendTo($panel);
            }
        }

        function travelMode_OnChange(obj) {
            var $travelCon = obj;
            var selectedMode = $travelCon.children("option:selected").val();

            if (selectedMode == "Directline") {
                showAllLines();

                directionsDisplay.setMap(null);
            }
            else {
                hideAllLines();

                directionsDisplay.setMap(map);

                var start = arrPos[0];
                var end = arrPos[arrPos.length - 1];
                var waypts = [];

                for (var i = 1; i < arrPos.length - 1; i++) {
                    waypts.push({ location: arrPos[i], stopover: false });
                }

                var request = {
                    origin: start
                , destination: end
                , waypoints: waypts
                , optimizeWaypoints: false
                , travelMode: google.maps.TravelMode[selectedMode]

                };

                directionsService.route(request, function(response, status) {
                    if (status == google.maps.DirectionsStatus.OK) {
                        directionsDisplay.setDirections(response);
                    }
                });
            }
        };

        /*지도그리기*/

        /*각 항목별 옵션들*/

        //2.그냥 지도 그리기
        function drawMap() {
            $self.css({ width: tBaseOptions.width, height: tBaseOptions.height });

            map = new google.maps.Map($self[0], tMapOptions);
        };

        //1.스타일 적용 후 지도 그리기
        function setStyleMap() {
            map.setOptions({
                mapTypeControl: false
                , mapTypeControlOptions: {
                    mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'cusMap']
                }
            });

            map.mapTypes.set('cusMap', new google.maps.StyledMapType(tMapStyleOptions, { name: "Interpark" }));
            map.setMapTypeId('cusMap');
        };

        //지도이동
        function MoveTo(pos) {
            map.panTo(pos);
        };

        /*마커 그리기*/

        function setMarkers() {
            if (arrSpotInfo.length > 0) {

                for (var i = 0; i < arrSpotInfo.length; i++) {
                    var marker = new google.maps.Marker(tMarkerOptions);

                    var icon = DefaultIcon;
                    if (tMarkerOptions.iconimageType == "num") {
                        icon = new google.maps.MarkerImage("http://openimage.interpark.com/tourpark/tour/FreeyaPlanner/popup/mapicon/iconSpot" + getNumIcon(i + 1) + ".png", null, null, null, new google.maps.Size(22, 26));
                        //                    icon = 'http://openimage.interpark.com/tourpark/tour/FreeyaPlanner/popup/mapicon/iconSpot' + getNumIcon(i+1) + '.png';
                    }

                    var markerOpt = {
                        position: arrSpotInfo[i]["position"],
                        icon: icon,
                        title: arrSpotInfo[i]["title"],
                        map: map
                    };

                    marker.setOptions(markerOpt);

                    arrMarks.push(marker);

                    if (i == (arrSpotInfo.length - 1)) {
                        MoveTo(arrSpotInfo[i]["position"]);
                    }
                }
            }
        };

        function getNumIcon(index) {
            if (index < 10)
                return '0' + index;
            else
                return index;
        }

        //모든 마커 숨기기
        function hideAllMarkers() {
            if (arrMarks.length > 0) {
                for (var i = 0; i < arrMarks.length; i++) {
                    arrMarks[i].setMap(null);
                }
            }
        };

        //모든 마커 숨기기
        function showAllMarkers() {
            if (arrMarks.length > 0) {
                for (var i = 0; i < arrMarks.length; i++) {
                    arrMarks[i].setMap(map);
                }
            }
        };

        //모든 마커 삭제
        function clearAllMarkers() {
            hideAllMarkers();

            arrMarks = new Array();
        };

        //모든 마커 뷰 및 센터 설정
        function setAllMarkerCenter() {
            if (arrMarks.length > 0) {
                var bounds = new google.maps.LatLngBounds();
                for (var i = 0; i < arrMarks.length; i++) {
                    bounds.extend(arrMarks[i].getPosition());
                }

                map.setCenter(bounds.getCenter());

                map.fitBounds(bounds);

                map.setZoom(map.getZoom() - 1);

                if (map.getZoom() > 13)
                    map.setZoom(13);
            }
        }

        /*정보창 설정*/
        //    tInfoWinOptions
        function setInfowin() {
            if (arrSpotInfo.length > 0) {

                for (var i = 0; i < arrSpotInfo.length; i++) {
                    var infoWin = new google.maps.InfoWindow(tInfoWinOptions);

                    if (arrSpotInfo[i].hasOwnProperty("callBack")) {
                        if (arrSpotInfo[i]["callBack"] != "" && typeof (arrSpotInfo[i]["callBack"]) == "function")
                            infoWin.setContent(setInfoWinContentsCallBack(arrSpotInfo[i], arrSpotInfo[i]["callBack"]));
                        else
                            infoWin.setContent(setInfoWinContents(arrSpotInfo[i]));
                    }
                    else
                        infoWin.setContent(setInfoWinContents(arrSpotInfo[i]));

                    arrInfoWins.push(infoWin);
                }
            }

            setMarker_OnClick();
        };

        function setInfoWinContentsCallBack(obj, callback) {
            var infos = obj;

            return callback(obj);
        }

        //정보창 컨텐츠 설정
        function setInfoWinContents(obj) {
            var infos = obj;

            //        var $Area = $("<div></div>");
            //        var $image = $("<img />").attr("src", infos["imagenm"]).addClass("img").click(function() {
            //            alert(infos["imagenm"]);
            //        });
            //        var $title = $j("<div></div>").addClass("tit").html(infos["title"] + "<br/>테스트로 등록해보아요~").click(function() {
            //            alert(infos["title"]);
            //        });

            //        $Area.append($image);
            //        $Area.append($title);

            //        return $Area[0];


            return "<div class='layerTest'>" + infos["title"] + "</div>";

        };

        //정보창 클릭 이벤트 연결
        function setMarker_OnClick() {
            if (arrSpotInfo.length > 0) {

                for (var i = 0; i < arrSpotInfo.length; i++) {
                    var mark = arrMarks[i];
                    var infoWin = arrInfoWins[i];

                    with ({ paramIndex: i }) {
                        google.maps.event.addListener(mark, 'click', function() {
                            infoWinClickEvent(paramIndex);
                        });
                    }
                }
            }
        };

        //정보창 클릭 이벤트
        function infoWinClickEvent(paramIndex) {
            if (arrInfoWins.length > paramIndex) {
                //            arrInfoWins[paramIndex].open(map, arrMarks[paramIndex]);

                if (tBaseOptions.viewOneInfoWinOnly)
                    hideAllInfoWin();

                if (isInfoWinOpenCheck(paramIndex))
                    arrInfoWins[paramIndex].close();
                else
                    arrInfoWins[paramIndex].open(map, arrMarks[paramIndex]);
            }
        };

        //정보창 오픈 여부 체크
        function isInfoWinOpenCheck(paramIndex) {
            var map = arrInfoWins[paramIndex].getMap();
            return (map != null && typeof map != undefined);
        };

        //모든 정보창 숨기기
        function hideAllInfoWin() {

            if (arrInfoWins.length > 0) {
                for (var i = 0; i < arrInfoWins.length; i++) {
                    arrInfoWins[i].close();
                }
            }
        };

        //모든 정보창 보이기
        function showAllInfoWin() {

            if (arrInfoWins.length > 0) {
                for (var i = 0; i < arrInfoWins.length; i++) {
                    arrInfoWins[i].open(map, arrMarks[i]);
                }
            }
        };

        //모든창 닫기
        function clearAllInfoWin() {
            hideAllInfoWin();

            arrInfoWins = new Array();
        };

        /*라인 그리기*/

        function drawLineAnimation() {
            clearAllLines();

            if (arrPos.length > 0) {
                var option = tLineOptions;

                if (!tBaseOptions.viewLineSimbol) {
                    option = $.extend({}, option, { icon: [] });
                }

                if (tBaseOptions.viewCurve) {
                    option = tCurvelineOptions;

                    if (tBaseOptions.viewLineSimbol) {
                        option = $.extend(option, { icons: [{ icon: tArrowSymbolOptions, offset: '0%'}] })
                    }
                }

                option = $.extend(option, tAnilineOptions);

                var line = new google.maps.Polyline(option);

                var customArrPos = arrPos;

                if (tBaseOptions.isEndClose)
                    customArrPos[arrPos.length] = arrPos[0];

                line.setOptions({ path: customArrPos });

                line.setMap(map);
                arrLines.push(line);

                var count = 0;
                var speed = baseOptions.aniSpeed;

                window.setInterval(function() {
                    count = (count + 1) % 800;

                    var icons = line.get('icons');
                    icons[0].offset = (count / 8) + '%';
                    line.set('icons', icons);
                }, 80);
            }
        }

        //경로 그리기
        function drawPathLine() {
            clearAllLines();

            getLinePath();

            if (arrLinePaths.length > 0) {
                for (var j = 0; j < arrLinePaths.length; j++) {
                    var option = tLineOptions;

                    if (tBaseOptions.viewCurve)
                        option = tCurvelineOptions;

                    if (!tBaseOptions.viewLineSimbol) {
                        option = $.extend({}, option, { icon: [] });
                    }

                    var line = new google.maps.Polyline(option);
                    line.setOptions({ path: arrLinePaths[j] });

                    line.setMap(map);
                    arrLines.push(line);
                }
            }
        };

        //스팟별로 경로(시작->종료) 나눔
        function getLinePath() {
            if (arrPos.length > 0) {
                var limitCount = arrPos.length - 1;

                if (tBaseOptions.isEndClose)
                    limitCount = arrPos.length;

                for (var i = 0; i < limitCount; i++) {
                    arrLinePaths[i] = new Array();
                    arrLinePaths[i][0] = arrPos[i];

                    if (i == (arrPos.length - 1)) {
                        arrLinePaths[i][1] = arrPos[0];
                    }
                    else {
                        arrLinePaths[i][1] = arrPos[i + 1];
                    }
                }
            }
        };

        //전체라인 숨김
        function hideAllLines() {
            if (arrLines.length > 0) {
                for (var j = 0; j < arrLines.length; j++) {
                    arrLines[j].setMap(null);
                }
            }
        };

        //전체라인 보임
        function showAllLines() {
            if (arrLines.length > 0) {
                for (var j = 0; j < arrLines.length; j++) {
                    arrLines[j].setMap(map);
                }
            }
        };

        //전체라인지움
        function clearAllLines() {
            if (arrLines.length > 0) {
                hideAllLines();

                arrLines = new Array();
            }
        };

        ////1.좌표기반 라인 그리기

        ////2.좌표기반 곡선 그리기

        ////3.전체 라인 숨김처리

        ////4.전체 라인 보이기

        ////5.전체 라인 삭제

        /*사각권역 그리기*/

        ////사각 권역 옵션
        //var rectOptions = {

        //};

        ////1.좌표기반 권역 그리기

        ////3.전체 권역 숨김처리

        ////4.전체 권역 보이기

        ////5.전체 권역 삭제

        /*원형권역 그리기*/

        ////원형 권역 옵션
        //var circleOptions = {

        //};

        ////1.좌표기반 권역 그리기

        ////3.전체 권역 숨김처리

        ////4.전체 권역 보이기

        ////5.전체 권역 삭제

        /*날씨 그리기*/

        var weatherLayer; //날씨 레이어
        var cloudLayer; //구름 레이어

        function drawWeather() {
            weatherLayer = new google.maps.weather.WeatherLayer({
                //temperatureUnits: google.maps.weather.TemperatureUnit.FAHRENHEIT //화씨
                temperatureUnits: google.maps.weather.TemperatureUnit.CELSIUS //섭씨
            });

            weatherLayer.setMap(map);
        }

        function hideWeather() {
            weatherLayer.setMap(null);
        }

        ////날씨 옵션
        //var weatherOptions = {

        //};

        ////1.일반 지도 그리기

        ////2.날씨 적용


        /*컨텍스트 메뉴 설정*/

        //1.컨텍스트 메뉴 설정(타이틀, 펑션)

        //2.컨텍스트 메뉴 펑션 적용

    }; //plugin function

})(jQuery);