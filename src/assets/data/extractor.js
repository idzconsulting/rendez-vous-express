const fs = require('fs');

let data = fs.readFileSync('laposte_hexasmal.json', {encoding:'utf8', flag:'r'});
let results = new Map()

data = JSON.parse(data)

data.forEach((obj) => {
    const cityName = obj['fields']['nom_de_la_commune'];
    // console.log(obj['fields']['nom_de_la_commune']);
    const postalCode = obj['fields']['code_postal'];

    results.set(postalCode, cityName);
})

const obj = Object.fromEntries(results);
const jsonMap = JSON.stringify(obj);

console.log(jsonMap);

fs.writeFileSync("postal-codes.json", jsonMap);