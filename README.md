# Progetto_IdS_2024-2025
Progetto 22 – Creazione di testi d'esame
## Descrizione generale:
Si vuole sviluppare una applicazione per la creazione di testi di esami.
Gli esercizi possono essere a risposta multipla o aperta.
Ad ogni esercizio è assegnato un punteggio.
Il compito può essere diviso in sezioni.
Il professore crea un pool di esercizi da cui pescare per creare l’esame in questione.
Il sistema genera una bozza dell’esame ma il professore può comunque modificarla manualmente.
Il pool così come la lista dei compiti è memorizzata sul server.
Il tool genera un file pdf con un numero di compiti predefinito. Il professore può scegliere se mescolare le risposte delle domande a
risposta multipla e se mescolare l’ordine delle domande#
## Requisiti minimi:
- Una Docker per il lato server

## Istruzioni configurazione Docker
1. Apri la cartella del progetto con il tuo IDE preferito (ad esempio Visual Studio Code);
2. Verifica che Docker sia in esecuzione sul tuo computer (solitamente tramite Docker
Desktop);
3. Dal terminale di VSCode, esegui il comando docker-compose build per effettuare la
build del progetto;
4. Dopo aver completato la build, lancia il comando docker-compose up -d per avviare il
progetto in modalità detached, così da poter continuare a utilizzare lo stesso
terminale;
5. Una volta avviato, puoi accedere al progetto dal browser, andando sul localhost;
6. Per fermare il progetto, esegui il comando docker-compose stop nel terminale oppure
il comando docker-compose down per interrompere l'esecuzione ed eliminare anche i
container. Se desideri rimuovere anche i volumi del database, usa il comando docker-
compose down -v.
Questa sequenza di istruzioni permetterà di avviare correttamente il progetto in locale su qualsiasi
Sistema Operativo.

## Credenziali di accesso disponibili
Di seguito vengono forniti gli utenti esempio per accedere al sistema:

Utente 1:
- Email: prof_1_nome_cognome@email.com
- Password: 12345

Utente 2:
- Email: prof_2_nome_cognome@email.com
- Password: 12345

Utente 3:
- Email: prof_3_nome_cognome@email.com
- Password: 12345

Utente 4:
- Email: prof_4_nome_cognome@email.com
- Password: 12345

Utente 5:
- Email: prof_5_nome_cognome@email.com
- Password: 12345
