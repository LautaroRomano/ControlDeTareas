import AsyncStorage from '@react-native-async-storage/async-storage';
//AsyncStorage.clear();

async function saveNewJSON(key,newData) {
  try {
    const jsonValue = JSON.stringify(newData)
    await AsyncStorage.setItem(key, jsonValue)
  } catch (e) {
    console.log(e)
  }
}

export const getJSON = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key)
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.log(e)
  }
}


export const saveJSON = async (key, value) => {
  let ultimoId = 0;
  const data = await getJSON(key);
  data.length > 0 ? ultimoId = data[data.length - 1].id : ultimoId = 0;

  value.id = ultimoId + 1;
  data.push(value);

  saveNewJSON(key,data);
}

export const getItemJSON = async (key, id) => {
  let retorno = {};
  const data = await getJSON(key);

  data.forEach((element, index) => {
    if (element.id == id) {
      retorno = element;
    }
  });

  return retorno;

}

export const deleteJSON = async (key, id) => {

  const data = await getJSON(key);
  const newData = [];

  data.forEach((element, index) => {
    if (element.id != id) {
      newData.push(element);
    }
  });

  saveNewJSON(key,newData);
}

export const updateJSON = async (key, value, id) => {
  let data = await getJSON(key);
  let newData = [];
  data.forEach((element) => {
    if (element.id == id) {
      newData.push(value)
    } else {
      newData.push(element);
    }
  });

  saveNewJSON(key,newData);
}

export const getTotalPriceJSON = async (key) => {
  let total = 0;
  const data = await getJSON(key);

  data.forEach((element) => {

    total += parseFloat(element.precio);

  });

  return total;
}