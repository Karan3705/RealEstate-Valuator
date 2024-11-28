function getBathValue() {
    var uiBathrooms = document.getElementsByName("uiBathrooms");
    for (var i = 0; i < uiBathrooms.length; i++) {
        if (uiBathrooms[i].checked) {
            return parseInt(uiBathrooms[i].value);
        }
    }
    return -1; // Invalid Value
}

function getBHKValue() {
    var uiBHK = document.getElementsByName("uiBHK");
    for (var i = 0; i < uiBHK.length; i++) {
        if (uiBHK[i].checked) {
            return parseInt(uiBHK[i].value);
        }
    }
    return -1; // Invalid Value
}

function formatPrice(price, sqft) {
    // First check square footage
    if (parseFloat(sqft) < 50) {
        return `<div class="error-message">
            <span class="error-icon">⚠️</span>
            Invalid! Area must be at least 50 sq.ft.
        </div>`;
    }
    
    // Convert price to float to handle decimals
    const priceInLakhs = parseFloat(price);
    
    // Handle negative values
    if (priceInLakhs < 0) {
        return `<div class="error-message">
            <span class="error-icon">⚠️</span>
            Invalid prediction! Please check your inputs.
        </div>`;
    }
    
    // Handle normal cases
    if (priceInLakhs >= 100) {
        const crores = (priceInLakhs / 100).toFixed(2);
        return `₹${crores} Crores`;
    } else {
        const lakhs = priceInLakhs.toFixed(2);
        return `₹${lakhs} Lakhs`;
    }
}

function onClickedEstimatePrice() {
    console.log("Estimate price button clicked");
    var sqft = document.getElementById("uiSqft").value;
    var bhk = getBHKValue();
    var bathrooms = getBathValue();
    var location = document.getElementById("uiLocations");
    var estPrice = document.getElementById("uiEstimatedPrice");

    // Validate input
    if (bhk === -1 || bathrooms === -1 || !location.value) {
        alert("Please select valid inputs for BHK, Bathrooms, and Location.");
        return;
    }

    var url = "http://127.0.0.1:5000/predict_price";

    $.post(url, {
        total_sqft: parseFloat(sqft),
        bhk: bhk,
        bath: bathrooms,
        location: location.value
    })
    .done(function(data) {
        console.log(data);
        const formattedPrice = formatPrice(data.estimated_price, sqft);
        estPrice.innerHTML = "<h2>" + formattedPrice + "</h2>";
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
        console.error("Error: " + textStatus, errorThrown);
        alert("Error fetching estimated price. Please try again.");
    });
}
function onPageLoad() {
    console.log("Document loaded");
    var url = "http://127.0.0.1:5000/get_location_names";
    
    $.get(url)
    .done(function(data) {
        console.log("Got response for get_location_names request");
        if (data) {
            var locations = data.locations;
            var uiLocations = document.getElementById("uiLocations");
            $('#uiLocations').empty();
            for (var i = 0; i < locations.length; i++) {
                var opt = new Option(locations[i]);
                $('#uiLocations').append(opt);
            }
        }
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
        console.error("Error fetching locations: " + textStatus, errorThrown);
        alert("Error fetching locations. Please try again.");
    });
}

window.onload = onPageLoad;
