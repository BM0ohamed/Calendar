//On met toutes les fonctions qui permettent de récuperer les données de l'API
const BASE_URL = "https://api.staging.bsport.io"
const API_URL = BASE_URL + "/api/v1/"
const BASE_COMP_ID = 6

export function getOffersForCompForXDay({minDate,maxDate,compID=BASE_COMP_ID}){
    // Cette fonction renvoie les offres d'une compagnie pour une période donnée
    const url = `${API_URL}offer/?company=${compID}&min_date=${minDate}&max_date=${maxDate}`
    const data = fetch(url)
    .then(response => response.json())
    .then(data => {
        return data;
    })
    return data;
}

// export function getCoachName(coachID){
//     // Cette fonction renvoie le nom du coach
//     const url = `${API_URL}associated_coach/?company=${BASE_COMP_ID}&id__in=${coachID}`
//     return new Promise((resolve, reject) => {
//         const data = fetch(url)
//         .then(response => response.json())
//         .then(data => {
//             resolve(data[0]?.name)
//         })
//     })
    
// }

export function getCoachName(coachID){
    // Cette fonction renvoie le nom du coach
    const url = `${API_URL}associated_coach/?company=${BASE_COMP_ID}&id__in=${coachID}`
    return new Promise((resolve, reject) => {
        const data = fetch(url)
        .then(response => response.json())
        .then(data => {
            resolve(data[0]?.name)
            return data[0].name
        })
    })
    
}


export function getNameActivity(metaActivityId){
    // Cette fonction renvoie le nom de l'activité
    const url = `${API_URL}meta-activity/?id__in=${metaActivityId}&company=${BASE_COMP_ID}`
    return new Promise((resolve, reject) => {
        const data = fetch(url)
        .then(response => response.json())
        .then(data => {
            resolve(data?.result?.name)
        })
    })
}

