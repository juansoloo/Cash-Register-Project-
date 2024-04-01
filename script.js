const cash = document.getElementById("cash");
const disChangeDue = document.getElementById("change-due");
const purchaseBtn = document.getElementById("purchase-btn");
const total = document.getElementById("total");
const disChange = document.getElementById("change-given");
const cashDrawer = document.getElementById("cash-in-drawer");
 

let price = 1.87;
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100]
];

function cashRegister(cash, cid, price) {
  
  const changeUnit = [
    { name: "ONE HUNDRED", val: 100 },
    { name: "TWENTY", val: 20 },
    { name: "TEN", val: 10 },
    { name: "FIVE", val: 5 },
    { name: "ONE", val: 1 },
    { name: "QUARTER", val: 0.25 },
    { name: "DIME", val: 0.1 },
    { name: "NICKEL", val: 0.05 },
    { name: "PENNY", val: 0.01 }
  ];


  // update alerts 
  if (parseFloat(cash.value) === price) {
    disChangeDue.innerHTML = '<p>No change due - customer paid with exact cash</p>';
    return;
  } else if (parseFloat(cash.value) < price) {
    alert("Customer does not have enough money to purchase the item");
    return;
  } else {

  // calculate change
    const cashGiven = parseFloat(cash.value);
    var changeDue = cashGiven - price;
    
    disChange.innerText = `Change due: $${changeDue.toFixed(2)}`

    let change = [];
    let status = '';
     
    const reverseCid = cid.reverse();
    const totalCid = cid.reduce((acc, curr) => acc + curr[1], 0);
   

    
    if (totalCid === changeDue) {
      status = 'CLOSED';
      change = reverseCid;
    } else {

      for (let {name, val} of changeUnit) {
        let currency = reverseCid.find(elem => elem[0] === name);
        let total = 0;
        

        while (changeDue >= val && currency[1] > 0) {
          status = 'OPEN'
          changeDue -= val;
          currency[1] -= val;
          total += val;
          changeDue = Math.round(changeDue * 100) / 100;  
        }
        if (total > 0) { 
          change.push([name, total]);

        }
        cashDrawer.innerText = cid.reverse().map(([denom, amount]) => 
          `${denom}: $${amount.toFixed(2)}`).join('\n');
      }   
    }
    


    if (totalCid === changeDue) {
       status = 'CLOSED';
     } else if (changeDue > 0) {
      status = 'INSUFFICIENT_FUNDS';
      change = [];
     } 
  const changeDisplay = change.reduce((acc, [denom, amount]) =>  
    `${acc}\n${denom}: $${amount.toFixed(2)}`, "\n");
  disChangeDue.innerHTML = `STATUS: ${status}<br>${changeDisplay}`;
  return { status, change };
    
  }
}



purchaseBtn.addEventListener("click", function() {
  cashRegister(cash,cid,price)
})

cash.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    cashRegister(cash, cid, price); 
  }
});


total.innerText = `Total: ${price}`;
