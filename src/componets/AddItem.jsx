import { useEffect, useState } from "react"
import Button from "./Button"
import { Summary } from "./Summary"
import { SavePurchase } from "./SavePurchase"

export const AddItem = ({ onAgregar }) => {

    const [products, setproducts] = useState([])

    const fetchProducts = async() => {
        try{
            const response = await fetch(`${import.meta.env.VITE_API_URL}products`)
            const data = await response.json()
            setproducts(data)
        }catch(error){
            console.log(error)
        }
    }

    useEffect( () => {
        fetchProducts()
    }, [])

    const controlStock = (product) => {
        const listaGuardada = JSON.parse(localStorage.getItem('lista-productos')) || []

        const productoGuardado = listaGuardada.find( p => p.id === product.id )
        const cantidadActual = productoGuardado ? productoGuardado.cantidad : 0

        if (cantidadActual >= product.stock) {
            alert("Stock maximo")
            return
        }
    
        onAgregar(product)
    }

    return (
        <>
            <h1 className="text-3xl font-bold p-2 text-center">Productos</h1>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
                {products.map((product =>
                    <li key={product.id}className="border rounded-lg p-6 shadow-md bg-white flex flex-col items-start">
                        <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                        <p className="text-gray-700 mb-4 text-base">${product.price}</p>
                        <Button onClick={() => controlStock(product)}>Agregar</Button>
                    </li>
                ))}
            </ul>
        </>
    )
}

