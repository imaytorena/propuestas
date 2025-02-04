import { da } from "@faker-js/faker";
import { Actividad, Idea, Propuesta } from "./mockups"


const generateArray = (count: number, dataType: object) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        data.push({...dataType, id: i})
    }
    return data;
}

export const getPropuestas = (count: number) => generateArray(count, Propuesta);
export const getActiviades = (count: number) => generateArray(count, Actividad);
export const getIdeas = (count: number) => generateArray(count, Idea);