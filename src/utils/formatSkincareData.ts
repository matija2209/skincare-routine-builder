import { SkincareFormData } from "@/types/global";

function generateSkincareDescription(data: SkincareFormData): string {
  const sections: string[] = [];

  // Skin Profile
  const skinProfile = [
    `Skin Type: ${data.skinType || 'Not specified'}`,
    `Primary Goals: ${data.skinGoals?.join(', ') || 'None'}`,
    `Acne Type: ${data.acneType || 'N/A'}`,
    `Exfoliation: ${data.exfoliationFrequency} frequency (${data.exfoliationTolerance} tolerance)`,
    `Age Group: ${data.ageGroup?.replace('_', ' ') || 'Not specified'}`,
    data.skinConcerns?.primary && `Primary Concern: ${data.skinConcerns.primary}`,
    data.skinConcerns?.secondary && `Secondary Concern: ${data.skinConcerns.secondary}`,
    data.skinConcerns?.historyOfReactions && 'History of adverse reactions'
  ].filter(Boolean).join('\n- ');

  if (skinProfile) sections.push(`## SKIN PROFILE\n- ${skinProfile}`);

  // Lifestyle & Environment
  const lifestyle = [
    `Climate: ${data.climateType || 'Not specified'}`,
    `Daily Sun Exposure: ${data.sunExposureHours || 0} hours`,
    `Stress Level: ${data.stressLevel}/10`,
    `Sleep: ${data.sleepHours || 0} hours/night`,
    data.lifestyleFactors?.dietaryRestrictions && `Diet: ${data.lifestyleFactors.dietaryRestrictions.join(', ')}`
  ].filter(Boolean).join('\n- ');

  if (lifestyle) sections.push(`## LIFESTYLE & ENVIRONMENT\n- ${lifestyle}`);

  // Product Preferences
  const productPrefs = [
    `Texture: ${data.texturePreference?.toLowerCase().replace('_', ' ') || 'Any'}`,
    `Packaging: ${data.packagingPreference?.toLowerCase().replace('_', ' ') || 'Standard'}`,
    `Avoids: ${data.blacklistedIngredients?.concat(data.avoidedIngredients || [])?.join(', ') || 'None'}`,
    `Prefers: ${data.preferredIngredients?.join(', ') || 'None'}`,
    `Routine Complexity: ${data.routineComplexity}`
  ].filter(Boolean).join('\n- ');

  if (productPrefs) sections.push(`## PRODUCT PREFERENCES\n- ${productPrefs}`);

  // Makeup & Routine
  const makeupRoutine = [
    `Wears Makeup: ${data.wearsMakeupDaily ? 'Daily' : 'Occasionally'}`,
    data.makeupFrequency && `Makeup Frequency: ${data.makeupFrequency.replace(/_/g, ' ')}`,
    data.makeupTypes && `Uses: ${data.makeupTypes.join(', ')}`,
    `Morning Routine Time: ${data.routineTime?.morning || 0} mins`,
    `Evening Routine Time: ${data.routineTime?.evening || 0} mins`
  ].filter(Boolean).join('\n- ');

  if (makeupRoutine) sections.push(`## MAKEUP & ROUTINE\n- ${makeupRoutine}`);

  // Budget & Sustainability
  const budget = [
    `Monthly Budget: $${data.monthlyBudget || 'Flexible'}`,
    data.budgetAllocation && `Spending Priorities: ${Object.entries(data.budgetAllocation)
      .map(([k,v]) => `${k}: $${v}`).join(', ')}`,
    `Ethical Values: ${data.ethicalPreferences?.concat(data.sustainabilityPriorities || [])?.join(', ') || 'None'}`
  ].filter(Boolean).join('\n- ');

  if (budget) sections.push(`## BUDGET & SUSTAINABILITY\n- ${budget}`);

  // Special Considerations
  const special = [
    data.productWarnings?.length && `${data.productWarnings.length} active product warnings`,
    data.selfieAnalysis?.hydrationLevel && `Hydration Score: ${data.selfieAnalysis.hydrationLevel}/10`,
    data.selfieAnalysis?.textureAnalysis && `Texture Analysis: ${data.selfieAnalysis.textureAnalysis}`
  ].filter(Boolean).join('\n- ');

  if (special) sections.push(`## SPECIAL CONSIDERATIONS\n- ${special}`);

  return sections.join('\n\n');
}

export default generateSkincareDescription;