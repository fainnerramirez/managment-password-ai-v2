
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.REACT_APP_API_OPENAI_V2,
    dangerouslyAllowBrowser: true
});

export const getGeneratePassword = async (long,complexity) => {

    const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        max_tokens: 500,
        messages: [
            { "role": "system", "content": `Generar una contraseña segura. 
            Longitud mínima de la contraseña: ${long} caracteres.
            Complejidad de la contraseña: ${complexity}.
            Evitar secuencias obvias: sí.
            Evitar información personal: sí.` },
            { "role": "user", "content": `Generar una contraseña segura con las especificaciones dadas: la longitud que se pide con la complejidad solicitada; 
                pero solo deveulveme la contraseña sin ninguna informació´n o texto adicional...solo la contraseña 
                como una cadena de texto` }
        ],
    });
    // Parsear la respuesta JSON y extraer la contraseña segura
    //const securePassword = completion.data.choices[0].message.content;
    return completion;
}