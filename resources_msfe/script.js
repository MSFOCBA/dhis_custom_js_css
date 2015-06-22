/**
 * CUSTOM JAVASCRIPT FILE FOR MSF OCBA HMIS
 * 
 * This file contains information and additional functions to customise the 
 * behaviour of DHIS2.
 * 
 * - Functions related to data entry
 *  1. Tally Sheet
 *  2. Service consulted
 */


if(window.location.href.indexOf("dhis-web-dataentry") > 0){
    
    /**
	* 1. TALLY SHEET CUSTOMIZATION
	* 
	* This section includes all the functions needed to print the tally sheets:
	* 
	* - Print all sections, and not just the current one
	* - Include the name for each section
	* - Include the name of the dataset
	* - Hide the "complete/validate" buttons
	* - Expand grid to fit the whole width
	* - Print dataelements in different sizes: largeSize, mediumSize and default.
	*   If you want to print a dataelement in large or mediumSize, you must add it
	*   to the "largeSize" or "mediumSize" variables (array).
	*/

	// Definition of the size of the DataElements
	var largeSize = [
	"t3UlUiLTHef", 		// Malaria Treated
	"mNSRvMreyNN",		// Malaria Severe
	"maJgeYlQ7dK",		// Nr Survivors
	"AFhfSzRfggy",		// SurvMalaria: Total Consultations
	"sRBwIgR9W86",		// Total patients hospitalized
	"GI1B53xPopC",		// Surgical Site Infection
	"DF1qGplFwhr",		// Sepsis (postsurgical)
	"RbGydO4upgH", 		// New Consultations
	"OOB9wKVI4Cj"		// Follow-up Consultations
	];

	var mediumSize = [
	"X7hThb0DgnA",		// SurvMalaria: Malaria admitted
	"Fjj0Yd9VDzn",		// SurvMalaria: Total exits
	"AgDO5ReRJm7",		// SurvMalaria: Malaria exits
	"pBlUHcxv07F",		// SurvMalaria: Total deaths among admitted
	"kzcf51z0wdP",		// SurvMalaria: Malaria deaths among admitted
	"UMLbBX9571f",		// Acute non-bloody diarrhoea
	"nyF9ahBuIt3",		// Acute bloody diarrhoea
	"icjTqNJD5VR",		// Lower Respiratory Tract Infection
	"Hgj9xSpgm4w",		// Acute Upper Respiratory Tract Infection
	"wI2hkgPNJD3",		// Malaria Non-Severe
	"Yu8H4yFFzHb",		// Intestinal Parasitosis
	"emwwyKvFOIE",		// Skin diseases
	"zWtSzBe6lzQ",		// Conjuntivitis
	"oJWEM6Vz75L"		// Fevers of Unknown Origin (FUO)
	];
	
	// Creation of a "Tally Sheet" button, and hide the other buttons except validation
	$( document ).ready(function() {
	    $("#actions").find("input:not(#validationButton), br").hide();
		$("#validationButton").after("<input type='button' value='Tally Sheet' onclick='printTallySheet()' " + 
		    "id='printTallySheet' style='width:120px; margin-bottom: 3px;'>");
		$("#validationButton").after("<br>");
		
		// Remove complete/incomplete/validate box
		$("div#completenessDiv").remove();
	});

	// When form is ready, add certain information needed for print the tally sheet
	dhis2.util.on( 'dhis2.de.event.formLoaded', function( event, ds ) {
		
		// Add custom header
		$("div#contentDiv").prepend("<h1 class='msfocba-show-on-print' style='display:none'>" + 
		    $("#selectedDataSetId option:selected").html() + "</h1>")
		
		// Add hidden headers for each section
		$("div#tabs > div").each( function() {
			var sectionName = $("li[aria-controls='" + $(this).attr('id') + "'] > a").html();
			$(this).before("<h2 class='ui-widget-header msfocba-show-on-print' style='display:none'>" + sectionName + "</h2>");
		});
		
		// Assign classes to dataelements according to their size at printing
		for(var i = 0; i < largeSize.length; i++){
			$("input[id^='" + largeSize[i] + "']").addClass("msfocba-large-size");
		}
		for(var i = 0; i < mediumSize.length; i++){
			$("input[id^='" + mediumSize[i] + "']").addClass("msfocba-medium-size");
		}
	});

	// Function that prints the Tally Sheet
	function printTallySheet() {
		var currentTab = $(".ui-tabs-panel:visible");
		var currentTitle = document.title;
		document.title = $("#selectedDataSetId option:selected").html();
		$(".ui-tabs-panel").show();
		$(".msfocba-show-on-print").show();
		$("div#tabs > ul > li").hide();
		
		window.print();
		
		$("div#tabs > ul > li").show();
		$(".msfocba-show-on-print").hide();
		$(".ui-tabs-panel").hide();
		document.title = currentTitle;
		currentTab.show();
	}
	
	

	/**
	** 2. SERVICE CONSULTED CUSTOMIZATION
	* 
	* This sections allows to automatically assign an option of "Service Consulted"
	* to a dataset. For that, you must a relation between the option and the dataset 
	* by using the variable mapping.
	* 
	* The syntax is:
	* mapping["dataset UID"] = "option UID";
	* for example:
	* mapping["H6n4QTrjxET"] = "f2rsvDqWqWo";
	*/
	
	var mapping = {};
	//{"id":"JTMHi8Hqsud","name":"HIV/TB program"},
	//{"id":"S0Z7WGNzQxy","name":"IPD/gyne/obs"},
	//{"id":"q6vcBmBKVda","name":"Nutrition programs"},
	//{"id":"f2rsvDqWqWo","name":"OPD/Antenatal/Postnatal"},
	//{"id":"bvyir7eKPLs","name":"Other service"}

	//{"name":"Diagnostic Tests 1","id":"D2Aixkqtstf"},
	//{"name":"Diagnostic Tests 2","id":"WAObrOBew4F"},
	//{"name":"Diagnostic Tests 3","id":"PkChwAPKQeI"},
	
	//{"name":"Diagnostic Tests ER 1","id":"fs02WhjQoGc"},
	mapping["fs02WhjQoGc"] = "f2rsvDqWqWo";
	//{"name":"Diagnostic Tests ER 2","id":"wCFMfGISDhq"},
	mapping["wCFMfGISDhq"] = "f2rsvDqWqWo";
	//{"name":"Diagnostic Tests ER 3","id":"dciqZBGXjMo"},
	mapping["dciqZBGXjMo"] = "f2rsvDqWqWo";
	
	//{"name":"Diagnostic Tests Ext. Consultations - Monthly 1","id":"H6n4QTrjxET"},
	mapping["H6n4QTrjxET"] = "f2rsvDqWqWo";
	//{"name":"Diagnostic Tests Ext. Consultations - Monthly 2","id":"u8Tkckan1oS"},
	mapping["u8Tkckan1oS"] = "f2rsvDqWqWo";
	//{"name":"Diagnostic Tests Ext. Consultations - Monthly 3","id":"nS7soj59ZNh"},
	mapping["nS7soj59ZNh"] = "f2rsvDqWqWo";
	//{"name":"Diagnostic Tests Ext. Consultations - Weekly 1","id":"fRfnWv049YZ"},
	mapping["fRfnWv049YZ"] = "f2rsvDqWqWo";
	//{"name":"Diagnostic Tests Ext. Consultations - Weekly 2","id":"JpXsjhg9gHc"},
	mapping["JpXsjhg9gHc"] = "f2rsvDqWqWo";
	//{"name":"Diagnostic Tests Ext. Consultations - Weekly 3","id":"V4lTT6PyfuN"},
	mapping["V4lTT6PyfuN"] = "f2rsvDqWqWo";
	
	//{"name":"Diagnostic Tests Gender Based Violence 1","id":"hVG9s9k2l7m"},
	mapping["hVG9s9k2l7m"] = "bvyir7eKPLs";
	//{"name":"Diagnostic Tests Gender Based Violence 2","id":"M81Rrwp21I0"},
	mapping["M81Rrwp21I0"] = "bvyir7eKPLs";
	//{"name":"Diagnostic Tests Gender Based Violence 3","id":"SqG0JkyKCZd"},
	mapping["SqG0JkyKCZd"] = "bvyir7eKPLs";

	//{"name":"Diagnostic Tests Hospital Ward - Monthly 1","id":"y2P9Vg1KXhx"},
	mapping["y2P9Vg1KXhx"] = "S0Z7WGNzQxy";
	//{"name":"Diagnostic Tests Hospital Ward - Monthly 2","id":"xxhpYmHBHPH"},
	mapping["xxhpYmHBHPH"] = "S0Z7WGNzQxy";
	//{"name":"Diagnostic Tests Hospital Ward - Monthly 3","id":"xQUixiHVsJE"},
	mapping["xQUixiHVsJE"] = "S0Z7WGNzQxy";
	//{"name":"Diagnostic Tests Hospital Ward - Weekly 1","id":"r6MtkX8nJhu"},
	mapping["r6MtkX8nJhu"] = "S0Z7WGNzQxy";
	//{"name":"Diagnostic Tests Hospital Ward - Weekly 2","id":"bUiEwTBZ9jG"},
	mapping["bUiEwTBZ9jG"] = "S0Z7WGNzQxy";
	//{"name":"Diagnostic Tests Hospital Ward - Weekly 3","id":"Bvau6sHJ5Xv"},
	mapping["Bvau6sHJ5Xv"] = "S0Z7WGNzQxy";
	
	//{"name":"Diagnostic Tests OR 1","id":"Aq82GGbDN1b"},
	mapping["Aq82GGbDN1b"] = "bvyir7eKPLs";
	//{"name":"Diagnostic Tests OR 2","id":"JnPklvpyN4s"},
	mapping["JnPklvpyN4s"] = "bvyir7eKPLs";
	//{"name":"Diagnostic Tests OR 3","id":"BwDQ0pQ2SCF"},
	mapping["BwDQ0pQ2SCF"] = "bvyir7eKPLs";
	
	//{"name":"Diagnostic Tests SRH - Monthly 1","id":"CJfCZxFOJj1"},
	//{"name":"Diagnostic Tests SRH - Monthly 2","id":"haTeEwQw7KH"},
	//{"name":"Diagnostic Tests SRH - Monthly 3","id":"T7RQ00O1Ekv"},
	//{"name":"Diagnostic Tests SRH - Weekly 1","id":"b2pz8NyERUX"},
	//{"name":"Diagnostic Tests SRH - Weekly 2","id":"u6nevrs41Db"},
	//{"name":"Diagnostic Tests SRH - Weekly 3","id":"jMC4icqEO6F"},
	
	//{"name":"Vaccination Gender Based Violence 1","id":"addtfSd0dF9"},
	mapping["addtfSd0dF9"] = "f2rsvDqWqWo";
	//{"name":"Vaccination Gender Based Violence 2","id":"GyR3LiE3T19"},
	mapping["GyR3LiE3T19"] = "f2rsvDqWqWo";
	//{"name":"Vaccination Gender Based Violence 3","id":"Pzi8g8B4T2x"},
	mapping["Pzi8g8B4T2x"] = "f2rsvDqWqWo";
	
	//{"name":"Vaccination Nutrition 2","id":"yEBeyixhtxu"},
	mapping["yEBeyixhtxu"] = "q6vcBmBKVda";
	//{"name":"Vaccination Nutrition 3","id":"SheltWjUUSb"},
	mapping["SheltWjUUSb"] = "q6vcBmBKVda";
	
	//{"name":"Vaccination Rabies 3","id":"TIFG9TwI26h"},
	mapping["TIFG9TwI26h"] = "f2rsvDqWqWo";
	
	//{"name":"Vaccination Routine 1","id":"W4I1onxUnYE"},
	//{"name":"Vaccination Routine 2","id":"OssR2l5hHpZ"},
	//{"name":"Vaccination Routine 3","id":"Go6aHSCapDM"},
	
	//{"name":"Vaccination Wounded 2","id":"x5FG4l23Jvm"},
	mapping["x5FG4l23Jvm"] = "f2rsvDqWqWo";
	//{"name":"Vaccination Wounded 3","id":"K64SLfCSXTG"}
	mapping["K64SLfCSXTG"] = "f2rsvDqWqWo";


	dhis2.util.on( 'dhis2.ou.event.orgUnitSelected', function( ) {

		var updateServiceConsulted = function(){
			var service_consulted = mapping[$("#selectedDataSetId").val()];
			if (typeof service_consulted !== 'undefined'){
				$("#attributeComboDiv").find("select").val(service_consulted).change();
				$("#attributeComboDiv").find("select :not(:selected)").remove();
			}
		}
		
		$("#selectedDataSetId").on("change", updateServiceConsulted);
		$("#selectedPeriodId").on("change", updateServiceConsulted);
		
	} );
}