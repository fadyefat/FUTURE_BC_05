import axios from 'axios';

const API_URL = 'https://api.coingecko.com/api/v3';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getMarketCoins = async (currency = 'usd') => {
  try {
    const response = await apiClient.get(
      `/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=50&page=1&sparkline=false`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCoinDetails = async (id) => {
  try {
    const response = await apiClient.get(
      `/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};