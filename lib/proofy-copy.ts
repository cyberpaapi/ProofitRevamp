export const proofyWelcomeMessage = "Not sure which Proofit service you need?\nProofy can help you find the right inspection for your property.";

// Upgrade the original seeded greeting without discarding a custom admin greeting.
export function publicProofyWelcome(message?: string) {
  const legacy = "Hi, I'm Proofy. Ask me a quick question about inspections, or I can help request an appointment.";
  return !message?.trim() || message.trim() === legacy ? proofyWelcomeMessage : message;
}
