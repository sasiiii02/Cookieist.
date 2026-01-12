import React, { useContext, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { StoreContext } from '../context/StoreContext';
import axios from 'axios';

const Verify = () => {
    const [searchParams] = useSearchParams();
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");
    const { url, clearCart } = useContext(StoreContext); // ✅ Now clearCart is available
    const navigate = useNavigate();

    const verifyPayment = async () => {
        try {
            const response = await axios.post(`${url}/api/order/verify`, { 
                success, 
                orderId 
            });
            
            if (response.data.success) {
                // ✅ Clear cart only on successful payment
                clearCart();
                navigate("/myorders");
            } else {
                navigate("/");
            }
        } catch (error) {
            console.error("Payment verification failed:", error);
            navigate("/");
        }
    };

    useEffect(() => {
        verifyPayment();
    }, []);

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            flexDirection: 'column',
            gap: '20px'
        }}>
            <div className="spinner" style={{
                border: '4px solid rgba(0, 0, 0, 0.1)',
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                borderLeftColor: '#09f',
                animation: 'spin 1s ease infinite'
            }}></div>
            <p style={{ fontSize: '18px', color: '#333' }}>Verifying payment...</p>
            <style>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

export default Verify;