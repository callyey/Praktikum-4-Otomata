function analyzePalindrome() {
    const input = document.getElementById('input-string').value;
    const resultCard = document.getElementById('result-display');
    const resultTitle = document.getElementById('result-title');
    const resultDesc = document.getElementById('result-desc');
    const logContainer = document.getElementById('stack-logs');

    logContainer.innerHTML = "";
    resultCard.classList.remove('hidden', 'success', 'fail');

    if (!input) {
        alert("Masukkan string terlebih dahulu.");
        return;
    }

    if (!/^[a-zA-Z0-9]+$/.test(input)) {
        showResult(false, "Input mengandung karakter non-alfanumerik.");
        return;
    }

    let stack = ['Z']; 
    let half = Math.floor(input.length / 2);
    let isOdd = input.length % 2 !== 0;
    let isRejected = false;
    let errorMsg = "";

    function addLog(msg) {
        const p = document.createElement('div');
        p.className = "log-item";
        p.textContent = msg;
        logContainer.appendChild(p);
    }

    addLog(`Memulai Analisis: "${input}"`);

    for (let i = 0; i < half; i++) {
        let char = input[i].toLowerCase();
        stack.push(char);
        addLog(`[PUSH] Karakter '${char}' masuk ke stack. Stack: [${stack.join(',')}]`);
    }

    let startIndex = half;
    if (isOdd) {
        addLog(`[SKIP] Karakter tengah '${input[half]}' dilewati.`);
        startIndex = half + 1;
    }

    for (let i = startIndex; i < input.length; i++) {
        let char = input[i].toLowerCase();
        let top = stack.pop();

        if (char === top) {
            addLog(`[POP] Karakter '${char}' cocok dengan top stack. Stack: [${stack.join(',')}]`);
        } else {
            isRejected = true;
            errorMsg = `Karakter '${char}' tidak cocok dengan top stack '${top}'.`;
            addLog(`[ERROR] Ketidakcocokan ditemukan.`);
            break;
        }
    }

    if (!isRejected && stack.length === 1 && stack[0] === 'Z') {
        showResult(true, "String adalah Palindrome valid.");
        addLog("Analisis Selesai: String Diterima.");
    } else {
        showResult(false, errorMsg || "Struktur string tidak simetris.");
        addLog("Analisis Selesai: String Ditolak.");
    }
}

function showResult(success, msg) {
    const card = document.getElementById('result-display');
    const title = document.getElementById('result-title');
    const desc = document.getElementById('result-desc');

    card.classList.remove('hidden');
    card.classList.add(success ? 'success' : 'fail');
    title.textContent = success ? "ACCEPTED" : "REJECTED";
    desc.textContent = msg;
}