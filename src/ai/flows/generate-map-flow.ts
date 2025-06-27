
'use server';
/**
 * @fileOverview A flow for generating a static map image.
 *
 * - generateMapImage - Generates a map image showing a route between two points.
 * - GenerateMapInput - The input type for the generateMapImage function.
 * - GenerateMapOutput - The return type for the generateMapImage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateMapInputSchema = z.object({
  pickup: z.string().describe('The starting location for the route.'),
  dropoff: z.string().describe('The destination location for the route.'),
});
type GenerateMapInput = z.infer<typeof GenerateMapInputSchema>;

const GenerateMapOutputSchema = z.object({
  mapDataUri: z
    .string()
    .describe(
      "A map image showing the route, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
type GenerateMapOutput = z.infer<typeof GenerateMapOutputSchema>;

export async function generateMapImage(
  input: GenerateMapInput
): Promise<GenerateMapOutput> {
  return generateMapFlow(input);
}

const generateMapFlow = ai.defineFlow(
  {
    name: 'generateMapFlow',
    inputSchema: GenerateMapInputSchema,
    outputSchema: GenerateMapOutputSchema,
  },
  async (input) => {
    const { media } = await ai.generate({
      model: 'googleai/gemini-2.0-flash-preview-image-generation',
      prompt: `Generate a simple, clean, modern-style digital map. The map should show a clear route from "${input.pickup}" to "${input.dropoff}". Clearly label the start and end points on the map. Do not include any text other than the location labels.`,
      config: {
        responseModalities: ['TEXT', 'IMAGE'],
      },
    });
    if (!media) {
      throw new Error('Image generation failed to produce an output.');
    }
    return { mapDataUri: media.url };
  }
);
