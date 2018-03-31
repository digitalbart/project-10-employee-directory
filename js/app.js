

function formatDate(date) {
    var monthNames = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
    ];

    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();

    return day + ' ' + monthNames[monthIndex] + ' ' + year;
}

var new_members = {};
/** get some random users  */
fetch('https://randomuser.me/api?&inc=gender,name,picture,email,location,phone,cell,id,registered&results=9&nat=US')
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    //console.log(myJson);
      for (var i = 0; i < 9; i++) {
        var name = data.results[i]['name']['first'] + " " + data.results[i]['name']['last'];
        
          
            document.querySelectorAll('.block img')[i].src = data.results[i]['picture']['medium'];
            document.querySelectorAll('.block a')[i].innerHTML = data.results[i]['email'];
            document.querySelectorAll('.city')[i].innerHTML = data.results[i]['location']['city'];
            // document.querySelectorAll('.block span')[i].innerHTML = moment(data.results[i]['registered']).format('MM/DD/YYYY');              
         
          //   document.querySelectorAll('.block img')[i].src = data.results[i]['picture']['medium'];
          //   document.querySelectorAll('.block span')[i].innerHTML = name;
          
          // document.querySelectorAll('.account__avatar img')[0].src = data.results[i]['picture']['medium'];  
          // document.querySelectorAll('.account__avatar span')[0].innerHTML = name; 
        // }
        //document.querySelectorAll('.block p')[i].prepend(name + " ");
      }        
  });

  