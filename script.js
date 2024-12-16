const imagesList = [
    { src: '/Images/purple.png', alt: 'Purple' },
    { src: '/Images/cyan.png', alt: 'Cyan' },
    { src: '/Images/blue.png', alt: 'Blue' },
    { src: '/Images/black.png', alt: 'Black' },
];

const priceList = [
    { id: 1, price: '69', size: 'S' },
    { id: 2, price: '79', size: 'M' },
    { id: 3, price: '89', size: 'L' },
    { id: 4, price: '99', size: 'XL' },
];

const initialFunction = () => {
    const allItems = document.getElementsByClassName('price-btn');

    priceList.forEach((item, index) => {
        const newDiv = document.createElement('div');
        newDiv.innerHTML = `
            <input
                type="radio"
                name="example"
                id="option${index + 1}"
                onclick="setPrice(${index})"
            />
            <label for="option${index + 1}">
                <span id="size">${item.size}</span>
                <span id="price-amount">$${item.price}</span>
            </label>
        `;

        Array.from(allItems).forEach(el => el.appendChild(newDiv));
    });
};

initialFunction();

const productList = [];

let val = Number(document.getElementById('quantity').value);
let image = document.getElementById('watch-image').src;
let title = document.getElementById('header-title').innerHTML;
let size = priceList[3].size;
let price = priceList[3].price;
let color = imagesList[3].alt;
let quantity = 1;

const add = () => {
    val += 1;
    document.getElementById('quantity').value = val;
    quantity = val;
};

const minus = () => {
    if (val != 1) val -= 1;
    document.getElementById('quantity').value = val;
    quantity = val;
};

const clickColor = value => {
    imagesList.forEach((item, index) => {
        if (index + 1 === value) {
            document.getElementById('watch-image').src = item.src;
            color = item.alt;
            image = item.src;
        }
    });
};

const setPrice = value => {
    priceList.forEach((item, index) => {
        if (index === value) {
            document.getElementById(
                'changeable-price',
            ).innerHTML = `$${item.price}`;
            price = priceList[value].price;
            size = priceList[value].size;
        }
    });
};
const displayItem = () => {
    const allItems = document.getElementById('allItems');
    allItems.innerHTML = '';
    let totalAmount = 0,
        totalCount = 0;

    productList.forEach(item => {
        const div = document.createElement('div');
        div.className = 'item-description';
        div.innerHTML = `
			<div style="width: 278px">
				<img
					src="${item.image}" 
					alt="${item.title}" 
					style="height: 42px; width: 37px"
				/>
				<span id="title-name">${item.title}</span>
			</div>
			<div class="middle-item">
				<ul style="width: 62px; text-align: center">${item.color}</ul>
				<ul style="width: 69px; text-align: center; font-weight: 700">${item.size}</ul>
				<ul style="width: 59px; text-align: center; font-weight: 700">${
                    item.quantity
                }</ul>
			</div>
			<div style="width: 91px; text-align: end; font-weight: 700">$${
                item.price * item.quantity
            }.00</div>
    	`;
        allItems.appendChild(div);

        totalAmount = totalAmount + item.price * item.quantity;
        totalCount = totalCount + item.quantity;
        document.getElementById('total-count').innerHTML = totalCount;
        document.getElementById(
            'total-amount',
        ).innerHTML = `$${totalAmount}.00`;
    });
};

function addUniqueProduct(product) {
    const exists = productList.some(
        item =>
            item.title === product.title &&
            item.size === product.size &&
            item.color === product.color,
    );

    if (!exists) {
        productList.push(product);
    }
    displayItem();
}

const addToCart = () => {
    addUniqueProduct({
        title: title,
        size: size,
        price: price,
        color: color,
        quantity: quantity,
        image: image,
    });
    document.getElementById('checkoutCount').innerHTML = productList.length;
};
