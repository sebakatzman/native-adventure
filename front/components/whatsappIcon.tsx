// components/WhatsAppIcon.js
import React from 'react';

const WhatsAppIcon = () => {
  return (
    <a
      href="https://wa.me/2901614736" // Reemplaza con tu número de WhatsApp
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-icon"
    >
      <img
        src="/images/WhatsApp_icon.png" // Asegúrate de que la ruta sea correcta
        alt="WhatsApp"
        className="whatsapp-icon-image"
      />
    </a>
  );
};

export default WhatsAppIcon;
