BUTLER.configuration.init({username: "fabrice", password: "fabrice", useProxy: false});


function start() {

    $Bs.sendResourceRequest({resource: "http://philippechalet.gemalto.iot-butler.eu/ResourceProvider/temperature",
                                                                             parameters: "p=8&a=9",
                                                                             //requestIdentifier: "1234"
                                                                             success: function(data) {
                                                                                 $Bh.log("Test #1: successfull call to the gateway! Result: " + data);
                                                                                 t = JSON.parse(data).degrees;
                                                                                 $("#temperature").append(t);
                                                                             }, 
                                                                             error: function(data) {
                                                                                 $Bh.log("Test #1: request to the gateway failed");
                                                                             }
                                                                            });

}

$("#go").click(function() {
    $("#temperature").html("<i></i>");
    $Bh.clearLogs();
    start();
});


$Bh.log("End of application.js reached...");