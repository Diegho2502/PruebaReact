import {Divider, Card, CardHeader, CardBody, CardFooter, Chip, Button} from "@nextui-org/react";

import { Product } from './interfaces/product.interface';

interface Props {
    product: Product,
    editProduct: () => void;
    deleteProduct: () => void;
}

function CradProduct({product, editProduct, deleteProduct}: Props) {
    const {_id, name, description, price, stock} = product;

    const editClick = () => editProduct(_id);
    const deleteClick = () => deleteProduct(_id);

    return (
        <Card className="max-w-[340px]">
        <CardHeader className="justify-between">
          <div className="flex gap-5">
            <div className="flex flex-col gap-1 items-start justify-center">
              <h4 className="text-medium font-semibold leading-none text-default-600">{name}</h4>
              <p className="text-small text-default-500">Precio: ${price}</p>
            </div>
          </div>
          <Chip color="primary">{stock}</Chip>
        </CardHeader>
        <CardBody className="px-3 text-small text-default-400">
          <p>
            {description}
          </p>
        </CardBody>
        <Divider/>
        <CardFooter className="gap-3">
          <div className="flex gap-1">
            <Button color="success" onClick={()=>editClick()}>
              Editar
            </Button>
          </div>
          <div className="flex gap-1">
            <Button color="danger" onClick={()=>deleteClick()}>
              Eliminar
            </Button>
          </div>
        </CardFooter>
      </Card>
    )
}

export default CradProduct
