//Objeto Song, canciones a vender en la web
class Video {
    constructor(id, title, img, imgback, description, link) {
        this.id = id;
        this.title = title;
        this.img = img;
        this.imgback = imgback;
        this.description = description;
        this.link = link;
    }
}


//Declaro la URL de mi json local y lo llamo para mostrar las cards en la sección de Videos:
let videos = $("#videos")
const URLJSON = "./data/videos.json";

$.get(URLJSON, function (response, state) {
    if (state === 'success') {
        let data = response;

        data.forEach((video) => {
            videos.append(
                `<div class="item">
                        <div class="product">
                          <div class="flip-container">
                            <div class="flipper">
                              <div class="front"><a href="${video.link}"><img src="${video.img}" alt="" class="img-fluid"></a>
                              </div>
                              <div class="back"><a href="${video.link}"><img src="${video.imgback}" alt="" class="img-fluid"></a>
                              </div>
                            </div>
                          </div><a href="${video.link}" class="invisible"><img src="${video.img}" alt="" class="img-fluid"></a>
                          <div class="text">
                            <h3><a href="${video.link}">${video.title}</a></h3>
                            <p class="price">
                              ${video.description}
                            </p>
                          </div>
                      </div>`)
        }); return;

    }
})

$(function () {

    $('#main-slider').owlCarousel({
        items: 1,
        nav: false,
        dots: true,
        autoplay: true,
        autoplayHoverPause: true,
        dotsSpeed: 400
    });

    $('.product-slider').owlCarousel({
        items: 1,
        dots: true,
        nav: false,
        responsive: {
            480: {
                items: 1
            },
            765: {
                items: 2
            },
            991: {
                items: 3
            },
            1200: {
                items: 5
            }
        }
    });

    utils();

});

function utils() {

    /* Eventos con jQuery al hacer click en links externos */

    $('.box.clickable').on('click', function (e) {

        window.location = $(this).find('a').attr('href');
    });

    $('.external').on('click', function (e) {

        e.preventDefault();
        window.open($(this).attr("href"));
    });

}