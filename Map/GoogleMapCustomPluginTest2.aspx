<%@ Page Language="C#" AutoEventWireup="true" CodeFile="GoogleMapCustomPluginTest2.aspx.cs" Inherits="GoogleMapCustomPluginTest" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    
    <script type="text/javascript">
        var spotInfos = [
            {   "DaySeq": "1"
                , "title": "인천 - 경유 - 런던"
                , "DayMeal": "조식 : 불포함         중식 : 기내식       석식:기내식"
                , "tourSpotList": [
                    { "title": "히드로공항", "lat": "51.4707579379031", "lng": "-0.456212", "spotNo": "69452", "callBack": "getContext"}]
            }
            , { "DaySeq": "2"
                , "title": "런던"
                , "DayMeal": "조식:포함         중식:불포함        석식:불포함"
                , "tourSpotList": [
                    { "title": "트라팔가 광장", "lat": "51.507962", "lng": "-0.127995", "spotNo": "66007", "callBack": "getContext" }
                    , { "title": "웨스트민스터 사원", "lat": "51.4994730402264", "lng": "-0.12836", "spotNo": "66236", "callBack": "getContext" }
                    , { "title": "버킹검 궁전", "lat": "51.5011694580685", "lng": "-0.142457", "spotNo": "67292", "callBack": "getContext" }
                    , { "title": "국회의사당", "lat": "51.4994062508304", "lng": "-0.124841", "spotNo": "67448", "callBack": "getContext"}]
            }
            , { "DaySeq": "3"
                , "title": "런던"
                , "DayMeal": "조식:포함         중식:불포함        석식:불포함"
                , "tourSpotList": [
                    { "title": "세인트 폴 대성당 ", "lat": "51.5143479391821", "lng": "-0.0989842", "spotNo": "65736" }
                    , { "title": "런던 마담 투소 박물관", "lat": "51.5229701516361", "lng": "-0.154983", "spotNo": "65780" }
                    , { "title": "내셔널 갤러리 ", "lat": "51.508555", "lng": "-0.128424", "spotNo": "65790" }
                    , { "title": "대영 박물관", "lat": "51.5193051597363", "lng": "-0.127351", "spotNo": "66710"}]
            }
            , { "DaySeq": "4"
                , "title": "런던 - 브뤼셀"
                , "DayMeal": "조식:포함         중식:불포함        석식:불포함"
                , "tourSpotList": []
            }
            , { "DaySeq": "5"
                , "title": "브뤼셀 - 브뤼헤 - 암스테르담"
                , "DayMeal": "조식:포함         중식:불포함        석식:불포함"
                , "tourSpotList": []
            }
            , { "DaySeq": "6"
                , "title": "뮌헨"
                , "DayMeal": "조식:불포함         중식:불포함        석식:불포함"
                , "tourSpotList": [
                    { "title": "BMW 박물관", "lat": "48.17705", "lng": "11.5587", "spotNo": "65744" }
                    , { "title": "프라우엔 교회", "lat": "48.1381986477577", "lng": "11.572", "spotNo": "66818" }
                    , { "title": "호엔짤즈부르크 성", "lat": "47.7952278", "lng": "13.0474", "spotNo": "65943" }
                    , { "title": "미라벨정원", "lat": "47.805433", "lng": "13.0395", "spotNo": "66536"}]
            }
            , { "DaySeq": "7"
                , "title": "뮌헨 - 만하임"
                , "DayMeal": "조식:포함         중식:불포함        석식:불포함"
                , "tourSpotList": [
                    { "title": "신시청사", "lat": "48.1386926674736", "lng": "11.5762", "spotNo": "66464" }
                    , { "title": "님펜부르크 성", "lat": "48.1571541399825", "lng": "11.5007", "spotNo": "77414" }
                    , { "title": "다하우 수용소", "lat": "48.259395", "lng": "11.4343", "spotNo": "77415" }
                    , { "title": "프라우엔교회", "lat": "48.1384563977678", "lng": "11.5733", "spotNo": "84948"}]
            }
            , { "DaySeq": "8"
                , "title": "프라하"
                , "DayMeal": "조식:불포함         중식:불포함        석식:불포함"
                , "tourSpotList": [
                    { "title": "구시청사 & 천문시계", "lat": "50.0869761", "lng": "14.4207", "spotNo": "65954" }
                    , { "title": "황금소로", "lat": "50.0919097", "lng": "14.4038", "spotNo": "65989" }
                    , { "title": "카를교", "lat": "50.0864596108796", "lng": "14.4115", "spotNo": "67347" }
                    , { "title": "프라하 성", "lat": "50.090356", "lng": "14.3994", "spotNo": "67348"}]
            }
            , { "DaySeq": "9"
                , "title": "프라하 - 비엔나"
                , "DayMeal": "조식:포함         중식:불포함        석식:불포함"
                , "tourSpotList": [
                    { "title": "성슈테판성당", "lat": "48.2087105", "lng": "16.3727", "spotNo": "65955" }
                    , { "title": "케른트너거리", "lat": "48.2074903348422", "lng": "16.3717", "spotNo": "66635" }
                    , { "title": "벨베데레궁전", "lat": "48.191934", "lng": "16.3791", "spotNo": "67248" }
                    , { "title": "쉔브룬궁전", "lat": "48.1855932", "lng": "16.3121", "spotNo": "67397"}]
            }
            , { "DaySeq": "10"
                , "title": "비엔나"
                , "DayMeal": "조식:포함         중식:불포함        석식:불포함"
                , "tourSpotList": [
                    { "title": "왕궁", "lat": "48.2076583612572", "lng": "16.3643", "spotNo": "66518" }
                    , { "title": "시립공원", "lat": "48.203018", "lng": "16.3794", "spotNo": "66804" }
                    , { "title": "오페라하우스", "lat": "48.2027778", "lng": "16.3685", "spotNo": "77674" }
                    , { "title": "시청사", "lat": "48.2107899867428", "lng": "16.3575", "spotNo": "77676"}]
            }
            , { "DaySeq": "11"
                , "title": "베니스"
                , "DayMeal": "조식:불포함         중식:불포함        석식:불포함"
                , "tourSpotList": [
                    { "title": "산 마르코 대성당", "lat": "45.4346252", "lng": "12.3397", "spotNo": "66638" }
                    , { "title": "두깔레 궁전", "lat": "45.4339366386311", "lng": "12.3399", "spotNo": "76222" }
                    , { "title": "리알토 다리", "lat": "45.4380661", "lng": "12.3359", "spotNo": "76223"}]
            }
            , { "DaySeq": "12"
                , "title": "베니스 - 밀라노or 피렌체 - 로마"
                , "DayMeal": "조식:포함         중식:불포함        석식:불포함"
                , "tourSpotList": [
                    { "title": "두오모", "lat": "43.7732630483434", "lng": "11.2568", "spotNo": "66746" }
                    , { "title": "베키오 다리", "lat": "43.7680490149647", "lng": "11.2532", "spotNo": "66844" }
                    , { "title": "미켈란젤로 광장", "lat": "43.762943005412", "lng": "11.2651", "spotNo": "77135"}]
            }
            , { "DaySeq": "13"
                , "title": "로마"
                , "DayMeal": "조식:포함         중식:불포함        석식:불포함"
                , "tourSpotList": [
                    { "title": "트레비 분수", "lat": "41.9007624", "lng": "12.4833", "spotNo": "66212" }
                    , { "title": "바티칸 박물관", "lat": "41.9069011", "lng": "12.4542", "spotNo": "66555" }
                    , { "title": "스페인 광장", "lat": "41.9057979", "lng": "12.4821", "spotNo": "66777" }
                    , { "title": "판테온", "lat": "41.8988487", "lng": "12.4768", "spotNo": "67312"}]
            }
            , { "DaySeq": "14"
                , "title": "로마"
                , "DayMeal": "조식:포함         중식:불포함        석식:불포함"
                , "tourSpotList": [
                    { "title": "미켈란젤로 광장과 피렌체 야경", "lat": "43.7628112816449", "lng": "11.2649", "spotNo": "76231" }
                    , { "title": "시뇨리아 광장", "lat": "43.7696308", "lng": "11.256", "spotNo": "76255"}]
            }
            , { "DaySeq": "15"
                , "title": "로마"
                , "DayMeal": "조식:포함         중식:불포함        석식:불포함"
                , "tourSpotList": [
                    { "title": "진실의 입", "lat": "41.8881473", "lng": "12.4814", "spotNo": "66118" }
                    , { "title": "콜로세움", "lat": "41.8893726", "lng": "12.4924", "spotNo": "66429" }
                    , { "title": "포로 로마노", "lat": "41.892013", "lng": "12.4838", "spotNo": "66587" }
                    , { "title": "베네치아 광장", "lat": "41.8954656", "lng": "12.4823", "spotNo": "76188"}]
            }
            , { "DaySeq": "16"
                , "title": "인스부르크 - 취리히 - 루째른 - 인터라켄"
                , "DayMeal": "조식:불포함         중식:불포함        석식:불포함"
                , "tourSpotList": [
                    { "title": "그로스뮌스터 대성당 ", "lat": "47.3705962056775", "lng": "8.54411", "spotNo": "66428" }
                    , { "title": "프라우뮌스터", "lat": "47.369746060062", "lng": "8.54138", "spotNo": "66646" }
                    , { "title": "카펠교", "lat": "47.0513457042225", "lng": "8.30725", "spotNo": "85007"}]
            }
            , { "DaySeq": "17"
                , "title": "인터라켄"
                , "DayMeal": "조식:포함         중식:불포함        석식:불포함"
                , "tourSpotList": [
                    { "title": "인터라켄", "lat": "46.68437", "lng": "7.85938", "spotNo": "66847" }
                    , { "title": "융프라우요흐", "lat": "46.5474", "lng": "7.985", "spotNo": "67008"}]
            }
            , { "DaySeq": "18"
                , "title": "인터라켄 - 제네바(또는 베른,로잔,취리히) - 파리"
                , "DayMeal": "조식:포함         중식:불포함        석식:불포함"
                , "tourSpotList": []
            }
            , { "DaySeq": "19"
                , "title": "파리"
                , "DayMeal": "조식:포함         중식:불포함        석식:불포함"
                , "tourSpotList": [
                    { "title": "몽마르트르 언덕", "lat": "48.886498480636", "lng": "2.34075", "spotNo": "68936" }
                    , { "title": "마들렌느 교회 ", "lat": "48.8694909331185", "lng": "2.32419", "spotNo": "68946" }
                    , { "title": "방돔 광장 ", "lat": "48.8674390173293", "lng": "2.32942", "spotNo": "68948"}]
            }
            , { "DaySeq": "20"
                , "title": "파리"
                , "DayMeal": "조식:포함         중식:불포함        석식:불포함"
                , "tourSpotList": [
                    { "title": "루브르 박물관 ", "lat": "48.8605998667267", "lng": "2.33763", "spotNo": "68942" }
                    , { "title": "샹젤리제 거리 ", "lat": "48.8727847612667", "lng": "2.29815", "spotNo": "68966" }
                    , { "title": "파리 개선문 ", "lat": "48.8737268232779", "lng": "2.2952", "spotNo": "68967" }
                    , { "title": "에펠탑 ", "lat": "48.8582493546056", "lng": "2.29466", "spotNo": "69098"}]
            }
            , { "DaySeq": "21"
                , "title": "파리"
                , "DayMeal": "조식:포함         중식:불포함        석식:불포함"
                , "tourSpotList": [
                    { "title": "샤를드골 공항", "lat": "49.0110775596636", "lng": "2.54539", "spotNo": "86031"}]
            }
            , { "DaySeq": "22"
                , "title": "경유 - 인천"
                , "DayMeal": ""
                , "tourSpotList": []
            }];
    </script>
    <script type="text/javascript">

        
    
        var spotInfosCity = [
            { "title": "인천광역시", "lat": "37.4485517865239", "lng": "126.45111322403", "callBack": getContext, "가": "aa", "나": "bb", "다": "cc", "라": "dd" }
            , { "title": "런던", "lat": "51.508129", "lng": "-0.128005", "callBack": getContext }
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
            , { "title": "파리", "lat": "48.856614", "lng": "2.3522219"}];

            function getContext(obj) {
                var strVal = "";

                strVal = "<div>title : " + obj["title"] + "<br/> lat : " + obj["lat"] + "<br/> lng : " + obj["lng"] + "</div>";

                //            return "가나다라마바사아자차카타파하";
                return strVal;
            }
    </script>

    <script src="//code.jquery.com/jquery-1.10.2.js"></script>   
    <script id="mapSC" src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&language=ko&libraries=weather"></script> 
    <script src="GoogleMapCustom2.js"></script>        
