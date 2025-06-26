// LOGIN PAGE 
let login_btn = document.querySelector(".login-btn")
let loginClose = document.querySelector("#login-close-btn")
let signupClose = document.querySelector("#signup-close-btn")
let loginPage = document.querySelector(".login-page")
let signUpPage = document.querySelector(".signup-page")
let signup_btn = document.querySelector(".signup-button")
let loginForm = document.querySelector("#login-form")
let signupForm = document.querySelector("#signup-form")
login_btn.addEventListener("click", (e) => {
    e.preventDefault()
    loginPage.classList.add("login-active-page")
})
loginClose.addEventListener("click",(e)=>{
    e.preventDefault()
    loginPage.classList.remove("login-active-page")
})
signup_btn.addEventListener("click",(e)=>{
    e.preventDefault()
    signUpPage.classList.add("signup-active-page")
})
signupClose.addEventListener("click",(e)=>{
    e.preventDefault()
    signUpPage.classList.remove("signup-active-page")
})
signupForm.addEventListener("submit",()=>{
    let name,email,password,confirmPassword;
    name=document.getElementById("signup-name").value;
    email=document.getElementById("signup-email").value;
    password=document.getElementById("signup-create-password").value;
    confirmPassword=document.getElementById("signup-confirm-password").value;

    if(password!==confirmPassword){
        alert("passwords do not match")
    }
    else{
        let user_records = new Array()
        user_records = JSON.parse(localStorage.getItem("users"))?JSON.parse(localStorage.getItem("users")):[]
        if(user_records.some((v)=>{return v.email==email})){
            alert("Email already exists")
            }
            else{
            user_records.push({
                "name":name,
                "email":email,
                "password":password,
                "confirmPassword":confirmPassword
                })
                localStorage.setItem("users",JSON.stringify(user_records));
                alert("User created successfully")
            }
    }
})

loginForm.addEventListener("submit",()=>{
    let email,password;
    email=document.getElementById("login-email").value;
    password=document.getElementById("login-password").value;
    let user_records = new Array()
    user_records = JSON.parse(localStorage.getItem("users"))?JSON.parse(localStorage.getItem("users")):[];
    if(user_records.some((v)=>{
        return v.email==email && v.password==password
    })){
        alert("Login successful")
        let current_user = user_records.filter((v)=>{
            return v.email==email && v.password==password
        })[0]
        localStorage.setItem("name",current_user.name)
        localStorage.setItem("email",current_user.email)
        window.location.href = 'profile.html';
    }
    else{
        alert("Login Fail")
    }
})


// SEARCH PAGE
let searchPage = document.querySelector(".search-page")
let searchIcon = document.querySelector(".search-icon")
let searchCloseBtn = document.querySelector("#search-close-btn")
searchIcon.addEventListener("click",(e)=>{
    e.preventDefault()
    searchPage.classList.add("search-active-page")
})
searchCloseBtn.addEventListener("click",(e)=>{
    e.preventDefault()
    searchPage.classList.remove("search-active-page")
})

// menusidebar
let menuSidebarPage = document.querySelector(".menu-sidebar-page")
let menuSidebarIcon = document.querySelector(".menu-bar")
let menuSidebarCloseBtn = document.querySelector("#sidebar-close-btn")
menuSidebarIcon.addEventListener("click",(e)=>{
    e.preventDefault()
    menuSidebarPage.classList.add("menu-sidebar-active-page")
})
menuSidebarCloseBtn.addEventListener("click",(e)=>{
    e.preventDefault()
    menuSidebarPage.classList.remove("menu-sidebar-active-page")})


// CART PAGE
let cartPage = document.querySelector(".cart-page")
let cartIcon = document.querySelector(".cart-icon")
let cartCloseBtn = document.querySelector("#cart-close-btn")
let cartCount = document.getElementById("cart-counter")
cartIcon.addEventListener("click",(e)=>{
    e.preventDefault()
    cartPage.classList.add("cart-active-page")
})
cartCloseBtn.addEventListener("click",(e)=>{
    
    cartPage.classList.remove("cart-active-page")
})

let productData =[]
function fetchData(){
    fetch("https://beardbrand-clone-back-end.onrender.com")
    .then(res=>res.json()).then(data=>{
        productData = data;
        SingleCard(productData)
    })
    .catch(err=>console.log(err))
}
fetchData()

function SingleCard(data){
    cartCount.innerHTML = data.length
    totalAmount(data)
    let StoreData = data.map((el)=>{  
        return Card(el.id,el.title,el.image,el.price,el.category)})
   document.querySelector(".cart-footer").innerHTML = StoreData.join("")

}

let arr=[]
function totalAmount(productData){
   arr = productData
   let total = 0
    productData.forEach((el)=>{
        total += +el.price
        })
        document.getElementById("total-amount").innerHTML = `$${total}`
}


function Card(id,title,image,price){
    return `
    <a href="" id="cart-link">
    <div class="cart">
    <img src="${image}" alt="" class="cart-img">
    <div class="cart-data">
    <h2 id="cart-title" >${title}</h2>
    <p id="cart-price">$${price}</p>
    <button class="deleteBtn" data-id="${id}" id="deletebutton">DELETE</button>
    </div>
    </div>
    </a>
`
}


document.addEventListener("click",(e)=>{
    if(e.target.classList.contains("deleteBtn")){
        DeleteBtn(e.target.dataset.id)
    }
})

function DeleteBtn(id){
    fetch(`https://beardbrand-clone-back-end.onrender.com/cartpage/${id}`,{
        method: "DELETE",
    }).then((res)=>res.json())
    .then((data)=>{
        console.log(data)
        fetchData()
    })
    .catch(err=>console.log(err))
}




// slider
let arrReview =["“Perfect daily on full beard and hair. Work what’s left into hands, really helps with dry skin. Kept old small glass Beardbrand bottle to refill for travel (3.4 oz limit). Just got Utility Wash and Utility Conditioner. Lumberjack beard in progress!”","“I have VERY sensitive skin, so 'multipurpose' washes meant for face and body usually don't work out for me. This sounds weird, but my 'face skin' acts so differently than my 'body skin'. If I try to use other brands washes on both, I very easily break out and get dry skin on one or the other. This stuff is ridiculously amazing, my hair, face and body feel so clean and moisturized fresh out of the shower, I've never had anything like it.”","“I've been using this to wash my beard, face, and body and it works great! Smells great too! Best bang for your buck beard wash out there and the new containers are nice and sleek looking. Beardbrand is the only stuff I recommend to my friends and family wanting to grow out their facial hair.”","“Imagine my surprise when it is for beard and hair and moisturizer and shave cream!! Ok, tried on my hair and liked it. Tried as a shave cream and expected a bloody face. Amazed again that it is fantastic!!! A smooth bloodless experience. Love it. As a preshave or shave cream it is perfect.”","“I was going through a not great time and I had not been taking care of my hair. My hair and beard was a dry wiry mess and I was worried that I’d have to cut it off and start over growing. This stuff brought my hair and beard back to life. It’s silky smooth and I love it!”",]
let currentIndex = 0
setInterval(()=>{
    currentIndex = (currentIndex + 1) % arrReview.length
    document.querySelector("#reviews-data").innerText = arrReview[currentIndex]
},5000)

let arrReviewName =["- John, Verified Customer","- CK, Verified Customer","- Devin, Verified Customer","- Butch, Verified Customer","- CG, Verified Customer",]
setInterval(()=>{
    currentIndex = (currentIndex + 1) % arrReview.length
    document.querySelector("#reviews-name").innerText = arrReviewName[currentIndex]
},5000)


