import mysql from 'mysql2/promise';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Obtener la ruta del directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Comando para ejecutar el script:
// DB_HOST=tu_host DB_USER=tu_usuario DB_PASSWORD=tu_password DB_NAME=tu_base_de_datos node bulk-load-colonias.js

// Configuración de la base de datos
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 3308
};

async function bulkLoadColonias() {
  let connection;
  try {
    // Leer el archivo JSON
    const colonias = JSON.parse(
      readFileSync(join(__dirname, 'zmg-colonias.json'), 'utf8')
    );

    console.log('Iniciando carga de colonias...');
    
    // Conectar a la base de datos
    connection = await mysql.createConnection(dbConfig);
    
    // Procesar cada colonia del archivo JSON
    const values = colonias.features.map(feature => [
      feature.properties.nombre,
      feature.properties.municipio,
      JSON.stringify(feature.geometry.coordinates)
    ]);

    // Insertar las ubicaciones en la base de datos
    const [result] = await connection.query(
      'INSERT INTO ubicaciones (nombre, municipio, coordenadas) VALUES ? ON DUPLICATE KEY UPDATE nombre=VALUES(nombre)',
      [values]
    );

    console.log(`Se insertaron ${result.affectedRows} colonias exitosamente`);
  } catch (error) {
    console.error('Error al cargar las colonias:', error);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

// Ejecutar la función
bulkLoadColonias();
