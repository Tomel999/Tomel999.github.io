// Ta funkcja będzie uruchamiana na serwerze Vercel, a nie w przeglądarce użytkownika.
export default async function handler(request, response) {
  // Akceptuj tylko zapytania metodą POST
  if (request.method !== 'POST') {
    return response.status(405).json({ message: 'Tylko zapytania POST są dozwolone' });
  }

  // Pobierz URL webhooka ze zmiennych środowiskowych (bezpieczny sposób!)
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

  if (!webhookUrl) {
    return response.status(500).json({ message: 'URL webhooka nie jest skonfigurowany po stronie serwera.' });
  }

  try {
    // Przekaż dane otrzymane od klienta (przeglądarki) do Discorda
    const discordResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request.body), // Przekazujemy całe ciało zapytania dalej
    });

    if (!discordResponse.ok) {
      // Jeśli Discord zwróci błąd, przekaż go dalej
      return response.status(discordResponse.status).json({ message: 'Błąd podczas wysyłania do Discorda.' });
    }

    // Jeśli wszystko poszło dobrze, zwróć sukces
    return response.status(200).json({ message: 'Wiadomość wysłana pomyślnie!' });

  } catch (error) {
    console.error(error);
    return response.status(500).json({ message: 'Wystąpił wewnętrzny błąd serwera.' });
  }
}
