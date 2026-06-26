import type { IProducto } from "../../../model/interfaces/IProducto";

import { Badge } from "../../ui/badge"
import { Button } from "../../ui/button"
import {
  Card,
  CardAction,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card"

interface Props {
  producto: IProducto;
}

export const ProductoCard = ({ producto }: Props) => {
  return (
    <Card className="relative mx-auto w-full max-w-sm pt-0">
      <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
      <img
        src={producto.imagen}
        alt="Product cover"
        className="relative z-20 aspect-video w-full object-cover "
      />
      <CardHeader>
        <CardAction>
          <Badge variant="secondary">Featured</Badge>
        </CardAction>
        <CardTitle>{producto.titulo}</CardTitle>
      </CardHeader>
      <CardFooter>
        <Button className="w-full">View Product</Button>
      </CardFooter>
    </Card>
  )
}