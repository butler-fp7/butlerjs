How to build a simple SmartMobile/BUTLERjs app
===============================================

This tutorial aims at explaining how to develop of simple web application using the BUTLERjs library along with a BUTLER SmartServer.

## Goal of the app to be developed

We want to develop an application that will display on a map BUTLER devices that are localized (e.g. for which we can obtain coordinates). This app should stand in a single page, with:

* the map on the left side;
* the list of devices of the right side;
* a few options (center, refresh) on top of the devices list. 

A working example can be seen at http://iotmap.iot-butler.eu and the source code is available at: https://github.com/butler-fp7/iot-map.

## Step by step

### App skeleton

BUTLERjs comes with an app skeleton that can be used as a starting point. [See instructions](https://github.com/butler-fp7/butlerjs#app-skeleton) on how to build the skeleton, then:

````
tar xvzf butler-skeleton.tgz
mv butler-skeleton myapp
cd myapp 
````

The server is made available for convinience. Simply start it with `./server.js` and open http://localhost:8000. You will get a simple webpage with a BUTLER template (header, content area and footer). From here, everything can be customized. 

### Files

In order to develop the application, we will need to add third party librairies (OpenLayers for example), custom Javascript, custom CSS styles and additionnal assets (images for markers). Javascript and CSS files and images can be added respectively in `js`, `css` and `images` folders. 

Custom Javascript can be placed in the js/appliction.js file, and custom CSS styles can be placed the the css/application.css file. As indicated at the bottom of the layout (index.html file), those files will be loaded after JS libs and existing CSS. 

### Development

As this point, we can start developing the application. This tutorial won't cover the full application development as most of the work is the regular work to be done when developing web applications (e.g. writing HTML, JS and CSS code).

As a starting point, we will setup content areas:

````
<div class="row map-area">
  <div class="col-sm-8">
    <div id="map"></div>
  </div>
  <div class="col-sm-4 controls">
  <!-- content to be added here -->
  </div>
</div>
````

The div with map as id will hold the map while devices and options will be shown in the .controls div. Worth noting that the map will take 8/12 of the full width (thanks to the `col-sm-8` class made available by Twitter Bootstrap) while devices will take the rest (4/12, `col-sm-4`).

Then, we will need to add additonnal libraries: [OpenLayers](http://openlayers.org/) and [Underscore](http://underscorejs.org/). Once done, we can start writing JS code. The JS Underscore lib is used in that context for its templating feature: devices are retrieved from a BUTLER SmartGateway and then displayed thanks to a JS template (see it in index.html).

The application.js code will be developed as [a module using object literal notation](http://addyosmani.com/resources/essentialjsdesignpatterns/book/#modulepatternjavascript). The loadDevices() function, shown below, will load devices from the BUTLER gateway and render them on the page thanks to the template. The gateway URL is stored in the `devicesURL` variable:

````
loadDevices: function(){
  $.getJSON(this.devicesURL, 
                function(data){
                  iotMap.devices = data;
                  // create template functions
                  var devicesTemplate = _.template($('#devices-data').html());
                  var locationsTemplate = _.template($('#locations-data').html());
                  // render templates with the given data
                  $("#devices").html(devicesTemplate({items: data}));
                  $("#locations").html(locationsTemplate({items: iotMap.locations}));
                  iotMap.getDevicesLocation();            
                  // hanlders are set here instead of the regular document ready block since
                  // devices elements are added after the DOM is ready
                  iotMap.setHandlers();
                  iotMap.hideLoader();
                });
        },
````

The corresponding template is shown below:

````
<script type="text/html" id='devices-data'>
    <% _.each(items,function(item, key, list){ %>
      <div class="device well" id="device-<%= item.asID %>">
      <span class="label label-success device-id"><%= key + 1 %> - <%= item.asID %></span>
      <div class="details">
        <div class="location">
          <ul class="list-unstyled">
            <li class="coordinates">Coordinates: <span class="lat"></span>, <span class="lng"></span></li>
            <li>Height: <span class="height"></span></li>
            <li>TimePosEst: <span class="time-pos-est"></span></li>
          </ul>
        </div>
      </div>
      <button class="btn btn-primary btn-xs center">
        <span class="glyphicon glyphicon-zoom-in"></span>&nbsp;Center on this device
      </button>
      <!--
        <button class="btn btn-primary btn-xs show-details">
          <span class="glyphicon glyphicon-eye-open"></span>&nbsp;Show details
        </button>
      -->
    </div>
    <% }) %>

</script>
````
This code first stores devices in a local variable (`iotMap.devices`) and the outputs content in the #device div. Therefore, the following code needs to be placed in the .controls div:

````
<div id="devices"></div>
````

Next step is to retrieve postion for each device that has been sent back by the gateway in the `loadDevice` call. This can be easily implemented since BUTLERjs provides a method to do that: `Bl.getLocalization()`. So we will wrap this call in a method called `getDevicesLocation()` that will iterate on each devices to get its positioning details. `getDevicesLocation()` takes, [among other parameters](http://endpoints.open-platforms.eu/endpoints/LT7Dslt2gm), the device ID, and a callback fonction that will be called on success. 

````
getDevicesLocation: function(){
  $.each(iotMap.devices, function(index, value) {
      $Bl.getLocalization(value.asID, "abs", "last", function(data) {
          iotMap.displayDeviceLocationAndSaveCoordinates(data, index);
      });
  });
}
````

As indicated in the code above, for each device localized, we call the `iotMap.displayDeviceLocationAndSaveCoordinates()` function that will display the device as a marker on the map.

### Conclusion

This short tutorial explained how to start from stcrach a simple web application that relies on BUTLER components ([SmartGateway](http://open-platforms.eu/library/butler-smart-gateway/), [Localization SmartServer](http://open-platforms.eu/library/butler-localization-manager-smartserver/), [BUTLERjs](http://open-platforms.eu/library/butler-js/).

See it in action here: http://iotmap.iot-butler.eu.
Get the full source code: https://github.com/butler-fp7/iot-map.
