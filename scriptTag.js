const header = document.getElementsByClassName('header__icons')[0]
const body = document.getElementsByTagName('body')[0]


// Wishlist Modal


const divCreated = document.createElement('button')
divCreated.classList.add('whislist-button')
divCreated.id = 'wh-open-modal'
divCreated.innerHTML = `
  <svg fill="#000000" height="20px" width="20px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
       viewBox="0 0 471.701 471.701" xml:space="preserve">
    <g>
      <path d="M433.601,67.001c-24.7-24.7-57.4-38.2-92.3-38.2s-67.7,13.6-92.4,38.3l-12.9,12.9l-13.1-13.1
          c-24.7-24.7-57.6-38.4-92.5-38.4c-34.8,0-67.6,13.6-92.2,38.2c-24.7,24.7-38.3,57.5-38.2,92.4c0,34.9,13.7,67.6,38.4,92.3
          l187.8,187.8c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-3.9l188.2-187.5c24.7-24.7,38.3-57.5,38.3-92.4
          C471.801,124.501,458.301,91.701,433.601,67.001z M414.401,232.701l-178.7,178l-178.3-178.3c-19.6-19.6-30.4-45.6-30.4-73.3
          s10.7-53.7,30.3-73.2c19.5-19.5,45.5-30.3,73.1-30.3c27.7,0,53.8,10.8,73.4,30.4l22.6,22.6c5.3,5.3,13.8,5.3,19.1,0l22.4-22.4
          c19.6-19.6,45.7-30.4,73.3-30.4c27.6,0,53.6,10.8,73.2,30.3c19.6,19.6,30.3,45.6,30.3,73.3
          C444.801,187.101,434.001,213.101,414.401,232.701z"/>
    </g>
  </svg>
`
header.prepend(divCreated)
const products = [
  {
    title: 'product1',
    id: '1as23354s',
    price: '24,99$',
    img: 'https://cdn.shopify.com/s/files/1/0700/0761/9897/files/51k0g2CsfuL._AC_SX679.jpg?v=1673387919',
    description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia corporis ullam dolor eos iusto, fugit voluptas ad vel recusandae quod repellat, officiis necessitatibus sit nulla rem quibusdam aperiam et quidem?'
  },
  {
    title: 'product2',
    id: '2iuf8732f',
    price: '24,99$',
    img: 'https://cdn.shopify.com/s/files/1/0700/0761/9897/files/51k0g2CsfuL._AC_SX679.jpg?v=1673387919',
    description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia corporis ullam dolor eos iusto, fugit voluptas ad vel recusandae quod repellat, officiis necessitatibus sit nulla rem quibusdam aperiam et quidem?'
  },
  {
    title: 'product3',
    id: '367uytwe2',
    price: '24,99$',
    img: 'https://cdn.shopify.com/s/files/1/0700/0761/9897/files/51k0g2CsfuL._AC_SX679.jpg?v=1673387919',
    description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia corporis ullam dolor eos iusto, fugit voluptas ad vel recusandae quod repellat, officiis necessitatibus sit nulla rem quibusdam aperiam et quidem?'
  },
  {
    title: 'product4',
    id: '47df787zy',
    price: '24,99$',
    img: 'https://cdn.shopify.com/s/files/1/0700/0761/9897/files/51k0g2CsfuL._AC_SX679.jpg?v=1673387919',
    description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia corporis ullam dolor eos iusto, fugit voluptas ad vel recusandae quod repellat, officiis necessitatibus sit nulla rem quibusdam aperiam et quidem?'
  }
  
]

function loop() {
  let string = "";
  for (const product of products) {
    string += `
    <div class="wh-card">
      <div class="wh-image-container">
        <img src="${product.img}" alt="">
      </div>
      <div class="wh-title-container">
        <h3>${product.title}</h3>
        <div class="wh-info-container">
          <input type="hidden" value="${product.id}">
          <span>${product.price}</span>
          <div>
            <button>Add To Cart</button>
            <button>Remove</button>
          </div>
        </div>
      </div>
      <div class="wh-body-container">
        <p>
          ${product.description}
        </p>

      </div>
    </div>
    `
  }
  return string
}

