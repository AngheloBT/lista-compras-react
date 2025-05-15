import Button from "./Button"

export const ItemList = ({onEliminar}) => {

    const products = JSON.parse(localStorage.getItem("lista-productos"))

    return(
        <>
        <h1 className="text-3xl font-bold p-4 text-center">Lista de Productos</h1>

        {/* Encabezados */}
        <div className="grid grid-cols-4 font-semibold text-gray-600 px-4 pb-2 border-b">
            <span>Nombre</span>
            <span>Precio</span>
            <span>Cantidad</span>
            <span className="text-right"></span> {/* Alinea el título del botón */}
        </div>

        <ul className="divide-y px-4">
            {products.map(product => (
            <li key={product.id} className="grid grid-cols-4 py-2 items-center">
                <span>{product.name}</span>
                <span>${product.price}</span>
                <span>{product.cantidad}</span>
                <div className="flex justify-end">
                <Button onClick={() => onEliminar(product.id)}>
                    Eliminar Producto
                </Button>
                </div>
            </li>
            ))}
        </ul>
        </>


    )
}