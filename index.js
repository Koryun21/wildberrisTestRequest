let products;

function generateQueryEndpoint() {
    const searchInputValue = document.querySelector("#search-input").value;
    return {
        url: `https://search.wb.ru/exactmatch/ru/common/v4/search?appType=1&couponsGeo=12,7,3,6,21&curr=rub&dest=12358387,12358395,-10860153,26&emp=0&lang=ru&locale=am&pricemarginCoeff=1&query=${searchInputValue}&reg=0&regions=80,4,69,86,30,40,48,1,66,111&resultset=catalog&sort=popular&spp=0&suppressSpellcheck=false`
    }
}

document.getElementById("search-button").addEventListener('click', async (event) => {
    const searchInputValue = document.querySelector("#search-input").value;
    if (searchInputValue) {

        event.preventDefault();
        const queryUrl = generateQueryEndpoint();

        try {
            const res = await fetch(queryUrl.url);
            const response = await res.json();
            products = response.data.products;
        } catch (err) {
            console.log(err);
            products = []
        }
        showSearchItems();
    } else {
        document.querySelector(".searched-items").innerHTML = "Search Input is empty";
    }
});

function showSearchItems() {

    const brandInputValue = document.querySelector("#brand-input").value;
    document.querySelector(".searched-items").innerHTML = "";

    if (products.length) {
        products.forEach((item, index) => {
            if (item.brand === brandInputValue) {
                productsMarkup = `
                <p class="product-founded">
                  ${index + 1 + ". " + item?.brand}
                </p>
            `;
            } else {
                productsMarkup = `
                <p class="product">
                  ${index + 1 + ". " + item?.brand}
                </p>
            `;
            }
            document.querySelector(".searched-items").innerHTML += productsMarkup;
        });
    } else {
        document.querySelector(".searched-items").innerHTML = "Product not found";
    }
}