/*
*** Route = string
*** Methode = string ('POST', 'GET', ...)
*** body = object     // si utilisation de méthode Post
*/

export const fetchDataToApi = (route, method, body, authorization) => {
    if (body === undefined) {
      return fetch(route,  {mode: 'cors', method: method,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin' : "*",
          'Authorization': 'Bearer ' +  authorization,
        },
      })
      .then((res)=>{
          if (res.status !== 200) {
             return;
          }
          return res.json()
        })
    }
    else {
      return fetch(route,  {mode: 'cors', method: method,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin' : "*",
          'Authorization': 'Bearer ' +  authorization,
        },
        body : JSON.stringify(body)
      })
      .then((res)=>{
          if (res.status !== 200) {
             return;
          }
          return res.json()
        })
    }
  }