let login = false

const wh_modal_created = document.createElement('div')
wh_modal_created.classList.add('wishlist-app-modal')
wh_modal_created.id = 'wishlist-modal'
login_HTML = `
  <div id="login-container" class="wishlist-container active-conts">
    <h2 style="margin: 0px;">Wishlist</h2>
    <div class="wishlist-span-container">
      <span>You are not logged, please log in to save products in your wishlist</span>
    </div>
    <div class="wishlist-login-container">
      <div id="whislist-login-inputs" class="whislist-inputs">
        <form action="">
          <input
            type="text"
            name="email"
            placeholder="Email">
          <input type="hidden" name="action">
          <button>Log In</button>
        </form>
      </div>
      <div class="whislist-other-action">
        <span>
          You're not registered yet? Register
          <a
            class="change-link"
            id="register-link"
            href="#">here</a>
          only with your email.
        </span>
      </div>
    </div>
  </div>

  <div id="register-container" class="wishlist-container ">
    
  <h2 style="margin: 0px;">Wishlist</h2>
  <div class="wishlist-span-container">
    <span>You are not registered, please register to save products in your wishlist</span>
  </div>
  <div class="wishlist-login-container">
    <div id="whislist-register-inputs" class="whislist-inputs">
      <form action="">
        <input type="text" name="email" placeholder="Email">
        <input type="hidden" name="action">
        <button>Register</button>
      </form>
    </div>
    <div class="whislist-other-action">
      <span>
        You're already registred? Log In <a class="change-link" id="login-link" href="#">here</a> only with your email.
      </span>
    </div>
  </div>
`
logged_HTML = `
<div id="login-container" class="wishlist-container active-conts">
  <div class="wishlist-login-container">  
    <div class="whislist-inputs">
      <h2 style="margin: 0px;">
        Hello, this is the
        <small>reforce@mail.com</small>
        wishlist.
      </h2>
      <div class="whislist-card-container">
        ${loop()}
      </div>
    </div>
  </div>
</div>
`
wh_modal_created.innerHTML = " "
if (login) {
  wh_modal_created.innerHTML = logged_HTML
} else {
  wh_modal_created.innerHTML = login_HTML
}

body.prepend(wh_modal_created)

async function getProducts() {
  const response = await fetch('https://whislist-app-store.myshopify.com/admin/oauth/access_token?client_id=530ced83834ba95bf9cfbad372e3e6a3&client_secret=ccc129bf7474ae81a49510b91dd72d52&code={authorization_code}')
  console.log(response)
}

// getProducts()

const change_links = document.getElementsByClassName('change-link')
for (const change_link of change_links) {
  
  change_link.addEventListener("click", function(e) {
    const wh_conts = document.getElementsByClassName('wishlist-container')
    for (const wh_cont of wh_conts) {
      if(wh_cont.classList.contains('active-conts')) {
        wh_cont.classList.remove('active-conts')
      } else {
        wh_cont.classList.add('active-conts')
      }
    }
  })
}

const wh_modal = document.getElementById('wishlist-modal')
wh_modal.addEventListener('click', function(e){
  if(!e.target.closest('.wishlist-container')) {
    wh_modal.classList.remove('wh-modal-active')
    body.classList.remove('scroll-none')
    console.log('close')
  }
})

const wh_open_modal = document.getElementById('wh-open-modal')
wh_open_modal.addEventListener('click', function(e){
  console.log('sold')
  wh_modal.classList.add('wh-modal-active')
  body.classList.add('scroll-none')
})


// Product Collection Section
console.log(window.location.href)

