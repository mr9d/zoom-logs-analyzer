Dropzone.autoDiscover = false;

var dropzone = new Dropzone(".dropzone", {
    dictDefaultMessage: "Drop Zoom log file here",
    acceptedFiles: ".txt",
    autoProcessQueue: false,
    init: function () {
        this.on("addedfile", processAddedFile);
    }
});

String.prototype.hashCode = function () {
    var hash = 0, i, chr;
    if (this.length === 0) return hash;
    for (i = 0; i < this.length; i++) {
        chr = this.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
};

function getFileContent(file) {
    return file.text();
}

function parseChatLine(line) {
    var chatLine = {};
    var parts = line.split("From");
    chatLine.time = parts[0].trim();
    parts = parts[1].split(":");
    chatLine.name = parts[0].trim();
    chatLine.text = parts[1].trim();
    return chatLine;
}

function parseChatStatistics(fileContent) {
    var lines = fileContent.split(/\r?\n/);
    var userChatStatistics = {};
    lines.forEach(line => {
        if (line !== "") {
            var chatLine = parseChatLine(line);
            if (userChatStatistics[chatLine.name] === undefined) {
                userChatStatistics[chatLine.name] = [];
            }
            userChatStatistics[chatLine.name].push(chatLine);
        }
    });
    return userChatStatistics;
}

function createUserMessagesElements(userChatStatistics) {
    var elements = [];
    userChatStatistics.forEach(message => {
        var nameElem = document.createElement('strong');
        nameElem.innerHTML = message.time;

        var elem = document.createElement('p');
        elem.classList.add('ml-2');
        elem.appendChild(nameElem);
        elem.appendChild(document.createTextNode(' ' + message.text));

        elements.push(elem);
    });
    return elements;
}

function createStatisticsElement(username, userChatStatistics) {
    var id = 'collapse' + username.hashCode();

    var badge = document.createElement('span');
    badge.classList.add('badge');
    badge.classList.add('badge-primary');
    badge.innerText = userChatStatistics.length;

    var cardButton = document.createElement('button');
    cardButton.classList.add('card-header');
    cardButton.classList.add('text-left');
    cardButton.classList.add('btn');
    cardButton.classList.add('btn-link');
    cardButton.classList.add('collapsed');
    cardButton.setAttribute('data-toggle', 'collapse');
    cardButton.setAttribute('data-target', '#' + id);
    cardButton.appendChild(document.createTextNode(username + ' '));
    cardButton.appendChild(badge);

    var cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
    createUserMessagesElements(userChatStatistics).forEach(elem => {
        cardBody.appendChild(elem);
    });

    var collapse = document.createElement('div');
    collapse.classList.add('collapse');
    collapse.id = id;
    collapse.appendChild(cardBody);

    var statisticsElement = document.createElement('article');
    statisticsElement.classList.add('card');
    statisticsElement.appendChild(cardButton);
    statisticsElement.appendChild(collapse);

    return statisticsElement;
}

function showChatStatistics(chatStatistics) {
    var chatStatisticsArea = document.querySelector('.chat-statistics');
    chatStatisticsArea.innerHTML = '';
    Object.keys(chatStatistics).sort().forEach(username => {
        var userChatStatistics = chatStatistics[username];
        var statisticsElement = createStatisticsElement(username, userChatStatistics);
        chatStatisticsArea.appendChild(statisticsElement);
    });
}

async function processAddedFile(file) {
    var fileContent = await getFileContent(file);
    var chatStatistics = parseChatStatistics(fileContent);
    showChatStatistics(chatStatistics);
    dropzone.removeFile(file);
}