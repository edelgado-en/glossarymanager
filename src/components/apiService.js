import httpService from '../services/httpService';

export const getGlossaries = () => {
    return httpService.get('/glossaries');
}

export const saveGlossary = (requestObject) => {
    return httpService.post('/glossaries', requestObject);
}

export const deleteGlossary = (requestObject) => {
    return httpService.post('/glossaries/delete', requestObject);
}


