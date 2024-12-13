
export const serviceUrl = "http://localhost:8084/api/v1/"

export const productUrls = {
  list : serviceUrl + "products",
  get : serviceUrl + "products/",
  search : serviceUrl + "products/search/findByProductName",
}

export const productCategoryUrls = {
  list : serviceUrl + "product-category",
  get : serviceUrl + "product-category/",
}
