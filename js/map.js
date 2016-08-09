
var dat = "test"; 

function uploadFile(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file,  false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {	                
                console.log('Uploaded:' + file);	               
            }
        }
    }
    rawFile.send();
    return JSON.parse(rawFile.responseText);
}


function getColor(d)
{
	return d > 1000 ? '#084594' :
           d > 500  ? '#2171b5' :
           d > 200  ? '#4292c6' :
           d > 100  ? '#6baed6' :
           d > 50   ? '#9ecae1' :
           d > 20   ? '#c6dbef' :
           d > 10   ? '#deebf7' :
                      '#f7fbff';
}

function style(feature) {
    return {
        fillColor: getColor(feature.properties[window.dat]),
        weight: 1,
        opacity: 1,
        color: 'white',        
        fillOpacity: 0.6
    };
}


function buttonSelector(topic)
{
	switch(topic)
	{
		case "Immigration":
			text = '<h5>Age at Immigration</h5><input type="radio" name="Immigration" value="healthdat_all_Age at immigration 5 to 14 years"> 5 - 14<br>'
	  		+ '<input type="radio" name="Immigration" value="healthdat_all_Age at immigration 15 to 24 years"> 15 - 24<br>'
	  		+ '<input type="radio" name="Immigration" value="healthdat_all_Age at immigration 25 to 44 years"> 25 - 44<br>'
	  		+ '<input type="radio" name="Immigration" value="healthdat_all_Age at immigration 45 years and over"> 45+';
			return text;
			break;

		case "Transportation":
			text = '<h5>Commuting Method</h5><input type="radio" name="Transportation" value="healthdat_all_Mode of transportation Bicycle"> Bicycle<br>'
	  		+ '<input type="radio" name="Transportation" value="healthdat_all_Mode of transportation Car, truck or van - as a driver"> Drive Automobile<br>'
	  		+ '<input type="radio" name="Transportation" value="healthdat_all_Mode of transportation Car, truck or van - as a passenger"> Ride in Automobile<br>'
	  		+ '<input type="radio" name="Transportation" value="healthdat_all_Mode of transportation Public transit"> Public Transit';
			return text;
			break;

		case "Household Income":
			text = '<h5>Household Income in 2010</h5><input type="radio" name="Household Income" value="healthdat_all_Income of individuals in 2010 $100,000 to $124,999"> $100k to $125k<br>'
	  		+ '<input type="radio" name="Household Income" value="healthdat_all_Income of households in 2010 $125,000 to $149,999"> $125k to $150k<br>'
	  		+ '<input type="radio" name="Household Income" value="healthdat_all_Income of households in 2010 $150,000 and over"> >$150k<br>';	  		
			return text;
			break;

		case "Visible Minorities":
			text = '<h5>Visible Minorities</h5><input type="radio" name="Visible Minorities" value="healthdat_all_Visible minority population Arab"> Arab<br>'
	  		+ '<input type="radio" name="Visible Minorities" value="healthdat_all_Visible minority population Chinese"> Chinese<br>'
	  		+ '<input type="radio" name="Visible Minorities" value="healthdat_all_Visible minority population Filipino"> Filipino<br>'
	  		+ '<input type="radio" name="Visible Minorities" value="healthdat_all_Visible minority population Japanese"> Japanese<br>'
	  		+ '<input type="radio" name="Visible Minorities" value="healthdat_all_Visible minority population Korean"> Korean<br>'
	  		+ '<input type="radio" name="Visible Minorities" value="healthdat_all_Visible minority population Latin American"> Latin American<br>'
	  		+ '<input type="radio" name="Visible Minorities" value="healthdat_all_Visible minority population South Asian"> South Asian<br>'
	  		+ '<input type="radio" name="Visible Minorities" value="healthdat_all_Visible minority population Southeast Asian"> Southeast Asian<br>'
	  		+ '<input type="radio" name="Visible Minorities" value="healthdat_all_Visible minority population West Asian"> West Asian<br>'
	  		+ '<input type="radio" name="Visible Minorities" value="healthdat_all_Visible minority population Not a visible minority"> White<br>'  		
			return text;
			break;			

		default:
			text = '<h5>Coming Soon!</h5>';
			return text;
			break;	
	}

}




