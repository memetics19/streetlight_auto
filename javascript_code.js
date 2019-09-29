api_key = '50b266ac-adab-40b2-8e3f-15f0b30ed38d' /**use new api key ,if it shows wait for 6 hrs */
device_name = 'BOLT1118357 '
pin0 = '0'
pin1 = '1'
pinA0 = 'A0'


lightOnURL = 'http://cloud.boltiot.com/remote/' + api_key + '/digitalWrite?pin=' + pin1 + '&state=HIGH&deviceName=' + device_name
lightOffURL = 'http://cloud.boltiot.com/remote/' + api_key + '/digitalWrite?pin=' + pin1 + '&state=LOW&deviceName=' + device_name
AnalogReadURL = 'http://cloud.boltiot.com/remote/' + api_key + '/analogRead?pin=' + pinA0 + '&deviceName=' + device_name
getDeviceStatusURL = 'http://cloud.boltiot.com/remote/'+ api_key+'/isAlive?&deviceName='+device_name



/**Turning Light OFF AND ON */
function onLight() {
    fetch(lightOnURL).then(function (response) {
            return response.json();
        }).then(function (myJson) {
            console.log(JSON.stringify(myJson));
    });

}
function offLight() {
    fetch(lightOffURL).then(function (response) {
            return response.json();
        }).then(function (myJson) {
            console.log(JSON.stringify(myJson));
    });
}




/** Below functions are reading luminous intensity and show  */
var readLum
function startReading(){
// call readLuminous every 5sec ... 
    readLum = setInterval(function() {
        readLuminos()
      }, 5000);  
}

function stopReading() {
    clearTimeout(readLum);
}

// Reads luminus at once only when called and set status_tag
async function readLuminos() {
    var x
    document.getElementById("status_tag").innerHTML = 'LOADING ....'
    await fetch(AnalogReadURL).then(function (response) {
        return response.json();
    }).then(function (myJson) {
        console.log(JSON.stringify(myJson.value));
        x=myJson.value
    })
    
    if (parseInt(x)<=50) {
        onLight()
    }else{
        offLight()
    }
    document.getElementById("status_tag").innerHTML = 'The Present Luminous : '+x
}




/**Getting Device Status ALIVE or DEAD */
function getDeviceStatus() {
    document.getElementById("device_info_tag").innerHTML = 'Device Status INFO : Reloading Status'
    fetch(getDeviceStatusURL).then(function (response) {
            return response.json();
        }).then(function (myJson) {
            document.getElementById("device_info_tag").innerHTML = 'Device Status INFO :  '+myJson.value
    });

}


/**Defalut, on page load this will called automatically and it will fetch device info or status */
fetch(getDeviceStatusURL).then(function (response) {
    return response.json();
}).then(function (myJson) {
    document.getElementById("device_info_tag").innerHTML = 'Device Status INFO :  '+myJson.value
});