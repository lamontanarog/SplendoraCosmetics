const carrito = [];
let totalCarrito;
let contenedor = document.getElementById("lista-productos");

function preguntarPais() {
    if (localStorage.key("pais")) {
        document.getElementById("pais").innerHTML +=
        `
        <p>${localStorage.getItem("pais")}</P>
        `
    }

    else{
    let traerPais = prompt("Ingrese su pais");
    localStorage.setItem("pais",traerPais);
    document.getElementById("pais").innerHTML +=
    `
    <p>${localStorage.getItem("pais")}</P>
    `
    }
}
preguntarPais();

function mostrarProductos() {
    for (const producto of productos) {
        contenedor.innerHTML += `
        
        <div class="card col-sm-5" justify-content-center>
                <img src=${producto.imagen} class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${producto.id}</h5>
                <p class="card-text">${producto.nombre}</p>
                <p class="card-text">${producto.marca}</p>
                <p class="card-text">$ ${producto.precio}</p>
            <button id="btn${producto.id}" 
            class="btn btn-outline-danger">agregar al carrito</button>
            </div>
        </div>
        `;
    }
    productos.forEach(producto => {
        document.getElementById(`btn${producto.id}`).addEventListener("click",function(){
            agregarAlCarrito(producto);
        });
    })
}

mostrarProductos();

function agregarAlCarrito(ProdAComprar){
    carrito.push(ProdAComprar);
    console.table(carrito)
    alert("Producto: " +ProdAComprar.nombre+ " Agregado al carrito");
    document.getElementById("tabla-body").innerHTML +=  `
    <tr> 
      <td>${ProdAComprar.id}</td>
      <td>${ProdAComprar.nombre}</td>
      <td>${ProdAComprar.marca}</td>
      <td>${ProdAComprar.precio}</td>
    </tr>`;
    totalCarrito = carrito.reduce((acumulador,producto)=> acumulador + producto.precio,0);
    let infoTotal = document.getElementById("total-carrito");
    infoTotal.innerText="Total a pagar:  $"+totalCarrito;

}

