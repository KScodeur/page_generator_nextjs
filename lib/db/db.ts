import { Pool } from 'pg';

// Vérification des variables d'environnement
const {
  POSTGRES_URL,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_DATABASE
} = process.env;

// Configuration de la connexion
const config = POSTGRES_URL
  ? { 
      connectionString: POSTGRES_URL,
      ssl: { rejectUnauthorized: false }
    }
  : {
      user: POSTGRES_USER,
      password: POSTGRES_PASSWORD,
      host: POSTGRES_HOST,
      port: Number(POSTGRES_PORT) || 5432,
      database: POSTGRES_DATABASE,
      ssl: { rejectUnauthorized: false }
    };

// Création du pool de connexions
const pool = new Pool(config);

// Fonction utilitaire pour les requêtes
export async function query(text: string, params?: any[]) {
  const client = await pool.connect();
  try {
    const result = await client.query(text, params);
    return result;
  } finally {
    client.release();
  }
}

// Export du pool pour une utilisation directe si nécessaire
export { pool };
// import { Pool } from 'pg';

// export const pool = new Pool({
//   connectionString: process.env.POSTGRES_URL,
//   ssl: {
//     rejectUnauthorized: false,  // À ajuster selon votre configuration SSL
//   },
// });


// export async function query(text: string, params?: any[]) {
//   const client = await pool.connect();  // Obtention d'une connexion du pool

//   try {
//     //console.log('Connected to PostgreSQL database using pool!');
//     const res = await client.query(text, params);
//     return res;  // Retourne l'objet complet de la requête (incluant les lignes)
//   } catch (err) {
//     console.error('Error executing query:', err);
//     throw err;  // Lance l'erreur si elle se produit
//   } finally {
//     client.release();  // Libération de la connexion pour le pool
//     //console.log('Connection released back to pool.');
//   }
// }





// // import { Pool, PoolConfig } from 'pg';

// // // Only create the pool on the server side
// // const getPool = () => {
// //   const config: PoolConfig = {
// //     user: process.env.DB_USER,
// //     password: process.env.DB_PASSWORD,
// //     host: process.env.DB_HOST,
// //     port: parseInt(process.env.DB_PORT || '5432'),
// //     database: process.env.DB_NAME,
// //     ssl: process.env.NODE_ENV === 'production' ? {
// //       rejectUnauthorized: false
// //     } : undefined
// //   };

// //   return new Pool(config);
// // };

// // // Create pool instance
// // const pool = getPool();

// // export async function query(text: string, params?: any[]) {
// //   const client = await pool.connect();
// //   try {
// //     const result = await client.query(text, params);
// //     return result;
// //   } finally {
// //     client.release();
// //   }
// // }

// // // import { Pool } from '@neondatabase/serverless';

// // // const pool = new Pool({
// // //   connectionString: process.env.POSTGRES_URL,
// // // });

// // // export async function query(text: string, params?: any[]) {
// // //   const client = await pool.connect();
// // //   try {
// // //     const result = await client.query(text, params);
// // //     return result;
// // //   } finally {
// // //     client.release();
// // //   }
// // // }

