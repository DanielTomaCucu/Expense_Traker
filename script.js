const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

/* const dummyTransactions = [
    {id: 1, text: "Flower", ammount : -20},
    {id: 2, text: "Salary", ammount : 300},
    {id: 3, text: "book", ammount : -10},
    {id: 4, text: "Camera", ammount : 150}
]; */

const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));

let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

//add transaction
function addTransaction(e){
    e.preventDefault();

    if(text.value.trim() === '' || amount.value.trim() === ''){
        alert('Please add a text and amount');
    }else{
        const transaction = {
            id: generteID(),
            text: text.value,
            ammount: +amount.value
        };
        transactions.push(transaction);
        addTransactionDom(transaction);
        updateValues();
        updateLocalStorage();
        text.value ="";
        amount.value ="";
    }
}

//generate random ID
function generteID(){
    return Math.floor(Math.random() * 10000000);
}

function addTransactionDom(transaction){
    const sign = transaction.ammount < 0 ? '-' : '+';

    const item = document.createElement('li');
    item.classList.add(transaction.ammount < 0 ? 'minus' : "plus");
    item.innerHTML = `
        ${transaction.text} <span>${sign}${Math.abs(transaction.ammount)}</span><button class="delete-btn" onclick ="removeTransaction(${transaction.id})">x</button>
    `;
    list.appendChild(item);
}

//update balance
function updateValues(){
    const amounts = transactions.map(transaction => transaction.ammount);
    const total =  amounts.reduce((acc, item) => (acc += item),0).toFixed(2);
    //income
    const income = amounts
            .filter(item => item > 0)
            .reduce((acc, item) => (acc += item),0)
            .toFixed(2);
     //expenses       
    const expense = (amounts
        .filter(item => item < 0)
        .reduce((acc,item) =>(acc += item),0 ) * -1)
        .toFixed(2);  

    //add to DOM          
    balance.innerText = `$${total}`;
    money_plus.innerText = `$${income}`;
    money_minus.innerText = `$${expense}`;
}
//remove transaction
function removeTransaction(id){
    transactions = transactions.filter(transaction => transaction.id !== id);
    updateLocalStorage();
    init();
}

//update localStorage transactions
function updateLocalStorage(){
    localStorage.setItem('transactions', JSON.stringify(transactions))
}
//init app
function init(){
    list.innerHTML = '';
    transactions.forEach(addTransactionDom);
    updateValues();
}
init();

form.addEventListener('submit',addTransaction);