<script type="text/javascript">
    var arrSpot = [
    //{ type: "default", option: { viewStyleMap: true, width: 1024, height: 700} }, 
    //{ type: "Map", option: { zoom: 8} }, 
    //{ type: 'defaultPos', option: { lat: default_lat, lng: default_lng} },
    //{ type: 'spot', option: [{ title: '피에르마르꼴리니', lat: '49.504', lng: '3.0711', imagenm: 'http://tourimage.interpark.com//Spot/Front/201012/6342757891211379721.jpg', seq: '77480' },{ title: '맥도날드&맥카페', lat: '49.004', lng: '2.5711', imagenm: 'http://tourimage.interpark.com//Spot/Front/201012/6342751359390908700.jpg', seq: '77480'}]}
    ];
</script>
<script type="text/javascript">

    var default_lat = "37.546210584345204";
    var default_lng = "126.97929382324219";



    $(document).ready(function() {

        initNewMap();

    });

    function initNewMap() {
        var $H3Title1 = $("<br/><br/><br/><br/><h3></h3>");
        $H3Title1.html("※ 일차별 도시 정보");
        $H3Title1.appendTo($("#map"));

        getDayScheduleInfo();

//        var $H3Title2 = $("<h3></h3>");
//        $H3Title2.html(" ※일차별 스팟 정보");
//        $H3Title2.appendTo($("#map"));

//        getDaySpotInfo();
    }

    function getDayScheduleInfo() {
        if (spotInfos.length > 0) {
            var $DivArea = $("<div></div>").addClass("mapArea");
            $DivArea.appendTo($("#map"));

            spotArr = null;
            spotArr = [
            { type: 'defaultPos', option: { lat: default_lat, lng: default_lng} }
            , { type: "map", option: { mapTypeControl: true, scrollwheel: true, panControl: true, scaleControl: true, streetViewControl: true, zoomControl: true} }
            , { type: "marker", option: { iconimageType: "num"} }
            , { type: "spot", option: spotInfosCity }
            , { type: "default", option: { viewStyleMap: false, viewLine: true, viewOneInfoWinOnly: true, viewCurve: true, viewLineSimbol: false, viewLineAnimation: false, isEndClose: true, viewSelectTravelMode: false} }
            , { type: "Curve", option: { strokeColor: "#000000", strokeOpacity: 1.0} }
        ];


            $DivArea.GoogleMapCustom(spotArr);
        }
    }

    function getDaySpotInfo() {
        if (spotInfos.length > 0) {
            var count = 0;

            for (var i = 0; i < spotInfos.length; i++) {
                if (spotInfos[i]["tourSpotList"].length > 0) {
                    var $H3Title = $("<h3></h3>");
                    $H3Title.html(count + ")" + spotInfos[i]["DaySeq"] + "일차");
                    var $DivArea = $("<div></div>").addClass("mapArea");
                    $DivArea.attr("id", "map_" + i);

                    $H3Title.appendTo($("#map"));
                    $DivArea.appendTo($("#map"));

                    var spotArr = null;

                    if (count == 0) {

                        spotArr = [
                        { type: "defaultPos", option: { lat: default_lat, lng: default_lng} }
                        , { type: "spot", option: spotInfos[i]["tourSpotList"] }
                        , { type: "marker", option: { iconimageType: "num"} }
                        , { type: "map", option: { scrollwheel: false, draggable: false, panControl: true, zoomControl: true} }
                        , { type: "default", option: { viewLine: true, viewLineAnimation: false, viewSelectTravelMode: true} }
                    ];
                    }
                    else if (count == 1) {

                        spotArr = [
                        { type: "defaultPos", option: { lat: default_lat, lng: default_lng} }
                        , { type: "spot", option: spotInfos[i]["tourSpotList"] }
                        , { type: "marker", option: { iconimageType: "num"} }
                        , { type: "default", option: { viewLine: true, viewLineAnimation: true, viewSelectTravelMode: true} }
                    ];
                    }
                    else if (count == 2) {

                        spotArr = [
                        { type: "defaultPos", option: { lat: default_lat, lng: default_lng} }
                        , { type: "spot", option: spotInfos[i]["tourSpotList"] }
                        , { type: "marker", option: { iconimageType: "num"} }
                        , { type: "default", option: { viewStyleMap: true, viewLineAnimation: false, viewSelectTravelMode: true, isEndClose: true} }
                    ];
                    }
                    else if (count == 3) {

                        spotArr = [
                        { 
                            type: "defaultPos", option: { lat: default_lat, lng: default_lng} }
                            , { type: "spot", option: spotInfos[i]["tourSpotList"] }
                            , { type: "marker", option: { iconimageType: "num"} }
                            , { type: "default", option: { viewSelectTravelMode: true, viewLineAnimation: true, isEndClose: true} }
                            , { type: "aniline", option: { strokeWeight: 3, strokeOpacity: 1.0, strokeColor: '#8B4513'} }
                        ];
                    }
                    else if (count == 4) {
                    spotArr = [
                            { type: "defaultPos", option: { lat: default_lat, lng: default_lng} }
                            , { type: "spot", option: spotInfos[i]["tourSpotList"] }
                            , { type: "marker", option: { iconimageType: ""} }
                            , { type: "default", option: { viewWeather : true } }
                        ];

                    }
                    else {
                        spotArr = [
                            { type: "defaultPos", option: { lat: default_lat, lng: default_lng} }
                            , { type: "spot", option: spotInfos[i]["tourSpotList"] }
                            , { type: "marker", option: { iconimageType: "num"} }
                            , { type: "aniline", option: { strokeWeight: 3, strokeOpacity: 1.0, strokeColor: '#8B4513'} }
                        ];

                    }

                    //                spotArr = [
                    //                    { type: "default", option: { viewStyleMap: false, width: 980, height: 400,viewLineAnimation : false} }
                    //                    ,{ type : "map", option : { zoom : 13 }}
                    //                    ,{ type : "line", option : { strokeColor : createRandomColor() }}
                    //                    ,{ type : "marker", option : { iconimageType:"num" }}
                    //                    ,{ type:  "defaultPos", option: { lat: default_lat, lng: default_lng} }
                    //                    ,{ type : "spot", option: spotInfos[i]["tourSpotList"]}
                    //                ];

                    $DivArea.GoogleMapCustom(spotArr);

                    count++;
                }
            }
        }
    }

    function createRandomColor() {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    function mapReset() {
        $("#map").html();

        initNewMap();
    }

    function changeGoods() {
        var sample = $("#<%= ddlGoods.ClientID %>").children("option:selected").val();
        var params = new Array();

        if (sample != "") {
            params = sample.split('_');

            window.location.href = "googlemap.aspx?goodscd=" + params[0] + "&trafficSeq=" + params[1];
        }
        else {
            alert("선택된 정보값이 잘못되었습니다.");
        }

    }

</script>
</head>
<body>
    <div><h2>구글맵 테스트</h2></div>
	<!--<div class="box1">
	    상품 : 
	    <select id="ddlGoods" runat="server" onchange="changeGoods();">
	        <option value="13092126060_1">sample 1</option>
	        <option value="12060117905_2">sample 2</option>
	        <option value="12053118955_1">sample 3</option>
	        <option value="12060718638_3">sample 4</option>
	        <option value="15033110019_1">sample 5</option>
	        <option value="15011410157_3">sample 6</option>	  
	    </select>	    
	   
	</div>-->
	<div id="map" class="map-canvas" style="background-color:White;" ></div>	
</body>
</html>
