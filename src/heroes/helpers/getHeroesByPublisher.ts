import {heroes} from '../data/heroes';

export const getHeroresByPublisher = (publisher:string) => {
    const validPublishers = ['DC Comics', 'Marvel Comics'];
    if(!validPublishers.includes(publisher)){
        throw new Error(`Publisher "${publisher}" no es correcto`);
    }
    return heroes.filter(heroe => heroe.publisher === publisher);
}