import { SkincareFormData } from '@/types/global';

export const formatSkincareDataToText = (data: SkincareFormData): string => {
  const sections: string[] = [];

  // Helper function to format section
  const formatSection = (title: string, content: string): string => {
    return `${title}\n${'-'.repeat(title.length)}\n${content}\n`;
  };

  // Basic Skin Profile
  const basicProfile = [
    `Skin Type: ${data.skinType}`,
    `Age Group: ${data.ageGroup === "TWENTIES" ? "20s" : 
                 data.ageGroup === "THIRTIES" ? "30s" : 
                 data.ageGroup === "FORTIES" ? "40s" : 
                 data.ageGroup === "FIFTIES" ? "50s" : "60s+"}`,
    `Skin Goals: ${data.skinGoal}`,
    `Makeup Usage: ${data.wearsMakeup ? data.makeupFrequency : 'No makeup'}`,
    data.makeupTypes ? `Makeup Types: ${data.makeupTypes.join(', ')}` : '',
  ].filter(Boolean).join('\n');
  
  sections.push(formatSection('BASIC SKIN PROFILE', basicProfile));

  // Environmental Factors
  const environmental = [
    `Daily Sun Exposure: ${data.sunExposure === "RARE" ? "Rare" : 
                          data.sunExposure === "MODERATE" ? "Moderate" : "Frequent"}`,
    `Climate Type: ${data.climateType}`,
  ].join('\n');
  
  sections.push(formatSection('ENVIRONMENTAL FACTORS', environmental));

  // Lifestyle & Health
  const lifestyle = [
    `Stress Level: ${data.stressLevels}/10`,
    `Sleep Duration: ${data.sleepPatterns === "LESS_THAN_6_HRS" ? "Less than 6 hours" : 
                      data.sleepPatterns === "6_TO_8_HRS" ? "6-8 hours" : "More than 8 hours"}`,
  ].join('\n');
  
  sections.push(formatSection('LIFESTYLE & HEALTH', lifestyle));

  // Budget & Preferences
  const budget = [
    `Monthly Budget: $${data.monthlyBudget === "LOW" ? "50" : 
                        data.monthlyBudget === "MID_RANGE" ? "150" : "200"}`,
    data.hasPreferencesEthical && data.ethicalPreferences ? 
      `Ethical Preferences: ${data.ethicalPreferences.map(pref => 
        pref === "CRUELTY_FREE" ? "Cruelty Free" :
        pref === "VEGAN" ? "Vegan" :
        pref === "SUSTAINABLE_PACKAGING" ? "Sustainable Packaging" :
        pref === "REEF_SAFE" ? "Reef Safe" :
        pref === "PALM_OIL_FREE" ? "Palm Oil Free" : pref
      ).join(', ')}` : '',
  ].filter(Boolean).join('\n');
  
  sections.push(formatSection('BUDGET & PREFERENCES', budget));

  // Contact Information
  if (data.contactPreferences) {
    const contact = [
      `Email: ${data.contactPreferences.email}`,
      `Phone: ${data.contactPreferences.phone}`,
      `Subscribed to Tips: ${data.contactPreferences.subscribeToTips ? 'Yes' : 'No'}`,
    ].join('\n');
    
    sections.push(formatSection('CONTACT INFORMATION', contact));
  }

  // Product Warnings
  if (data.productWarnings && data.productWarnings.length > 0) {
    const warnings = data.productWarnings
      .map((warning, index) => `${index + 1}. ${warning.message}`)
      .join('\n');
    
    sections.push(formatSection('⚠️ IMPORTANT WARNINGS', warnings));
  }

  // Add timestamp
  const timestamp = `Generated on: ${new Date().toLocaleString()}`;
  sections.push(`\n${timestamp}`);

  return sections.join('\n');
};

// Example usage:
/*
const textSummary = formatSkincareDataToText(skincareData);
console.log(textSummary);

Output example:

BASIC SKIN PROFILE
-----------------
Skin Type: COMBINATION
Age Group: 30s
Skin Goals: ANTI_AGING
Makeup Usage: Daily
Makeup Types: Foundation, Concealer

ENVIRONMENTAL FACTORS
--------------------
Daily Sun Exposure: Moderate
Climate Type: Humid

...etc
*/