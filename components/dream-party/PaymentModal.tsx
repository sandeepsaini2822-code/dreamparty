"use client"

import { useState } from "react"
import { WHATSAPP_NUMBER } from "@/lib/dream-party-data"
import { useViewport } from "@/lib/dream-party-hooks"
import {
  BORDER_SOFT,
  BTN_PRIMARY,
  G,
  PANEL,
  PANEL_SOFT,
} from "@/lib/dream-party-theme"
import { PaymentModalProps } from "@/lib/dream-party-types"

export default function PaymentModal({
  open,
  cart,
  total,
  checkoutData,
  onClose,
  onSuccess,
}: PaymentModalProps): React.JSX.Element | null {
  const { isMobile } = useViewport()
  const [processing, setProcessing] = useState(false)
  const [orderId, setOrderId] = useState("")

  if (!open) return null

  const buildWhatsAppURL = (generatedOrderId: string): string => {
    const itemLines = cart
      .map((i, index) => `${index + 1}. ${i.name} x${i.qty} = ₹${i.price * i.qty}`)
      .join("\n")

    const message = `
*Dream Party Order*

*Order ID:* ${generatedOrderId}

*Customer Details*
👤 Name: ${checkoutData.customerName}
📞 Phone: ${checkoutData.customerPhone}
📍 Address: ${checkoutData.customerAddress}
📮 Pincode: ${checkoutData.customerPincode}

*Verified Current Location*
Latitude: ${checkoutData.location.lat}
Longitude: ${checkoutData.location.lng}
Map: ${checkoutData.location.mapLink}

*Items Ordered*
${itemLines}

*Total Amount:* ₹${total}

*Payment Status:* Pending

Customer will pay after receiving QR manually and will share screenshot on WhatsApp.
    `.trim()

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
  }

  const handlePlaceOrder = (): void => {
    if (cart.length === 0) {
      alert("Your cart is empty.")
      return
    }

    if (!checkoutData.customerName || !checkoutData.customerPhone || !checkoutData.customerAddress) {
      alert("Customer details are missing. Please go back and fill delivery details.")
      return
    }

    setProcessing(true)

    setTimeout(() => {
      const generatedOrderId = `DP-${Date.now()}`
      setOrderId(generatedOrderId)
      setProcessing(false)

      const url = buildWhatsAppURL(generatedOrderId)
      window.open(url, "_blank")

      onSuccess()
    }, 1000)
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(14,12,9,0.92)",
        zIndex: 1000,
        display: "flex",
        alignItems: isMobile ? "flex-end" : "center",
        justifyContent: "center",
        padding: isMobile ? 0 : 20,
        backdropFilter: "blur(8px)",
      }}
    >
      <div
        style={{
          ...PANEL,
          maxWidth: 560,
          width: "100%",
          maxHeight: isMobile ? "92vh" : "90vh",
          overflowY: "auto",
          borderRadius: isMobile ? "20px 20px 0 0" : 20,
        }}
      >
        <div
          style={{
            padding: isMobile ? "20px 18px" : "28px 32px",
            borderBottom: BORDER_SOFT,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontFamily: "Playfair Display, serif",
              fontSize: isMobile ? "1.15rem" : "1.4rem",
              color: G.cream,
            }}
          >
            Confirm Order
          </span>

          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              color: G.textDim,
              fontSize: "1.4rem",
              cursor: "pointer",
            }}
          >
            ✕
          </button>
        </div>

        <div style={{ padding: isMobile ? "20px 18px" : "28px 32px" }}>
          <div
            style={{
              ...PANEL_SOFT,
              padding: 16,
              marginBottom: 20,
              borderRadius: 14,
            }}
          >
            <div
              style={{
                fontFamily: "Playfair Display, serif",
                fontSize: "1rem",
                color: G.cream,
                marginBottom: 12,
              }}
            >
              Customer Details
            </div>

            <div style={detailRowStyle}>
              <span>Name</span>
              <span style={valueStyle}>{checkoutData.customerName}</span>
            </div>

            <div style={detailRowStyle}>
              <span>Phone</span>
              <span style={valueStyle}>{checkoutData.customerPhone}</span>
            </div>

            <div style={detailRowStyle}>
              <span>Pincode</span>
              <span style={valueStyle}>{checkoutData.customerPincode}</span>
            </div>

            <div style={{ ...detailRowStyle, alignItems: "flex-start" }}>
              <span>Address</span>
              <span style={{ ...valueStyle, textAlign: "right", maxWidth: "70%" }}>
                {checkoutData.customerAddress}
              </span>
            </div>
          </div>

          <div
            style={{
              ...PANEL_SOFT,
              padding: 16,
              marginBottom: 20,
              borderRadius: 14,
            }}
          >
            <div
              style={{
                fontFamily: "Playfair Display, serif",
                fontSize: "1rem",
                color: G.cream,
                marginBottom: 12,
              }}
            >
              Order Summary
            </div>

            {cart.map((i) => (
              <div
                key={i.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 12,
                  fontSize: "0.9rem",
                  color: G.textDim,
                  marginBottom: 6,
                }}
              >
                <span>
                  {i.name} × {i.qty}
                </span>
                <span style={{ color: G.goldLight, flexShrink: 0 }}>
                  ₹{i.price * i.qty}
                </span>
              </div>
            ))}

            <div
              style={{
                borderTop: BORDER_SOFT,
                marginTop: 10,
                paddingTop: 10,
                display: "flex",
                justifyContent: "space-between",
                color: G.cream,
                fontFamily: "Playfair Display, serif",
              }}
            >
              <span>Total</span>
              <span style={{ color: G.goldLight }}>₹{total}</span>
            </div>
          </div>

          <div
            style={{
              ...PANEL_SOFT,
              padding: 14,
              marginBottom: 20,
              borderRadius: 14,
              color: G.textDim,
              lineHeight: 1.7,
            }}
          >
            This order will be sent on WhatsApp with customer details and verified location.
            Dream Party will review the order, send QR manually, and verify the payment screenshot.
          </div>

          <button
            onClick={handlePlaceOrder}
            disabled={processing}
            style={{
              ...BTN_PRIMARY,
              width: "100%",
              background: processing
                ? "linear-gradient(135deg, #b45309 0%, #92400e 100%)"
                : G.gradPrimary,
              cursor: processing ? "wait" : "pointer",
              fontSize: isMobile ? "0.72rem" : "0.82rem",
              padding: isMobile ? "14px 18px" : "16px 24px",
            }}
          >
            {processing ? "Sending Order..." : "Send Order on WhatsApp →"}
          </button>

          {orderId && (
            <div
              style={{
                marginTop: 16,
                textAlign: "center",
                color: G.textDim,
                fontSize: "0.9rem",
              }}
            >
              Order ID: <span style={{ color: G.goldLight }}>{orderId}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const detailRowStyle = {
  display: "flex",
  justifyContent: "space-between",
  gap: 12,
  fontSize: "0.9rem",
  color: G.textDim,
  marginBottom: 8,
}

const valueStyle = {
  color: G.goldLight,
  textAlign: "right" as const,
}