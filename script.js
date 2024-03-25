let user = localStorage.getItem('user');
let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
let debts = JSON.parse(localStorage.getItem('debts')) || []; // array untuk menyimpan utang

window.onload = function() {
    if (user && document.getElementById('user')) {
        document.getElementById('user').innerText = user;
    }
    if (document.getElementById('balanceAmount')) {
        let balance = 0;
        transactions.forEach(function(transaction) {
            if (transaction.type === 'income') {
                balance += Number(transaction.amount);
            } else if (transaction.type === 'outcome') {
                balance -= Number(transaction.amount);
            }
        });
        document.getElementById('balanceAmount').innerText = balance;
    }
    if (document.getElementById('transactions')) {
        transactions.forEach(function(transaction) {
            let transactionElement = document.createElement('div');
            transactionElement.className = 'transaction ' + transaction.type;
            transactionElement.innerText = transaction.name + ': ' + transaction.amount + ' (Tanggal: ' + transaction.date + ')';
            document.getElementById('transactions').appendChild(transactionElement);
        });
    }
    if (document.getElementById('debts')) {
        debts.forEach(function(debt) {
            let debtElement = document.createElement('div');
            debtElement.className = 'debt' + (new Date(debt.dueDate) <= new Date() ? ' due' : ''); 
            debtElement.innerText = debt.name + ': ' + debt.amount + ' (Jatuh tempo: ' + debt.dueDate + ')';
            document.getElementById('debts').appendChild(debtElement);
        });
    }
    if (document.getElementById('loginForm')) {
        document.getElementById('loginForm').addEventListener('submit', function(e) {
            e.preventDefault();
            user = document.getElementById('username').value;
            localStorage.setItem('user', user);
            transactions = []; 
            localStorage.setItem('transactions', JSON.stringify(transactions)); 
            window.location.href = 'main.html';
        });
    }
    if (document.getElementById('incomeForm')) {
        document.getElementById('incomeForm').addEventListener('submit', function(e) {
            e.preventDefault();
            let transactionName = document.getElementById('transactionName').value;
            let transactionAmount = document.getElementById('transactionAmount').value;
            let date = new Date().toLocaleString(); 
            transactions.push({name: transactionName, amount: transactionAmount, type: 'income', date: date});
            localStorage.setItem('transactions', JSON.stringify(transactions));
            alert('Transaksi sukses!');
            window.location.href = 'main.html';
        });
    }
    if (document.getElementById('outcomeForm')) {
        document.getElementById('outcomeForm').addEventListener('submit', function(e) {
            e.preventDefault();
            let transactionName = document.getElementById('transactionName').value;
            let transactionAmount = document.getElementById('transactionAmount').value;
            let transactionCategory = document.getElementById('transactionCategory').value;
            let date = new Date().toLocaleString(); 
            transactions.push({name: transactionName, amount: transactionAmount, type: 'outcome', category: transactionCategory, date: date});
            localStorage.setItem('transactions', JSON.stringify(transactions));
            alert('Transaksi sukses!');
            window.location.href = 'main.html';
        });
    }
    if (document.getElementById('debtForm')) {
        document.getElementById('debtForm').addEventListener('submit', function(e) {
            e.preventDefault();
            let debtName = document.getElementById('debtName').value;
            let debtAmount = document.getElementById('debtAmount').value;
            let dueDate = document.getElementById('dueDate').value; 
            debts.push({name: debtName, amount: debtAmount, dueDate: dueDate});
            localStorage.setItem('debts', JSON.stringify(debts)); 
            alert('Utang berhasil ditambahkan!');
            window.location.href = 'main.html';
        });
    }
    if (document.getElementById('logout')) {
        document.getElementById('logout').addEventListener('click', function() {
            localStorage.removeItem('user');
            localStorage.removeItem('transactions');
            localStorage.removeItem('debts'); 
            window.location.href = 'login.html';
        });
    }
}