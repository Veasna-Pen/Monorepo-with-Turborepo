import { auth } from "@clerk/nextjs/server";

const Page = async () => {
    const { getToken } = await auth();
    const token = await getToken();

    if (!token) {
        return <div>Unauthorized: No token found</div>;
    }

    const endpoints = {
        products: "http://localhost:3000/test",
        orders: "http://localhost:8001/test",
        payments: "http://localhost:8002/test",
    };

    const [productRes, orderRes, paymentRes] = await Promise.all([
        fetch(endpoints.products, {
            headers: { Authorization: `Bearer ${token}` },
            cache: "no-store",
        }),
        fetch(endpoints.orders, {
            headers: { Authorization: `Bearer ${token}` },
            cache: "no-store",
        }),
        fetch(endpoints.payments, {
            headers: { Authorization: `Bearer ${token}` },
            cache: "no-store",
        }),
    ]);

    const [productData, orderData, paymentData] = await Promise.all([
        productRes.json(),
        orderRes.json(),
        paymentRes.json(),
    ]);

    return (
        <div className="py-12">
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
    );
};

export default Page;
