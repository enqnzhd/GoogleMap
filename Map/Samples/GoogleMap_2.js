
/* 
    0.기본 지도 그리기
    $self영역(div)에 구글맵 Div영역 및 커스텀 가능한 DIv영역 하나씩 추가해준다.
    
    1.커스텀영역 처리
    
    2.마커 추가
*/
;
(function($) {
    $.fn.GoogleMap_default = function(options) {

        var $mapDiv; //구글맵 Div 영역
        var $cusDiv; //커스텀 Div 영역
        var map; //맵 객체

        var tBaseOptions; //기본옵션 상속 객체
        var tMapOptions; //지도 기본 옵션 상속 객체
        var tMapStyleOptions; //지도 스타일 옵션 상속 객체
        var tMarkerOptions; //마커 기본 옵션 상속 객체

        var defaultPos = null; //초기 중심 좌표 객체

        var arrPos = new Array(); //좌표값 배열
        var arrSpotInfo = new Array(); ; //스팟관련 정보 배열
        var arrMarks = new Array(); //마커배열

        //설정가능 옵션들
        var baseOptions = {
            width: 300
            , height: 200
            , viewStyleMap: false //스타일맵
            , viewMarkers: true //마커표시
            , displayAllMarkers: true //마커전체 센터 정렬
        };

        //구글맵 설정 옵션
        var mapOptions = {
            zoom: 8
            , center: new google.maps.LatLng(37.500, 127.036) //서울
            , mapTypeControl: false
            , scrollwheel: true //휠 줌 사용여부
            , draggable: true //클릭 드래그
            , panControl: false //위치이동 컨트롤
            , scaleControl: false //지도 배율 컨트롤
            , streetViewControl: false //스트리트뷰 컨트롤
            , zoomControl: false //줌컨트롤
            , mapTypeControlOptions: {
                mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
            } //커스텀 맵일 경우 맵타입 설정
        };

            //구글맵 스타일 옵션
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

        var DefaultIcon = new google.maps.MarkerImage("images/iconSpot.png", null, null, null, new google.maps.Size(22, 26));

        //마커 옵션
        var markerOptions = {
            draggeable: false
        , animation: google.maps.Animation.DROP
        , iconimageType: "default"
        };

        return this.each(function() {
            var obj = $(this);

            InitMapArea(obj); //초기화

            drawMap(); //지도 그리기

            if (tBaseOptions.viewStyleMap)
                setStyleMap(); //스타일 적용

            if (tBaseOptions.viewMarkers)
                setMarkers(); //마커 그리기

            if (tBaseOptions.displayAllMarkers)
                setAllMarkerCenter(); //마커기준 영역 조절 및 zoom 조절

        });

        /* 0. 초기화 -------------------------------------------------------------*/

        //초기화설정
        function InitMapArea(obj) {
            //패널 up up
            createPanel(obj);
            //맵 옵션 call
            loadOptions();
        }

        /*패널에 컨트롤 올리기*/
        function createPanel(obj) {
            var $thisCon = obj;

            if ($thisCon.html() != "")
                $thisCon.html("");

            $mapDiv = $("<div class='map-canvas'><div>");
            $cusDiv = $("<div class='cus-canvas'><div>");

            $thisCon.append($cusDiv);
            $thisCon.append($mapDiv);
        }

        function loadOptions() {

            initOptions();

            if (options == null || options == undefined)
                return; //문제있음 디폴트값으로 처리

            if (options.length > 0) {
                for (var i = 0; i < options.length; i++) {
                    if (options[i]["type"] != undefined) {
                        getOptionsInfo(options[i]["type"], options[i]["option"]);
                    }
                }
            }
        }

        //기본 옵션들 상속 객체에 설정
        function initOptions() {
            tBaseOptions = baseOptions;
            tMapOptions = mapOptions;
            tMapStyleOptions = mapStyleOptions;
            tMarkerOptions = markerOptions;
        }

        //배열에서 필요 내용만 추출
        function getOptionsInfo(type, option) {

            switch (type.toLowerCase()) {
                case "defaultpos":
                    //기본좌표
                    defaultPos = new google.maps.LatLng(option["lat"], option["lng"]);
                    tMapOptions = $.extend({}, tMapOptions, { center: defaultPos });
                    break;
                case "default":
                    //기본 옵션
                    tBaseOptions = $.extend({}, baseOptions, option);
                    break;
                case "map":
                    //지도 옵션
                    tMapOptions = $.extend({}, mapOptions, option);

                    if (defaultPos != null)
                        tMapOptions = $.extend({}, tMapOptions, { center: defaultPos });

                    break;
                case "mapstyle":
                    //지도 스타일 옵션
                    tMapStyleOptions = $.extend({}, mapStyleOptions, option);
                    break;
                case "spot":
                    //스팟정보
                    arrSpotInfo = new Array();

                    if (option.length > 0) {
                        for (var s = 0; s < option.length; s++) {

                            var tmpPos = new google.maps.LatLng(option[s]["lat"], option[s]["lng"]);
                            arrSpotInfo.push(Arraymerge(option[s], { "position": tmpPos }));
                            //arrPos.push(tmpPos);
                        }
                    }

                    break;
                case "marker":
                    //구글맵 마커 옵션
                    tMarkerOptions = $.extend({}, markerOptions, option);
                    break;
                default:
                    break;
            }
        }
        /* 0. 초기화 -------------------------------------------------------------*/

        /* 1. 지도그리기 ---------------------------------------------------------*/
        function drawMap() {
            $mapDiv.css({ width: tBaseOptions.width, height: tBaseOptions.height });

            map = new google.maps.Map($mapDiv[0], tMapOptions);
        };
        /* 1. 지도그리기 ---------------------------------------------------------*/

        /* 2. 지도 스타일 적용 ---------------------------------------------------*/
        function setStyleMap() {
            map.setOptions({
                mapTypeControl: false
            , mapTypeControlOptions: {
                mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'cusMap']
            }
            });

            map.mapTypes.set('cusMap', new google.maps.StyledMapType(tMapStyleOptions, { name: "cusMap" }));
            map.setMapTypeId('cusMap');
        };
        /* 2. 지도 스타일 적용 ---------------------------------------------------*/

        /* 2. 마커 스타일 적용 ---------------------------------------------------*/
        function setMarkers() {
            if (arrSpotInfo.length > 0) {

                for (var i = 0; i < arrSpotInfo.length; i++) {
                    var marker = new google.maps.Marker(tMarkerOptions);

                    var icon = DefaultIcon;
                    if (tMarkerOptions.iconimageType == "num") {
                        icon = new google.maps.MarkerImage("images/iconSpot" + getNumIcon(i + 1) + ".png", null, null, null, new google.maps.Size(22, 26));
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
        /* 2. 마커 스타일 적용 ---------------------------------------------------*/
        
        /* 공용 메서드 -----------------------------------------------------------*/

        //두개배열 merge
        function Arraymerge(ArrObj1, ArrObj2) {
            for (var key in ArrObj2) {
                if (ArrObj2.hasOwnProperty(key))
                    ArrObj1[key] = ArrObj2[key]
            }

            return ArrObj1;
        }

        //지도이동
        function MoveTo(pos) {
            map.panTo(pos);
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

        //넘버 아이콘
        function getNumIcon(index) {
            //임의로 01이미지로 반환 고정
            //            if (index < 10)
            //                return '0' + index;
            //            else
            //                return index;


            return '01';
        }

        /* 공용 메서드 -----------------------------------------------------------*/

    }; //plugin function

})(jQuery);