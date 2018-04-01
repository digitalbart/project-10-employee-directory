
/** get some random users  */
fetch('https://randomuser.me/api?&inc=gender,name,picture,email,location,phone,cell,id,registered,dob&results=12&nat=us')
.then(function(response) {
    return response.json();
})
.then(function(data) {
    //console.log(myJson);
    for (var i = 0; i < 12; i++) {
        var name = data.results[i]['name']['first'] + " " + data.results[i]['name']['last'];
        document.querySelectorAll('.block h2')[i].innerHTML = name;
        document.querySelectorAll('.block img')[i].src = data.results[i]['picture']['medium'];
        document.querySelectorAll('.block a')[i].innerHTML = data.results[i]['email'];
        document.querySelectorAll('.city')[i].innerHTML = data.results[i]['location']['city'];
        document.querySelectorAll('.phone')[i].innerHTML = data.results[i]['phone'];           
        document.querySelectorAll('.address')[i].innerHTML = data.results[i]['location']['street'] + " " + data.results[i]['location']['city'] + ", " + data.results[i]['location']['state'] + " " + data.results[i]['location']['postcode'];
        document.querySelectorAll('.birthday')[i].innerHTML = moment(data.results[i]['dob']).format('MM/DD/YYYY');
    }        
});

document.querySelector('.panel__main').addEventListener('click', function(evt){
    
    evt.preventDefault();
    let parentBlock;
    // determine what was clicked and then 
    if(evt.target && evt.target.nodeName === "H2" ||           
      evt.target && evt.target.nodeName === "P"
      ) {                
        parentBlock = evt.target.parentNode.parentNode;
    }

    if(evt.target && evt.target.nodeName === "A") {      
        parentBlock = evt.target.parentNode.parentNode.parentNode;
    }

    if(evt.target && evt.target.nodeName === "IMG") {      
        parentBlock = evt.target.parentNode;
    }    

    const img = parentBlock.firstElementChild.src;    
    const city = parentBlock.querySelector('.city').innerHTML;
    const name = parentBlock.querySelector('.name').innerHTML;
    const email = parentBlock.querySelector('.email').innerHTML;    
    const phone = parentBlock.querySelector('.phone').innerHTML;    
    const address = parentBlock.querySelector('.address').innerHTML;    
    const birthday = parentBlock.querySelector('.birthday').innerHTML;    

    document.querySelector('.modal .img').src = img;
    document.querySelector('.modal .name').innerHTML = name;
    document.querySelector('.modal .city').innerHTML = city;
    document.querySelector('.modal .email').innerHTML = email;
    document.querySelector('.modal .phone').innerHTML = phone;
    document.querySelector('.modal .address').innerHTML = address;
    document.querySelector('.modal .birthday').innerHTML = birthday;

    document.querySelector('.modal__wrapper').className = "modal__wrapper show";    
});   

document.querySelector('.modal__wrapper').addEventListener('click', function(evt){
    evt.preventDefault();
    this.className = "modal__wrapper";    
});      
