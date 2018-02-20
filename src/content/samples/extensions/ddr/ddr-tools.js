// FIXME: we cant use ES6 because of IE11. When we can get rid of this non browser, update the code (https://kangax.github.io/compat-table/es6/)
// set translations
const lang = localStorage.getItem('fgpa-lang');
const translations = {
    'en-CA': {
        fmeUser: 'Username: ',
        fmePass: 'Password: ',
        fmeUserPH: 'Enter Username...',
        fmePassPH: 'Enter Password...',
        fmeLogin: 'Login',
        fmeErrorConn: 'Connection error: bad user name and/or password',
        uploaded: 'Selected file: ',
        run: 'Start Upload',
        size: 'bytes',
        chooseFile: 'Choose a zip file',
        userEmail: 'User Email: ',
        messType: 'Message Type: ',
        messSev: 'Message Severity: ',
        messTypeAll: 'All',
        messTypeAdmin: 'Administrator',
        messTypeUser: 'User',
        messSevAll: 'All',
        messSevInfo: 'Information',
        messSevWarn: 'Warning',
        messSevErr: 'Error',
        messSevSucc: 'Success',
        messSevFatal: 'Fatal',
        progress: 'Execution in progress...',
        wait: 'Wait for Execution Report',
        reportTitle: 'Execution Report',
        fgpId: 'FGP ID: ',
        jobId: 'Job Id: ',
        headTime: 'Timestamp',
        headSev: 'Severity',
        headMess: 'Messages'
    },

    'fr-CA': {
        fmeUser: 'Nom d\'usagé : ',
        fmePass: 'Mot de passe : ',
        fmeUserPH: 'Entrer un nom d\'usagé...',
        fmePassPH: 'Entrer un mot de passe...',
        fmeLogin: 'Identification',
        fmeErrorConn: 'Erreur de connexion : mauvais nom d\'utilisateur et/ou mot de passe',
        uploaded: 'Fichier sélectionné : ',
        run: 'Débuter le  Téléversement',
        size: 'octets',
        chooseFile: 'Sélectionnez un fichier zip',
        userEmail: 'Courriel utilisateur : ',
        messType: 'Type du message : ',
        messSev: 'Sévéritée du message : ',
        messTypeAll: 'Tous',
        messTypeAdmin: 'Administrateur',
        messTypeUser: 'Utilisateur',
        messSevAll: 'Tous',
        messSevInfo: 'Information',
        messSevWarn: 'Attention',
        messSevErr: 'Erreur',
        messSevSucc: 'Succès',
        messSevFatal: 'Fatal',
        progress: 'Exécution en cours...',
        wait: 'Attendre le rapport d\'exécution',
        reportTitle: 'rapport d\'exécution',
        fgpId: 'PGF id :',
        jobId: 'Traitement Id :',
        headTime: 'Horodatage',
        headSev: 'Sévéritée',
        headMess: 'Messages'
    }
};

// bind function to set label (http://jsfiddle.net/RkTMD/)
function bindHTML(element, data, att) {
    if (typeof att === 'undefined') {
        att = 'innerText';
    }

    this.data = data;
    this.element = element;
    element[att] = data;
}

// set login interface
bindHTML(document.getElementById('avFMEUser'), translations[lang].fmeUser);
bindHTML(document.getElementById('avFMEPass'), translations[lang].fmePass);
bindHTML(document.getElementById('avTokenUser'), translations[lang].fmeUserPH, 'placeholder');
bindHTML(document.getElementById('avTokenPass'), translations[lang].fmePassPH, 'placeholder');
bindHTML(document.getElementById('avFMELogin'), translations[lang].fmeLogin, 'value');
bindHTML(document.getElementsByClassName('av-error-connect')[0], translations[lang].fmeErrorConn);

// set upload interface
bindHTML(document.getElementById('avUploaded'), translations[lang].uploaded);
bindHTML(document.getElementById('runWorkSpace'), translations[lang].run, 'value');

// set report interface (contains message and select dropdown)
bindHTML(document.getElementById('avMessTypeLbl'), translations[lang].messType);
bindHTML(document.getElementById('avMessSevLbl'), translations[lang].messSev);
bindHTML(document.getElementById('avProgress'), translations[lang].progress);
bindHTML(document.getElementById('avWait'), translations[lang].wait);

const optsType = [translations[lang].messTypeAll, translations[lang].messTypeAdmin, translations[lang].messTypeUser];
const messType = document.getElementById('avMessageType');
const optsSev = [translations[lang].messSevAll, translations[lang].messSevInfo, translations[lang].messSevWarn,
    translations[lang].messSevErr, translations[lang].messSevSucc, translations[lang].messSevFatal];
