export const checkStatus = async (res) => {
  if (!res.ok) {
    try {
      throw await res.json();
    } catch (e) {
      throw res;
    }
  }

  return await res.json();
};
