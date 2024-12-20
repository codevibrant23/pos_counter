"use server";

const baseUrl = process.env.baseURL;

export const postOrder = async (values) => {
  const outlet = 1;
  let endpoint = `/v1/counter/api/orders/${outlet}/place-order/`;
  // console.log(baseUrl + endpoint);
  try {
    const data = await fetch(baseUrl + endpoint, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(values),
      cache: "no-store",
    });
    const res = await data.text();
    // print();
    // console.log(res);
    // if (res?.error) {
    //   throw new Error(res?.detail);
    // }
    return res;
  } catch (e) {
    throw new Error(e.message ?? "Error placing order. Internal Server Error!");
  }
};

export const printKOT = async (orderNo = 1) => {
  0;
  let endpoint = `/v1/counter/api/orders/${orderNo}/print-kot/`;
  try {
    const data = await fetch(baseUrl + endpoint, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      // body: JSON.stringify(values),
      cache: "no-store",
    });
    const res = await data.text();
    // console.log(res);
    // if (res?.error) {
    //   throw new Error(res?.detail);
    // }
    return res;
  } catch (e) {
    throw new Error(e.message ?? "Error placing order. Internal Server Error!");
  }
};
