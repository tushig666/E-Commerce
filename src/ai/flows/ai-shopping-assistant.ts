'use server';

/**
 * @fileOverview Provides AI-driven style recommendations based on browsing history.
 *
 * - getStyleRecommendations - A function that provides style recommendations based on browsing history.
 * - StyleRecommendationsInput - The input type for the getStyleRecommendations function.
 * - StyleRecommendationsOutput - The return type for the getStyleRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const StyleRecommendationsInputSchema = z.object({
  browsingHistory: z
    .string()
    .describe('The user browsing history, including viewed products and categories.'),
});
export type StyleRecommendationsInput = z.infer<typeof StyleRecommendationsInputSchema>;

const StyleRecommendationsOutputSchema = z.object({
  recommendations: z
    .string()
    .describe('AI-driven style recommendations based on browsing history.'),
});
export type StyleRecommendationsOutput = z.infer<typeof StyleRecommendationsOutputSchema>;

export async function getStyleRecommendations(input: StyleRecommendationsInput): Promise<StyleRecommendationsOutput> {
  return getStyleRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'styleRecommendationsPrompt',
  input: {schema: StyleRecommendationsInputSchema},
  output: {schema: StyleRecommendationsOutputSchema},
  prompt: `You are an AI fashion assistant providing style recommendations based on user browsing history.

  Based on the following browsing history:
  {{browsingHistory}}

  Provide personalized style recommendations, suggesting specific products and outfits that the user might like.
  Be concise and focus on actionable recommendations.
  `,
});

const getStyleRecommendationsFlow = ai.defineFlow(
  {
    name: 'getStyleRecommendationsFlow',
    inputSchema: StyleRecommendationsInputSchema,
    outputSchema: StyleRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
