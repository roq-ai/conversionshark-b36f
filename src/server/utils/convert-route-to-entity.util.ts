const mapping: Record<string, string> = {
  chatbots: 'chatbot',
  feedbacks: 'feedback',
  organizations: 'organization',
  sessions: 'session',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
