import type { Payload } from 'payload'
import { 
    mockAustrianSchoolQuotes, 
    mockCommunismQuotes, 
    mockHegelQuotes, 
    mockMuerteQuotes, 
    mockQuotes, 
    mockSexQuotes
} from '../core/mock-data/quotes.model'
import type { Quote, Taxonomy } from 'payload-types'

// Combina todas las citas mockeadas en un solo array y aplánalo
const allMockQuotes: Quote[] = [
    ...mockQuotes,
    ...mockSexQuotes,
    ...mockAustrianSchoolQuotes,
    ...mockCommunismQuotes,
    ...mockHegelQuotes,
    ...mockMuerteQuotes,
].flat();

// Nombre del campo de relación en la colección 'quote' (ajusta si es necesario)
const CATEGORY_RELATION_FIELD = 'categories';

export const seedQuotes = async (
  payload: Payload,
): Promise<void> => {
  payload.logger.info('🌱 Sembrando citas y asociando categorías...')

  try {
    // Itera sobre cada cita mockeada
    await Promise.all(
      allMockQuotes.map(async (mockQuote) => {
        // Asegúrate de que mockQuote es un objeto Quote y no un array
        if (typeof mockQuote !== 'object' || mockQuote === null || Array.isArray(mockQuote)) {
          payload.logger.warn(`   Elemento inválido encontrado en allMockQuotes, omitiendo.`);
          return; 
        }
        
        try {
          // Intenta encontrar una cita existente con el mismo texto
          const existingQuote = await payload.find({
            collection: 'quote',
            where: {
              quote: {
                equals: mockQuote.quote,
              },
            },
            limit: 1,
          })

          // Si no existe, créala
          if (existingQuote.docs.length === 0) {
            

            await payload.create({
              collection: 'quote',
              data: {
                quote: mockQuote.quote,
                [CATEGORY_RELATION_FIELD]: [], // Asignar los IDs number[]
              },
            })
          } else {
            payload.logger.info(`   Cita ya existe, omitiendo: "${mockQuote.quote.substring(0, 50)}..."`)
          }
        } catch (error) {
          const quoteText = typeof mockQuote === 'object' && mockQuote?.quote ? mockQuote.quote.substring(0, 50) : 'desconocida';
          payload.logger.error(`   Error procesando cita "${quoteText}...": ${error instanceof Error ? error.message : String(error)}`);
        }
      })
    );

    payload.logger.info('✅ Siembra de citas completada.')
  } catch (error) {
    payload.logger.error(`Error en la siembra de citas: ${error instanceof Error ? error.message : String(error)}`)
  }
} 