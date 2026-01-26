// services/monitoring/alert.service.ts
// Service d'alerte Slack pour erreurs critiques (tracking CEREDIS)

import axios from 'axios';

/**
 * Envoie une alerte sur un canal Slack via webhook
 * @param message Message texte à envoyer
 */
export async function sendSlackAlert(message: string) {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL;
  if (!webhookUrl) {
    console.warn('[ALERT] SLACK_WEBHOOK_URL non défini');
    return;
  }
  try {
    await axios.post(webhookUrl, { text: message });
    console.log('[ALERT] Slack envoyé');
  } catch (err) {
    console.error('[ALERT] Échec envoi Slack', err);
  }
}
