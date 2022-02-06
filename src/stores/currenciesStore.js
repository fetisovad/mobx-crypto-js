import { observable, computed, action } from 'mobx';
import axios from 'axios';

class CurrenciesStore {
  // @observable private items = [];
  @observable items = [];

  @computed
  get getItems() {
    return this.items;
  }

  @action
  setItems = (items) => {
    this.items = items;
  };

  @action
  fetchCoins = () => {
    axios
      .get('https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD')
      .then(({ data }) => {
        const coins = data.Data.map((coin) => {
          const obj = {
            name: coin.CoinInfo.Name,
            fullName: coin.CoinInfo.FullName,
            imageUrl: `https://www.cryptocompare.com/${coin.CoinInfo.ImageUrl}`,
            price: coin.RAW.USD.PRICE.toFixed(3),
            volume24Hour: parseInt(coin.RAW.USD.VOLUME24HOUR),
          };
          return obj;
        });
        this.items = coins;
      });
  };
}

export default CurrenciesStore;
