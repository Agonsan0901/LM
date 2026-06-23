import type { ITrabajo } from "../../../model/interfaces/ITrabajo";

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
  trabajo: ITrabajo;
}

export const TrabajoCard = ({ trabajo }: Props) => {
  return (
    <Card className="relative mx-auto w-full max-w-sm pt-0">
      <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
      <img
        src={trabajo.imagen}
        alt="Event cover"
        className="relative z-20 aspect-video w-full object-cover "
      />
      <CardHeader>
        <CardAction>
          <Badge variant="secondary">Featured</Badge>
        </CardAction>
        <CardTitle>{trabajo.titulo}</CardTitle>
      </CardHeader>
      <CardFooter>
        <Button className="w-full">View Event</Button>
      </CardFooter>
    </Card>
  )
}