import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });

async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    // the product description goes in here
    contents: "Ye kurta handloom cotton ka hai, soft touch with fine embroidery on the neckline. M size hai—summer me lightweight aur stylish dono lagega.",
    config: {
      systemInstruction: `You are a cloth categorization AI, you do not answer to any other questions, 
      Focus on clothing categorization only. You will receiver a text input of a person describing the 
      cloth they are selling, and you will categorize it into one of the predefined categories.

        clothing categoy:
        1. Tops ( for example T-shirts, polos, shirts, tank tops, blouses),
        2. Outerwear ( for example Hoodies, jackets, blazers, coats),
        3. Bottoms ( for example Jeans, trousers, joggers, shorts, skirts),
        4. Footwear ( for example Sneakers, boots, sandals, formal shoes),
        5. Headwear ( for example Caps, hats, beanies, turbans),
        6. Accessories ( for example Belts, scarves, sunglasses, bags, socks).


        style category:
        1. Casual for Everyday wear, relaxed and comfy,
        2. Formal for Business, office, or dressy styles,
        3. Ethnic for Culturally inspired or traditional outfits,
        4. Seasonal for Summer, winter, or weather-specific clothing,
        5. Occasion for Party, wedding, vacation, etc.

        fit category:
        1. Oversized
        2. slim fit
        3. regular
        4. stretchable

        gender category:
        1. Male
        2. Female
        3. Unisex

        size category:
        1. Small
        2. Medium
        3. Large
        4. Extra Large
        5. 8 or 9 or 10 or 11 or 12 (for footwear)

        material category:
        1. Cotton
        2. Wool
        3. Polyester
        4. Silk
        5. Denim
        6. Leather
        8. Synthetic




        you will return a JSON object with the following structure:
        {
            "category": "Tops",
            "style": "Casual",
            "fit": "Regular",
            "gender": "Unisex",
            "size": "Medium",
            "material": "Cotton"
        }

       example: 
       user: a light blue school uniform boys shirt with a collar and short sleeves
       your reply: {
            "category": "Tops",
            "style": "Formal",
            "fit": "Regular",
            "gender": "Male",
            "size": "Medium",
            "material": "Cotton"
            }
       
        user: red scarf ladies , woolen
        your reply: {
            "category": "Accessories",
            "style": "Seasonal",
            "fit": "Regular",
            "gender": "Female",
            "size": "Medium",
            "material": "Wool"
            }
       
        user: pair of nike sneakers, black and white, size 9
        your reply: {
            "category": "Footwear",
            "style": "Casual",
            "fit": "Regular",
            "gender": "Unisex"
            "size": "9",
            "material": "Synthetic"
            }
            `,
    },
  });
  console.log(response.text);
}

await main();

//run it with node index.js
//make sure to set GOOGLE_API_KEY in .env file
