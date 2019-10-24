document.addEventListener('DOMContentLoaded', function(){ // Аналог $(document).ready(function(){
    var request = new XMLHttpRequest();
    request.open('GET', '/devices.php', true);
    request.onload = function () {

        // Begin accessing JSON data here
        var data = JSON.parse(this.response);
        console.log(data);
        if (request.status == 200) {

            var deviceList;

            data.forEach(device => {
                var date = new Date(device.last_reported_date_time);
                var localDate = new Date(device.last_reported_date_time);

                deviceList +=
                    '<tr>\n' +
                    '   <td>'+ device.device_id +'</td>\n' +
                    '   <td>'+ device.device_label +'</td>\n' +
                    '   <td>'+ date.toLocaleDateString()+ ' ' +date.toLocaleTimeString() +'</td>\n' +
                    '   <td>'+ device.last_reported_date_time +'</td>\n' +
                    '   <td class="text-'+ device.status.toLowerCase() +'">'+ device.status +'</td>\n' +
                    '</tr>';
            });
            $('.device-list').html(deviceList);

        } else {
            const errorMessage = document.createElement('marquee');
            errorMessage.textContent = `Device list not working!`;
            app.appendChild(errorMessage);
        }
    }

    request.send();
});