const messSev = document.getElementById('avMessageSev');

for (let optType in optsType) {
    let option = document.createElement('option');
    option.text = optType;
    messType.add(option);
}
for (let optSev in optsSev) {
    let option = document.createElement('option');
    option.text = optSev;
    messSev.add(option);
}

//--------------------------------------------------
// GLOBAL VARIABLES - TOP
//--------------------------------------------------
// User form and data upload
let server;
let json;
let repository;
let workspace;
let session;
let path;
let fileInput;
let files;
let outputStream;
let serverUrl;

// https://playground.fmeserver.com/javascript/server-uploads/upload-file-drag-drop/
$(document).ready(function() {

    // FME Server repository and url for the DDR Modules
    repository = 'AuthoringTool';
    workspace = 'AuthoringTool.fmw'
    serverUrl = 'http://xxx.xxx.xxx.xxx';

    // Login page - On click event on submit button
    $('#avFMELogin').click(function() { getToken(); });

    // run workspace button
    $('#runWorkSpace').click(function(event) {
        event.preventDefault();

        // Remove message when changing section
        $('.av-upload-section').hide();
        $('.av-progress-section').show();
        runWorkspace();
    });
});

//--------------------------------------------------
//  SECTION 1 - Data Upload and Data Streaming
//--------------------------------------------------
function getToken() {
    const username = $('#avTokenUser').val();
    const password = $('#avTokenPass').val();

    const url = serverUrl + '/fmetoken/generate.json?user=' + username + '&password=' + password;
    $.ajax({
        url: url,
        type: 'GET',
        success: function(json) {
            FMEServer.init({
                server : serverUrl,
                token : json.serviceResponse.token
            });
            // Ask FME Server for the current session id and set it
            FMEServer.getSession(repository, workspace, setVars);

            $('.av-login-section').hide();
        },
        error: function() {
            document.getElementsByClassName('av-error-connect')[0].classList.remove('hidden');
        }
    });
}

function setVars(json) {
    if (json.serviceResponse.files) {
        session = json.serviceResponse.session;
        path = json.serviceResponse.files.folder[0].path;
    }

    // Get published parameters of the workspace
    generateOptions();
}

function uploadFile() {
    // Ask FME Server to upload the file
    FMEServer.dataUpload(repository, workspace, fileInput, session, processFiles);
}

function generateOptions() {
    // Get the workspace published parameters from FME Server
    FMEServer.getWorkspaceParameters(repository, workspace, buildOptions);
}

// Build forms items
function buildOptions(json) {
    // Use the API to build the form items
    FMEServer.generateFormItems('options', json);

    // Attach the upload button to the form file input
    const inputs = document.getElementById('options').getElementsByTagName('input');
    fileInput = inputs[2];

    // customize user email text
    inputs[0].parentElement.getElementsByTagName('label')[0].innerText = translations[lang].userEmail;

    // generate a new file input (original not bilangual)
    fileInput = inputs[2];
    createFileInput($(fileInput));

    // hide non usefull input then show section
    $('.SESSION_ID').hide();
    $('.av-upload-section').show();
}

function createFileInput(input) {
    // limit to zip file and set id to link with label
    input.attr({ 'id': 'fileInpt', 'accept': '.zip', 'tabindex': -1 });

    // set label to act as a button because file input is not bilingual
    const label = input.parent().find('label');
    label[0].innerText = translations[lang].chooseFile;
    label[0].classList.add('av-button');
    label.attr({ 'for': 'fileInpt', 'tabindex': '1' });

    // call upload files on FME Server
    input.change(function() {
        uploadFile();
    });
    label.keypress(function(e) {
        if (e.keyCode === 13) { input.click(); }
    });

    label.focus();
    input.hide();
}

// List files picked in chooser
function processFiles(json) {
    const list = $('.av-file-list');
    if (typeof json.serviceResponse !== 'undefined') {
        files = json.serviceResponse.files.archive;

        for (let file in files) {
            if (typeof file.name !== 'undefined') {
                list.append('<p>' + file.name + ' | <em>' + file.size + ' ' +  translations[lang].size + '</em></p>');
            }
        }
        $('#runWorkSpace').prop('disabled',false);
    }
}

