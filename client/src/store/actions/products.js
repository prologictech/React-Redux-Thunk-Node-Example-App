import { apis } from '../../constants';
import api from '../../util/api';
import { PRODUCTS } from "../types";

const { SET_LOADING, LOAD_SUCCESS } = PRODUCTS;

export const setLoading = (loading) => async (dispatch) => {
  dispatch({ type: SET_LOADING, payload: loading });
};

// Load all products
export const loadProducts = () => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING, payload: true
    })

    const { data } = await api.get(apis.endpoints.products);

    dispatch({
      type: LOAD_SUCCESS, payload: data
    })

  } catch (error) {
    console.error('Error in loading products', error);

    dispatch({ type: SET_LOADING, payload: false });
  }
};

// Add new prduct
export const addProduct = (name, quantity, price) => async (dispatch) => {
  try {
    await api.post(apis.endpoints.products, {
      name, quantity, price
    });

    // Load Products
    dispatch(loadProducts())

    return true;
  } catch (error) {
    console.error('Error in adding products', error);
  }
};