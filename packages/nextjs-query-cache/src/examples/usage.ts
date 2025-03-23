import { withCache, invalidateByTag } from "../index";

/**
 * Ejemplo de función costosa que simula una petición a una API
 */
const fetchUserData = async (
  userId: string
): Promise<{
  id: string;
  name: string;
  email: string;
  lastFetched: Date;
}> => {
  // Simular latencia de red
  await new Promise(resolve => setTimeout(resolve, 500));

  console.log(`[API] Fetching data for user: ${userId}`);

  // Simular respuesta de API
  return {
    id: userId,
    name: `User ${userId}`,
    email: `user${userId}@example.com`,
    lastFetched: new Date(),
  };
};

/**
 * Versión cacheada de la función de obtención de usuario
 */
const getUserData = withCache(fetchUserData)({
  // Configurar opciones de caché
  minutes: 5,
  cacheKeyPrefix: "user",
  tags: ["user-data"],
});

/**
 * Función para actualizar datos de usuario que también invalida la caché
 */
const updateUserData = async (
  userId: string,
  userData: Partial<{
    name: string;
    email: string;
  }>
) => {
  // Simular actualización en API
  console.log(`[API] Updating user ${userId} with:`, userData);

  // Después de actualizar, invalidar la caché del usuario
  // para que la próxima petición traiga datos frescos
  await invalidateByTag("user-data");

  return { success: true };
};

/**
 * Ejemplo de uso
 */
const runExample = async () => {
  // Primera llamada - obtendrá los datos de la API
  console.log("--- Primera llamada ---");
  const user1 = await getUserData("123");
  console.log("Resultado:", user1);

  // Segunda llamada - usará datos cacheados
  console.log("\n--- Segunda llamada (datos cacheados) ---");
  const user2 = await getUserData("123");
  console.log("Resultado:", user2);
  console.log("¿Misma referencia que la primera llamada?", user1 === user2);
  console.log(
    "Nota: La fecha de lastFetched es la misma porque los datos vienen de la caché"
  );

  // Actualizar datos de usuario e invalidar caché
  console.log("\n--- Actualizando datos de usuario ---");
  await updateUserData("123", { name: "Usuario Actualizado" });

  // Tercera llamada - obtendrá datos frescos
  console.log("\n--- Tercera llamada (después de invalidar) ---");
  const user3 = await getUserData("123");
  console.log("Resultado:", user3);

  // Ejemplo con otro usuario
  console.log("\n--- Llamada para otro usuario ---");
  const otherUser = await getUserData("456");
  console.log("Resultado:", otherUser);
};

// Para ejecutar el ejemplo en un entorno de Node, descomenta la siguiente línea:
// runExample().catch(console.error);

export { fetchUserData, getUserData, updateUserData, runExample };