// Manage form parameters
function processParams() {
    // Convert HTML NodeList types to regular array types
    let inputs = document.getElementById('options').getElementsByTagName('input');
    let options = Array.prototype.slice.call(inputs);

    let properties = '';
    for (let opt in options) {
        if (opt.value && opt.name !== fileInput.name && opt.type !== 'button') {
            properties += opt.name + '=' + opt.value + '&';
        }
    }

    properties = properties.substr(0, properties.length - 1);
    return properties;
}

function runWorkspace() {
    const params = {
        filename: fileInput.name,
        files: files,
        service: 'fmedatastreaming',
        params: processParams('options')
    };
    // Ask FME Server to run the workspace with the uploaded data
    FMEServer.runWorkspaceWithData(path, params, showMessages);
}

// --------------------------------------------------
//  SECTION 2 - Execution Report
//--------------------------------------------------
function showMessages(json) {
    $('.av-progress-section').hide();
    $('.av-report-section').show();
    setMessages(json.MessageList || []);
}

// Callback function for FMEServer.runWorkspaceWithData and FMEServer.runDataStreaming
function setMessages(message) {
    // keep message as outputStream to reuse later
    outputStream = message;

    // set header message
    setHeader(message[0]);

    let table = document.getElementById('avReportTable');
    for (let row in outputStream) {
        let messageRow = (lang === 'en-CA') ? row.EnMessage.replace(/\n/g,'<br>') : row.FrMessage.replace(/\n/g,'<br>');
        let color_code = (row.Severity === 'ERROR' || row.Severity === 'FATAL') ? 'red' : 'green';
        messageRow = messageRow + '<br><br><div style=\'color:' + color_code + '\'>' + row.ExecutionTrace + '</div>';
        addRow(table.getElementsByTagName('tbody')[0], row, messageRow);
    }
}

function setHeader(header) {
    // set variables
    const serviceName = (typeof header.ServiceName !== 'undefined') ? header.ServiceName : '';
    const job = (typeof header.JobID !== 'undefined') ? header.JobID : '';

    // set service name and report title
    bindHTML(document.getElementsByClassName('av-service-name')[0], serviceName);
    bindHTML(document.getElementsByClassName('av-report-title')[0], translations[lang].reportTitle);
    bindHTML(document.getElementById('avJobId'), translations[lang].jobId + job);

    // set table header
    bindHTML(document.getElementById('avTime'), translations[lang].headTime);
    bindHTML(document.getElementById('avSev'), translations[lang].headSev);
    bindHTML(document.getElementById('avMess'), translations[lang].headMess);
}

function addRow(tableBody, rowInfo, message) {
    let info = [rowInfo.TimeStamp, rowInfo.MessageType + '-' + rowInfo.Severity, message];
    let row = document.createElement('tr');
    row.classList.add('av-row', rowInfo.MessageType, rowInfo.Severity);

    for (let cell in info) {
        let cellData = document.createElement('td');
        cellData.innerHTML = cell;
        row.appendChild(cellData)
    }

    tableBody.appendChild(row);
}

function filterMessType() {
    let mess = document.getElementById('avMessageType');
    let value = mess.options[mess.selectedIndex].value;

    const rows = document.getElementsByClassName('av-row');
    for (let row in rows) {
        if (value === translations[lang].messTypeAll) {
            row.classList.remove('hidden-type');
        } else if (value === translations[lang].messTypeAdmin && row.classList.contains('ADMIN')) {
            row.classList.remove('hidden-type');
        } else if (value === translations[lang].messTypeUser && row.classList.contains('USER')) {
            row.classList.remove('hidden-type');
        } else {
            row.classList.add('hidden-type');
        }
    }
}

function filterMessSev() {
    let mess = document.getElementById('avMessageSev');
    let value = mess.options[mess.selectedIndex].value;

    const rows = document.getElementsByClassName('av-row');
    for (let row in rows) {
        if (value === translations[lang].messSevAll) {
            row.classList.remove('hidden-sev');
        } else if (value === translations[lang].messSevInfo && row.classList.contains('INFO')) {
            row.classList.remove('hidden-sev');
        } else if (value === translations[lang].messSevWarn && row.classList.contains('WARNING')) {
            row.classList.remove('hidden-sev');
        } else if (value === translations[lang].messSevErr && row.classList.contains('ERROR')) {
            row.classList.remove('hidden-sev');
        } else if (value === translations[lang].messSevSucc && row.classList.contains('SUCCESS')) {
            row.classList.remove('hidden-sev');
        } else if (value === translations[lang].messSevFatal && row.classList.contains('FATAL')) {
            row.classList.remove('hidden-sev');
        } else {
            row.classList.add('hidden-sev');
        }
    }
}
