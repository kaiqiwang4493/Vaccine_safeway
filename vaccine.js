var original;

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function checkVaccine(){
    let time = Date.parse(new Date());
    let url = `https://s3-us-west-2.amazonaws.com/mhc.cdn.content/vaccineAvailability.json?v=${time}`
    fetch(url).then(res =>res.json()).then(resJson=>{
        let result = resJson.filter(record =>
            //filter out the avaliability records in California
            record.availability === 'yes' && record.region === 'California'
        );
        const updateShow = document.getElementsByClassName('update')[0];
        const resultshow = document.getElementsByClassName('resultshow')[0];
        const list = document.getElementsByClassName('list')[0];
        updateShow.textContent = new Date();
        resultshow.textContent = 'The number of vaccine: '+ result.length;
        let d = new Date();
        let n = d.toLocaleTimeString();
        console.log(n);
        console.log(result)
        //if we get the available record
        if(result.length > 0){
            if(original != JSON.stringify(result)){
                original = JSON.stringify(result);
                removeAllChildNodes(list);
                for (let i = 0; i < result.length; i++){
                    const detail = `The address: ${result[i].address}`;
                    const li = document.createElement('li');
                    const text = document.createTextNode(detail);
                    li.appendChild(text)
                    list.appendChild(li);
                    console.clear();
                    console.log(n);
                    console.log(result);
                    console.log(original)
                }
                alert("Please check the vaccine")

            }
            //show the all record

        }else{
            removeAllChildNodes(list);
        }
    }).catch((error)=>{
        console.error(error);
    })
}

checkVaccine();

setInterval(checkVaccine,120000)