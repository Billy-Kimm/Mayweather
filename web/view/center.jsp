<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<style>
	header > h2 {
		float : left;
	}
	.container-redborder{
		border: 1px solid red;
	}
	.container-a01{
		position: absolute;
		height: 100%;
		width:100%;
		margin : 0;
		padding: 0;
	}
	.container-ui-row{
		position: absolute;
		padding: 0;
		margin:0;
		bottom: 0px;
    	left: 50%;
    	min-width:315px;
		display:inline-block;
    	-ms-transform: translate(-50%, 0%);
    	transform: translate(-50%, 0%);
	}
	.pac-container{
		z-index: 1040;
	}
	.container-ui-row > button{
		margin:20px;
	}
	#map{
		height: 100%;
		width:100%;
	}
	#map>div:nth-child(1)>{
		height: 100%;
		width:100%;
	}
</style>
<div class="container-redborder container-a01">
			<div id="map"></div>
			<div class="container-ui-row container-redborder">
				<button type="button" class="btn">Basic</button>
				<button type="button" class="btn">Basic</button>
				<button type="button" class="btn">Basic</button>
			</div>
		</div>
<script src="js/mymap.js"></script>

<!-- api key: key=AIzaSyDtIawTgEjsNSk0BE4mVjN3XNG_eb86lwI -->
<script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDtIawTgEjsNSk0BE4mVjN3XNG_eb86lwI&callback=myMap&libraries=places"></script>
<script src="https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/markerclusterer.js"></script>