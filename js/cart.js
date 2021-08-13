/* Carrito */

function shoppingCart() {

    // Boton "Agregar al carrito" y Productos
    const addToShoppingCart = document.querySelectorAll('.add-to-cart-btn'); // Botón "Agregar al carrito"


    addToShoppingCart.forEach((addToCartButtons) => {
        addToCartButtons.addEventListener('click', addToCartBtnClick)
    });

    function addToCartBtnClick(event) {
        let btn = event.target;
        const songs = btn.closest('.song');

        // Productos
        const songImg = songs.querySelector('.song-img').src;
        const songTitle = songs.querySelector('.song-title').textContent;
        const songPrice = songs.querySelector('.song-price').textContent;


        modalCart(songImg, songTitle, songPrice);

        cartCounterUpdate();

    };


    // Modal cart
    const showCart = document.querySelector('.show-cart');

    function modalCart(songImg, songTitle, songPrice) {

        // Que no se duplique el mismo producto en el Carrito
        let songsTitleRepeat = showCart.getElementsByClassName('shoppingCartsongTitle');

        for (let i = 0; i < songsTitleRepeat.length; i++) {
            if (songsTitleRepeat[i].innerHTML === songTitle) {
                let songsTitleQuantity = songsTitleRepeat[i].parentElement.parentElement.querySelector('.shoppingCartsongQuantity');
                songsTitleQuantity.value++;
                cartTotalPrice();

                return;
            }
        };

        const shoppingCartDiv = document.createElement('div');
        const cartModal =
            ` 
                            <div class="row shoppingCartsong mt-3 text-center">
                                <div class="col-3">
                                    <img src=${songImg} class="imagenesModal"/>
                                    <h6 class="mt-2 shoppingCartsongTitle">${songTitle}</h6>
                                </div> 
                                <div class="col-3">
                                    <p class="song-price shoppingCartsongPrice">${songPrice}</p>
                                </div>
                                <div class="col-3">
                                    <input class="text-center shoppingCartsongQuantity inputCuenta" type="number" value="1">
                                </div>
                                <div class="col-3">
                                    <button class="btn btn-danger" id="remove-song-btn" data-name="${songTitle}">
                                        x
                                    </button>
                                </div>
                            </div>
                        `

        shoppingCartDiv.innerHTML = cartModal;
        showCart.append(shoppingCartDiv);

        // Botón Remove song
        const removeButton = shoppingCartDiv.querySelector('#remove-song-btn');

        removeButton.addEventListener('click', removesongFromCart);

        // Input Quantity
        const inputCartQuantity = shoppingCartDiv.querySelector('.shoppingCartsongQuantity');

        inputCartQuantity.addEventListener('change', cartQuantityChange);


        cartTotalPrice();
    };

    // Cart Counter
    function cartCounterUpdate() {
        const cartsongsLength = document.querySelectorAll('.shoppingCartsong');
        const cartCounter = document.querySelector('#cart-counter');
        cartCounter.innerHTML = cartsongsLength.length;
        cartTotalPrice();
    };


    // Precio total del carrito
    function cartTotalPrice() {
        var totalCount = 0;
        const totalPrice = document.querySelector('.total-price');
        const shoppingCartsongs = document.querySelectorAll('.shoppingCartsong');

        shoppingCartsongs.forEach((shoppingCartsong) => {

            const songCartPriceElement = shoppingCartsong.querySelector('.shoppingCartsongPrice');
            const songCartPrice = Number(songCartPriceElement.textContent.replace('$', ''));

            const songCartQuantityElement = shoppingCartsong.querySelector('.shoppingCartsongQuantity');
            const songCartQuantity = Number(songCartQuantityElement.value);

            totalCount += songCartPrice * songCartQuantity;
        });

        totalPrice.innerHTML = `$${totalCount.toFixed(2)}`;
    };

    //Eliminar songs del carrito
    function removesongFromCart(event) {
        const removeBtnClicked = event.target;
        removeBtnClicked.closest('.shoppingCartsong').remove();
        cartTotalPrice();
        cartCounterUpdate();
    };

    // Cantidad del carrito (Input)
    function cartQuantityChange(event) {
        const inputCartChange = event.target;
        inputCartChange.value <= 0 ? (inputCartChange.value = 1) : null;
        cartTotalPrice();
        cartCounterUpdate();
    };

    //Finalizar compra
    const botonFinalizarCompra = document.querySelector('.btn-finalizar-compra');

    botonFinalizarCompra.addEventListener('click', finalizarCompraTotal);

    function finalizarCompraTotal() {
        showCart.innerHTML = '';
        cartTotalPrice();
        cartCounterUpdate();
    };

    //Vaciar carrito
    const botonVaciarCarrito = document.querySelector('.btn-vaciar-carrito');

    botonVaciarCarrito.addEventListener('click', vaciarCarritoCompleto);

    function vaciarCarritoCompleto() {
        showCart.innerHTML = '';
        cartTotalPrice();
        cartCounterUpdate();
    };
};

shoppingCart();
