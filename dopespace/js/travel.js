// travelling between locations
function travel() {
    fuelTank = $('.fuel p'),// fuel label container
    fuel = parseInt(fuelTank.text()),// current fuel value
    portTitle = $('.location p'),// port label container
    portDescription = $('.stats .dialog p'),// port description container
    nextPort = $(this).attr('id'),// clicked location
    port = map.filter(function (location) {
        // find the corresponsing JS map location obj
        return location.title == nextPort;});

    if (fuel == 0) {
        alert('out of fuel, you\'re stuck!');
    } else if (portTitle.text() === nextPort) {
        alert('already there');
    } else {
        newFuel = fuel -= 1;// subtract fuel
        fuelTank.text(newFuel);// set new fuel
        portTitle.text(port[0].title);// set new currentPort
        portDescription.text(port[0].description);// set new descrip


        $('.map').slideUp();// hide map

        if (newFuel == 1) {// warn pilot if 1 gallon of fuel left
            alert('almost out of fuel, next trip is the last stop!');
        } else {}

        evalLootStock();// check new location's stock levels
    }
}