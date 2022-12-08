//On met toutes les fonctions qui permettent de récuperer les données de l'API
const BASE_URL = "https://api.staging.bsport.io"
const API_URL = BASE_URL + "/api/v1/"
const BASE_COMP_ID = 6
const token = "f18688960a8942c83d238b04e88389ac126bf55c"

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


export function getCoachName(coachID){
    // Cette fonction renvoie le nom du coach
    const url = `${API_URL}associated_coach/?company=${BASE_COMP_ID}&id__in=${coachID}`
    return new Promise((resolve, reject) => {
        const data = fetch(url)
        .then(response => response.json())
        .then(data => {
            resolve(data[0]?.name)
        }).catch(err => {
            reject(err)
        })
    })
    
}


export function getActivityName(metaActivityId){
    // Cette fonction renvoie le nom de l'activité
    const url = `${API_URL}meta-activity/?id__in=${metaActivityId}&company=${BASE_COMP_ID}`

    return new Promise((resolve, reject) => {
        const data = fetch(url)
        .then(response => response.json())
        .then(data => {
            resolve(data?.results[0]?.name)
        }).catch(err => {
            reject(err)
        })
    })
}

export function getEstablishment(ID){
    //cette fonction renvoie l'etablissement dans lequel a lieu l'activité :
    const url = `${API_URL}associated-establishment/?id=${ID}&company=${BASE_COMP_ID}`
    return new Promise((resolve,reject) => {
        const data=fetch(url,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization' : 'Token f18688960a8942c83d238b04e88389ac126bf55c'
              },

        })
        .then(response=>response.json())
        .then(data=>{
            resolve(data)
        }).catch(error =>{
            reject(error)
        })
    }
    )
}



