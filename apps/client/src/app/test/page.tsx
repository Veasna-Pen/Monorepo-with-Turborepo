import { auth } from '@clerk/nextjs/server'
import React from 'react'

const Page = async () => {
    const { getToken } = await auth()
    const token = await getToken()

    const productResponse = await fetch("http://localhost:3000/test", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    const productData = await productResponse.json()

    const orderResponse = await fetch("http://localhost:8001/test", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    const orderData = await orderResponse.json()

    const paymentResponse = await fetch("http://localhost:8002/test", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    const paymentData = await paymentResponse.json()

    return (
        <div className='py-12'>
            <section>
                <h2>Products</h2>
                <pre>{JSON.stringify(productData, null, 2)}</pre>
            </section>

            <section>
                <h2>Orders</h2>
                <pre>{JSON.stringify(orderData, null, 2)}</pre>
            </section>

            <section>
                <h2>Payments</h2>
                <pre>{JSON.stringify(paymentData, null, 2)}</pre>
            </section>
        </div>
    )
}

export default Page
