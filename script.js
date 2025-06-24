document.getElementById('templateForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const webhookUrl = 'TWOJ_WEBHOOK_URL';

    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const version = document.getElementById('version').value;
    const mcVersion = document.getElementById('mcVersion').value;
    const author = document.getElementById('author').value;
    const mods = document.getElementById('mods').value.split(',').map(item => item.trim());
    const modIds = document.getElementById('modIds').value.split(',').map(item => item.trim());

    const jsonData = {
        name: name,
        description: description,
        version: version,
        mcVersion: mcVersion,
        loader: "fabric",
        author: author,
        mods: mods,
        modIds: modIds
    };

    const params = {
        username: "Generator Szablonów",
        content: `Nowy szablon został wygenerowany przez: ${author}`,
        embeds: [{
            title: `Szablon: ${name}`,
            fields: [
                { name: "Opis", value: description },
                { name: "Wersja", value: version, inline: true },
                { name: "Wersja MC", value: mcVersion, inline: true },
                { name: "Mody", value: mods.join(', ') || 'Brak' },
                { name: "ID Modów", value: modIds.join(', ') || 'Brak' }
            ]
        }]
    };

    fetch(webhookUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
    })
    .then(response => {
        if (response.ok) {
            alert('Szablon został pomyślnie wysłany na Discorda!');
            document.getElementById('templateForm').reset();
        } else {
            alert('Wystąpił błąd podczas wysyłania szablonu.');
        }
    })
    .catch(error => {
        console.error('Błąd:', error);
        alert('Wystąpił błąd podczas wysyłania szablonu.');
    });
});
