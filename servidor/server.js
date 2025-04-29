const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

// Servir la carpeta cliente (ajustado a estructura actual)
const path = require('path');
app.use(express.static(path.join(__dirname, '../cliente')));

// Cuando un cliente se conecta
io.on('connection', (socket) => {
  console.log('🔌 Nuevo cliente conectado:', socket.id);

  // Mensaje de prueba entrante
  socket.on('ruidoSimulado', (data) => {
    console.log('📥 Recibido ruido simulado:', data);
  });

  // Mensaje de prueba saliente
  socket.emit('mensajeBienvenida', { msg: '¡Conectado al servidor!' });

  // Cuando se desconecta
  socket.on('disconnect', () => {
    console.log('❌ Cliente desconectado:', socket.id);
  });
});

// Levantar servidor
const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
});
