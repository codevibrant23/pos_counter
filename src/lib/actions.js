"use server";

const baseUrl = process.env.baseURL;

export const postOrder = async (values) => {
  const outlet = 1;
  let endpoint = `/v1/counter/api/orders/${outlet}/place-order/`;
  try {
    const data = await fetch(baseUrl + endpoint, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(values),
      cache: "no-store",
    });
    const res = await data.json();
    print();
    console.log(res);
    if (res?.error) {
      throw new Error(res?.detail);
    }
    return res.categories;
  } catch (e) {
    throw new Error(e.message ?? "Error placing order. Internal Server Error!");
  }
};
