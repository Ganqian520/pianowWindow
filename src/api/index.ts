export async function post(params: any = {}) {
  return new Promise((resolve, reject) => {
    let url = 'https://ca448d14-fda5-4d8f-9279-3f4896d8f854.bspapp.com/learnJP'
    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    }).then(res => res.json()).then(res =>{
      resolve(res)
    }).catch(err => {
      resolve(err)
    })
  })
}