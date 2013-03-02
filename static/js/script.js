/* Author: YOUR NAME HERE
*/

$(document).ready(function() {   

  var socket = io.connect();

  $('#sender').bind('click', function() {
   socket.emit('message', 'Message Sent on ' + new Date());     
  });

  socket.on('server_message', function(data){
   $('#receiver').append('<li>' + data + '</li>');  
  });

   $('form input[type="file"]').change(function(){
       //alert(this.files[0]);
       //client console
       console.log(this.files);
       //var blob = this.files[0];
       uploadFiles('/upload', this.files);
   })

    function upload(blobOrFile) {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/upload', true);
        xhr.onload = function(e) { alert('uploaded') };
        xhr.send(blobOrFile);
    }

    function uploadFiles(url, files) {
        var formData = new FormData();

        for (var i = 0, file; file = files[i]; ++i) {
            formData.append(file.name, file);
        }

        var xhr = new XMLHttpRequest();
        xhr.open('POST', url, true);
        xhr.onload = function(e) { alert('uploaded') };
        // Listen to the upload progress.
        var progressBar = $('progress');
        xhr.upload.onprogress = function(e) {
            if (e.lengthComputable) {
                progressBar[0].value = (e.loaded / e.total) * 100;
                progressBar[0].textContent = progressBar[0].value; // Fallback for unsupported browsers.
            }
        };

        xhr.send(formData);  // multipart/form-data
    }

});