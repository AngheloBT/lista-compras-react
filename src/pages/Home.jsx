import { useState } from "react"
import { AddItem } from "../componets/AddItem"
import { ItemList } from "../componets/ItemList";

export const Home =  () => {
    const [list , setList] = useState(() =>{
            const saved = localStorage.getItem("lista-productos")
            return saved ? JSON.parse(saved) : []
        }
    )

    const agregarProducto = (producto) =>{
        
        let nuevaLista
        if (list.some(p => p.id === producto.id)) {
            nuevaLista = list.map(p => p.id === producto.id ? {...p, cantidad : p.cantidad + 1} : p)
        } else {
            nuevaLista = [...list, { ...producto, cantidad: 1 }];
        }
        setList(nuevaLista)
        localStorage.setItem("lista-productos", JSON.stringify(nuevaLista))
    };
    
    const eliminarProducto = (id) => {
        const nuevaLista = list.map(p => {
          if (p.id === id) {
            if (p.cantidad > 1) {
              return { ...p, cantidad: p.cantidad - 1 };
            }
            return null;
          }
          return p;
        }).filter(p => p !== null);
        setList(nuevaLista);
        localStorage.setItem("lista-productos", JSON.stringify(nuevaLista));
      };
      
      
    return(
        <>
        <AddItem onAgregar={agregarProducto}/>
        <ItemList onEliminar={eliminarProducto} />
        </>
    )
}