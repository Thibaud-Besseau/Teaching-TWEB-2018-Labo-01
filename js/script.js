var xmlHttp = createXMLHttpRequestObject();

function createXMLHttpRequestObject() {
    if (window.ActiveXObject) {
        try {
            xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
        } catch (e) {
            xmlHttp = false;
        }
    } else {
        try {
            xmlHttp = new XMLHttpRequest();
        } catch (e) {
            xmlHttp = false;
        }
    }
    if (!xmlHttp) {
        alert("could not get a response");
    }
    else {
        return xmlHttp;
    }
}

function refresh() {
    if (xmlHttp.readyState == 0 || xmlHttp.readyState == 4) {
        xmlHttp.open('GET', 'https://randomuser.me/api/', true);
        xmlHttp.onreadystatechange = handleServerResponse;
        xmlHttp.send(null);

    } else {
        setTimeout('refresh()', 1000);
    }
}

function handleServerResponse() {

    if (this.readyState == 4 && this.status == 200) {

        var randomUserResult = JSON.parse(xmlHttp.responseText);
        randomUserResult = randomUserResult.results[0];
        var firstName = randomUserResult.name["first"];
        var lastName = randomUserResult.name["last"];
        var username = randomUserResult.login["username"];
        var lgPhoto = "<img src='" + randomUserResult.picture["large"] + "' id='img-user'>";


        var address = '<br> <i class="fa fa-home fa-2x"></i>  ' + randomUserResult.location["street"] + '<br> <br>' +
            '<i class="fa fa-city fa-2x"></i>  ' + transformToTitleCase(randomUserResult.location["city"]) + ' <br><br>' +
            '<i class="fa fa-globe fa-2x"></i>  ' + transformToTitleCase(randomUserResult.location["state"]) + '<br><br>' +
            '<i class="fa fa-phone fa-2x"></i>  ' + randomUserResult.phone;


        //set first letter in upper case
        function transformToTitleCase(word) {
            if (word.charAt(0) != word.charAt(0).toUpperCase()) {
                var firstLetter = (word.charAt(0).toUpperCase());
                return word.replace(word.charAt(0), firstLetter);
            }
        }

        //load data in the html
        $('#img-user-div').html(lgPhoto);
        $('#username').text(username);
        $('#userInfos').text(transformToTitleCase(firstName) + " " + transformToTitleCase(lastName));
        $('#profile-description').html(address);
        $('#gender').text(randomUserResult.gender);
        $('#age').text(randomUserResult.dob["age"]);
        $('#nationality').text(randomUserResult.nat);


    }

}
