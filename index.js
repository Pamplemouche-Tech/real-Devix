// index.js

// Importer les bibliothèques nécessaires
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();
const readlineSync = require('readline-sync');

// Récupérer la clé API depuis les variables d'environnement.
const apiKey = process.env.GEMINI_API_KEY;

// Vérifier si la clé API est configurée.
if (!apiKey) {
    console.error("Erreur : La variable d'environnement 'GEMINI_API_KEY' n'est pas définie.");
    console.error("Veuillez ajouter 'GEMINI_API_KEY=\"VOTRE_CLÉ_ICI\"' à votre fichier .env.");
    process.exit(1);
}

// Fonction asynchrone pour démarrer le chatbot de développement
async function devixChat() {
    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // Créer l'objet de chat avec un historique pré-défini
        const chat = model.startChat({
            history: [
                {
                    role: "user",
                    parts: "Ton rôle est d'être Devix, un assistant de développement. Tu es expert en Node.js, JavaScript, Python, et en gestion de bases de données. Tu fournis des réponses précises, des exemples de code clairs et tu aides à la résolution de problèmes de programmation. Tu es amical et concis.",
                },
                {
                    role: "model",
                    parts: "Bonjour ! Je suis Devix. Je suis prêt à vous aider avec vos défis de développement. Posez-moi une question sur le code, les frameworks, ou les algorithmes. Je suis là pour vous.",
                },
            ],
            generationConfig: {
                maxOutputTokens: 500,
            },
        });

        console.log("--- Devix est en ligne. Posez-moi une question de développement ou tapez 'exit' pour quitter. ---");

        // Boucle principale de la conversation
        while (true) {
            const userPrompt = readlineSync.question("Vous : ");

            if (userPrompt.toLowerCase() === 'exit') {
                console.log("--- Au revoir ! ---");
                break;
            }

            const result = await chat.sendMessage(userPrompt);
            const response = await result.response;
            const text = response.text();

            console.log(`Devix : ${text}`);
            console.log("-----------------------------------------");
        }

    } catch (error) {
        console.error("Une erreur s'est produite :", error);
    }
}

// Lancer le chatbot
devixChat();
