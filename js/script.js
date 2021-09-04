import { data } from "../data.js";


const header = [
    {
        name :"ID",
        nameToMatch : 'id'
    },
    {
        nameToMatch :"first_name",
        name : 'Fist Name'
    },
    {
        nameToMatch :"last_name",
        name : 'Last Name'
    },
    {
        nameToMatch :"email",
        name : 'Email'
    },
    {
        name :"Acción",
        custom : ( row ) =>{
            return `<a class="btn btn-primary" href="#${row.id}"  data-id ="${row.id}" >custom</a>`;
        }
    },
    {
        name :"Borrar",
        custom : ( row ) =>{
            const boton =  document.createElement('button');
            boton.innerText = 'Borrar';
            boton.classList.add('btn','btn-warning');
            boton.addEventListener('click',()=> {
                console.log(row);
            });
            return boton;
        }
    }
]


const table =  new EasyTable({
    data : data,
    headers : header, 
    clases : ['table' , 'table-striped'],
    numRows : 5
});


setTimeout(() => {
    table.upDateData([
        {"id": 2,"first_name": "luis","last_name": "Merill","email": "bmerill1@example.com"},
        { "id": 3, "first_name": "enrique", "last_name": "Lghan", "email": "glghan2@zimbio.com" },
        { "id": 4, "first_name": "jose", "last_name": "Wannan", "email": "wwannan3@topsy.com" }
    ]); 
}, 2000);

document.body.querySelector('.container').append( table.render() );
