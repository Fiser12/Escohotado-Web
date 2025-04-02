import type { Payload } from 'payload'
import { Taxonomy } from 'payload-types'; // Asegúrate de que este tipo es correcto
import { 
    mockAustrianSchoolQuotes as rawAustrianSchoolQuotes, 
    mockCommunismQuotes as rawCommunismQuotes, // Asume que este está aplanado
    mockHegelQuotes as rawHegelQuotes, 
    mockMuerteQuotes as rawMuerteQuotes, 
    mockQuotes as rawQuotes, 
    mockSexQuotes as rawSexQuotes
} from '../core/mock-data/quotes.model'; // Importa los arrays originales

// Helper para generar slugs (simplificado)
const slugify = (text: string): string => {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD') // Separa acentos de letras
    .replace(/[\u0300-\u036f]/g, '') // Elimina los diacríticos
    .replace(/\s+/g, '-') // Reemplaza espacios con -
    .replace(/[^\w\-]+/g, '') // Elimina caracteres no alfanuméricos (excepto guiones)
    .replace(/\-\-+/g, '-') // Reemplaza múltiples - con uno solo
    .replace(/^-+/, '') // Quita guiones al inicio
    .replace(/-+$/, ''); // Quita guiones al final
};

// Colección de taxonomías y campo padre (ajusta si es necesario)
const TAXONOMY_COLLECTION_SLUG = 'taxonomies';
const PARENT_FIELD_SLUG = 'parent';
const PARENT_CATEGORY_SLUG = 'quote-tags'; // Slug para la categoría padre
const PARENT_CATEGORY_LABEL = 'Etiquetas de Citas'; // Label para la categoría padre

// Mapa para almacenar la relación nombre -> ID
export const categoryNameToIdMap = new Map<string, string | number>();

export const seedCategories = async (payload: Payload): Promise<void> => {
  payload.logger.info('🌱 Sembrando categorías de citas...');

  try {
    // 1. Extraer todas las categorías únicas de los mocks originales
    const allRawQuotesData = [
        ...rawQuotes,
        ...rawSexQuotes,
        ...rawAustrianSchoolQuotes,
        ...rawCommunismQuotes, // Asume que este está aplanado
        ...rawHegelQuotes,
        ...rawMuerteQuotes,
    ].flat(); // Aplanar por si acaso queda algún array anidado

    const uniqueCategoryNames = [ 
        ...new Set( 
            allRawQuotesData.flatMap(quote => quote.categorías || []) 
        )
    ];

    payload.logger.info(`   Encontradas ${uniqueCategoryNames.length} categorías únicas.`);

    // 2. Asegurar que la categoría padre exista
    let parentCategory: Taxonomy | null = null;
    try {
        const existingParent = await payload.find({
            collection: TAXONOMY_COLLECTION_SLUG,
            where: {
                slug: { equals: PARENT_CATEGORY_SLUG },
            },
            limit: 1,
        });

        if (existingParent.docs.length > 0) {
            parentCategory = existingParent.docs[0] as Taxonomy; // Asegurar tipo
            payload.logger.info(`   Categoría padre '${PARENT_CATEGORY_LABEL}' ya existe (ID: ${parentCategory.id}).`);
        } else {
            payload.logger.info(`   Creando categoría padre '${PARENT_CATEGORY_LABEL}'...`);
            parentCategory = await payload.create({
                collection: TAXONOMY_COLLECTION_SLUG,
                data: {
                    label: PARENT_CATEGORY_LABEL,
                    value: PARENT_CATEGORY_SLUG,
                    slug: PARENT_CATEGORY_SLUG,
                    singular_name: PARENT_CATEGORY_LABEL, // Ajusta si tienes nombres singulares
                    // Otros campos necesarios para Taxonomy
                },
            }) as Taxonomy; // Asegurar tipo
            payload.logger.info(`    Categoría padre creada (ID: ${parentCategory.id}).`);
        }
    } catch (error) {
        payload.logger.error(`   Error asegurando categoría padre: ${error instanceof Error ? error.message : String(error)}`);
        throw error; // Detener si no podemos crear/encontrar la padre
    }

    if (!parentCategory) {
        throw new Error('No se pudo obtener la categoría padre.');
    }
    const parentId = parentCategory.id;

    // 3. Iterar y crear categorías hijas si no existen
    await Promise.all(
        uniqueCategoryNames.map(async (categoryName) => {
            const categorySlug = slugify(categoryName);
            if (!categorySlug) {
                payload.logger.warn(`   Nombre de categoría inválido o vacío, omitiendo: '${categoryName}'`);
                return; // Saltar categorías vacías o inválidas
            }

            try {
                // Buscar si ya existe con el mismo slug y padre
                const existingCategory = await payload.find({
                    collection: TAXONOMY_COLLECTION_SLUG,
                    where: {
                        and: [
                            { slug: { equals: categorySlug } },
                            { [PARENT_FIELD_SLUG]: { equals: parentId } }
                        ]
                    },
                    limit: 1,
                });

                let categoryId: string | number;
                if (existingCategory.docs.length === 0) {
                    // Crear si no existe
                    const newCategory = await payload.create({
                        collection: TAXONOMY_COLLECTION_SLUG,
                        data: {
                            label: categoryName,
                            value: categorySlug, // Usar slug como value
                            slug: categorySlug,
                            singular_name: categoryName, // Ajusta si es necesario
                            [PARENT_FIELD_SLUG]: parentId,
                            // Otros campos necesarios
                        },
                    });
                    categoryId = newCategory.id;
                    payload.logger.info(`    Creada categoría '${categoryName}' (ID: ${categoryId})`);
                } else {
                    categoryId = existingCategory.docs[0].id;
                    payload.logger.info(`   Categoría '${categoryName}' ya existe (ID: ${categoryId}), omitiendo creación.`);
                }
                // Guardar en el mapa
                categoryNameToIdMap.set(categoryName, categoryId);

            } catch (error) {
                payload.logger.error(`   Error procesando categoría '${categoryName}': ${error instanceof Error ? error.message : String(error)}`);
            }
        })
    );

    payload.logger.info('✅ Siembra de categorías completada.');

  } catch (error) {
    payload.logger.error(`Error en la siembra de categorías: ${error instanceof Error ? error.message : String(error)}`);
  }
}; 