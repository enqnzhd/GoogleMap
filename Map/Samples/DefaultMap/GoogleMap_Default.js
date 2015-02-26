
/* 
    기본 지도 그리기
    $self영역(div)에 구글맵 Div영역 및 커스텀 가능한 DIv영역 하나씩 추가해준다.
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

        var defaultPos = null; //초기 중심 좌표 객체

        //설정가능 옵션들
        var baseOptions = {
            viewStyleMap: false //스타일맵            
            , width: 300
            , height: 200
        };

        //구글맵 설정 옵션
        var mapOptions = {
            zoom: 5
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

        return this.each(function() {
            var obj = $(this);

            InitMapArea(obj); //초기화

            drawMap(); //지도 그리기

            if (tBaseOptions.viewStyleMap)
                setStyleMap(); //스타일 적용

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

    }; //plugin function

})(jQuery);