if(window.location.href.includes('collections')) {

  const productCardContainer = document.getElementsByClassName('product-grid')[0]
  const productCards = productCardContainer.children
  
  let index = 1
  
  for (const productCard of productCards) {
  
    const child = document.getElementsByClassName('product-grid')[0].getElementsByClassName('card__content')[index*2 - 1].getElementsByClassName('card__heading')[0]
    const id = child.id.split('product-grid-')[1]
  
    const button = document.createElement('div')
    button.classList.add('whislist-button')
    button.classList.add('whislist-button-product')
    button.setAttribute('product-id',id)
    button.innerHTML = `
      <svg fill="#000000" height="20px" width="20px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
          viewBox="0 0 471.701 471.701" xml:space="preserve">
        <g>
          <path d="M433.601,67.001c-24.7-24.7-57.4-38.2-92.3-38.2s-67.7,13.6-92.4,38.3l-12.9,12.9l-13.1-13.1
              c-24.7-24.7-57.6-38.4-92.5-38.4c-34.8,0-67.6,13.6-92.2,38.2c-24.7,24.7-38.3,57.5-38.2,92.4c0,34.9,13.7,67.6,38.4,92.3
              l187.8,187.8c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-3.9l188.2-187.5c24.7-24.7,38.3-57.5,38.3-92.4
              C471.801,124.501,458.301,91.701,433.601,67.001z M414.401,232.701l-178.7,178l-178.3-178.3c-19.6-19.6-30.4-45.6-30.4-73.3
              s10.7-53.7,30.3-73.2c19.5-19.5,45.5-30.3,73.1-30.3c27.7,0,53.8,10.8,73.4,30.4l22.6,22.6c5.3,5.3,13.8,5.3,19.1,0l22.4-22.4
              c19.6-19.6,45.7-30.4,73.3-30.4c27.6,0,53.6,10.8,73.2,30.3c19.6,19.6,30.3,45.6,30.3,73.3
              C444.801,187.101,434.001,213.101,414.401,232.701z"/>
        </g>
      </svg>
    `
    productCard.prepend(button)
    index++
    
  }
  
}




// Product Item Collection

if(window.location.href.includes('products')) {
  const productTitle = document.getElementsByClassName('product__title')[0]
  const productInfoContainer = document.getElementsByClassName('product-recommendations')[0]
  let id = productInfoContainer.getAttribute('data-url').split('product_id=')[1]
  id = id.split('&limit')[0]
  const button = document.createElement('div')
  button.classList.add('whislist-button')
  button.classList.add('whislist-button-product')
  button.setAttribute('product-id',id)
  button.innerHTML = `
    <svg fill="#000000" height="20px" width="20px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
        viewBox="0 0 471.701 471.701" xml:space="preserve">
      <g>
        <path d="M433.601,67.001c-24.7-24.7-57.4-38.2-92.3-38.2s-67.7,13.6-92.4,38.3l-12.9,12.9l-13.1-13.1
            c-24.7-24.7-57.6-38.4-92.5-38.4c-34.8,0-67.6,13.6-92.2,38.2c-24.7,24.7-38.3,57.5-38.2,92.4c0,34.9,13.7,67.6,38.4,92.3
            l187.8,187.8c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-3.9l188.2-187.5c24.7-24.7,38.3-57.5,38.3-92.4
            C471.801,124.501,458.301,91.701,433.601,67.001z M414.401,232.701l-178.7,178l-178.3-178.3c-19.6-19.6-30.4-45.6-30.4-73.3
            s10.7-53.7,30.3-73.2c19.5-19.5,45.5-30.3,73.1-30.3c27.7,0,53.8,10.8,73.4,30.4l22.6,22.6c5.3,5.3,13.8,5.3,19.1,0l22.4-22.4
            c19.6-19.6,45.7-30.4,73.3-30.4c27.6,0,53.6,10.8,73.2,30.3c19.6,19.6,30.3,45.6,30.3,73.3
            C444.801,187.101,434.001,213.101,414.401,232.701z"/>
      </g>
    </svg>
  `
  productTitle.prepend(button)
}

const addToWishlistButtons = document.getElementsByClassName('whislist-button-product')
for (const addToWishlistButton of addToWishlistButtons) {
  addToWishlistButton.addEventListener('click', async function(e){
    const id = e.target.closest('.whislist-button-product').getAttribute('product-id')
    console.log(id)
  })
}