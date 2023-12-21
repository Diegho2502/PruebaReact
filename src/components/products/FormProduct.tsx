import { useState, useEffect } from 'react';
import { Input, Button } from '@nextui-org/react';

import Axios from '../../../helpers/Api'
import { Product, ProductWithoutId } from './interfaces/product.interface'


interface Props {
    product: Product,
    getListProducts: ()=> void;
}

function FormProduct({product, getListProducts}: Props) {

    const [form, setForm] = useState<ProductWithoutId | {}>({
        name: '',
        description: '',
        price: '', 
        stock: '' 
    });
    const [idProduct, setIdProduct] = useState<String>('');

    const handleInputChange = (field: keyof ProductWithoutId, value: any) => {
        setForm(prevState => ({
            ...prevState,
            [field]: value
        }));
    };
    
    const clearForm = () => {
        setForm({
            name: '',
            description: '',
            price: '', 
            stock: '' 
        });
    }

   const saveProducts = () => {
        if (idProduct) {
            Axios.put(`/seccion1/product/edit/${idProduct}`, form).then(({data}) => {
                getListProducts();
                clearForm();
                setIdProduct('');
            }).catch(error => {
                console.error('Error:', error);
            });
        } else {
            Axios.post(`/seccion1/product/create`, form).then(({data}) => {
                getListProducts();
                clearForm();
            }).catch(error => {
                console.error('Error:', error);
            });
        }
    }
    
    useEffect(()=>{
        if (product._id) {
            setIdProduct(product._id);
            const {name, description, price, stock} = product;

            setForm({name, description, price, stock});
        }
    }, [product])

    return (
        <form>
            <div className="flex flex-wrap gap-4">
            <Input 
                  className="max-w-xl" 
                  label="Nombre" 
                  placeholder="Nombre del producto"
                  value={form.name}
                  onValueChange={(value) => handleInputChange('name', value)}
               />
               <Input 
                  className="max-w-xl" 
                  label="Descripción" 
                  placeholder="Descripción del producto" 
                  value={form.description}
                  onValueChange={(value) => handleInputChange('description', value)}
               />
               <Input 
                  className="max-w-xl" 
                  label="Precio" 
                  placeholder="Precio del producto" 
                  type="number" 
                  value={form.price}
                  onValueChange={(value) => handleInputChange('price', value)}
               />
               <Input 
                  className="max-w-xl" 
                  label="Stock" 
                  placeholder="Stock del producto" 
                  type="number" 
                  value={form.stock}
                  onValueChange={(value) => handleInputChange('stock', value)}
               />
            </div>
            <div className='mt-6'>
                <Button color="primary" onClick={()=>saveProducts()}>Enviar</Button>
            </div>
        </form>
    )

}

export default FormProduct
