var imported = document.createElement('script');
imported.src = 'script.js';
document.head.appendChild(imported);

document.addEventListener('DOMContentLoaded', () => {
    getCatalogo();
})

async function getCatalogo() {
    try {
        const options = {
            headers: new Headers({"authorization-token": getCookie("authorization-token")}),
        }
        await fetch('http://localhost:3000/user/list', options).then(res => {
            return res.json()
        }).then(json => {
            let favs;
            let color;
            let productElements = '';
            let products = json;
            products.forEach((product) => {
                if(product.fav) {
                    favs = `<i class="fa fa-thumbs-down" aria-hidden="true"></i>`
                    color = `rgb(179, 54, 54)`
                }else {
                    favs = `<i class="fa fa-thumbs-up a" aria-hidden="true"></i>`
                    color = ``;
                }
                let productElement = ` <div class="col-md-4 col-sm-6">
                                            <div class="product-grid2">
                                                <div class="product-image"><img class="pic-1" src=${product.path_image} alt="pic-1">
                                                    <ul class="like">
                                                        <li>  
                                                            <a data-tip="Add aos favoritos"onclick='setFavorite(${product.id})' onmouseover="this.style.backgroundColor='${color}'";>
                                                                ${favs}
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div class="product-content">
                                                    <h3 class="title">${product.description}</h3> <span class="price">ID ${product.id}</span>
                                                </div>
                                            </div>
                                        </div>`
                productElements += productElement;
            })
            
            document.getElementById("products").innerHTML = productElements;
        });
    } catch (error) {
        console.log(error)
        alert('Não foi possível acessar nosso catálogo!')
    }
}