let productosJSON= [];
let totalCarrito;
let dolarCompra;
let contenedor = document.getElementById("lista-productos");
let carrito =  [];
obtenerDolar();


async function preguntarPais() {
    if (localStorage.key("pais")) {
        document.getElementById("pais").innerHTML +=
        `
        <p>${localStorage.getItem("pais")}</P>
        `
    }
    else{
    const {value : pais} = await Swal.fire({
        title: 'Ingresa tu pais',
        icon: 'question',
        input: 'text',
        confirmButtonText: 'Cool'
    });
    localStorage.setItem("pais",pais);
    document.getElementById("pais").innerHTML +=
    `
    <p>${localStorage.getItem("pais")}</P>
    `
    }
}
preguntarPais();

function mostrarProductos() {
    for (const producto of productosJSON) {
        contenedor.innerHTML += `
        <div class="card col-sm-5" justify-content-center>
                <img src=${producto.imagen} class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${producto.id}</h5>
                <p class="card-text">${producto.nombre}</p>
                <p class="card-text">${producto.marca}</p>
                <p class="card-text">$ ${producto.precio*dolarCompra}</p>
            <button id="btn${producto.id}" 
            class="btn btn-outline-danger">agregar al carrito</button>
            </div>
        </div>
        `;
        
    }
    productosJSON.forEach(producto => {
        document.getElementById(`btn${producto.id}`).addEventListener("click",function(){
            agregarAlCarrito(producto);
        });
    })
}
function obtenerDolar(){
    const URLDOLAR="https://api.bluelytics.com.ar/v2/latest";
    fetch(URLDOLAR)
        .then( respuesta => respuesta.json())
        .then( cotizaciones => {
            const dolarBlue = cotizaciones.blue;
            dolarCompra=dolarBlue.value_buy;
            obtenerJSON();
        })
}
async function obtenerJSON() {
    const producc="productos.json";
    const resp = await fetch(producc);
    const data = await resp.json();
    productosJSON = data;
    mostrarProductos();
}

function agregarAlCarrito(ProdAComprar){
    carrito.push(ProdAComprar);
    Swal.fire({
        text: "Producto: " +ProdAComprar.nombre+ " Agregado al carrito",
        icon: 'success'
    });
    document.getElementById("tabla-body").innerHTML +=  `
    <tr> 
      <td>${ProdAComprar.id}</td>
      <td>${ProdAComprar.nombre}</td>
      <td>${ProdAComprar.marca}</td>
      <td>${ProdAComprar.precio*dolarCompra}</td>
      <td><button class="btn btn-outline-danger" onclick="eliminar(event)">🚮</button></td>
    </tr>`;
    totalCarrito = carrito.reduce((acumulador,producto)=> acumulador + producto.precio*dolarCompra,0);
    let infoTotal = document.getElementById("total-carrito");
    infoTotal.innerText="Total a pagar:  $"+totalCarrito;
    
    
}

function finalizarCompra(){
    Swal.fire({
        title : 'Desea finalizar la compra?'

    })
}

function eliminar(ev){
    let fila = ev.target.parentElement.parentElement;
    let id = fila.children[0].innerText;
    let indice = carrito.findIndex(producto => producto.id == id);
    carrito.splice(indice,1);
    fila.remove();
    totalCarrito = carrito.reduce((acumulador,producto)=> acumulador + producto.precio*dolarCompra,0);
    let infoTotal = document.getElementById("total-carrito");
    infoTotal.innerText="Total a pagar:  $"+totalCarrito;
}
