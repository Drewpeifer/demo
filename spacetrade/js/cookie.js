// use this (eventually) for:

// - saving custom pilot name (linked to stats object)
// - saving session stats
//  - score (for showing high scores)
//  - highest cargo value
//  - highest net worth
//  - highest transaction
//  - number of turns taken
//  - # of system upgrades

// general cookie methods
function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
    console.log('cookification of "' + name + '" : "' + value + '" (' + days + ' day expiration)');
}
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
function eraseCookie(name) {   
    document.cookie = name+'=; Max-Age=-99999999;';

    console.log('cookie erased for "' + name + '"');
}

function eraseAllCookies() {
    document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
}

// for generating session id
// dec2hex :: Integer -> String
function dec2hex (dec) {
  return ('0' + dec.toString(16)).substr(-2)
}

// generateId :: Integer -> String
function generateId (len) {
  var arr = new Uint8Array((len || 40) / 2)
  window.crypto.getRandomValues(arr)
  return Array.from(arr, dec2hex).join('')
}

// creates a new session when user clicks "New Game"
function createSession() {

    newId = generateId(20);
    console.log('createSession id = ' + newId);

    setCookie('sessionId',newId,10);
}

// updates pilot name


// $.cookie(
//     "id", 
//     "value", 
//     { 
//         // The "expires" option defines how many days you want the cookie active. The default value is a session cookie, meaning the cookie will be deleted when the browser window is closed.
//         expires: 7, 
//         // The "path" option setting defines where in your site you want the cookie to be active. The default value is the page the cookie was defined on.
//         path: '/', 
//         // The "domain" option will allow this cookie to be used for a specific domain, including all subdomains (e.g. labs.openviewpartners.com). The default value is the domain of the page where the cookie was created.
//         domain: 'openviewpartners.com', 
//         // The "secure" option will make the cookie only be accessible through a secure connection (like https://)
//         secure: true 
//     }
// );