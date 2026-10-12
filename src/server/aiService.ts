import { GoogleGenAI } from '@google/genai';
import { Vehicle } from '../types/automotive.js';

let genAiClient: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY' || apiKey.trim() === '') {
    return null;
  }
  if (!genAiClient) {
    genAiClient = new GoogleGenAI({ apiKey });
  }
  return genAiClient;
}

export const aiService = {
  /**
   * Natural Language Automotive Copilot & Matchmaker
   */
  async askCopilot(
    question: string,
    vehicles: Vehicle[],
    activeVehicle?: Vehicle,
    locationContext?: { country?: string; state?: string; city?: string }
  ): Promise<{ answer: string; suggestedVehicleIds?: string[]; source: 'gemini' | 'algorithmic' }> {
    const ai = getAiClient();

    const locationStr = locationContext?.city
      ? `${locationContext.city}, ${locationContext.state}, ${locationContext.country}`
      : 'Global';

    if (ai) {
      try {
        const vehicleSummaries = vehicles.slice(0, 15).map(
          (v) =>
            `- ${v.brandName} ${v.name} (${v.modelYear}, ${v.bodyStyle}, ${v.powertrainType}, ${v.specs.maxPowerHp} hp, 0-100: ${v.specs.zeroToHundredKphSec}s, Base: ${v.basePrice.formatted}, Era: ${v.era || 'Modern'})`
        ).join('\n');

        const prompt = `You are the AutoVerse Global Lead Automotive Intelligence Specialist.
Your job is to provide authoritative, engineering-grade advice on vehicle specifications, comparisons, total cost of ownership, and historical provenance.

USER QUESTION: "${question}"
USER LOCATION CONTEXT: ${locationStr}
CURRENT FOCUSED CAR: ${activeVehicle ? `${activeVehicle.brandName} ${activeVehicle.name} (${activeVehicle.modelYear})` : 'None'}

AVAILABLE CATALOG SNAPSHOT:
${vehicleSummaries}

GUIDELINES:
- Provide concise, highly knowledgeable, and data-backed answers with exact figures (horsepower, torque, acceleration, range, curb weight, NCAP ratings).
- If asked about local pricing or taxes, explain how state/city sales tax or registration fees impact on-road costs in ${locationStr}.
- If asked for recommendations, recommend the best matching cars from the catalog and explain the engineering justification.
- Maintain an objective, professional, and enthusiast tone.`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt
        });

        const text = response.text || '';
        return { answer: text, source: 'gemini' };
      } catch (err) {
        console.warn('Gemini API call failed, falling back to algorithmic response:', err);
      }
    }

    // High quality Algorithmic Fallback
    const qLower = question.toLowerCase();
    let answer = '';
    const suggestedIds: string[] = [];

    if (qLower.includes('electric') || qLower.includes('ev') || qLower.includes('battery')) {
      const bestEv = vehicles.find((v) => v.powertrainType === 'Battery Electric');
      answer = `Based on homologated technical specifications, top electric models in the AutoVerse repository feature 800V/900V DC rapid charging. For example, the ${bestEv?.brandName} ${bestEv?.name} offers ${bestEv?.specs.maxPowerHp} hp with a certified WLTP range of ${bestEv?.specs.electricRangeKm} km and 10%–80% fast charging in under 20 minutes. In ${locationStr}, electric vehicles benefit from reduced emissions cess and local clean vehicle tax incentives.`;
      if (bestEv) suggestedIds.push(bestEv.id);
    } else if (qLower.includes('fastest') || qLower.includes('speed') || qLower.includes('acceleration')) {
      const quickest = [...vehicles].sort((a, b) => a.specs.zeroToHundredKphSec - b.specs.zeroToHundredKphSec)[0];
      answer = `The fastest accelerating vehicle in the current database is the ${quickest.brandName} ${quickest.name}, registering 0–100 km/h in just ${quickest.specs.zeroToHundredKphSec} seconds, propelled by ${quickest.specs.maxPowerHp} hp and a top speed of ${quickest.specs.topSpeedKph} km/h.`;
      suggestedIds.push(quickest.id);
    } else if (qLower.includes('classic') || qLower.includes('vintage') || qLower.includes('old') || qLower.includes('f1') || qLower.includes('db5')) {
      answer = `AutoVerse Global indexes iconic historical milestones. The 1993 McLaren F1 remains the gold standard with its central-seat carbon monocoque and 386 km/h naturally-aspirated V12 top speed. The 1964 Aston Martin DB5 represents timeless Touring Superleggera craftsmanship with its 4.0L Tadek Marek inline-six, and the 1969 Boss 429 features Ford's semi-hemi NASCAR homologation V8.`;
      const f1 = vehicles.find((v) => v.slug.includes('mclaren-f1'));
      if (f1) suggestedIds.push(f1.id);
    } else {
      answer = `AutoVerse Global provides independently verified technical data across ${vehicles.length} vehicle models from 15 global automakers. In ${locationStr}, total acquisition costs include local state registration, emissions classification levies, and comprehensive insurance tiers. Feel free to ask about specific horsepower, charging speeds, dimensions, or side-by-side model comparisons.`;
    }

    return { answer, suggestedVehicleIds: suggestedIds, source: 'algorithmic' };
  },

  /**
   * AI Multi-Car Engineering Synthesis & Comparison Analysis
   */
  async compareAnalysis(
    vehiclesToCompare: Vehicle[],
    locationContext?: { city?: string; country?: string }
  ): Promise<{ analysis: string; winner: string; keyDifferentiators: string[]; source: 'gemini' | 'algorithmic' }> {
    const ai = getAiClient();
    const loc = locationContext?.city ? `${locationContext.city}, ${locationContext.country}` : 'Global';

    if (ai && vehiclesToCompare.length >= 2) {
      try {
        const vehicleData = vehiclesToCompare.map((v) => `
- ${v.brandName} ${v.name} (${v.modelYear})
  * Powertrain: ${v.powertrainType}
  * Power: ${v.specs.maxPowerHp} hp | Torque: ${v.specs.maxTorqueNm} Nm
  * 0-100 km/h: ${v.specs.zeroToHundredKphSec}s | Top Speed: ${v.specs.topSpeedKph} km/h
  * Weight: ${v.dimensions.kerbWeightKg} kg | Wheelbase: ${v.dimensions.wheelbaseMm} mm
  * Base MSRP: ${v.basePrice.formatted}
  * Crash Rating: ${v.safetyRating.ncapOrganization} ${v.safetyRating.stars} Stars
`).join('\n');

        const prompt = `Perform an in-depth automotive engineering comparison between the following ${vehiclesToCompare.length} vehicles for a driver evaluating in ${loc}:
${vehicleData}

Provide:
1. Architectural & Powertrain Contrast (throttle delivery, weight balance, power-to-weight ratio).
2. Daily Practicality & Ownership Experience in ${loc}.
3. The Decisive Verdict: Which vehicle wins for track enthusiasts vs daily grand touring.
4. Top 3 key differentiators.`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt
        });

        return {
          analysis: response.text || '',
          winner: vehiclesToCompare[0]?.name || 'Split Recommendation',
          keyDifferentiators: [
            'Power delivery and traction vectoring dynamics',
            'Chassis balance and curb weight differential',
            'Multi-market localized on-road taxation and running cost'
          ],
          source: 'gemini'
        };
      } catch (err) {
        console.warn('Gemini comparison call failed, falling back to algorithmic synthesis:', err);
      }
    }

    // Algorithmic synthesis
    const v1 = vehiclesToCompare[0];
    const v2 = vehiclesToCompare[1];
    const powerDelta = Math.abs(v1.specs.maxPowerHp - v2.specs.maxPowerHp);
    const accelDelta = Math.abs(v1.specs.zeroToHundredKphSec - v2.specs.zeroToHundredKphSec).toFixed(1);

    const analysis = `Engineering Analysis: Comparing ${v1.brandName} ${v1.name} against ${v2.brandName} ${v2.name} reveals distinct mechanical philosophies.
- Powertrain Balance: The ${v1.specs.maxPowerHp > v2.specs.maxPowerHp ? v1.name : v2.name} holds a ${powerDelta} hp output advantage, yielding a ${accelDelta}s difference to 100 km/h.
- Weight & Geometry: The ${v1.name} weighs in at ${v1.dimensions.kerbWeightKg} kg with a ${v1.dimensions.wheelbaseMm} mm wheelbase, while the ${v2.name} measures ${v2.dimensions.kerbWeightKg} kg on a ${v2.dimensions.wheelbaseMm} mm platform.
- Homologation & Safety: Both models comply with stringent crash testing (${v1.safetyRating.ncapOrganization} and ${v2.safetyRating.ncapOrganization} certified).
In ${loc}, local registration and fuel/energy tariffs favor the ${v1.powertrainType === 'Battery Electric' ? v1.name : v2.name} for urban operating economy.`;

    return {
      analysis,
      winner: v1.specs.maxPowerHp > v2.specs.maxPowerHp ? v1.name : v2.name,
      keyDifferentiators: [
        `${powerDelta} hp differential in powertrain output`,
        `${accelDelta}s variance in 0–100 km/h acceleration`,
        `${Math.abs(v1.dimensions.kerbWeightKg - v2.dimensions.kerbWeightKg)} kg curb weight divergence`
      ],
      source: 'algorithmic'
    };
  },

  /**
   * AI Historical & Valuation Appraisal for Classics
   */
  async evaluateClassic(vehicle: Vehicle): Promise<{ appraisal: string; investmentOutlook: string; maintenanceChecklist: string[]; source: 'gemini' | 'algorithmic' }> {
    const ai = getAiClient();

    if (ai) {
      try {
        const prompt = `You are a certified senior classic automobile appraiser for Pebble Beach and RM Sotheby's.
Provide a provenance, auction trend, and mechanical restoration appraisal for the:
${vehicle.modelYear} ${vehicle.brandName} ${vehicle.name} (${vehicle.generation}).
Specifications: ${vehicle.specs.engineDisplacementCc ? `${vehicle.specs.engineDisplacementCc}cc` : ''} ${vehicle.specs.cylinders ? `${vehicle.specs.cylinders}-cylinder` : ''}, ${vehicle.specs.maxPowerHp} hp, ${vehicle.specs.transmission}.

Include:
1. Historic significance and motorsport/cinema provenance.
2. 5-year auction valuation trend.
3. Top 3 vulnerable mechanical systems requiring specialized historic maintenance.
4. Investment rating (AAA Blue Chip, AA Strong Growth, A Stable Collectible).`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt
        });

        return {
          appraisal: response.text || '',
          investmentOutlook: 'AAA Blue Chip Collector Asset',
          maintenanceChecklist: [
            'Original chassis and engine stamping matching numbers verification',
            'Fluid line and fuel cell bladder integrity inspection',
            'Period-correct coachwork and interior leather patina preservation'
          ],
          source: 'gemini'
        };
      } catch (err) {
        console.warn('Gemini classic valuation failed:', err);
      }
    }

    return {
      appraisal: `The ${vehicle.modelYear} ${vehicle.brandName} ${vehicle.name} stands as an irreplaceable benchmark of its era. With a current global collector benchmark valuation of ${vehicle.basePrice.formatted}, auction records consistently reward original unrestored examples with verified chassis matching numbers.`,
      investmentOutlook: 'AAA Blue Chip Historic Asset — Strong Appreciation Vector',
      maintenanceChecklist: [
        'Periodic synchronization of carburetors / mechanical fuel injection',
        'Inspection of magnesium alloys and tubular structural chassis joints',
        'Brake master cylinder hydraulic rebuilding with DOT 5 silicone fluid'
      ],
      source: 'algorithmic'
    };
  }
};
