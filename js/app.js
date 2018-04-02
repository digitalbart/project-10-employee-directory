
/** get some random users  */
fetch('https://randomuser.me/api?&inc=gender,name,picture,email,location,phone,cell,id,registered,dob&results=12&nat=us')
.then(function(response) {
    return response.json();
})
.then(function(data) {
    //console.log(myJson);
    for (var i = 0; i < 12; i++) {
        var name = data.results[i]['name']['first'] + " " + data.results[i]['name']['last'];
        document.querySelectorAll('.block')[i].setAttribute("data-employeenumber", i); 
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
    } else if(evt.target && evt.target.nodeName === "A") {      
        parentBlock = evt.target.parentNode.parentNode.parentNode;
    } else if(evt.target && evt.target.nodeName === "IMG") {      
        parentBlock = evt.target.parentNode;
    } else if (evt.target && evt.target.className=="block__wrapper") {      
        parentBlock = evt.target.children[0];                      
    } else if (evt.target && evt.target.className=="block") {              
        parentBlock = evt.target;              
    }

    // load employee data now in modal
    populateModal(parentBlock);
    
});   

document.querySelector('.next').addEventListener('click', function(evt){
    evt.preventDefault();
    evt.stopPropagation();
    
    var parentId = document.querySelectorAll('.modal')[0].getAttribute("data-parent");
    
    if (parentId < 11) {
        parentId = parseInt(parentId) + 1;    
    } else {
        parentId = 0;    
    }

    locateEmployeeData(parentId);
    
});

document.querySelector('.prev').addEventListener('click', function(evt){
    evt.preventDefault();
    evt.stopPropagation();
    
    var parentId = document.querySelectorAll('.modal')[0].getAttribute("data-parent");

    if (parentId > 0) {
        parentId = parseInt(parentId) - 1;    
    } else {
        parentId = 11;    
    }
    locateEmployeeData(parentId);
});

document.querySelector('.modal__wrapper').addEventListener('click', function(evt){
    evt.preventDefault();
    this.className = "modal__wrapper";    
});    

/**
 * [gatherEmployeeData description]
 * @return {[type]} [description]
 */
function locateEmployeeData(parentId) {
    let getEmployee = document.querySelectorAll('[data-employeenumber="'+parentId+'"]');
    let employee = getEmployee[0];    
    populateModal(employee);
}

/**
 * [getEmployeeData description]
 * @return {[type]} [description]
 */
function populateModal (employee) {

    // get employee data
    const img = employee.firstElementChild.src;    
    const city = employee.querySelector('.city').innerHTML;
    const name = employee.querySelector('.name').innerHTML;
    const email = employee.querySelector('.email').innerHTML;    
    const phone = employee.querySelector('.phone').innerHTML;    
    const address = employee.querySelector('.address').innerHTML;    
    const birthday = employee.querySelector('.birthday').innerHTML;  
    const employeeID = employee.getAttribute('data-employeenumber');  
      
    // update and display employee data 
    document.querySelector('.modal .img').src = img;
    document.querySelector('.modal .name').innerHTML = name;
    document.querySelector('.modal .city').innerHTML = city;
    document.querySelector('.modal .email').innerHTML = email;
    document.querySelector('.modal .phone').innerHTML = phone;
    document.querySelector('.modal .address').innerHTML = address;
    document.querySelector('.modal .birthday').innerHTML = birthday;
    document.querySelector('.modal').setAttribute("data-parent", employeeID);
    document.querySelector('.modal__wrapper').className = "modal__wrapper show";   

}  