$(document).ready(function() {
    
    let currentBalance = localStorage.getItem('walletBalance') ? parseInt(localStorage.getItem('walletBalance')) : 50000;
    let userName = "Usuario Alke";

    $('.balance-amount').text(`$${currentBalance.toLocaleString('es-CL')}`);
    $('#user-name').text(userName);

    $('#deposit-form').on('submit', function(e) {
        e.preventDefault();
        const amount = parseInt($('#deposit-amount').val());
        
        if (amount > 0) {
            currentBalance += amount;
            updateBalance(currentBalance);
            alert(`¡Éxito! Has depositado $${amount}`);
            window.location.href = "menu.html";
        } else {
            alert("El monto debe ser mayor a 0.");
        }
    });

    $('#send-form').on('submit', function(e) {
        e.preventDefault();
        const amount = parseInt($('#send-amount').val());
        const contact = $('#contact').val();

        if (!contact) {
            alert("Selecciona un contacto.");
            return;
        }

        if (amount > 0 && amount <= currentBalance) {
            currentBalance -= amount;
            updateBalance(currentBalance);
            alert(`Enviaste $${amount} a ${contact}`);
            window.location.href = "menu.html";
        } else {
            alert("Saldo insuficiente o monto inválido.");
        }
    });

    function updateBalance(newBalance) {
        localStorage.setItem('walletBalance', newBalance);
        $('.balance-amount').text(`$${newBalance.toLocaleString('es-CL')}`);
    }
});