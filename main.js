const STORAGE_KEY = "productsList"
//Displaying existing product from storage
displayAllProducts()

//triggering by click
//Running validations
//Creating new product
//Saving product to storage
//Refreshing displayable items on screen
function addNewProduct () {
    const isValied = validation()
    if(!isValied) { 
        return 
    }

    const newProduct = createNewProduct()
    addNewProductToStorage(newProduct)

    displayAllProducts()
}
//Displaying all product list from storage
function displayAllProducts(){
    const productsList = getAllProductsFromStorage();
    const tableBodyBox = document.getElementById("tableBodyBox");

    tableBodyBox.innerHTML = "";
  
    let index = 0; 
  
    for (const product of productsList) {
      const productRow = `
              <tr> 
                  <td>
                      ${product.productNameBox}
                  </td>
                  <td>
                      ${product.productPriceBox} &#8362;
                  </td>
                  <td>
                      ${product.productCategoryBox}
                  </td>
                  <td>
                      <img src="${product.productImageLinkBox}">
                  </td>
                  <td>
                      <button type="button" onclick="deleteProduct(${index})">Remove</button>
                  </td>
              </tr> 
          
          `;
  
  
      tableBodyBox.innerHTML += productRow;
  
      index++;
    }
}
//Delete product by index from storage
function deleteProduct(indexOfProduct){
    if(!confirm("Are you sure you want to delete?")) return;

    const productsList = getAllProductsFromStorage();
    
    productsList.splice(indexOfProduct, 1);
    addAllProductsToStorage(productsList);
    displayAllProducts()
}

//Adding new product to storage 
function addNewProductToStorage(product){
    const productsList = getAllProductsFromStorage()

    productsList.push(product)

    addAllProductsToStorage(productsList)
    clearValues()
}
//Getting all products from storage
//Or getting new array if storage is empty
function getAllProductsFromStorage(){
    const productsListStr = localStorage.getItem(STORAGE_KEY);

    const productsList =
      productsListStr === null ? [] : JSON.parse(productsListStr);

    return productsList
}

//Adding to storage list of products
function addAllProductsToStorage(listOfProducts){
    const updatedStorageStr = JSON.stringify(listOfProducts)

    localStorage.setItem(STORAGE_KEY,updatedStorageStr)
}

//Creating new product 
function createNewProduct () {
    const productNameBox = document.getElementById("productNameBox").value
    const productPriceBox = document.getElementById("productPriceBox").value
    const productCategoryBox = document.getElementById("productCategoryBox").value
    const productImageLinkBox = document.getElementById("productImageLinkBox").value

    const newProduct = {
        productNameBox: productNameBox,
        productPriceBox: productPriceBox,
        productCategoryBox: productCategoryBox,
        productImageLinkBox: productImageLinkBox
    }

    return newProduct
}
//Refreshing form 
function clearValues() {
    document.getElementById("productNameBox").value = ""
    document.getElementById("productPriceBox").value = ""
    document.getElementById("productCategoryBox").value = ""
    document.getElementById("productImageLinkBox").value = ""

    document.getElementById("productNameBox").focus()
}

//Checking all fiels to be valid
function validation () {
    const productNameBox = document.getElementById("productNameBox").value
    const productPriceBox = document.getElementById("productPriceBox").value
    const productCategoryBox = document.getElementById("productCategoryBox").value
    const productImageLinkBox = document.getElementById("productImageLinkBox").value
    const productNameErr = document.getElementById("productNameErr")
    const productPriceErr = document.getElementById("productPriceErr")
    const productCategoryErr = document.getElementById("productCategoryErr")
    const productImageLinkErr = document.getElementById("productImageLinkErr")


    productNameErr.innerText = ""
    productPriceErr.innerText = ""
    productCategoryErr.innerText = ""
    productImageLinkErr.innerText = ""

    if (productNameBox === "") {
        productNameErr.innerText = "Missing product Name!"
        productNameBox.focus()
        return false
    }

    if(productPriceBox === "" || productPriceBox < 0) {
        productPriceErr.innerText = "Invalid product price!"
        productPriceBox.focus()
        return false
    }

    if(productCategoryBox === "") {
        productCategoryErr.innerText = "Please choose Category!"
        productCategoryBox.focus()
        return false
    }

    if(productImageLinkBox === "") {
        productImageLinkErr.innerText = "Enter product image link!"
        productImageLinkBox.focus()
        return false
    }

    return true 
}