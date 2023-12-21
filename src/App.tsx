import { useEffect, useState } from 'react';
import CradProduct from './components/products/Card';
import FormProduct from './components/products/FormProduct';

import Axios from '../helpers/Api';
import { Product } from "./components/products/interfaces/product.interface";
  
function Products() {
  const [list, setList] = useState<Product[]>([]);
  const [oneProduct, setOneProduct] = useState<Product | {}>({});

  function editProduct(idProduct:String) {
    const product = list.find(({_id}) => _id === idProduct);
    setOneProduct(product)
  }

  function getListProducts(){
    Axios.get('/seccion1/product').then(({data}) => {
      setList(data.body);
    }).catch(error => {
      console.error('Error:', error);
    });
  }

  function deleteProduct(idProduct: String) {
    Axios.delete(`/seccion1/product/delete/${idProduct}`).then(({data}) => {
      const newList = list.filter(({_id}) => _id !== idProduct);
      setList(newList);
    }).catch(error => {
      console.error('Error:', error);
    });
  }

  useEffect(() => {
    getListProducts();
  }, []);

  return (
    <div className='m-10'>
      <div className='mb-8'>
        <div className='center-text mb-3'>
          <h1> Formulario Crear/Editar </h1>
        </div>
        <FormProduct product={oneProduct} getListProducts={getListProducts}/>
      </div>
      <div>
        <div className='center-text mb-3'>
          <h1>
            Lista de Productos
          </h1>
        </div>
        <div className="flex flex-wrap gap-4">
          {
            !!list.length ? 
            list.map(item => (
                <CradProduct product={item} deleteProduct={deleteProduct} editProduct={editProduct} key={item._id}/>
              )) : 
              <span className='text-inherit'>
                No se encontraron productos disponibles!
              </span>
          }  
        </div>
        
      </div>
    </div>
  )
}

export default Products
