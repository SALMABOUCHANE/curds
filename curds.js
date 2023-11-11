let title = document.getElementById("title");
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');

mood = 'creat'
let tmp;

//TOTALE

function gettotal(){
    if(price.value != ''){
        let resutl = (+price.value + +taxes.value + +ads.value) - +discount.value
        total.innerHTML = resutl
        total.style.background = '#040';
    }else {
        total.innerHTML = '  ';
        total.style.background = 'red';
    }
}

//save data in locale storage

let datatotale;
if (localStorage.product != null) {
    datatotale = JSON.parse(localStorage.product)
} else {
    datatotale = []
}

//create new product

submit.onclick = function(){
    let newpro = {
        title:title.value,
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category: category.value,
    }

    if(mood === 'creat'){
        if (newpro.count > 1) {
            for (let i = 0; i < newpro.count; i++) {
                datatotale.push(newpro)
            }
        } else {
            datatotale.push(newpro)
        }
    }else{
        datatotale[tmp] = newpro;
        mood  = 'creat';
        submit.innerHTML = 'Create';
        count.style.display = 'block '
    }

//save data storaage
    localStorage.setItem('product'  ,           JSON.stringify(datatotale) )
    
    clearData()
    read_Data()

}

//CLEARDATA
function clearData(){
    title.value='';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML='';
    category.value = '';
    count.value = '';
}

//SHOW DATA
function read_Data()
{
    gettotal()
    let table = '';
    for(let i = 0 ; i<datatotale.length ;i++){
        table += `
        <tr>
                <td>${i} </td>
                <td>${datatotale[i].title}</td>
                <td>  ${datatotale[i].price}</td>
                <td>${datatotale[i].taxes}</td>
                <td>${datatotale[i].ads}</td>
                <td>${datatotale[i].discount}</td>
                <td>${datatotale[i].category}</td>
                <td>${datatotale[i].count}</td>
                <td><Button onclick='updata(${i})'  id="update">update</Button></td>
                <td><Button onclick='deleteData(${i})' id="delete">delete</Button></td>
                <td></td>
            </tr>`
    }
    document.getElementById('tbody').innerHTML = table;

    let btndelete = document.getElementById('deleteall');
    if(datatotale.length >0){
        btndelete.innerHTML = `
        <Button onclick='deleteall()'>delete all(${datatotale.length})</Button>    `
    }else{
        btndelete.innerHTML = '  ';
    }
}
read_Data()

//delete data

function deleteData(i){
    datatotale.splice(i,1);
    datatotale.product = JSON.stringify(datatotale);
    read_Data()
}

//deleteall
function deleteall(){
    localStorage.clear()
    datatotale.splice(0)
    read_Data()
}

//updata

function updata(i){
    title.value = datatotale[i].title
    price.value = datatotale[i].price
    taxes.value = datatotale[i].taxes
    discount.value = datatotale[i].discount
    gettotal()
    submit.innerHTML='updata'
    count.style.display='none'
    category.value = datatotale[i].category
    
    mood ='updata'
    tmp = i
    //auto sub
    scroll({
        top:0,
        behavior:'smooth',
    })
}

//search mood 

let searchmood ='title';

function searchmoode(id){
    let search = document.getElementById('search');
    if (id =='Search By Title'){
        searchmood='title';
        search.placeholder = "Search By Title";
    }else{
        searchmood='category';
        search.placeholder = "Search By category";
    }
    search.focus()
    search.value='';
    read_Data()
}

//search data 

function searchdata(value){
    let table = '';
    if (searchmood == 'title'){
        
        for (let i = 0; i < datatotale.length; i++){
            if (datatotale[i].title.toLowerCase().includes(value.toLowerCase())){
                table += `
                    <tr>
                    <td>${i} </td>
                    <td>${datatotale[i].title}</td>
                    <td>  ${datatotale[i].price}</td>
                    <td>${datatotale[i].taxes}</td>
                    <td>${datatotale[i].ads}</td>
                    <td>${datatotale[i].discount}</td>
                    <td>${datatotale[i].category}</td>
                    <td>${datatotale[i].count}</td>
                    <td><Button onclick='updata(${i})'  id="update">update</Button></td>
                    <td><Button onclick='deleteData(${i})' id="delete">delete</Button></td>
                    <td></td>
                    </tr>`
            }
        }



    }else{
        for (let i = 0; i < datatotale.length; i++) {
            if (datatotale[i].category.toLowerCase().includes(value.toLowerCase())) {
                table += `
                    <tr>
                    <td>${i} </td>
                    <td>${datatotale[i].title}</td>
                    <td>  ${datatotale[i].price}</td>
                    <td>${datatotale[i].taxes}</td>
                    <td>${datatotale[i].ads}</td>
                    <td>${datatotale[i].discount}</td>
                    <td>${datatotale[i].category}</td>
                    <td>${datatotale[i].count}</td>
                    <td><Button onclick='updata(${i})'  id="update">update</Button></td>
                    <td><Button onclick='deleteData(${i})' id="delete">delete</Button></td>
                    <td></td>
                    </tr>`
            }
        }

    }
    document.getElementById('tbody').innerHTML = table;
}