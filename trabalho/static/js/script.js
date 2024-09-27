let questionCount = 0;

function addQuestion() {
    const questionsDiv = document.getElementById('questions');

    const questionDiv = document.createElement('div');
    questionDiv.id = `question-${questionCount}`; 

    questionDiv.innerHTML = `
        <label for="question_text_${questionCount}">Pergunta:</label>
        <input type="text" name="question_text" id="question_text_${questionCount}" required>
        <label for="question_type_${questionCount}">Tipo:</label>
        <select name="question_type" id="question_type_${questionCount}" onchange="addOptions(this, ${questionCount})">
            <option value = "">Selecionar o tipo de resposta></option>
            <option value="short_answer">Resposta Curta</option>
            <option value="long_answer">Resposta Longa</option>
            <option value="multiple_choice">Múltipla Escolha</option>
            <option value="checkbox">Caixa de Seleção</option>
        </select>
        <div id="options_${questionCount}"></div>
        <button type="button" onclick="removeQuestion(${questionCount})">Remover Pergunta</button> <!-- Botão de Remover Pergunta -->
    `;

    questionsDiv.appendChild(questionDiv);
    questionCount++;
}

function addOptions(select, count) {
    const optionsDiv = document.getElementById(`options_${count}`);
    optionsDiv.innerHTML = '';

    if (select.value === 'multiple_choice' || select.value === 'checkbox') {
        optionsDiv.innerHTML = `
            <label for="options_${count}">Opções:</label>
            <input type="text" name="options_${count}" required><br>
            <button type="button" onclick="addOption(${count})">Adicionar Opção</button>
        `;
    }
}

function addOption(count) {
    const optionsDiv = document.getElementById(`options_${count}`);
    const newOption = document.createElement('input');
    newOption.type = 'text';
    newOption.name = `options_${count}`;
    optionsDiv.appendChild(newOption);
    optionsDiv.appendChild(document.createElement('br'));
}

function removeQuestion(count) { 
    const questionDiv = document.getElementById(`question-${count}`);
    questionDiv.remove(); 
}
