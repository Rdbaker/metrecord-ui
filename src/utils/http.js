export const checkStatus = async (res) => {
  if (!res.ok) {
    let badRes;
    try {
      badRes = await res.json();
    } catch (e) {
      badRes = res;
    }
    throw badRes;
  }

  return await res.json();
};
