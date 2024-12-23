"use server";

const baseUrl = process.env.baseURL;

export const getCategories = async () => {
  const outlet = 1;
  let endpoint = `/v1/counter/api/${outlet}/get-categories/`;
  try {
    const data = await fetch(baseUrl + endpoint, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
      next: { tags: ["categories"] },
      cache: "no-store",
    });
    const res = await data.json();
    if (!res.error) {
      return res.categories;
    } else {
      throw new Error(res.message || "Error fetching categories");
    }
  } catch (e) {
    console.error("Error fetching categories:", e);
    throw new Error(
      e.message ?? "Error fetching categories. Internal Server Error!"
    );
  }
};

export const getProducts = async () => {
  const outlet = 1;
  let endpoint = `/v1/counter/api/products/`;
  // console.log(baseUrl + endpoint);
  // if (category) endpoint += `?category=${category}`;
  try {
    const data = await fetch(baseUrl + endpoint, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
      next: { tags: ["products"] },
      cache: "no-store",
    });
    const res = await data.json();

    if (!res.error) {
      return res.categories;
    } else {
      throw new Error(res.message || "Error fetching products");
    }
  } catch (e) {
    console.error("Error fetching products:", e);
    throw new Error(
      e.message ?? "Error fetching products. Internal Server Error!"
    );
  }
};
