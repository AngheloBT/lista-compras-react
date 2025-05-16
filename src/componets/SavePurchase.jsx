import { Summary } from "./Summary";

export function SavePurchase() {

    const rescatarDatos = async (data) => {
        const datos = {
            clientName : data.name,
            description: data.productos
            .map((p) => `${p.name} x${p.cantidad}`)
            .join(", "),
            total : data.total
        } 
    
       try{
            const response = await fetch (`${import.meta.env.VITE_API_URL}purchases`, {
                method : "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(datos)
            })

            if (response.ok) {
                alert("Compra enviada correctamente")
                return true

            } else {
                alert("Fallo al enviar compra")
                console.log(response.status)
                return false
            }

        } catch(err) {
            alert("Error al enviar compra")
            console.log(err)
            return false
        }
}

    return (
        <Summary onGuardarCompra={rescatarDatos} />
    )
}