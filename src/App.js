import React, { Component } from 'react';
//mport logo from './logo.svg';
//import './App.css';
import Nav from './components/Nav';
//import Product from './components/Product';
import ProductList from './components/ProductList';

const initialProducts = [
  { id: 1, title: 'iPhone Xs', inventory: 4, price: 1200, image: 'https://static.highsnobiety.com/thumbor/U0-rUWbybp-8s-Rqb8cAX6Xq2Qc=/fit-in/480x320/smart/static.highsnobiety.com/wp-content/uploads/2018/10/01101452/apple-iphone-xs-iphone-xs-max-01.jpg' },
  { id: 2, title: 'Galaxy S9', inventory: 5, price: 999.99, image: 'https://cdn.shopify.com/s/files/1/0218/3368/products/samsung-galaxy-s9_bfab1385-75ac-42e4-8623-c04b927ffc1c_480x.jpg?v=1542884607' },
  { id: 3, title: 'Huawei Mate', inventory: 2, price: 900, image: 'https://hips.hearstapps.com/digitalspyuk.cdnds.net/18/42/1539699691-huawei-mate-20-pro.jpg?resize=480:*'},
  { id: 4, title: 'Google Pixel 3', inventory: 3, price: 950.50, image: 'https://ascii.jp/elem/000/001/767/1767566/GPixel008_480x.jpg' },
  { id: 5, title: 'Motorola G6', inventory: 6, price: 800, image: 'https://www.rosarioplus.com/__export/1524155866209/sites/rosarioplus/img/2018/04/19/moto_e5_presentacion_brasil.jpg_557888218.jpg' },
  { id: 6, title: 'Xiaomi Redmi Note 5', inventory: 5, price: 199.99, image: 'https://cdn.computerhoy.com/sites/navi.axelspringer.es/public/styles/480/public/media/image/2019/04/xiaomi-redmi-note-5-pro.jpg?itok=GCDeV2Ht' }
];

const formatNumber = (number) => new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2}).format(number);

class App extends Component {
  state = {
    addedIds: [],
    quantityById: {},
    products: initialProducts,
  };
  addToCart = (id) =>{
    const {addedIds, quantityById, products} = this.state;
    const product = products.find(prod => prod.id === id);
    const available = product.inventory - (quantityById[id] || 0); 
    if (available > 0){
      const newAddedIds = addedIds.find(prodId => prodId === id) ? addedIds : addedIds.concat(product.id)
      const newQuantityById = {
        ...quantityById,
        [id]: (quantityById[id] || 0) + 1,
      };
      this.setState({ addedIds: newAddedIds, quantityById: newQuantityById});
    }
  }
  removeFromCart = (id) =>{
    const {addedIds, quantityById} = this.state;
    if(quantityById[id]){
      const newQuantityById = {
        ...quantityById,
        [id]: quantityById[id] > 1 ? quantityById[id] - 1 : undefined,

      };
      const newAddedIds = newQuantityById[id] ? addedIds : addedIds.filter(prodId => prodId !== id);
      this.setState({ addedIds: newAddedIds, quantityById: newQuantityById});
    }
  }
  deleteFromCart = (id) => {
    const {addedIds, quantityById} = this.state;
    if(quantityById[id]){
      const newQuantityById = {
        ...quantityById,
        [id]: undefined,
      };
      const newAddedIds = addedIds.filter(prodId => prodId !== id);
      this.setState({ addedIds: newAddedIds, quantityById: newQuantityById});
    }
  }

  getAvailable = (products, quantityById) => {
    return products.reduce(
      (res, product) => ({
        ...res,
        [product.id]: product.inventory - (quantityById[product.id] || 0),
      }),
      {}, 
    );
  }
  getTotal = (products, addedIds, quantityById) =>{
    return addedIds.reduce(
      (res, productId) => res + products.find(prod => prod.id === productId).price * (quantityById[productId] || 0),
      0
    );
  }
  render() {
    const {products, quantityById, addedIds} = this.state;
    const available = this.getAvailable(products, quantityById);
    const total = this.getTotal(products, addedIds, quantityById);
    return (
     <fragment>
      
      <Nav total={formatNumber(total)}/>
      <ProductList 
        available = {available}
        products = {initialProducts} 
        addToCart = {this.addToCart} 
        removeFromCart = {this.removeFromCart}
        deleteFromCart = {this.deleteFromCart}
        />
     </fragment>
      

    );
  }
}

export default App;
