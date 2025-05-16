import { useState } from "react"
import Button from "./Button"

export function Summary({ onGuardarCompra}) {

    const products = JSON.parse(localStorage.getItem('lista-productos')) || []

    const total = products.reduce(( acumulador, producto) =>{
        return acumulador + ( producto.price * producto.cantidad)
    }, 0 )

    const [ name, setName] = useState("")
    const onInputChange = (event) => {
        setName(event.target.value)
    }

    const onSubmit = async (e) => {
        e.preventDefault()

        if (!name.trim()) return alert("Debe ingresar su nombre")
        if (products.length === 0) return alert("Seleccione productos")

        const datos={name, productos: products, total}
        const succes = await onGuardarCompra(datos)
        
        if (succes) {
            setName("")
            localStorage.removeItem('lista-productos')
        }

    }

    return (
<>
  <h1 className="text-2xl font-bold text-center my-4">Resumen de Compra</h1>

  <form onSubmit={onSubmit} className="max-w-xl mx-auto bg-white shadow-md p-6 rounded space-y-6">
    
    <ul className="divide-y divide-gray-200">
      {products.map((product) => (
        <li key={product.id} className="py-3 flex justify-between items-center">
          <div>
            <p className="font-semibold">{product.name}</p>
            <p className="text-sm text-gray-500">Cantidad: {product.cantidad}</p>
          </div>
          <span className="font-medium">${product.price}</span>
        </li>
      ))}
    </ul>

    <div className="text-right text-lg font-bold">
      Total: ${total}
    </div>

    <div className="flex flex-col gap-2">
      <input
        type="text"
        placeholder="Escriba su nombre"
        className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={name}
        onChange={onInputChange}
      />
      <Button>Guardar Compra</Button>
    </div>

  </form>
</>

    )
}