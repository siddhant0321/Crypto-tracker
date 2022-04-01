const form = document.querySelector('#search');
const res = document.querySelector('#tableResult');
var upd;
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    if(upd){
        clearTimeout(upd);
    }
    const ctype = form.elements.coinType.value;
    fetchPrice(ctype);
});

// const fetchPrice = async(ctype)=>{
//   const r = await axios.get(`https://api.coinstats.app/public/v1/${ctype}?currency=INR`);
//   console.log(r.data.coin.price);
//     const base = r.data.coin.name;
//     const rank = r.data.coin.rank;
//     const price = r.data.coin.price;
//     const volume = r.data.coin.volume;
//     const change = r.data.coin.priceChange1h;
//     const targer ='USD';

const fetchPrice= async(ctype) =>{
    const r = await axios.get(`https://api.coinstats.app/public/v1/coins/${ctype}?currency=INR`);
    console.log(r.data.coin.price);
     const price = r.data.coin.price;
     const volume  = r.data.coin.volume;
     const change = r.data.coin.priceChange1d;
     const base = r.data.coin.name;
     const rank = r.data.coin.rank;
     const target = 'INR';
     var col= "green";
    if(change<0){
        col = "red";
      }

    res.innerHTML =`<tr style="  border:1px solid black;
      font-size:24px;
      width:6px;
      background-color:#4169e1;">
<td>
    Property
</td>
<td>Value</td>
</tr>
<tr>
<td>
    ${base}
</td>
<td style="color:${col};">${price} ${target}</td>
<!-- <td>${price} ${target}</td> -->
</tr>
<tr>
<td>
    Rank
</td>
<td>${rank}</td>
</tr>
<tr>
<td>
    Volume
</td>
<td>${volume}</td>
</tr>
<tr>
<td>
    Change
</td>
<!-- <td>${change}</td> -->
<td style="color:${col};">${change}</td>
</tr>`

upd = setTimeout(()=>fetchPrice(ctype),10000);
}

